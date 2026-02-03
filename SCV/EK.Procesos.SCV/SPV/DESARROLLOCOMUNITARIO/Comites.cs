using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using EK.Modelo.Kontrol.Interfaces;
using System.Net;
using System.Dynamic;
using System.IO;

namespace EK.Procesos.SCV
{
    public class Comites : p.Kontrol.BPBase<m.SCV.Interfaces.IComites, d.SCV.Interfaces.IComites>, p.SCV.Interfaces.IComites
    {
        public Comites(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IComites dao)
          : base(factory, dao, "Comites")
        {
        }
        #region AREA GEOGRAFICA
        public async Task<object[]> CRUDComiteAreaGeografica(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            var Result = await this.dao.CrudComiteAreaGeografica(parametros);
            return Result;
        }
        #endregion

        #region INFORMACIONCOMITE
        public async Task<int> SaveComiteInformacionComite(List<IInformacionComiteParams> parametros)
         {
            IInformacionComiteParams data = parametros[0];
            //parametros.Add("USUARIO", base.getUserId());
            Dictionary<string, object> param = new Dictionary<string, object>();

            var user = this.getUserId();
            int Result = 0;
            param.Add("NOMBRE", data.Nombre);
            param.Add("FECHACONFORMACION", data.FechaConformacion);
            param.Add("ADMINISTRADORA", data.Administradora);
            param.Add("NOMBREADMINISTRADORA", data.NombreAdministradora);
            param.Add("PLAZA", data.Plaza);
            param.Add("FRACCIONAMIENTO", data.Fraccionamiento);
            param.Add("ETAPAS", data.Etapas);
            param.Add("SEGMENTO", data.Segmento);
            param.Add("NORTE", data.Norte);
            param.Add("SUR", data.Sur);
            param.Add("ESTE", data.Este);
            param.Add("OESTE", data.Oeste);
            param.Add("OPERACION", "SAVEINFORMACIONCOMITE");
            param.Add("USUARIO", user);
            var id = await dao.SaveComiteInformacionComite(param);
            if (id > 0)
            {
                if (data.Integrantes.Any())
                {
                    foreach (var x in data.Integrantes)
                    {
                        param.Clear();
                        param.Add("IDCOMITE", id);
                        param.Add("NO", x.No);
                        param.Add("PUESTO", x.Puesto);
                        param.Add("NOMBRE", x.Nombre);
                        param.Add("APELLIDOPATERNO", x.ApellidoPaterno);
                        param.Add("APELLIDOMATERNO", x.ApellidoMaterno);
                        param.Add("CALLE", x.Calle);
                        param.Add("NUMERO", x.Numero);
                        param.Add("TELEFONO", x.Telefono);
                        param.Add("USUARIO", user);
                        param.Add("OPERACION", "SAVEINTEGRANTES");
                        var integrantes = await dao.SaveComiteInformacionComite(param);
                    }
                }
                Result = id;
            }
            else
            {
                Result = id;
            }

            return Result;
        }

        public async Task<int> UpdateComiteInformacionComite(List<IInformacionComiteParams> parametros)
        {
            try
            {
                IInformacionComiteParams data = parametros[0];
                //parametros.Add("USUARIO", base.getUserId());
                Dictionary<string, object> param = new Dictionary<string, object>();

                var user = this.getUserId();
                int Result = 0;
                param.Add("ID", data.ID);
                param.Add("NOMBRE", data.Nombre);
                param.Add("FECHACONFORMACION", data.FechaConformacion);
                param.Add("ADMINISTRADORA", data.Administradora);
                param.Add("FRACCIONAMIENTO", data.Fraccionamiento);
                param.Add("ETAPAS", data.Etapas);
                param.Add("SEGMENTO", data.Segmento);
                param.Add("NORTE", data.Norte);
                param.Add("SUR", data.Sur);
                param.Add("ESTE", data.Este);
                param.Add("OESTE", data.Oeste);
                param.Add("OPERACION", "UPDATEINFORMACIONCOMITE");
                param.Add("USUARIO", user);
                var id = await dao.SaveComiteInformacionComite(param);
                if (id > 0)
                {
                    param.Clear();
                    param.Add("OPERACION", "DELETEINTEGRANTES");
                    param.Add("ID", data.ID);
                    await this.dao.DeleteIntegrantes(param);
                    if (data.Integrantes.Any())
                    {
                        foreach (var x in data.Integrantes)
                        {
                            param.Clear();
                            param.Add("IDCOMITE", data.ID);
                            param.Add("NO", x.No);
                            param.Add("PUESTO", x.Puesto);
                            param.Add("NOMBRE", x.Nombre);
                            param.Add("APELLIDOPATERNO", x.ApellidoPaterno);
                            param.Add("APELLIDOMATERNO", x.ApellidoMaterno);
                            param.Add("CALLE", x.Calle);
                            param.Add("NUMERO", x.Numero);
                            param.Add("TELEFONO", x.Telefono);
                            param.Add("USUARIO", user);
                            param.Add("OPERACION", "SAVEINTEGRANTES");
                            var integrantes = await dao.SaveComiteInformacionComite(param);
                        }
                    }
                    Result = id;
                }
                else
                {
                    Result = -1;
                }

                return Result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetAreaGeografica(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            var Result = await this.dao.GetAreaGeografica(parametros);
            return Result;
        }
        public async Task<object[]> GetComiteInformacionComite(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            var Result = await this.dao.GetComiteInformacionComite(parametros);
            return Result;
        }
        public async Task<IInformacionComite> GetComiteInformacionComiteById(Dictionary<string, object> parametros)
        {
            int id = Convert.ToInt32(parametros["ID"]);
            parametros.Add("OPERACION", "GETINFORMACIONCOMITEBYID");
            var Result = await dao.GetComiteInformacionComiteById(parametros);
            parametros.Clear();
            parametros.Add("ID", id);
            parametros.Add("OPERACION", "INTEGRANTESBYIDINFORMACIONCOMITE");
            List<IIntegrantesInformacionComite> Integrantes = await dao.GetIntegrantesComiteByIdComite(parametros);
            Result.Integrantes = new List<IIntegrantesInformacionComite>();
            if (Integrantes.Any())
            {
                Result.Integrantes.AddRange(Integrantes);
            }
            return Result;
        }
        public async Task<object[]> DeleteInformacionComite(Dictionary<string, object> parametros)
        {
            parametros.Add("OPERACION", "DELETEINFORMACIONCOMITE");
            var Result = await this.dao.DeleteInformacionComite(parametros);
            return Result;
        }

        #endregion

        #region REUNIONES
        public async Task<object[]> SelectComites(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            parametros.Add("OPERACION", "SELECTCOMITE");
            var Result = await this.dao.SelectComites(parametros);
            return Result;
        }
        public async Task<object[]> GetReuniones(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            parametros.Add("OPERACION", "GETREUNIONES");
            var Result = await this.dao.GetReuniones(parametros);
            return Result;
        }
        public async Task<int> SaveComiteReuniones(List<IComiteReunionesParam> parametros)
        {
            IComiteReunionesParam data = parametros[0];
            //parametros.Add("USUARIO", base.getUserId());
            Dictionary<string, object> param = new Dictionary<string, object>();

            var user = this.getUserId();
            int Result = 0;
            string operacion = "INSERT";

            param.Add("IDTIPOREUNION", data.IdTipoReunion);
            param.Add("IDCOMITE", data.IdComite);

            var date = Convert.ToDateTime(data.FechaReunion);

            param.Add("FECHAREUNION", date);
            param.Add("PLAZA", data.IdPlaza);
            param.Add("FRACCIONAMIENTO", data.IdFraccionamiento);
            param.Add("SEGMENTO", data.IdSegmento);
            param.Add("USUARIO", user);
            if (data.ID > 0)
            {
                param.Add("ID", data.ID);
                operacion = "UPDATE";
            }
            param.Add("OPERACION", operacion);
            var id = await dao.SaveComiteReuniones(param);
            if (id > 0)
            {
                if (data.ID > 0 && data.Materiales.Any())
                {
                    param.Clear();
                    param.Add("OPERACION", "DELETEMATERIALES");
                    param.Add("ID", data.ID);
                    await dao.SaveComiteReuniones(param);
                }
                if (data.Materiales.Any())
                {
                    foreach (var x in data.Materiales)
                    {
                        param.Clear();
                        param.Add("IDREUNION", id);
                        param.Add("NO", x.No);
                        param.Add("NOMBRE", x.NombreMaterial);
                        param.Add("USUARIO", user);
                        param.Add("OPERACION", "SAVEMATERIALES");
                        var Materiales = await dao.SaveComiteReuniones(param);
                    }
                }
                Result = id;
            }
            else
            {
                Result = -1;
            }

            return Result;
        }
        public async Task<object[]> DeleteReuniones(Dictionary<string, object> parametros)
        {
            parametros.Add("OPERACION", "DELETEREUNIONES");
            var Result = await this.dao.DeleteReuniones(parametros);
            return Result;
        }
        public async Task<object[]> GetMaterialesById(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            parametros.Add("OPERACION", "GETMATERIALESBYID");
            var Result = await this.dao.GetReuniones(parametros);
            return Result;
        }

        #endregion

        #region REUNIONES AGENDA
        public async Task<ICalendar> GetAgenda(Dictionary<string, object> parametros)
        {
            var retValue = Get<ICalendar>();

            parametros.Add("USUARIO", base.getUserId());
            parametros.Add("OPERACION", "GETAGENDA");

            var Reuniones = await this.dao.GetAgenda(parametros);

            retValue.ProdID = "-//enkontrol.com//Task & Events Calendar//END";
            retValue.Version = "2.0";
            retValue.Events = new List<ICalendarEvent>();


            if (Reuniones.Any())
            {
                foreach(var x in Reuniones)
                {
                    var calendarEvent = Get<ICalendarEvent>();
                    string iconoCalendario = "fa fa-calendar";
                    string EstatusAgendaIconoColor = "#FFFFFF";

                    var date = DateTime.Now;
                    
                    string realizadaColor = x.Realizada ? "#0DC143" : "#FE8441";
                    string realizadaText = x.Realizada ? "Realizada" : "Pendiente de realizar";
                    if ( date > x.FechaReunion.Value && !x.Realizada)
                    {
                        realizadaColor = "#DD323D";
                        realizadaText = "Vencida";
                    }
                    calendarEvent.ID = (int)x.ID;
                    calendarEvent.UID = x.ID.ToString();
                    calendarEvent.Categories = x.Comite;
                    calendarEvent.DTStart = x.FechaReunion.Value;
                    calendarEvent.Location = "EnKontrol";
                    calendarEvent.Summary = WebUtility.HtmlDecode("<I class=\"" + iconoCalendario + "\" style=\"color: \"" + EstatusAgendaIconoColor + "\" \"> </I> " + x.Comite + "<br> " + x.FechaReunion.Value + "<br>");
                    calendarEvent.Description = WebUtility.HtmlDecode("<I class=\"" + iconoCalendario + "\" style=\"color: \"" + EstatusAgendaIconoColor + "\" \"> </I> " + x.Comite + "<br> " + x.FechaReunion.Value + "<br><i style=\"color: \"" + realizadaColor + "\" \">" + realizadaText+ "</i><br><span className=\"badge badge-success\">" + x.TipoReunion+"</span>");
                    calendarEvent.BackgroundColor = x.BackgroundStatus;
                    calendarEvent.TextColor = "#FFFFFF";
                    calendarEvent.AllDay = false;
                    retValue.Events.Add(calendarEvent);
                }
            }

            return retValue;
        }

        public async Task<string> printDocumentAgendaReuniones(Dictionary<string, object> parametros)
        {
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var daoAgenda = Get<d.Kontrol.Interfaces.IAgenda>();

            try
            {
                string retValue = null;
                var moneda = await bpMON.GetByClave("MXN");
                parametros.Add("USUARIO", base.getUserId());
                parametros.Add("OPERACION", "GETAGENDA");
                var Reuniones = await this.dao.GetAgenda(parametros);

                List<dynamic> Meets = new List<dynamic>();
                Meets.Add(Reuniones);
                Dictionary<string, object> model = new Dictionary<string, object>();

                model.Add("Reuniones", Reuniones);
                model.Add("DiaInicioAgenda", parametros["FECHAINICIO"]);
                model.Add("DiaFinAgenda", parametros["FECHAFIN"]);
                model.Add("TipoAgenda", "REUNIONES");
                foreach(var x in Reuniones)
                {
                    x.RealizadaName = x.Realizada ? "SI" : "NO";
                }
                dynamic expando = new ExpandoObject();
                expando.Citas = Reuniones;
                expando.DiaInicioAgenda = parametros["FECHAINICIO"];
                expando.DiaFinAgenda = parametros["FECHAFIN"];
                expando.TipoAgenda = "REUNIONES COMITÉ";

                object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));

                Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("IMPRESION-AGENDA-REUNIONES", obj, null, moneda);
                Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);

                using (MemoryStream ms = new MemoryStream())
                {
                    documento.Content.Position = 0;
                    documento.Content.CopyTo(ms);

                    retValue = Convert.ToBase64String(ms.ToArray());
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetEventById(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            parametros.Add("OPERACION", "GETEVENTBYID");
            var Result = await this.dao.GetEvent(parametros);
            return Result;
        }
        public async Task<object[]> SaveRealizada(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            parametros.Add("OPERACION", "SAVEREALIZADA");
            var Result = await this.dao.SaveRealizada(parametros);
            return Result;
        }
        #endregion

        #region Reuniones Graficas
        public async Task<object[]> GetInfoGraficas(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            parametros.Add("OPERACION", "GETINFOGRAFICAS");
            var Result = await this.dao.GetInfoGraficas(parametros);
            return Result;
        }
        #endregion
    }
}
