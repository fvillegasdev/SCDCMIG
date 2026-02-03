using EK.Procesos.Kontrol;
using EK.Procesos.SCO.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.SCO.Interfaces;
using Newtonsoft.Json;
using dCo = EK.Datos.SCO.Interfaces;
using bKontrol = EK.Modelo.Kontrol.Interfaces;

namespace EK.Procesos.SCO
{
    public class Polizas : ProcesoBase, IPolizas
    {
        private dCo.IPolizas dao;

        public Polizas(bKontrol.IContainerFactory factory, dCo.IPolizas dao)
        {
            this.factory = factory;
            this.dao = dao;
        }

        public IMovimientosPoliza GeneraMovimientoPoliza(string movpol)
        {
            dynamic obj = JsonConvert.DeserializeObject(movpol);
            var model = factory.GetInstance<IMovimientosPoliza>();

            using (var helper = this.factory.GetInstance<EK.Datos.Kontrol.Interfaces.IDBHelper>())
            {
                try
                {
                    helper.BeginTransaction();

                    model.ID = obj.ID == null ? 0 : obj.ID;
                    model.Linea = obj.Linea;
                    model.Cta = obj.Cta;
                    model.Scta = obj.Scta;
                    model.Sscta = obj.Sscta;
                    model.Digito = obj.Digito;
                    model.IdTipoMovimiento = obj.TipoMovimiento.ID;
                    model.Referencia = obj.Referencia;
                    model.CveCC = obj.CC.Clave;
                    model.Monto = obj.Monto;
                    model.OrdenCompra = obj.OrdenCompra;
                    model.IdProveedor = obj.Proveedor.ID;
                    model.Poliza = this.factory.GetInstance<IPoliza>();
                    model.Concepto = obj.Concepto;
                    model.IdEstatus = obj.Estatus.ID;
                    model.IdCreadoPor = base.getUserId();
                    model.IdModificadoPor = base.getUserId();

                    int number = this.dao.GeneraMovimientoPoliza(model);


                    helper.Commit();

                }
                catch
                {
                    helper.Rollback();
                    throw;
                }

                return model;
            }
        }

        public IPoliza GeneraPoliza(string poliza)
        {

            dynamic obj = JsonConvert.DeserializeObject(poliza);
            var model = factory.GetInstance<IPoliza>();

            using (var helper = this.factory.GetInstance<EK.Datos.Kontrol.Interfaces.IDBHelper>())
            {
                try
                {
                    helper.BeginTransaction();

                    model.ID = obj.ID == null ? 0 : obj.ID;
                    model.NumeroPoliza = obj.NumeroPoliza;
                    model.TipoPoliza = obj.TipoPoliza.Clave;
                    model.Anio = obj.Anio;
                    model.Mes = obj.Mes;
                    model.FechaPoliza = obj.FechaPoliza;
                    model.Cargos = obj.Cargos;
                    model.Abonos = obj.Abonos;
                    model.GeneradoPor = obj.GeneradoPor;
                    model.IdEstatus = obj.Estatus.ID;
                    model.IdCreadoPor = base.getUserId();
                    model.IdModificadoPor = base.getUserId();
                    int number = this.dao.GeneraPoliza(model);

                    helper.Commit();

                }
                catch
                {
                    helper.Rollback();
                    throw;
                }

                return model;
            }
        }
    }
}