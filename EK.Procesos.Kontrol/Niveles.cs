using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

using Newtonsoft.Json;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol
{
    public class Niveles
        : BPBase<m.Kontrol.Interfaces.INivel, d.Kontrol.Interfaces.INiveles>, p.Kontrol.Interfaces.INiveles
    {
        public Niveles(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.INiveles dao)
               : base(factory, dao, "niveles")
        {
        }


        public async Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetConfiguracion(int idNivel, int idModulo)
        {
            var modulos = (Modulos) factory.GetInstance<p.Kontrol.Interfaces.IModulos>();

            return modulos.GetOpciones(await this.dao.GetConfiguracion(idNivel, idModulo));
        }
        public override async Task<m.Kontrol.Interfaces.INivel> Save(m.Kontrol.Interfaces.INivel item)
        {
            try
            {
                BeginTransaction(true);

                var nivelesOpciones = item.Permisos;
                var nivelesEtapas = item.EtapasAsignadas;
                //Guardardo elemento actual
                item = await base.saveModel(item);
                //Obteniendo Id
                int idNivel = item.ID ?? 0;
                var daoNivelesOpciones = Get<d.Kontrol.Interfaces.INivelesOpciones>();
                var daoNivelesReportes = Get<d.Kontrol.Interfaces.INivelesReportes>();
                var daoNivelesEtapas = Get<d.Kontrol.Interfaces.INivelesEtapas>();

                var parametros = new Dictionary<string, object> { { "idNivel", item.ID }, { "etapasAsignadas", true } };
                var listaNivelesEtapas = await daoNivelesEtapas.GetAll(parametros);

                    if ((nivelesOpciones != null && nivelesOpciones.Count > 0))
                    {
                        foreach (var nivelOpcion in nivelesOpciones)
                        {
                            if (nivelOpcion.Modulo.Clave != "RPT")
                            {
                                nivelOpcion.IdNivel = idNivel;
                                await daoNivelesOpciones.SaveEntity(nivelOpcion, false, true);
                            }
                            else
                            {
                                var permisoReporte = Get<m.Kontrol.Interfaces.INivelesReportes>();
                                permisoReporte.ID = nivelOpcion.ID;
                                permisoReporte.IdNivel = idNivel;
                                permisoReporte.IdReporte = nivelOpcion.IdOpcion;
                                permisoReporte.Version = nivelOpcion.Version;
                                permisoReporte.Permisos = nivelOpcion.Permisos;
                                if (nivelOpcion.ID > 0)
                                {
                                    permisoReporte.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                }
                                else
                                {
                                    permisoReporte.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                }
                                //
                                await daoNivelesReportes.SaveEntity(permisoReporte, false, true);
                            }
                        }
                    }

                    if (nivelesEtapas != null && nivelesEtapas.Count > 0)
                    {
                        foreach (var etapa in nivelesEtapas)
                        {
                            if (etapa.Estado == Modelo.Kontrol.KontrolEstadosEnum.Nuevo && etapa.ID == -1)
                            {
                                var elemento = await base.Assign(etapa);
                                elemento.IdNivel = idNivel;
                                elemento.IdEtapa = elemento.Etapa.ID;
                                await daoNivelesEtapas.SaveEntity(elemento, false);
                            }
                            else if (etapa.ID > 0)
                            {
                                if (etapa.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios
                                    && etapa.Orden != null)
                                {
                                    etapa.Modificado = DateTime.UtcNow;
                                    etapa.IdModificadoPor = base.getUserId();
                                    etapa.Changed("Orden", true);
                                    etapa.Changed("IdEtapa", true);
                                    etapa.Changed("EtapaAsignada", true);
                                    await daoNivelesEtapas.SaveEntity(etapa, false);

                                }
                            }
                        }
                    }

                    /*Eliminar etapas no asignadas*/
                    if (nivelesEtapas != null && listaNivelesEtapas != null)
                    {
                        if ((nivelesEtapas.Count != listaNivelesEtapas.Count) && (listaNivelesEtapas.Count != 0))
                        {
                            foreach (var nivelEt in listaNivelesEtapas)
                            {
                                bool existeElemento = existeNivelEtapa(nivelesEtapas, nivelEt.IdEtapa.Value);
                                if (existeElemento == false)
                                {
                                    await daoNivelesEtapas.Delete(nivelEt.ID.Value, "NivelesEtapas");
                                }
                            }
                        }

                    }

                 Commit();
                 return item;
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("GetConfiguracion::" + ex.Message, ex);
            }
        }

        public async Task<object> ObtenerEtapasNivel(Dictionary<string, object> parametros)
         {
            var daoNivelesEtapas = Get<d.Kontrol.Interfaces.INivelesEtapas>();
           return await daoNivelesEtapas.obetnerEtapasNiveles(parametros);
        }

        private bool existeNivelEtapa(List<m.Kontrol.Interfaces.INivelesEtapas> nivelesEtapas, int IdEtapa)
        {
            bool result = false;
            foreach (var item in nivelesEtapas)
            {
                if (item.IdEtapa == IdEtapa)
                {
                    result = true;
                }
            }
            return result;
        }

    }
}

//public async Task<object[]> SaveConfiguracion(string configuracion)
//{
//    dynamic obj = JsonConvert.DeserializeObject(configuracion);
//    int idNivel = obj.idNivel;
//    int idModulo = obj.idModulo;
//    dynamic acciones = obj.acciones;

//    try
//    {
//        BeginTransaction();

//        var nivelesDAO = Get<d.Kontrol.Interfaces.INiveles>();
//        foreach (dynamic a in acciones)
//        {
//            int idOpcion = a.idOpcion;
//            int permisos = a.permisos;

//            //dynamic history = new ExpandoObject();
//            //history.IdEntidad = item.ID;
//            //history.IdEntidadClave = item.Clave;
//            //history.IdEntidadNombre = item.Nombre;
//            //history.IdTipo = a.TipoClasificador.ID;
//            //history.IdTipoClave = a.TipoClasificador.Clave;
//            //history.IdTipoNombre = a.TipoClasificador.Nombre;
//            //history.IdClasificador = a.ID;
//            //history.IdClasificadorClave = a.Clave;
//            //history.IdClasificadorNombre = a.Nombre;

//            await nivelesDAO.GuardarConfiguracion(idNivel, idOpcion, permisos);

//            //history.RecordType = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
//            //await this.LogClasificadores(entidad, history);
//        }

//        Commit();
//    }
//    catch
//    {
//        Rollback();
//        throw;
//    }

//    return await this.GetConfiguracion(idNivel, idModulo);
//}
