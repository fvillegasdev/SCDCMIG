using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using miSCP = EK.Modelo.SCP.Interfaces;
using System.Linq;

namespace EK.Procesos.SCP
{
    public partial class PagosProgramados
    {
        #region Public Functions

        public object[] Get(int idcompania, int proveedorini, int proveedorfin, string ccInicial, string ccFinal, DateTime fechaCorte)
        {
            List<miSCP.IPagosProgramados> modelo = this.dao.Get(idcompania, proveedorini, proveedorfin, ccInicial, ccFinal, fechaCorte);
            return (getpagos(modelo)).ToArray();
        }

        public object[] VerificarPagosACheques(string model)
        {
            try
            {
                dynamic obj = JsonConvert.DeserializeObject(model);
                dynamic cheques = new List<ExpandoObject>();
                dynamic row;
                decimal suma = 0;
                string conceptos = string.Empty;
                bool tieneVariosCC;
                int IdCC = -1;
                int numeroCheque = -1;
                foreach (dynamic item in obj)
                {
                    dynamic cc = new ExpandoObject();
                    row = new ExpandoObject();
                    tieneVariosCC = false;
                    numeroCheque = numeroCheque == -1 ? procSBO.GetConsecutivoCheque((int)item.CuentaBancaria.ID, System.Convert.ToString(item.TipoCheque.ID)) : (numeroCheque + 1);

                    foreach (var itemPagos in item.Items)
                    {
                        suma = suma + System.Convert.ToDecimal(itemPagos.Monto);
                        conceptos += itemPagos.Factura + " ";
                        if (IdCC == -1) { IdCC = itemPagos.CentroCosto.ID; }
                        if (IdCC != ((int)itemPagos.CentroCosto.ID)) { tieneVariosCC = true; }
                        cc = itemPagos.CentroCosto;
                    }

                    if (tieneVariosCC)
                    {
                        cc.ID = 9999;
                        cc.Nombre = "Todos";
                        cc.Clave = "9999";
                    }
                    row.ID = 0;
                    row.NumeroCheque = numeroCheque;
                    row.Descripcion = item.Proveedor.Nombre;
                    row.Monto = suma;
                    row.FechaMovimiento = DateTime.Now.Date;
                    row.Concepto1 = string.Concat("Pago de la(s) Factura(s): ", conceptos);
                    row.CuentaBancaria = item.CuentaBancaria;
                    row.TipoMovimiento = item.Items[0].TipoMovimiento;
                    row.TipoCheque = item.TipoCheque.ID;
                    row.Banco = item.CuentaBancaria.Banco;
                    row.Poliza = row.NumeroCheque;
                    row.CC = new ExpandoObject();
                    row.CC = cc;
                    row.TipoPoliza = item.CuentaBancaria.TipoPoliza;
                    row.Proveedor = new ExpandoObject();
                    row.Proveedor = item.Proveedor;
                    row.IdCompania = item.IdCompania;
                    row.EstadoCheque = item.IdEstado;

                    cheques.Add(row);
                    suma = 0;
                    conceptos = string.Empty;
                    IdCC = -1;
                }
                return cheques.ToArray();
            }
            catch
            {
                throw;
            }
        }

        #endregion Public Functions

        #region Private Functions

        private List<miSCP.IPagosProgramados> getpagos(List<miSCP.IPagosProgramados> model)
        {
            List<miSCP.IPagosProgramados> retValue = null;
            try
            {
                if (model != null)
                {
                    retValue = new List<miSCP.IPagosProgramados>();
                    miSCP.IPagosProgramados proveedores = this.factory.GetInstance<miSCP.IPagosProgramados>();

                    proveedores.Proveedor = model.First().Proveedor;
                    string ClaveProveedor = proveedores.Proveedor.Clave;

                    foreach (miSCP.IPagosProgramados c in model)
                    {
                        if (ClaveProveedor != c.Proveedor.Clave)
                        {
                            retValue.Add(proveedores);
                            proveedores = this.factory.GetInstance<miSCP.IPagosProgramados>();
                            proveedores.Proveedor = c.Proveedor;
                            ClaveProveedor = c.Proveedor.Clave;
                        }
                        c.StChecked = false;
                        proveedores.Items.Add(c);
                    }
                    retValue.Add(proveedores);
                }
            }
            catch
            {
                throw;
            }

            return retValue != null ? retValue : null;
        }

        #endregion Private Functions
    }
}