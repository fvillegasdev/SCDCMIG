using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d=EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.SCV
{
    public class ComisionesConfiguracion :
        p.Kontrol.BPBase<m.Kontrol.Interfaces.IAnios,d.Kontrol.Interfaces.IAnios>,p.SCV.Interfaces.IComisionesConfiguracion

    {
        public ComisionesConfiguracion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IAnios dao)
            :base(factory,dao, "comisionesConfiguracion")
        {
        }
       
        #region  PERIODO
        public new async  Task<object> Save(m.Kontrol.Interfaces.IAnios item)
        {
            try
            {
                var daoComisionesPeriodo = Get<d.Kontrol.Interfaces.IAnios>();

                if (item.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                {
                    item.Modificado = DateTime.UtcNow;
                    item.IdModificadoPor = base.getUserId();

                    if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                    {
                        var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                        var estatus = await bpEstatus.Get("ESTATUS", "A");

                        item.Creado = DateTime.UtcNow;
                        item.IdCreadoPor = base.getUserId();
                        item.IdEstatus = estatus.ID.Value;
                    }

                    if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                    {
                        await daoComisionesPeriodo.Delete(item.ID.Value);
                    }
                    else
                    {
                        await daoComisionesPeriodo.SaveEntity(item, false, true);
                    }
                }
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            var pa = new Dictionary<string, object>
                        {
                            { "activos",0},
                        };
            return await this.GetAll(pa);
        }
        #endregion

        #region  PERIODO DETALLE
        public async Task<object> SavePeriodoDetalle(m.SCV.Interfaces.IComisionAniosPeriodos item)
        {
            try
            {
                BeginTransaction(true);

                var retValue = this.factory.GetInstance<m.SCV.Interfaces.IComisionAniosPeriodos>();

                var daoComisionesPeriodoDetalle = Get<d.SCV.Interfaces.IComisionAniosPeriodos>();

                if (item.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                {
                    item.Modificado = DateTime.UtcNow;
                    item.IdModificadoPor = base.getUserId();

                    if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                    {


                        item.Creado = DateTime.UtcNow;
                        item.IdCreadoPor = base.getUserId();
                    }

                    if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                    {
                        await daoComisionesPeriodoDetalle.Delete(item.ID.Value);
                    }
                    else
                    {
                        var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                        var estatus = await bpEstatus.Get("ESTATUS", "A");

                        item.IdEstatus = estatus.ID.Value;

                        //var parametros = new Dictionary<string, object>
                        //{
                        //    { "FechaInicio",item.FechaInicio},
                        //    { "FechaFin",item.FechaFin},
                        //    { "idComisionPeriodo",item.IdComisionPeriodo},
                        //    { "idFase",item.IdFase}
                        //};
                        //var validar = daoComisionesPeriodoDetalle.GetAll(parametros);
                        item=await daoComisionesPeriodoDetalle.SaveEntity(item, true, true);
                    }

                   
                }

                var pa = new Dictionary<string, object>
                        {
                            { "idComisionPeriodo",item.IdComisionPeriodo},
                            { "idFase",item.IdFase}
                        };
                Commit();
                return await GetAllPeriodoDetalle(pa);
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
          
        }
        public async Task<object> GetAllPeriodoDetalle(Dictionary<string,object>parametros)
        {
            var daoComisionesPeriodoDetalle = Get<d.SCV.Interfaces.IComisionAniosPeriodos>();
            return await daoComisionesPeriodoDetalle.GetAllComisionesPeriodoDetalles(parametros);
        }
        #endregion

        #region PLAN POR ESQUEMA
        public async Task<object> SavePlanEsquemaPeriodo(m.SCV.Interfaces.IComisionPlanEsquemaPeriodo item)
        {
            var retValue = this.factory.GetInstance<m.SCV.Interfaces.IComisionPlanEsquemaPeriodo>();
            try
            {
                BeginTransaction(true);
                var daoComisionesPeriodoEsquema = Get<d.SCV.Interfaces.IComisionPlanEsquemaPeriodo>();

                if (item.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                {
                    item.Modificado = DateTime.UtcNow;
                    item.IdModificadoPor = base.getUserId();

                    if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                    {
                        var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                        var estatus = await bpEstatus.Get("ESTATUS", "A");

                        item.Creado = DateTime.UtcNow;
                        item.IdCreadoPor = base.getUserId();
                        item.IdEstatus = estatus.ID.Value;
                    }

                    if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                    {
                        await daoComisionesPeriodoEsquema.Delete(item.ID.Value);
                    }
                    else
                    {
                        await daoComisionesPeriodoEsquema.SaveEntity(item, false, true);
                    }

                }
                Commit();

            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            int idFase = item.IdFase > 0 ? item.IdFase : item.Fase.ID.Value;

            var parametros = new Dictionary<string, object>
                        {
                            { "IdEsquema",item.IdEsquema},
                            { "idFase",item.IdFase}
                        };
            return await this.GetAllPlanEsquemaPeriodo(parametros);
        }
        public async Task<object> GetAllPlanEsquemaPeriodo(Dictionary<string,object> parametros)
        {
            var daoComisionesPeriodoEsquema = Get<d.SCV.Interfaces.IComisionPlanEsquemaPeriodo>();
            return await daoComisionesPeriodoEsquema.GetAllPlanEsquema(parametros);
        }
        #endregion

        #region PLAN ESQUEMA DETALLE
        public async Task<object> GetAllPlanEsquemaPeriodoDetalles(Dictionary<string,object>  parametros)
        {
            var daoComisionesPeriodoEsquemaDetalle = Get<d.SCV.Interfaces.IComisionPlanEsquemaPeriodoDetalle>();
            return await daoComisionesPeriodoEsquemaDetalle.GetAllPlanEsquemaDetalle(parametros);
        }
        
        public async Task<object> SavePlanEsquemaPeriodoDetalle(m.SCV.Interfaces.IComisionPlanEsquemaPeriodoDetalle item)
        {
            try
            {
                BeginTransaction(true);
                var daoComisionesPeriodoEsquemaDetalle = Get<d.SCV.Interfaces.IComisionPlanEsquemaPeriodoDetalle>();

                if (item.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                {
                    item.Modificado = DateTime.UtcNow;
                    item.IdModificadoPor = base.getUserId();

                    if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                    {
                        var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                        var estatus = await bpEstatus.Get("ESTATUS", "A");

                        item.Creado = DateTime.UtcNow;
                        item.IdCreadoPor = base.getUserId();
                        item.IdEstatus = estatus.ID.Value;
                    }

                    if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                    {
                        await daoComisionesPeriodoEsquemaDetalle.Delete(item.ID.Value);
                    }
                    else
                    {
                        await daoComisionesPeriodoEsquemaDetalle.SaveEntity(item, false, true);
                    }
                }
                Commit();



            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            var parametros = new Dictionary<string, object>
                        {
                            { "IdPlanEsquemaPeriodo",item.IdPlanEsquemaPeriodo}
                        };

            
            return await this.GetAllPlanEsquemaPeriodoDetalles(parametros);
        }

        #endregion PLAN ESQUEMA DETALLE

        #region COMISION CONFIGURACIONES
        public async Task<List<m.SCV.Interfaces.IComisionConfiguracion>> GetComisionConfiguraciones(Dictionary<string, object> parametros)
        {
            var daoComisionesConfiguracion = Get<d.SCV.Interfaces.IComisionConfiguracion>();
            return await daoComisionesConfiguracion.GetAll(parametros);
        }
        public async Task<List<m.SCV.Interfaces.IComisionConfiguracion>> SaveConfiguracion(m.SCV.Interfaces.IComisionConfiguracion item)
        {
            try
            {
                BeginTransaction(true);
                var daoComisionesConfiguracion = Get<d.SCV.Interfaces.IComisionConfiguracion>();

                if (item.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                {
                    item.Modificado = DateTime.UtcNow;
                    item.IdModificadoPor = base.getUserId();

                    if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                    {
                        var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                        var estatus = await bpEstatus.Get("ESTATUS", "A");

                        item.Creado = DateTime.UtcNow;
                        item.IdCreadoPor = base.getUserId();
                        item.IdEstatus = estatus.ID.Value;
                    }

                    if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                    {
                        await daoComisionesConfiguracion.Delete(item.ID.Value);
                    }
                    else
                    {
                        if (item.IdUbicacion == 0)
                        {
                            item.IdUbicacion = null;
                        }
                        if (item.IdPrototipo == 0)
                        {
                            item.IdPrototipo = null;
                        }
                        if (item.IdEsquema == 0)
                        {
                            item.IdEsquema = null;
                        }
                        await daoComisionesConfiguracion.SaveEntity(item, false, true);
                    }

                }
                Commit();

            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            var p = new Dictionary<string, object>
              {
                 { "idFase",item.IdFase}
              };

            return await this.GetComisionConfiguraciones(p); ;
        }
        #endregion


       
    }
}
