using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;

using p = EK.Procesos.SCV;
using m = EK.Modelo.SCV;
using d = EK.Datos.SCV;

using pk = EK.Procesos.Kontrol;
using mk = EK.Modelo.Kontrol;

namespace EK.Procesos.SCV
{
    public class Esquemas
        : pk.ProcesoBase, p.Interfaces.IEsquemas
    {
        private d.Interfaces.IEsquemas dao;
        private const string catalogo = "esquemas";

        public Esquemas(mk.Interfaces.IContainerFactory factory, d.Interfaces.IEsquemas dao)
            : base(factory, dao, catalogo)
        {
            this.factory = factory;
            this.dao = dao;
        }

        public async Task<object> GetConfiguracion(int idEsquema)
        {
            dynamic retValue = new ExpandoObject();
            var parametros = new Dictionary<string, object>() {
                { "idEsquema", idEsquema}
            };
            //
            retValue.etapas = await this.ComputeNiveles(parametros);
            retValue.requisitos = await this.dao.GetRequisitos(parametros);
            retValue.documentos = await this.dao.GetDocumentos(parametros);
            retValue.procesos = await this.dao.GetProcesos(parametros);
            //
            return retValue;
        }

        #region "Esquema"

        public async Task<List<m.Interfaces.IEsquema>> GetAll(Dictionary<string, object> parametros)
        {
            return await this.dao.GetAll(parametros);
        }

        public async Task<List<m.Interfaces.IEsquema>> GetAllFase(Dictionary<string, object> parametros)
        {
            return await this.dao.GetAllFase(parametros);
        }

        public async Task<m.Interfaces.IEsquema> GetById(int id)
        {
            return await this.dao.GetById(id);
        }

        public async Task<m.Interfaces.IEsquema> Save(m.Interfaces.IEsquema item)
        {
            var retValue = this.factory.GetInstance<m.Interfaces.IEsquema>();

            try
            {
                BeginTransaction(true);

                item.IdCreadoPor = base.getUserId();
                item.IdModificadoPor = this.getUserId();

                int id = await this.dao.Save(item);
                retValue = await this.dao.GetById(item.ID == null || item.ID <= 0 ? id : (int)item.ID);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            await this.Log(retValue);

            return retValue;
        }

        private void handleException(int result)
        {
            if (result == 2 || result == -1)
            {
                throw new Exception("No se pudo eliminar el registro porque el esquema y/o alguno de sus componentes están siendo utilizados por otro proceso.");
            }
        }

        public async Task<m.Interfaces.IEsquema> Delete(int id)
        {
            m.Interfaces.IEsquema retValue = null;

            try
            {
                BeginTransaction(true);
                //
                retValue = await this.dao.GetById(id);
                //
                var parametros = new Dictionary<string, object>() { { "IdEsquema", id } };
                var etapas = await this.dao.GetEtapas(parametros);
                var requisitos = await this.dao.GetRequisitos(parametros);
                var documentos = await this.dao.GetDocumentos(parametros);
                var procesos = await this.dao.GetProcesos(parametros);
                //
                if (procesos != null && procesos.Count > 0)
                {
                    foreach (var p in procesos)
                    {
                        this.handleException(await this.dao.DeleteProceso((int)p.ID));
                    }
                }
                //
                if (documentos != null && documentos.Count > 0)
                {
                    foreach (var d in documentos)
                    {
                        this.handleException(await this.dao.DeleteDocumento((int)d.ID));
                    }
                }
                //
                if (requisitos != null && requisitos.Count > 0)
                {
                    foreach (var r in requisitos)
                    {
                        this.handleException(await this.dao.DeleteRequisito((int)r.ID));
                    }
                }
                //
                if (etapas != null && etapas.Count > 0)
                {
                    foreach (var e in etapas)
                    {
                        this.handleException(await this.dao.DeleteEtapa((int)e.ID));
                    }
                }
                //
                this.handleException(await this.dao.DeleteEsquema(id));
                //
                var deletedItem = await this.dao.GetById(id);
                if (deletedItem == null)
                {
                    retValue.Estado = mk.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    retValue = deletedItem;
                    retValue.Estado = mk.KontrolEstadosEnum.Modificado;
                }

                await Log(retValue);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                base.SetReturnInfo(1, ex.Message);
            }

            return retValue;
        }

        #endregion

        #region "Niveles"

        public async Task<List<m.Interfaces.IEsquemaNivel>> ComputeNiveles(Dictionary<string, object> parametros)
        {
            var etapas = await dao.GetEtapas(parametros);

            //Filtrar la lista de etapas por el Esquema & Orden (Nivel)
            var groups = etapas.GroupBy(e => new { e.IdEsquema, e.Orden });

            //Crear una lista para mantener los niveles creados dinamicamente 
            var niveles = new List<m.Interfaces.IEsquemaNivel>();

            //Loop a los grupos creados por LINQ
            for (int i = 0; i < groups.Count(); i++)
            {
                var nivel = this.factory.GetInstance<m.Interfaces.IEsquemaNivel>();

                //Obtener el grupo de la lista LINQ
                var group = groups.ElementAt(i);

                //Asignar # Orden al nivel a procesar
                nivel.ID = i + 1;
                nivel.Orden = group.Key.Orden.Value;
                nivel.IdEsquema = group.Key.IdEsquema;

                //Cada nivel creado tiene sus etapas
                nivel.Etapas = new List<m.Interfaces.IEsquemaEtapa>();

                //Loop a las etapas de cada grupo
                foreach (var item in group)
                {
                    nivel.IdEsquema = item.IdEsquema;
                    nivel.Etapas.Add(item);
                }

                //Guardar el nivel formado de etapas
                niveles.Add(nivel);
            }

            return niveles;
        }

        public async Task<m.Interfaces.IEsquemaNivel> DeleteNivel(m.Interfaces.IEsquemaNivel item)
        {
            var retValue = this.factory.GetInstance<m.Interfaces.IEsquemaNivel>();

            try
            {
                BeginTransaction(true);

                var parametros = new Dictionary<string, object>()
                {
                    { "IdEsquema", item.IdEsquema },
                    { "Orden", item.Orden }
                };

                //0 - No disponible (no eliminado)
                //1 - Disponible (eliminado)
                int disponible = await this.dao.DeleteEtapa(parametros);
                if (disponible > 0)
                {
                    retValue = item;
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    string mensaje = "No se permite eliminar niveles donde las etapas estén asignadas a uno o más procesos.";
                    if (disponible == -1) mensaje = "No se permite eliminar un nivel donde las etapas estén asignadas a uno o más seguimientos de expediente.";
                    if (disponible == -2) mensaje = "No se permite eliminar un nivel donde las etapas estén asignadas a un plan de comisión por esquema.";

                    base.SetReturnInfo(1, mensaje);
                    retValue = item;
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.SinCambios;
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<List<m.Interfaces.IEsquemaNivel>> UpdateNiveles(m.Interfaces.IEsquema item)
        {
            var niveles = item.Niveles;

            try
            {
                BeginTransaction(true);

                if (niveles != null && niveles.Count > 0)
                {
                    foreach (var nivel in niveles)
                    {
                        nivel.Estado = Modelo.Kontrol.KontrolEstadosEnum.SinCambios;

                        if (nivel.Etapas != null && nivel.Etapas.Count > 0)
                        {
                            foreach (var etapa in nivel.Etapas)
                            {
                                etapa.Orden = nivel.Orden;
                                etapa.IdCreadoPor = base.getUserId();
                                etapa.IdModificadoPor = this.getUserId();

                                await this.dao.SaveEtapa(etapa, 1);

                                etapa.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                                nivel.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                            }
                        }
                    }
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return niveles;
        }

        #endregion

        #region "Etapas"

        public async Task<List<m.Interfaces.IEsquemaEtapa>> GetEtapas(Dictionary<string, object> parametros)
        {
            return await this.dao.GetEtapas(parametros);
        }

        public async Task<List<m.Interfaces.IEsquemaEtapa>> GetEtapasXEsquema(Dictionary<string, object> parametros)
        {
            return await this.dao.GetEtapasXEsquema(parametros);
        }

        public async Task<m.Interfaces.IEsquemaEtapa> SaveEtapa(m.Interfaces.IEsquemaEtapa item)
        {
            var retValue = this.factory.GetInstance<m.Interfaces.IEsquemaEtapa>();

            try
            {
                BeginTransaction(true);

                var parametros = new Dictionary<string, object>();
                parametros.Add("idEsquema", item.IdEsquema);
                parametros.Add("idEtapa", item.IdEtapa);

                //Consultar la etapa actual en el Esquema
                List<m.Interfaces.IEsquemaEtapa> items = await this.dao.GetEtapas(parametros);
                m.Interfaces.IEsquemaEtapa current = items.FirstOrDefault();

                //Validar si la etapa a grabar ya existe en el esquema.
                //Si current es null entonces la etapa no existe.
                if (current != null && item.ID != current.ID)
                {
                    base.SetReturnInfo(2, "La etapa [" + item.Etapa.Nombre + "] ya existe en el esquema.");
                    retValue = item;
                    retValue.Estado = mk.KontrolEstadosEnum.SinCambios;
                }
                else
                {
                    item.IdCreadoPor = base.getUserId();
                    item.IdModificadoPor = this.getUserId();

                    int id = await this.dao.SaveEtapa(item, null);
                    retValue = await this.dao.GetEtapaById(item.ID == null || item.ID <= 0 ? id : (int)item.ID);
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<m.Interfaces.IEsquemaEtapa> DeleteEtapa(int id)
        {
            var retValue = this.factory.GetInstance<m.Interfaces.IEsquemaEtapa>();

            try
            {
                BeginTransaction(true);

                retValue = await this.dao.GetEtapaById(id);

                var parametros = new Dictionary<string, object>()
                {
                    { "IdEsquema", retValue.IdEsquema },
                    { "IdEtapa", retValue.IdEtapa }
                };

                //0 - No disponible (no eliminado)
                //1 - Disponible (eliminado)
                int disponible = await this.dao.DeleteEtapa(parametros);
                if (disponible > 0)
                {
                    retValue.Estado = mk.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    string mensaje = "No se permite eliminar una etapa que está asignada a uno o más procesos.";
                    if (disponible == -1) mensaje = "No se permite eliminar una etapa que esté asignada a uno o más seguimientos de expediente.";
                    if (disponible == -2) mensaje = "No se permite eliminar una etapa que esté asignada a un plan de comisión por esquema.";

                    base.SetReturnInfo(4, mensaje);
                    retValue.Estado = mk.KontrolEstadosEnum.SinCambios;
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        #endregion

        #region "Requisitos"

        public async Task<List<m.Interfaces.IEsquemaEtapaRequisito>> GetRequisitos(Dictionary<string, object> parametros)
        {
            return await this.dao.GetRequisitos(parametros);
        }

        public async Task<m.Interfaces.IEsquemaEtapaRequisito> SaveRequisito(m.Interfaces.IEsquemaEtapaRequisito item)
        {
            var retValue = Get<m.Interfaces.IEsquemaEtapaRequisito>();

            try
            {
                BeginTransaction(true);
                //
                m.Interfaces.IEsquemaEtapaRequisito itemFound = null;
                var parametros = new Dictionary<string, object>();
                parametros.Add("idEsquema", item.IdEsquema);
                parametros.Add("idEtapa", item.IdEtapa);
                //
                var requisitos = await this.dao.GetRequisitos(parametros);
                if (requisitos != null && requisitos.Count > 0)
                {
                    foreach (var req in requisitos)
                    {
                        if (req.IdRequisito == item.IdRequisito)
                        {
                            itemFound = req;
                            break;
                        }
                    }
                }
                //
                if (itemFound != null && itemFound.ID != item.ID)
                {
                    retValue = item;
                    retValue.Estado = mk.KontrolEstadosEnum.SinCambios;

                    base.SetReturnInfo(5, "El requisito ya existe en la etapa");
                }
                else
                {
                    item.IdCreadoPor = base.getUserId();
                    item.IdModificadoPor = this.getUserId();

                    int id = await this.dao.SaveRequisito(item);
                    retValue = await this.dao.GetRequisitoById(item.ID == null || item.ID <= 0 ? id : (int)item.ID);
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<m.Interfaces.IEsquemaEtapaRequisito> DeleteRequisito(int id)
        {
            var retValue = this.factory.GetInstance<m.Interfaces.IEsquemaEtapaRequisito>();

            try
            {
                BeginTransaction(true);

                retValue = await this.dao.GetRequisitoById(id);

                await this.dao.DeleteRequisito(id);

                var deletedItem = await this.dao.GetRequisitoById(id);
                if (deletedItem == null)
                {
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    retValue = deletedItem;
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        #endregion

        #region "Documentos"

        public async Task<List<m.Interfaces.IEsquemaEtapaDocumento>> GetDocumentos(Dictionary<string, object> parametros)
        {
            return await this.dao.GetDocumentos(parametros);
        }

        public async Task<m.Interfaces.IEsquemaEtapaDocumento> SaveDocumento(m.Interfaces.IEsquemaEtapaDocumento item)
        {
            var retValue = this.factory.GetInstance<m.Interfaces.IEsquemaEtapaDocumento>();

            try
            {
                BeginTransaction(true);

                item.IdCreadoPor = base.getUserId();
                item.IdModificadoPor = this.getUserId();

                int id = await this.dao.SaveDocumento(item);
                retValue = await this.dao.GetDocumentoById(item.ID == null || item.ID <= 0 ? id : (int)item.ID);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<m.Interfaces.IEsquemaEtapaDocumento> DeleteDocumento(int id)
        {
            var retValue = this.factory.GetInstance<m.Interfaces.IEsquemaEtapaDocumento>();

            try
            {
                BeginTransaction(true);

                retValue = await this.dao.GetDocumentoById(id);

                await this.dao.DeleteDocumento(id);

                var deletedItem = await this.dao.GetDocumentoById(id);
                if (deletedItem == null)
                {
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    retValue = deletedItem;
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        #endregion

        #region "Procesos"

        public async Task<List<m.Interfaces.IEsquemaEtapaProceso>> GetProcesos(Dictionary<string, object> parametros)
        {
            return await this.dao.GetProcesos(parametros);
        }

        public async Task<m.Interfaces.IEsquemaEtapaProceso> SaveProceso(m.Interfaces.IEsquemaEtapaProceso item)
        {
            var retValue = this.factory.GetInstance<m.Interfaces.IEsquemaEtapaProceso>();

            try
            {
                BeginTransaction(true);

                item.IdCreadoPor = base.getUserId();
                item.IdModificadoPor = this.getUserId();

                int id = await this.dao.SaveProceso(item);
                retValue = await this.dao.GetProcesoById(item.ID == null || item.ID <= 0 ? id : (int)item.ID);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<m.Interfaces.IEsquemaEtapaProceso> DeleteProceso(int id)
        {
            var retValue = this.factory.GetInstance<m.Interfaces.IEsquemaEtapaProceso>();

            try
            {
                BeginTransaction(true);

                retValue = await this.dao.GetProcesoById(id);

                await this.dao.DeleteProceso(id);

                var deletedItem = await this.dao.GetProcesoById(id);
                if (deletedItem == null)
                {
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    retValue = deletedItem;
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        #endregion

        public async Task<object[]> GetEsquemasInstitucion(int idInstitucion)
        {
            return await this.dao.GetEsquemasInstitucion(idInstitucion);
        }
    }
}