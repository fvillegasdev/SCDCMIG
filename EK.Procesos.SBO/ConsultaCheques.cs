using EK.Modelo.Kontrol;
using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SBO.Interfaces;
using EK.Modelo.SCO.Interfaces;
using EK.Modelo.SCP.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;

namespace EK.Procesos.SBO
{
    public partial class Cheques
    {

        public object[] GetCheques(string FormJson)
        {
            dynamic obj = JsonConvert.DeserializeObject(FormJson);

               int idBanco = 0; int idCuentaBancaria = 0;  int IdCompania;
               DateTime? FechaInicio; DateTime? FechaFin;

               idBanco = obj.idBanco;
               idCuentaBancaria = obj.idCuentaBancaria;
               FechaFin = obj.FechaFin;
               FechaInicio = obj.FechaInicio;
               IdCompania = obj.IdCompania;
            
            return dao.GetCheques(idBanco,idCuentaBancaria, FechaInicio, FechaFin, null, null, IdCompania, null, null, null);
        }

        public object[] GetChequesMaxMin(int idCuentaBancaria)
        {
            return dao.GetChequesMaxMin(idCuentaBancaria);
        }

        public object[] GetChequesBatch(string FormJson)
        {
            int idBanco = 0; int idCuentaBancaria = 0; int ChequeInicial; int ChequeFinal; int idCompania = 0; int TipoCheque; int EstadoCheque;

            dynamic obj = JsonConvert.DeserializeObject(FormJson);

            idBanco = obj.idBanco;
            idCuentaBancaria = obj.idCuentaBancaria;
            ChequeInicial = obj.ChequeInicial;
            ChequeFinal = obj.ChequeFinal;
            idCompania = obj.IdCompania;
            TipoCheque = obj.TipoCheque;
            EstadoCheque = obj.EstadoCheque;

            return dao.GetCheques(idBanco, idCuentaBancaria, null, null, ChequeInicial, ChequeFinal, idCompania, null, TipoCheque, EstadoCheque);
        }

        public ICheque GetById(int id)
        {
            return dao.GetById(id);

        }

        public int GetConsecutivoCheque(int idCuentaBancaria, string tipoCheque)
        {
            var retValue = dao.GetConsecutivoCheque(idCuentaBancaria, tipoCheque);


            return retValue.NumeroCheque;
        }

        public ICheque Save(string cheque)
        {

            dynamic obj = JsonConvert.DeserializeObject(cheque);
            var model = factory.GetInstance<ICheque>();

            try
            {
                BeginTransaction();

                model.ID = obj.ID;
                model.NumeroCheque = obj.NumeroCheque;
                model.Descripcion = obj.Descripcion;
                model.Monto = obj.Monto;
                model.FechaMovimiento = obj.FechaMovimiento;
                model.Concepto1 = obj.Concepto1;
                model.CuentaBancaria = this.factory.GetInstance<ICuentaBancaria>();
                model.CuentaBancaria.ID = obj.CuentaBancaria.ID;
                model.CuentaBancaria.Clave = obj.CuentaBancaria.Clave;
                model.CuentaBancaria.Descripcion = obj.CuentaBancaria.Descripcion;
                //model.TipoMovimiento = this.factory.GetInstance<ITipoMovimiento>();
                //model.TipoMovimiento.ID = obj.TipoMovimiento.ID;
                //model.TipoMovimiento.Clave = obj.TipoMovimiento.Clave;
                //model.TipoMovimiento.Descripcion = obj.TipoMovimiento.Descripcion;
                model.IdCompania = obj.IdCompania;
                model.TipoCheque = obj.TipoCheque;

                #region IPoliza 

                model.Poliza = this.factory.GetInstance<IPoliza>();
                model.Poliza.NumeroPoliza = (int)obj.Poliza;
                model.Poliza.FechaPoliza = obj.FechaMovimiento;
                model.Poliza.Anio = ((DateTime)((Newtonsoft.Json.Linq.JValue)obj.FechaMovimiento).Value).Year;
                model.Poliza.Mes = ((DateTime)((Newtonsoft.Json.Linq.JValue)obj.FechaMovimiento).Value).Month;
                model.Poliza.TipoPoliza = this.factory.GetInstance<IItemGeneralValores>();
                model.Poliza.TipoPoliza.Clave = obj.TipoPoliza.Clave;
                model.Poliza.TipoPoliza.ID = obj.TipoPoliza.ID;
                model.Poliza.Cargos = obj.Monto;
                model.Poliza.Abonos = (obj.Monto * (-1));
                model.Poliza.IdCompania = obj.IdCompania;
                model.Poliza.GeneradoPor = "B";
                model.Poliza.Estatus = this.factory.GetInstance<IItemGeneral>();
                model.Poliza.Estatus.Clave = "A";
                model.Poliza.IdCreadoPor = base.getUserId();
                model.Poliza.Concepto = "Póliza de : " + obj.CuentaBancaria.Descripcion;

                #endregion

                model.CC = this.factory.GetInstance<ICentroCosto>();
                model.CC.Clave = obj.CC.Clave;
                model.CC.ID = obj.CC.ID;
                model.CC.Nombre = obj.CC.Nombre;
                model.EstadoCheque = obj.EstadoCheque;
                model.Proveedor = this.factory.GetInstance<IProveedor>();
                model.Proveedor.ID = obj.TipoCheque == 1 ? 0 : obj.Proveedor.ID;
                model.Proveedor.Nombre = obj.TipoCheque == 1 ? string.Empty : obj.Proveedor.Nombre;
                model.Proveedor.Clave = obj.TipoCheque == 1 ? string.Empty : obj.Proveedor.Clave;
                model.Estado = obj.ID == 0 ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo : Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                model.IdEstatus = 13;
                model.IdCreadoPor = base.getUserId();
                model.IdModificadoPor = base.getUserId();

                int poliza = dsco.GeneraPoliza(model.Poliza);
                if (poliza == 0) //No existe
                {
                    int number = this.dao.Save(model);

                    if (number != 0)
                    {
                        var movpol = this.factory.GetInstance<IMovimientosPoliza>();

                        #region MovimientoPoliza (banco)
                        movpol.Linea = 1;
                        movpol.Cta = 1002;
                        movpol.Scta = 2;
                        movpol.Sscta = 1;
                        movpol.Digito = 1;
                        movpol.IdTipoMovimiento = 2;
                        movpol.Referencia = obj.Poliza;
                        movpol.CveCC = obj.CC.Clave;
                        movpol.Monto = (obj.Monto * (-1));
                        movpol.OrdenCompra = obj.TipoCheque == 1 ? 0 : 1;
                        movpol.IdProveedor = obj.TipoCheque == 1 ? 0 : obj.Proveedor.ID;
                        movpol.Poliza = model.Poliza;
                        movpol.Concepto = obj.Descripcion;
                        movpol.IdCompania = obj.IdCompania;
                        #endregion  
                        var id = dsco.GeneraMovimientoPoliza(movpol);

                        if (id == 0)
                        {

                            Commit();
                            model = this.dao.GetById(number);
                            model.Estado = KontrolEstadosEnum.Exitoso;
                        }
                        else
                        {
                            //fallo al guardar movimientos poliza
                            Rollback();
                            model.Estado = KontrolEstadosEnum.Fallido;
                        }

                    }
                    else
                    {  //fallo guardar cheque
                        Rollback();
                        model.Estado = KontrolEstadosEnum.Fallido;
                    }

                }
                else if (poliza == 1)//existe Poliza
                {
                    Rollback();
                    model.Estado = KontrolEstadosEnum.Fallido;
                    // get info cheque poliza existente
                }
                else
                {
                    // no controlado
                    model.Estado = KontrolEstadosEnum.Fallido;
                }


            }
            catch
            {
                Rollback();
                model.Estado = KontrolEstadosEnum.Fallido;
                throw;
            }

            return model;

        }
        public ICheque CancelarCheque(int idCheque)
        {
            throw new NotImplementedException();
        }

        public ICheque RetenerCheque(int idCheque)
        {
            throw new NotImplementedException();
        }

        public ICheque GenerarBatch()
        {
            throw new NotImplementedException();
        }
        public int GenerarChequesAutomaticos(string pagos)
        {
            int retValue = 2;
            dynamic obj = JsonConvert.DeserializeObject(pagos);
            ICheque modelo;

            foreach (dynamic item in obj)
            {
                string jsonItemTest = JsonConvert.SerializeObject(item);

                modelo = this.factory.GetInstance<ICheque>();
                modelo = this.Save(jsonItemTest);
                if (modelo.Estado == KontrolEstadosEnum.Fallido)
                {
                    retValue = -1;
                    break;
                }
            }
            return retValue;
        }


    }
}
