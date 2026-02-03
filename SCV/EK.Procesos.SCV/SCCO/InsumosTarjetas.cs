using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCCO
{
    public class InsumosTarjetas
        : p.Kontrol.BPBase<m.SCCO.Interfaces.IInsumoTarjeta, d.SCCO.Interfaces.IInsumosTarjetas>, p.SCCO.Interfaces.IInsumosTarjetas
    {
        public InsumosTarjetas(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.IInsumosTarjetas dao)
            : base(factory, dao, "scco_InsumosTarjetas")
        {
        }

        public override async Task<m.SCCO.Interfaces.IInsumoTarjeta> GetById(int id)
        {
            var daoDET = Get<d.SCCO.Interfaces.IInsumosTarjetasDetalle>();
            m.SCCO.Interfaces.IInsumoTarjeta retValue = null;

            try
            {
                retValue = await base.GetById(id);

                if (retValue != null)
                {
                    var parametros = new Dictionary<string, object> { { "idInsumoTarjeta", retValue.ID } };
                    //
                    retValue.TarjetaInsumos = await daoDET.GetAll(parametros);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<m.SCCO.Interfaces.IInsumoTarjeta> GetByIdInsumo(int id)
        {
            var daoDET = Get<d.SCCO.Interfaces.IInsumosTarjetasDetalle>();

            m.SCCO.Interfaces.IInsumoTarjeta retValue = null;

            try
            {
                retValue = await this.dao.GetByIdInsumo(id);

                if (retValue != null)
                {
                    var parametros = new Dictionary<string, object> { { "idInsumoTarjeta", retValue.ID } };

                    retValue.TarjetaInsumos = await daoDET.GetAll(parametros);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public override async Task<m.SCCO.Interfaces.IInsumoTarjeta> Save(m.SCCO.Interfaces.IInsumoTarjeta item)
        {
            var bpInsumos = Get<p.SCCO.Interfaces.IInsumos>();
            var bpClasificacion = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoDET = Get<d.SCCO.Interfaces.IInsumosTarjetasDetalle>();
            var daoCAM = Get<d.SCV.Interfaces.ITiposCambio>();
            var daoTab = Get<d.SCCO.Interfaces.ITabuladores>();

            try
            {
                BeginTransaction();
                //
                var tarjetaInsumos = item.TarjetaInsumos;
                var baseInsumo = Get<m.SCCO.Interfaces.IInsumo>();
                //
                    if (item != null && item.IdInsumo > 0)
                {
                    baseInsumo = await bpInsumos.GetById(item.IdInsumo);
                }
                //
                var clasificacion = await bpClasificacion.Get("Clasificacion", "Tarjeta");
                //
                baseInsumo = await this.Assign(baseInsumo);
                baseInsumo.Clave = item.Clave;
                baseInsumo.Nombre = item.Nombre;
                baseInsumo.Estatus = item.Estatus;
                baseInsumo.Clasificacion = clasificacion;
                baseInsumo.IdClasificacion = (int)clasificacion.ID;
                baseInsumo.IdEstatus = item.IdEstatus;
                baseInsumo.ClaveInsumo = item.ClaveInsumo;
                baseInsumo.IdUnidadMedida = item.IdUnidadMedida;
                baseInsumo = await bpInsumos.Save(baseInsumo);
                //
                item.IdInsumo = (int)baseInsumo.ID;
                item = await base.saveModel(item);
                //
                var parametros = new Dictionary<string, object>();
                parametros.Add("idInsumoTarjeta", (int)item.ID);
                //
                if (tarjetaInsumos != null && tarjetaInsumos.Count > 0)
                {
                    var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var estatus = await bpEstatus.Get("ESTATUS", "A");

                    foreach (var d in tarjetaInsumos)
                    {
                        if (d.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios || d.PrecioMoneda > 0 )
                        {
                            d.IdInsumoTarjeta = (int)item.ID;
                            d.Estatus = estatus;
                            d.IdEstatus = estatus.ID;
                            d.Modificado = DateTime.UtcNow;
                            d.IdModificadoPor = base.getUserId();
                            if (d.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                d.Estado = d.ID == null || d.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                            }
                                if (d.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                d.Creado = DateTime.UtcNow;
                                d.IdCreadoPor = base.getUserId();
                            }

                            if (d.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {

                                    await daoDET.Delete(d.ID.Value);
                            }
                            else
                            {


                                parametros.Clear();
                                parametros.Add("IdMonedaOrigen", d.IdMoneda);
                                parametros.Add("IdMonedaDestino", item.Tabulador.IdMoneda);
                                //
                                var tiposCambios = await daoCAM.GetAll(parametros);
                                if (tiposCambios != null && tiposCambios.Count > 0)
                                {
                                    var tipoCambio = tiposCambios[0];
                                    // 
                                    d.TipoCambio = tipoCambio.Valor;
                                }

                                await daoDET.SaveEntity(d, false, true);
                            }
                        }
                    }
                }
                //
                parametros.Clear();
                parametros.Add("idInsumoTarjeta", (int)item.ID);
                item.TarjetaInsumos = await daoDET.GetAll(parametros);
                //
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return item;
        }

        public override async Task<m.SCCO.Interfaces.IInsumoTarjeta> Delete(int id)
        {
            var retValue = await base.Delete(id);
            if (retValue != null)
            {
                var daoBase = Get<d.SCCO.Interfaces.IInsumos>();
                await daoBase.Delete(retValue.IdInsumo);
            }

            return retValue;
        }

        public async Task<m.SCCO.Interfaces.IInsumoTarjeta> Calcular(m.SCCO.Interfaces.IInsumoTarjeta tarjeta, m.SCCO.Interfaces.ITabulador tabulador)
        {
            var daoCAM = Get<d.SCV.Interfaces.ITiposCambio>();
            var daoDET = Get<d.SCCO.Interfaces.IInsumosTarjetasDetalle>();

            try
            {
                var tabuladorInsumos = tabulador.Insumos;
                if (tabuladorInsumos != null)
                {
                    var tarjetaInsumos = tarjeta.TarjetaInsumos;
                    if (tarjetaInsumos != null)
                    {
                        foreach (var ti in tarjetaInsumos)
                        {
                            if (ti.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                var insumo = ti.Insumo;
                                if (insumo != null && insumo.Clasificacion != null && insumo.Clasificacion.Clave == "TARJETA")
                                {
                                    var t1 = await this.GetByIdInsumo((int)insumo.ID);
                                    if (t1 != null)
                                    {
                                        var t2 = await this.Calcular(t1, tabulador);
                                        if (t2 != null)
                                        {
                                            if (t2.TarjetaInsumos != null)
                                            {
                                                ti.Moneda = tabulador.Moneda;
                                                ti.IdMoneda = tabulador.IdMoneda;
                                                //
                                                ti.Precio = t2.TarjetaInsumos.Sum(s => s.Precio);
                                                ti.PrecioMoneda = t2.TarjetaInsumos.Sum(s => s.PrecioMoneda);
                                                ti.Importe = ti.Precio * ti.Cantidad;
                                                ti.ImporteMoneda = ti.PrecioMoneda * ti.Cantidad;
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    var tabuladorInsumo = tabuladorInsumos.FirstOrDefault(tb => tb.IdInsumo == ti.Insumo.ID);
                                    if (tabuladorInsumo != null)
                                    {
                                        if (ti.Moneda == null)
                                        {
                                            ti.Moneda = tabuladorInsumo.Moneda;
                                            ti.IdMoneda = tabuladorInsumo.IdMoneda;
                                        }
                                        //
                                        if (ti.PrecioMoneda <= 0)
                                        {
                                            ti.Precio = tabuladorInsumo.Precio;
                                            ti.PrecioMoneda = tabuladorInsumo.PrecioMoneda;
                                            ti.Importe = ti.Precio * ti.Cantidad;
                                            ti.ImporteMoneda = ti.PrecioMoneda * ti.Cantidad;
                                        }
                                        else
                                        {
                                            var parametros = new Dictionary<string, object>();
                                            parametros.Add("IdMonedaOrigen", ti.IdMoneda);
                                            parametros.Add("IdMonedaDestino", tabulador.IdMoneda);
                                            //
                                            var tiposCambios = await daoCAM.GetAll(parametros);
                                            if (tiposCambios != null && tiposCambios.Count > 0)
                                            {
                                                var tipoCambio = tiposCambios[0];
                                                //
                                                ti.Precio = ti.PrecioMoneda * tipoCambio.Valor;
                                                ti.Importe = ti.Precio * ti.Cantidad;
                                                ti.ImporteMoneda = ti.PrecioMoneda * ti.Cantidad;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return tarjeta;
        }

        public async Task<List<m.SCCO.Interfaces.IInsumoTarjetaDetalle>> CalcularInsumos(List<m.SCCO.Interfaces.IInsumoTarjetaDetalle> insumos, int IdObra, int IdTabulador, int IdTipoPresupuesto)
        {
            var daoTAB = Get<d.SCCO.Interfaces.ITabuladores>();
            var daoTBD = Get<d.SCCO.Interfaces.ITabuladoresInsumos>();
            m.SCCO.Interfaces.IInsumoTarjeta tarjeta = null;

            try
            {
                var tabulador = await daoTAB.GetById(IdTabulador);
                if (tabulador != null)
                {
                    var parametros = new Dictionary<string, object>
                    {
                        { "idObra", IdObra },
                        { "idTabulador", IdTabulador },
                        { "idTipoPresupuesto", IdTipoPresupuesto }
                    };
                    //
                    tabulador.Insumos = await daoTBD.GetAll(parametros);
                }
                //
                tarjeta = Get<m.SCCO.Interfaces.IInsumoTarjeta>();
                tarjeta = await this.Assign(tarjeta);
                tarjeta.TarjetaInsumos = insumos;
                tarjeta = await this.Calcular(tarjeta, tabulador);
                //
                return tarjeta.TarjetaInsumos;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}