using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Linq;

namespace EK.Procesos.SCCO
{
    public class Presupuestos :
        p.Kontrol.BPBase<m.SCCO.Interfaces.IPresupuesto, d.SCCO.Interfaces.IPresupuestos>, p.SCCO.Interfaces.IPresupuestos
    {
        public Presupuestos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.IPresupuestos dao)
            : base(factory, dao, "Presupuestos")
        {
        }

        public override async Task<m.SCCO.Interfaces.IPresupuesto> GetById(int id)
        {
            var bpCCO = Get<p.SCCO.Interfaces.ICalculoWBS>();
            var daoON = Get<d.SCCO.Interfaces.IObraNivel>();

            m.SCCO.Interfaces.IPresupuesto item = await base.GetById(id);
            item.Presupuesto = await bpCCO.GetWBS((int)item.ID);
            //
            if (item.Obra != null)
            {
                var parametros = new Dictionary<string, object>() { { "idObra", item.IdObra } };
                var validaciones = await daoON.GetAll(parametros);
                //
                item.Obra.ObraNiveles = validaciones;
            }
            //
            return item;
        }

        public async override Task<m.SCCO.Interfaces.IPresupuesto> Save(m.SCCO.Interfaces.IPresupuesto item)
        {
            var bpCCO = Get<p.SCCO.Interfaces.ICalculoWBS>();

            try
            {
                BeginTransaction();

                string sp = Convert.ToString(item.Presupuesto);
                object dp = JsonConvert.DeserializeObject(sp);

                item = await base.saveModel(item);

                m.SCCO.Interfaces.IWBSObra wbsObra = await bpCCO.CreateObra(dp);

                if (wbsObra != null)
                {
                    wbsObra.IdEntidad = (int)item.ID;
                    wbsObra.IdObra = item.IdObra;
                    wbsObra.IdTabulador = item.IdTabulador;
                    wbsObra.IdTipoPresupuesto = item.IdTipoPresupuesto;

                    await bpCCO.Save(wbsObra);
                }

                item.Presupuesto = await bpCCO.GetWBS((int)item.ID);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return item;
        }

        public async Task<m.SCCO.Interfaces.IWBSTarjeta> ConvertWBS(m.SCCO.Interfaces.IInsumoTarjeta tarjeta)
        {
            var bpTAR = Get<p.SCCO.Interfaces.IInsumosTarjetas>();
            m.SCCO.Interfaces.IWBSTarjeta retValue = null;

            try
            {
                var children = new List<m.SCCO.Interfaces.IWBSBase>();

                var tarjetaInsumos = tarjeta.TarjetaInsumos;
                if (tarjetaInsumos != null)
                {
                    foreach (var ti in tarjetaInsumos)
                    {
                        var insumo = ti.Insumo;
                        if (insumo != null && insumo.Clasificacion != null && insumo.Clasificacion.Clave == "TARJETA")
                        {
                            var t1 = await bpTAR.GetByIdInsumo((int)insumo.ID);
                            if (t1 != null)
                            {
                                var t2 = await this.ConvertWBS(t1);
                                if (t2 != null)
                                {
                                    children.Add(t2);
                                }
                            }
                        }
                        else
                        {
                            var wBSInsumo = Get<m.SCCO.Interfaces.IWBSInsumo>();
                            wBSInsumo.Clave = insumo.Clave;
                            wBSInsumo.Nombre = insumo.Nombre;
                            wBSInsumo.IdInsumo = (int)insumo.ID;
                            wBSInsumo.Insumo = insumo;
                            wBSInsumo.Moneda = ti.Moneda;
                            wBSInsumo.IdMoneda = ti.IdMoneda;
                            wBSInsumo.Cantidad = ti.Cantidad;
                            wBSInsumo.Precio = ti.PrecioMoneda;
                            wBSInsumo.Importe = ti.ImporteMoneda;
                            wBSInsumo.Bloqueado = true;
                            wBSInsumo.Tipo = "I";
                            children.Add(wBSInsumo);
                        }
                    }
                }
                //
                retValue = Get<m.SCCO.Interfaces.IWBSTarjeta>();
                retValue.Clave = tarjeta.Clave;
                retValue.Nombre = tarjeta.Nombre;
                retValue.IdTarjeta = (int)tarjeta.ID;
                retValue.Tarjeta = tarjeta;
                retValue.Cantidad = 1.00000000M;
                retValue.Precio = children.Sum(c => c.Precio);
                retValue.Importe = children.Sum(c => c.Importe);
                retValue.Bloqueado = true;
                retValue.Tipo = "T";
                retValue.Children = children;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<List<m.SCCO.Interfaces.IWBSBase>> GetInsumosWBS(int idTarjeta)
        {
            var bpTAR = Get<p.SCCO.Interfaces.IInsumosTarjetas>();
            var daoTBD = Get<d.SCCO.Interfaces.ITabuladoresInsumos>();
            var retValue = new List<m.SCCO.Interfaces.IWBSBase>();

            try
            {
                m.SCCO.Interfaces.IInsumoTarjeta tarjeta = await bpTAR.GetById(idTarjeta);

                var tarjetaWBS = await this.ConvertWBS(tarjeta);

                retValue = tarjetaWBS.Children;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }
    }
}