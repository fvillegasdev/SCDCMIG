using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using NT = EK.Drivers.Notifications;
using System.Dynamic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using System.Collections;
using System.Xml.Linq;
using System.Text.RegularExpressions;
using System.Net.Mail;
using System.Text;
using System.Configuration;
using System.Net.Http;
using SelectPdf;
using System.Net.Mime;

namespace EK.Procesos.SCV
{
    public class AgendaSPV : p.Kontrol.BPBase<m.SCV.Interfaces.IAgendaSPV, d.SCV.Interfaces.IAgendaSPV>,
        p.SCV.Interfaces.IAgendaSPV
    {
        private readonly string _fromEmail = ConfigurationManager.AppSettings["drivers:notifications:email:fromEmail"];
        private readonly string _displayName = ConfigurationManager.AppSettings["drivers:notifications:email:displayName"];
        private readonly string _userName = ConfigurationManager.AppSettings["drivers:notifications:email:username"];
        private readonly string _password = ConfigurationManager.AppSettings["drivers:notifications:email:password"];
        private readonly string _servidor = ConfigurationManager.AppSettings["drivers:notifications:email:servidor"];
        private readonly string _port = ConfigurationManager.AppSettings["drivers:notifications:email:port"];
        private readonly string _priority = ConfigurationManager.AppSettings["drivers:notifications:email:priority"];
        private readonly bool _enableSSL = Convert.ToBoolean(ConfigurationManager.AppSettings["drivers:notifications:email:enableSSL"]);
        private readonly bool _testNotification = Convert.ToBoolean(ConfigurationManager.AppSettings["drivers:notifications:email:testNotification"]);
        private readonly string _testNotificationsEmail = ConfigurationManager.AppSettings["drivers:notifications:email:testNotificationEmail"];

        public AgendaSPV(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IAgendaSPV dao)
            : base(factory, dao, "AgendaSPV")
        {
        }

        public async Task<m.SCV.Interfaces.IAgendaContratista> SaveAgendaContratista(m.SCV.Interfaces.IAgendaContratista item)
        {
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistas>();
            var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var daoContratista = Get<d.SCV.Interfaces.IContratistas>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpREP = Get<p.SCV.Interfaces.IReportesFallas>();
            var daoUB = Get<p.SCV.Interfaces.IUbicaciones>();

            m.SCV.Interfaces.IAgendaContratista retValue = null;

           

            try
            {
                int idContratista = -1;
                int idExpediente = -1;
                int idResponsableDict = -1;
                string IdPlazaOT = "";
                foreach (var det in item.OrdenesTrabajo)
                {
                    idContratista = (int)det.OrdenTrabajo.IdContratista;
                    idExpediente = (int)det.IdOrdenTrabajo;
                    IdPlazaOT = item.IdPlaza != null ? item.IdPlaza : det.Ubicacion.IdPlaza;
                    //idResponsableDict = (int)det.OrdenTrabajo.IdCat;
                    if(det.Reservas != null)
                    {
                        foreach(var rva in det.Reservas)
                        {
                            rva.FechaInicio = rva.FechaInicio.AddHours(-7);
                            //if(rva.FechaInicio == item.FechaInicio)
                            //{
                            //    base.SetReturnInfo(2, "La Fecha de una reserva no puede ser igual a la de planificacion");
                            //    retValue = item;
                            //    retValue.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                            //    return retValue;
                            //}
                        }
                    }
                }



                //int result = 0;
                List<dynamic> listOfx = new List<dynamic>();
                listOfx.AddRange(item.OrdenesTrabajo);
                /*
                result = await this.ValidatePlanificacion(item.FechaInicio, item.FechaFin, idContratista, listOfx, item.TipoAgenda.Clave);
                if (result < 0)
                {
                    retValue = item;
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                    return retValue;
                }
                result = await this.ValidateBloquesFechas(item.FechaInicio, item.FechaFin, idContratista, idExpediente, item.TipoAgenda.Clave);
                if (result < 0)
                {
                    retValue = item;
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                    return retValue;
                }
                */
                var estatusAgenda = await bpCGV.Get("AgendaEstatus", "ACT");
                var estatus = await bpCGV.Get("ESTATUS", "A");
                var estatusOT = await bpCGV.Get("SPVESTATUSOT", "E");

                item.IdEstatus = estatus.ID;
                item.Estado = item.ID == null || item.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                if (item != null)
                {
                    item.Modificado = DateTime.UtcNow;
                    item.IdModificadoPor = base.getUserId();
                }
                // Codigo que agregado para probar la actualizacin de los detalles de la agenda. INICIO
                if (item.OrdenesTrabajo[0].IdAgenda > 0)
                {
                    var agendaDetalle = daoAgenda.GetById(item.OrdenesTrabajo[0].IdAgenda.Value);
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    item.ID = agendaDetalle.Result.ID;
                    item.Version = agendaDetalle.Result.Version;
                }
                // Codigo nuevo para actualizacion de detalles de agenda. FIN
                if (item.ProcesoEjecutado == "ReAgendarOT")
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

                if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    item.Creado = DateTime.UtcNow;
                    item.IdCreadoPor = base.getUserId();
                }

                BeginTransaction(true);

                // int idAgenda = -1;
                item.id_identificador_cc = item.IdPlaza;
                item.mesInicio = item.FechaInicio.Month;
                item.anioInicio = item.FechaInicio.Year;
                item.IdExpediente = idExpediente;
                item.IdEstatusAgenda = estatusAgenda.ID.Value;
                item.IdEstatus = estatus.ID.Value;
                item.IdUsuarioAsignado = idContratista;
                //item.IdResponsableDictamen = idResponsableDict; MENSAJE ERROR BLOQUEO FECHA
                var valido = await daoAgenda.VerificarFechasAgendaContratista(item);
                if (valido != 1)
                {
                    base.SetReturnInfo(2, "No se pudo guardar, El usuario no tiene disponibilidad en el rango de Fecha seleccionado.");
                    return null;
                }
                retValue = await daoAgenda.Save(item);
                int idAgenda = retValue.ID ?? 0;
                if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    foreach (var c in item.OrdenesTrabajo)
                    {
                        //c.Estado = c.ID == null || c.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        //c.IdAgenda = idAgenda;
                        //c.IdEstatusAgenda = (int)estatusAgenda.ID;
                        //c.IdEstatus = item.IdEstatus;
                        //c.IdCreadoPor = base.getUserId();
                        //c.IdModificadoPor = base.getUserId();
                        //c.IdExpediente = (int)c.IdOrdenTrabajo;
                        //c.IdUsuarioAsignado = c.OrdenTrabajo.IdContratista;

                        //var model = await daoAgendaDetalle.SaveEntity(c, false);
                        //if (model != null)
                        //{
                           // c.ID = model.ID;
                        //}

                        if (c.Reservas != null && c.Reservas.Count > 0)
                        {
                            foreach (var rr in c.Reservas)
                            {
                                idExpediente = (int)c.IdOrdenTrabajo;
                                idContratista = c.OrdenTrabajo.IdContratista;

                                int response = await this.ValidateBloquesFechas(rr.FechaInicio, rr.FechaFin, idContratista, idExpediente, rr.TipoAgenda.Clave);
                                if (response < 0)
                                {
                                    Rollback();

                                    retValue = item;
                                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                                    return retValue;
                                }

                                rr.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                rr.IdEstatus = estatus.ID;
                                rr.Estatus = estatus;
                                rr.Modificado = DateTime.UtcNow;
                                rr.IdModificadoPor = base.getUserId();
                                rr.Creado = DateTime.UtcNow;
                                rr.IdCreadoPor = base.getUserId();
                                rr.IdTipoAgenda = item.IdTipoAgenda;
                                rr.IdEstatusAgenda = (int)estatusAgenda.ID;
                                rr.IdExpediente = (int)c.IdOrdenTrabajo;
                                rr.IdUsuarioAsignado = c.OrdenTrabajo.IdContratista;
                                rr.IdAgendaPadre = idAgenda;
                                rr.Reserva = true;
                                rr.Geolocalizacion = retValue.Geolocalizacion;
                                rr.id_identificador_cc = item.IdPlaza;
                                rr.mesInicio = rr.FechaInicio.Month;
                                rr.anioInicio = rr.FechaInicio.Year;
                                var ra = await daoAgenda.Save(rr);
                                //if (ra != null)
                                //{
                                    //var rd = Get<m.SCV.Interfaces.IAgendaContratista>();
                                //    rd.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                //    rd.IdAgenda = ra.ID;
                                //    rd.IdEstatusAgenda = (int)estatusAgenda.ID;
                                //    rd.IdEstatus = estatus.ID;
                                //    rd.Estatus = estatus;
                                //    rd.IdCreadoPor = base.getUserId();
                                //    rd.IdModificadoPor = base.getUserId();
                                //    rd.IdExpediente = (int)c.IdOrdenTrabajo;
                                //    rd.IdUsuarioAsignado = c.OrdenTrabajo.IdContratista;
                                //    rd.IdAgendaPadre = c.ID;
                                   // rd.Reserva = true;

                                //    var xx = await daoAgendaDetalle.SaveEntity(rd);
                                //}
                            }
                        }

                        /***** actualizar orden de trabajo ******/
                        await this.UpdatePlanificacion((int)c.IdOrdenTrabajo, retValue, null, "ACT");
                        /***** actualizar orden de trabajo ******/

                        // idContratista = -1;
                        try
                        {
                            //NOTIFICACIÓN AL CAT
                            var parametrosPlaza = new Dictionary<string, object>();
                            var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                            List<string> elementosEmails = new List<string>();
                            List<m.Kontrol.Interfaces.IUsuario> correosNiveles = null;
                            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
                            var daoUbi = Get<d.SCV.Interfaces.IUbicaciones>();
                            var ubicacion = await daoUbi.GetById(c.IdUbicacion.Value);
                            //daoUbi.get
                            c.Ubicacion = ubicacion;
                            var ClaveFraccionamiento = c.Ubicacion.DesarrolloClave;
                            
                            parametrosPlaza.Add("IdPlaza", IdPlazaOT);
                            //parametrosPlaza.Add("IdPlaza", item.IdPlaza);
                            parametrosPlaza.Add("IdNivel", 134);
                            parametrosPlaza.Add("ClaveFracc", ClaveFraccionamiento);

                            var parametrosOrdenTrabajo = new Dictionary<string, object>();
                            parametrosOrdenTrabajo.Add("IdOT", c.IdOrdenTrabajo);
                            correosNiveles = await daoPlaza.getUserByOrdenTrabajoID(parametrosOrdenTrabajo);
                            if(correosNiveles == null || correosNiveles.Count <= 0)
                            {
                                correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                            }
                            //var daoUsuariosEK = Get<d.Kontrol.Interfaces.IUsuarios>();

                            //var responsable = await daoUsuariosEK.GetById(item.IdResponsableDictamen);
                            //if(responsable != null)
                            //{
                            //    correosNiveles = new List<m.Kontrol.Interfaces.IUsuario>();
                            //    correosNiveles.Add(responsable);
                            //} else
                            //{
                            //    correosNiveles = await daoPlaza.getCatByClaveUbicacion(parametrosPlaza);
                            //    if (correosNiveles.Count <= 0)
                            //    {
                            //        correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                            //    }
                            //}

                            foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }
                            // elementosEmails.Add("@enkontrol.com");
                            var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                            var moneda = await bpMON.GetByClave("MXN");
                            string[] to = elementosEmails.ToArray();
                            to = to.Where(x => x != "").ToArray();

                            var documento = await this.GetDocumentOTHtmlFile((int)c.IdOrdenTrabajo);
                            //var documento = await bpREP.GetDocumentOT((int)c.IdOrdenTrabajo);
                            

                            var tituloAdicionalPlantilla = "";
                            EK.Drivers.Common.IKontrolFiles[] documentos = { documento };
                            if (c.IdFolio == 0)
                            {
                                c.IdFolio = c.OrdenTrabajo.IdReporte;
                                tituloAdicionalPlantilla = "Reprogramación ";
                            }

                            bool addCC = false;
                            List<string> EmailsCC = new List<string>();
                            var parametrosUsuariosEmailCat = new Dictionary<string, object>();
                            var parametrosUsuariosEmailPlazaCC = new Dictionary<string, object>();
                            parametrosUsuariosEmailCat.Add("IdParametro", 108);
                            parametrosUsuariosEmailPlazaCC.Add("IdParametro", 109); //Plazas a las que se pondra copia
                            var result = await this.dao.GetUsuariosEmailCat(parametrosUsuariosEmailCat);
                            var plazasCC = await this.dao.GetPlazasEmailCC(parametrosUsuariosEmailPlazaCC);
                            if (result != null)
                            {
                                string stringPlz = "";
                                if (plazasCC != null)
                                {
                                    dynamic jsonPlz = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(plazasCC));

                                    if (jsonPlz is Newtonsoft.Json.Linq.JArray && jsonPlz.Count > 0)
                                    { 
                                        var valorPlz = jsonPlz[0];
                                        stringPlz = valorPlz.valor;
                                        if (stringPlz == "" || stringPlz.ToLower() == "all" || stringPlz.Contains(IdPlazaOT))
                                        {
                                            addCC = true;
                                        }
                                    }
                                       
                                }
                                dynamic objJson = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                                var valor = objJson[0];
                                string emails = valor.valor;
                                if (emails != "" && addCC)
                                {
                                    string[] mailsCC = emails.Split(',');
                                    foreach (var email in mailsCC)
                                    {
                                        EmailsCC.Add(email);
                                    }
                                }

                            }

                            var plantilla = await this.GetPlantilla("NOTIFICAR-NUEVA-AGENDA-CONTRATISTA", c);
                            bpClientEmail.SendMessage(to, EmailsCC.ToArray(),  $"{ tituloAdicionalPlantilla}{plantilla.Titulo}", plantilla.Plantilla_Contenido, documentos, true);

                            var daoUsuariosEK = Get<d.Kontrol.Interfaces.IUsuarios>();
                            var currentUser = await daoUsuariosEK.GetById(base.getUserId());
                            var parametrosPushNotificacion = new Dictionary<string, object>();
                            parametrosPushNotificacion.Add("UserSend", currentUser.Email);
                            parametrosPushNotificacion.Add("UserTo", to[0]);
                            parametrosPushNotificacion.Add("Folio", c.IdOrdenTrabajo);
                           // parametrosPushNotificacion.Add("Folio", c.IdFolio);
                            parametrosPushNotificacion.Add("FechaAgenda",item.FechaInicio.ToString("dd/MM/yyyy"));
                            parametrosPushNotificacion.Add("HoraAgenda", item.FechaInicio.ToString("HH:mm:ss"));
                            parametrosPushNotificacion.Add("Tipo", 2);
                           await this.SendPushNotificationToApp(parametrosPushNotificacion);
                        }
                        catch (FormatException)
                        {
                            //base.SetReturnInfo(2, "No se pudo enviar la notificación: El correo del contratista no es válido.");
                        }
                        catch (Exception ex)
                        {
                            
                            var noRetornarError = ex.Message;
                            //base.SetReturnInfo(2, "No se pudo enviar la notificación al contratista:" + ex.Message);
                        }
                    }
                }
                else
                {
                    var ot = item.OrdenesTrabajo[0];
                    var reservas = item.OrdenesTrabajo[0].Reservas;
                    // INICIO === Eliminar y agregar reservas. 
                    // Primero obtenemos la lista de reservas de la tablas agenda y agendaentvivienda
                    // Se itera la lista obtenida y se eliminan de las dos tablas en base a su id.
                    Dictionary<string, object> parametros = new Dictionary<string, object>();

                    parametros.Add("OperacionEspecificaSP", "OBTENER_POR_EXPEDIENTE");
                    parametros.Add("IdExpediente", ot.IdExpediente);
                    parametros.Add("IdAgendaDetalle", item.ID);
                    var resultado = await daoAgendaDetalle.GetAll(parametros);
                    foreach (var agenda in resultado)
                    {
                        await daoAgenda.Delete((int)agenda.IdAgenda);
                        await daoAgendaDetalle.Delete((int)agenda.IdAgenda);
                    }
                    if (reservas != null && reservas.Count > 0)
                    {
                        foreach (var r in reservas)
                        {
                            idExpediente = (int)ot.IdOrdenTrabajo;
                            idContratista = ot.OrdenTrabajo.IdContratista;

                            var newFechaInicio = r.FechaInicio.AddHours(-6);
                            r.FechaInicio = newFechaInicio;

                            int response = await this.ValidateBloquesFechas(r.FechaInicio, r.FechaFin, idContratista, idExpediente, r.TipoAgenda.Clave);
                            if (response < 0)
                            {
                                Rollback();

                                retValue = item;
                                retValue.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                                return retValue;
                            }

                            r.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            r.IdEstatus = estatus.ID;
                            r.Estatus = estatus;
                            r.Modificado = DateTime.UtcNow;
                            r.IdModificadoPor = base.getUserId();
                            r.Creado = DateTime.UtcNow;
                            r.IdCreadoPor = base.getUserId();
                            r.IdTipoAgenda = item.IdTipoAgenda;
                            var ra = await daoAgenda.Save(r);
                            if (ra != null)
                            {
                                var rd = Get<m.SCV.Interfaces.IAgendaContratistaDetalle>();
                                rd.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                rd.IdAgenda = ra.ID;
                                rd.IdEstatusAgenda = (int)estatusAgenda.ID;
                                rd.IdEstatus = estatus.ID;
                                rd.Estatus = estatus;
                                rd.IdCreadoPor = base.getUserId();
                                rd.IdModificadoPor = base.getUserId();
                                rd.IdExpediente = (int)ot.IdOrdenTrabajo;
                                rd.IdUsuarioAsignado = ot.OrdenTrabajo.IdContratista;
                                rd.IdAgendaPadre = ot.ID;
                                rd.Reserva = true;

                                var xx = await daoAgendaDetalle.SaveEntity(rd);
                            }
                        }
                    }
                }
                // FIN === Eliminar y agregar reservas. 
                retValue.OrdenesTrabajo = item.OrdenesTrabajo;
                retValue.ProcesoEjecutado = item.ProcesoEjecutado;
                retValue.EstatusAgenda = estatusAgenda;

                Commit();

                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        public async Task<Drivers.Common.IKontrolFiles> GetDocumentOTHtmlFile(int id)
        {
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBA>();
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var daoAG = Get<d.SCV.Interfaces.IAgendaSPV>();
            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistas>();
            var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenes>();
            var bpCU = Get<p.SCV.Interfaces.IContratistasUbicaciones>();
            var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();
            var daoCLI = Get<d.SCV.Interfaces.IClientesSPV>();
            var daoUB = Get<d.SCV.Interfaces.IUbicaciones>();
            var daoRF = Get<d.SCV.Interfaces.IReportesFallas>();
            try
            {
                var ordenTrabajo = await daoOT.GetById(id);

                var reporte = await daoRF.GetById(ordenTrabajo.IdReporte);
                var ubicacion = await this.GetUbicacionById((int)reporte.IdUbicacion);
                var moneda = await bpMON.GetByClave("MXN");

                var parametros = new Dictionary<string, object>();
                parametros.Add("idReporte", ordenTrabajo.IdReporte);
                //parametros.Add("idContratista", ordenTrabajo.IdContratista);

                var partidas = await daoDET.GetAll(parametros);

                var dictamenesTotalPartidas = Get<m.SCV.Interfaces.IReporteFalla>();
                dictamenesTotalPartidas.Dictamenes = await daoDIC.GetAll(parametros);

                parametros.Clear();
                parametros.Add("idOrdenTrabajo", ordenTrabajo.ID);

                var partidasOT = await daoOTD.GetAll(parametros);
                var partidasTable = new List<m.SCV.Interfaces.IReporteFallaDetalle>();

                List<dynamic> listaIncidencias = new List<dynamic>();
                foreach (var p in partidas)
                {
                    if (partidasOT.FirstOrDefault(d => d.IdPartida == p.ID) != null)
                    {
                        var pot = partidasOT.FirstOrDefault(d => d.IdPartida == p.ID);
                        p.ObservacionesOT = pot.Observaciones;
                        p.ObservacionesAppCat = pot.ObservacionesCat;
                        partidasTable.Add(p);
                    }
                }

                var cOrigen = await bpCU.GetContratistaDefault((int)reporte.IdUbicacion);
                if (cOrigen == null)
                {
                    cOrigen = Get<m.SCV.Interfaces.IContratista>();
                }

                parametros.Clear();
                parametros.Add("idCliente", reporte.IdCliente);

                string telefonoCasa = reporte.TelefonoCasa;
                string telefonoOficina = reporte.TelefonoOficina;
                string telefonoCelular = string.Empty;
                string telefonoOtros = reporte.TelefonoOtros;

                var contactos = await daoRL.GetAll(parametros);
                if (contactos != null)
                {
                    var telefonos = contactos.FindAll(c => c.TipoContacto.Clave == "TELEFONO");
                    if (telefonos != null)
                    {
                        foreach (var t in telefonos)
                        {
                            if (t.TipoTelefono.Clave == "CS")
                            {
                                telefonoCasa = t.Contacto;
                            }
                            else if (t.TipoTelefono.Clave == "T")
                            {
                                telefonoOficina = t.Contacto;
                            }
                            else if (t.TipoTelefono.Clave == "C")
                            {
                                telefonoCelular = t.Contacto;
                            }
                            else if (t.TipoTelefono.Clave == "O")
                            {
                                telefonoOtros = t.Contacto;
                            }
                        }
                    }
                }

                var citas = await daoAG.GetAgendaDetalleHistorial("Contratista", id, null);
                if (citas != null && citas.Count > 0)
                {
                    // citas = citas.FindAll(c => c.EstatusAgenda.Clave == "ACT" || c.EstatusAgenda.Clave == "REP" || c.EstatusAgenda.Clave == "SEG");
                    if (citas[citas.Count - 1].EstatusAgenda.Clave != "ATE")
                        citas[citas.Count - 1].EstatusAgenda.Nombre += "       *** última actualización ***";
                }

                var dictamenesPartidas = new List<m.SCV.Interfaces.IReporteDictamen>();
                if (partidas != null && partidas.Count > 0)
                {
                    var partidasDictamenes = Get<m.SCV.Interfaces.IReporteDictamen>();

                    foreach (var pp in partidas)
                    {

                        partidasDictamenes = dictamenesTotalPartidas.Dictamenes.FindLast(dm => dm.Partida.Partida == pp.Partida);
                        if (partidasDictamenes != null)
                        {
                            dictamenesPartidas.Add(partidasDictamenes);
                        }
                    }


                }

                dynamic expando = new ExpandoObject();
                expando.ID = reporte.ID;
                expando.Folio = reporte.IdFolio;
                expando.FechaActual = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt");
                expando.OrdenTrabajo = ordenTrabajo;
                expando.FechaEntregaVivienda = reporte.FechaEntregaVivienda.Value.ToString("dd/MM/yyyy hh:mm:ss tt");
                expando.FechaCaptura = reporte.FechaCaptura.Value.ToString("dd/MM/yyyy hh:mm:ss tt");
                expando.Cliente = reporte.Cliente;
                expando.Ubicacion = ubicacion;
                expando.CreadoPor = reporte.CreadoPor;
                expando.ModificadoPor = reporte.ModificadoPor;
                expando.TelefonoCasa = telefonoCasa;
                expando.TelefonoOficina = telefonoOficina;
                expando.TelefonoCelular = telefonoCelular;
                expando.TelefonoOtros = telefonoOtros;
                expando.DesarrolloClave = reporte.DesarrolloClave;
                expando.SuperManzana = reporte.SuperManzana;
                expando.Manzana = reporte.Manzana;
                expando.Lote = reporte.Lote;
                expando.Interior = reporte.Interior;
                expando.Exterior = reporte.Exterior;
                expando.Coordinador = reporte.Coordinador;
                expando.ResponsableConstruccion = reporte.ResponsableConstruccion;
                expando.ObservacionesSC = reporte.ObservacionesServicio;
                expando.ObservacionesCAT = reporte.ObservacionesContratista;
                expando.Contratista = ordenTrabajo.Contratista;
                expando.ContratistaOrigen = cOrigen;
                expando.Citas = citas;
                //expando.Partidas = listaIncidencias;
                expando.Partidas = partidasTable;
                expando.Dictamenes = dictamenesPartidas;
                expando.IdFolio = reporte.ID;
                expando.ImagenFirma = ordenTrabajo.FirmaClienteFilename;
                expando.ImagenFirmaContratista = ordenTrabajo.FirmaContratistaFilename;
                expando.ImagenFirmaCatSuper = ordenTrabajo.FirmaCatSupFilename;

                var pm = await GetGlobalParameters("INSTALACION");
                string linkTarea = $"{pm.Value<string>("SitioWeb")}{"/scv/pv/reportesFallas/"}{reporte.ID}";
                var parametros2 = new Dictionary<string, object>()
                        {
                            { "Link", linkTarea
                            }
                        };


                object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));

                MemoryStream ms = new MemoryStream();
                //Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("REP-FALLAS-RUBA", obj, null, moneda);
                //Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);
                //var Html = await GetHTMLStringFromPlantilla("REPFALLASTESTOT");
                var Html = await GetHTMLStringFromPlantilla("REP-FALLAS-RUBA");
                string docString = MergeAllHtmlWithObj(obj, Html);

                SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
                converter.Options.PdfPageSize = SelectPdf.PdfPageSize.A3;
                SelectPdf.PdfDocument doc = converter.ConvertHtmlString(docString);

                MemoryStream mst = new MemoryStream();
                doc.Save(mst);
                doc.Close();

                mst.Position = 0;
                mst.CopyTo(ms);
                var documento = Get<EK.Drivers.Common.IKontrolFiles>();
                documento.Nombre = $"FOLIO {reporte.ID} OT {ordenTrabajo.ID.Value} Contratista  { ordenTrabajo.Contratista.ID.Value}{ ordenTrabajo.Contratista.Nombre}.pdf";
                documento.Extension = "pdf";
                documento.ContentType = "application/pdf";
                documento.Content = ms;
                documento.Size = ms.Length;
                //retValue = ms;
                return documento;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> GetDocumentOTHtmlString(int id)
        {
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBA>();
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var daoAG = Get<d.SCV.Interfaces.IAgendaSPV>();
            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistas>();
            var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenes>();
            var bpCU = Get<p.SCV.Interfaces.IContratistasUbicaciones>();
            var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();
            var daoCLI = Get<d.SCV.Interfaces.IClientesSPV>();
            var daoUB = Get<d.SCV.Interfaces.IUbicaciones>();
            var daoRF = Get<d.SCV.Interfaces.IReportesFallas>();
            try
            {
                var ordenTrabajo = await daoOT.GetById(id);

                var reporte = await daoRF.GetById(ordenTrabajo.IdReporte);
                var ubicacion = await this.GetUbicacionById((int)reporte.IdUbicacion);
                var moneda = await bpMON.GetByClave("MXN");

                var parametros = new Dictionary<string, object>();
                parametros.Add("idReporte", ordenTrabajo.IdReporte);
                //parametros.Add("idContratista", ordenTrabajo.IdContratista);

                var partidas = await daoDET.GetAll(parametros);

                var dictamenesTotalPartidas = Get<m.SCV.Interfaces.IReporteFalla>();
                dictamenesTotalPartidas.Dictamenes = await daoDIC.GetAll(parametros);

                parametros.Clear();
                parametros.Add("idOrdenTrabajo", ordenTrabajo.ID);

                var partidasOT = await daoOTD.GetAll(parametros);
                var partidasTable = new List<m.SCV.Interfaces.IReporteFallaDetalle>();

                List<dynamic> listaIncidencias = new List<dynamic>();
                foreach (var p in partidas)
                {
                    if (partidasOT.FirstOrDefault(d => d.IdPartida == p.ID) != null)
                    {
                        p.ObservacionesOT = partidasOT[0].Observaciones;
                        p.ObservacionesAppCat = partidasOT[0].ObservacionesCat;
                        partidasTable.Add(p);
                    }
                }

                var cOrigen = await bpCU.GetContratistaDefault((int)reporte.IdUbicacion);
                if (cOrigen == null)
                {
                    cOrigen = Get<m.SCV.Interfaces.IContratista>();
                }

                parametros.Clear();
                parametros.Add("idCliente", reporte.IdCliente);

                string telefonoCasa = reporte.TelefonoCasa;
                string telefonoOficina = reporte.TelefonoOficina;
                string telefonoCelular = string.Empty;
                string telefonoOtros = reporte.TelefonoOtros;

                var contactos = await daoRL.GetAll(parametros);
                if (contactos != null)
                {
                    var telefonos = contactos.FindAll(c => c.TipoContacto.Clave == "TELEFONO");
                    if (telefonos != null)
                    {
                        foreach (var t in telefonos)
                        {
                            if (t.TipoTelefono.Clave == "CS")
                            {
                                telefonoCasa = t.Contacto;
                            }
                            else if (t.TipoTelefono.Clave == "T")
                            {
                                telefonoOficina = t.Contacto;
                            }
                            else if (t.TipoTelefono.Clave == "C")
                            {
                                telefonoCelular = t.Contacto;
                            }
                            else if (t.TipoTelefono.Clave == "O")
                            {
                                telefonoOtros = t.Contacto;
                            }
                        }
                    }
                }

                var citas = await daoAG.GetAgendaDetalleHistorial("Contratista", id, null);
                if (citas != null && citas.Count > 0)
                {
                    // citas = citas.FindAll(c => c.EstatusAgenda.Clave == "ACT" || c.EstatusAgenda.Clave == "REP" || c.EstatusAgenda.Clave == "SEG");
                    if (citas[citas.Count - 1].EstatusAgenda.Clave != "ATE")
                        citas[citas.Count - 1].EstatusAgenda.Nombre += "       *** última actualización ***";
                }

                var dictamenesPartidas = new List<m.SCV.Interfaces.IReporteDictamen>();
                if (partidas != null && partidas.Count > 0)
                {
                    var partidasDictamenes = Get<m.SCV.Interfaces.IReporteDictamen>();

                    foreach (var pp in partidas)
                    {

                        partidasDictamenes = dictamenesTotalPartidas.Dictamenes.FindLast(dm => dm.Partida.Partida == pp.Partida);
                        if (partidasDictamenes != null)
                        {
                            dictamenesPartidas.Add(partidasDictamenes);
                        }
                    }


                }

                dynamic expando = new ExpandoObject();
                expando.ID = reporte.ID;
                expando.Folio = reporte.IdFolio;
                expando.FechaActual = DateTime.Now.ToString();
                expando.OrdenTrabajo = ordenTrabajo;
                expando.FechaEntregaVivienda = reporte.FechaEntregaVivienda;
                expando.FechaCaptura = reporte.FechaCaptura;
                expando.Cliente = reporte.Cliente;
                expando.Ubicacion = ubicacion;
                expando.CreadoPor = reporte.CreadoPor;
                expando.ModificadoPor = reporte.ModificadoPor;
                expando.TelefonoCasa = telefonoCasa;
                expando.TelefonoOficina = telefonoOficina;
                expando.TelefonoCelular = telefonoCelular;
                expando.TelefonoOtros = telefonoOtros;
                expando.DesarrolloClave = reporte.DesarrolloClave;
                expando.SuperManzana = reporte.SuperManzana;
                expando.Manzana = reporte.Manzana;
                expando.Lote = reporte.Lote;
                expando.Interior = reporte.Interior;
                expando.Exterior = reporte.Exterior;
                expando.Coordinador = reporte.Coordinador;
                expando.ResponsableConstruccion = reporte.ResponsableConstruccion;
                expando.ObservacionesSC = reporte.ObservacionesServicio;
                expando.ObservacionesCAT = reporte.ObservacionesContratista;
                expando.Contratista = ordenTrabajo.Contratista;
                expando.ContratistaOrigen = cOrigen;
                expando.Citas = citas;
                //expando.Partidas = listaIncidencias;
                expando.Partidas = partidasTable;
                expando.Dictamenes = dictamenesPartidas;
                expando.IdFolio = reporte.ID;
                expando.ImagenFirma = ordenTrabajo.FirmaClienteFilename;
                expando.ImagenFirmaContratista = ordenTrabajo.FirmaContratistaFilename;
                expando.ImagenFirmaCatSuper = ordenTrabajo.FirmaCatSupFilename;

                var pm = await GetGlobalParameters("INSTALACION");
                string linkTarea = $"{pm.Value<string>("SitioWeb")}{"/scv/pv/reportesFallas/"}{reporte.ID}";
                var parametros2 = new Dictionary<string, object>()
                        {
                            { "Link", linkTarea
                            }
                        };


                object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));

                MemoryStream ms = new MemoryStream();
                //Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("REP-FALLAS-RUBA", obj, null, moneda);
                //Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);
                //var Html = await GetHTMLStringFromPlantilla("REPFALLASTESTOT");
                var Html = await GetHTMLStringFromPlantilla("REP-FALLAS-RUBA");
                string docString = MergeAllHtmlWithObj(obj, Html);

                SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
                converter.Options.PdfPageSize = SelectPdf.PdfPageSize.A3;
                SelectPdf.PdfDocument doc = converter.ConvertHtmlString(docString);

                MemoryStream mst = new MemoryStream();
                doc.Save(mst);
                doc.Close();
                string retValue = null;
                retValue = Convert.ToBase64String(mst.ToArray());
               

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<int> SendPushNotificationToApp(Dictionary<string, object> parametros)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    //var daoAG = Get<d.SCV.Interfaces.IAgendaSPV>();
                    var parametrosRuta = new Dictionary<string, object>();
                    parametrosRuta.Add("IdParametro", 111);
                    var result = await this.dao.GetPlazasEmailCC(parametrosRuta);
                    // URL del endpoint al que se envía la petición POST
                    dynamic jsonRuta = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                    var valorRuta = jsonRuta[0];
                    string url = valorRuta.valor;
                     //"https://demos.gruporuba.com.mx/MobileServiceTest2.0Vr/API/PushNotificationsSega/NotificacionSEGA";
                    // Crear el contenido de la petición, por ejemplo un JSON
                    //var content = new StringContent("{\"key\":\"value\"}", Encoding.UTF8, "application/json");
                    var datajson = new
                    {
                        UserSend = parametros["UserSend"],
                        UserTo = parametros["UserTo"],
                        Folio = parametros["Folio"],
                        FechaAgenda = parametros["FechaAgenda"],
                        HoraAgenda = parametros["HoraAgenda"],
                        Tipo = parametros["Tipo"]
                    };
                    string json = JsonConvert.SerializeObject(datajson);
                    // Enviar la petición POST
                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(url, content);

                    // Verificar si la petición fue exitosa
                    if (response.IsSuccessStatusCode)
                    {
                        // Leer la respuesta como una cadena
                        string responseBody = await response.Content.ReadAsStringAsync();
                        Console.WriteLine("Respuesta del servidor: " + responseBody);
                    }
                    else
                    {
                        Console.WriteLine("Error en la petición: " + response.StatusCode);
                    }
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return -1;
            }

        }

        public async Task<m.SCV.Interfaces.IUbicaciones> GetUbicacionById(int id)
        {
            var daoRep = Get<d.SCV.Interfaces.IReportesFallas>();
            var daoUbicaciones = Get<d.SCV.Interfaces.IUbicaciones>();
            var retValue = await daoUbicaciones.GetById(id);
            retValue.Plaza = retValue.Plaza != null ? retValue.Plaza : Get<m.SCV.Interfaces.IPlaza>();
            retValue.Plaza.ValidarResponsablePlaza = await daoRep.ValidarResponsablePlaza(retValue.IdPlaza);
            return retValue;
        }

        #region ++++++++++++++++++++++++ AREAS COMUNES +++++++++++++++++++++++++++
        public async Task<m.SCV.Interfaces.IAgendaContratistaAreasComunes> SaveAgendaContratistaAreasComunes(m.SCV.Interfaces.IAgendaContratistaAreasComunes item)
        {
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistasAreasComunes>();
            var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var daoContratista = Get<d.SCV.Interfaces.IContratistas>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpREP = Get<p.SCV.Interfaces.IReporteFallasAreasComunes>();
            var daoUB = Get<p.SCV.Interfaces.IUbicaciones>();

            m.SCV.Interfaces.IAgendaContratistaAreasComunes retValue = null;

            try
            {
                int idContratista = -1;
                int idExpediente = -1;

                foreach (var det in item.OrdenesTrabajo)
                {
                    idContratista = (int)det.OrdenTrabajo.IdContratista;
                    idExpediente = (int)det.IdOrdenTrabajo;
                }

                //int result = 0;
                List<dynamic> listOfx = new List<dynamic>();
                listOfx.AddRange(item.OrdenesTrabajo);
                /*
                result = await this.ValidatePlanificacion(item.FechaInicio, item.FechaFin, idContratista, listOfx, item.TipoAgenda.Clave);
                if (result < 0)
                {
                    retValue = item;
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                    return retValue;
                }
                result = await this.ValidateBloquesFechas(item.FechaInicio, item.FechaFin, idContratista, idExpediente, item.TipoAgenda.Clave);
                if (result < 0)
                {
                    retValue = item;
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                    return retValue;
                }
                */
                var estatusAgenda = await bpCGV.Get("AgendaEstatus", "ACT");
                var estatus = await bpCGV.Get("ESTATUS", "A");
                var estatusOT = await bpCGV.Get("SPVESTATUSOT", "E");

                item.IdEstatus = estatus.ID;
                item.Estado = item.ID == null || item.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                if (item != null)
                {
                    item.Modificado = DateTime.UtcNow;
                    item.IdModificadoPor = base.getUserId();
                }
                // Codigo que agregado para probar la actualizacin de los detalles de la agenda. INICIO
                if (item.OrdenesTrabajo[0].IdAgenda > 0)
                {
                    var agendaDetalle = daoAgendaDetalle.GetById(item.OrdenesTrabajo[0].IdAgenda.Value);
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    item.ID = agendaDetalle.Result.IdAgenda;
                    item.Version = agendaDetalle.Result.Version;
                }
                // Codigo nuevo para actualizacion de detalles de agenda. FIN
                if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    item.Creado = DateTime.UtcNow;
                    item.IdCreadoPor = base.getUserId();
                }

                BeginTransaction(true);

                // int idAgenda = -1; ChangeAreaComun2
                item.id_identificador_cc = item.IdPlaza;
                item.mesInicio = item.FechaInicio.Month;
                item.anioInicio = item.FechaInicio.Year;
                item.IdExpediente = idExpediente;
                item.IdEstatusAgenda = estatusAgenda.ID.Value;
                item.IdEstatus = estatus.ID.Value;
                item.IdUsuarioAsignado = idContratista;
                retValue = await daoAgenda.Save(item);
                int idAgenda = retValue.ID ?? 0;
                if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    foreach (var c in item.OrdenesTrabajo)
                    {
                        //c.Estado = c.ID == null || c.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        //c.IdAgenda = idAgenda;
                        //c.IdEstatusAgenda = (int)estatusAgenda.ID;
                        //c.IdEstatus = item.IdEstatus;
                        //c.IdCreadoPor = base.getUserId();
                        //c.IdModificadoPor = base.getUserId();
                        //c.IdExpediente = (int)c.IdOrdenTrabajo;
                        //c.IdUsuarioAsignado = c.OrdenTrabajo.IdContratista;

                        //var model = await daoAgendaDetalle.SaveEntity(c, false);
                        //if (model != null)
                        //{
                        //    c.ID = model.ID;
                        //}

                        if (c.Reservas != null && c.Reservas.Count > 0)
                        {
                            foreach (var rr in c.Reservas)
                            {
                                idExpediente = (int)c.IdOrdenTrabajo;
                                idContratista = c.OrdenTrabajo.IdContratista;

                                int response = await this.ValidateBloquesFechas(rr.FechaInicio, rr.FechaFin, idContratista, idExpediente, rr.TipoAgenda.Clave);
                                if (response < 0)
                                {
                                    Rollback();

                                    retValue = item;
                                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                                    return retValue;
                                }

                                rr.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                rr.IdEstatus = estatus.ID;
                                rr.Estatus = estatus;
                                rr.Modificado = DateTime.UtcNow;
                                rr.IdModificadoPor = base.getUserId();
                                rr.Creado = DateTime.UtcNow;
                                rr.IdCreadoPor = base.getUserId();
                                rr.IdTipoAgenda = item.IdTipoAgenda;
                                rr.IdEstatusAgenda = (int)estatusAgenda.ID;
                                rr.IdExpediente = (int)c.IdOrdenTrabajo;
                                rr.IdUsuarioAsignado = c.OrdenTrabajo.IdContratista;
                                rr.IdAgendaPadre = idAgenda;
                                rr.Reserva = true;
                                rr.Geolocalizacion = retValue.Geolocalizacion;
                                rr.id_identificador_cc = item.IdPlaza;
                                rr.mesInicio = rr.FechaInicio.Month;
                                rr.anioInicio = rr.FechaInicio.Year; var ra = await daoAgenda.Save(rr);
                                //if (ra != null)
                                //{
                                //    var rd = Get<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>();
                                //    rd.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                //    rd.IdAgenda = ra.ID;
                                //    rd.IdEstatusAgenda = (int)estatusAgenda.ID;
                                //    rd.IdEstatus = estatus.ID;
                                //    rd.Estatus = estatus;
                                //    rd.IdCreadoPor = base.getUserId();
                                //    rd.IdModificadoPor = base.getUserId();
                                //    rd.IdExpediente = (int)c.IdOrdenTrabajo;
                                //    rd.IdUsuarioAsignado = c.OrdenTrabajo.IdContratista;
                                //    rd.IdAgendaPadre = c.ID;
                                //    rd.Reserva = true;

                                //    var xx = await daoAgendaDetalle.SaveEntity(rd);
                                //}
                            }
                        }

                        /***** actualizar orden de trabajo ******/
                        await this.UpdatePlanificacionAreasComunes((int)c.IdOrdenTrabajo, retValue, null, "ACT");
                        /***** actualizar orden de trabajo ******/

                        // idContratista = -1;
                        try
                        {
                            //NOTIFICACIÓN AL CAT
                            var parametrosPlaza = new Dictionary<string, object>();
                            var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                            List<string> elementosEmails = new List<string>();
                            List<m.Kontrol.Interfaces.IUsuario> correosNiveles = null;
                            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();

                            parametrosPlaza.Add("IdPlaza", item.IdPlaza);
                            parametrosPlaza.Add("IdNivel", 134);

                            //var parametrosOrdenTrabajo = new Dictionary<string, object>();
                           // parametrosOrdenTrabajo.Add("IdOT", c.IdOrdenTrabajo);
                           // parametrosOrdenTrabajo.Add("AC", 1);
                           // correosNiveles = await daoPlaza.getUserByOrdenTrabajoID(parametrosOrdenTrabajo);
                            //if (correosNiveles == null || correosNiveles.Count <= 0)
                            //{
                                correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                           // }

                            foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }
                            // elementosEmails.Add("@enkontrol.com");
                            var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                            var moneda = await bpMON.GetByClave("MXN");
                            string[] to = elementosEmails.ToArray();

                            var documento = await bpREP.GetDocumentOT((int)c.IdOrdenTrabajo);
                            var tituloAdicionalPlantilla = "";
                            EK.Drivers.Common.IKontrolFiles[] documentos = { documento };
                            if (c.IdFolio == 0)
                            {
                                c.IdFolio = c.OrdenTrabajo.IdReporte;
                                tituloAdicionalPlantilla = "Reprogramación ";
                            }

                            List<string> EmailsCC = new List<string>();
                            var parametrosUsuariosEmailCat = new Dictionary<string, object>();
                            parametrosUsuariosEmailCat.Add("IdParametro", 108);
                            var result = await this.dao.GetUsuariosEmailCat(parametrosUsuariosEmailCat);
                            if (result != null)
                            {
                                dynamic objJson = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                                var valor = objJson[0];
                                string emails = valor.valor;
                                if (emails != "")
                                {
                                    string[] mailsCC = emails.Split(',');
                                    foreach (var email in mailsCC)
                                    {
                                        EmailsCC.Add(email);
                                    }
                                }

                            }

                            var plantilla = await this.GetPlantilla("NOTIFICAR-NUEVA-AGENDA-CONTRATISTA", c);
                            bpClientEmail.SendMessage(to, EmailsCC.ToArray(),  $"{ tituloAdicionalPlantilla}{plantilla.Titulo}", plantilla.Plantilla_Contenido, documentos, true);
                        }
                        catch (FormatException)
                        {
                            //base.SetReturnInfo(2, "No se pudo enviar la notificación: El correo del contratista no es válido.");
                        }
                        catch (Exception ex)
                        {
                            var noRetornarError = ex.Message;
                            //base.SetReturnInfo(2, "No se pudo enviar la notificación al contratista:" + ex.Message);
                        }
                    }
                }
                else
                {
                    var ot = item.OrdenesTrabajo[0];
                    var reservas = item.OrdenesTrabajo[0].Reservas;
                    // INICIO === Eliminar y agregar reservas. 
                    // Primero obtenemos la lista de reservas de la tablas agenda y agendaentvivienda
                    // Se itera la lista obtenida y se eliminan de las dos tablas en base a su id.
                    Dictionary<string, object> parametros = new Dictionary<string, object>();

                    parametros.Add("OperacionEspecificaSP", "OBTENER_POR_EXPEDIENTE");
                    parametros.Add("IdExpediente", ot.IdExpediente);
                    parametros.Add("IdAgendaDetalle", item.ID);
                    var resultado = await daoAgendaDetalle.GetAll(parametros);
                    foreach (var agenda in resultado)
                    {
                        await daoAgenda.Delete((int)agenda.IdAgenda);
                        await daoAgendaDetalle.Delete((int)agenda.IdAgenda);
                    }
                    if (reservas != null && reservas.Count > 0)
                    {
                        foreach (var r in reservas)
                        {
                            idExpediente = (int)ot.IdOrdenTrabajo;
                            idContratista = ot.OrdenTrabajo.IdContratista;

                            var newFechaInicio = r.FechaInicio.AddHours(-6);
                            r.FechaInicio = newFechaInicio;

                            int response = await this.ValidateBloquesFechas(r.FechaInicio, r.FechaFin, idContratista, idExpediente, r.TipoAgenda.Clave);
                            if (response < 0)
                            {
                                Rollback();

                                retValue = item;
                                retValue.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                                return retValue;
                            }

                            r.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            r.IdEstatus = estatus.ID;
                            r.Estatus = estatus;
                            r.Modificado = DateTime.UtcNow;
                            r.IdModificadoPor = base.getUserId();
                            r.Creado = DateTime.UtcNow;
                            r.IdCreadoPor = base.getUserId();
                            r.IdTipoAgenda = item.IdTipoAgenda;
                            var ra = await daoAgenda.Save(r);
                            if (ra != null)
                            {
                                var rd = Get<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>();
                                rd.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                rd.IdAgenda = ra.ID;
                                rd.IdEstatusAgenda = (int)estatusAgenda.ID;
                                rd.IdEstatus = estatus.ID;
                                rd.Estatus = estatus;
                                rd.IdCreadoPor = base.getUserId();
                                rd.IdModificadoPor = base.getUserId();
                                rd.IdExpediente = (int)ot.IdOrdenTrabajo;
                                rd.IdUsuarioAsignado = ot.OrdenTrabajo.IdContratista;
                                rd.IdAgendaPadre = ot.ID;
                                rd.Reserva = true;

                                var xx = await daoAgendaDetalle.SaveEntity(rd);
                            }
                        }
                    }
                }
                // FIN === Eliminar y agregar reservas. 
                retValue.OrdenesTrabajo = item.OrdenesTrabajo;
                retValue.ProcesoEjecutado = item.ProcesoEjecutado;
                retValue.EstatusAgenda = estatusAgenda;

                Commit();

                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        // AREAS COMUNES NOTIFICACION CAT
        public async void NotificacionCATAreasComunes(m.SCV.Interfaces.IAgendaContratistaAreasComunes item, m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes c)
        {
            var bpREP = Get<p.SCV.Interfaces.IReporteFallasAreasComunes>();

            try
            {
                //NOTIFICACIÓN AL CAT
                var parametrosPlaza = new Dictionary<string, object>();
                var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                List<string> elementosEmails = new List<string>();
                List<m.Kontrol.Interfaces.IUsuario> correosNiveles = null;
                var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();

                parametrosPlaza.Add("IdPlaza", item.IdPlaza);
                parametrosPlaza.Add("IdNivel", 134);
                correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);

                foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }

                //elementosEmails.Add("efrain.tamay@ruba.com.mx");
                //elementosEmails.Add("fvillegas@enkontrol.com");
                //elementosEmails.Add("jcenteno@enkontrol.com");
                var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                var moneda = await bpMON.GetByClave("MXN");
                string[] to = elementosEmails.ToArray();

                var documento = await bpREP.GetDocumentOT((int)c.IdOrdenTrabajo);
                var tituloAdicionalPlantilla = "";
                EK.Drivers.Common.IKontrolFiles[] documentos = { documento };
                if (c.IdFolio == 0)
                {
                    c.IdFolio = c.OrdenTrabajo.IdReporte;
                    tituloAdicionalPlantilla = "Seguimiento ";
                }

                //var plantilla = await this.GetPlantilla("NOTIFICAR-NUEVA-AGENDA-CONTRATISTA", c);
                //bpClientEmail.SendMessage(to, null, $"{ tituloAdicionalPlantilla}{plantilla.Titulo}", plantilla.Plantilla_Contenido, documentos, true);
            }
            catch (FormatException)
            {
                //base.SetReturnInfo(2, "No se pudo enviar la notificación: El correo del contratista no es válido.");
            }
            catch (Exception ex)
            {
                var noRetornarError = ex.Message;
                //base.SetReturnInfo(2, "No se pudo enviar la notificación al contratista:" + ex.Message);
            }
        }

        // CAMBIAR CONTRATISTA AREAS COMUNES
        public async Task<m.SCV.Interfaces.IAgendaContratistaAreasComunes> SaveAgendaChangeContratistaAreasComunes(m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes item)
        {
            var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBAAreasComunes>();
            //var daoAEV = Get<EK.Datos.Kontrol.Interfaces.IAgendaEntVivienda>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistasAreasComunes>();

            int newIdContratista = item.OrdenTrabajo.IdContratista;
            m.SCV.Interfaces.IAgendaContratistaAreasComunes retValue = null;
            try
            {
                BeginTransaction(true);

                // Se cambia el contratista en la orden de trabajo
                var parametros = new Dictionary<string, object>();
                parametros.Add("idOrdenTrabajo", item.IdOrdenTrabajo);
                string IdPlaza = item.IdPlaza;
                var recordOT = await daoOT.GetById(item.IdOrdenTrabajo.Value);
                if (recordOT != null)
                {
                    recordOT.IdContratista = newIdContratista;
                    recordOT.IdModificadoPor = base.getUserId();
                    recordOT.Modificado = DateTime.UtcNow;
                    recordOT.Changed("IdContratista", true);
                    recordOT.Changed("IdModificadoPor", true);
                    recordOT.Changed("Modificado", true);
                    await daoOT.SaveEntity(recordOT);
                    await this.EnviarEmailCambiocontratistaAreasComunes(recordOT, IdPlaza);
                }

                // Se cambia el contratista de cada una de las partidas asignadas a la orden de trabajo --ChangeAreaComun2

                var partidasOT = await daoOTD.GetAll(parametros);
                if (partidasOT != null && partidasOT.Count > 0)
                {
                    foreach (var pot in partidasOT)
                    {
                        var partida = await daoDET.GetById(pot.IdPartida);
                        partida.IdContratista = newIdContratista;
                        partida.IdResponsable = newIdContratista;
                        partida.IdModificadoPor = base.getUserId();
                        partida.Modificado = DateTime.UtcNow;
                        partida.Changed("IdContratista", true);
                        partida.Changed("IdResponsable", true);
                        partida.Changed("IdModificadoPor", true);
                        partida.Changed("Modificado", true);
                        await daoDET.SaveEntity(partida);
                    }
                }

                var agendaOT = await daoAgenda.GetById(item.IdAgenda.Value);
                if (agendaOT != null)
                {
                    agendaOT.IdUsuarioAsignado = newIdContratista;
                    agendaOT.IdModificadoPor = base.getUserId();
                    agendaOT.Modificado = DateTime.UtcNow;
                    agendaOT.Changed("IdUsuarioAsignado", true);
                    agendaOT.Changed("IdModificadoPor", true);
                    agendaOT.Changed("Modificado", true);
                    await daoAgenda.SaveEntity(agendaOT);
                }

                Commit();

                retValue = await daoAgenda.GetById(item.IdAgenda.Value);
                retValue.Estado = m.Kontrol.KontrolEstadosEnum.Exitoso;
                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        // GUARDAR AGENDA DICTAMEN AREAS COMUNES
        public async Task<m.SCV.Interfaces.IAgendaDictamenAreasComunes> SaveAgendaDictamenAreasComunes(m.SCV.Interfaces.IAgendaDictamenAreasComunes item)
        {
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasDictamenesAreasComunes>();
            var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpREP = Get<p.SCV.Interfaces.IReportesFallas>();
            var bpREPAC = Get<p.SCV.Interfaces.IReporteFallasAreasComunes>();
            m.SCV.Interfaces.IAgendaDictamenAreasComunes retValue = null;

            try
            {
                int idAsignado = -1;
                int idExpediente = -1;

                foreach (var det in item.Dictamenes)
                {
                    idAsignado = (int)det.Dictamen.ResponsableDictamen.ID;
                    idExpediente = (int)det.Dictamen.ID;
                }

                var estatusAgenda = await bpCGV.Get("AgendaEstatus", "ACT");
                var estatus = await bpCGV.Get("ESTATUS", "A");

                item.IdEstatus = estatus.ID;
                item.Estado = item.ID == null || item.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                if (item != null)
                {
                    item.Modificado = DateTime.UtcNow;
                    item.IdModificadoPor = base.getUserId();
                }

                if (item.Dictamenes[0].IdAgenda > 0)
                {
                    var agendaDetalle = daoAgenda.GetById(item.Dictamenes[0].IdAgenda.Value);
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    item.ID = agendaDetalle.Result.ID;
                    item.Version = agendaDetalle.Result.Version;
                }

                if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    item.Creado = DateTime.UtcNow;
                    item.IdCreadoPor = base.getUserId();
                }

                BeginTransaction(true);

                item.id_identificador_cc = item.IdPlaza;
                item.mesInicio = item.FechaInicio.Month;
                item.anioInicio = item.FechaInicio.Year;
                item.IdExpediente = idExpediente;
                item.IdEstatusAgenda = estatusAgenda.ID.Value;
                item.IdEstatus = estatus.ID.Value;
                item.IdUsuarioAsignado = idAsignado;

                retValue = await daoAgenda.Save(item);
                int idAgenda = retValue.ID ?? 0;

                if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    foreach (var c in item.Dictamenes)
                    {
                        c.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        c.ID = null;
                        c.IdAgenda = idAgenda;
                        c.IdEstatusAgenda = (int)estatusAgenda.ID;
                        c.IdEstatus = item.IdEstatus;
                        c.IdExpediente = (int)c.Dictamen.ID;
                        c.Reserva = false;
                        c.IdUsuarioAsignado = c.Dictamen.ResponsableDictamen.ID;

                        m.SCV.Interfaces.IReporteAreasComunesDictamen dictamenUpdate = await this.UpdatePlanificacionDictamen((int)c.Dictamen.ID, retValue, null, "ACT");

                        try
                        {

                            //NOTIFICACIÓN AL CAT
                            var parametrosPlaza = new Dictionary<string, object>();
                            var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                            List<string> elementosEmails = new List<string>();
                            List<m.Kontrol.Interfaces.IUsuario> correosNiveles = new List<m.Kontrol.Interfaces.IUsuario>();
                            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
                            var pm = await GetGlobalParameters("INSTALACION");
                            string linkTarea = $"{pm.Value<string>("SitioWeb")}{"/scv/pv/reporteFallasAreasComunes/"}{dictamenUpdate.IdReporte}";
                            var parametros = new Dictionary<string, object>()
                            {
                                { "Link", linkTarea
                                }
                            };
                            //            
                            int idCliente = dictamenUpdate.IdCliente;
                            var agenda = retValue;
                            var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
                            var daoUbicacion = Get<d.SCV.Interfaces.IUbicaciones>();
                            var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
                            var daoRF = Get<d.SCV.Interfaces.IReporteFallasAreasComunes>();
                            var daoRF_C = Get<d.SCV.Interfaces.IReportesFallas>();
                            var cliente = await daoCliente.GetById(idCliente);
                            
                            var ubicacion = cliente.IdUbicacion != null? await daoUbicacion.GetById((int)cliente.IdUbicacion):null;
                            var parametrosFolioDetalle = new Dictionary<string, object>();
                            parametrosFolioDetalle.Add("Id", c.IdFolio);
                            var partidas = await daoDET.GetAll(parametrosFolioDetalle);

                            var parametrosFolio = new Dictionary<string, object>();
                            parametrosFolio.Add("ID", c.IdFolio);
                            //var reporteFalla = await daoRF.GetById(c.IdFolio);
                            var reporteFalla = await daoRF_C.GetById(c.Dictamen.IdReporte);

                            List<dynamic> listOfDiagnosticos = new List<dynamic>();
                            List<dynamic> listOfCitas = new List<dynamic>();
                            List<dynamic> listOfPartidas = new List<dynamic>();
                            listOfDiagnosticos.Add(item.Dictamenes);
                            listOfCitas.Add(agenda);
                            listOfPartidas.Add(partidas);

                            dynamic expando = new ExpandoObject();
                            expando.Agenda = agenda;
                            expando.Citas = listOfCitas;
                            expando.Cliente = cliente;
                            expando.Ubicacion = ubicacion;
                            expando.Dictamenes = listOfDiagnosticos;
                            //expando.Responsable = model.Dictamen.ResponsableDictamen;
                            expando.Partidas = partidas;
                            expando.Folio = reporteFalla;
                            //expando.IdDictamen = model.Dictamen.ID;

                            //parametrosPlaza.Add("IdPlaza", dictamenUpdate.IdPlaza);
                            //parametrosPlaza.Add("IdNivel", 134);
                            //correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                            var daoUsuariosEK = Get<d.Kontrol.Interfaces.IUsuarios>();
                            var responsable = await daoUsuariosEK.GetById(c.Dictamen.IdResponsableDictamen.Value);

                            correosNiveles.Add(responsable);
                            foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }

                            List<string> EmailsCC = new List<string>();
                            var parametrosUsuariosEmailCat = new Dictionary<string, object>();
                            parametrosUsuariosEmailCat.Add("IdParametro", 108);
                            var result = await this.dao.GetUsuariosEmailCat(parametrosUsuariosEmailCat);
                            if (result != null)
                            {
                                dynamic objJson = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                                var valor = objJson[0];
                                string emails = valor.valor;
                                if (emails != "")
                                {
                                    string[] mailsCC = emails.Split(',');
                                    foreach (var email in mailsCC)
                                    {
                                        EmailsCC.Add(email);
                                    }
                                }

                            }



                            //elementosEmails.Add("fvillegas@enkontrol.com");
                            //elementosEmails.Add("efrain.tamay@ruba.com.mx");
                            //elementosEmails.Add("jcenteno@enkontrol.com");
                            // elementosEmails.Add("jcenteno@enkontrol.com");
                            //notificacion supervisor asignado
                            object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                            //correosNiveles.Add(c.Dictamen.ResponsableDictamen);

                            var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                            var moneda = await bpMON.GetByClave("MXN");
                            // Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("NOTIFICAR-DIAGNOSTICO-AREAS-COMUNES-DOCUMENTO", obj, null, moneda);
                            //Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);
                            var documento = await this.GetDocumentDiagnosticoAreasComunes((int)c.Dictamen.ID);
                            EK.Drivers.Common.IKontrolFiles[] documentos = { documento };

                            var plantillaObj = await this.GetPlantilla("NOTIFICAR-DIAGNOSTICO", obj);
                            var TituloMail = "DIAGNOSTICO [" +c.ID + "] - FOLIO [" + expando.Folio.ID + "]";
                            bpClientEmail.SendMessage(elementosEmails.ToArray(), EmailsCC.ToArray(), TituloMail, plantillaObj.Plantilla_Contenido, documentos, true);
                            // bpClientEmail.SendMessage(elementosEmails.ToArray(), EmailsCC.ToArray(),plantillaObj.Titulo, plantillaObj.Plantilla_Contenido, documentos, true);
                        }
                        catch (FormatException ex)
                        {
                            //base.SetReturnInfo(2, "No se pudo enviar la notificación, El correo no es válido.");
                        }
                        catch (Exception ex)
                        {
                            ////base.SetReturnInfo(2, "No se pudo enviar la notificación:" + ex.Message);
                        }

                    }
                }
                else
                {
                    foreach (var c in item.Dictamenes)
                    {
                        try
                        {

                            //NOTIFICACIÓN AL CAT
                            var parametrosPlaza = new Dictionary<string, object>();
                            var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                            List<string> elementosEmails = new List<string>();
                            List<m.Kontrol.Interfaces.IUsuario> correosNiveles = new List<m.Kontrol.Interfaces.IUsuario>();
                            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
                            var pm = await GetGlobalParameters("INSTALACION");
                            string linkTarea = $"{pm.Value<string>("SitioWeb")}{"/scv/pv/reportesFallas/"}{c.Dictamen.IdReporte}";
                            var parametros = new Dictionary<string, object>()
                            {
                                { "Link", linkTarea }
                            };
                            //            
                            int idCliente = c.IdCliente.Value;
                            var agenda = retValue;
                            var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
                            var daoUbicacion = Get<d.SCV.Interfaces.IUbicaciones>();
                            var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
                            var daoRF = Get<d.SCV.Interfaces.IReporteFallasAreasComunes>();
                            var cliente = await daoCliente.GetById(idCliente);
                            var ubicacion = cliente != null && cliente.IdUbicacion != null ? await daoUbicacion.GetById((int)cliente.IdUbicacion) : null;
                            var parametrosFolioDetalle = new Dictionary<string, object>();
                            parametrosFolioDetalle.Add("Id", c.Dictamen.IdReporte);
                            //parametrosFolioDetalle.Add("ID", model.Dictamen.Partida.ID.Value);
                            var partidas = await daoDET.GetAll(parametrosFolioDetalle);

                            var parametrosFolio = new Dictionary<string, object>();
                            parametrosFolio.Add("ID", c.Dictamen.IdReporte);
                            var reporteFalla = await daoRF.GetById(c.Dictamen.IdReporte);

                            List<dynamic> listOfDiagnosticos = new List<dynamic>();
                            List<dynamic> listOfCitas = new List<dynamic>();
                            List<dynamic> listOfPartidas = new List<dynamic>();
                            listOfDiagnosticos.Add(c.Dictamen);
                            listOfCitas.Add(agenda);
                            listOfPartidas.Add(partidas);

                            dynamic expando = new ExpandoObject();
                            expando.Agenda = agenda;
                            expando.Citas = listOfCitas;
                            expando.Cliente = cliente;
                            expando.Ubicacion = ubicacion;
                            expando.Dictamenes = listOfDiagnosticos;
                            expando.Responsable = c.Dictamen.ResponsableDictamen;
                            expando.Partidas = partidas;
                            expando.Folio = reporteFalla;
                            expando.IdDictamen = c.Dictamen.ID;

                            //parametrosPlaza.Add("IdPlaza", item.IdPlaza);
                            //parametrosPlaza.Add("IdNivel", 134);
                            //correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                            var daoUsuariosEK = Get<d.Kontrol.Interfaces.IUsuarios>();
                            var responsable = await daoUsuariosEK.GetById(c.Dictamen.IdResponsableDictamen.Value);

                            correosNiveles.Add(responsable);
                            foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }


                            List<string> EmailsCC = new List<string>();
                            var parametrosUsuariosEmailCat = new Dictionary<string, object>();
                            parametrosUsuariosEmailCat.Add("IdParametro", 108);
                            var result = await this.dao.GetUsuariosEmailCat(parametrosUsuariosEmailCat);
                            if (result != null)
                            {
                                dynamic objJson = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                                var valor = objJson[0];
                                string emails = valor.valor;
                                if (emails != "")
                                {
                                    string[] mailsCC = emails.Split(',');
                                    foreach (var email in mailsCC)
                                    {
                                        EmailsCC.Add(email);
                                    }
                                }

                            }
                            //elementosEmails.Add("fvillegas@enkontrol.com");
                            //notificacion supervisor asignado
                            object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                          

                            var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                            var moneda = await bpMON.GetByClave("MXN");
                            // Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("NOTIFICAR-DIAGNOSTICO-AREAS-COMUNES-DOCUMENTO", obj, null, moneda);
                            //Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);
                            var documento = await this.GetDocumentDiagnosticoAreasComunes((int)c.Dictamen.ID);
                            EK.Drivers.Common.IKontrolFiles[] documentos = { documento };
                            
                            var plantillaObj = await this.GetPlantilla("NOTIFICAR-DIAGNOSTICO", obj);
                            var TituloMail = "DIAGNOSTICO [" + c.ID + "] - FOLIO [" + expando.Folio.ID + "]";

                            bpClientEmail.SendMessage(elementosEmails.ToArray(), EmailsCC.ToArray(), TituloMail, plantillaObj.Plantilla_Contenido, documentos, true);
                        }
                        catch (FormatException ex)
                        {
                            //base.SetReturnInfo(2, "No se pudo enviar la notificación, El correo no es válido.");
                        }
                        catch (Exception ex)
                        {
                            ////base.SetReturnInfo(2, "No se pudo enviar la notificación:" + ex.Message);
                        }

                    }
                }

                retValue.Dictamenes = item.Dictamenes;
                retValue.ProcesoEjecutado = item.ProcesoEjecutado;
                retValue.EstatusAgenda = estatusAgenda;

                Commit();

                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        public async Task<Drivers.Common.IKontrolFiles> GetDocumentDiagnosticoAreasComunes(int id)
        {
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var daoRF = Get<d.SCV.Interfaces.IReporteFallasAreasComunes>();
            var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
            var daoAG = Get<d.SCV.Interfaces.IAgendaSPV>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistasAreasComunes>();
            var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenesAreasComunes>();

            try
            {
                var moneda = await bpMON.GetByClave("MXN");

                var dictamen = await daoDIC.GetById(id);
                var reporteFalla = await daoRF.GetById((int)dictamen.IdReporte);
                //var ubicacion = await this.GetUbicacionById((int)reporteFalla.IdUbicacion);
                var citas = await daoAG.GetAgendaDetalleHistorial("DictamenAreasComunes", id, null);

                m.SCV.Interfaces.IReporteAreasComunesDictamen dictamenUpdate = await daoDIC.GetById(id);

                var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
                var cliente = await daoCliente.GetById((int)dictamenUpdate.IdCliente);
                if (reporteFalla.UsuarioReporta == "PorAnonimo")
                {
                    reporteFalla.Cliente.Nombre = "Anonimo";
                    //reporteFalla.ID = 999999;
                }
                if (reporteFalla.UsuarioReporta == "PorColaborador")
                {
                    reporteFalla.Cliente.Nombre = reporteFalla.Usuario.Nombre;
                    //reporteFalla.ID = reporteFalla.Usuario.ID;
                }
                var IdAgendaDetalle = 0;
                if (dictamenUpdate.IdAgenda != null)
                {
                    IdAgendaDetalle = (int)dictamenUpdate.IdAgenda;
                }
                var model = await daoAgendaDetalle.GetById(IdAgendaDetalle);

                var IdAgenda = 0;
                if (model != null)
                {
                    IdAgenda = (int)model.IdAgenda;
                }
                var agenda = await daoAgenda.GetById(IdAgenda);


                var parametrosFolioDetalle = new Dictionary<string, object>();
                parametrosFolioDetalle.Add("idReporte", dictamenUpdate.IdReporte);
                //parametrosFolioDetalle.Add("ID", dictamenUpdate.Partida.ID.Value);
                var partidas = await daoDET.GetAll(parametrosFolioDetalle);
                int[] arrayPartidas = new int[partidas.Count];
                for (int i = 0; i < partidas.Count; i++)
                    arrayPartidas[i] = partidas[i].ID.Value;

                var partidasDictamenIDs = dictamen.IdPartidas.Split(',');
                List<m.SCV.Interfaces.IReporteFallasAreasComunesPartida> PartidasEnDictamen = new List<m.SCV.Interfaces.IReporteFallasAreasComunesPartida>();
                foreach (var p in partidasDictamenIDs)
                {
                    foreach (var partida in partidas)
                    {
                        if (p == partida.ID.ToString())
                        {
                            PartidasEnDictamen.Add(partida);
                        }
                    }
                }
                /*for (int i = 0; i < arrayPartidas.Length; i++)
                {
                    int IdPartida = arrayPartidas[i];
                    if (!dictamen.IdPartidas.Contains(IdPartida.ToString()))
                    {
                        for (int j = 0; j < partidas.Count; j++)
                            if (partidas[j].ID == IdPartida) partidas.RemoveAt(j);
                    }

                }*/
                List<dynamic> listOfDiagnosticos = new List<dynamic>();
                List<dynamic> listOfCitas = new List<dynamic>();
                List<dynamic> listOfPartidas = new List<dynamic>();
                listOfDiagnosticos.Add(dictamenUpdate);

                dynamic expando = new ExpandoObject();
                expando.Agenda = agenda;
                expando.Citas = citas;
                expando.Cliente = cliente;
                //expando.Ubicacion = ubicacion;
                expando.Dictamenes = listOfDiagnosticos;
                expando.Responsable = dictamenUpdate.ResponsableDictamen;
                expando.Partidas = PartidasEnDictamen;
                expando.Folio = reporteFalla;
                expando.IdDictamen = dictamenUpdate.ID;



                object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));

                Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("NOTIFICAR-DIAGNOSTICO-AREAS-COMUNES-DOCUMENTO", obj, null, moneda);
                Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);

                return documento;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // SAVE DETALLE PROGRAMACION CONTRATISTA AREAS COMUNES 
        public async Task<m.SCV.Interfaces.IAgendaContratistaAreasComunes> SaveDetProgContratistaAreasComunes(m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes item)
        {
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistasAreasComunes>();
            var daoRep = Get<d.SCV.Interfaces.IReporteFallasAreasComunes>();
            var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var daoContratista = Get<d.SCV.Interfaces.IContratistas>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var retValue = Get<m.SCV.Interfaces.IAgendaContratistaAreasComunes>();

            m.SCV.Interfaces.IReporteFallasAreasComunes model = null;
            model = await daoRep.GetById(item.IdFolio);

            try
            {
                var bpEstatusAgenda = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var currentEstatus = Get<m.Kontrol.Interfaces.IItemGeneral>();
                var agenda = item.OrdenTrabajo.Agenda;
                var agendaDetalle = item.OrdenTrabajo.AgendaDetalle;
                var savedAgenda = daoAgenda.GetById((int)agenda.ID);

                BeginTransaction();

                switch (item.OrdenTrabajo.Agenda.EstatusAgenda.Clave)
                {
                    case "ATE":
                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "ATE");
                        agenda.Estado = item.OrdenTrabajo.AgendaDetalle.ID == null || item.OrdenTrabajo.AgendaDetalle.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        agenda.IdEstatusAgenda = (int)currentEstatus.ID;
                        agenda.IdModificadoPor = base.getUserId();
                        agenda.Modificado = DateTime.UtcNow;
                        agenda.Version = savedAgenda.Result.Version;
                        agenda.Changed("IdEstatusAgenda", true);
                        agenda.Changed("IdModificadoPor", true);
                        agenda.Changed("Modificado", true);

                        await daoAgenda.SaveEntity(agenda, false);
                        await this.UpdatePlanificacionAreasComunes((int)item.IdOrdenTrabajo, null, item, "ATE");
                        break;
                    case "REP":

                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "REP");

                        agenda.Estado = item.OrdenTrabajo.AgendaDetalle.ID == null || item.OrdenTrabajo.AgendaDetalle.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        agenda.IdEstatusAgenda = (int)currentEstatus.ID;
                        agenda.IdModificadoPor = base.getUserId();
                        agenda.Modificado = DateTime.UtcNow;
                        agenda.Version = savedAgenda.Result.Version;
                        agenda.Changed("IdEstatusAgenda", true);
                        agenda.Changed("IdModificadoPor", true);
                        agenda.Changed("Modificado", true);
                        agenda.Changed("IdMotivo", true);
                        agenda.Changed("Observaciones", true);

                        await daoAgenda.SaveEntity(agenda, false);
                        var referencia = await daoAgenda.GetById((int)agenda.ID);

                        // Nueva agenda de la reprogramacion
                        var newDetalle = Get<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>();
                        newDetalle.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        newDetalle.IdOrdenTrabajo = item.IdOrdenTrabajo;
                        newDetalle.OrdenTrabajo = item.OrdenTrabajo;
                        newDetalle.IdAgendaPadre = (int)agendaDetalle.ID;

                        var newAgenda = Get<m.SCV.Interfaces.IAgendaContratistaAreasComunes>();
                        newAgenda.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        newAgenda.FechaInicio = agenda.FechaInicio;
                        newAgenda.FechaFin = agenda.FechaFin;
                        newAgenda.IdTipoAgenda = (int)agenda.TipoAgenda.ID;
                        newAgenda.TipoAgenda = agenda.TipoAgenda;
                        newAgenda.IdLocalidad = referencia.IdLocalidad;
                        newAgenda.Localidad = referencia.Localidad;
                        newAgenda.Geolocalizacion = referencia.Geolocalizacion;

                        newAgenda.OrdenesTrabajo = new List<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>();
                        newAgenda.OrdenesTrabajo.Add(newDetalle);
                        newAgenda.IdPlaza = model.IdPlaza;
                        newAgenda.ProcesoEjecutado = "Reprogramación";

                        retValue = await this.SaveAgendaContratistaAreasComunes(newAgenda);
                        break;
                    case "SEG":
                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "ATE");
                        agenda.Estado = item.OrdenTrabajo.AgendaDetalle.ID == null || item.OrdenTrabajo.AgendaDetalle.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        agenda.IdEstatusAgenda = (int)currentEstatus.ID;
                        agenda.IdModificadoPor = base.getUserId();
                        agenda.Modificado = DateTime.UtcNow;
                        agenda.Version = savedAgenda.Result.Version;
                        agenda.Changed("IdEstatusAgenda", true);
                        agenda.Changed("IdModificadoPor", true);
                        agenda.Changed("Modificado", true);
                        agenda.Changed("IdMotivo", true);

                        // Graba en AgendaEntVivienda
                        await daoAgenda.SaveEntity(agenda, false);
                        referencia = await daoAgenda.GetById((int)agenda.ID);

                        // Graba en Agenda "MASTER"
                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "SEG");
                        newAgenda = Get<m.SCV.Interfaces.IAgendaContratistaAreasComunes>();
                        newAgenda.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        newAgenda.IdEstatus = 13;//estatus.IdEstatus;
                        newAgenda.FechaInicio = agenda.FechaInicio;
                        newAgenda.FechaFin = agenda.FechaFin;
                        newAgenda.Descripcion = item.OrdenTrabajo.AgendaDetalle.Observaciones;
                        newAgenda.IdTipoAgenda = (int)agenda.TipoAgenda.ID;
                        newAgenda.TipoAgenda = agenda.TipoAgenda;
                        newAgenda.IdLocalidad = referencia.IdLocalidad;
                        newAgenda.Localidad = referencia.Localidad;
                        newAgenda.Geolocalizacion = referencia.Geolocalizacion;
                        newAgenda.IdPlaza = model.IdPlaza;
                        newAgenda.ProcesoEjecutado = "Seguimiento";
                        newAgenda.id_identificador_cc = model.IdPlaza;
                        newAgenda.mesInicio = agenda.FechaInicio.Month;
                        newAgenda.anioInicio = agenda.FechaInicio.Year;

                        newAgenda.Changed("Estado", true);
                        newAgenda.Changed("IdEstatus", true);
                        newAgenda.Changed("FechaInicio", true);
                        newAgenda.Changed("FechaFin", true);
                        newAgenda.Changed("IdTipoAgenda", true);
                        newAgenda.Changed("TipoAgenda", true);
                        newAgenda.Changed("IdPlaza", true);
                        newAgenda.Changed("Geolocalizacion", true);
                        retValue = await daoAgenda.SaveEntity(newAgenda, false);

                        // Nueva en AgendaEntVivienda "DETALLE" para el seguimiento
                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "SEG");
                        newDetalle = Get<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>();
                        newDetalle.IdAgenda = retValue.ID;
                        newDetalle.Estado = item.OrdenTrabajo.AgendaDetalle.ID == null || item.OrdenTrabajo.AgendaDetalle.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        newDetalle.IdExpediente = item.OrdenTrabajo.ID; ///***
                        newDetalle.IdUsuarioAsignado = item.OrdenTrabajo.IdContratista;///***
                        newDetalle.IdEstatusAgenda = (int)currentEstatus.ID;
                        newDetalle.IdModificadoPor = base.getUserId();
                        newDetalle.Modificado = DateTime.UtcNow;
                        newDetalle.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        newDetalle.IdOrdenTrabajo = item.IdOrdenTrabajo;
                        newDetalle.OrdenTrabajo = item.OrdenTrabajo;
                        newDetalle.IdAgendaPadre = (int)agendaDetalle.ID;
                        newDetalle.IdEstatus = 13;
                        newDetalle.Observaciones = item.OrdenTrabajo.AgendaDetalle.Observaciones;
                        newDetalle.Changed("IdEstatusAgenda", true);
                        newDetalle.Changed("IdModificadoPor", true);
                        newDetalle.Changed("Modificado", true);
                        newDetalle.Changed("IdMotivo", true);
                        newDetalle.Changed("Observaciones", true);
                        await daoAgendaDetalle.Save(newDetalle);

                        NotificacionCATAreasComunes(newAgenda, newDetalle);

                        break;

                    case "CAN":
                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "CAN");
                        agenda.Estado = item.OrdenTrabajo.AgendaDetalle.ID == null || item.OrdenTrabajo.AgendaDetalle.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        agenda.IdEstatusAgenda = (int)currentEstatus.ID;
                        agenda.IdModificadoPor = base.getUserId();
                        agenda.Modificado = DateTime.UtcNow;
                        agenda.Version = savedAgenda.Result.Version;
                        agenda.Changed("IdEstatusAgenda", true);
                        agenda.Changed("IdModificadoPor", true);
                        agenda.Changed("Modificado", true);
                        agenda.Changed("IdMotivo", true);

                        await daoAgenda.SaveEntity(agenda, false);
                        await this.UpdatePlanificacionAreasComunes((int)item.IdOrdenTrabajo, null, item, "CAN");
                        break;
                    default:
                        break;
                }

                Commit();

                retValue.Estado = m.Kontrol.KontrolEstadosEnum.Exitoso;
                retValue.EstatusAgenda = currentEstatus;

                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        //OT AREAS COMUNES
        public async Task<m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes> UpdatePlanificacionAreasComunes(int idOrden, m.SCV.Interfaces.IAgendaContratistaAreasComunes agenda, m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes agendaDetalle, string agendaEstatus)
        {
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpREP = Get<p.SCV.Interfaces.IReporteFallasAreasComunes>();
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBAAreasComunes>();
            var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
            var daoREP = Get<d.SCV.Interfaces.IReporteFallasAreasComunes>();

            m.Kontrol.Interfaces.IItemGeneral estatusOT = null;
            m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes model = null;
            m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes retValue = null;
            m.SCV.Interfaces.IReporteFallasAreasComunes reporte = null;

            try
            {
                switch (agendaEstatus)
                {
                    case "ACT":
                    case "REP":
                        estatusOT = await bpCGV.Get("SPVESTATUSOT", "N");
                        model = await daoOT.GetById(idOrden);
                        model.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        model.IdAgenda = (int)agenda.ID;
                        model.IdEstatusOrdenTrabajo = (int)estatusOT.ID;
                        model.IdModificadoPor = base.getUserId();
                        model.Modificado = DateTime.UtcNow;
                        model.Changed("IdAgenda", true);
                        model.Changed("IdEstatusOrdenTrabajo", true);
                        model.Changed("IdModificadoPor", true);
                        model.Changed("Modificado", true);
                        retValue = await daoOT.SaveEntity(model);

                        break;
                    case "ATE":
                        estatusOT = await bpCGV.Get("SPVESTATUSOT", "E");
                        model = await daoOT.GetById(idOrden);
                        model.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        model.FechaInicio = agendaDetalle.OrdenTrabajo.FechaInicio;
                        model.FechaFin = agendaDetalle.OrdenTrabajo.FechaFin;
                        if (model.FechaFin != null)
                            model.DiasEstimadoCulminacion = ((DateTime)model.FechaFin - (DateTime)model.FechaInicio).Days;
                        model.IdEstatusOrdenTrabajo = (int)estatusOT.ID;
                        model.Autorizada = true;
                        model.IdModificadoPor = base.getUserId();
                        model.Modificado = DateTime.UtcNow;
                        model.Changed("FechaInicio", true);
                        model.Changed("FechaFin", true);
                        model.Changed("DiasEstimadoCulminacion", true);
                        model.Changed("IdEstatusOrdenTrabajo", true);
                        model.Changed("Autorizada", true);
                        model.Changed("IdModificadoPor", true);
                        model.Changed("Modificado", true);
                        retValue = await daoOT.SaveEntity(model);

                        //buscar las partidas de la orden de trabajo y actualizar fechas estimadas
                        var parametros = new Dictionary<string, object>();
                        parametros.Add("idOrdenTrabajo", idOrden);

                        var partidasOT = await daoOTD.GetAll(parametros);
                        if (partidasOT != null && partidasOT.Count > 0)
                        {
                            foreach (var pot in partidasOT)
                            {
                                var partida = await daoDET.GetById(pot.IdPartida);
                                partida.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                partida.FechaInicioProgramacion = model.FechaInicio;
                                partida.FechaTerminoProgramacion = model.FechaFin;
                                partida.EstatusPartidaValor = "L";
                                partida.IdModificadoPor = base.getUserId();
                                partida.Modificado = DateTime.UtcNow;
                                partida.Changed("FechaInicioProgramacion", true);
                                partida.Changed("FechaTerminoProgramacion", true);
                                partida.Changed("EstatusPartidaValor", true);
                                partida.Changed("IdModificadoPor", true);
                                partida.Changed("Modificado", true);
                                await daoDET.SaveEntity(partida);
                            }
                        }

                        var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistasAreasComunes>();
                        var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();

                        var paramAgenda = new Dictionary<string, object>();
                        paramAgenda.Add("IdOT", agendaDetalle.IdOrdenTrabajo);
                        var resp = await this.dao.CerrarReservas(paramAgenda);
                        //var agendaDetalle = item.OrdenTrabajo.AgendaDetalle;

                        //actualizar reporte a En Proceso y usuario que inició el proceso
                        reporte = await daoREP.GetById(model.IdReporte);
                        reporte.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        reporte.Modificado = DateTime.UtcNow;
                        reporte.IdModificadoPor = base.getUserId();
                        reporte.Changed("Modificado", true);
                        reporte.Changed("IdModificadoPor", true);

                        if (reporte.IdUsuarioProcesoInicio == null)
                        {
                            reporte.IdUsuarioProcesoInicio = base.getUserId();
                            reporte.Changed("IdUsuarioProcesoInicio", true);
                        }

                        int? id = reporte.IdFolio;
                        reporte.IdFolio = reporte.ID;
                        reporte.ID = id;

                        await daoREP.SaveEntity(reporte, false, false);

                        break;
                    case "CAN":
                        estatusOT = await bpCGV.Get("SPVESTATUSOT", "C");
                        model = await daoOT.GetById(idOrden);
                        model.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        model.IdEstatusOrdenTrabajo = (int)estatusOT.ID;
                        model.IdModificadoPor = base.getUserId();
                        model.Modificado = DateTime.UtcNow;
                        model.Changed("IdEstatusOrdenTrabajo", true);
                        model.Changed("IdModificadoPor", true);
                        model.Changed("Modificado", true);
                        retValue = await daoOT.SaveEntity(model);


                        //buscar las partidas de la orden de trabajo y actualizar fechas estimadas
                        var paramsPartidas = new Dictionary<string, object>();
                        paramsPartidas.Add("idOrdenTrabajo", idOrden);

                        var partidas = await daoOTD.GetAll(paramsPartidas);
                        if (partidas != null && partidas.Count > 0)
                        {
                            foreach (var pot in partidas)
                            {
                                var partida = await daoDET.GetById(pot.IdPartida);
                                partida.EstatusPartidaValor = "X";
                                partida.Changed("EstatusPartidaValor", true);
                                await daoDET.SaveEntity(partida);
                            }
                        }
                        reporte = await daoREP.GetById(model.IdReporte);

                        await bpREP.TryCerrarReporte(reporte, "T", true);

                        break;
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //DICTAMEN AREAS COMUNES
        public async Task<m.SCV.Interfaces.IReporteAreasComunesDictamen> UpdatePlanificacionDictamen(int idDictamen, m.SCV.Interfaces.IAgendaDictamenAreasComunes agenda, m.SCV.Interfaces.IAgendaDictamenDetalleAreasComunes agendaDetalle, string agendaEstatus)
        {
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoOT = Get<d.SCV.Interfaces.IReportesDictamenesAreasComunes>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasDictamenesAreasComunes>();
            var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var bpEstatusAgenda = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            m.SCV.Interfaces.IReporteAreasComunesDictamen model = null;
            m.SCV.Interfaces.IReporteAreasComunesDictamen retValue = null; // IOrdenTrabajoRUBA

            try
            {
                switch (agendaEstatus)
                {
                    case "ACT":
                        model = await daoOT.GetById(idDictamen);
                        model.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        model.IdAgenda = (int)agenda.ID;
                        model.IdModificadoPor = base.getUserId();
                        model.Modificado = DateTime.UtcNow;
                        model.Changed("IdAgenda", true);
                        model.Changed("IdModificadoPor", true);
                        model.Changed("Modificado", true);
                        retValue = await daoOT.SaveEntity(model);
                        break;
                    case "REP":

                        var currentEstatus = Get<m.Kontrol.Interfaces.IItemGeneral>();
                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "REP");

                        model = await daoOT.GetById(idDictamen);
                        agenda.Estado = model.AgendaDetalle.ID == null || model.AgendaDetalle.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        agenda.IdEstatusAgenda = (int)currentEstatus.ID;
                        agenda.IdModificadoPor = base.getUserId();
                        agenda.Modificado = DateTime.UtcNow;
                        agenda.Changed("IdEstatusAgenda", true);
                        agenda.Changed("IdModificadoPor", true);
                        agenda.Changed("Modificado", true);
                        agenda.Changed("IdMotivo", true);
                        agenda.Changed("Observaciones", true);

                        await daoAgenda.SaveEntity(agenda, false);
                        var referencia = await daoAgenda.GetById((int)agenda.ID);

                        // Nueva agenda de la reprogramacion
                        var estatusAgenda = await bpCGV.Get("AgendaEstatus", "ACT");
                        var estatus = await bpCGV.Get("ESTATUS", "A");

                        var newAgenda = Get<m.SCV.Interfaces.IAgendaDictamen>();
                        //retValue = await daoAgenda.Save(newAgenda);
                        int idAgenda = retValue.ID ?? 0;

                        var newDetalle = Get<m.SCV.Interfaces.IAgendaDictamenDetalle>();
                        newDetalle.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        newDetalle.IdAgenda = idAgenda;
                        newDetalle.ID = null;
                        newDetalle.IdEstatusAgenda = (int)estatusAgenda.ID;
                        newDetalle.IdEstatus = model.IdEstatus;
                        newDetalle.IdCreadoPor = base.getUserId();
                        newDetalle.IdModificadoPor = base.getUserId();
                        newDetalle.IdExpediente = (int)idDictamen;
                        newDetalle.Reserva = false;
                        newDetalle.IdUsuarioAsignado = model.ResponsableDictamen.ID;

                        /*var newAgenda = Get<m.SCV.Interfaces.IAgendaContratista>();
                        newAgenda.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        newAgenda.FechaInicio = agenda.FechaInicio;
                        newAgenda.FechaFin = agenda.FechaFin;
                        newAgenda.IdTipoAgenda = (int)agenda.TipoAgenda.ID;
                        newAgenda.TipoAgenda = agenda.TipoAgenda;
                        newAgenda.IdLocalidad = referencia.IdLocalidad;
                        newAgenda.Localidad = referencia.Localidad;
                        newAgenda.Geolocalizacion = referencia.Geolocalizacion;

                        retValue = await this.SaveAgendaContratista(newAgenda);*/

                        break;
                    case "ATE":
                        break;
                    case "CAN":
                        break;
                }
                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion


        public async void NotificacionCAT(m.SCV.Interfaces.IAgendaContratista item, m.SCV.Interfaces.IAgendaContratistaDetalle c)
        {
            var bpREP = Get<p.SCV.Interfaces.IReportesFallas>();

            try
            {
                //NOTIFICACIÓN AL CAT
                var parametrosPlaza = new Dictionary<string, object>();
                var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                List<string> elementosEmails = new List<string>();
                List<m.Kontrol.Interfaces.IUsuario> correosNiveles = null;
                var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();

                parametrosPlaza.Add("IdPlaza", item.IdPlaza);
                parametrosPlaza.Add("IdNivel", 134);
                correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);

                foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }

                //elementosEmails.Add("efrain.tamay@ruba.com.mx");
                //elementosEmails.Add("fvillegas@enkontrol.com");
                //elementosEmails.Add("jcenteno@enkontrol.com");
                var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                var moneda = await bpMON.GetByClave("MXN");
                string[] to = elementosEmails.ToArray();

                var documento = await bpREP.GetDocumentOT((int)c.IdOrdenTrabajo);
                var tituloAdicionalPlantilla = "";
                EK.Drivers.Common.IKontrolFiles[] documentos = { documento };
                if (c.IdFolio == 0)
                {
                    c.IdFolio = c.OrdenTrabajo.IdReporte;
                    tituloAdicionalPlantilla = "Seguimiento ";
                }
                var daoUbi = Get<d.SCV.Interfaces.IUbicaciones>();
                var ubicacion = await daoUbi.GetById(c.IdUbicacion.Value);
                 
                c.Ubicacion = ubicacion;
                var plantilla = await this.GetPlantilla("NOTIFICAR-NUEVA-AGENDA-CONTRATISTA", c);
                bpClientEmail.SendMessage(to, null, $"{ tituloAdicionalPlantilla}{plantilla.Titulo}", plantilla.Plantilla_Contenido, documentos, true);
            }
            catch (FormatException)
            {
                //base.SetReturnInfo(2, "No se pudo enviar la notificación: El correo del contratista no es válido.");
            }
            catch (Exception ex)
            {
                var noRetornarError = ex.Message;
                //base.SetReturnInfo(2, "No se pudo enviar la notificación al contratista:" + ex.Message);
            }
        }
        private async Task<bool> EnviarEmailCambiocontratista(m.SCV.Interfaces.IOrdenTrabajoRUBA o, string IdPlaza)
        {
            try
            {
                var parametrosPlaza = new Dictionary<string, object>();
                var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                var daoAgenda = Get<d.SCV.Interfaces.IAgendaSPV>();
                var bpREP = Get<p.SCV.Interfaces.IReportesFallas>();
                var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
                var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
                var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBA>();
                List<string> elementosEmails = new List<string>();
                List<m.Kontrol.Interfaces.IUsuario> correosNiveles = null;
                var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
                parametrosPlaza.Add("IdPlaza", IdPlaza);
                parametrosPlaza.Add("IdNivel", 134);

                correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                //var OrdTra = await daoOT.GetById(o.ID.Value);
                //var ClaveFraccionamiento = OrdTra.;

                //parametrosPlaza.Add("IdPlaza", IdPlaza);
                //parametrosPlaza.Add("IdNivel", 134);
                //parametrosPlaza.Add("ClaveFracc", ClaveFraccionamiento);

                //correosNiveles = await daoPlaza.getCatByClaveUbicacion(parametrosPlaza);
                //if (correosNiveles.Count <= 0)
                //{
                //    correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                //}


                var parametrosOrdenTrabajo = new Dictionary<string, object>();
                parametrosOrdenTrabajo.Add("IdOT", o.ID);
                correosNiveles = await daoPlaza.getUserByOrdenTrabajoID(parametrosOrdenTrabajo);
                if (correosNiveles == null || correosNiveles.Count <= 0)
                {
                    correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                }

                //var daoUsuariosEK = Get<d.Kontrol.Interfaces.IUsuarios>();
                //var responsable = await daoUsuariosEK.GetById(o.IdCat.Value);
                //if (responsable != null)
                //{
                //    correosNiveles.Add(responsable);
                //}
                //else
                //{
                //    correosNiveles = await daoPlaza.getCatByClaveUbicacion(parametrosPlaza);
                //    if (correosNiveles.Count <= 0)
                //    {
                //        correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                //    }
                //}

                foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }
                var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                var moneda = await bpMON.GetByClave("MXN");
                var parametros = new Dictionary<string, object>();
                parametros.Add("idOrdenTrabajo", o.ID.Value);

                var partidasOT = await daoOTD.GetAll(parametros);
                List<m.SCV.Interfaces.IReporteFallaDetalle> partidasList = new List<m.SCV.Interfaces.IReporteFallaDetalle>();
                foreach (var p in partidasOT)
                {
                    var partida = await daoDET.GetById(p.IdPartida);
                    //partidasList.Add(partida);
                    partida.IdContratista = o.IdContratista;
                    partida.IdResponsable = o.IdContratista;
                    partida.Changed("IdContratista", true);
                    partida.Changed("IdResponsable", true);
                    await daoDET.SaveEntity(partida);
                }
                //o.Partidas = partidasOT;
                //var ot = await daoOT.SaveEntity(o, false, true);
                //elementosEmails.Clear();
                //elementosEmails.Add("fvillegas@enkontrol.com");
                string[] to = elementosEmails.ToArray();
                to = to.Where(x => x != "").ToArray();
                //var documento = await bpREP.GetDocumentOT(o.ID.Value);
                var documento = await this.GetDocumentOTHtmlFile((int)o.ID.Value);

                //ACTUALIZAR EL ID DE CONTRATISTA EN LAS PARTIDAS DE LA OT
                var tituloAdicionalPlantilla = "";
                EK.Drivers.Common.IKontrolFiles[] documentos = { documento };

                bool addCC = false;
                List<string> EmailsCC = new List<string>();
                var parametrosUsuariosEmailCat = new Dictionary<string, object>();
                var parametrosUsuariosEmailPlazaCC = new Dictionary<string, object>();
                parametrosUsuariosEmailCat.Add("IdParametro", 108);
                parametrosUsuariosEmailPlazaCC.Add("IdParametro", 109); //Plazas a las que se pondra copia
                var result = await this.dao.GetUsuariosEmailCat(parametrosUsuariosEmailCat);
                var plazasCC = await this.dao.GetPlazasEmailCC(parametrosUsuariosEmailPlazaCC);
                if (result != null)
                {
                    string stringPlz = "";
                    if (plazasCC != null)
                    {
                        dynamic jsonPlz = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(plazasCC));
                        if (jsonPlz is Newtonsoft.Json.Linq.JArray && jsonPlz.Count > 0)
                        {
                            var valorPlz = jsonPlz[0];
                            stringPlz = valorPlz.valor;
                            if (stringPlz == "" || stringPlz.ToLower() == "all" || stringPlz.Contains(IdPlaza))
                            {
                                addCC = true;
                            }
                        }
                            
                    }
                    dynamic objJson = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                    var valor = objJson[0];
                    string emails = valor.valor;
                    if (emails != "" && addCC)
                    {
                        string[] mailsCC = emails.Split(',');
                        foreach (var email in mailsCC)
                        {
                            EmailsCC.Add(email);
                        }
                    }

                }

                var plantillaObj = await this.GetPlantilla("NOTIFICAR-CAMBIOCONTRATISTA", o);
                bpClientEmail.SendMessage(to, EmailsCC.ToArray(),  $"{ plantillaObj.Titulo}{ tituloAdicionalPlantilla}", plantillaObj.Plantilla_Contenido, documentos, true);
                var daoUsuariosEK = Get<d.Kontrol.Interfaces.IUsuarios>();
                var currentUser = await daoUsuariosEK.GetById(base.getUserId());
                var parametrosPushNotificacion = new Dictionary<string, object>();
                parametrosPushNotificacion.Add("UserSend", currentUser.Email);
                parametrosPushNotificacion.Add("UserTo", to[0]);
                //parametrosPushNotificacion.Add("Folio", o.IdReporte);
                parametrosPushNotificacion.Add("Folio", o.ID);
                parametrosPushNotificacion.Add("FechaAgenda", o.Agenda.FechaInicio.ToString("dd/MM/yyyy"));
                parametrosPushNotificacion.Add("HoraAgenda", o.Agenda.FechaInicio.ToString("HH:mm:ss"));
                parametrosPushNotificacion.Add("Tipo", 2);
                await this.SendPushNotificationToApp(parametrosPushNotificacion);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public  MemoryStream toPDFStream(string html)
        {
            try
            {
                MemoryStream retValue = null;
                MemoryStream ms = new MemoryStream();
                float widthInPixels = 976;
                float heightInPixels = 1120;
                float dpi = 96; // Resolución en DPI
                float pointsPerInch = 72; // Puntos por pulgada

                float widthInPoints = widthInPixels * pointsPerInch / dpi;
                float heightInPoints = heightInPixels * pointsPerInch / dpi;

                SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
                converter.Options.PdfPageSize = SelectPdf.PdfPageSize.Custom;
                converter.Options.PdfPageCustomSize = new System.Drawing.SizeF(widthInPoints, heightInPoints);
                SelectPdf.PdfDocument doc = converter.ConvertHtmlString(html);
                MemoryStream mst = new MemoryStream();
                doc.Save(mst);
                doc.Close();
                mst.Position = 0;
                mst.CopyTo(ms);
                retValue = ms;
                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public EK.Drivers.Common.IKontrolFiles toDocumentAttachment(MemoryStream stream, string filename)
        {
            try
            {
                var documento = Get<EK.Drivers.Common.IKontrolFiles>();
                documento.Nombre = filename;
                documento.Extension = "pdf";
                documento.ContentType = "application/pdf";
                documento.Content = stream;
                documento.Size = stream.Length;
                return documento;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> SendEmailImageBody(string[] To, string Subject, string Body, MemoryStream imageStream)
        {
            try
            {
 
                MailMessage mail = new MailMessage();

                if (!_testNotification)
                {
                   foreach (var P in To)
                   {
                        mail.To.Add(P.ToString());
                   }
                }
                else
                {
                    mail.To.Clear();
                    mail.CC.Clear();
                    mail.To.Add(_testNotificationsEmail);
                }
                
                //List<string> EmailsCC = new List<string>();
                var usuariosCC = new Dictionary<string, object>();
                usuariosCC.Add("IdParametro", 112);
                var result = await this.dao.GetPlazasEmailCC(usuariosCC);
                if (result != null)
                {
                    dynamic objJson = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                    var valor = objJson[0];
                    string emails = valor.valor;
                    if (emails != "")
                    {
                       string[] mailsCC = emails.Split(',');
                       foreach (var email in mailsCC)
                       {
                          mail.CC.Add(email);
                       }
                    }
                }

                //mail.From = new MailAddress(CuentaRemitente, NombreRemitente, Encoding.UTF8);
                mail.From = new MailAddress(_fromEmail, _displayName, Encoding.UTF8);
                mail.Subject = Subject;
                mail.SubjectEncoding = Encoding.UTF8;
                //mail.Body = Body;
                mail.BodyEncoding = Encoding.UTF8;
                mail.IsBodyHtml = false;
                mail.Priority = MailPriority.Normal;

                //string textBody = "Este es el cuerpo del mensaje de correo.\nAquí va la imagen:";
                AlternateView plainTextView = AlternateView.CreateAlternateViewFromString(Body, null, MediaTypeNames.Text.Plain);
                string htmlBody = Body + "<br/><img src='cid:MyImage'/>";
                AlternateView htmlView = AlternateView.CreateAlternateViewFromString(htmlBody, null, MediaTypeNames.Text.Html);

                LinkedResource linkedImage = new LinkedResource(imageStream, MediaTypeNames.Image.Jpeg)
                {
                    ContentId = "MyImage"
                };
                htmlView.LinkedResources.Add(linkedImage);

                mail.AlternateViews.Add(plainTextView);
                mail.AlternateViews.Add(htmlView);

                SmtpClient client = new SmtpClient();
                client.Credentials = new System.Net.NetworkCredential(_userName, _password);
                client.Port = Convert.ToInt32(_port); 
                client.Host = _servidor;
                client.EnableSsl = _enableSSL;

                client.Send(mail);
                //var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                //EK.Drivers.Common.IKontrolFiles[] documentos = new List<Drivers.Common.IKontrolFiles>().ToArray();
                //bpClientEmail.SendMessage(mail.To, mail.CC, Subject, mail, documentos, true);

                return "1";
            }
            catch (Exception ex)
            {
                var par = new Dictionary<string, object>();
                par.Add("mensaje", ex.Message);
                await this.dao.addTrackAgenda(par);
                // var paramError = new Dictionary<string, object>();
                // paramError.Add("action", "INSERT_LOG");
                // paramError.Add("Err_Msg", error);
                // var resul = await Get($"/ekcmensajes/LogErrors")
                ////.Add("parametros", paramData)
                //.Add("parametros", paramError)
                //.ExecuteAsync();
                return ex.Message;
            }
        }

        public async Task<string> EnviarCorreoFirmaCliente(int IdCliente)
        {
            try
            {
                //BeginTransaction();
                Dictionary<string, object> parametros = new Dictionary<string, object>();
                var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
                var daoUbicacion = Get<d.SCV.Interfaces.IUbicaciones>();
                var cliente = await daoCliente.GetById(IdCliente);
                var ubicacion = await daoUbicacion.GetById((int)cliente.IdUbicacion);
                if (ubicacion != null)
                {
                    if (ubicacion.Segmento != null)
                    {
                        Drivers.Emailing.Plantilla plantillaDocumento;
                        if (ubicacion.Segmento.Nombre == "Residencial")
                        {
                            plantillaDocumento = await this.GetPlantilla("IMG-CTE-FIRMA-RES", null);
                        }
                        else
                        {
                            plantillaDocumento = await this.GetPlantilla("IMG-CTE-FIRMA-VIS", null);
                        }
                        //var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                        plantillaDocumento.Contenido.Position = 0;
                        string imageString = "";
                        string htmlbody = "";
                        using (StreamReader reader = new StreamReader(plantillaDocumento.Contenido, Encoding.UTF8))
                        {
                            imageString = reader.ReadToEnd();
                        }

                        imageString = imageString.Replace("@@NombreClienteCompleto@@", cliente.NombreCte.Trim());

                        HtmlToImage converter = new HtmlToImage();
                        MemoryStream imageStream = new MemoryStream();
                        converter.ConvertHtmlString(imageString).Save(imageStream, System.Drawing.Imaging.ImageFormat.Png);
                        imageStream.Position = 0;
                        string[] to = { cliente.CorreoElectronico };
                        string sended = "0";
                        if (cliente.CorreoElectronico != null)
                        {
                            sended = await SendEmailImageBody(to, plantillaDocumento.Titulo, htmlbody, imageStream);
                        }
                        //Commit();
                        return sended;
                    }
                    else
                    {
                        //Rollback();
                        return "Segmento no valido";
                    }

                }
                else
                {
                    //Rollback();
                    return "Ubicacion no valida";
                }
                
            }
            catch (Exception ex)
            {
                //Rollback();
                return ex.InnerException.Message;
            }

        }

        public async Task<string> EnviarCorreoEntregaCliente(int IdCliente)
        {
            try
            {
                Dictionary<string, object> parametros = new Dictionary<string, object>();
                var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
                var daoUbicacion = Get<d.SCV.Interfaces.IUbicaciones>();
                var cliente = await daoCliente.GetById(IdCliente);
                var ubicacion = await daoUbicacion.GetById((int)cliente.IdUbicacion);
                if (ubicacion != null)
                {
                    if (ubicacion.Segmento != null)
                    {
                        Drivers.Emailing.Plantilla plantillaDocumento;
                        string plantillaClave = ubicacion.Segmento.Nombre == "Residencial" ? "IMG-CTE-ENTREGA-RES" : "IMG-CTE-ENTREGA-VIS";
                        //if (ubicacion.Segmento.Nombre == "Residencial")
                        //{
                        //    plantillaDocumento = await this.GetPlantilla("IMG-CTE-ENTREGA-RES", null);
                        //}
                        //else
                        //{
                        //    plantillaDocumento = await this.GetPlantilla("IMG-CTE-ENTREGA-VIS", null);
                        //}
                        plantillaDocumento = await this.GetPlantilla(plantillaClave, null);
                        var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                        plantillaDocumento.Contenido.Position = 0;
                        string imageString = "";
                        string htmlbody = "";
                        string sended = "0";
                        if (plantillaDocumento != null )
                        {
                            if(plantillaDocumento.Contenido != null)
                            {
                                using (StreamReader reader = new StreamReader(plantillaDocumento.Contenido, Encoding.UTF8))
                                { 
                                    imageString = reader.ReadToEnd();
                                }
                                sended = plantillaDocumento.Titulo;
                                imageString = imageString.Replace("@@NombreClienteCompleto@@", cliente.NombreCte.Trim());
                                imageString = imageString.Replace("@@TelefonoPlaza@@", ubicacion.TelefonoPlaza.Trim());
                                HtmlToImage converter = new HtmlToImage();
                                MemoryStream imageStream = new MemoryStream();
                                converter.ConvertHtmlString(imageString).Save(imageStream, System.Drawing.Imaging.ImageFormat.Png);
                                imageStream.Position = 0;
                                string[] to = { cliente.CorreoElectronico };

                                if (cliente.CorreoElectronico != null)
                                {
                                    sended = await SendEmailImageBody(to, plantillaDocumento.Titulo, htmlbody, imageStream);
                                }
                            }
                           else
                            {
                                sended = "Error al obtener la plantilla "+ plantillaClave;
                            }

                        }

                        return sended;
                    }
                    else
                    {
                        return "Segmento no valido";
                    }

                }
                else
                {
                    return "Ubicacion no valida";
                }
            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }
        }

        public async Task<string> EnviarCorreoEquipamientoUbicacion(int IdCliente)
        {
            try
            {
                Dictionary<string, object> parametros = new Dictionary<string, object>();
                var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
                var daoUbicacion = Get<d.SCV.Interfaces.IUbicaciones>();
                var cliente = await daoCliente.GetById(IdCliente);
                var ubicacion = await daoUbicacion.GetById((int)cliente.IdUbicacion);
                if (ubicacion != null)
                {
                    if (ubicacion.Segmento != null)
                    {
                        Drivers.Emailing.Plantilla plantillaDocumento;
                        string plantillaClave = "MAIL-EQUIPAMIENTO-UBICACION";
                        //if (ubicacion.Segmento.Nombre == "Residencial")
                        //{
                        //    plantillaDocumento = await this.GetPlantilla("IMG-CTE-ENTREGA-RES", null);
                        //}
                        //else
                        //{
                        //    plantillaDocumento = await this.GetPlantilla("IMG-CTE-ENTREGA-VIS", null);
                        //}
                        plantillaDocumento = await this.GetPlantilla(plantillaClave, null);
                        var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                        plantillaDocumento.Contenido.Position = 0;
                        string imageString = "";
                        string htmlbody = "";
                        string sended = "0";
                        if (plantillaDocumento != null)
                        {
                            if (plantillaDocumento.Contenido != null)
                            {
                                using (StreamReader reader = new StreamReader(plantillaDocumento.Contenido, Encoding.UTF8))
                                {
                                    imageString = reader.ReadToEnd();
                                }
                                sended = plantillaDocumento.Titulo;
                                imageString = imageString.Replace("@@NombreClienteCompleto@@", cliente.NombreCte.Trim());
                                imageString = imageString.Replace("@@TelefonoPlaza@@", ubicacion.TelefonoPlaza.Trim());
                                HtmlToImage converter = new HtmlToImage();
                                MemoryStream imageStream = new MemoryStream();
                                converter.ConvertHtmlString(imageString).Save(imageStream, System.Drawing.Imaging.ImageFormat.Png);
                                imageStream.Position = 0;
                                string[] to = { cliente.CorreoElectronico };

                                if (cliente.CorreoElectronico != null)
                                {
                                    sended = await SendEmailImageBody(to, plantillaDocumento.Titulo, htmlbody, imageStream);
                                }
                            }
                            else
                            {
                                sended = "Error al obtener la plantilla " + plantillaClave;
                            }

                        }

                        return sended;
                    }
                    else
                    {
                        return "Segmento no valido";
                    }

                }
                else
                {
                    return "Ubicacion no valida";
                }
            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }
        }

        private async Task<bool> EnviarEmailCambiocontratistaAreasComunes(m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes o, string IdPlaza)
        {
            try
            {
                var parametrosPlaza = new Dictionary<string, object>();
                var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                var daoAgenda = Get<d.SCV.Interfaces.IAgendaSPV>();
                var bpREP = Get<p.SCV.Interfaces.IReporteFallasAreasComunes>();
                var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
                var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes>();
                var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBAAreasComunes>();
                List<string> elementosEmails = new List<string>();
                List<m.Kontrol.Interfaces.IUsuario> correosNiveles = null;
                var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
                parametrosPlaza.Add("IdPlaza", IdPlaza);
                parametrosPlaza.Add("IdNivel", 134);

                //var parametrosOrdenTrabajo = new Dictionary<string, object>();
                //parametrosOrdenTrabajo.Add("IdOT", o.ID);
                //parametrosOrdenTrabajo.Add("AC", 1);
                //correosNiveles = await daoPlaza.getUserByOrdenTrabajoID(parametrosOrdenTrabajo);
                //if (correosNiveles == null || correosNiveles.Count <= 0)
                //{
                    correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                //}

              

                foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }
                var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                var moneda = await bpMON.GetByClave("MXN");
                var parametros = new Dictionary<string, object>();
                parametros.Add("idOrdenTrabajo", o.ID.Value);

                var partidasOT = await daoOTD.GetAll(parametros);
                List<m.SCV.Interfaces.IReporteFallaDetalle> partidasList = new List<m.SCV.Interfaces.IReporteFallaDetalle>();
                foreach (var p in partidasOT)
                {
                    var partida = await daoDET.GetById(p.IdPartida);
                    //partidasList.Add(partida);
                    partida.IdContratista = o.IdContratista;
                    partida.IdResponsable = o.IdContratista;
                    partida.Changed("IdContratista", true);
                    partida.Changed("IdResponsable", true);
                    await daoDET.SaveEntity(partida);
                }
                //o.Partidas = partidasOT;
                //var ot = await daoOT.SaveEntity(o, false, true);
                //elementosEmails.Clear();
                //elementosEmails.Add("fvillegas@enkontrol.com");
                string[] to = elementosEmails.ToArray();
                to = to.Where(x => x != "").ToArray();
                //var documento = await bpREP.GetDocumentOT(o.ID.Value);
               // var documento = await this.GetDocumentOTHtmlFile((int)o.ID.Value);
                var documento = await bpREP.GetDocumentOT((int)o.ID.Value);
                //ACTUALIZAR EL ID DE CONTRATISTA EN LAS PARTIDAS DE LA OT
                var tituloAdicionalPlantilla = "";
                EK.Drivers.Common.IKontrolFiles[] documentos = { documento };

                bool addCC = false;
                List<string> EmailsCC = new List<string>();
                var parametrosUsuariosEmailCat = new Dictionary<string, object>();
                var parametrosUsuariosEmailPlazaCC = new Dictionary<string, object>();
                parametrosUsuariosEmailCat.Add("IdParametro", 108);
                parametrosUsuariosEmailPlazaCC.Add("IdParametro", 109); //Plazas a las que se pondra copia
                var result = await this.dao.GetUsuariosEmailCat(parametrosUsuariosEmailCat);
                var plazasCC = await this.dao.GetPlazasEmailCC(parametrosUsuariosEmailPlazaCC);
                if (result != null)
                {
                    string stringPlz = "";
                    if (plazasCC != null)
                    {
                        dynamic jsonPlz = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(plazasCC));
                        if (jsonPlz is Newtonsoft.Json.Linq.JArray && jsonPlz.Count > 0)
                        {
                            var valorPlz = jsonPlz[0];
                            stringPlz = valorPlz.valor;
                            if (stringPlz == "" || stringPlz.ToLower() == "all" || stringPlz.Contains(IdPlaza))
                            {
                                addCC = true;
                            }
                        }
                            
                    }
                    dynamic objJson = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                    var valor = objJson[0];
                    string emails = valor.valor;
                    if (emails != "" && addCC)
                    {
                        string[] mailsCC = emails.Split(',');
                        foreach (var email in mailsCC)
                        {
                            EmailsCC.Add(email);
                        }
                    }

                }

                var plantillaObj = await this.GetPlantilla("NOTIFICAR-CAMBIOCONTRATISTA", o);
                bpClientEmail.SendMessage(to, EmailsCC.ToArray(), $"{ plantillaObj.Titulo}{ tituloAdicionalPlantilla}", plantillaObj.Plantilla_Contenido, documentos, true);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }
        // CAMBIAR CONTRATISTA
        public async Task<m.SCV.Interfaces.IAgendaContratista> SaveAgendaChangeContratista(m.SCV.Interfaces.IAgendaContratistaDetalle item)
        {
            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBA>();
            var daoAEV = Get<EK.Datos.Kontrol.Interfaces.IAgendaEntVivienda>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistas>();

            int newIdContratista = item.OrdenTrabajo.IdContratista;
            m.SCV.Interfaces.IAgendaContratista retValue = null;
            try
            {
                BeginTransaction(true);
                string IdPlaza = item.Ubicacion.IdPlaza;
                // Se cambia el contratista en la orden de trabajo
                var parametros = new Dictionary<string, object>();
                parametros.Add("idOrdenTrabajo", item.IdOrdenTrabajo);
                
                var recordOT = await daoOT.GetById(item.IdOrdenTrabajo.Value);
                if (recordOT != null)
                {
                    recordOT.IdContratista = newIdContratista;
                    recordOT.IdModificadoPor = base.getUserId();
                    recordOT.Modificado = DateTime.UtcNow;
                    recordOT.Changed("IdContratista", true);
                    recordOT.Changed("IdModificadoPor", true);
                    recordOT.Changed("Modificado", true);
                    await daoOT.SaveEntity(recordOT);
                    recordOT.IdEstatus = 13;
                    await this.EnviarEmailCambiocontratista(recordOT, IdPlaza);
                }

                // Se cambia el contratista de cada una de las partidas asignadas a la orden de trabajo
                parametros = new Dictionary<string, object>();
                parametros.Add("idOrdenTrabajo", item.IdOrdenTrabajo);

                var partidasOT = await daoOTD.GetAll(parametros);
                if (partidasOT != null && partidasOT.Count > 0)
                {
                    foreach (var pot in partidasOT)
                    {
                        var partida = await daoDET.GetById(pot.IdPartida);
                        partida.IdContratista = newIdContratista;
                        partida.IdResponsable = newIdContratista;
                        partida.IdModificadoPor = base.getUserId();
                        partida.Modificado = DateTime.UtcNow;
                        partida.Changed("IdContratista", true);
                        partida.Changed("IdResponsable", true);
                        partida.Changed("IdModificadoPor", true);
                        partida.Changed("Modificado", true);
                        await daoDET.SaveEntity(partida);
                    }
                }

                // Se actualiza cada una de las agendas
                parametros = new Dictionary<string, object>();
                parametros.Add("idOrdenTrabajo", item.IdOrdenTrabajo);

                var agendaOT = await daoAEV.GetById(item.IdAgenda.Value);
                if (agendaOT != null)
                {
                    agendaOT.IdUsuarioAsignado = newIdContratista;
                    agendaOT.IdModificadoPor = base.getUserId();
                    agendaOT.Modificado = DateTime.UtcNow;
                    agendaOT.Changed("IdUsuarioAsignado", true);
                    agendaOT.Changed("IdModificadoPor", true);
                    agendaOT.Changed("Modificado", true);
                    await daoAEV.SaveEntity(agendaOT);
                }

                Commit();

                retValue = await daoAgenda.GetById(agendaOT.IdAgenda.Value);
                retValue.Estado = m.Kontrol.KontrolEstadosEnum.Exitoso;
                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        // GUARDAR AGENDA DICTAMEN
        public async Task<m.SCV.Interfaces.IAgendaDictamen> SaveAgendaDictamen(m.SCV.Interfaces.IAgendaDictamen item)
        {
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasDictamenes>();
            var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpREP = Get<p.SCV.Interfaces.IReportesFallas>();
            m.SCV.Interfaces.IAgendaDictamen retValue = null;

            try
            {
                int idAsignado = -1;
                int idExpediente = -1;

                foreach (var det in item.Dictamenes)
                {
                    idAsignado = (int)det.Dictamen.ResponsableDictamen.ID;
                    idExpediente = (int)det.Dictamen.ID;
                }

                var estatusAgenda = await bpCGV.Get("AgendaEstatus", "ACT");
                var estatus = await bpCGV.Get("ESTATUS", "A");

                item.IdEstatus = estatus.ID;
                item.Estado = item.ID == null || item.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                if (item != null)
                {
                    item.Modificado = DateTime.UtcNow;
                    item.IdModificadoPor = base.getUserId();
                }

                if (item.Dictamenes[0].IdAgenda > 0)
                {
                    var agendaDetalle = daoAgenda.GetById(item.Dictamenes[0].IdAgenda.Value);
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    item.ID = agendaDetalle.Result.ID;
                    item.Version = agendaDetalle.Result.Version;
                }

                if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    item.Creado = DateTime.UtcNow;
                    item.IdCreadoPor = base.getUserId();
                }
                item.id_identificador_cc = item.IdPlaza;
                item.mesInicio = item.FechaInicio.Month;
                item.anioInicio = item.FechaInicio.Year;
                item.IdExpediente = idExpediente;
                item.IdEstatusAgenda = estatusAgenda.ID.Value;
                item.IdEstatus = estatus.ID.Value;
                item.IdUsuarioAsignado = idAsignado;
                BeginTransaction(true);

                var valido = await daoAgenda.VerificarFechasAgendaDictamen(item);
                if(valido != 1)
                {
                    //dfsdf
                    base.SetReturnInfo(2, "No se pudo guardar, El usuario no tiene disponibilidad en el rango de Fecha seleccionado.");
                    return null;
                }

                retValue = await daoAgenda.Save(item);
                int idAgenda = retValue.ID ?? 0;

                if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    foreach (var c in item.Dictamenes)
                    {
                        //c.Estado = item.Estado;
                        c.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        //c.ID = (c.ID != null) ? c.ID : null;
                        c.ID = null;
                        c.IdAgenda = idAgenda;
                        c.IdEstatusAgenda = (int)estatusAgenda.ID;
                        c.IdEstatus = item.IdEstatus;
                        c.IdCreadoPor = base.getUserId();
                        c.IdModificadoPor = base.getUserId();
                        c.IdExpediente = (int)c.Dictamen.ID;
                        c.Reserva = false;
                        c.IdUsuarioAsignado = c.Dictamen.ResponsableDictamen.ID;

                       // var model = await daoAgendaDetalle.SaveEntity(c, false);
                        //if (model != null)
                        //{
                            //c.ID = model.ID;
                       // }
                        m.SCV.Interfaces.IReporteDictamen dictamenUpdate = await this.UpdatePlanificacionDictamen((int)c.Dictamen.ID, retValue, null, "ACT");

                        try
                        {

                            //NOTIFICACIÓN AL CAT
                            var parametrosPlaza = new Dictionary<string, object>();
                            var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                            List<string> elementosEmails = new List<string>();
                            List<m.Kontrol.Interfaces.IUsuario> correosNiveles = new List<m.Kontrol.Interfaces.IUsuario>(); ;
                            List<m.Kontrol.Interfaces.IUsuario> correosCatByFracc = null;
                            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
                            var pm = await GetGlobalParameters("INSTALACION");
                            string linkTarea = $"{pm.Value<string>("SitioWeb")}{"/scv/pv/reportesFallas/"}{dictamenUpdate.IdReporte}";
                            var parametros = new Dictionary<string, object>()
                        {
                            { "Link", linkTarea
                            }
                        };
                            //            
                            int idCliente = dictamenUpdate.IdCliente;
                            var agenda = retValue;
                            var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
                            var daoUbicacion = Get<d.SCV.Interfaces.IUbicaciones>();
                            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
                            var daoRF = Get<d.SCV.Interfaces.IReportesFallas>();
                            var cliente = await daoCliente.GetById(idCliente);
                            var ubicacion = await daoUbicacion.GetById((int)cliente.IdUbicacion);
                            var parametrosFolioDetalle = new Dictionary<string, object>();
                            parametrosFolioDetalle.Add("idReporte", c.Dictamen.IdReporte);
                            //parametrosFolioDetalle.Add("ID", model.Dictamen.Partida.ID.Value);
                            var partidas = await daoDET.GetAll(parametrosFolioDetalle);

                            var parametrosFolio = new Dictionary<string, object>();
                            parametrosFolio.Add("ID", c.Dictamen.IdReporte);
                            var reporteFalla = await daoRF.GetById(c.Dictamen.IdReporte);

                            List<dynamic> listOfDiagnosticos = new List<dynamic>();
                            List<dynamic> listOfCitas = new List<dynamic>();
                            List<dynamic> listOfPartidas = new List<dynamic>();
                            listOfDiagnosticos.Add(c.Dictamen);
                            listOfCitas.Add(agenda);
                            listOfPartidas.Add(partidas);

                            dynamic expando = new ExpandoObject();
                            expando.Agenda = agenda;
                            expando.Citas = listOfCitas;
                            expando.Cliente = cliente;
                            expando.Ubicacion = ubicacion;
                            expando.Dictamenes = listOfDiagnosticos;
                            expando.Responsable = c.Dictamen.ResponsableDictamen;
                            expando.Partidas = partidas;
                            expando.Folio = reporteFalla;
                            expando.IdDictamen = c.Dictamen.ID;

                            parametrosPlaza.Add("IdPlaza", dictamenUpdate.IdPlaza);
                            parametrosPlaza.Add("IdNivel", 134);
                            parametrosPlaza.Add("ClaveFracc", ubicacion.DesarrolloClave);
                            var daoUsuariosEK = Get<d.Kontrol.Interfaces.IUsuarios>();
                            var responsable = await daoUsuariosEK.GetById(c.Dictamen.IdResponsableDictamen.Value);
                            correosNiveles.Add(responsable);
                            foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }
                           
                            bool addCC = false;
                            List<string> EmailsCC = new List<string>();
                            var parametrosUsuariosEmailCat = new Dictionary<string, object>();
                            var parametrosUsuariosEmailPlazaCC = new Dictionary<string, object>();
                            parametrosUsuariosEmailCat.Add("IdParametro", 108);
                            parametrosUsuariosEmailPlazaCC.Add("IdParametro", 109); //Plazas a las que se pondra copia
                            var result = await this.dao.GetUsuariosEmailCat(parametrosUsuariosEmailCat);
                            var plazasCC = await this.dao.GetPlazasEmailCC(parametrosUsuariosEmailPlazaCC);
                            if (result != null )
                            {
                                string stringPlz = "";
                                if (plazasCC != null)
                                {
                                    dynamic jsonPlz = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(plazasCC));
                                    if (jsonPlz is Newtonsoft.Json.Linq.JArray && jsonPlz.Count > 0)
                                    {
                                        var valorPlz = jsonPlz[0];
                                        stringPlz = valorPlz.valor;
                                        if (stringPlz == "" || stringPlz.ToLower() == "all" || stringPlz.Contains(reporteFalla.IdPlaza))
                                        {
                                            addCC = true;
                                        }
                                    }
                                    
                                }
                                dynamic objJson = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                                var valor = objJson[0];
                                string emails = valor.valor;
                                if (emails != "" && addCC)
                                {
                                    string[] mailsCC = emails.Split(',');
                                    foreach (var email in mailsCC)
                                    {
                                        EmailsCC.Add(email);
                                    }
                                }

                            }

                            //notificacion supervisor asignado
                            object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                            // ENVIAR NOTIFICACION WEB AL CAT
                            //==================================================================================
                            await SendNotificationNewKalendar(correosNiveles, "NOTIFICAR-DIAGNOSTICO", linkTarea, obj, parametros);

                            // correos al CAT
                            ///////////////////////////////////////////////////
                            var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                            var documento = Get<EK.Drivers.Common.IKontrolFiles>();
                            var plantillaObj = await this.GetPlantilla("NOTIFICAR-DIAGNOSTICO", obj);

                            // ENVIAR CORREO DIAGNOSTICO
                            var doc = await this.GetEncodedDocumentDiagnosticoStream(c.Dictamen.ID.Value, reporteFalla);
                            documento.Nombre = $"DIAGNÓSTICO FOLIO {reporteFalla.ID.Value} NUM {c.Dictamen.ID.Value} - {ubicacion.Desarrollo.Nombre}.pdf";
                            documento.Extension = "pdf";
                            documento.ContentType = "application/pdf";
                            documento.Content = doc;
                            documento.Size = doc.Length;
                            EK.Drivers.Common.IKontrolFiles[] documentos = { documento };
                            try
                            {
                                bpClientEmail.SendMessage(elementosEmails.ToArray(), EmailsCC.ToArray(), plantillaObj.Titulo, plantillaObj.Plantilla_Contenido, documentos, true);
                            }
                            catch (Exception ex)
                            {

                            }

                            var currentUser = await daoUsuariosEK.GetById(base.getUserId());

                            var parametrosPushNotificacion = new Dictionary<string, object>();
                            parametrosPushNotificacion.Add("UserSend", currentUser.Email);
                            parametrosPushNotificacion.Add("UserTo", responsable.Email);
                            parametrosPushNotificacion.Add("Folio", c.Dictamen.ID);
                            //parametrosPushNotificacion.Add("Folio", reporteFalla.ID);
                            parametrosPushNotificacion.Add("FechaAgenda", agenda.FechaInicio.ToString("dd/MM/yyyy"));
                            parametrosPushNotificacion.Add("HoraAgenda", agenda.FechaInicio.ToString("HH:mm:ss"));
                            parametrosPushNotificacion.Add("Tipo", 1);
                            await this.SendPushNotificationToApp(parametrosPushNotificacion);
                        }
                        catch (FormatException ex)
                        {
                            //base.SetReturnInfo(2, "No se pudo enviar la notificación, El correo no es válido.");
                        }
                        catch (Exception ex)
                        {
                            ////base.SetReturnInfo(2, "No se pudo enviar la notificación:" + ex.Message);
                        }

                    }
                }
                else
                {
                    foreach (var c in item.Dictamenes)
                    {
                        try
                        {
                            //NOTIFICACIÓN AL CAT
                            var parametrosPlaza = new Dictionary<string, object>();
                            var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                            List<string> elementosEmails = new List<string>();
                            List<m.Kontrol.Interfaces.IUsuario> correosNiveles = new List<m.Kontrol.Interfaces.IUsuario>();
                            //List<m.Kontrol.Interfaces.IUsuario> correosNiveles = null;
                            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
                            var pm = await GetGlobalParameters("INSTALACION");
                            string linkTarea = $"{pm.Value<string>("SitioWeb")}{"/scv/pv/reportesFallas/"}{c.Dictamen.IdReporte}";
                            var parametros = new Dictionary<string, object>()
                            {
                                { "Link", linkTarea
                                }
                            };
                            //            
                            int idCliente = c.IdCliente.Value;
                            var agenda = retValue;
                            var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
                            var daoUbicacion = Get<d.SCV.Interfaces.IUbicaciones>();
                            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
                            var daoRF = Get<d.SCV.Interfaces.IReportesFallas>();
                            var cliente = await daoCliente.GetById(idCliente);
                            var ubicacion = await daoUbicacion.GetById((int)cliente.IdUbicacion);
                            var parametrosFolioDetalle = new Dictionary<string, object>();
                            parametrosFolioDetalle.Add("idReporte", c.Dictamen.IdReporte);
                            //parametrosFolioDetalle.Add("ID", model.Dictamen.Partida.ID.Value);
                            var partidas = await daoDET.GetAll(parametrosFolioDetalle);

                            var parametrosFolio = new Dictionary<string, object>();
                            parametrosFolio.Add("ID", c.Dictamen.IdReporte);
                            var reporteFalla = await daoRF.GetById(c.Dictamen.IdReporte);

                            List<dynamic> listOfDiagnosticos = new List<dynamic>();
                            List<dynamic> listOfCitas = new List<dynamic>();
                            List<dynamic> listOfPartidas = new List<dynamic>();
                            listOfDiagnosticos.Add(c.Dictamen);
                            listOfCitas.Add(agenda);
                            listOfPartidas.Add(partidas);

                            dynamic expando = new ExpandoObject();
                            expando.Agenda = agenda;
                            expando.Citas = listOfCitas;
                            expando.Cliente = cliente;
                            expando.Ubicacion = ubicacion;
                            expando.Dictamenes = listOfDiagnosticos;
                            expando.Responsable = c.Dictamen.ResponsableDictamen;
                            expando.Partidas = partidas;
                            expando.Folio = reporteFalla;
                            expando.IdDictamen = c.Dictamen.ID;


                            parametrosPlaza.Add("IdPlaza", item.IdPlaza);
                            parametrosPlaza.Add("IdNivel", 134);
                            parametrosPlaza.Add("ClaveFracc", ubicacion.DesarrolloClave);
                            var daoUsuariosEK = Get<d.Kontrol.Interfaces.IUsuarios>();
                            var responsable = await daoUsuariosEK.GetById(c.Dictamen.IdResponsableDictamen.Value);
                            correosNiveles.Add(responsable);
                            foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }

                            bool addCC = false;
                            List<string> EmailsCC = new List<string>();
                            var parametrosUsuariosEmailCat = new Dictionary<string, object>();
                            var parametrosUsuariosEmailPlazaCC = new Dictionary<string, object>();
                            parametrosUsuariosEmailCat.Add("IdParametro", 108);
                            parametrosUsuariosEmailPlazaCC.Add("IdParametro", 109); //Plazas a las que se pondra copia
                            var result = await this.dao.GetUsuariosEmailCat(parametrosUsuariosEmailCat);
                            var plazasCC = await this.dao.GetPlazasEmailCC(parametrosUsuariosEmailPlazaCC);
                            if (result != null)
                            {
                                string stringPlz = "";
                                if (plazasCC != null)
                                {
                                    dynamic jsonPlz = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(plazasCC));
                                    if (jsonPlz is Newtonsoft.Json.Linq.JArray && jsonPlz.Count > 0)
                                    {
                                        var valorPlz = jsonPlz[0];
                                        stringPlz = valorPlz.valor;
                                        if (stringPlz == "" || stringPlz.ToLower() == "all" || stringPlz.Contains(reporteFalla.IdPlaza))
                                        {
                                            addCC = true;
                                        }
                                    }
                                        
                                }
                                dynamic objJson = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                                var valor = objJson[0];
                                string emails = valor.valor;
                                if (emails != "" && addCC)
                                {
                                    string[] mailsCC = emails.Split(',');
                                    foreach (var email in mailsCC)
                                    {
                                        EmailsCC.Add(email);
                                    }
                                }

                            }
                            //elementosEmails.Add("fvillegas@enkontrol.com");
                            //notificacion supervisor asignado
                            object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));

                            // ENVIAR NOTIFICACION WEB AL CAT
                            //==================================================================================
                            await SendNotificationNewKalendar(correosNiveles, "NOTIFICAR-DIAGNOSTICO", linkTarea, obj, parametros);

                            // ENVIAR CORREO AL CAT
                            //==================================================================================
                            var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                            //var documento = await bpREP.GetDocumentDiagnostico((int)c.Dictamen.ID);
                            var documento = Get<EK.Drivers.Common.IKontrolFiles>();
                            //EK.Drivers.Common.IKontrolFiles[] documentos = { documento };
                            var plantillaObj = await this.GetPlantilla("NOTIFICAR-DIAGNOSTICO", obj);
                            //var dao = Get<d.SCV.Interfaces.IReportesFallas>();
                            //ReportesFallas r = new ReportesFallas(this.factory, dao);

                            var doc = await this.GetEncodedDocumentDiagnosticoStream(c.Dictamen.ID.Value, reporteFalla);
                            documento.Nombre = $"DIAGNÓSTICO FOLIO {reporteFalla.ID.Value} NUM {c.Dictamen.ID.Value} - {ubicacion.Desarrollo.Nombre}.pdf";
                            documento.Extension = "pdf";
                            documento.ContentType = "application/pdf";
                            documento.Content = doc;
                            documento.Size = doc.Length;
                            EK.Drivers.Common.IKontrolFiles[] documentos = { documento };
                            //var doc = await r.GetEncodedDocumentDiagnosticoStream(c.Dictamen.ID.Value);

                            //bpClientEmail.SendMessage(elementosEmails.ToArray(), EmailsCC.ToArray(), "TESTING[70s]-"+ plantillaObj.Titulo, plantillaObj.Plantilla_Contenido, documentos, true);
                            try
                            {
                                bpClientEmail.SendMessage(elementosEmails.ToArray(), EmailsCC.ToArray(), plantillaObj.Titulo, plantillaObj.Plantilla_Contenido, documentos, true);
                            }
                            catch (Exception ex) { }
                            var currentUser = await daoUsuariosEK.GetById(base.getUserId());

                            var parametrosPushNotificacion = new Dictionary<string, object>();
                            parametrosPushNotificacion.Add("UserSend", currentUser.Email);
                            parametrosPushNotificacion.Add("UserTo", responsable.Email);
                            parametrosPushNotificacion.Add("Folio", c.ID);
                            //parametrosPushNotificacion.Add("Folio", reporteFalla.ID);
                            parametrosPushNotificacion.Add("FechaAgenda", agenda.FechaInicio.ToString("dd/MM/yyyy"));
                            parametrosPushNotificacion.Add("HoraAgenda", agenda.FechaInicio.ToString("HH:mm:ss"));
                            parametrosPushNotificacion.Add("Tipo", 1);
                            await this.SendPushNotificationToApp(parametrosPushNotificacion);

                        }
                        catch (FormatException)
                        {
                            //base.SetReturnInfo(2, "No se pudo enviar la notificación, El correo no es válido.");
                        }
                        catch (Exception ex )
                        {
                            ////base.SetReturnInfo(2, "No se pudo enviar la notificación:" + ex.Message);
                        }

                    }
                }

                retValue.Dictamenes = item.Dictamenes;
                retValue.ProcesoEjecutado = item.ProcesoEjecutado;
                retValue.EstatusAgenda = estatusAgenda;

                Commit();

                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        public async void EnviarNotificacionWebCatDiagnostico(dynamic expando, m.SCV.Interfaces.IAgendaDictamenDetalle c, string IdPlaza)
        {
            var daoUsuariosEK = Get<d.Kontrol.Interfaces.IUsuarios>();
            var responsable = await daoUsuariosEK.GetById(c.Dictamen.IdResponsableDictamen.Value);
            List<m.Kontrol.Interfaces.IUsuario> correosNiveles = new List<m.Kontrol.Interfaces.IUsuario>();
            correosNiveles.Add(responsable);

        }

        public async void EnviarCorreoCatDiagnostico(dynamic expando,m.SCV.Interfaces.IAgendaDictamenDetalle c)
        {
            List<string> elementosEmails = new List<string>();
            List<m.Kontrol.Interfaces.IUsuario> correosNiveles = new List<m.Kontrol.Interfaces.IUsuario>();
            int idCliente = c.IdCliente.Value;
            var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
            var daoUbicacion = Get<d.SCV.Interfaces.IUbicaciones>();
            var daoRF = Get<d.SCV.Interfaces.IReportesFallas>();
            var cliente = await daoCliente.GetById(idCliente);
            var ubicacion = await daoUbicacion.GetById((int)cliente.IdUbicacion);
            var reporteFalla = await daoRF.GetById(c.Dictamen.IdReporte);
            object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
            var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
            //var documento = await bpREP.GetDocumentDiagnostico((int)c.Dictamen.ID);
            var documento = Get<EK.Drivers.Common.IKontrolFiles>();
            //EK.Drivers.Common.IKontrolFiles[] documentos = { documento };
            var plantillaObj = await this.GetPlantilla("NOTIFICAR-DIAGNOSTICO", obj);
            //var dao = Get<d.SCV.Interfaces.IReportesFallas>();
            //ReportesFallas r = new ReportesFallas(this.factory, dao);
            var daoUsuariosEK = Get<d.Kontrol.Interfaces.IUsuarios>();
            var responsable = await daoUsuariosEK.GetById(c.Dictamen.IdResponsableDictamen.Value);
            correosNiveles.Add(responsable);
            foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }

            bool addCC = false;
            List<string> EmailsCC = new List<string>();
            var parametrosUsuariosEmailCat = new Dictionary<string, object>();
            var parametrosUsuariosEmailPlazaCC = new Dictionary<string, object>();
            parametrosUsuariosEmailCat.Add("IdParametro", 108);
            parametrosUsuariosEmailPlazaCC.Add("IdParametro", 109); //Plazas a las que se pondra copia
            var result = await this.dao.GetUsuariosEmailCat(parametrosUsuariosEmailCat);
            var plazasCC = await this.dao.GetPlazasEmailCC(parametrosUsuariosEmailPlazaCC);
            if (result != null)
            {
                string stringPlz = "";
                if (plazasCC != null) {
                    dynamic jsonPlz = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(plazasCC));
                    if (jsonPlz is Newtonsoft.Json.Linq.JArray && jsonPlz.Count > 0)
                    { 
                        var valorPlz = jsonPlz[0];
                        stringPlz = valorPlz.valor;
                        if(stringPlz == "" || stringPlz.ToLower() == "all" || stringPlz.Contains(reporteFalla.IdPlaza))
                        {
                            addCC = true;
                        }
                    }
                        
                }
                dynamic objJson = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                var valor = objJson[0];
                string emails = valor.valor;
                if (emails != "" && addCC)
                {
                    string[] mailsCC = emails.Split(',');
                    foreach (var email in mailsCC)
                    {
                        EmailsCC.Add(email);
                    }
                }

            }
            var doc = await this.GetEncodedDocumentDiagnosticoStream(c.Dictamen.ID.Value, reporteFalla);
            documento.Nombre = $"DIAGNÓSTICO FOLIO {reporteFalla.ID.Value} NUM {c.Dictamen.ID.Value} - {ubicacion.Desarrollo.Nombre}.pdf";
            documento.Extension = "pdf";
            documento.ContentType = "application/pdf";
            documento.Content = doc;
            documento.Size = doc.Length;
            EK.Drivers.Common.IKontrolFiles[] documentos = { documento };

            bpClientEmail.SendMessage(elementosEmails.ToArray(), EmailsCC.ToArray(), plantillaObj.Titulo, plantillaObj.Plantilla_Contenido, documentos, true);
        }

        public async Task<MemoryStream> GetEncodedDocumentDiagnosticoStream(int id, m.SCV.Interfaces.IReporteFalla rf)
        {
            try
            {
                MemoryStream retValue = null;

                //using (MemoryStream ms = new MemoryStream())
                //{
                MemoryStream ms = new MemoryStream();
                    //var documento = await this.GetDocumentDiagnostico(id);
                    //documento.Content.Position = 0;
                    //documento.Content.CopyTo(ms);

                //retValue = Convert.ToBase64String(ms.ToArray());
                var documento = await this.GetDocumentDiagnosticoHtml(id,rf);

                SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
                converter.Options.PdfPageSize = SelectPdf.PdfPageSize.A3;
                SelectPdf.PdfDocument doc = converter.ConvertHtmlString(documento);
                MemoryStream mst = new MemoryStream();
                doc.Save(mst);
                doc.Close();
                mst.Position = 0;
                    mst.CopyTo(ms);
                    retValue = ms;
                    //retValue = Convert.ToBase64String(ms.ToArray());
                //}

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> GetDocumentDiagnosticoHtml(int id,m.SCV.Interfaces.IReporteFalla repF)
        {
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var daoRF = Get<d.SCV.Interfaces.IReportesFallas>();
            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            var daoAG = Get<d.SCV.Interfaces.IAgendaSPV>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistas>();
            var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenes>();

            try
            {
                var moneda = await bpMON.GetByClave("MXN");
                //var daoRF = Get<d.SCV.Interfaces.IReportesFallas>();
                ReportesFallas r = new ReportesFallas(this.factory, daoRF);

                var dictamen = await daoDIC.GetById(id);
                //var reporteFalla = await daoRF.GetById((int)dictamen.IdReporte);
                var reporteFalla = repF;
                var ubicacion = await r.GetUbicacionById((int)reporteFalla.IdUbicacion);
                var citas = await daoAG.GetAgendaDetalleHistorial("Dictamen", id, null);

                m.SCV.Interfaces.IReporteDictamen dictamenUpdate = await daoDIC.GetById(id);

                var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
                var cliente = await daoCliente.GetById((int)dictamenUpdate.IdCliente);
                var IdAgendaDetalle = 0;
                if (dictamenUpdate.IdAgenda != null)
                {
                    IdAgendaDetalle = (int)dictamenUpdate.IdAgenda;
                }
                var model = await daoAgendaDetalle.GetById(IdAgendaDetalle);

                var IdAgenda = 0;
                if (model != null)
                {
                    IdAgenda = (int)model.IdAgenda;
                }
                var agenda = await daoAgenda.GetById(IdAgenda);


                var parametrosFolioDetalle = new Dictionary<string, object>();
                parametrosFolioDetalle.Add("idReporte", dictamenUpdate.IdReporte);
                //parametrosFolioDetalle.Add("ID", dictamenUpdate.Partida.ID.Value);
                var partidas = await daoDET.GetAll(parametrosFolioDetalle);
                int[] arrayPartidas = new int[partidas.Count];
                for (int i = 0; i < partidas.Count; i++)
                    arrayPartidas[i] = partidas[i].ID.Value;

                var partidasDictamenIDs = dictamen.IdPartidas.Split(',');
                List<m.SCV.Interfaces.IReporteFallaDetalle> PartidasEnDictamen = new List<m.SCV.Interfaces.IReporteFallaDetalle>();
                foreach (var p in partidasDictamenIDs)
                {
                    foreach (var partida in partidas)
                    {
                        if (p == partida.ID.ToString())
                        {
                            PartidasEnDictamen.Add(partida);
                        }
                    }
                }
                /*for (int i = 0; i < arrayPartidas.Length; i++)
                {
                    int IdPartida = arrayPartidas[i];
                    if (!dictamen.IdPartidas.Contains(IdPartida.ToString()))
                    {
                        for (int j = 0; j < partidas.Count; j++)
                            if (partidas[j].ID == IdPartida) partidas.RemoveAt(j);
                    }

                }*/

                List<dynamic> listOfDiagnosticos = new List<dynamic>();
                List<dynamic> listOfCitas = new List<dynamic>();
                List<dynamic> listOfPartidas = new List<dynamic>();
                listOfDiagnosticos.Add(dictamenUpdate);

                dynamic expando = new ExpandoObject();
                expando.Agenda = agenda;
                expando.Citas = citas;
                expando.Cliente = cliente;
                expando.Ubicacion = ubicacion;
                expando.Dictamenes = listOfDiagnosticos;
                expando.Responsable = dictamenUpdate.ResponsableDictamen;
                expando.Partidas = PartidasEnDictamen;
                expando.Folio = reporteFalla;
                expando.IdDictamen = dictamenUpdate.ID;
                expando.ObservacionesCAT = reporteFalla.ObservacionesServicio;
                expando.ComentarioCAT = dictamenUpdate.ComentarioGeneralDictamen;
                expando.ImagenFirma = dictamenUpdate.FirmaClienteString;
                expando.ImagenFirmaCatSuper = dictamenUpdate.FirmaCatSupString;
                expando.FechaActual = DateTime.Now.ToString();
                expando.FechaEntregaVivienda = reporteFalla.FechaEntregaVivienda.Value.ToString("dd/MM/yyyy");
                expando.FechaReporte = reporteFalla.FechaCaptura.Value.ToString("dd/MM/yyyy");
                expando.FechaCaptura = reporteFalla.FechaCaptura.Value.ToString("dd/MM/yyyy");

                object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));

                //Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("NOTIFICAR-DIAGNOSTICO-DOCUMENTO", obj, null, moneda);
                //Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);
                var Html = await GetHTMLStringFromPlantilla("NOTIFICAR-DIAGNOSTICO-DOCUMENTO");
                string retValue = MergeAllHtmlWithObj(obj, Html);
                return retValue;
                //return "";
                //return documento;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> GetHTMLStringFromPlantilla(string ClavePlantilla)
        {
            var bpPlantillas = Get<p.Kontrol.Interfaces.IPlantillasMails>();
            var plantilla = await bpPlantillas.GetByClave(ClavePlantilla);
            var bpFiles = Get<p.Kontrol.Interfaces.IKontrolFiles>();
            var filesParams = new Dictionary<string, object>() {
                        { "tipo", "anexos" },
                        { "entityType", "plantillas"},
                        { "entityId", plantilla.ID}
                    };
            var files = await bpFiles.GetAll(filesParams);
            m.Kontrol.Interfaces.IKontrolFile file = null;
            file = files[0];
            bool testMode = Convert.ToBoolean(ConfigurationManager.AppSettings["testMode"]);
            var HTMLDataString = testMode ?
            System.IO.File.ReadAllText($"\\\\10.1.70.52\\RepositorioEK10\\kontrolFiles\\plantillas\\{plantilla.ID}\\anexos\\{file.Uid}") :
            System.IO.File.ReadAllText($"\\\\10.1.70.50\\RepositorioEK10\\kontrolFiles\\plantillas\\{plantilla.ID}\\anexos\\{file.Uid}");
            //produccion
            //var HTMLDataString = System.IO.File.ReadAllText($"\\\\10.1.70.52\\RepositorioEK10\\kontrolFiles\\plantillas\\{plantilla.ID}\\anexos\\{file.Uid}");

            //prueba
            //var HTMLDataString = System.IO.File.ReadAllText($"\\\\10.1.70.52\\RepositorioEK10\\kontrolFiles\\plantillas\\{plantilla.ID}\\anexos\\pruebas\\{file.Uid}");
            return HTMLDataString;
        }
        public string MergeAllHtmlWithObj(dynamic obj, string HtmlString)
        {
            string retvalue;
            retvalue = CombinarObjConHtml(obj, HtmlString);
            retvalue = createHtmlTaginLoop(obj, retvalue);
            return retvalue;
        }
        public string CombinarObjConHtml(dynamic obj, string HtmlString)
        {
            var d = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(Newtonsoft.Json.JsonConvert.SerializeObject(obj));
            //Crear metodo para obtener todos los marcadores del stringhtml, despues solo sacar los resultads;
            //var result  = Regex.Match(HtmlString, @"@@ (.+?) @@ ").Groups;
            List<string> lista = new List<string>();
            var ListaMarcadores = ObtenerMarcadoresDeHTMLString(HtmlString, lista);

            foreach (var m in ListaMarcadores)
            {
                if (m.Contains("."))
                {
                    try
                    {
                        var objeto = m.Split('.');
                        var val = d;
                        foreach (var o in objeto)
                        {
                            val = val[o];
                        }
                        val = val != null ? val.ToString() : "";
                        HtmlString = HtmlString.Replace($"@@{m}@@", val);
                    }
                    catch (Exception ex) { }

                }
                else
                {
                    try
                    {
                        var valor = d[m];
                        valor = valor != null ? valor.ToString() : "";
                        if (m == "ImagenFirma" || m == "ImagenFirmaCatSuper" || m == "ImagenFirmaContratista")
                        {
                            valor = CreateImgHtmlStringTag(valor);
                        }
                        HtmlString = HtmlString.Replace($"@@{m}@@", valor);
                    }
                    catch (Exception ex) { }

                }
            }
            return HtmlString;
        }
        public string createHtmlTaginLoop(dynamic obj, string html)
        {
            bool esDiagnostico = html.Contains("<title>DIAG</title>");
            List<string> ListaStringPartidas = new List<string>();
            var d = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(Newtonsoft.Json.JsonConvert.SerializeObject(obj));
            foreach (var key in d.Keys)
            {
                var valor = d[key];
                if (valor != null)
                {
                    var Tipo = valor.GetType();
                    if (Tipo.Name == "JArray")
                    {
                        string MarcadorArray = $"<!--[{key}]-->";
                        string s = html;
                        string st;
                        int index = s.IndexOf(MarcadorArray);
                        string GeneradoEnLoop = "";
                        if (index >= 0)
                        {
                            s = s.Remove(0, index + MarcadorArray.Length);
                            index = s.IndexOf(MarcadorArray);
                            if (index >= 0)
                            {
                                st = s.Substring(0, index);
                                foreach (var i in valor)
                                {
                                    string tagloop = CombinarObjConHtml(i, st);
                                    GeneradoEnLoop += tagloop;
                                    if (key == "Partidas")
                                    {
                                        ListaStringPartidas.Add(tagloop);
                                    }
                                }
                                html = html.Replace(st, GeneradoEnLoop);
                                
                            }
                        }

                    }
                }
            }
            //======= Mandar lista de partidas y el htmlstring para paginar dependiendo la cantidad de partidas
            html = this.PaginarSeccion(html, ListaStringPartidas, esDiagnostico);
            //======= Quitar la etiqueta NuevaPagina del html final
            html = html.Replace("@@NuevaPagina@@", "");
            //====== Obtener el total veces que se aparece el marcador total pages, se le resta 1 porque la plantilla tiene por default un marcador en la seccion de nuevapagina
            int total = Regex.Matches(html, "@@TotalPage@@").Count - 1;
            //====== Reemplazar los marcadores de totalpage por el numero de paginas totales.
            html = html.Replace("@@TotalPage@@", total.ToString());
            return html;
        }
        public string PaginarSeccion(string html, List<string> partidas, bool diagnostico)
        {
            string fullhtml = html;
            string nuevaPagina = this.GetContenidoEntreMarcadores("NUEVAPAGINA", fullhtml);
            nuevaPagina = nuevaPagina.Replace("@@currentPage@@", "2");
            string seccionFirmas = this.GetContenidoEntreMarcadores("SECCIONFIRMAS", fullhtml);
            string seccionObsCat = this.GetContenidoEntreMarcadores("SECCIONOBSCAT", fullhtml);
            string seccionObs = this.GetContenidoEntreMarcadores("SECCIONOBS", fullhtml);

            string contenido = "";
            if (diagnostico)
            {
                if (partidas.Count <= 9)
                {
                    return fullhtml;
                }
                if (partidas.Count > 9 && partidas.Count <= 13)
                {
                    contenido += seccionFirmas;
                    nuevaPagina = nuevaPagina.Replace("@@ContenidoNuevaPagina@@", contenido);
                    fullhtml = fullhtml.Replace(seccionFirmas, "").Replace("@@NuevaPagina@@", nuevaPagina);
                }
                if (partidas.Count > 13 && partidas.Count <= 15)
                {
                    contenido += seccionObsCat + seccionFirmas;
                    nuevaPagina = nuevaPagina.Replace("@@ContenidoNuevaPagina@@", contenido);
                    fullhtml = fullhtml.Replace(seccionFirmas, "").Replace(seccionObsCat, "").Replace("@@NuevaPagina@@", nuevaPagina);

                }
                if (partidas.Count > 15 && partidas.Count <= 18)
                {
                    contenido += seccionObs + seccionObsCat + seccionFirmas;
                    nuevaPagina = nuevaPagina.Replace("@@ContenidoNuevaPagina@@", contenido);
                    fullhtml = fullhtml.Replace(seccionFirmas, "").Replace(seccionObsCat, "").Replace(seccionObs, "").Replace("@@NuevaPagina@@", nuevaPagina);
                }
                if (partidas.Count > 18)
                {
                    int i = 0;
                    List<string> restantes = new List<string>();
                    foreach (var p in partidas)
                    {
                        i++;
                        if (i > 18)
                        {
                            restantes.Add(p);
                        }
                    }
                    fullhtml = this.PaginarBloqueSecciones(fullhtml, null, restantes, 2, diagnostico);
                }
                return fullhtml;
            }
            else
            {
                if (partidas.Count <= 3)
                {
                    return fullhtml;
                }
                if (partidas.Count > 3 && partidas.Count <= 6)
                {
                    contenido += seccionFirmas;
                    nuevaPagina = nuevaPagina.Replace("@@ContenidoNuevaPagina@@", contenido);
                    fullhtml = fullhtml.Replace(seccionFirmas, "").Replace("@@NuevaPagina@@", nuevaPagina);
                }
                if (partidas.Count > 6 && partidas.Count <= 8)
                {
                    contenido += seccionObsCat + seccionFirmas;
                    nuevaPagina = nuevaPagina.Replace("@@ContenidoNuevaPagina@@", contenido);
                    fullhtml = fullhtml.Replace(seccionFirmas, "").Replace(seccionObsCat, "").Replace("@@NuevaPagina@@", nuevaPagina);

                }

                if (partidas.Count > 7)
                {
                    int i = 0;
                    List<string> restantes = new List<string>();
                    foreach (var p in partidas)
                    {
                        i++;
                        if (i > 8)
                        {
                            restantes.Add(p);
                        }
                    }
                    fullhtml = this.PaginarBloqueSecciones(fullhtml, null, restantes, 2, diagnostico);
                }
                return fullhtml;
            }
        }

        public string PaginarBloqueSecciones(string html, dynamic obj, List<string> restantes, int pageNumber, bool diagnostico)
        {
            string fullhtml = html;
            string partidasNuevaPagina = "";
            string newPage = this.GetContenidoEntreMarcadores("NUEVAPAGINA", fullhtml);
            newPage = newPage.Replace("@@currentPage@@", pageNumber.ToString());
            foreach (var r in restantes) { partidasNuevaPagina += r; }
            fullhtml = fullhtml.Replace(partidasNuevaPagina, "");
            string nuevaTablaIncidencias = this.GetContenidoEntreMarcadores("ExtraPage_HeaderOpenPartidas", fullhtml);
            nuevaTablaIncidencias += partidasNuevaPagina;
            nuevaTablaIncidencias += "</table>";
            string dataBodyNuevaPagina = this.GetContenidoEntreMarcadores("BREAKPAGE_SECCIONES", fullhtml);
            fullhtml = fullhtml.Replace(dataBodyNuevaPagina, "");
            dataBodyNuevaPagina = nuevaTablaIncidencias + dataBodyNuevaPagina;
            if (pageNumber > 2)
            {
                string br = "";
                for (int i = 0; i < pageNumber; i++) { br += "<br />"; }
                dataBodyNuevaPagina = br + dataBodyNuevaPagina;
            }
            newPage = newPage.Replace("@@ContenidoNuevaPagina@@", dataBodyNuevaPagina);
            newPage += "@@NuevaPagina@@";
            fullhtml = fullhtml.Replace("@@NuevaPagina@@", newPage);
            fullhtml = this.paginarSeccionesNewPage(fullhtml, restantes, pageNumber + 1, diagnostico);

            if (diagnostico)
            {
                if (restantes.Count > 25)
                {
                    int i = 0;
                    List<string> r = new List<string>();
                    foreach (var p in restantes)
                    {
                        i++;
                        if (i > 25)
                        {
                            r.Add(p);
                        }
                    }
                    fullhtml = this.PaginarBloqueSecciones(fullhtml, null, r, pageNumber + 1, diagnostico);
                }
                return fullhtml;
            }
            else
            {
                if (restantes.Count > 12)
                {
                    int i = 0;
                    List<string> r = new List<string>();
                    foreach (var p in restantes)
                    {
                        i++;
                        if (i > 12)
                        {
                            r.Add(p);
                        }
                    }
                    fullhtml = this.PaginarBloqueSecciones(fullhtml, null, r, pageNumber + 1, diagnostico);
                }
                return fullhtml;
            }

        }

        public string paginarSeccionesNewPage(string html, List<string> partidas, int pageNumber, bool diagnostico)
        {
            string fullhtml = html;
            string nuevaPagina = this.GetContenidoEntreMarcadores("NUEVAPAGINA", fullhtml);
            nuevaPagina = nuevaPagina.Replace("@@currentPage@@", pageNumber.ToString());
            string seccionFirmas = this.GetContenidoEntreMarcadores("SECCIONFIRMAS", fullhtml);
            string seccionObsCat = this.GetContenidoEntreMarcadores("SECCIONOBSCAT", fullhtml);
            string seccionObs = this.GetContenidoEntreMarcadores("SECCIONOBS", fullhtml);

            string contenido = "";
            if (diagnostico)
            {
                if (partidas.Count <= 18)
                {
                    return fullhtml;
                }
                if (partidas.Count > 18 && partidas.Count <= 20)
                {
                    contenido += seccionFirmas;
                    nuevaPagina = nuevaPagina.Replace("@@ContenidoNuevaPagina@@", contenido);
                    fullhtml = fullhtml.Replace(seccionFirmas, "").Replace("@@NuevaPagina@@", nuevaPagina);
                }
                if (partidas.Count > 20 && partidas.Count <= 22)
                {
                    contenido += seccionObsCat + seccionFirmas;
                    nuevaPagina = nuevaPagina.Replace("@@ContenidoNuevaPagina@@", contenido);
                    fullhtml = fullhtml.Replace(seccionFirmas, "").Replace(seccionObsCat, "").Replace("@@NuevaPagina@@", nuevaPagina);

                }
                if (partidas.Count > 22 && partidas.Count <= 25)
                {
                    contenido += seccionObs + seccionObsCat + seccionFirmas;
                    nuevaPagina = nuevaPagina.Replace("@@ContenidoNuevaPagina@@", contenido);
                    fullhtml = fullhtml.Replace(seccionFirmas, "").Replace(seccionObsCat, "").Replace(seccionObs, "").Replace("@@NuevaPagina@@", nuevaPagina);
                }

                return fullhtml;
            }
            else
            {
                if (partidas.Count <= 8)
                {
                    return fullhtml;
                }
                if (partidas.Count > 8 && partidas.Count <= 10)
                {
                    contenido += seccionFirmas;
                    nuevaPagina = nuevaPagina.Replace("@@ContenidoNuevaPagina@@", contenido);
                    fullhtml = fullhtml.Replace(seccionFirmas, "").Replace("@@NuevaPagina@@", nuevaPagina);
                }
                if (partidas.Count > 10 && partidas.Count <= 12)
                {
                    contenido += seccionObsCat + seccionFirmas;
                    nuevaPagina = nuevaPagina.Replace("@@ContenidoNuevaPagina@@", contenido);
                    fullhtml = fullhtml.Replace(seccionFirmas, "").Replace(seccionObsCat, "").Replace("@@NuevaPagina@@", nuevaPagina);

                }

                return fullhtml;
            }

        }
        public string GetContenidoEntreMarcadores(string marcador, string html)
        {
            try
            {
                string mark = $"<!--[{marcador}]-->";
                int startIndex = html.IndexOf(mark);
                int endIndex = html.LastIndexOf(mark);
                int length = marcador == "NUEVAPAGINA" || marcador == "ExtraPage_HeaderOpenPartidas" ? endIndex - (startIndex + mark.Length) : (endIndex + mark.Length) - startIndex;
                string contenido = marcador == "NUEVAPAGINA" || marcador == "ExtraPage_HeaderOpenPartidas" ? html.Substring(startIndex + mark.Length, length) : html.Substring(startIndex, length);
                if (marcador == "NUEVAPAGINA")
                {
                    contenido = contenido.Replace("<!--", "").Replace("-->", "");
                }
                return contenido;
            }
            catch (Exception ex)
            {
                return "Err - Marcador no encontrado [" + marcador + "]";
            }
        }
        public string CreateImgHtmlStringTag(string img)
        {
            if (img == "")
            {
                return img;
            }
            WebClient cliente = new WebClient();

            byte[] imageArray = cliente.DownloadData($"Http://Apps.gruporuba.com.mx/unitpricesimage/{img}");
            string imageData = Convert.ToBase64String(imageArray);

            var ImgTagString = $"data:image/png;base64,{imageData}";
            return ImgTagString;
        }

        public string[] ObtenerMarcadoresDeHTMLString(string Html, List<string> lista)
        {
            //========= Buscar la primera coincidencia de los caracteres @@ y eliminar todo lo que hay hasta ese indice incluyendo los mismos @@
            int index = Html.IndexOf("@@");
            if (index < 0)
                return lista.ToArray();
            string toRemove = Html.Substring(0, index + 2);
            Html = Html.Remove(0, index + 2);
            //Html = Html.Replace(toRemove, "");
            // ======== Buscar nuevamente la primera coincidencia de @@ y extrar el nombre del marcador y quitarlo del actual htmlstring
            index = Html.IndexOf("@@");
            if (index < 0)
            {
                return lista.ToArray();
            }
            else
            {
                string marcador = Html.Substring(0, index);
                lista.Add(marcador);
                //Html = Html.Replace($"{marcador}@@", "");
                Html = Html.Remove(0, index + 2);
                ObtenerMarcadoresDeHTMLString(Html, lista);
            }

            return lista.ToArray();
        }
        public async Task<m.Kontrol.Interfaces.IAgenda> Save(m.Kontrol.Interfaces.IAgenda item)
        {
            int idAgenda = -1;
            var retValue = Get<m.Kontrol.Interfaces.IAgenda>();
            var daoAgenda = Get<d.Kontrol.Interfaces.IAgenda>();
            var daoAgendaDET = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();

            var daoAgendaHDR = Get<d.Kontrol.Interfaces.IAgenda>();
            var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
            var daoUbicacion = Get<d.SCV.Interfaces.IUbicaciones>();

            try
            {
                var idUsuarioAsignado = -1;
                var idExpediente = -1;

                foreach (var registros in item.UbicacionesAgenda)
                {
                    idUsuarioAsignado = (int)registros.IdUsuarioAsignado;
                    idExpediente = (int)registros.IdExpediente;
                }

                int result = 0;

                List<dynamic> listOfx = new List<dynamic>();
                listOfx.AddRange(item.UbicacionesAgenda);

                result = await this.ValidatePlanificacion(item.FechaInicio, item.FechaFin, idUsuarioAsignado, listOfx, item.TipoAgenda.Clave);
                if (result < 0)
                {
                    retValue = item;
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                    return retValue;
                }
                ////
                result = await this.ValidateBloquesFechas(item.FechaInicio, item.FechaFin, idUsuarioAsignado, idExpediente, item.TipoAgenda.Clave);
                if (result < 0)
                {
                    retValue = item;
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                    return retValue;
                }

                var bpEstatusAgenda = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var EstatusAgenda = await bpEstatusAgenda.Get("AgendaEstatus", "ACT");
                var estatus = await bpEstatusAgenda.Get("ESTATUS", "A");

                item.IdEstatus = estatus.ID;

                BeginTransaction(true);

                item.Estado = item.ID == null || item.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                if (item != null)
                {
                    item.Modificado = DateTime.UtcNow;
                    item.IdModificadoPor = base.getUserId();
                }

                if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    item.Creado = DateTime.UtcNow;
                    item.IdCreadoPor = base.getUserId();
                }

               

                var bpUsuarios = Get<p.Kontrol.Interfaces.IUsuario>();
                //idUsuarioAsignado = -1;
                string linkTarea;
                foreach (var c in item.UbicacionesAgenda)
                {
                    item.IdEstatusAgenda = EstatusAgenda.ID.Value;
                    item.IdUsuarioAsignado = (int)c.IdUsuarioAsignado;
                    item.IdExpediente = (int)c.IdExpediente; 
                    item.Reserva = false;

                    retValue = await daoAgenda.SaveEntity(item, true, true);
                    idAgenda = retValue.ID ?? 0;

                    c.IdAgenda = idAgenda;
                    c.ID = item.ID;
                    c.IdEstatus = item.IdEstatus;
                    c.IdCreadoPor = base.getUserId();
                    c.IdModificadoPor = base.getUserId();

                    var procesoConst = await daoAgendaDET.SaveAgendaEntregaVivienda(c, EstatusAgenda);
                  
                }

                Commit();

                retValue.UbicacionesAgenda = item.UbicacionesAgenda;
                retValue.ProcesoEjecutado = item.ProcesoEjecutado;
                retValue.EstatusAgenda = EstatusAgenda;

                return retValue;
            }
            catch (Exception ex)
            {

                Rollback();
                throw ex;
            }
        }

        public async Task<object> GetAgendaDetalleCita(Dictionary<string, object> parametros)
        {
            if (parametros.ContainsKey("IdAgendaDetalle"))
            {
                if (parametros["IdAgendaDetalle"] == null)
                    parametros["IdAgendaDetalle"] = 0;

                var parametros1 = new Dictionary<string, object>();
                parametros1.Add("IdAgenda", parametros["IdAgenda"]);
                parametros1.Add("IdAgendaDetalle", parametros["IdAgendaDetalle"]);

            }
            if (parametros.ContainsKey("OperacionEspecificaSP"))
            {
                return await this.dao.GetAgendaDetalleHistorial(Convert.ToString(parametros["tipoAgenda"]), Convert.ToInt32(parametros["idExpediente"]), Convert.ToString(parametros["estatusAgenda"]));
            }
            else
            {
                switch (parametros["ClaveTipoAgenda"].ToString())
                {
                    case "FechaConstruccion":
                    case "EntregaVivienda":
                        var bpFechaConstruccionEntrega = Get<p.SCV.Interfaces.IConsultaViviendaEntregable>();
                        return await bpFechaConstruccionEntrega.GetAgendaDetalleCita(Convert.ToInt32(parametros["IdAgenda"]), Convert.ToInt32(parametros["IdAgendaDetalle"]));
                    case "Contratista":
                    case "Dictamen":
                        return await this.dao.GetAgendaDetalleCitaContratista(Convert.ToInt32(parametros["IdAgenda"]), Convert.ToInt32(parametros["IdAgendaDetalle"]));
                    case "ContratistaAreasComunes":
                        return await this.dao.GetAgendaDetalleCitaContratistaAreasComunes(Convert.ToInt32(parametros["IdAgenda"]), Convert.ToInt32(parametros["IdAgendaDetalle"]));
                    default:
                        return null;
                }
            }
        }

        public async Task<m.Kontrol.Interfaces.ICalendar> getAgendaDashBoard(Dictionary<string, object> parametros)
        {
            var idUser = base.getUserId();
            var retValue = Get<m.Kontrol.Interfaces.ICalendar>();
            var daoAgenda = Get<d.Kontrol.Interfaces.IAgenda>();

            retValue.ProdID = "-//enkontrol.com//Task & Events Calendar//END";
            retValue.Version = "2.0";
            retValue.Events = new List<m.Kontrol.Interfaces.ICalendarEvent>();

            try
            {
                if (!parametros.ContainsKey("OperacionEspecificaSP"))
                {
                    parametros.Add("OperacionEspecificaSP", "AgendaDashBoard");
                }
                parametros.Add("IdUsuario", getUserId());

                var agenda = await daoAgenda.GetAll(parametros);
                var events = new Dictionary<DateTime, m.Kontrol.Interfaces.ICalendarEvent>();
               
                if (agenda != null)
                {
                    foreach (dynamic t in agenda)
                    {
                        DateTime? eventDateStart = t.FechaInicio;
                        DateTime? eventDateEnd = t.FechaFin;
                        string etiqueta;

                        if (eventDateStart != null && eventDateEnd != null)
                        {
                            var calendarEvent = Get<m.Kontrol.Interfaces.ICalendarEvent>();
                            var iconoCalendario = "";
                            var reserva = t.Reserva;
                            var titulo_AtenderA = t.AtenderA;
                            var colorReserva = t.EstatusAgendaIconoColor;
                            var ubicacion = t.Ubicacion;
                            if (reserva)
                            {
                                colorReserva = "#26D6D6";
                                titulo_AtenderA = "---- R E S E R V A :" + titulo_AtenderA;
                            }
                            calendarEvent.ID = t.ID;
                            calendarEvent.UID = t.ID.ToString();
                            calendarEvent.Categories = t.Asignado;
                            iconoCalendario = t.TipoAgendaIcono;
                            calendarEvent.DTStart = eventDateStart.Value;
                            calendarEvent.DTEnd = eventDateEnd.Value;
                            calendarEvent.DTStamp = t.Creado.ToString("yyyyMMddTHHmmssZ");
                            calendarEvent.Location = "EnKontrol";
                            // calendarEvent
                            switch (t.TipoAgenda.Clave)
                            {
                                case "FechaConstruccion":
                                case "EntregaVivienda":
                                    calendarEvent.Description = ($"<div>{t.AtenderA } </div> <div>{ t.Asignado} <br>{ubicacion} </div>");
                                    etiqueta = WebUtility.HtmlDecode("<I class=\"" + iconoCalendario + "\" style=\"color: \"" + t.EstatusAgendaIconoColor + "\" \"> </I> " + titulo_AtenderA + "<br> " + t.Asignado+ "<br>"+ ubicacion);
                                    // etiqueta = WebUtility.HtmlDecode(($" <I class= { iconoCalendario }  style= color: { t.EstatusAgendaIconoColor }   > </I>  { titulo_AtenderA } <br> { t.Asignado} "));
                                    break;
                                case "Contratista":
                                    calendarEvent.Description = ($"<div>Folio { t.IdExpediente} - { t.IdOrden} </div><div>{t.AtenderA } </div> <br> <div> {ubicacion} </div> <div>{ t.Asignado}  </div>");
                                    etiqueta = WebUtility.HtmlDecode("<I class=\"" + iconoCalendario + "\" style=\"color: \"" + t.EstatusAgendaIconoColor + "\" \"> </I> " + titulo_AtenderA + "<br> " + t.Asignado + " <br>" + "<div>" + ubicacion + "</div>" +"<div>Folio " + t.IdExpediente + " - " + t.IdOrden + " </div>");
                                    break;
                                case "ContratistaAreasComunes":
                                    calendarEvent.Description = ($"<div>Folio { t.IdExpediente} - { t.IdOrden} </div><div>{t.AtenderA } </div> <br> <div>{ t.Asignado}  </div>");
                                    etiqueta = WebUtility.HtmlDecode("<I class=\"" + iconoCalendario + "\" style=\"color: \"" + t.EstatusAgendaIconoColor + "\" \"> </I> " + titulo_AtenderA + "<br> " + t.Asignado + " <br>" + "<div>Folio " + t.IdExpediente + " - " + t.IdOrden + " </div>");
                                    break;
                                default:
                                    calendarEvent.Description = ($"<div>Folio { t.IdExpediente} </div><div>{t.AtenderA } </div> <br> <div>{ t.Asignado}  </div>");
                                    etiqueta = WebUtility.HtmlDecode("<I class=\"" + iconoCalendario + "\" style=\"color: \"" + t.EstatusAgendaIconoColor + "\" \"> </I> " + titulo_AtenderA + "<br> " + t.Asignado);
                                    break;

                            }
                            calendarEvent.Summary = $"{etiqueta }";
                            calendarEvent.BackgroundColor = colorReserva;
                            calendarEvent.TextColor = "#FFFFFF";
                            calendarEvent.TipoAgenda = t.TipoAgenda;
                            calendarEvent.AllDay = false;
                            retValue.Events.Add(calendarEvent);
                        }
                    }
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IAgenda>> getAgendaDashBoardGrid(Dictionary<string, object> parametros)
        {
            var daoAgenda = Get<d.Kontrol.Interfaces.IAgenda>();
            parametros.Add("OperacionEspecificaSP", "AgendaDashBoardGrid");
            parametros.Add("IdUsuario", base.getUserId());

            return await daoAgenda.GetAll(parametros);
        }

        public async Task<List<m.Kontrol.Interfaces.IAgenda>> getAgendaDataForExportExcel(Dictionary<string, object> parametros)
        {
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var daoAgenda = Get<d.Kontrol.Interfaces.IAgenda>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            try
            {
                string retValue = null;
                int IdTipoAgenda = Convert.ToInt32(parametros["TipoAgenda"]);
                var moneda = await bpMON.GetByClave("MXN");
                var tipoAgenda = await bpCGV.GetByID(IdTipoAgenda);
                parametros.Add("OperacionEspecificaSP", "AgendaDashBoardGrid-Impresion");
                parametros.Add("IdUsuario", base.getUserId());

                var citas = await daoAgenda.GetAll(parametros);

                List<int> contratistasDiferentes = new List<int>();
                for (int i = 1; i < citas.Count; i++)
                    if (citas[i - 1].Asignado != citas[i].Asignado)
                        contratistasDiferentes.Add(i);

                for (int i = 1; i < citas.Count; i++)
                    if (!contratistasDiferentes.Contains(i))
                        citas[i].Asignado = "";
                for (int i = 0; i < citas.Count; i++)
                    citas[i].AtenderA += ' ' + citas[i].Ubicacion;

                return citas;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public async Task<string> printDocumentAgendaDashBoardGrid(Dictionary<string, object> parametros)
        {
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var daoAgenda = Get<d.Kontrol.Interfaces.IAgenda>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            try
            {
                string retValue = null;
                int IdTipoAgenda = Convert.ToInt32(parametros["TipoAgenda"]);
                var moneda = await bpMON.GetByClave("MXN");
                var tipoAgenda = await bpCGV.GetByID(IdTipoAgenda);
                parametros.Add("OperacionEspecificaSP", "AgendaDashBoardGrid-Impresion");
                parametros.Add("IdUsuario", base.getUserId());

                var citas = await daoAgenda.GetAll(parametros);

                List<int> contratistasDiferentes = new List<int>();
                for (int i = 1; i < citas.Count; i++)
                    if (citas[i - 1].Asignado != citas[i].Asignado)
                        contratistasDiferentes.Add(i);

                for (int i = 1; i < citas.Count; i++)
                    if (!contratistasDiferentes.Contains(i))
                        citas[i].Asignado = "";
                for (int i = 0; i < citas.Count; i++)
                    citas[i].AtenderA += ' ' + citas[i].Ubicacion;

                dynamic expando = new ExpandoObject();
                expando.Citas = citas;
                expando.DiaInicioAgenda = parametros["FechaInicio"];
                expando.DiaFinAgenda = parametros["FechaFin"];
                expando.TipoAgenda = IdTipoAgenda == 0 ? "Entrega/Construcción" : (tipoAgenda.Nombre).ToUpper();

                //notificacion supervisor asignado
                object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));

                Drivers.Emailing.Plantilla plantilla = null;
                switch (IdTipoAgenda)
                {
                    case 0:
                    case 1031:
                    case 1041:
                         plantilla = await this.GetPlantilla("IMPRESION-AGENDA-ENTREGACONSTRUCCION", obj, null, moneda);
                        break;
                    default:
                        plantilla = await this.GetPlantilla("IMPRESION-AGENDA-CONTRATISTAS", obj, null, moneda);
                        break;
                }

                //Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("IMPRESION-AGENDA-CONTRATISTAS", obj, null, moneda);
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


        public async Task<List<m.Kontrol.Interfaces.IAgenda>> getGeoCalendarDashBoard(Dictionary<string, object> parametros)
        {
            var daoAgenda = Get<d.Kontrol.Interfaces.IAgenda>();
            parametros.Add("OperacionEspecificaSP", "AGENDA-DASHBOARD-GEO");
            parametros.Add("IdUsuario", getUserId());

            return await daoAgenda.getGeoCalendarDashBoard(parametros);
        }

        public async Task<m.Kontrol.Interfaces.IModificarAgenda> getFechaAgendaCliente(Dictionary<string, object> parametros)
        {
            var daoAgenda = Get<d.Kontrol.Interfaces.IAgenda>();
            //parametros.Add("OperacionEspecificaSP", "AGENDA-DASHBOARD-GEO");
            parametros.Add("IdUsuario", getUserId());

            return await daoAgenda.getFechaAgendaCliente(parametros);
        }

        public async Task<List<m.Kontrol.Interfaces.IHistorialCambioAgenda>> getHistorialModificacionAgenda(Dictionary<string, object> parametros)
        {
            var daoAgenda = Get<d.Kontrol.Interfaces.IAgenda>();
            //parametros.Add("OperacionEspecificaSP", "AGENDA-DASHBOARD-GEO");
            parametros.Add("IdUsuario", getUserId());

            return await daoAgenda.getHistorialModificacionAgenda(parametros);
        }

        public async Task<m.Kontrol.Interfaces.IModificarAgenda> SaveCambioAgenda(Dictionary<string, object> parametros)
        {
            var daoAgenda = Get<d.Kontrol.Interfaces.IAgenda>();
            // parametros.Add("OperacionEspecificaSP", "AGENDA-DASHBOARD-GEO");
            parametros.Add("IdUsuario", getUserId());
            DateTime fechaIni = DateTime.Parse(parametros["FechaInicial"].ToString());
            DateTime fechaFin = DateTime.Parse(parametros["FechaFinal"].ToString());
            fechaIni = fechaIni.AddHours(-6);
            fechaFin = fechaFin.AddHours(-6);
            parametros["FechaInicial"] = fechaIni;
            parametros["FechaFinal"] = fechaFin;

            var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();

            var parametrosPlaza = new Dictionary<string, object>();
            var pm = await GetGlobalParameters("INSTALACION");

            //string linkTarea = $"{pm.Value<string>("SitioWeb")}{"/scv/pv/reporteFallas/"}{175888}";
            //string linkTarea = "scv/otrolink";

            parametrosPlaza.Add("IdPlaza", parametros["Plaza"]);
            parametrosPlaza.Add("IdNivel", parametros["NivelANotificar"]);
            try
            {
                BeginTransaction(true);
                var resultado = await daoAgenda.SaveCambioAgenda(parametros);
                if(parametros["NivelANotificar"].ToString() != "0")
                {
                    var correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);

                    //foreach(var c in correosNiveles)
                    //{
                        await SendNotificationChangeAgenda(correosNiveles, "NOTIFICAR-CAMBIO-AGENDA", null, null, parametros);
                    //}
                }

                Commit();
                return resultado;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            } 

        }

        public async Task<List<m.Kontrol.Interfaces.IAgendaIndicadores>> getStateCalendarDashBoard(Dictionary<string, object> parametros)
        {
            var daoAgenda = Get<d.Kontrol.Interfaces.IAgenda>();
            parametros.Add("OperacionEspecificaSP", "AGENDA-DASHBOARD-ESTADOS");
            parametros.Add("IdUsuario", getUserId());
            
            return await daoAgenda.getStateCalendarDashBoard(parametros);
        }

        public async Task<List<m.Kontrol.Interfaces.IAgendaIndicadores>> getUsersCalendarDashBoard(Dictionary<string, object> parametros)
        {
            var daoAgenda = Get<d.Kontrol.Interfaces.IAgenda>();
            parametros.Add("OperacionEspecificaSP", "AGENDA-DASHBOARD-USUARIOS");
            parametros.Add("IdUsuario", getUserId());

            return await daoAgenda.getUsersCalendarDashBoard(parametros);
        }

        public async Task<List<m.Kontrol.Interfaces.IUsuario> > GetCatByPlaza(Dictionary<string, object> parametros)
        {
            var daoUsuarios = Get<d.Kontrol.Interfaces.IUsuarios>();
            var listaCats = await daoUsuarios.GetListaCatByPlaza(parametros);
            return listaCats;
        }

        public async Task<List<m.Kontrol.Interfaces.IAgendaFechaBloqueo>> GetListaFechasUsuario(Dictionary<string, object> parametros)
        {
            var daoUsuarios = Get<d.Kontrol.Interfaces.IUsuarios>();

            var fechas = await daoUsuarios.GetFechasUsuariobloqueo(parametros);
            return fechas;
        }


        public async Task<List<m.Kontrol.Interfaces.IAgendaFechaBloqueo>> SaveFechasBloqueadasCat(Dictionary<string, object> parametros)
        {

            var fechaInicio = this.GetCorrectFormatDateTime("FechaBIni", "HorasIni", parametros);
            var fechaFin = this.GetCorrectFormatDateTime("FechaBFin", "HorasFin", parametros);

            parametros.Add("UsuarioCreo", getUserId());
            parametros.Add("FechaBloqueoIni", fechaInicio);
            parametros.Add("FechaBloqueoFin", fechaFin);
            var daoUsuarios = Get<d.Kontrol.Interfaces.IUsuarios>();
            var guardarFecha = await daoUsuarios.saveFechasBloqueadasCat(parametros);
            return guardarFecha;
        }

        public DateTime GetCorrectFormatDateTime(string fechaName, string horasName, Dictionary<string, object> parametros)
        {

            DateTime nFecha = (DateTime)parametros[fechaName]; //fecha.AddHours(-horasAdd);
            var horasAdd = parametros[horasName].ToString();
            nFecha = nFecha.AddHours(- int.Parse(horasAdd));
            int horasRestantes = nFecha.Hour;
            nFecha = nFecha.AddHours(-horasRestantes);
            nFecha = nFecha.AddHours(int.Parse(horasAdd));

            return nFecha;
        }

        public async Task<List<m.Kontrol.Interfaces.IAgendaFechaBloqueo>> DeleteFechasBloqueadasCat(Dictionary<string, object> parametros)
        {
            var daoUsuarios = Get<d.Kontrol.Interfaces.IUsuarios>();
            var borrarFecha = await daoUsuarios.deleteFechasBloqueadasCat(parametros);
            return borrarFecha;
        }

        public async Task<m.Kontrol.Interfaces.IAgenda> SaveDetProg(Dictionary<string, object> parametros)
        {
            int idDetalleA = 0;
            var retValue = Get<m.Kontrol.Interfaces.IAgenda>();
            var bpEstatusAgenda = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoAgendaHDR = Get<d.Kontrol.Interfaces.IAgenda>();
            var daoAgendaDET = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
            var daoUbicacion = Get<d.SCV.Interfaces.IUbicaciones>();
            var estatusAgenda = await bpEstatusAgenda.Get("AgendaEstatus", "ACT");
            var estatus = await bpEstatusAgenda.Get("ESTATUS", "A");

            int idAgendaCabeceraNueva = 0;
            string tipoAgendaClave = Convert.ToString(parametros["tipoAgendaCLave"]);
            string estatusAgendaClave = Convert.ToString(parametros["EstatusAgenda"]);
            int idCliente = Convert.ToInt32(parametros["IdExpediente"]);

            parametros.Add("IdUsuario", getUserId());

            if (parametros["EstatusAgenda"].ToString() == "REP")
            {
                retValue.FechaInicio = DateTime.Parse(parametros["FechaInicio"].ToString());
                retValue.FechaFin = DateTime.Parse(parametros["FechaFin"].ToString());

                int result = await this.ValidateBloquesFechas(
                    Convert.ToDateTime(parametros["FechaInicio"]),
                    Convert.ToDateTime(parametros["FechaFin"]),
                    Convert.ToInt32(parametros["IdUsuarioAsignado"]),
                    Convert.ToInt32(parametros["IdExpediente"]),
                    Convert.ToString(parametros["tipoAgendaCLave"]));

                if (result < 0)
                {
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                    return retValue;
                }
            }

            parametros.Remove("Motivo");
            int itemAgendaDetalle = await this.dao.SaveDetProg(parametros);

            if (parametros["IdDetalleAgenda"] != null && parametros["IdDetalleAgenda"].ToString() != "")
            {
                idDetalleA = Convert.ToInt32(parametros["IdDetalleAgenda"]);
            }
            if (parametros["EstatusAgenda"].ToString() == "REP" && idDetalleA > 0)
            {
                if (idDetalleA != itemAgendaDetalle)
                {
                    var paramsId = new Dictionary<string, object>();
                    paramsId.Add("IdOld", idDetalleA);
                    paramsId.Add("IdNew", itemAgendaDetalle);
                    int valorPath = await this.dao.updateEntityId(paramsId);
                }
            }
            

            retValue.EstatusAgenda = estatusAgenda;
            retValue.Estado = m.Kontrol.KontrolEstadosEnum.Exitoso;
            retValue.IdExpediente = idCliente;
            retValue.IdAgendaDetalle = itemAgendaDetalle;
            retValue.ID = Convert.ToInt32(idAgendaCabeceraNueva);
            if (parametros["EstatusAgenda"].ToString() == "ATE" && parametros["tipoAgendaCLave"].ToString() == "EntregaVivienda")
            {
                try
                {
                    await this.EnviarCorreoEntregaCliente(idCliente);
                }
                catch (Exception ex) { }
                //
            }
            if (parametros["EstatusAgenda"].ToString() == "ATE" && parametros["tipoAgendaCLave"].ToString() == "CompromisoConstruccion")
            {
                try
                {
                    // await this.EnviarCorreoEquipamientoUbicacion(idCliente); Enviar correo equipamiento
                }
                catch (Exception ex) { }
                //
            }
            return retValue;
        }

        public async Task<int> ValidatePlanificacion(DateTime fechaInicio, DateTime fechaFin, int idUsuario, List<dynamic> items, string tipoAgenda)
        {
            try
            {
                var valorRetorno = 0;
                foreach (var p in items)
                {
                    var parametros = new Dictionary<string, object>();
                    parametros.Add("FechaInicio", fechaInicio);
                    parametros.Add("FechaFin", fechaFin);
                    parametros.Add("IdUsuario", idUsuario);
                    parametros.Add("IdExpediente", p.IdExpediente);
                    parametros.Add("TipoAgenda", tipoAgenda);
                    //validacion 1
                    parametros.Remove("OperacionEspecificaSP");
                    parametros.Add("OperacionEspecificaSP", "NO-REPETIR-PLANIFICACION");
                    int retValidacion = await this.dao.GetPeriodoDetalleDisponible(parametros);
                    if (retValidacion > 0)
                    {
                        base.SetReturnInfo(2, "La ubicación ya se encuentra Planificada, por favor, actualice la información");
                        valorRetorno = -1;
                        break;
                    }
                }

                return valorRetorno;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> ValidateBloquesFechas(DateTime fechaInicio, DateTime fechaFin, int idUsuario, int idExpediente, string tipoAgenda)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("FechaInicio", fechaInicio);
                parametros.Add("FechaFin", fechaFin);
                parametros.Add("IdUsuario", idUsuario);
                parametros.Add("IdExpediente", idExpediente);
                parametros.Add("TipoAgenda", tipoAgenda);

                if(tipoAgenda == "FechaConstruccion")
                {
                    // parametros.Remove("@IdTipoAgd");
                    parametros.Add("IdTipoAgd", 1041);
                }
              
                //validacion 1
                parametros.Remove("OperacionEspecificaSP");
                parametros.Add("OperacionEspecificaSP", "NO-PERMITIR-FECHA-MENOR-QUE");
                int retValidacion = await this.dao.GetPeriodoDetalleDisponible(parametros);
                if (retValidacion > 0)
                {
                    base.SetReturnInfo(2, "La Fecha de entrega, no puede ser menor a la planificada para la Construcción");
                    return -1;
                }

                //validación 2
                parametros.Remove("OperacionEspecificaSP");
                parametros.Add("OperacionEspecificaSP", "NO-REPETIR-FECHA-INICIO");
                retValidacion = await this.dao.GetPeriodoDetalleDisponible(parametros);
                if (retValidacion > 0)
                {
                    base.SetReturnInfo(2, "La Fecha Inicio [" + fechaInicio + "] ya esta configurada");
                    return -1;
                }

                //validacion 3
                parametros.Remove("OperacionEspecificaSP");
                parametros.Add("OperacionEspecificaSP", "NO-REPETIR-FECHA-FIN");
                retValidacion = await this.dao.GetPeriodoDetalleDisponible(parametros);
                if (retValidacion > 0)
                {
                    base.SetReturnInfo(2, "La Fecha Fin [" + fechaFin + "] ya esta configurada");
                    return -1;
                }

                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<m.SCV.Interfaces.IAgendaContratista> SaveDetProgContratista(m.SCV.Interfaces.IAgendaContratistaDetalle item)
        {
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistas>();
            var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var daoContratista = Get<d.SCV.Interfaces.IContratistas>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var retValue = Get<m.SCV.Interfaces.IAgendaContratista>();

            try
            {
                var bpEstatusAgenda = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var currentEstatus = Get<m.Kontrol.Interfaces.IItemGeneral>();
                var agenda = item.OrdenTrabajo.Agenda;
                var agendaDetalle = item.OrdenTrabajo.AgendaDetalle;
                var savedAgenda = daoAgenda.GetById((int)agenda.ID);

                BeginTransaction();

                switch (item.OrdenTrabajo.Agenda.EstatusAgenda.Clave)

                {
                    case "ATE":
                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "ATE");
                        agenda.Estado = item.OrdenTrabajo.AgendaDetalle.ID == null || item.OrdenTrabajo.AgendaDetalle.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        agenda.IdEstatusAgenda = (int)currentEstatus.ID;
                        agenda.IdModificadoPor = base.getUserId();
                        agenda.Modificado = DateTime.UtcNow;
                        agenda.Version = savedAgenda.Result.Version;
                        agenda.Changed("IdEstatusAgenda", true);
                        agenda.Changed("IdModificadoPor", true);
                        agenda.Changed("Modificado", true);
                        agenda.Changed("IdMotivo", true);
                        agenda.Changed("Observaciones", true);

                        await daoAgenda.SaveEntity(agenda, false);
                        await this.UpdatePlanificacion((int)item.IdOrdenTrabajo, null, item, "ATE");
                        break;
                    case "REP":

                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "REP");
                       
                        agenda.Estado = item.OrdenTrabajo.AgendaDetalle.ID == null || item.OrdenTrabajo.AgendaDetalle.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        agenda.IdEstatusAgenda = (int)currentEstatus.ID;
                        agenda.IdModificadoPor = base.getUserId();
                        agenda.Modificado = DateTime.UtcNow;
                        agenda.Version = savedAgenda.Result.Version;
                        agenda.Changed("IdEstatusAgenda", true);
                        agenda.Changed("IdModificadoPor", true);
                        agenda.Changed("Modificado", true);
                        agenda.Changed("IdMotivo", true);
                        agenda.Changed("Observaciones", true);

                        var AgendaContratistaVerificar = Get<m.SCV.Interfaces.IAgendaContratista>();
                        AgendaContratistaVerificar.FechaInicio = agenda.FechaInicio;
                        AgendaContratistaVerificar.FechaFin = agenda.FechaFin;
                        AgendaContratistaVerificar.IdResponsableDictamen = item.OrdenTrabajo.IdCat.Value;

                        var valido = await daoAgenda.VerificarFechasAgendaContratista(AgendaContratistaVerificar);
                        if (valido != 1)
                        {
                            base.SetReturnInfo(2, "No se pudo guardar, El usuario no tiene disponibilidad en el rango de Fecha seleccionado.");
                            return null;
                        }

                        await daoAgenda.SaveEntity(agenda, false);
                        var referencia = await daoAgenda.GetById((int)agenda.ID);

                        // Nueva agenda de la reprogramacion
                        var newDetalle = Get<m.SCV.Interfaces.IAgendaContratistaDetalle>();
                        newDetalle.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        newDetalle.IdOrdenTrabajo = item.IdOrdenTrabajo;
                        newDetalle.OrdenTrabajo = item.OrdenTrabajo;
                        newDetalle.IdAgendaPadre = (int)agenda.ID;
                        newDetalle.IdUbicacion = item.IdUbicacion;

                        var newAgenda = Get<m.SCV.Interfaces.IAgendaContratista>();
                        newAgenda.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        newAgenda.FechaInicio = agenda.FechaInicio;
                        newAgenda.FechaFin = agenda.FechaFin;
                        newAgenda.IdTipoAgenda = (int)agenda.TipoAgenda.ID;
                        newAgenda.TipoAgenda = agenda.TipoAgenda;
                        newAgenda.IdLocalidad = referencia.IdLocalidad;
                        newAgenda.Localidad = referencia.Localidad;
                        newAgenda.Geolocalizacion = referencia.Geolocalizacion;
                        newAgenda.IdUsuarioAsignado = agenda.IdUsuarioAsignado;
                        newAgenda.OrdenesTrabajo = new List<m.SCV.Interfaces.IAgendaContratistaDetalle>();
                        newAgenda.OrdenesTrabajo.Add(newDetalle);
                        newAgenda.IdPlaza = item.Ubicacion.IdPlaza;
                        newAgenda.ProcesoEjecutado = "Reprogramación";
                        newAgenda.id_identificador_cc = item.Ubicacion.IdPlaza;
                        newAgenda.IdAgendaPadre = (int)agenda.ID;
                        newAgenda.IdResponsableDictamen = item.OrdenTrabajo.IdCat.Value;
                        retValue = await this.SaveAgendaContratista(newAgenda);
                        break;
                    case "SEG":
                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "ATE");
                        agenda.Estado = item.OrdenTrabajo.AgendaDetalle.ID == null || item.OrdenTrabajo.AgendaDetalle.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        agenda.IdEstatusAgenda = (int)currentEstatus.ID;
                        agenda.IdModificadoPor = base.getUserId();
                        agenda.Modificado = DateTime.UtcNow;
                        agenda.Version = savedAgenda.Result.Version;
                        agenda.Changed("IdEstatusAgenda", true);
                        agenda.Changed("IdModificadoPor", true);
                        agenda.Changed("Modificado", true);
                        agenda.Changed("IdMotivo", true);

                        // Graba en AgendaEntVivienda
                        await daoAgenda.SaveEntity(agenda, false);
                        referencia = await daoAgenda.GetById((int)agenda.ID);

                        // Graba en Agenda "MASTER"
                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "SEG");
                        newAgenda = Get<m.SCV.Interfaces.IAgendaContratista>();
                        newAgenda.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        newAgenda.IdEstatus = 13;//estatus.IdEstatus;
                        newAgenda.FechaInicio = agenda.FechaInicio;
                        newAgenda.FechaFin = agenda.FechaFin;
                        newAgenda.Descripcion = item.OrdenTrabajo.AgendaDetalle.Observaciones;
                        newAgenda.IdTipoAgenda = (int)agenda.TipoAgenda.ID;
                        newAgenda.TipoAgenda = agenda.TipoAgenda;
                        newAgenda.IdLocalidad = referencia.IdLocalidad;
                        newAgenda.Localidad = referencia.Localidad;
                        newAgenda.Geolocalizacion = referencia.Geolocalizacion;
                        newAgenda.IdPlaza = item.Ubicacion.IdPlaza;
                        newAgenda.ProcesoEjecutado = "Seguimiento";
                        newAgenda.id_identificador_cc = item.Ubicacion.IdPlaza;
                        newAgenda.IdAgendaPadre = (int)agenda.ID;
                        newAgenda.Changed("Estado", true);
                        newAgenda.Changed("IdEstatus", true);
                        newAgenda.Changed("FechaInicio", true);
                        newAgenda.Changed("FechaFin", true);
                        newAgenda.Changed("IdTipoAgenda", true);
                        newAgenda.Changed("TipoAgenda", true);
                        newAgenda.Changed("IdPlaza", true);
                        newAgenda.Changed("Geolocalizacion", true);
                        retValue = await daoAgenda.SaveEntity(newAgenda, false);

                        // Nueva en AgendaEntVivienda "DETALLE" para el seguimiento
                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "SEG");
                        newDetalle = Get<m.SCV.Interfaces.IAgendaContratistaDetalle>();
                        newDetalle.IdAgenda = retValue.ID;
                        newDetalle.Estado = item.OrdenTrabajo.AgendaDetalle.ID == null || item.OrdenTrabajo.AgendaDetalle.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        newDetalle.IdExpediente = item.OrdenTrabajo.ID; ///***
                        newDetalle.IdUsuarioAsignado = item.OrdenTrabajo.IdContratista;///***
                        newDetalle.IdEstatusAgenda = (int)currentEstatus.ID;
                        newDetalle.IdModificadoPor = base.getUserId();
                        newDetalle.Modificado = DateTime.UtcNow;
                        newDetalle.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        newDetalle.IdOrdenTrabajo = item.IdOrdenTrabajo;
                        newDetalle.OrdenTrabajo = item.OrdenTrabajo;
                        newDetalle.IdAgendaPadre = (int)agendaDetalle.ID;
                        newDetalle.IdEstatus = 13;
                        newDetalle.Observaciones = item.OrdenTrabajo.AgendaDetalle.Observaciones;
                        newDetalle.Changed("IdEstatusAgenda", true);
                        newDetalle.Changed("IdModificadoPor", true);
                        newDetalle.Changed("Modificado", true);
                        newDetalle.Changed("IdMotivo", true);
                        newDetalle.Changed("Observaciones", true);
                        //await daoAgendaDetalle.Save(newDetalle);

                        NotificacionCAT(newAgenda, newDetalle);

                        break;

                    case "CAN":
                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "CAN");
                        agenda.Estado = item.OrdenTrabajo.AgendaDetalle.ID == null || item.OrdenTrabajo.AgendaDetalle.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        agenda.IdEstatusAgenda = (int)currentEstatus.ID;
                        agenda.IdModificadoPor = base.getUserId();
                        agenda.Modificado = DateTime.UtcNow;
                        agenda.Changed("IdEstatusAgenda", true);
                        agenda.Changed("IdModificadoPor", true);
                        agenda.Changed("Modificado", true);
                        agenda.Changed("IdMotivo", true);
                        agenda.Changed("Observaciones", true);
                        agenda.Version = savedAgenda.Result.Version;
                        //var 
                        var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
                        var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBA>();
                        var daoOTR = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
                        var parametros = new Dictionary<string, object>();
                        parametros.Add("idOrdenTrabajo", item.IdOrdenTrabajo);
                        var CurrentOT = await daoOTR.GetById(item.IdOrdenTrabajo.Value);
                        var partidasOT = await daoOTD.GetAll(parametros);
                        CurrentOT.IdAgenda = null;
                        //agenda.Changed("IdAgenda", true);

                        //foreach (var p in partidasOT)
                        //{
                        //    var partida = await daoDET.GetById(p.IdPartida);
                        //    partida.EstatusPartidaValor = "X";
                        //    partida.Changed("EstatusPartidaValor", true);
                        //    await daoDET.SaveEntity(partida);
                        //}

                        await daoAgenda.SaveEntity(agenda, false);
                        await daoOTR.SaveEntity(CurrentOT, false);
                        //await this.UpdatePlanificacion((int)item.IdOrdenTrabajo, null, item, "CAN");
                        break;
                    default:
                        break;
                }

                Commit();

                retValue.Estado = m.Kontrol.KontrolEstadosEnum.Exitoso;
                retValue.EstatusAgenda = currentEstatus;

                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        public async Task SendNotificationNewKalendar(List<m.Kontrol.Interfaces.IUsuario> usuarios, string nombrePlantilla, string link, object obj, Dictionary<string, object> parametros)
        {
            var bpPlantillas = Get<p.Kontrol.Interfaces.IPlantillasMails>();
            var plantilla = await bpPlantillas.GetByClave(nombrePlantilla);

            var Marcadores = base.getMarcadoresValores(plantilla.Plantilla, obj);
            var MarcadoresTitulo = base.getMarcadoresValores(plantilla.Nombre, obj);
            
            string NombrePlantilla = plantilla.Nombre;
            foreach(var m in MarcadoresTitulo)
            {
                NombrePlantilla = NombrePlantilla.Replace(m.Key.ToString(), m.Value.ToString());
            }

            var bpNotificacion = Get<p.Kontrol.Interfaces.INotification>();
            var daoNotificacion = Get<d.Kontrol.Interfaces.INotification>();
            var notification = await bpNotificacion.GetNewEntity();
            await Assign(notification);
            notification.TrackChanges = true;
            notification.ID = -1;
            //notification.IdEntidad = user.ID;
            notification.Link = link;

            notification.Nombre = NombrePlantilla;
            notification.idplantilla = plantilla.ID.Value;
            //notification.Descripcion = plantilla.Plantilla_Contenido;
            notification.TipoEntidad = "U";
            List<string> excluirNotificacion = new List<string>();
            excluirNotificacion.Add("Folio");
            excluirNotificacion.Add("Ubicacion");
            var not = await daoNotificacion.SaveEntity(notification,false,false,excluirNotificacion);
            //var not = await bpNotificacion.Save(notification);
            
            var bpNotificacionMarcador = Get<p.Kontrol.Interfaces.INotificacionMarcador>();
            var daoNotificacionMarcador = Get<d.Kontrol.Interfaces.INotificacionMarcadores>();
            var bpNotificacionUsuario = Get<p.Kontrol.Interfaces.INotificacionUsuario>();
            var daoNotificacionUsuario = Get<d.Kontrol.Interfaces.INotificacionUsuario>();
            foreach (var m in Marcadores)
            {
                var notmar = await bpNotificacionMarcador.GetNewEntity(); 
                await Assign(notmar);
                
                notmar.idnotificacion = not.ID.Value;
                notmar.marcador = m.Key.ToString();
                notmar.valor = m.Value.ToString();
                List<string> excluir = new List<string>();
                excluir.Add("Clave");
                excluir.Add("Nombre");
                excluir.Add("Creado");
                excluir.Add("Modificado");
                excluir.Add("IdEstatus");
                excluir.Add("ModificadoPor");
                excluir.Add("CreadoPor");
                excluir.Add("IdModificadoPor");
                excluir.Add("IdCreadoPor");
                await daoNotificacionMarcador.SaveEntity(notmar, false, false,excluir);
                //await bpNotificacionMarcador.Save(notmar);
            }
            
            foreach(var u in usuarios)
            {
                if(u.Email != null)
                {
                    var notusu = await bpNotificacionUsuario.GetNewEntity();
                    notusu.idnotificacion = not.ID.Value;
                    notusu.num = u.ID.Value;
                    List<string> excluir = new List<string>();
                    excluir.Add("Clave");
                    excluir.Add("Nombre");
                    excluir.Add("Creado");
                    excluir.Add("Modificado");
                    excluir.Add("IdEstatus");
                    excluir.Add("ModificadoPor");
                    excluir.Add("CreadoPor");
                    excluir.Add("IdModificadoPor");
                    excluir.Add("IdCreadoPor");
                    await daoNotificacionUsuario.SaveEntity(notusu, false, false, excluir);
                }
               
            }

        }

        public Dictionary<string, object> getMarcadoresValores(string contenido,dynamic obj)
        {
            dynamic valores = JsonConvert.DeserializeObject(JsonConvert.SerializeObject(obj));
            Regex rx = new Regex(@"@@.*?@@", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            MatchCollection matches = rx.Matches(contenido);
            var ListaMarcadorValor= new Dictionary<string, object>();
            foreach (var m in matches)
            {
                var key = m.ToString();
                var keymod = key.Replace("@@", "");

                var arr = keymod.Split('.');
                dynamic valor = null;

                foreach (var p in arr)
                {
                    if (valor == null)
                    {
                        valor = valores[p];
                    }
                    else
                    {
                        valor = valor[p];
                    }
                }
                ListaMarcadorValor.Add(key, valor.ToString());
            }
            return ListaMarcadorValor;
        }

        public async Task SendNotificationChangeAgenda(List<m.Kontrol.Interfaces.IUsuario> usuarios, string nombrePlantilla, string link, object obj, Dictionary<string, object> parametros)
        {

            var bpPlantillas = Get<p.Kontrol.Interfaces.IPlantillasMails>();
            var plantilla = await bpPlantillas.GetByClave(nombrePlantilla);

            var Marcadores = this.getMarcadoresValores(plantilla.Plantilla, obj);
            var MarcadoresTitulo = this.getMarcadoresValores(plantilla.Nombre, obj);

            string NombrePlantilla = plantilla.Nombre;
            foreach (var m in MarcadoresTitulo)
            {
                NombrePlantilla = NombrePlantilla.Replace(m.Key.ToString(), m.Value.ToString());
            }

            var bpNotificacion = Get<p.Kontrol.Interfaces.INotification>();
            var daoNotificacion = Get<d.Kontrol.Interfaces.INotification>();
            var notification = await bpNotificacion.GetNewEntity();
            await Assign(notification);
            notification.TrackChanges = true;
            notification.ID = -1;
            //notification.IdEntidad = user.ID;
            notification.Link = link;

            notification.Nombre = NombrePlantilla;
            notification.idplantilla = plantilla.ID.Value;
            //notification.Descripcion = plantilla.Plantilla_Contenido;
            notification.TipoEntidad = "U";
            var not = await daoNotificacion.SaveEntity(notification, false, false);
            //var not = await bpNotificacion.Save(notification);

            var bpNotificacionMarcador = Get<p.Kontrol.Interfaces.INotificacionMarcador>();
            var daoNotificacionMarcador = Get<d.Kontrol.Interfaces.INotificacionMarcadores>();
            var bpNotificacionUsuario = Get<p.Kontrol.Interfaces.INotificacionUsuario>();
            var daoNotificacionUsuario = Get<d.Kontrol.Interfaces.INotificacionUsuario>();
            foreach (var m in Marcadores)
            {
                var notmar = await bpNotificacionMarcador.GetNewEntity();
                await Assign(notmar);

                notmar.idnotificacion = not.ID.Value;
                notmar.marcador = m.Key.ToString();
                notmar.valor = m.Value.ToString();
                List<string> excluir = new List<string>();
                excluir.Add("Clave");
                excluir.Add("Nombre");
                excluir.Add("Creado");
                excluir.Add("Modificado");
                excluir.Add("IdEstatus");
                excluir.Add("ModificadoPor");
                excluir.Add("CreadoPor");
                excluir.Add("IdModificadoPor");
                excluir.Add("IdCreadoPor");
                await daoNotificacionMarcador.SaveEntity(notmar, false, false, excluir);
                //await bpNotificacionMarcador.Save(notmar);
            }

            foreach (var u in usuarios)
            {
                if (u.Email != null)
                {
                    var notusu = await bpNotificacionUsuario.GetNewEntity();
                    notusu.idnotificacion = not.ID.Value;
                    notusu.num = u.ID.Value;
                    List<string> excluir = new List<string>();
                    excluir.Add("Clave");
                    excluir.Add("Nombre");
                    excluir.Add("Creado");
                    excluir.Add("Modificado");
                    excluir.Add("IdEstatus");
                    excluir.Add("ModificadoPor");
                    excluir.Add("CreadoPor");
                    excluir.Add("IdModificadoPor");
                    excluir.Add("IdCreadoPor");
                    await daoNotificacionUsuario.SaveEntity(notusu, false, false, excluir);
                }

            }


        }

        public async Task<m.SCV.Interfaces.IOrdenTrabajoRUBA> UpdatePlanificacion(int idOrden, m.SCV.Interfaces.IAgendaContratista agenda, m.SCV.Interfaces.IAgendaContratistaDetalle agendaDetalle, string agendaEstatus)
        {
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpREP = Get<p.SCV.Interfaces.IReportesFallas>();
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBA>();
            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            var daoREP = Get<d.SCV.Interfaces.IReportesFallas>();
            var daoPRE = Get<d.SCV.Interfaces.IPrereportes>();

            m.Kontrol.Interfaces.IItemGeneral estatusOT = null;
            m.SCV.Interfaces.IOrdenTrabajoRUBA model = null;
            m.SCV.Interfaces.IOrdenTrabajoRUBA retValue = null;
            m.SCV.Interfaces.IReporteFalla reporte = null;

            try
            {
                switch (agendaEstatus)
                {
                    case "ACT":
                    case "REP":
                        estatusOT = await bpCGV.Get("SPVESTATUSOT", "N");
                        model = await daoOT.GetById(idOrden);
                        model.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        model.IdAgenda = (int)agenda.ID;
                        model.IdEstatusOrdenTrabajo = (int)estatusOT.ID;
                        model.IdModificadoPor = base.getUserId();
                        model.Modificado = DateTime.UtcNow;
                        model.Changed("IdAgenda", true);
                        model.Changed("IdEstatusOrdenTrabajo", true);
                        model.Changed("IdModificadoPor", true);
                        model.Changed("Modificado", true);
                        retValue = await daoOT.SaveEntity(model);

                        //var prefolio = await daoPRE.GetByFolio(model.IdReporte);
                        //int? id_prefolio = prefolio != null ? prefolio.ID : null;

                        //if (id_prefolio > 0)
                        //{
                        //    var pprtNotificacion = await daoPRE.GetById((int)id_prefolio);
                        //    dynamic obj = new ExpandoObject();
                        //    obj.pre_folio = pprtNotificacion.IdPrereporte;
                        //    obj.client_code = pprtNotificacion.Cliente.ID;
                        //    obj.folio = pprtNotificacion.IdReporte;
                        //    obj.date = DateTime.UtcNow.ToString("yyyy'-'MM'-'dd HH:mm:ss");
                        //    obj.appointment_date = agenda.FechaInicio.ToString("yyyy'-'MM'-'dd HH:mm:ss");

                        //    List<dynamic> listOfx = new List<dynamic>();
                        //    var estatusNotificacion = "";

                        //    var parametrosOT = new Dictionary<string, object>();
                        //    parametrosOT.Add("idOrdenTrabajo", idOrden);
                        //    var partidasOTNotifi = await daoOTD.GetAll(parametrosOT);
                        //    if (partidasOTNotifi != null && partidasOTNotifi.Count > 0)
                        //    {
                        //        foreach (var p in partidasOTNotifi)
                        //        {
                        //            estatusNotificacion = "appointment";
                        //            dynamic x = new ExpandoObject();
                        //            x.issue_number = p.Partida.Partida;
                        //            x.status = estatusNotificacion;
                        //            x.location = p.Partida.UbicacionFalla.Descripcion;
                        //            x.description = p.Partida.Observaciones;

                        //            listOfx.Add(x);
                        //        }
                        //    }
                        //    obj.issues = listOfx;
                        //    await bpREP.RequestURI("report/status", obj);
                        //}

                        break;
                    case "ATE":
                        estatusOT = await bpCGV.Get("SPVESTATUSOT", "E");
                        model = await daoOT.GetById(idOrden);
                        model.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        model.FechaInicio = agendaDetalle.OrdenTrabajo.FechaInicio;
                        model.FechaFin = agendaDetalle.OrdenTrabajo.FechaFin;
                        if (model.FechaFin != null)
                            model.DiasEstimadoCulminacion = ((DateTime)model.FechaFin - (DateTime)model.FechaInicio).Days;
                        model.IdEstatusOrdenTrabajo = (int)estatusOT.ID;
                        model.Autorizada = true;
                        model.IdModificadoPor = base.getUserId();
                        model.Modificado = DateTime.UtcNow;
                        model.Changed("FechaInicio", true);
                        model.Changed("FechaFin", true);
                        model.Changed("DiasEstimadoCulminacion", true);
                        model.Changed("IdEstatusOrdenTrabajo", true);
                        model.Changed("Autorizada", true);
                        model.Changed("IdModificadoPor", true);
                        model.Changed("Modificado", true);
                        retValue = await daoOT.SaveEntity(model);

                        //buscar las partidas de la orden de trabajo y actualizar fechas estimadas
                        var parametros = new Dictionary<string, object>();
                        parametros.Add("idOrdenTrabajo", idOrden);

                        var partidasOT = await daoOTD.GetAll(parametros);
                        if (partidasOT != null && partidasOT.Count > 0)
                        {
                            foreach (var pot in partidasOT)
                            {
                                var partida = await daoDET.GetById(pot.IdPartida);
                                partida.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                partida.FechaInicioProgramacion = model.FechaInicio;
                                partida.FechaTerminoProgramacion = model.FechaFin;
                                partida.EstatusPartidaValor = "L";
                                partida.IdModificadoPor = base.getUserId();
                                partida.Modificado = DateTime.UtcNow;
                                partida.Changed("FechaInicioProgramacion", true);
                                partida.Changed("FechaTerminoProgramacion", true);
                                partida.Changed("EstatusPartidaValor", true);
                                partida.Changed("IdModificadoPor", true);
                                partida.Changed("Modificado", true);
                                await daoDET.SaveEntity(partida);
                            }
                        }
    
                        var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistas>();
                        var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();

                        var paramAgenda = new Dictionary<string, object>();
                        paramAgenda.Add("IdOT", agendaDetalle.IdOrdenTrabajo);
                        //var resp = await this.dao.CerrarReservas(paramAgenda);
                        
                        //var agendaDetalle = item.OrdenTrabajo.AgendaDetalle;
                        
                        //actualizar reporte a En Proceso y usuario que inició el proceso
                        reporte = await daoREP.GetById(model.IdReporte);
                        reporte.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        reporte.Modificado = DateTime.UtcNow;
                        reporte.IdModificadoPor = base.getUserId();
                        reporte.Changed("Modificado", true);
                        reporte.Changed("IdModificadoPor", true);

                        if (reporte.IdUsuarioProcesoInicio == null)
                        {
                            reporte.IdUsuarioProcesoInicio = base.getUserId();
                            reporte.Changed("IdUsuarioProcesoInicio", true);
                        }

                        int? id = reporte.IdFolio;
                        reporte.IdFolio = reporte.ID;
                        reporte.ID = id;

                        await daoREP.SaveEntity(reporte, false, false);

                        break;
                    case "CAN":
                        estatusOT = await bpCGV.Get("SPVESTATUSOT", "C");
                        model = await daoOT.GetById(idOrden);
                        model.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        model.IdEstatusOrdenTrabajo = (int)estatusOT.ID;
                        model.IdModificadoPor = base.getUserId();
                        model.Modificado = DateTime.UtcNow;
                        model.Changed("IdEstatusOrdenTrabajo", true);
                        model.Changed("IdModificadoPor", true);
                        model.Changed("Modificado", true);
                        retValue = await daoOT.SaveEntity(model);

                        var paramsPartidas = new Dictionary<string, object>();
                        paramsPartidas.Add("idOrdenTrabajo", idOrden);

                        var OtDetalles = await daoOTD.GetAll(paramsPartidas);

                        foreach(var d in OtDetalles)
                        {
                            var partidaFolio = await daoDET.GetById(d.ID.Value);
                            partidaFolio.EstatusPartidaValor = "X";
                            partidaFolio.Changed("EstatusPartidaValor", true);
                            await daoDET.SaveEntity(partidaFolio);
                        }

                        reporte = await daoREP.GetById(model.IdReporte);
                        await bpREP.TryCerrarReporte(reporte, "T", true,false,null,null);

                        break;
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //DICTAMEN
        public async Task<m.SCV.Interfaces.IReporteDictamen> UpdatePlanificacionDictamen(int idDictamen, m.SCV.Interfaces.IAgendaDictamen agenda, m.SCV.Interfaces.IAgendaDictamenDetalle agendaDetalle, string agendaEstatus)
        {
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoOT = Get<d.SCV.Interfaces.IReportesDictamenes>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasDictamenes>();
            var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var bpEstatusAgenda = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            m.SCV.Interfaces.IReporteDictamen model = null;
            m.SCV.Interfaces.IReporteDictamen retValue = null; // IOrdenTrabajoRUBA
            var savedAgenda = daoAgenda.GetById((int)agenda.ID);

            try
            {
                switch (agendaEstatus)
                {
                    case "ACT":
                        model = await daoOT.GetById(idDictamen);
                        model.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        model.IdAgenda = (int)agenda.ID;
                        model.IdModificadoPor = base.getUserId();
                        model.Modificado = DateTime.UtcNow;
                        model.Changed("IdAgenda", true);
                        model.Changed("IdModificadoPor", true);
                        model.Changed("Modificado", true);
                        retValue = await daoOT.SaveEntity(model);
                        break;
                    case "REP":

                        var currentEstatus = Get<m.Kontrol.Interfaces.IItemGeneral>();
                        currentEstatus = await bpEstatusAgenda.Get("AgendaEstatus", "REP");

                        model = await daoOT.GetById(idDictamen);

                        agenda.Estado = model.AgendaDetalle.ID == null || model.AgendaDetalle.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
                        agenda.IdEstatusAgenda = (int)currentEstatus.ID;
                        agenda.IdModificadoPor = base.getUserId();
                        agenda.Modificado = DateTime.UtcNow;
                        agenda.Version = savedAgenda.Result.Version;
                        agenda.Changed("IdEstatusAgenda", true);
                        agenda.Changed("IdModificadoPor", true);
                        agenda.Changed("Modificado", true);
                        agenda.Changed("IdMotivo", true);
                        agenda.Changed("Observaciones", true);

                        await daoAgenda.SaveEntity(agenda, false);

                        //var referencia = await daoAgenda.GetById((int)agenda.ID);

                        //// Nueva agenda de la reprogramacion
                        //var estatusAgenda = await bpCGV.Get("AgendaEstatus", "ACT");
                        //var estatus = await bpCGV.Get("ESTATUS", "A");

                        //var newAgenda = Get<m.SCV.Interfaces.IAgendaDictamen>();
                        ////retValue = await daoAgenda.Save(newAgenda);
                        //int idAgenda = retValue.ID ?? 0;

                        //var newDetalle = Get<m.SCV.Interfaces.IAgendaDictamenDetalle>();
                        //newDetalle.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        //newDetalle.IdAgenda = idAgenda;
                        //newDetalle.ID = null;
                        //newDetalle.IdEstatusAgenda = (int)estatusAgenda.ID;
                        //newDetalle.IdEstatus = model.IdEstatus;
                        //newDetalle.IdCreadoPor = base.getUserId();
                        //newDetalle.IdModificadoPor = base.getUserId();
                        //newDetalle.IdExpediente = (int)idDictamen;
                        //newDetalle.Reserva = false;
                        //newDetalle.IdUsuarioAsignado = model.ResponsableDictamen.ID;

                        /*var newAgenda = Get<m.SCV.Interfaces.IAgendaContratista>();
                        newAgenda.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        newAgenda.FechaInicio = agenda.FechaInicio;
                        newAgenda.FechaFin = agenda.FechaFin;
                        newAgenda.IdTipoAgenda = (int)agenda.TipoAgenda.ID;
                        newAgenda.TipoAgenda = agenda.TipoAgenda;
                        newAgenda.IdLocalidad = referencia.IdLocalidad;
                        newAgenda.Localidad = referencia.Localidad;
                        newAgenda.Geolocalizacion = referencia.Geolocalizacion;

                        retValue = await this.SaveAgendaContratista(newAgenda);*/

                        break;
                    case "ATE":
                        break;
                    case "CAN":
                        break;
                }
                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IOrdenTrabajoRUBA> DeleteCitaSeguimiento(m.SCV.Interfaces.IAgendaContratista item)
        {
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
            var daoAEV = Get<EK.Datos.Kontrol.Interfaces.IAgendaEntVivienda>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistas>();
            //m.SCV.Interfaces.IAgendaContratista retValue = null;
            m.SCV.Interfaces.IOrdenTrabajoRUBA retValue = null;

            try
            {
                BeginTransaction(true);

                int agendaId = item.ID.Value;
                int agendaEntViviendaId = item.IdAgendaDetalle;
                int expedienteId = item.IdExpediente;

                // Borrar seguimiento en la agenda
                await daoAgenda.Delete(agendaId);

                // Boarrar seguimiento en la agenda detalle
                await daoAEV.Delete(agendaEntViviendaId);

                Commit();

                retValue = await daoOT.GetById(expedienteId);
                retValue.Estado = m.Kontrol.KontrolEstadosEnum.Exitoso;
                return retValue;

            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }
    }
}
