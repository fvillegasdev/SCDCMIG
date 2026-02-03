using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;
using System.Collections.Generic;
using EK.Modelo.Kontrol.EKCONNECT;
using System;
using System.Dynamic;
using Newtonsoft.Json.Linq;
using System.Configuration;
using System.Net.Http.Headers;
using System.Net.Http;
using System.IO;
using System.Linq;
using Microsoft.AspNet.SignalR;

namespace EK.Procesos.SCV.SPV.EKCONNECT
{
    public class EKCMensajes : p.Kontrol.BPBase<m.SCV.Interfaces.EKCONNECT.IEKCMensajes, d.SCV.Interfaces.EKCONNECT.IEKCMensajes>, p.SCV.Interfaces.EKCONNECT.IEKCMensajes
    {
        public EKCMensajes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.EKCONNECT.IEKCMensajes dao)
        : base(factory, dao, "EKCMensajes")
        {
        }
        public async Task<List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>> getByChatId(Dictionary<string, object> parametros)
        {
            return await this.dao.getByChatId(parametros);
        }
        //public async Task<int> recibir(Dictionary<string, object> parametros)
        public async Task<int> LogErrors(Dictionary<string, object> parametros)
        {
           
            var res = await this.dao.LogErrors(parametros);
            return res;
        }

        public async Task<m.SCV.Interfaces.EKCONNECT.IEKCMensajes> recibir(EKCRequestData parametros)
        {
            var par = new Dictionary<string, object>();
            par.Add("action", "RECIBIR");
            par.Add("from", parametros.from); //Se obtiene del objeto chat
            par.Add("mensaje", parametros.text.body);
            par.Add("uuid", Guid.NewGuid().ToString());
            par.Add("idWA", parametros.id);
            par.Add("claveCanal", parametros.claveCanal);
            par.Add("tipoSalida", "R");
            par.Add("tipoMensaje", "TXT");
            var res = await this.dao.SaveMensaje(par);
            m.SCV.Interfaces.EKCONNECT.IEKCMensajes _mensaje = null;
            if (res > 0)
            {
                var paramCM = new Dictionary<string, object>();
                paramCM.Add("action", "SELECT_BY_MENSAJEID");
                paramCM.Add("idMensaje", res);
                _mensaje = await this.dao.getByMensajeId(paramCM);
            }
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            hubContext.Clients.All.ReceiveMessage("userSingalR", _mensaje);
            return _mensaje;
        }

        public async Task<int> recibirBase64EKC(ImageBase64 parametros)
        {
            try
            {
                BeginTransaction(true);
                var daoC = Get<d.SCV.Interfaces.EKCONNECT.IEKCChats>();

                var parammsg = new Dictionary<string, object>();
                parammsg.Add("action", "SELECT_BY_IDWA");
                parammsg.Add("idWA", parametros.IdWa);
                var m = await this.dao.getByIdWA(parammsg);
                if (m == null) // Si no existe lo generamos
                {
                    var isImage = parametros.MimeType.Contains("image");
                    //var bpChatHub = Get<p.EKC.ChatHub>();
                    //var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ITiposEntidad>();
                    //var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var bpFiles = Get<p.Kontrol.Interfaces.IKontrolFiles>();
                    var bytes = Convert.FromBase64String(parametros.Base64);
                    var image = Get<m.Kontrol.Interfaces.IKontrolFile>();
                    //var estatus = await bpEstatus.Get("ESTATUSCHATEKC", "ENV");
                    //var bpMensajes = Get<p.EKC.Interfaces.IEKCMensajes>();
                    var par = new Dictionary<string, object>();
                    par.Add("action", "GET_OR_CREATE");
                    par.Add("contacto", parametros.From);
                    var chat = await daoC.getOrCreate(par);
                    var extension = "";

                    extension = parametros.FileName.Equals("") ? parametros.MimeType.Substring(parametros.MimeType.IndexOf("/") + 1) : Path.GetExtension(parametros.FileName).Replace(".", "");
                    parametros.FileName = parametros.FileName.Equals("") ? string.Join("", parametros.Id, ".", extension) : parametros.FileName;

                    using (MemoryStream stream = new MemoryStream(bytes))
                    {
                        var documento = Get<m.Kontrol.Interfaces.IKontrolDocument>();
                        documento.Content = stream;
                        documento.ContentType = parametros.MimeType;
                        documento.Extension = extension;
                        documento.Nombre = parametros.FileName;
                        documento.Size = bytes.Length;
                        var tipo = isImage ? "Images" : "anexos";
                        image = await bpFiles.CreateDocumento("ChatEKCloudConnect", chat.ID.Value, tipo, "EKC", documento);
                    }
                    //var canal = await bpEstatus.Get("CANALCHATEKC", "WA");
                    string claveTipoMensage = isImage ? "IMAGE" : "FILE";

                    //var tipoMensaje = await bpEstatus.Get("TIPOMSJEKC", claveTipoMensage);
                    //var mMensaje = Get<m.EKC.Interfaces.IEKCMensajes>();

                    //mMensaje.ID = -1;
                    //mMensaje.IdChat = chat.ID.Value;
                    //mMensaje.UUId = Guid.NewGuid().ToString();
                    //mMensaje.IdTipoMensaje = tipoMensaje.ID.Value;
                    //mMensaje.IdTipoEntidadEmision = chat.IdTipoEntidad;
                    //mMensaje.IdEstatus = estatus.ID.Value;
                    //mMensaje.IdFileRef = image.ID.Value;
                    //mMensaje.IdEntidadEmision = chat.IdEntidad;
                    //mMensaje.IdWA = idWa;
                    //if (fromEkCloud)
                    //{
                    //    mMensaje.IdTipoEntidadEmision = chat.IdTipoEntidad;
                    //    mMensaje = await bpMensajes.SaveWithoutSession(mMensaje);
                    //}
                    //else
                    //{
                    //    var tipoEntidad = await bpTipoEntidad.GetByClave("usuarios");
                    //    mMensaje.IdTipoEntidadEmision = tipoEntidad.ID.Value;
                    //    mMensaje = await bpMensajes.Save(mMensaje);
                    //}
                    var parmsg = new Dictionary<string, object>();
                    parmsg.Add("action", "RECIBIR");
                    parmsg.Add("from", parametros.From); //Se obtiene del objeto chat
                    parmsg.Add("mensaje", "Archivo enviado.");
                    parmsg.Add("uuid", Guid.NewGuid().ToString());
                    parmsg.Add("idWA", parametros.IdWa);
                    parmsg.Add("claveCanal", "WA");
                    parmsg.Add("tipoSalida", "R");
                    parmsg.Add("tipoMensaje", claveTipoMensage);
                    var res = await this.dao.SaveMensaje(parmsg);
                   // 

                    Commit();
                    return res;
                    //bpChatHub.nuevoMensajeChatAbierto(mMensaje,chat.ID.Value,true, await this.getResponsableChat(chat));
                    //await this.DispatchMensajes(mMensaje, true, chat);

                } else
                {
                     return -10; //Mensaje ya guardado
                }
               
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }

        }

        public async Task<int> ReceiveUbicacionFromEKCC(UbicacionEKCData parametros)
        {
            try
            {
                BeginTransaction(true);
                //var daoM = Get<d.EKC.Interfaces.IEKCMensajes>();
                // var bpChatHub = Get<p.EKC.ChatHub>();
                var daoC = Get<d.SCV.Interfaces.EKCONNECT.IEKCChats>();

                var parammsg = new Dictionary<string, object>();
                parammsg.Add("action", "SELECT_BY_IDWA");
                parammsg.Add("idWA", parametros.idWa);
                var m = await this.dao.getByIdWA(parammsg);
                //var m = await daoM.GetByIdWA(idWa);
                if (m == null) // Si no existe lo generamos
                {
                    //var location = Get<m.EKC.Interfaces.Location>();
                    dynamic location = new ExpandoObject();
                    location.address = parametros.address;
                    location.longitude = parametros.longitude;
                    location.latitude = parametros.latitude;
                    location.name = parametros.name;
                    string claveTipoMensage = "UBICACION";


                    var pmsg = new Dictionary<string, object>();
                    pmsg.Add("action", "RECIBIR");
                    pmsg.Add("from", parametros.from); 
                    pmsg.Add("mensaje", Newtonsoft.Json.JsonConvert.SerializeObject(location));
                    pmsg.Add("uuid", Guid.NewGuid().ToString());
                    pmsg.Add("idWA", parametros.idWa);
                    pmsg.Add("claveCanal", "WA");
                    pmsg.Add("tipoSalida", "R");
                    pmsg.Add("tipoMensaje", claveTipoMensage);
                    var res = await this.dao.SaveMensaje(pmsg);

                    //var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    //var bpFiles = Get<p.Kontrol.Interfaces.IKontrolFiles>();
                    //var image = Get<m.Kontrol.Interfaces.IKontrolFile>();
                    //var bpMensajes = Get<p.EKC.Interfaces.IEKCMensajes>();
                    //var estatus = await bpEstatus.Get("ESTATUSCHATEKC", "ENV");

                    //var chat = await this.dao.GetConversation(from);


                    //var tipoMensaje = await bpEstatus.Get("TIPOMSJEKC", "UBICACION");
                    //var mMensaje = Get<m.EKC.Interfaces.IEKCMensajes>();

                    //mMensaje.ID = -1;
                    //mMensaje.IdChat = chat.ID.Value;
                    //mMensaje.Mensaje = Newtonsoft.Json.JsonConvert.SerializeObject(location);
                    //mMensaje.UUId = Guid.NewGuid().ToString();
                    //mMensaje.IdTipoMensaje = tipoMensaje.ID.Value;
                    //mMensaje.IdEntidadEmision = chat.IdEntidad;
                    //mMensaje.IdTipoEntidadEmision = chat.IdTipoEntidad;
                    //mMensaje.IdEstatus = estatus.ID.Value;
                    //mMensaje.IdWA = idWa;
                    //mMensaje = await bpMensajes.SaveWithoutSession(mMensaje);
                    Commit();
                    //bpChatHub.nuevoMensajeChatAbierto(mMensaje,chat.ID.Value,true, await this.getResponsableChat(chat));
                    //await this.DispatchMensajes(mMensaje, true, chat);
                    return res;
                } else
                {
                    return -10;
                }
                //return true;
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }

        }

        public async Task<m.SCV.Interfaces.EKCONNECT.IEKCMensajes> enviar(Dictionary<string, object> parametros)
        {

            //var bpChats = Get<EKCONNECT.EKCChats>();


            try
            {
              
                BeginTransaction(true);

                parametros.Add("uuid", Guid.NewGuid().ToString());
                parametros.Add("tipoMensaje", "TXT");

                //List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes> mensajes = new List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>();
                var _idMensaje = await this.dao.SaveMensaje(parametros);
                m.SCV.Interfaces.EKCONNECT.IEKCMensajes _mensaje = null;
                if (_idMensaje > 0)
                {
                    var paramCM = new Dictionary<string, object>();
                    paramCM.Add("action", "SELECT_BY_MENSAJEID");
                    paramCM.Add("idMensaje", _idMensaje);
                    _mensaje = await this.dao.getByMensajeId(paramCM);
                    //paramCM.Remove("action");
                    //paramCM.Add("action", "SELECT_BY_CHATID");
                    //paramCM.Add("IdChat", _mensaje.IdChat);
                    //mensajes = await this.dao.getByChatId(paramCM);
                }

                dynamic msg = new ExpandoObject();
                msg.RecipientPhoneNumber = parametros["from"];
                msg.Message = parametros["mensaje"];
                string rutaEndpoint = "whatsapp/SendWhatsAppTextMessage";
                //switch (chat.Canal.Clave)
                switch (parametros["claveCanal"])
                {
                    case "WA":
                        rutaEndpoint = "whatsapp/SendWhatsAppTextMessage";
                        break;
                    case "FB":
                    case "IG":
                        //var param = new Dictionary<string, object>() {
                        //    { "contacto", chat.Contacto } ,
                        //    { "sendMessage","ok"} };
                        //dynamic estatusChat = await this.GetChatEstatus(param);
                        //if (estatusChat.ID == 1)
                        //{
                        //msg.humanAgent = true;
                        //}
                        //var data = await this.getRecipientContact(chat);
                        // msg.RecipientPhoneNumber = data.userId;
                        // msg.PageId = data.pageId;
                        // msg.Medio = chat.Canal.Clave;
                        rutaEndpoint = "messenger/SendMessengerTextMessage";
                        break;
                }


                //se ENVIA EL MENSAJE AL ENDPOINT DE EKCONNECT, se registra el mensaje y 
                // de la respuesta tomamos el idwa y actualizamos el mensaje guardado en la base
                // de datos de ruba y le asignamos ese idWa

                //=================== DESCOMENTAR PARA PROBAR CONEXION CON EKCONNECT =======
                //var response = await this.Post(rutaEndpoint, msg);
                //JArray r = (JArray)response["messages"];
                //var idWA = r.FirstOrDefault()?["id"]?.Value<string>();
                //await this.dao.UdateIdWAMensaje(_idMensaje, idWA);
                var hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
                hubContext.Clients.All.ReceiveMessage("userSingalR", _mensaje);
                Commit();
                //await this.DispatchMensajes(item, false, chat);
                //bpChatHub.nuevoMensajeChatAbierto(item, chat.ID.Value, false, await this.getResponsableChat(chat));
                //bpChatHub.nuevoMensajeChatAbierto(item, chat.ID.Value, false,chat.IdCreadoPor.Value);
                // return mensajes;
                return _mensaje; // new List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>();
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("Error al checar estatus de la conversación.", ex);
            }
        }

        public  async Task<List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>> sendUbicacion(Dictionary<string, object> parametros)
        {
            //var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            //var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ITiposEntidad>();
            //var bpMensajes = Get<p.EKC.EKCMensajes>();
            //var estatusEnviado = await bpEstatus.Get("ESTATUSCHATEKC", "ENV");
            //var estatusRecibido = await bpEstatus.Get("ESTATUSCHATEKC", "RE");

            //var bpChatHub = Get<p.EKC.ChatHub>();

            try
            {
                if (parametros["mensaje"] != null)
                {
                    //string[] partes = item.Geolocalizacion.Split(',');

                    //BeginTransaction(true);
                    //var chat = await this.GetById(item.IdChat);
                    //item.Contacto = chat.Contacto;
                    //var tipoMensaje = await bpEstatus.Get("TIPOMSJEKC", "UBICACION");
                    //var mMensaje = Get<m.EKC.Interfaces.IEKCMensajes>();
                    //var tipoEntidad = await bpTipoEntidad.GetByClave("usuarios");

                    //var location = Get<m.EKC.Interfaces.Location>();
                    //location.address = item.Direccion;
                    //location.longitude = Double.Parse(partes[1]);
                    //location.latitude = Double.Parse(partes[0]);
                    //location.name = item.NombreDesarrollo;




                    //dynamic sendLocationMessageViewModel = new ExpandoObject();
                    //sendLocationMessageViewModel.RecipientPhoneNumber = chat.Contacto;
                    //sendLocationMessageViewModel.Nombre = item.NombreDesarrollo;
                    //sendLocationMessageViewModel.Message = "";
                    //sendLocationMessageViewModel.Latitude = Double.Parse(partes[0]);
                    //sendLocationMessageViewModel.Longitude = Double.Parse(partes[1]);
                    //sendLocationMessageViewModel.Direccion = item.Direccion;
                    //string rutaEndpoint = "whatsapp/SendWhatsAppLocationMessage";

                    //switch (chat.Canal.Clave)
                    //{
                    //    case "WA":
                    //        rutaEndpoint = "whatsapp/SendWhatsAppLocationMessage";
                    //        break;
                    //    case "FB":
                    //    case "IG":
                    //        var data = await this.getRecipientContact(chat);
                    //        sendLocationMessageViewModel.RecipientPhoneNumber = data.userId;
                    //        sendLocationMessageViewModel.PageId = data.pageId;
                    //        sendLocationMessageViewModel.Medio = chat.Canal.Clave;
                    //        rutaEndpoint = "messenger/SendWhatsAppLocationMessage";
                    //        break;
                    //}
                    ////Guardamos como enviado
                    //mMensaje.ID = -1;
                    //mMensaje.IdChat = chat.ID.Value;
                    //mMensaje.Mensaje = Newtonsoft.Json.JsonConvert.SerializeObject(location);
                    //mMensaje.UUId = Guid.NewGuid().ToString();
                    //mMensaje.IdTipoMensaje = tipoMensaje.ID.Value;
                    //mMensaje.IdEntidadEmision = base.getUserId();
                    //mMensaje.IdTipoEntidadEmision = tipoEntidad.ID.Value;
                    //mMensaje.IdEstatus = estatusEnviado.ID.Value;
                    //mMensaje = await bpMensajes.Save(mMensaje);
                    //bpChatHub.nuevoMensajeChatAbierto(mMensaje, chat.ID.Value, false, await this.getResponsableChat(chat));
                    //await this.DispatchMensajes(mMensaje, false, chat);

                    //var response = await this.Post(rutaEndpoint, sendLocationMessageViewModel);
                    //JArray r = (JArray)response["messages"];
                    //var idWA = r.FirstOrDefault()?["id"]?.Value<string>();
                    //mMensaje.IdEstatus = estatusRecibido.ID.Value;
                    //mMensaje.IdWA = idWA;
                    //mMensaje = await bpMensajes.Save(mMensaje);
                    ////bpChatHub.nuevoMensajeChatAbierto(mMensaje, chat.ID.Value, false, await this.getResponsableChat(chat));
                    //await this.DispatchMensajes(mMensaje, false, chat);

                    parametros.Add("uuid", Guid.NewGuid().ToString());
                    parametros.Add("tipoMensaje", "UBICACION");
                    //par.Add("idWA", parametros.id);
                    // par.Add("claveCanal", parametros.claveCanal);
                    // par.Add("tipoSalida", "S");
                    List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes> mensajes = new List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>();
                    var _idMensaje = await this.dao.SaveMensaje(parametros);
                    if (_idMensaje > 0)
                    {
                        var paramCM = new Dictionary<string, object>();
                        paramCM.Add("action", "SELECT_BY_MENSAJEID");
                        paramCM.Add("idMensaje", _idMensaje);
                        var _mensaje = await this.dao.getByMensajeId(paramCM);
                        paramCM.Remove("action");
                        paramCM.Add("action", "SELECT_BY_CHATID");
                        paramCM.Add("IdChat", _mensaje.IdChat);
                        mensajes = await this.dao.getByChatId(paramCM);
                    }

                    dynamic msg = new ExpandoObject();
                    msg.RecipientPhoneNumber = parametros["from"];
                    msg.Message = parametros["mensaje"];
                    //direccionamos hacia el endpoint correspondiente seg un el canal(WA,FB)
                    string rutaEndpoint = "whatsapp/SendWhatsAppTextMessage";
                    //switch (chat.Canal.Clave)
                    switch (parametros["claveCanal"])
                    {
                        case "WA":
                            rutaEndpoint = "whatsapp/SendWhatsAppTextMessage";
                            break;
                        case "FB":
                        case "IG":
                            //var param = new Dictionary<string, object>() {
                            //    { "contacto", chat.Contacto } ,
                            //    { "sendMessage","ok"} };
                            //dynamic estatusChat = await this.GetChatEstatus(param);
                            //if (estatusChat.ID == 1)
                            //{
                            //msg.humanAgent = true;
                            //}
                            //var data = await this.getRecipientContact(chat);
                            // msg.RecipientPhoneNumber = data.userId;
                            // msg.PageId = data.pageId;
                            // msg.Medio = chat.Canal.Clave;
                            rutaEndpoint = "messenger/SendMessengerTextMessage";
                            break;
                    }


                    //se ENVIA EL MENSAJE AL ENDPOINT DE EKCONNECT, se registra el mensaje y 
                    // de la respuesta tomamos el idwa y actualizamos el mensaje guardado en la base
                    // de datos de ruba y le asignamos ese idWa

                    //=================== DESCOMENTAR PARA PROBAR CONEXION CON EKCONNECT =======
                    var response = await this.Post(rutaEndpoint, msg);
                    JArray r = (JArray)response["messages"];
                    var idWA = r.FirstOrDefault()?["id"]?.Value<string>();
                    await this.dao.UdateIdWAMensaje(_idMensaje, idWA);

                    //item.IdWA = idWA;
                    //item.IdEstatus = estatusRecibido.ID.Value;
                    //item = await bpMensajes.Save(item);

                    Commit();

                }
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }

            return null;
        }
        // public async Task<m.SCV.Interfaces.EKCONNECT.IEKCChats> enviar(EKCRequestData parametros)
       

        public  async Task<List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>> enviarArchivos(Dictionary<string, object> parametros)
        //public  async Task<List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>> SaveFotos(m.EKC.Interfaces.IEKCChats item)
        {
            //var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            //var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ITiposEntidad>();
            //var bpMensajes = Get<p.EKC.Interfaces.IEKCMensajes>();
            //var estatusEnviado = await bpEstatus.Get("ESTATUSCHATEKC", "ENV");
            //var estatusRecibido = await bpEstatus.Get("ESTATUSCHATEKC", "RE");
            //var bpDE = Get<p.Kontrol.Interfaces.IDominiosEndpoints>();
            // var bpDominio = Get<p.Kontrol.Interfaces.IDominios>();
            // var bpToken = Get<p.Kontrol.Interfaces.ITOKEN>();
            // var bpChatHub = Get<p.EKC.ChatHub>();
            //var mMensaje = Get<m.EKC.Interfaces.IEKCMensajes>();
            // var bpClientes = Get<p.SCV.Clientes>();
            string ekcEndpoint = ConfigurationManager.AppSettings["drivers:EKConnect:endpoint"];

            try
            {
                BeginTransaction(true);
                //var chat = await this.GetById(item.IdChat);
               // item.Contacto = chat.Contacto;
                /* var ac = await bpDominio.GetByClave("AC");

                 var endpoints = await bpDE.GetAll(new Dictionary<string, object>(){
                             { "idDominio",ac.ID},
                             {"claveCategoria","API" }
                          });
                 var token = await bpToken.getTokenEndpointEKC(endpoints[0]);
                 if (token == null)
                 {
                     throw new ApplicationException("No cuenta con token para EKC");

                 }*/
                //var imagenes = JsonConvert.DeserializeObject<List<m.EKC.Interfaces.IEKCFotos>>(item.fotos);
                JArray _jArray = (JArray)parametros["lista"];
                List<dynamic> _listaDynamic = _jArray.ToObject<List<dynamic>>();
                //foreach (var im in imagenes)
                List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes> mensajes = new List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>();

                foreach (var _li in _listaDynamic)
                {
                    var _itemParams = _li.ToObject<Dictionary<string, object>>();
                    if (_itemParams != null)
                    {

                        //Guadamos y marcamos como enviado.
                        //var tipoEntidad = await bpTipoEntidad.GetByClave("usuarios");
                        //string TipoMensaje = im.Tipo_Mensaje;

                        //var claveTipeMessage = "";
                        //switch (TipoMensaje)
                        //{
                        //    case "Image":
                        //        claveTipeMessage = "IMAGE";
                        //        break;

                        //    case "Document":
                        //        claveTipeMessage = "FILE";
                        //        break;
                        //}

                        //var tipoMensaje = await bpEstatus.Get("TIPOMSJEKC", claveTipeMessage);

                        //mMensaje.ID = -1;
                        //mMensaje.IdChat = chat.ID.Value;
                        //mMensaje.UUId = Guid.NewGuid().ToString();
                        //mMensaje.IdTipoMensaje = tipoMensaje.ID.Value;
                        //mMensaje.IdEntidadEmision = base.getUserId();
                        //mMensaje.IdTipoEntidadEmision = tipoEntidad.ID.Value;
                        //mMensaje.IdEstatus = estatusEnviado.ID.Value;
                        //mMensaje.IdFileRef = im.IDKontrolFiles;
                        //mMensaje = await bpMensajes.Save(mMensaje);
                        //await this.DispatchMensajes(mMensaje, false, chat);

                        //var isImage = parametros.MimeType.Contains("image");
                        var isImage = _itemParams["mimeType"].ToString().Contains("image");
                        string TipoMensage = isImage ? "Image" : "Document";
                        string claveTipoMensage = isImage ? "IMAGE" : "FILE";
                        _itemParams.Add("uuid", Guid.NewGuid().ToString());
                        _itemParams.Add("tipoMensaje", claveTipoMensage);

                        //List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes> mensajes = new List<m.SCV.Interfaces.EKCONNECT.IEKCMensajes>();
                        var _idMensaje = await this.dao.SaveMensaje(_itemParams);

                        if (_idMensaje > 0)
                        {
                            var paramCM = new Dictionary<string, object>();
                            paramCM.Add("action", "SELECT_BY_MENSAJEID");
                            paramCM.Add("idMensaje", _idMensaje);
                            var _mensaje = await this.dao.getByMensajeId(paramCM);
                            paramCM.Remove("action");
                            paramCM.Add("action", "SELECT_BY_CHATID");
                            paramCM.Add("IdChat", _mensaje.IdChat);
                            mensajes = await this.dao.getByChatId(paramCM);
                        }

                        string mimeType = _itemParams["mimeType"].ToString();
                        string base64Code = _itemParams["b64Data"].ToString(); //im.Mensaje.Substring(im.Mensaje.IndexOf(',') + 1);

                        dynamic send = new ExpandoObject();
                        send.Base64 = base64Code;
                        send.SelectedUploadType = "Normal Upload";
                        send.RecipientPhoneNumber = _itemParams["from"];
                        send.TypeFile = TipoMensage;
                        send.MimeType = mimeType;
                        send.NombreImagen = _itemParams["fileName"].ToString(); //im.NombreImagen;
                        string rutaEndpoint = "whatsapp/UploadMediaBase64";

                        switch (_itemParams["claveCanal"].ToString())
                        {
                            case "WA":
                                rutaEndpoint = "whatsapp/UploadMediaBase64";
                                break;
                            case "FB":
                               // var data = await this.getRecipientContact(chat);
                                //send.RecipientPhoneNumber = data.userId;
                                //send.PageId = data.pageId;
                                rutaEndpoint = "messenger/UploadMediaBase64";
                                break;
                        }

                        var response = await this.Post(rutaEndpoint, send);
                        JArray r = (JArray)response["messages"];
                        var idWA = r.FirstOrDefault()?["id"]?.Value<string>(); 
                        await this.dao.UdateIdWAMensaje(_idMensaje, idWA);
                        
                        //mMensaje.IdWA = idWA;
                        //mMensaje.IdEstatus = estatusRecibido.ID.Value;
                        //mMensaje = await bpMensajes.Save(mMensaje);
                       
                        //await this.DispatchMensajes(mMensaje, false, chat);

                    }

                } 
                Commit();
                return mensajes;
               
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("Error al guardar la Notificación.", ex);
            }

            //return null;
        }

        public async Task<JObject> Post(string uri, object item)
        {
            var retValue = new List<object>();
            try
            {
                string ekcEndpoint = ConfigurationManager.AppSettings["drivers:EKConnect:endpoint"];

               // var bpDE = Get<p.Kontrol.Interfaces.IDominiosEndpoints>();
               // var bpDominio = Get<p.Kontrol.Interfaces.IDominios>();
               
                //var bpToken = Get<p.Kontrol.Interfaces.ITOKEN>();
                
                //var ac = await bpDominio.GetByClave("AC");
                //var endpoints = await bpDE.GetAll(new Dictionary<string, object>(){
                      // { "idDominio",ac.ID},
                      // {"claveCategoria","API" }
               // });
                var endpoint = ekcEndpoint;
                //endpoints.Where(e => e.Clave == "EKC").FirstOrDefault();
                // if (endpoint == null)
                //{
                // throw new Exception("No cuenta con el endpoint EKC");
                //}
              //var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQUxPUkEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhY29sb3JhZG9AZW5rb250cm9sLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImNsaWVudCIsImV4cCI6MTc0MTgwODU3NiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE1MC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MTUwLyJ9.KP7RHh2uVR8DiNui2VkLcfH78suVAKt91om2yp_IYF8"; //await bpToken.getTokenEndpointEKC(endpoint);
                var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI4IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlJVQkEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJydWJhQGVua29udHJvbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJjbGllbnQiLCJleHAiOjE3NDI1MDAyODEsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxNTAvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE1MC8ifQ.ccrnsuZA12VLStEPYj0W1CkkBZQywg08xqVeRIb30Qk"; //await bpToken.getTokenEndpointEKC(endpoint);
                if (token != null)
                {
                    var pathServices = endpoint;//endpoint.Endpoint;
                    Uri requestUri = new Uri(pathServices + uri);
                    string sJson = Newtonsoft.Json.JsonConvert.SerializeObject(item);
                    var objClient = new System.Net.Http.HttpClient();
                    objClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                    //objClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.Token);
                    System.Net.Http.HttpResponseMessage respon = await objClient.PostAsync(requestUri, new StringContent(sJson, System.Text.Encoding.UTF8, "application/json"));

                    if (respon.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        string contentResult = respon.Content.ReadAsStringAsync().Result;
                        JObject result = JObject.Parse(contentResult);

                        //var dataValue = result["data"].Value<JArray>();
                        //retValue = dataValue.ToObject<List<object>>();
                        return result;
                    }
                    else
                    {
                        string contentResult = respon.Content.ReadAsStringAsync().Result;
                        //var result = Newtonsoft.Json.JsonConvert.DeserializeObject<ErrorInformation>(contentResult);
                        //throw new ApplicationException("Error al consumir el api [ " + result.detail);
                        //var result = Newtonsoft.Json.JsonConvert.DeserializeObject<ErrorInformation>(contentResult);
                        throw new ApplicationException("Error al consumir el api [No token] " );
                    }
                }
                else
                {
                    throw new ApplicationException("No cuenta con token para EKC");
                }


            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }
    }
}
