using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using System.Dynamic;

namespace EK.Procesos.SCV
{
    public class Eventos : p.Kontrol.BPBase<m.SCV.Interfaces.IEventos, d.SCV.Interfaces.IEventos>, p.SCV.Interfaces.IEventos
    {
        public Eventos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IEventos dao)
          : base(factory, dao, "EventosActividades")
        {
        }

        #region +++++ALTA EVENTOS+++++
        public async Task<object[]> CrudPosiblesAlianzas(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.CrudPosiblesAlianzas(parametros);
            return Result;
        }
        public async Task<object[]> GetMediosDifusion(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetMediosDifusion(parametros);

            return Result;
        }
        public async Task<object[]> DeleteUpdateRelsEvento(Dictionary<string, object> parametros)
        {
            BeginTransaction();
            var Result = await this.dao.DeleteUpdateRelsEvento(parametros);
            Commit();

            return Result;
        }
        public async Task<IEventosActividades> GetEventById(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetEventByID(parametros);
            List<IInvitadosEspeciales> invitados = await this.dao.GetInvitadosEspecialesByIdEvent(parametros);
            List<IPosiblesAlianzas> posiblesAlianzas = await this.dao.GetPosiblesAlianzasByIdEvent(parametros);
            List<IObservacionesRequerimientos> observacionesRequerimientos = await this.dao.GetObservacionesReqByIdEvent(parametros);
            List<IPermisos> permisos = await this.dao.GetPermisosByIdEvent(parametros);
            Result.InvitadosEspeciales = new List<IInvitadosEspeciales>();
            Result.PosiblesAlianzas = new List<IPosiblesAlianzas>();
            Result.ObservacionesReq = new List<IObservacionesRequerimientos>();
            Result.Permisos = new List<IPermisos>();
            if (invitados.Count > 0)
            {
                Result.InvitadosEspeciales.AddRange(invitados);
            }
            if (posiblesAlianzas.Count > 0)
            {
                Result.PosiblesAlianzas.AddRange(posiblesAlianzas);
            }
            if (observacionesRequerimientos.Count > 0)
            {
                Result.ObservacionesReq.AddRange(observacionesRequerimientos);
            }
            if (permisos.Count > 0)
            {
                Result.Permisos.AddRange(permisos);
            }

            return Result;
        }
        public async Task<int> SaveEvent(List<IEventosActividadesParam> parametros)
        {
            IEventosActividadesParam data = parametros[0];
            Dictionary<string, object> param = new Dictionary<string, object>();

            try
            {
                BeginTransaction();
                var usuario = getUserId();
                int result = 0;
               // param.Add("CLASIFICACION", data.Clasificacion);
                param.Add("NOMBRE", data.Nombre);
                param.Add("ALCANCEEVENTO", data.AlcanceEvento);
                param.Add("TIPOEVENTO", data.TipoEvento);
                param.Add("PLAZA", data.Plaza);
                param.Add("TIPOVIVIENDA", data.TipoVivienda);
                param.Add("FRACCIONAMIENTO", data.Fraccionamiento);
                param.Add("FECHAPROGRAMACION", data.FechaProgramacion);
                param.Add("ENTITYPROGRAMAEVENTO", "EVENTOSDC");
                param.Add("NUMEROSTAFF", data.NumeroStaff);
                param.Add("MEDIODIFUSION", data.MediosDifusion);
                param.Add("METAASISTENCIAEVENTO", data.MetaAsistencia);
                param.Add("PARTICIPANTES", data.Participantes);
                param.Add("EMPRESAS", data.Empresas);
                param.Add("IMPACTOCOMUNIDAD", data.Impacto);
                param.Add("CLASIFICACIONEVENTOS", data.ClasificacionEvento);
                param.Add("VOLANTEO", data.Volanteo);
                param.Add("PRENSA", data.Prensa);
                param.Add("PERIFONEO", data.Perifoneo);
                param.Add("REDES", data.RedesSociales);
                param.Add("CORREO", data.CorreoElectronico);
                param.Add("MEDIOSCOMUNICACION", data.MediosComunicacion);
                param.Add("OPERACION", "INSERT");
                param.Add("USUARIO", getUserId());
                var Id = await this.dao.SaveEvent(param);
                if (Id > 0)
                {
                    if (data.PosiblesAlianzas.Count > 0)
                    {
                        foreach (var x in data.PosiblesAlianzas)
                        {
                            param.Clear();
                            param.Add("IDEVENTO", Id);
                            param.Add("IDPOSIBLEALIANZA", x.ID);
                            param.Add("OPERACION", "INSERT");
                            param.Add("USUARIO", usuario);
                            var alianzas = await this.dao.SaveRelEventPA(param);
                        }
                    }
                    if (data.ObservacionesReq.Count > 0)
                    {
                        foreach (var x in data.ObservacionesReq)
                        {
                            param.Clear();
                            param.Add("IDEVENTO", Id);
                            param.Add("OBSERVACIONREQ", x.DescripcionObsReq);
                            param.Add("OPERACION", "INSERT");
                            param.Add("USUARIO", usuario);
                            var obsercacionesReq = await this.dao.SaveObservacionesReq(param);
                        }
                    }
                    if (data.Permisos.Count > 0)
                    {
                        foreach (var x in data.Permisos)
                        {
                            param.Clear();
                            param.Add("IDEVENTO", Id);
                            param.Add("PERMISO", x.Permiso);
                            param.Add("USUARIO", usuario);
                            param.Add("OPERACION", "INSERT");
                            var permisos = await this.dao.SavePermisos(param);
                        }
                    }
                    if (data.InvitadosEspeciales.Count > 0)
                    {
                        foreach (var x in data.InvitadosEspeciales)
                        {
                            int confirmo = x.Confirmo ? 1 : 0;
                            param.Clear();
                            param.Add("IDEVENTO", Id);
                            param.Add("NOMBRE", x.Nombre);
                            param.Add("APELLIDOPATERNO", x.ApellidoPaterno);
                            param.Add("APELLIDOMATERNO", x.ApellidoMaterno);
                            param.Add("CARGO", x.Cargo);
                            param.Add("CONFIRMO", confirmo);
                            param.Add("USUARIO", usuario);
                            param.Add("OPERACION", "INSERT");
                            var permisos = await this.dao.SaveInvitadosEspeciales(param);
                        }
                    }
                    result = Id;
                }
                else
                {
                    result = -1;
                }
                Commit();

                return result;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

        }
        public async Task<int> UpdateEvent(List<IEventosActividadesParam> parametros)
        {

            //BeginTransaction();
            //parametros.Add("USUARIO", getUserId());
            //var Result = await this.dao.UpdateEvent(parametros);
            //Commit();
            //return Result;
            try
            {
                IEventosActividadesParam data = parametros[0];
                Dictionary<string, object> param = new Dictionary<string, object>();

                BeginTransaction();
                var usuario = getUserId();
                int result = 0;
                param.Add("ID", data.ID);
               // param.Add("CLASIFICACION", data.Clasificacion);
                param.Add("NOMBRE", data.Nombre);
                param.Add("ALCANCEEVENTO", data.AlcanceEvento);
                param.Add("TIPOEVENTO", data.TipoEvento);
                param.Add("TIPOVIVIENDA", data.TipoVivienda);
                param.Add("FRACCIONAMIENTO", data.Fraccionamiento);
                param.Add("FECHAREPROGRAMACION", data.FechaReProgramacion);
                param.Add("MOTIVOREPROGRAMACION", data.MotivoReprogramacion);
                param.Add("MEDIODIFUSION", data.MediosDifusion);
                param.Add("NUMEROSTAFF", data.NumeroStaff);
                param.Add("METAASISTENCIAEVENTO", data.MetaAsistencia);
                param.Add("PARTICIPANTES", data.Participantes);
                param.Add("EMPRESAS", data.Empresas);
                param.Add("IMPACTOCOMUNIDAD", data.Impacto);
                param.Add("CLASIFICACIONEVENTOS", data.ClasificacionEvento);
                param.Add("VOLANTEO", data.Volanteo);
                param.Add("PRENSA", data.Prensa);
                param.Add("PERIFONEO", data.Perifoneo);
                param.Add("REDES", data.RedesSociales);
                param.Add("CORREO", data.CorreoElectronico);
                param.Add("MEDIOSCOMUNICACION", data.MediosComunicacion);
                param.Add("OPERACION", "UPDATE");
                param.Add("USUARIO", getUserId());
                var Id = await this.dao.UpdateEvent(param);

                if (Id > 0)
                {
                    param.Clear();
                    param.Add("OPERACION", "DELETEPOSIBLEALIANZAEVENTO");
                    param.Add("ID", data.ID);
                    await this.dao.deleteRels(param);
                    if (data.PosiblesAlianzas.Count > 0)
                    {
                        foreach (var x in data.PosiblesAlianzas)
                        {
                            param.Clear();
                            param.Add("IDEVENTO", data.ID);
                            param.Add("IDPOSIBLEALIANZA", x.ID);
                            param.Add("OPERACION", "INSERT");
                            param.Add("USUARIO", usuario);
                            var alianzas = await this.dao.SaveRelEventPA(param);
                        }
                    }
                    param.Clear();
                    param.Add("OPERACION", "DELETEOBSREQ");
                    param.Add("ID", data.ID);
                    await this.dao.deleteRels(param);
                    if (data.ObservacionesReq.Count > 0)
                    {
                        foreach (var x in data.ObservacionesReq)
                        {
                            param.Clear();
                            param.Add("IDEVENTO", data.ID);
                            param.Add("OBSERVACIONREQ", x.DescripcionObsReq);
                            param.Add("OPERACION", "INSERT");
                            param.Add("USUARIO", usuario);
                            var obsercacionesReq = await this.dao.SaveObservacionesReq(param);
                        }
                    }
                    param.Clear();
                    param.Add("OPERACION", "DELETEPERMISOS");
                    param.Add("ID", data.ID);
                    await this.dao.deleteRels(param);
                    if (data.Permisos.Count > 0)
                    {
                        
                        foreach (var x in data.Permisos)
                        {
                            param.Clear();
                            param.Add("IDEVENTO", data.ID);
                            param.Add("PERMISO", x.Permiso);
                            param.Add("USUARIO", usuario);
                            param.Add("OPERACION", "INSERT");
                            var permisos = await this.dao.SavePermisos(param);
                        }
                    }
                    param.Clear();
                    param.Add("OPERACION", "DELETEINVITADOS");
                    param.Add("ID", data.ID);
                    await this.dao.deleteRels(param);
                    if (data.InvitadosEspeciales.Count > 0)
                    {
                       
                        foreach (var x in data.InvitadosEspeciales)
                        {
                            int confirmo = x.Confirmo ? 1 : 0;
                            param.Clear();
                            param.Add("IDEVENTO", data.ID);
                            param.Add("NOMBRE", x.Nombre);
                            param.Add("APELLIDOPATERNO", x.ApellidoPaterno);
                            param.Add("APELLIDOMATERNO", x.ApellidoMaterno);
                            param.Add("CARGO", x.Cargo);
                            param.Add("CONFIRMO", confirmo);
                            param.Add("USUARIO", usuario);
                            param.Add("OPERACION", "INSERT");
                            var permisos = await this.dao.SaveInvitadosEspeciales(param);
                        }
                    }
                    result = Id;
                }
                else
                {
                    result = -1;
                }
                Commit();

                return result;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

           
        }
        public async Task<object[]> Search(Dictionary<string, object> parametros)
        {
            parametros.Add("OPERACION", "SEARCH");
            return await this.dao.Search(parametros);
        }
        public async Task<int> AddPosiblesAlianzas(Dictionary<string, object> parametros)
        {
            BeginTransaction();
            parametros.Add("USUARIO", getUserId());
            var alianzas = await this.dao.SaveRelEventPA(parametros);
            Commit();

            return alianzas;
        }
        public async Task<int> AddObservacionesReq(Dictionary<string, object> parametros)
        {
            BeginTransaction();
            parametros.Add("USUARIO", getUserId());
            var obsercacionesReq = await this.dao.SaveObservacionesReq(parametros);

            Commit();

            return obsercacionesReq;
        }
        public async Task<int> AddPermisos(Dictionary<string, object> parametros)
        {
            BeginTransaction();
            parametros.Add("USUARIO", getUserId());
            var obsercacionesReq = await this.dao.SavePermisos(parametros);

            Commit();

            return obsercacionesReq;
        }
        public async Task<int> AddInvitadosEspeciales(Dictionary<string, object> parametros)
        {
            BeginTransaction();
            parametros.Add("USUARIO", getUserId());
            var obsercacionesReq = await this.dao.SaveInvitadosEspeciales(parametros);

            Commit();

            return obsercacionesReq;
        }
        #endregion

        #region +++++CAPTURA EVENTOS ++++
        public async Task<object[]> EventosSelect(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", getUserId());
            parametros.Add("OPERACION", "SEARCHEVENTOBYUSER");
            var Result = await this.dao.EventosSelect(parametros);
            return Result;
        }
        public async Task<object[]> GetPatrocinadores(Dictionary<string, object> parametros)
        {
            parametros.Add("OPERACION", "GETPATROCINADORES");
            var Result = await this.dao.GetPatrocinadores(parametros);
            return Result;
        }
        public async Task<object[]> GetEventActSimple(Dictionary<string, object> parametros)
        {
            parametros.Add("OPERACION", "GETEVENTACTSIMPLE");
            var Result = await this.dao.GetEventActSimple(parametros);
            return Result;
        }
        public async Task<object[]> CrudPatrocinadores(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", getUserId());
            var Result = await this.dao.CrudPatrocinadores(parametros);
            return Result;
        }
        public async Task<int> SaveEventCapture(List<IEventosActividadesCaptura> parametros)
        {
            IEventosActividadesCaptura data = parametros[0];
            Dictionary<string, object> param = new Dictionary<string, object>();

            try
            {
                BeginTransaction();
                var usuario = getUserId();
                int result = 0;
                param.Add("IDEVENTO", data.IdEvento);
                param.Add("IDORGANIZADOR", data.IdOrganizador);
                param.Add("ANTECEDENTES", data.Antecedentes);
                param.Add("IMPACTOESPERADO", data.ImpactoEsperado);
                param.Add("GASTOSTOTALES", data.GastosTotales);
                param.Add("RUBA", data.Ruba);
                param.Add("PORCENTAJERUBA", data.Porcentaje);
                param.Add("HORASINTERVENCIONTOTALES", data.HorasIntervencion);
                param.Add("METAASISTENCIA", data.MetaAsistencia);
                param.Add("NUMEROASISTENTES", data.NumeroAsistentes);
                param.Add("PORCENTAJEMETA", data.PorcentajeMeta);
                param.Add("PRESENCIAPRENSA", data.PresenciaPrensa);
                param.Add("PROGRAMARECOMENDADOS", data.ProgramaRecomendados);
                param.Add("IMAGEN", data.Imagen);
                param.Add("INTEGRACION", data.Integracion);
                param.Add("SERVICIOS", data.Servicios);
                param.Add("SUSTENTABILIDAD", data.Sustentabilidad);
                param.Add("USUARIO", usuario);

                var Id = await this.dao.SaveEventCapture(param);
                if (Id > 0)
                {
                    if (data.Patrocinadores.Count > 0)
                    {
                        foreach (var x in data.Patrocinadores)
                        {
                            param.Clear();
                            param.Add("IDEVENTO", Id); //Id evento captura
                            param.Add("IDPATROCINADOR", x.IdPatrocinador);
                            param.Add("CANTIDAD", x.Cantidad);
                            param.Add("ESPECIE", x.Especie);
                            param.Add("TIPOESPECIE", x.TipoEspecie);
                            param.Add("PORCENTAJE", x.Porcentaje);
                            param.Add("USUARIO", usuario);
                            var id = await this.dao.SavePatrocinadores(param);
                        }
                    }
                }
                result = Id;
                Commit();

                return result;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

        }

        public async Task<IEventosActividadesCaptura> GetEventoCapturaByIdEvento(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetEventoCapturaByIdEvento(parametros);
            if (Result != null)
            {
                parametros.Clear();
                parametros.Add("OPERACION", "GETLISTPATROCINADORESBYEVENTOCAPTURA");
                parametros.Add("ID", Result.ID);
                List<IPatrocinadoresPorcentaje> patrocinadores = await this.dao.GetListPatrocinadores(parametros);
                if (patrocinadores.Count > 0)
                {
                    Result.Patrocinadores = new List<IPatrocinadoresPorcentaje>();
                    Result.Patrocinadores.AddRange(patrocinadores);
                }
            }

            return Result;
        }

        public async Task<int> UpdateEventCaptura(Dictionary<string, object> parametros)
        {
            BeginTransaction();
            parametros.Add("USUARIO", getUserId());
            var Result = await this.dao.UpdateEventCaptura(parametros);
            Commit();

            return Result;
        }
        public async Task<int> SavePatrocinadores(Dictionary<string, object> parametros)
        {
            BeginTransaction();
            parametros.Add("USUARIO", getUserId());
            var Result = await this.dao.SavePatrocinadores(parametros);
            Commit();

            return Result;
        }
        public async Task<int> UpdatePatrocinadoresEvento(Dictionary<string, object> parametros)
        {
            BeginTransaction();
            parametros.Add("USUARIO", getUserId());
            var Result = await this.dao.UpdatePatrocinadoresEvento(parametros);
            Commit();

            return Result;
        }
        public async Task<int> DeletePatrocinadoresEvento(Dictionary<string, object> parametros)
        {
            BeginTransaction();
            parametros.Add("USUARIO", getUserId());
            var Result = await this.dao.DeletePatrocinadoresEvento(parametros);
            Commit();

            return Result;
        }
        #endregion

        #region +++++ ALTA PARTICIPANTES PATROCINADORES COLABORADORES
        public async Task<IEventosActividadesPPC> GetEventosActividadesPPC (Dictionary<string, object> parametros)
        {
            var data = Get<IEventosActividadesPPC>();
            int IdEvento = Convert.ToInt32(parametros["ID"]);

            parametros.Add("IDEVENTO", IdEvento);
            parametros.Add("OPERACION", "GETPARTICIPANTES");
            var Participates = await this.dao.GetParticipantes(parametros);

            parametros.Clear();
            parametros.Add("IDEVENTO", IdEvento);
            parametros.Add("OPERACION", "GETPATROCINADORES");
            var Patrocinadores = await this.dao.GetPatrocinadoresPPC(parametros);

            parametros.Clear();
            parametros.Add("IDEVENTO", IdEvento);
            parametros.Add("OPERACION", "GETCOLABORADORES");
            var Colaboradores = await this.dao.GetColaboradores(parametros);

            if (Participates.Count > 0)
            {
                data.Participantes = new List<IParticipantes>();
                data.Participantes.AddRange(Participates);
            }
            if(Patrocinadores.Count > 0)
            {
                data.Patrocinadores = new List<IPatrocinadores>();
                data.Patrocinadores.AddRange(Patrocinadores);
            }
            if(Colaboradores.Count > 0)
            {
                data.Colaboradores = new List<IColaboradoresPPC>();
                data.Colaboradores.AddRange(Colaboradores);       
            }
            data.IdEvento = IdEvento;
            return data;
        }

        public async Task<int> SaveEventActividadesPPC(List<IEventosActividadesPPC> parametros)
        {
            IEventosActividadesPPC data = parametros[0];
            Dictionary<string, object> param = new Dictionary<string, object>();
            int IdEvento = (int)data.IdEvento;
            try
            {
                BeginTransaction();
                var usuario = getUserId();
                int result = 1;
                
                if(data.Participantes.Count > 0)
                {
                    foreach(var x in data.Participantes)
                    {
                        param.Clear();
                        param.Add("IDEVENTO", IdEvento);
                        param.Add("HOMBRE", x.hombre);
                        param.Add("MUJER", x.mujer);
                        param.Add("NINO", x.ninos);
                        param.Add("ADULTOMAYOR", x.amayores);
                        param.Add("TOTAL", x.total);
                        //param.Add("NOMBRE", x.Nombre);
                        //param.Add("APELLIDOPATERNO", x.ApellidoPaterno);
                        //param.Add("APELLIDOMATERNO", x.ApellidoMaterno);
                        //param.Add("CALLE", x.Calle);
                        //param.Add("NUMERO", x.Numero);
                        //param.Add("TELEFONO", x.Telefono);
                        //param.Add("CELULAR", x.Celular);
                        //param.Add("EMAIL", x.Email);
                        param.Add("USUARIO", usuario);
                        param.Add("OPERACION", "SAVEPARTICIPANTES");

                        var saveId = await this.dao.SaveParticipantes(param);
                    }
                }
                if (data.Patrocinadores.Count > 0)
                {
                    foreach (var x in data.Patrocinadores)
                    {
                        param.Clear();
                        param.Add("IDEVENTO", IdEvento);
                        param.Add("IDPATROCINADOR", x.ID);
                        param.Add("USUARIO", usuario);
                        param.Add("OPERACION", "SAVEPATROCINADORES");

                        var saveId = await this.dao.SavePatrocinadoresPPC(param);
                    }
                }
                if (data.Colaboradores.Count > 0)
                {
                    foreach (var x in data.Colaboradores)
                    {
                        param.Clear(); 
                        param.Add("IDEVENTO", IdEvento);
                        param.Add("NOEMPLEADO", x.NoEmpleado);
                        param.Add("NOMBRE", x.Nombre);
                        param.Add("APELLIDOPATERNO", x.ApellidoPaterno);
                        param.Add("APELLIDOMATERNO", x.ApellidoMaterno);
                        param.Add("EMAIL", x.Email);
                        param.Add("PUESTO", x.Puesto);
                        param.Add("STAFF", x.Staff);
                        param.Add("PARTICIPANTES", x.Participante);
                        param.Add("USUARIO", usuario);
                        param.Add("OPERACION", "SAVECOLABORADORES");

                        var saveId = await this.dao.SaveColaboradores(param);
                    }
                }
                Commit();

                return result;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

        }
        public async Task<int> UpdateEventActividadesPPC(List<IEventosActividadesPPC> parametros)
        {
            IEventosActividadesPPC data = parametros[0];
            Dictionary<string, object> param = new Dictionary<string, object>();
            int IdEvento = (int)data.IdEvento;
            try
            {
                BeginTransaction();
                var usuario = getUserId();
                int result = 1;

                if (data.Participantes.Count > 0)
                {
                    param.Clear();
                    param.Add("IDEVENTO", IdEvento);
                    param.Add("OPERACION", "DELETEPARTICIPANTES");
                    await this.dao.DeleteParticipantes(param);
                    foreach (var x in data.Participantes)
                    {
                        param.Clear();

                        param.Add("IDEVENTO", IdEvento);
                        param.Add("HOMBRE", x.hombre);
                        param.Add("MUJER", x.mujer);
                        param.Add("NINO", x.ninos);
                        param.Add("ADULTOMAYOR", x.amayores);
                        param.Add("TOTAL", x.total);
                        param.Add("USUARIO", usuario);
                        param.Add("OPERACION", "SAVEPARTICIPANTES");

                        var saveId = await this.dao.SaveParticipantes(param);

                    }
                }
                if (data.Patrocinadores.Count > 0)
                {

                    param.Clear();
                    param.Add("IDEVENTO", IdEvento);
                    param.Add("OPERACION", "DELETEPATROCINADORES");
                    await this.dao.DeletePatrocinadoresPPC(param);

                    foreach (var x in data.Patrocinadores)
                    {
                        param.Clear();
                        param.Add("IDEVENTO", IdEvento);
                        param.Add("IDPATROCINADOR", x.ID);
                        param.Add("USUARIO", usuario);
                        param.Add("OPERACION", "SAVEPATROCINADORES");

                        var saveId = await this.dao.SavePatrocinadoresPPC(param);
                    }
                }
                if (data.Colaboradores.Count > 0)
                {

                    param.Clear();
                    param.Add("IDEVENTO", IdEvento);
                    param.Add("OPERACION", "DELETECOLABORADORES");
                    await this.dao.DeleteColaboradores(param);

                    foreach (var x in data.Colaboradores)
                    {
                        param.Clear();
                        param.Add("IDEVENTO", IdEvento);
                        param.Add("NOEMPLEADO", x.NoEmpleado);
                        param.Add("NOMBRE", x.Nombre);
                        param.Add("APELLIDOPATERNO", x.ApellidoPaterno);
                        param.Add("APELLIDOMATERNO", x.ApellidoMaterno);
                        param.Add("EMAIL", x.Email);
                        param.Add("PUESTO", x.Puesto);
                        param.Add("STAFF", x.Staff);
                        param.Add("PARTICIPANTES", x.Participante);
                        param.Add("USUARIO", usuario);
                        param.Add("OPERACION", "SAVECOLABORADORES");

                        var saveId = await this.dao.SaveColaboradores(param);
                    }
                }
                Commit();

                return result;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

        }

        #endregion


        #region +++++ CONSULTAS ++++++
        public async Task<object[]> ConsultasEventosActividades(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.ConsultasEventosActividades(parametros);
            return Result;
        }
        public async Task<IEventosActividadesReportPPC> ConsultasEventosActividadesPPC(Dictionary<string, object> parametros)
        {
            var data = Get<IEventosActividadesReportPPC>();
            var Participantes = await this.dao.GetParticipantesConsulta(parametros);
            var Patrocinadores = await this.dao.GetPatrocinadoresConsulta(parametros);
            var Colaboradores = await this.dao.GetColaboradoresConsulta(parametros);

            if (Participantes.Any())
            {
                data.Participantes = new List<IParticipantesConsulta>();
                data.Participantes.AddRange(Participantes);
            }
            if (Patrocinadores.Any())
            {
                data.Patrocinadores = new List<IPatrocinadoresConsulta>();
                data.Patrocinadores.AddRange(Patrocinadores);
            }
            if (Colaboradores.Any())
            {
                data.Colaboradores = new List<IColaboradoresConsulta>();
                data.Colaboradores.AddRange(Colaboradores);
            }
            return data;
        }
        public async override Task<object[]> Search(string criteria)
        {
            var parametros = new Dictionary<string, object>();
            parametros.Add("USUARIO", getUserId());
            parametros.Add("NOMBRE", criteria);
            parametros.Add("OPERACION", "SEARCHEVENT");

            return await this.dao.SearchEvents(parametros);
        }

        #endregion
    }
}