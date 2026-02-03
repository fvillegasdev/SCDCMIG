using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using mscvi = EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class ComisionesAjustes
        : p.Kontrol.BPBase<m.SCV.Interfaces.IComisionesAjustes, d.SCV.Interfaces.IComisionesAjustes>, 
        p.SCV.Interfaces.IComisionesAjustes, p.SCV.Interfaces.IComisionesAutorizacion

    {
        public ComisionesAjustes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IComisionesAjustes dao)
      : base(factory, dao, "comisionesAjustes")
        {
        }


        private async Task<List<m.SCV.Interfaces.IComisionesAjustesDetalle>> ObtenerParcialidades(int idComisionAjuste, string claveEstatus=null)
        {
            var daoComisionesAjustesDetalle = Get<d.SCV.Interfaces.IComisionesAjustesDetalle>();
            var parametros = new Dictionary<string, object> { { "idComisionAjuste", idComisionAjuste } };

            if(claveEstatus!=null)
            {
                parametros.Add("claveEstatus",claveEstatus);
            }
            return await daoComisionesAjustesDetalle.GetAll(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IComisionesAjustesDetalle>> ObtenerParcialidades(Dictionary<string, object> parametros)
        {
            var daoComisionesAjustesDetalle = Get<d.SCV.Interfaces.IComisionesAjustesDetalle>();
            return await daoComisionesAjustesDetalle.GetAll(parametros);
        }

        public override async Task<m.SCV.Interfaces.IComisionesAjustes> Save(m.SCV.Interfaces.IComisionesAjustes item)
        {
            try
            {

                var bpCatalogoG = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var daoComisionesAjustesDetalle = Get<EK.Datos.SCV.Interfaces.IComisionesAjustesDetalle>();
                var daoPeriodicidad = Get<EK.Datos.Kontrol.Interfaces.IPeriodicidadDetalle>();
                var comisionAjusteDetalle = Get<EK.Modelo.SCV.Interfaces.IComisionesAjustesDetalle>();
                var periodo = Get<EK.Modelo.Kontrol.Interfaces.IPeriodicidadDetalle>();
                var bpTipoCambio = Get<EK.Procesos.SCV.Interfaces.ITiposCambio>();
                var daoCompania = Get<EK.Datos.Kontrol.Interfaces.ICompania>();
                var daoDesarrollo = Get<EK.Datos.SCV.Interfaces.IDesarrollos>();


                /*La moneda base es el origen*/
                var desarrollo = await daoDesarrollo.GetById(item.Desarrollo.ID.Value);

                var compania = await daoCompania.GetById(desarrollo.Compania.ID.Value);



                int idMonedaBase = (int)compania.IdMonedaBase;

                int idMonedaDestino = item.IdMoneda;

                decimal? tipoCambio = await bpTipoCambio.GetTipoCambioAlDia(idMonedaBase, idMonedaDestino);


                item.ImporteComision = (decimal)tipoCambio * (decimal)item.ImporteComisionMoneda;

                item.TipoCambio = tipoCambio;
                item.IdMoneda = idMonedaDestino;

                /*Determinar si es cargo o abono en base al tipo de comision*/
                string naturaleza = item.TipoComision.TipoMovimiento_OC.Naturaleza.Clave;
                int? idTipoComisionComplementaria = null;

                if(naturaleza=="CAR" && item.TipoComision.TipoComision!=null && item.TipoComision.TipoComision.ID>0)
                {
                    idTipoComisionComplementaria = item.TipoComision.TipoComision.ID.Value;
                }

                var estatus = await bpCatalogoG.Get("ESTATUSCOMISIONES", "PA");
                item.IdTipoComisionComplementaria = idTipoComisionComplementaria;
                item.IdEstatus = estatus.ID.Value;
                item.IdUsuario = item.Usuario.IdUsuario;
                item.ImporteAplicado = 0;
                item.ImportePorAplicar = item.ImporteComisionMoneda;

                if (item.NumeroParcialidades == null)
                {
                    item.NumeroParcialidades = 1;
                }


                item = await base.saveModel(item);

                int idComisionAjuste = item.ID.Value;

                bool comisionomplementaria = item.TipoComisionComplementaria!=null && item.TipoComisionComplementaria.ID> 0 ? true : false;

                if (comisionomplementaria || naturaleza == "ABO")
                {
                    string fechaApicacionString = Convert.ToDateTime(item.FechaAplicacionAbono).ToString("dd/MM/yyyy");

                    DateTime fechaAplicacion = Convert.ToDateTime(fechaApicacionString);
                    int numeroParcialidades = (int)item.NumeroParcialidades;
                    int idPeriodicidad = (int)item.IdPeriodicidad;




                    /*Obtener periodo de aplicacion*/
                    var parametros = new Dictionary<string, object> { { "idPeriodicidad", idPeriodicidad }, { "fechaAplicacion", fechaAplicacion } };

                    periodo = await daoPeriodicidad.GetPeriodo(parametros);

                    if (periodo.ID > 1)
                    {
                        /*Determinar monto de parcialidad*/
                        decimal montoParcialidad = item.ImporteComisionMoneda / numeroParcialidades;


                        if (periodo.FechaInicio < fechaAplicacion)
                        {
                            parametros.Clear();
                            parametros.Add("idPeriodicidad", idPeriodicidad);
                            parametros.Add("N", periodo.N + 1);
                            periodo = await daoPeriodicidad.GetPeriodo(parametros);
                        }

                        await this.guardarComisionAjuste(idComisionAjuste, 1, periodo.FechaInicio, montoParcialidad,(decimal)tipoCambio,idMonedaDestino);

                        for (int i = 2; i <= numeroParcialidades; i++)
                        {
                            parametros.Clear();
                            parametros.Add("idPeriodicidad", idPeriodicidad);
                            parametros.Add("N", periodo.N + 1);
                            periodo = await daoPeriodicidad.GetPeriodo(parametros);

                            await this.guardarComisionAjuste(idComisionAjuste, i, periodo.FechaInicio, montoParcialidad,(decimal)tipoCambio,idMonedaDestino);
                        }
                    }
                }

                //if(naturaleza=="CAR")
                //{
                //    await this.guardarComisionAjuste(idComisionAjuste, 1 , (DateTime)item.FechaAplicacionCargo, item.ImporteComision);
                //}
            }
            catch
            {
                Rollback();
                throw;
            }
            return item;
        }


        private async Task<m.SCV.Interfaces.IComisionesAjustesDetalle> guardarComisionAjuste(
            int idComisionAjuste,
            int numeroParcialidad, 
            DateTime fechaAplicacion, 
            decimal monto,
            decimal tipoCambio,
            int idMoneda)
        {
            var comisionAjusteDetalle = Get<EK.Modelo.SCV.Interfaces.IComisionesAjustesDetalle>();

            try
            {

                var bpCatalogoG = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpCatalogoG.Get("ESTATUSCOMISIONES", "PA");

                var daoComisionesAjustesDetalle = Get<EK.Datos.SCV.Interfaces.IComisionesAjustesDetalle>();


                int idUsuario = base.getUserId();
                DateTime fecha = DateTime.UtcNow;

                comisionAjusteDetalle.IdComisionAjuste = idComisionAjuste;
                comisionAjusteDetalle.NumeroParcialidad = numeroParcialidad;
                comisionAjusteDetalle.FechaAplicacion = fechaAplicacion;
                comisionAjusteDetalle.TipoCambio = tipoCambio;
                comisionAjusteDetalle.IdMoneda = idMoneda;

                comisionAjusteDetalle.MontoMoneda = monto;
                comisionAjusteDetalle.Monto = (decimal)tipoCambio * monto;

                /*Indicar importes*/
                comisionAjusteDetalle.ImporteAplicado = 0;
                comisionAjusteDetalle.ImportePorAplicar = monto;


                comisionAjusteDetalle.IdEstatus = estatus.ID.Value;
                comisionAjusteDetalle.IdCreadoPor = idUsuario;
                comisionAjusteDetalle.Creado = fecha;
                comisionAjusteDetalle.IdModificadoPor =idUsuario;
                comisionAjusteDetalle.Modificado = fecha;
                comisionAjusteDetalle.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                comisionAjusteDetalle= await daoComisionesAjustesDetalle.SaveEntity(comisionAjusteDetalle);
            }
            catch
            {
                Rollback();
                throw;
            }
            return comisionAjusteDetalle;
        }


        public override async Task<m.SCV.Interfaces.IComisionesAjustes> Delete(int id)
        {
            BeginTransaction(true);
            m.SCV.Interfaces.IComisionesAjustes retValue = null;

            try
            {
                var daoComisionesAjusteDetalle = Get<EK.Datos.SCV.Interfaces.IComisionesAjustesDetalle>();

                retValue = await this.dao.GetById(id);

                var parametros = new Dictionary<string, object> { { "idComisionAjuste", id } };
                var parcialidades = await daoComisionesAjusteDetalle.GetAll(parametros);

                foreach (var item in parcialidades)
                {
                    await daoComisionesAjusteDetalle.Delete(item.ID.Value);
                }

                await this.deleteItem(id, null);
                var deletedItem = await this.dao.GetById(id);
                if (deletedItem == null)
                {
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    retValue = deletedItem;
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                }
                await Log(retValue);
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }
            return retValue;
        }



        public async Task<m.SCV.Interfaces.IComisionesAjustes> CancelarComision(m.SCV.Interfaces.IComisionesAjustes item)
        {
            BeginTransaction(true);
            try
            {
                int id = item.ID.Value;

                var parcialidadesPorAplicar = await this.ObtenerParcialidades(id, "PA");

                foreach (var parcialidad in parcialidadesPorAplicar)
                {
                    await this.CancelaParcialidad(parcialidad.ID.Value);
                }

                var parcialidadesCanceladas = await this.ObtenerParcialidades(id, "CAN");

                if (parcialidadesCanceladas.Count== item.NumeroParcialidades)
                {
                    await this.actualizarEstatus(item.ID.Value, "CAN");
                }

                Commit();
                return await this.GetById(id);
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }
        }


        public async Task<List<m.SCV.Interfaces.IComisionesAjustesDetalle>> CancelarParcialidad(m.SCV.Interfaces.IComisionesAjustesDetalle item)
        {
            BeginTransaction(true);

            var daoComisionesAjusteDetalle = Get<EK.Datos.SCV.Interfaces.IComisionesAjustesDetalle>();

            try
            {
                /*Obtener elemento por id*/
                var parcialidad = await this.CancelaParcialidad(item.ID.Value);

                var parcialidades = await this.ObtenerParcialidades(parcialidad.IdComisionAjuste);

                await this.ajustarEstatus(parcialidad.IdComisionAjuste, "CAN");

                Commit();
                return parcialidades;
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }
        }


        private async Task<m.SCV.Interfaces.IComisionesAjustesDetalle> CancelaParcialidad(int id)
        {
            BeginTransaction(true);

            var daoComisionesAjusteDetalle = Get<EK.Datos.SCV.Interfaces.IComisionesAjustesDetalle>();

            try
            {
                /*Buscar estatus de cancelado*/
                var estatus = await this.obtenerEstatus("CAN");

                /*Obtener elemento por id*/
                var parcialidad = await daoComisionesAjusteDetalle.GetById(id);

                parcialidad.IdEstatus = estatus.ID.Value;
                parcialidad.Modificado = DateTime.UtcNow;
                parcialidad.IdModificadoPor = base.getUserId();
                parcialidad = await daoComisionesAjusteDetalle.Save(parcialidad);

                Commit();
                return parcialidad;
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }
        }


        private async Task<m.SCV.Interfaces.IComisionesAjustes> ajustarEstatus(int id, string claveEstatus)
        {

            var parcialidades = await this.ObtenerParcialidades(id, claveEstatus);

            var comisionAjuste = await this.GetById(id);

            if (parcialidades.Count == comisionAjuste.NumeroParcialidades)
            {
                await this.actualizarEstatus(id, claveEstatus);
            }

            return null;
        }

        private async Task<m.SCV.Interfaces.IComisionesAjustes> actualizarEstatus(int id, string claveEstatus)
        {
            BeginTransaction(true);
            try
            {
                /*Obtener elemento por id*/
                var comisonAjuste = await this.GetById(id);
                var estatus = await this.obtenerEstatus(claveEstatus);

                comisonAjuste.IdEstatus = estatus.ID.Value;
                comisonAjuste.Modificado = DateTime.UtcNow;
                comisonAjuste.IdModificadoPor = base.getUserId();
                comisonAjuste = await this.dao.Save(comisonAjuste);

                Commit();
                return comisonAjuste;
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }
        }

        private async Task<m.Kontrol.Interfaces.IItemGeneral> obtenerEstatus(string claveEstatus)
        {
            var daoComisionesAjusteDetalle = Get<EK.Datos.SCV.Interfaces.IComisionesAjustesDetalle>();
            var bpCatalogoG = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            return await bpCatalogoG.Get("ESTATUSCOMISIONES", claveEstatus);
        }

        public async Task<bool> ActualizarImportes(m.SCV.Interfaces.IComisionesAprobacion item, m.Kontrol.Interfaces.IItemGeneral estatus)
        {
            bool result = false;

            try
            {
                BeginTransaction(true);

                if (item.TipoEntidad.Clave == "comisionesAjustes")
                {
                    var daoComisionAjuste = Get<d.SCV.Interfaces.IComisionesAjustes>();


                    var comision = await this.GetById(item.Referencia.ID.Value);
                    comision.IdEstatus = estatus.ID.Value;
                    comision.IdModificadoPor = base.getUserId();
                    comision.Modificado = DateTime.UtcNow;

                    comision.Changed("IdEstatus", true);
                    comision.Changed("IdModificadoPor", true);
                    comision.Changed("Modificado", true);

                    if (item.Estatus.Clave == "APLI")
                    {
                        comision.Changed("ImporteAplicado", true);
                        comision.Changed("ImportePorAplicar", true);
                        comision.ImporteAplicado = item.ImporteAplicado;
                        comision.ImportePorAplicar = item.ImportePorAplicar;
                    }

                    await daoComisionAjuste.SaveEntity(comision, false);

                }
                else
                {
                    var daoComisionAjusteDetalle = Get<d.SCV.Interfaces.IComisionesAjustesDetalle>();
                    var comisionDetalle = await daoComisionAjusteDetalle.GetById(item.Referencia.ID.Value);

                    comisionDetalle.Changed("IdEstatus", true);
                    comisionDetalle.Changed("IdModificadoPor", true);
                    comisionDetalle.Changed("Modificado", true);

                    if (item.Estatus.Clave == "APLI")
                    {
                        comisionDetalle.Changed("ImporteAplicado", true);
                        comisionDetalle.Changed("ImportePorAplicar", true);
                        comisionDetalle.ImporteAplicado = item.ImporteAplicado;
                        comisionDetalle.ImportePorAplicar = item.ImportePorAplicar;
                    }

                    comisionDetalle.IdEstatus = estatus.ID.Value;

                    comisionDetalle.IdModificadoPor = base.getUserId();
                    comisionDetalle.Modificado = DateTime.UtcNow;
                    await daoComisionAjusteDetalle.SaveEntity(comisionDetalle, false);

                    var comision = await this.GetById(comisionDetalle.IdComisionAjuste);

                    if (comision.TipoComision.TipoMovimiento_OC.Naturaleza.Clave == "ABO")
                    {
                        await this.ajustarEstatus(comisionDetalle.IdComisionAjuste, estatus.Clave);
                    }
                }

                result = true;
                Commit();
            }
            catch (Exception ex)
            {
                throw;
            }

            return result;
        }

    }
}
