using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using EK.Modelo.Kontrol.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace EK.Procesos.SCV
{
    public class TramiteAsignado
        : p.Kontrol.BPBase<m.SCV.Interfaces.ITramiteAsignado, d.SCV.Interfaces.ITramiteAsignado>, p.SCV.Interfaces.ITramiteAsignado
    {
        public TramiteAsignado(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ITramiteAsignado dao)
            : base(factory, dao, "tramiteasignado")
        {

        }

        //protected override void Log(dynamic entity, dynamic obj)
        //{

        //}

        public override async Task<m.SCV.Interfaces.ITramiteAsignado> Save(m.SCV.Interfaces.ITramiteAsignado item)
        {
            var tramites = item.Tramites;            
            var idTramiteAsignacion = item.ID ?? 0;
            item = await base.saveModel(item);
            var daoTramiteConfiguacion = Get<d.SCV.Interfaces.ITramiteAsignadoConfiguracion>();
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");
            var estatusBaja = await bpEstatus.Get("ESTATUS", "B");
            try
            {
                if(tramites.Count > 0)          
                {
                    foreach(var tramite in tramites)
                    {
                        var tramiteConfiguracion = Get<m.SCV.Interfaces.ITramiteAsignadoConfiguracion>();
                        //tramiteConfiguracion.ID = tramite.ID;                        
                        var parametros = new Dictionary<string, object>() {
                            { "idTramiteAsignado", idTramiteAsignacion},
                            { "idTramite", tramite.ID }
                        };
                        var tramiteCheck = await daoTramiteConfiguacion.GetAll(parametros);
                        if (tramiteCheck.Count == 0)
                        {
                            if (tramite.Asignado != null)
                            {
                                tramiteConfiguracion.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                tramiteConfiguracion.IdTramite = tramite.ID;
                                tramiteConfiguracion.IdTramiteAsignado = idTramiteAsignacion;
                                tramiteConfiguracion.IdEstatus = estatus.ID;
                                tramiteConfiguracion.Estatus = estatus;
                                tramiteConfiguracion.Version = tramite.Version;
                                await daoTramiteConfiguacion.SaveEntity(tramiteConfiguracion, false, true);
                            }
                        }
                        else
                        {
                            tramiteCheck[0].Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                            if (tramite.Asignado == null || tramite.Asignado == false)
                            {
                                tramiteCheck[0].IdEstatus = estatusBaja.ID;
                            }
                            else
                            {
                                tramiteCheck[0].IdEstatus = estatus.ID;
                            }
                            tramiteCheck[0].Changed("IdEstatus", true);
                            await daoTramiteConfiguacion.SaveEntity(tramiteCheck[0], false, false);                            
                        }                 
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
            return item;
        }

        public async Task<List<ITramiteAsignadoConfiguracion>> GetTramites(Dictionary<string, object> parametros)
        {
            var daotramites = Get<d.SCV.Interfaces.ITramiteAsignadoConfiguracion>();
            return await daotramites.GetAll(parametros);
        }

        public async Task<List<ISeguimientoTecnico>> GetTramitesByDesarrolloPrototipo(Dictionary<string, object> parametros)
        {
            var paramAsignacion = new Dictionary<string, object>() {
                            { "IdDesarrollo", parametros["IdDesarrollo"] },
                            { "IdPrototipo", parametros["IdPrototipo"] }
                        };
            var asignacion = await base.GetAll(paramAsignacion);
            if(asignacion.Count > 0)
            {
                var idAsignacion = asignacion[0].ID;
                var parametrosConfiguracion = new Dictionary<string, object>() {
                            { "completado", 1},
                            { "idAsignacion", idAsignacion },
                            { "idUbicacion", parametros["IdUbicacion"] }
                        };
                var daoSeguimiento = Get<d.SCV.Interfaces.ISeguimientoTecnico>();
                var returnTramites = await daoSeguimiento.GetAll(parametrosConfiguracion);
                return returnTramites;
            }
            else
            {
                return null;
            }
        }   
    }
}
