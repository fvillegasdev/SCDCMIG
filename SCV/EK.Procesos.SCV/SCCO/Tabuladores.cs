using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCCO
{
    public class Tabuladores
        : p.Kontrol.BPBase<m.SCCO.Interfaces.ITabulador, d.SCCO.Interfaces.ITabuladores>, p.SCCO.Interfaces.ITabuladores
    {
        public Tabuladores(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.ITabuladores dao)
            : base(factory, dao, "scco_Tabuladores")
        {
        }

        public async Task<List<m.SCCO.Interfaces.ITabuladorInsumo>> GetInsumos(Dictionary<string, object> parametros)
        {
            var daoDET = Get<d.SCCO.Interfaces.ITabuladoresInsumos>();

            return await daoDET.GetAll(parametros);
        }

        public override async Task<m.SCCO.Interfaces.ITabulador> Save(m.SCCO.Interfaces.ITabulador item)
        {
            var daoCAM = Get<d.SCV.Interfaces.ITiposCambio>();
            var daoMON = Get<d.Kontrol.Interfaces.IMonedas>();
            var daoDET = Get<d.SCCO.Interfaces.ITabuladoresInsumos>();
            var parametros = new Dictionary<string, object>();

            try
            {
                this.BeginTransaction();

                var insumos = item.Insumos;
                item = await base.saveModel(item);
                //
                int? idTabulador = (int)item.ID;
                int? idObra = null;
                int? idTipoPresupuesto = null;
                //
                if (insumos != null && insumos.Count > 0)
                {
                    var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var estatus = await bpEstatus.Get("ESTATUS", "A");

                    foreach (var i in insumos)
                    {
                        idObra = i.IdObra;
                        idTipoPresupuesto = i.IdTipoPresupuesto;
                        i.TipoCambio = 0;
                        i.Precio = 0.00000000M;
                        //
                        if (i.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            i.IdTabulador = (int)idTabulador;
                            i.Estatus = estatus;
                            i.IdEstatus = estatus.ID;
                            i.Modificado = DateTime.UtcNow;
                            i.IdModificadoPor = base.getUserId();
                            if (i.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                i.Estado = i.ID == null || i.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                            }
                    
                            //
                            if (i.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                i.Creado = DateTime.UtcNow;
                                i.IdCreadoPor = base.getUserId();
                            }
                            //
                            if (i.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoDET.Delete((int)i.ID);
                            }
                            else
                            {
                                parametros.Clear();
                                parametros.Add("IdMonedaOrigen", i.IdMoneda);
                                parametros.Add("IdMonedaDestino", item.IdMoneda);
                                //
                                var tiposCambios = await daoCAM.GetAll(parametros);
                                if (tiposCambios != null && tiposCambios.Count > 0)
                                {
                                    var tipoCambio = tiposCambios[0];
                                    //
                                    i.TipoCambio = tipoCambio.Valor;
                                    i.Precio = i.PrecioMoneda * i.TipoCambio;
                                }

                                await daoDET.SaveEntity(i, false, true);
                            }
                        }
                    }
                }
                //
                parametros.Clear();
                parametros.Add("idObra", idObra);
                parametros.Add("IdTabulador", idTabulador);
                parametros.Add("idTipoPresupuesto", idTipoPresupuesto);

                item.Insumos = await daoDET.GetAll(parametros);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return item;
        }
    }
}