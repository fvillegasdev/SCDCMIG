using System;
using System.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Dynamic;
using System.IO;
using System.Net.Http;


using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using NT = EK.Drivers.Notifications;
using System.Security.Cryptography;
using System.Text;
using System.Net;
using System.Drawing;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using ekd = EK.Drivers.Emailing;
using System.Globalization;
using System.Drawing.Imaging;
using Newtonsoft.Json.Linq;
//using ImageMagick;

namespace EK.Procesos.SCV
{
    public class ReportesFallas : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteFalla, d.SCV.Interfaces.IReportesFallas>,
        p.SCV.Interfaces.IReportesFallas
    {
        public ReportesFallas(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReportesFallas dao)
            : base(factory, dao, "reportesFallas")
        {
        }

        public async Task<List<m.SCV.Interfaces.IMotivosCancelacionPV>> GetMotivosCancelacionFolio()
        {
            // parametros.Add("Usuario", base.getUserId());
            var bpMC = Get<p.SCV.Interfaces.IMotivosCancelacionPV>();
            Dictionary<string, object> parametros = new Dictionary<string, object>();

            var MotivosReprogramacion = await bpMC.GetAll(parametros);
            // var MotivosReprogramacion = await this.dao.GetMotivosCancelacionFolio();

            return MotivosReprogramacion;

        }

        public async Task<List<m.SCV.Interfaces.IListaCatsCorreo>> GetListaCatsForSendEmail()
        {
            try
            {
                var bpRF = Get<d.SCV.Interfaces.IReportesFallas>();
                var listaCats = await bpRF.GetCatsParaEnviarCorreo();
                return listaCats;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<List<m.SCV.Interfaces.IListaCatsCorreo>> GetUsuarioRemitente()
        {
            try
            {
                var bpRF = Get<d.SCV.Interfaces.IReportesFallas>();
                var listaCats = await bpRF.GetCatsParaEnviarCorreo();
                return listaCats;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<m.SCV.Interfaces.IPreparacionViviendaDocs> GetInformacionCte(int idUbicacionVenta)
        {

            try
            {
              
                var daoViv = Get<d.SCV.Interfaces.IConfigViviendaEntregable>();
                //Informacion del Cliente
                var InformacionCte = await daoViv.GetInformacionCte(idUbicacionVenta);

                return InformacionCte;

            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }


        }

        public async Task<string> getB64ArchivoEntrega(Dictionary<string, object> parametros)
        {
            var img = parametros["Imagen"];
            byte[] imageArray = System.IO.File.ReadAllBytes(@"" + img);

            string imageData = Convert.ToBase64String(imageArray);
            imageData = imageData.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");
            var ImgSrcString = $"data:image/png;base64,{imageData}";

           
            return ImgSrcString;
        }

         public async Task<byte[]> getPdfArchivoEntrega(Dictionary<string, object> parametros)
         {
            var img = parametros["Imagen"];

           MemoryStream fileStream = null;
            //byte[] imageArray = System.IO.File.ReadAllBytes(@"" + img);

            fileStream = new System.IO.MemoryStream(System.IO.File.ReadAllBytes(@"" + img));
            var documento = Get<EK.Drivers.Common.IKontrolFiles>();
            documento.Content = fileStream;
            documento.Content.Position = 0;
            documento.Size = fileStream.Length;
            documento.ContentType = "application/pdf";
            documento.Extension = "pdf";
            documento.Nombre = "ArchivoAdjunto.pdf";

            byte[] retValue;
           
            using (MemoryStream ms2 = new MemoryStream())
            {


                documento.Content.CopyTo(ms2);
                retValue = ms2.ToArray();

            }
          

            return retValue;
        }

        public async Task<int> SendPushNotificationToApp(Dictionary<string, object> parametros)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    var daoAG = Get<d.SCV.Interfaces.IAgendaSPV>();
                    var parametrosRuta = new Dictionary<string, object>();
                    parametrosRuta.Add("IdParametro", 111);
                    var result = await daoAG.GetPlazasEmailCC(parametrosRuta);
                    // URL del endpoint al que se envía la petición POST
                    dynamic jsonRuta = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                    var valorRuta = jsonRuta[0];
                    string url = valorRuta.valor;
                    //string url = result.ToString();
                    // URL del endpoint al que se envía la petición POST
                    //string url = "https://demos.gruporuba.com.mx/MobileServiceTest2.0Vr/API/PushNotificationsSega/NotificacionSEGA";
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

            public async Task<byte[]> GetPDFArrayDataCliente(Dictionary<string, object> parametros)
        {
            try
            {

                var IdCliente = parametros["cliente"].ToString();

                var model = Get<m.Kontrol.Interfaces.IPreparacionVivienda>();
                var daoViv = Get<d.SCV.Interfaces.IConfigViviendaEntregable>();
                var bpMonedas = Get<p.Kontrol.Interfaces.IMonedas>();
                var docFactory = Get<EK.Drivers.Documents.IDocument>();

                //EK.Drivers.
                model.plaza = parametros["IdPlaza"].ToString();
                model.clave_tipo_vivienda = parametros["tipo_vivienda"].ToString();
                model.hipoteca_verde = parametros["hipoteca_verde"].ToString();

                var InformacionCte = await this.GetInformacionCte(Int32.Parse(IdCliente));

                var Documentos = await daoViv.GetDocumentoImpresion(model);

                string Ruta = Documentos[0].ruta;
                var fileName = Documentos[0].clave_dcto + ".docx";

                bool aureaFracc = false;
                switch (InformacionCte.CveFracc)
                {
                    case "X37":
                    case "X38":
                    case "X43":
                        fileName = "KV10-MEXAUREA.docx";
                        aureaFracc = true;
                        break;
                }
                var claveDcto = aureaFracc ? "KV10-MEXAUREA" : Documentos[0].clave_dcto;

                var fullFileName = this.getFullFileName(Ruta, fileName);
                var blob = new System.IO.FileInfo(fullFileName);
                MemoryStream fileStream = null;
                
                if (blob.Exists)
                {
                    if (blob != null)
                    {
                        string FullName = fileName;
                        var ContentType = EK.Drivers.Common.MimeType.GetByFileName(fullFileName);
                        DateTime LastModified = blob.LastWriteTimeUtc;
                        fileStream = new System.IO.MemoryStream(System.IO.File.ReadAllBytes(fullFileName));

                    }
                    //
                    var moneda = await bpMonedas.GetByClave("MXN");
                   
                    var jsonData = JsonConvert.SerializeObject(InformacionCte);
                    string jsonMoneda = null;

                    if (moneda != null)
                    {
                        jsonMoneda = JsonConvert.SerializeObject(moneda);
                    }
                    //var documento = Get<m.Interfaces.IKontrolDocument>();
                    var documento = Get<EK.Drivers.Common.IKontrolFiles>();
                    documento.Content = docFactory.ConvertToPDF(jsonData, fileStream, jsonMoneda, "es-MX", false);
                    documento.Content.Position = 0;
                    documento.Size = fileStream.Length;
                    documento.ContentType = "application/pdf";
                    documento.Extension = "pdf";
                    documento.Nombre = "DocumentoPdfGeneratedTest.pdf";
                    byte[] retValue;
                    using (MemoryStream ms = new MemoryStream())
                    {                       
                        documento.Content.CopyTo(ms);
                        retValue = ms.ToArray();
                    }
                    return retValue;
                   
                }
                return null;
            }
            catch (Exception ex)
            {
                Rollback();
                return null;
            }
        }
        public async Task<int> EnviarCorreoDiarioSingleCat(Dictionary<string, object> parametros)
        {
            try
            {
                var bpRF = Get<d.SCV.Interfaces.IReportesFallas>();
                var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                var ue = parametros["UltimoEnvio"];

                if (ue == null || DateTime.Parse(ue.ToString()).Date < DateTime.Now.Date)
                {
                    var correoCat = parametros["CorreoCat"];
                    var IdCat = parametros["IdResponsableDictamen"];

                    string[] to = { correoCat.ToString() };
                    string body = "Estimado CAT<br />A continuacion se manda la lista de los folios que se cerraron el dia hoy<br /><br />";
                    var foliosInline = parametros["FoliosTerminados"];
                    string folios = foliosInline.ToString().Replace(",", "<br />");
                    body += folios;
                    bpClientEmail.SendMessage(to, "Resumen Diario de Folios Cerrados", body);
                    BeginTransaction();
                    // var idc= Int32.Parse(IdCat.ToString());
                    await bpRF.ActualizarCorreoEnviadoCat(Int32.Parse(IdCat.ToString()));
                    Commit();
                }

                return 1;
            }
            catch (Exception ex)
            {
                Rollback();
                return -1;
            }
        }


        public async Task<int> EnviarCorreoDiarioACat()
        {
            try
            {
                BeginTransaction();
                Dictionary<string, object> parametros = new Dictionary<string, object>();

                var bpRF = Get<d.SCV.Interfaces.IReportesFallas>();
                var listaCats = await bpRF.GetCatsParaEnviarCorreo();

                var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                foreach (var c in listaCats)
                {
                    if (c.UltimoEnvio == null || c.UltimoEnvio.Value.Date < DateTime.Now.Date)
                    {
                        string[] to = { c.CorreoCat };
                        string body = "Estimado CAT<br />A continuacion se manda la lista de los folios que se cerraron el dia hoy<br /><br />";
                        string folios = c.FoliosTerminados.Replace(",", "<br />");
                        body += folios;
                        bpClientEmail.SendMessage(to, "Resumen Diario de Folios Cerrados", body);
                        BeginTransaction();
                        await bpRF.ActualizarCorreoEnviadoCat(c.IdResponsableDictamen);
                        Commit();
                    }
                }
                Commit();
                return 1;
            }
            catch (Exception ex)
            {
                Rollback();
                return -1;
            }

        }

        public override async Task<List<m.SCV.Interfaces.IReporteFalla>> GetAll(Dictionary<string, object> parametros)
        {
            parametros.Add("idUsuario", base.getUserId());
            return await base.GetAll(parametros);
        }
        public class PartidasPendientesOt
        {
            public int? Id { get; set; }
            public bool PendienteOt { get; set; }
        }
        public override async Task<m.SCV.Interfaces.IReporteFalla> Save(m.SCV.Interfaces.IReporteFalla item)
        {
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpCU = Get<p.SCV.Interfaces.IContratistasUbicaciones>();
            var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBA>();
            var daoOTDTemp = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBA>();
            var daoDT = Get<d.Kontrol.Interfaces.IDateDifference>();
            var bpPRE = Get<p.SCV.Interfaces.IPrereportes>();
            var daoPRE = Get<d.SCV.Interfaces.IPrereportes>();
            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenes>();
            var bpFiles = Get<p.Kontrol.Interfaces.IKontrolFiles>();
            var daoADET = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var bpMC = Get<p.SCV.Interfaces.IMotivosCancelacionPV>();

            try
            {
                BeginTransaction();
                int? idPrereporte = item.IdPrereporte;
                bool isNew = item.ID == null || item.ID <= 0 || item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo;
                if (item.Ubicacion == null)
                {
                    base.SetReturnInfo(1, "La ubicación no ha sido seleccionada. Por favor verifique e intente de nuevo.");
                    return null;
                }

                if (item.Cliente == null)
                {
                    base.SetReturnInfo(1, "El cliente no ha sido seleccionado. Por favor verifique e intente de nuevo.");
                    return null;
                }

                if (item.Cliente.IdUbicacion == null || item.Cliente.IdUbicacion <= 0)
                {
                    base.SetReturnInfo(1, "El cliente no tiene asignada una ubicación. Por favor verifique e intente de nuevo.");
                    return null;
                }

                if (string.IsNullOrEmpty(item.Ubicacion.IdPlaza))
                {
                    base.SetReturnInfo(1, "La plaza no ha sido configurada correctamente. Por favor verifique e intente de nuevo.");
                    return null;
                }
                int validaResponsablePlaza = await this.dao.ValidarResponsablePlaza(item.Ubicacion.IdPlaza);
                if (validaResponsablePlaza == 0)
                {
                    item.SupervisorContratista = null;
                    item.IdSupervisorContratista = null;
                }

                if (item.MedioSolicitud == null)
                {
                    base.SetReturnInfo(1, "El Medio de Solicitud no ha sido seleccionado. Por favor verifique e intente de nuevo.");
                    return null;
                }

                var closeReportByOT = false;
                var closeReportByPartidas = false;
                var closeReport = false;
                var closeEstatus = string.Empty;
                if (item.IdEstatusReporte == "X") item.Cancelado = "S";
                if (item.ID == null || item.ID <= 0)
                {
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                    item.FechaCaptura = DateTime.Now;
                    item.IdEstatusReporte = "N";
                    item.EstatusReporte = await bpCG.Get("SPVESTATUSREPORTEFALLAS", "N");
                    item.IdEstatusRevisado = "N";
                    item.EsReprogramacion = 0;
                    item.EsClienteNormal = "S";
                    item.EsClientePerito = "N";
                    item.EsClienteProblema = "N";
                    item.EsClienteProfeco = "N";
                    item.IdTipoCliente = "E";
                    item.TipoCliente = await bpCG.Get("SPVTIPOSCLIENTE", "E");
                    item.Activo = 1;
                    item.Cancelado = "N";
                    item.CostoBase = 0;
                    item.CostoCubierto = "NO";
                    item.CostoReal = 0;
                    item.OC = string.Empty;
                    item.IdRecibidoPor = base.getUserId();
                    item.Recibido = DateTime.Now;

                    var numReincidencias = await this.dao.GetClienteReportesCount(item.IdCliente);
                    item.Reincidencia = string.Format("{0}-{1}", item.IdCliente, numReincidencias + 1);
                }
                else
                {
                    m.SCV.Interfaces.IReporteFalla bckp = item;
                    item = await this.dao.GetById((int)item.ID);
                    item.IdUbicacion = bckp.IdUbicacion;
                    item.Ubicacion = bckp.Ubicacion;
                    item.IdSupervisorContratista = bckp.IdSupervisorContratista;
                    item.SupervisorContratista = bckp.SupervisorContratista;
                    item.IdResponsableConstruccion = bckp.IdResponsableConstruccion;
                    item.ResponsableConstruccion = bckp.ResponsableConstruccion;
                    item.IdMedioSolicitud = bckp.IdMedioSolicitud;
                    item.MedioSolicitud = bckp.MedioSolicitud;
                    item.ObservacionesServicio = bckp.ObservacionesServicio;
                    item.ObservacionesContratista = bckp.ObservacionesContratista;
                    item.Contactos = bckp.Contactos;
                    item.Partidas = bckp.Partidas;
                    item.OrdenesTrabajo = bckp.OrdenesTrabajo;
                    item.Dictamenes = bckp.Dictamenes;
                    item.EstatusReporte = bckp.EstatusReporte;
                    item.IdEstatusReporte = bckp.IdEstatusReporte;
                    item.Estado = bckp.Estado;
                    item.Version = bckp.Version;
                    item.Cancelado = bckp.Cancelado;
                    item.IdMotivoCancelado = bckp.IdMotivoCancelado;
                    item.FechaCancelacion = bckp.FechaCancelacion;
                }

                var clienteInfo = await daoCliente.GetById(item.IdCliente);
                var etapa = await this.GetClienteEtapa(item.IdCliente, (DateTime)item.FechaCaptura);
                bool tieneGarantia = true;
                bool garantiaPorReincidencia = false;
                int valida_vivienda_entregada = await this.dao.ValidarEntregaVivienda();
                if (valida_vivienda_entregada == 1)
                {
                    if (etapa != null && etapa.FechaLiberacion == null)
                    {
                        base.SetReturnInfo(1, "Al cliente no se le ha entregado la vivienda. Por favor verifique la información e intente de nuevo.");
                        return null;
                    }
                }
                if (etapa != null && etapa.FechaLiberacion != null)
                {
                    var diff = await daoDT.GetDateDifference("yy", (DateTime)etapa.FechaLiberacion, (DateTime)item.FechaCaptura);
                    if (diff.Year > 5)
                    {
                        //tieneGarantia = false;
                    }
                }
                var estatus = await bpCG.Get("ESTATUS", "A");
                item.IdEstatus = estatus.ID;
                item.Estatus = estatus;
                if (etapa != null)
                {
                    item.FechaEntregaVivienda = etapa.FechaLiberacion;
                }
                item.IdMedio = item.MedioSolicitud.Clave;
                item.IdMedioSolicitud = (int)item.MedioSolicitud.ID;
                item.Calle = item.Ubicacion.Calle;
                item.SuperManzana = item.Ubicacion.SuperManzana;
                item.Manzana = item.Ubicacion.Manzana;
                item.Exterior = item.Ubicacion.Exterior;
                item.Interior = item.Ubicacion.Interior;
                item.Lote = item.Ubicacion.Lote;
                item.DesarrolloClave = item.Ubicacion.DesarrolloClave;
                item.IdPlaza = item.Ubicacion.IdPlaza;
                item.IdPrototipo = item.Ubicacion.IdPrototipo;
                item.IdSupervisor = item.Ubicacion.IdSupervisor;
                item.IdCoordinador = item.Ubicacion.IdCoordinador;
                item.IdResponsable = item.IdResponsableConstruccion;

                var cOrigen = await bpCU.GetContratistaDefault((int)item.IdUbicacion);
                if (cOrigen != null)
                {
                    item.Contratista = cOrigen;
                    item.IdContratista = cOrigen.ID;
                }
                if (item.Ubicacion.Segmento != null)
                {
                    item.IdTipoVivienda = item.Ubicacion.Segmento.IdTipoVivienda;
                }

                var contactos = item.Contactos;
                var partidas = item.Partidas;
                var ordenesTrabajo = item.OrdenesTrabajo;
                var dictamenes = item.Dictamenes;
                if (contactos != null)
                {
                    foreach (var c in contactos)
                    {
                        if (c.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            if (c.TipoContacto.Clave == "TELEFONO")
                            {
                                c.TipoTelefono = c.TipoTelefono;
                                c.IdTipoTelefono = c.TipoTelefono.ID;

                                switch (c.TipoTelefono.Clave)
                                {
                                    case "CS":
                                        if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                            item.TelefonoCasa = string.Empty;
                                        else
                                            item.TelefonoCasa = c.Contacto;
                                        break;
                                    case "T":
                                        if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                            item.TelefonoOficina = string.Empty;
                                        else
                                            item.TelefonoOficina = c.Contacto;
                                        break;
                                    case "O":
                                        if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                            item.TelefonoOtros = string.Empty;
                                        else
                                            item.TelefonoOtros = c.Contacto;
                                        break;
                                }
                                c.IdCliente = item.IdCliente;
                                c.Estatus = estatus;
                                c.IdEstatus = estatus.ID;
                                c.Modificado = DateTime.Now;
                                c.IdModificadoPor = base.getUserId();
                                c.IdTipoContacto = (int)c.TipoContacto.ID;
                                c.Estado = c.ID == null || c.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;

                                if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                {
                                    c.Creado = DateTime.Now;
                                    c.IdCreadoPor = base.getUserId();
                                }

                                if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                {
                                    await daoRL.Delete(c.ID.Value);
                                }
                                else
                                {
                                    await daoRL.SaveEntity(c, false, true);
                                }

                            }
                        }
                    }
                }
                this.CalcularTiemposReparacion(ref item);
                item = await this.saveModel(item);

                //asignar el folio al prereporte correspondiente.
                if (idPrereporte > 0 && isNew == true)
                {
                    var pprt = await bpPRE.GetById((int)idPrereporte);
                    pprt.EstatusReporteId = 3;
                    pprt.IdReporte = item.ID;
                    pprt.Modificado = DateTime.Now;
                    pprt.IdModificadoPor = base.getUserId();

                    pprt.Changed("EstatusReporteId", true);
                    pprt.Changed("IdReporte", true);
                    pprt.Changed("Modificado", true);
                    pprt.Changed("IdModificadoPor", true);

                    pprt = await daoPRE.Save(pprt);

                    item.Prereporte = pprt;
                    item.IdPrereporte = pprt.ID;
                }
                List<PartidasPendientesOt> AceptadasPendientes = new List<PartidasPendientesOt>();
                int TotalPartidaNoProcede = 0;
                bool CancelarPordiagnosticoNoProcede = false;
                bool diagnostico_standby = false;
                foreach (var p in partidas)
                {
                    if (p.Reincidencias > 0 && p.DiasGarantia < 0)
                    {
                        garantiaPorReincidencia = true;
                    }
                }

                if (partidas != null && partidas.Count > 0 && (tieneGarantia == true || garantiaPorReincidencia == true))
                {
                    int result = await this.SavePartidas(partidas, item, ordenesTrabajo, dictamenes);
                    if (result < 0)
                    {
                        Rollback();
                        return null;
                    }

                    var ContadorPartidasNoProcede = 0;

                    foreach (var p in partidas)
                    {
                        if (p.EstatusPartidaValor.Contains('T') || p.EstatusDictamen.Contains("NO PROCEDE"))
                            ContadorPartidasNoProcede++;

                        if (p.EstatusPartidaValor.Contains('T') && p.EstatusDictamen.Contains("ACEPTADO") || p.EstatusPartidaValor.Contains('N') && p.EstatusDictamen.Contains("ACEPTADO"))
                        {
                            PartidasPendientesOt pp = new PartidasPendientesOt();
                            pp.Id = p.ID;
                            pp.PendienteOt = true;
                            AceptadasPendientes.Add(pp);
                        }
                    }
                    if (ContadorPartidasNoProcede == partidas.Count) closeReportByPartidas = true;

                    if (dictamenes != null)
                    {
                        foreach (var d in dictamenes)
                        {
                            var contPartidasTerminadas = 0;
                            foreach (var p in d.IdPartidas.Split(','))
                            {
                                m.SCV.Interfaces.IReporteFallaDetalle partida;
                                partida = partidas.Where(x => x.ID == int.Parse(p)).FirstOrDefault();
                                // partida = await daoDET.GetById(int.Parse(p));
                                if (partida.EstatusDictamen != "ABIERTO" && partida.EstatusDictamen != "CANCELADO")
                                {
                                    if (partida.EstatusDictamen == "NO PROCEDE")
                                    {
                                        //if (!d.TerminadoCat && !d.StandbyCancelar)
                                        //{
                                            TotalPartidaNoProcede++;
                                       // } else
                                       // {
                                       //     TotalPartidaNoProcede++;
                                      //  }
                                        
                                        
                                    }
                                    contPartidasTerminadas++;
                                }

                            }

                            if (contPartidasTerminadas == d.IdPartidas.Split(',').Length)
                            {
                                var estatusDictamenCerrado = await bpCG.Get("SPVESTATUSDICTAMEN", "C");
                                d.EstatusDictamen = estatusDictamenCerrado;
                                d.EstatusDictamenValue = estatusDictamenCerrado.Clave;
                                d.IdEstatusDictamen = (int)estatusDictamenCerrado.ID;
                            }
                        }
                    }

                }
                if (TotalPartidaNoProcede == partidas.Count)
                {
                    var totalDictamenStandBy = dictamenes.Where(x => x.StandbyCancelar == true).ToList().Count;
                    if(totalDictamenStandBy <= 0)
                    {
                        CancelarPordiagnosticoNoProcede = true;
                    }
                    
                }
                if (ordenesTrabajo != null && (tieneGarantia == true || garantiaPorReincidencia == true))
                {
                    var estatusNuevo = await bpCG.Get("SPVESTATUSOT", "N");
                    var estatusTerminado = await bpCG.Get("SPVESTATUSOT", "T");
                    foreach (var o in ordenesTrabajo)
                    {

                        if (o.IdAgenda != null)
                        {
                            var agendaDetalle = await daoADET.GetById((int)o.IdAgenda);
                            if (agendaDetalle != null)
                            {

                                agendaDetalle.IdUsuarioAsignado = o.IdContratista;
                                agendaDetalle.Changed("IdUsuarioAsignado", true);
                                await daoADET.SaveEntity(agendaDetalle);
                            }
                        }
                        //if (o.Partidas != null)
                        //{
                        //    foreach (var d in o.Partidas)
                        //    {
                        //        var savedotd = await daoOTD.GetById(d.ID.Value);
                        //        if (savedotd != null)
                        //        {
                        //            d.Estado = savedotd.Observaciones != d.Observaciones ? m.Kontrol.KontrolEstadosEnum.Modificado : d.Estado;
                        //            o.Estado = savedotd.Observaciones != d.Observaciones ? m.Kontrol.KontrolEstadosEnum.Modificado : o.Estado;
                        //        }
                        //    }
                        //}
                        if (o.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            o.Estatus = estatus;
                            o.IdEstatus = estatus.ID;
                            o.Modificado = DateTime.Now;
                            o.IdModificadoPor = base.getUserId();
                            o.IdReporte = (int)item.ID;
                            if (o.ID == null || o.ID <= 0)
                            {
                                o.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                o.Creado = DateTime.Now;
                                o.IdCreadoPor = base.getUserId();
                                o.EstatusOrdenTrabajo = estatusNuevo;
                                o.IdEstatusOrdenTrabajo = estatusNuevo.ID;
                                o.Autorizada = false;
                            }
                            //actualizar información de la orden de trabajo
                            if (o.EstatusOrdenTrabajo.Clave == "N" || o.EstatusOrdenTrabajo.Clave == "C")
                            {
                                if (o.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                {
                                    if (o.Partidas != null)
                                    {
                                        foreach (var d in o.Partidas)
                                        {
                                            await daoOTD.Delete(d.ID.Value);
                                            var partida = await daoDET.GetById(d.IdPartida);
                                            partida.PartidaAutorizada = "A";
                                            partida.Procede = "S";
                                            partida.EstatusPartidaValor = "N";
                                            partida.Changed("PartidaAutorizada", true);
                                            partida.Changed("Procede", true);
                                            partida.Changed("EstatusPartidaValor", true);
                                            await daoDET.SaveEntity(partida, false, false);
                                        }
                                    }

                                    await daoOT.Delete(o.ID.Value);
                                }
                                else
                                {
                                    if (o.ID.Value != -1 && o.IdAgenda != null)
                                    {
                                        var savedOT = await daoOT.GetById(o.ID.Value);
                                        if (savedOT.IdContratista != o.IdContratista || savedOT.IdCat != o.IdCat)
                                        {
                                            bool cambioCat = savedOT.IdCat != o.IdCat ? true : false;
                                            var res = this.EnviarEmailCambiocontratista(o, item.IdPlaza, cambioCat);
                                        }

                                    }

                                    var ot = await daoOT.SaveEntity(o, false, true);

                                    if (o.Partidas != null)
                                    {
                                        foreach (var d in o.Partidas)
                                        {
                                            var savedotd = await daoOTD.GetById(d.ID.Value);
                                            if (savedotd != null)
                                            {
                                                if (savedotd.Observaciones != d.Observaciones)
                                                {
                                                    d.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                                }
                                            }
                                            if (d.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                                            {
                                                d.IdOrdenTrabajo = (int)ot.ID;
                                                d.Estatus = estatus;
                                                d.IdEstatus = estatus.ID;
                                                d.Modificado = DateTime.Now;
                                                d.IdModificadoPor = base.getUserId();

                                                if (d.ID == null || d.ID <= 0)
                                                {
                                                    d.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                                }

                                                if (d.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                                {
                                                    d.Creado = DateTime.Now;
                                                    d.IdCreadoPor = base.getUserId();
                                                    d.FechaFinOT = null;
                                                    d.UsuarioFinOT = null;
                                                }

                                                if (d.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                                {
                                                    await daoOTD.Delete(d.ID.Value);
                                                }
                                                else
                                                {
                                                    await daoOTD.SaveEntity(d, false, true);
                                                }
                                            }
                                        }
                                    }
                                    //
                                    if (o.EstatusOrdenTrabajo.Clave == "C" && o.IdAgenda > 0)
                                    {
                                        var estatusCancelado = await bpCG.Get("AgendaEstatus", "CAN");
                                        var motivoCancelacion = await bpMC.GetByClave("OTC999");

                                        var agendaDetalle = await daoADET.GetById((int)o.IdAgenda);
                                        if (agendaDetalle != null)
                                        {
                                            agendaDetalle.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                            agendaDetalle.IdEstatusAgenda = estatusCancelado.ID;
                                            agendaDetalle.IdMotivo = motivoCancelacion.ID;
                                            agendaDetalle.IdModificadoPor = base.getUserId();
                                            agendaDetalle.Modificado = DateTime.Now;
                                            agendaDetalle.Changed("IdEstatusAgenda", true);
                                            agendaDetalle.Changed("IdModificadoPor", true);
                                            agendaDetalle.Changed("IdMotivo", true);
                                            agendaDetalle.Changed("Modificado", true);

                                            await daoADET.SaveEntity(agendaDetalle);
                                        }
                                    }
                                }
                            }
                            //actualizar trabajo de la orden de trabajo
                            if (o.EstatusOrdenTrabajo.Clave == "E")
                            {
                                if (o.Partidas != null && o.Partidas.Count > 0)
                                {
                                    foreach (var p in o.Partidas)
                                    {
                                        var savedotd = await daoOTD.GetById(p.ID.Value);
                                        if (savedotd != null)
                                        {
                                            if (savedotd.Observaciones != p.Observaciones)
                                            {
                                                p.Estatus = estatus;
                                                p.IdEstatus = estatus.ID;
                                                p.Modificado = DateTime.Now;
                                                p.IdModificadoPor = base.getUserId();
                                                await daoOTD.SaveEntity(p, false, true);

                                            }
                                        }

                                        if (p.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios && p.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado)
                                        {
                                            var partida = await daoDET.GetById(p.IdPartida);
                                            partida.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                            partida.IdCausaFalla = p.Partida.CausaFalla.IdCausaFalla;
                                            partida.FechaInicioReal = o.FechaInicioReal;
                                            partida.FechaTerminacion = o.FechaFinReal;
                                            partida.IdModificadoPor = base.getUserId();
                                            partida.Modificado = DateTime.Now;
                                            partida.Changed("IdCausaFalla", true);
                                            partida.Changed("FechaInicioReal", true);
                                            partida.Changed("FechaTerminacion", true);
                                            partida.Changed("IdModificadoPor", true);
                                            partida.Changed("Modificado", true);

                                            await daoDET.SaveEntity(partida, false, false);
                                        }
                                        else
                                        {
                                            if (p.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                            {
                                                await daoOTD.Delete(p.ID.Value);
                                                var partida = await daoDET.GetById(p.IdPartida);
                                                partida.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                                partida.EstatusPartidaValor = "N";
                                                partida.IdModificadoPor = base.getUserId();
                                                partida.Modificado = DateTime.Now;
                                                partida.Changed("EstatusPartidaValor", true);
                                                partida.Changed("IdModificadoPor", true);
                                                partida.Changed("Modificado", true);
                                                await daoDET.SaveEntity(partida, false, false);
                                            }
                                        }
                                    }
                                }
                                var savedOT = await daoOT.GetById(o.ID.Value);
                                if (savedOT != null)
                                {
                                    if (savedOT.IdCat != o.IdCat)
                                    {
                                        o.Changed("IdCat", true);
                                    }
                                }

                                o.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                o.IdModificadoPor = base.getUserId();
                                o.Modificado = DateTime.Now;
                                o.Changed("FechaInicioReal", true);
                                o.Changed("FechaFinReal", true);
                                o.Changed("Observaciones", true);
                                o.Changed("IdModificadoPor", true);
                                o.Changed("Modificado", true);

                                if (o.CerrarRegistro == true)
                                {
                                    o.EstatusOrdenTrabajo = estatusTerminado;
                                    o.IdEstatusOrdenTrabajo = estatusTerminado.ID;
                                    o.Changed("IdEstatusOrdenTrabajo", true);

                                    if (o.Partidas != null && o.Partidas.Count > 0)
                                    {
                                        foreach (var p in o.Partidas)
                                        {
                                            var partida = await daoDET.GetById(p.IdPartida);
                                            partida.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                            partida.FechaCerrado = o.FechaFinReal;
                                            partida.EstatusPartidaValor = "T";
                                            partida.IdModificadoPor = base.getUserId();
                                            partida.Modificado = DateTime.Now;
                                            partida.Changed("FechaCerrado", true);
                                            partida.Changed("EstatusPartidaValor", true);
                                            partida.Changed("IdModificadoPor", true);
                                            partida.Changed("Modificado", true);

                                            await daoDET.SaveEntity(partida, false, false);
                                            foreach (var ppend in AceptadasPendientes)
                                            {
                                                if (ppend.Id == p.IdPartida)
                                                {
                                                    ppend.PendienteOt = false;
                                                }
                                            }
                                            if (!p.TerminadoCat)
                                            {
                                                p.FechaFinOT = DateTime.Now;
                                                p.UsuarioFinOT = base.getUserId();
                                                p.Changed("FechaFinOT", true);
                                                p.Changed("UsuarioFinOT", true);
                                                await daoOTD.SaveEntity(p, false, false);
                                            }
                                           
                                        }
                                    }

                                    closeReportByOT = true;
                                }

                                await daoOT.SaveEntity(o, false, false);
                            }
                        }
                        else
                        {
                            if (o.EstatusOrdenTrabajo.Clave == "T" || o.EstatusOrdenTrabajo.Clave == "C" || o.EstatusOrdenTrabajo.Clave == "X")
                            {
                                if (o.Partidas != null && o.Partidas.Count > 0)
                                {
                                    foreach (var p in o.Partidas)
                                    {
                                        foreach (var ppend in AceptadasPendientes)
                                        {
                                            if (ppend.Id == p.IdPartida)
                                            {
                                                ppend.PendienteOt = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (dictamenes != null)
                {
                    foreach (var dm in dictamenes)
                    {
                        bool sendPushNotificacion = false;
                        bool NuevoDictamen = dm.ID == null || dm.ID < 0 ? true : false;
                        if (dm.IdAgenda != null)
                        {
                            var agendaDetalle = await daoADET.GetById((int)dm.IdAgenda);
                            if (agendaDetalle != null)
                            {
                                agendaDetalle.IdUsuarioAsignado = dm.IdResponsableDictamen;
                                agendaDetalle.Changed("IdUsuarioAsignado", true);
                                await daoADET.SaveEntity(agendaDetalle);
                            }
                        }

                        if (dm.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            var estatusDictamenAbierto = await bpCG.Get("SPVESTATUSDICTAMEN", "I");

                            dm.Estatus = estatus;
                            dm.IdEstatus = estatus.ID;
                            dm.Modificado = DateTime.Now;
                            dm.IdModificadoPor = base.getUserId();
                            if (dm.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                if (dm.EstatusDictamenValue == null || dm.EstatusDictamenValue == "ABIERTO")
                                {
                                    dm.EstatusDictamenValue = estatusDictamenAbierto.Clave;
                                    dm.IdEstatusDictamen = (int)estatusDictamenAbierto.ID;
                                }
                            }
                            else
                            {
                                dm.EstatusDictamenValue = dm.EstatusDictamen.Clave;
                                dm.IdEstatusDictamen = (int)dm.EstatusDictamen.ID;
                            }
                            dm.IdResponsableDictamen = (int)dm.ResponsableDictamen.ID;
                            if (!NuevoDictamen  && dm.IdAgenda > 0)
                            {
                                var savedDictamen = await daoDIC.GetById(dm.ID.Value);
                                if(savedDictamen.IdResponsableDictamen != dm.IdResponsableDictamen)
                                {
                                    sendPushNotificacion = true;
                                }
                            }
                            

                            if (dm.IdReporte <= 0)
                            {
                                dm.IdReporte = (int)item.ID;
                            }

                            if (dm.IdReporteDetalle <= 0)
                            {
                                if (dm.Partida != null)
                                {
                                    dm.IdReporteDetalle = (int)dm.Partida.ID;
                                }
                            }

                            if (dm.ID == null || dm.ID <= 0)
                            {
                                dm.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            }

                            if (dm.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                dm.Activo = true;
                                dm.IdUsuarioCaptura = base.getUserId();
                                dm.FechaDictamen = DateTime.Now;
                                dm.Creado = DateTime.Now;
                                dm.IdCreadoPor = base.getUserId();
                            }

                            if (dm.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoDIC.Delete((int)dm.ID);

                                var parametros = new Dictionary<string, object>();
                                parametros.Add("entityId", (int)dm.ID);
                                parametros.Add("entityType", string.Format("reporte$dictamenes${0}", item.ID));

                                await bpFiles.DeleteByParams(parametros);
                            }
                            else
                            {
                                await daoDIC.SaveEntity(dm, false, true);
                            }
                            if (sendPushNotificacion)
                            {
                                var daoUsuariosEK = Get<d.Kontrol.Interfaces.IUsuarios>();
                                var currentUser = await daoUsuariosEK.GetById(base.getUserId());
                                var catDiagnostico = await daoUsuariosEK.GetById(dm.IdResponsableDictamen.Value);
                                var parametrosPushNotificacion = new Dictionary<string, object>();
                                parametrosPushNotificacion.Add("UserSend", currentUser.Email);
                                parametrosPushNotificacion.Add("UserTo", catDiagnostico.Email);
                                parametrosPushNotificacion.Add("Folio", dm.ID);
                                //parametrosPushNotificacion.Add("Folio", dm.IdReporte);
                                parametrosPushNotificacion.Add("FechaAgenda", dm.Agenda.FechaInicio.ToString("dd/MM/yyyy"));
                                parametrosPushNotificacion.Add("HoraAgenda", dm.Agenda.FechaInicio.ToString("HH:mm:ss"));
                                parametrosPushNotificacion.Add("Tipo", 1);
                                await this.SendPushNotificationToApp(parametrosPushNotificacion);
                            }
                        }
                        else
                        {
                            await daoDIC.SaveEntity(dm, false, true);
                        }

                        if (NuevoDictamen)
                        {
                            bool enviarAlertaGas = false;
                            bool enviarAlertaReincidencia = false;
                            var IDpartidasEnDictamen = dm.IdPartidas.Split(',');
                            List<m.SCV.Interfaces.IReporteFallaDetalle> PartidasEnDictamen = new List<m.SCV.Interfaces.IReporteFallaDetalle>();
                            List<m.SCV.Interfaces.IReporteFallaDetalle> PartidasReincidencia = new List<m.SCV.Interfaces.IReporteFallaDetalle>();
                            var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                            foreach (var IdPartida in IDpartidasEnDictamen)
                            {
                                var pta = partidas.Where(x => x.ID == Convert.ToInt32(IdPartida)).FirstOrDefault();
                                if (pta != null) PartidasEnDictamen.Add(pta);
                            }

                            foreach (var p in PartidasEnDictamen)
                            {
                                if (p.TipoFalla.Clave == "INSGA")
                                {
                                    enviarAlertaGas = true;
                                }

                                if (p.Reincidencias >= 3)
                                {
                                    enviarAlertaReincidencia = true;
                                    PartidasReincidencia.Add(p);
                                }

                            }
                            if (enviarAlertaGas)
                            {
                                dynamic o = new ExpandoObject();
                                o.UsuarioResponsable = $"{dm.ResponsableDictamen.ID} {dm.ResponsableDictamen.Nombre} {dm.ResponsableDictamen.Apellidos}";
                                o.NombreFraccionamiento = item.Desarrollo.Nombre;
                                o.EtapaUbicacion = item.SuperManzana;
                                o.UbicacionInfo = $"Manzana {item.Manzana} Lote {item.Lote} Interior {item.Interior} Exterior {item.Exterior}";
                                o.folio = item.ID;
                                o.diagnostico = dm.ID;

                                Drivers.Emailing.Plantilla plantillaObj;
                                int[] niveles = { 65, 78 };
                                string[] enviarA = await GetListaCorreosPlaza(niveles, item.IdPlaza);
                                plantillaObj = await this.GetPlantilla("ALERTA-INC-GAS", o);

                                bpClientEmail.SendMessage(enviarA, plantillaObj.Titulo, plantillaObj.Plantilla_Contenido);
                            }
                            if (enviarAlertaReincidencia)
                            {
                                dynamic o = new ExpandoObject();
                                o.UsuarioResponsable = $"{dm.ResponsableDictamen.ID} {dm.ResponsableDictamen.Nombre} {dm.ResponsableDictamen.Apellidos}";
                                o.FraccionamientoNombre = item.Desarrollo.Nombre;
                                o.EtapaUbicacion = item.SuperManzana;
                                o.UbicacionFormato = $"Manzana {item.Manzana} Lote {item.Lote} Interior {item.Interior} Exterior {item.Exterior}";
                                o.folio = item.ID;
                                o.diagnostico = dm.ID;

                                Drivers.Emailing.Plantilla plantillaObj;
                                int[] niveles = { 65, 78 };
                                string[] enviarA = await GetListaCorreosPlaza(niveles, item.IdPlaza);
                                plantillaObj = await this.GetPlantilla("ALERTA-REINC-GAS", o);

                                string tablestring = "<table class='table table-bordered' style='width: 100%;'><tbody> <tr style='font-weight:bold;'><td>Familia</td><td>Componente</td><td>Ubicacion incidencia</td></tr>";
                                foreach (var pr in PartidasReincidencia)
                                {
                                    string tr = $"<tr><td style='border: 1px solid black;'>{pr.TipoFalla.Nombre}</td><td style='border: 1px solid black;'>{pr.Falla.Descripcion}</td><td style='border: 1px solid black;'>{pr.UbicacionFalla.Descripcion}</td></tr>";
                                    tablestring += tr;
                                }
                                tablestring += "</tbody></table>";
                                plantillaObj.Plantilla_Contenido = plantillaObj.Plantilla_Contenido.Replace("TableString", tablestring);
                                bpClientEmail.SendMessage(enviarA, plantillaObj.Titulo, plantillaObj.Plantilla_Contenido);
                            }
                        }
                    }
                }

                if (AceptadasPendientes != null && AceptadasPendientes.Count > 0)
                {
                    foreach (var ppend in AceptadasPendientes)
                    {
                        if (ppend.PendienteOt)
                        {
                            closeReportByOT = false;
                            break;
                        }
                    }
                }

                if (item.IdEstatusReporte == "N")
                {
                    if (closeReportByOT == true || closeReportByPartidas == true)
                    {
                        item.Partidas = partidas;
                        item = await this.TryCerrarReporte(item, "T", true, CancelarPordiagnosticoNoProcede, partidas, dictamenes);
                    }
                }


                item = await this.afterGetItem(item);

                Commit();
                // ========== INICIO PREREPORTES

                // ========== FIN PREREPORTES
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            return item;
        }

       

        public async Task<m.SCV.Interfaces.IReporteFalla> TryCerrarReporte(m.SCV.Interfaces.IReporteFalla item, string estatus, bool validate, bool CancelarNoProcede, List<m.SCV.Interfaces.IReporteFallaDetalle> ptas, List<m.SCV.Interfaces.IReporteDictamen> dictamenes)
        {
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            m.SCV.Interfaces.IReporteFalla retValue = null;


            try
            {
                var ordenesEstatus = new List<string> { "N", "P", "L", "S", "E" };
                var partidasEstatus = new List<string> { "N", "P", "L", "A", "R", "D" };

                bool pendingItems = false;



                if (validate == true)
                {
                    var parametros = new Dictionary<string, object>();
                    parametros.Add("idReporte", item.ID);

                    var pendingPartidas = await daoDET.GetAll(parametros);
                    if (pendingPartidas != null)
                    {
                        foreach (var pp in pendingPartidas)
                        {
                            //if (pp.EstatusPartidaValor.Contains('D') && pp.Procede.Contains('N')) continue;
                            if (partidasEstatus.Contains(pp.EstatusPartidaValor, StringComparer.OrdinalIgnoreCase) && pp.EstatusDictamen == "ABIERTO")
                            {
                                pendingItems = true;
                            }
                        }
                    }

                    var pendingOrdenes = await daoOT.GetAll(parametros);
                    if (pendingOrdenes != null)
                    {
                        foreach (var po in pendingOrdenes)
                        {
                            if (ordenesEstatus.Contains(po.EstatusOrdenTrabajo.Clave, StringComparer.OrdinalIgnoreCase))
                            {
                                pendingItems = true;
                            }
                        }
                    }
                }

                if (!pendingItems && !CancelarNoProcede)
                {
                    int _id = (int)item.IdFolio;
                    item.IdFolio = item.ID;
                    item.ID = _id;
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    if (item.IdEstatusReporte != "X")
                    {
                        item.IdEstatusReporte = estatus;
                        if (item.FechaTerminacionFolio == null)
                        {
                            item.FechaTerminacionFolio = DateTime.Now;
                            item.FechaContratistaFinal = DateTime.Now;
                        }

                    }

                    item.IdModificadoPor = base.getUserId();
                    item.Modificado = DateTime.Now;
                    item.IdUsuarioProcesoFin = base.getUserId();

                    //item.IdRecibidoPor = base.getUserId();
                    //item.Recibido = DateTime.Now;

                    item.Changed("IdEstatusReporte", true);
                    item.Changed("IdModificadoPor", true);
                    item.Changed("Modificado", true);
                    item.Changed("IdUsuarioProcesoFin", true);
                    //item.Changed("IdRecibidoPor", true);
                    //item.Changed("Recibido", true);
                    item.Changed("FechaContratistaFinal", true);
                    item.Changed("FechaTerminacionFolio", true);

                    retValue = await this.dao.SaveEntity(item, false, false);
                    retValue = await this.dao.GetByEntityId((int)retValue.ID);
                    retValue = await this.afterGetItem(retValue);
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                }
                else
                {
                    
                    retValue = item;
                }

                if (CancelarNoProcede)
                {
                    // DESCOMENTAR LA SIGUIENTE LINEA  para aplicar cambios en cancelar

                     int IdFolio = (int)retValue.IdFolio;
                     item = await this.dao.GetByEntityId(IdFolio);
                     if(item.IdEstatusReporte == "X")
                     {
                         retValue = item;
                         return retValue;
                     }

                    // DESCOMENTAR LA SIGUIENTE LINEA  para aplicar cambios en cancelar
                    if (item.StandByCancelar != null && item.StandByCancelar.Value)
                    {
                    var cancelar = true;
                        var esperar24Horas = false;
                        var evidencias = await this.GetEvidencias((int)item.ID);
                        if (evidencias != null && evidencias.Count > 0)
                        {
                            evidencias = evidencias.Where(x => x.Imagen.Substring(0, 2) == "DI" || x.Imagen.Substring(0, 2) == "DR" || x.Imagen.Substring(0, 2) == "AD").ToList();
                        }
                        foreach (var p in ptas)
                        {
                            if (p.NoProcedeApp)
                            {
                                if (evidencias != null && evidencias.Count > 0)
                                {
                                    var evidencia_partida = evidencias.Where(x => x.IdPartida == p.ID.Value).ToList();
                                    if (evidencia_partida == null || evidencia_partida.Count <= 0)
                                    {
                                        cancelar = false;
                                        break;
                                    }

                                }
                                else
                                {
                                    cancelar = false;
                                    break;
                                }

                                // DESCOMENTAR LA SIGUIENTE LINEA  para aplicar cambios en cancelar
                                var dictamen = dictamenes.Where(x => x.IdPartidas.Contains(p.ID.Value.ToString())).FirstOrDefault();
                                if (dictamen != null)
                                {
                                    if(dictamen.TerminadoCat == false)
                                    {
                                        esperar24Horas = true;
                                    }
                                }
                               
                            }
                        }
                        if (cancelar)
                        {
                            // DESCOMENTAR LA SIGUIENTE LINEA  para aplicar cambios en cancelar
                             if (esperar24Horas)
                             {
                                 var FechaHoy = DateTime.Now;
                                 var diferencia = FechaHoy - item.FechaStandByCancelar;
                                 var diferenciaHoras = diferencia.Value.TotalHours;
                                 if (diferenciaHoras <= 24)
                                 {
                                     return retValue;
                                 }
                             }


                            int _id = (int)item.IdFolio;
                                item.IdFolio = item.ID;
                                item.ID = _id;
                                item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                item.IdModificadoPor = base.getUserId();
                                item.Modificado = DateTime.Now;
                                item.Changed("IdModificadoPor", true);
                                item.Changed("Modificado", true);
                                item.Cancelado = "S";
                                item.StandByCancelar = false;
                                item.FechaStandByCancelar = null;

                                item.IdMotivoCancelado = 70;
                                item.FechaCancelacion = DateTime.Now;
                                item.IdEstatusReporte = "X";

                                item.Changed("Cancelado", true);
                                item.Changed("IdMotivoCancelado", true);
                                item.Changed("FechaCancelacion", true);
                                item.Changed("IdEstatusReporte", true);
                                item.Changed("StandByCancelar", true);
                                item.Changed("FechaStandByCancelar", true);

                                retValue = await this.dao.SaveEntity(item, false, false);
                                retValue = await this.dao.GetByEntityId((int)retValue.ID);
                                retValue = await this.afterGetItem(retValue);
                                retValue.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                            

                            
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

        public string getCurrentEstatusApp()
        {
            string estatus = "";
            return estatus;
        }

        public async Task<string[]> GetListaCorreosPlaza(int[] niveles, string idplaza)
        {
            var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
            var parametrosPlaza = new Dictionary<string, object>();
            List<m.Kontrol.Interfaces.IUsuario> correosNiveles = null;
            List<string> enviarA = new List<string>();
            parametrosPlaza.Add("IdPlaza", idplaza);
            foreach (var n in niveles)
            {
                parametrosPlaza.Remove("IdNivel");
                parametrosPlaza.Add("IdNivel", n);
                correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                foreach (var correo in correosNiveles) { if (correo.Email != null) { enviarA.Add(correo.Email); } }
            }
            return enviarA.ToArray();
        }

        public async Task SendNotificationApp(dynamic user, string nombrePlantilla, string link, object obj, Dictionary<string, object> parametros)
        {
            var plantilla = await base.GetPlantilla(nombrePlantilla, obj);
            var bpNotificacion = Get<p.Kontrol.Interfaces.INotification>();
            var notification = await bpNotificacion.GetNewEntity();
            await Assign(notification);
            notification.TrackChanges = true;
            notification.ID = -1;
            //notification.IdEntidad = user.ID;
            notification.Link = link;

            notification.Nombre = plantilla.Titulo;
            //notification.Descripcion = plantilla.Plantilla_Contenido;
            notification.TipoEntidad = "U";
            notification.FromApp = true;
            await bpNotificacion.Save(notification);
        }
        public async Task<m.SCV.Interfaces.IReporteFalla> ReverseReporteFallas(m.SCV.Interfaces.IReporteFalla item)
        {
            var bpCausaFalla = Get<p.SCV.Interfaces.ICausasFallas>();
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
            var daoDict = Get<d.SCV.Interfaces.IReportesDictamenes>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistas>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBA>();

            try
            {
                BeginTransaction(true);
                var ordenesTrabajo = item.OrdenesTrabajo;
                var Dictamenes = item.Dictamenes;
                switch (item.IdEstatusReporte)
                {
                    case "T":
                        if (ordenesTrabajo != null && ordenesTrabajo.Count > 0)
                        {
                            var estatusNuevo = await bpCG.Get("SPVESTATUSOT", "N");
                            var causaFalla = await bpCausaFalla.GetByClave("DIN");

                            foreach (var ot in ordenesTrabajo)
                            {
                                if(ot.opcionAbrir.ID > 0)
                                {
                                    var partidasOT = ot.Partidas;
                                    switch (ot.opcionAbrir.Clave)
                                    {
                                        // ======= EN PROCESO
                                        case "EP":
                                            var estatusEnProceso = await bpCG.Get("SPVESTATUSOT", "E");
                                            ot.IdEstatusOrdenTrabajo = estatusEnProceso.ID;
                                            ot.FechaInicio = null;
                                            ot.FechaInicioReal = null;
                                            ot.FechaFin = null;
                                            ot.FechaFinReal = null;
                                            ot.DiasEstimadoCulminacion = 0;
                                            ot.Autorizada = false;
                                            ot.Modificado = DateTime.Now;
                                            ot.IdModificadoPor = base.getUserId();
                                            ot.Changed("IdEstatusOrdenTrabajo", true);
                                            ot.Changed("FechaInicio", true);
                                            ot.Changed("FechaInicioReal", true);
                                            ot.Changed("FechaFin", true);
                                            ot.Changed("FechaFinReal", true);
                                            ot.Changed("DiasEstimadoCulminacion", true);
                                            ot.Changed("Autorizada", true);
                                            ot.Changed("Modificado", true);
                                            ot.Changed("IdModificadoPor", true);
                                          
                                            await daoOT.SaveEntity(ot);
                                            //await this.UpdateEstatusPartidaOT(partidasOT);
                                            break;

                                        // ======= NUEVO CON AGENDA
                                        case "NCA":
                                            var idEstatusAgendaNuevo =  await bpCG.Get("AgendaEstatus", "ACT");
                                            var idAgenda = ot.IdAgenda;
                                            var agendaOT = await daoAgenda.GetById(idAgenda.Value);
                                            agendaOT.IdEstatusAgenda = idEstatusAgendaNuevo.ID.Value;
                                            agendaOT.Modificado = DateTime.Now;
                                            agendaOT.IdModificadoPor = base.getUserId();
                                            agendaOT.Changed("IdEstatusAgenda", true);
                                            agendaOT.Changed("Modificado", true);
                                            agendaOT.Changed("IdModificadoPor", true);
                                            await daoAgenda.SaveEntity(agendaOT, false);

                                            ot.IdEstatusOrdenTrabajo = estatusNuevo.ID;
                                            ot.FechaInicio = null;
                                            ot.FechaInicioReal = null;
                                            ot.FechaFin = null;
                                            ot.FechaFinReal = null;
                                            ot.DiasEstimadoCulminacion = 0;
                                            ot.Autorizada = false;
                                            ot.Modificado = DateTime.Now;
                                            ot.IdModificadoPor = base.getUserId();
                                            ot.Changed("IdEstatusOrdenTrabajo", true);
                                            ot.Changed("FechaInicio", true);
                                            ot.Changed("FechaInicioReal", true);
                                            ot.Changed("FechaFin", true);
                                            ot.Changed("FechaFinReal", true);
                                            ot.Changed("DiasEstimadoCulminacion", true);
                                            ot.Changed("Autorizada", true);
                                            ot.Changed("Modificado", true);
                                            ot.Changed("IdModificadoPor", true);
                                            await daoOT.SaveEntity(ot);
                                           // await this.UpdateEstatusPartidaOT(partidasOT);

                                            break;

                                        // ======= NUEVO SIN AGENDA
                                        case "NSA":
                                            var idAgenda2 = ot.IdAgenda;
                                            await daoAgenda.Delete(idAgenda2.Value);

                                            ot.IdEstatusOrdenTrabajo = estatusNuevo.ID;
                                            ot.FechaInicio = null;
                                            ot.FechaInicioReal = null;
                                            ot.FechaFin = null;
                                            ot.FechaFinReal = null;
                                            ot.DiasEstimadoCulminacion = 0;
                                            ot.IdAgenda = null;
                                            ot.Autorizada = false;
                                            ot.Modificado = DateTime.Now;
                                            ot.IdModificadoPor = base.getUserId();
                                            ot.Changed("IdEstatusOrdenTrabajo", true);
                                            ot.Changed("FechaInicio", true);
                                            ot.Changed("FechaInicioReal", true);
                                            ot.Changed("FechaFin", true);
                                            ot.Changed("FechaFinReal", true);
                                            ot.Changed("DiasEstimadoCulminacion", true);
                                            ot.Changed("IdAgenda", true);
                                            ot.Changed("Autorizada", true);
                                            ot.Changed("Modificado", true);
                                            ot.Changed("IdModificadoPor", true);
                                            await daoOT.SaveEntity(ot);
                                            //await this.UpdateEstatusPartidaOT(partidasOT);

                                            break;

                                        // ======= ELIMINAR
                                        case "DEL":
                                            var idAgendaOtDel = ot.IdAgenda;
                                            foreach (var d in partidasOT)
                                            {
                                                await daoOTD.Delete(d.ID.Value);
                                               
                                            }
                                            await daoAgenda.Delete(idAgendaOtDel.Value);

                                            await daoOT.Delete(ot.ID.Value);
                                            break;
                                    }

                                    foreach (var pp in partidasOT)
                                    {
                                        var p = await daoDET.GetById(pp.IdPartida);
                                        p.EstatusAutorizacion = "N";
                                        p.EstatusPartidaValor = "N";
                                        p.Procede = "S";
                                        p.IdCausaFalla = (int)causaFalla.ID;
                                        p.Modificado = DateTime.Now;
                                        p.IdModificadoPor = base.getUserId();
                                        p.Changed("EstatusAutorizacion", true);
                                        p.Changed("EstatusPartidaValor", true);
                                        p.Changed("Procede", true);
                                        p.Changed("IdCausaFalla", true);
                                        p.Changed("Modificado", true);
                                        p.Changed("IdModificadoPor", true);

                                        await daoDET.SaveEntity(p);
                                    }
                                }

                            }
                        }

                        break;

                    case "X":
                        if (ordenesTrabajo != null && ordenesTrabajo.Count > 0)
                        {
                            var estatusNuevo = await bpCG.Get("SPVESTATUSOT", "N");
                            var causaFalla = await bpCausaFalla.GetByClave("DIN");

                            foreach (var ot in ordenesTrabajo)
                            {
                                if (ot.IdEstatusOrdenTrabajo == 1095 || ot.seleccionAbrir)
                                {
                                    var partidasOT = ot.Partidas;
                                    if (partidasOT != null && partidasOT.Count > 0)
                                    {
                                        foreach (var pp in partidasOT)
                                        {
                                            var p = await daoDET.GetById(pp.IdPartida);
                                            p.EstatusAutorizacion = "N";
                                            p.EstatusPartidaValor = "N";
                                            p.Procede = "S";
                                            p.IdCausaFalla = (int)causaFalla.ID;
                                            p.Modificado = DateTime.Now;
                                            p.IdModificadoPor = base.getUserId();
                                            p.Changed("EstatusAutorizacion", true);
                                            p.Changed("EstatusPartidaValor", true);
                                            p.Changed("Procede", true);
                                            p.Changed("IdCausaFalla", true);
                                            p.Changed("Modificado", true);
                                            p.Changed("IdModificadoPor", true);

                                            await daoDET.SaveEntity(p);
                                        }
                                    }

                                    ot.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                    ot.IdEstatusOrdenTrabajo = estatusNuevo.ID;
                                    ot.FechaInicio = null;
                                    ot.FechaInicioReal = null;
                                    ot.FechaFin = null;
                                    ot.FechaFinReal = null;
                                    ot.DiasEstimadoCulminacion = 0;
                                    ot.Autorizada = false;
                                    ot.Modificado = DateTime.Now;
                                    ot.IdModificadoPor = base.getUserId();
                                    ot.IdAgenda = null;
                                    if (ot.Observaciones != null && ot.Observaciones.Contains("♪"))
                                    {
                                        var Obs = ot.Observaciones.Split('♪');
                                        ot.Observaciones = Obs[0];
                                    }
                                    ot.Changed("IdEstatusOrdenTrabajo", true);
                                    ot.Changed("FechaInicio", true);
                                    ot.Changed("FechaInicioReal", true);
                                    ot.Changed("FechaFin", true);
                                    ot.Changed("FechaFinReal", true);
                                    ot.Changed("DiasEstimadoCulminacion", true);
                                    ot.Changed("Autorizada", true);
                                    ot.Changed("Modificado", true);
                                    ot.Changed("IdModificadoPor", true);
                                    ot.Changed("IdAgenda", true);
                                    ot.Changed("Observaciones", true);

                                    await daoOT.SaveEntity(ot);
                                }
                            }
                        }
                        if (Dictamenes != null && Dictamenes.Count > 0)
                        {
                            foreach (var dictamen in Dictamenes)
                            {
                                var d = await daoDict.GetById(dictamen.ID.Value);
                                if (d.IdEstatusDictamen == 1095)
                                {
                                    var ptas = d.IdPartidas;
                                    var partidasDiagnostico = ptas.Split(',');
                                    foreach (var p in partidasDiagnostico)
                                    {
                                        var pta = await daoDET.GetById(Convert.ToInt32(p));
                                        pta.IdEstatusDictamen = 1101;
                                        pta.EstatusDictamen = "ABIERTO";
                                        if (pta.EstatusPartidaValor == "X")
                                        {
                                            pta.EstatusPartidaValor = "N";
                                            pta.Changed("EstatusPartidaValor", true);
                                        }
                                        pta.Changed("IdEstatusDictamen", true);
                                        pta.Changed("EstatusDictamen", true);

                                        await daoDET.SaveEntity(pta, false, false);
                                    }
                                    d.IdEstatusDictamen = 1101;
                                    d.EstatusDictamenValue = "I";
                                    d.IdAgenda = null;
                                    d.Changed("IdEstatusDictamen", true);
                                    d.Changed("EstatusDictamenValue", true);
                                    d.Changed("IdAgenda", true);
                                    await daoDict.SaveEntity(d);
                                }
                            }
                        }
                        break;
                }

                item.IdEstatusReporte = "N";
                item.Cancelado = "N";
                item.IdMotivoCancelado = null;
                item.FechaCancelacion = null;
                item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                item.IdEstatusRevisado = "N";
                item.Modificado = DateTime.Now;
                item.IdModificadoPor = base.getUserId();
                item.Changed("IdEstatusReporte", true);
                item.Changed("IdEstatusRevisado", true);
                item.Changed("Modificado", true);
                item.Changed("IdModificadoPor", true);
                item.Changed("Cancelado", true);
                item.Changed("IdMotivoCancelado", true);
                item.Changed("FechaCancelacion", true);
                item.Changed("Estado", true);


                int? id = item.IdFolio;
                item.IdFolio = item.ID;
                item.ID = id;

                await this.dao.SaveEntity(item);

                item.Estado = m.Kontrol.KontrolEstadosEnum.Exitoso;

                Commit();

                return item;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        public async Task UpdateEstatusPartidaOT(List<m.SCV.Interfaces.IOrdenTrabajoDetalleRUBA> partidasOT)
        {
            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            var bpCausaFalla = Get<p.SCV.Interfaces.ICausasFallas>();
            var causaFalla = await bpCausaFalla.GetByClave("DIN");
            foreach (var pp in partidasOT)
            {
                var p = await daoDET.GetById(pp.IdPartida);
                p.EstatusAutorizacion = "N";
                p.EstatusPartidaValor = "N";
                p.Procede = "S";
                p.IdCausaFalla = (int)causaFalla.ID;
                p.Modificado = DateTime.Now;
                p.IdModificadoPor = base.getUserId();
                p.Changed("EstatusAutorizacion", true);
                p.Changed("EstatusPartidaValor", true);
                p.Changed("Procede", true);
                p.Changed("IdCausaFalla", true);
                p.Changed("Modificado", true);
                p.Changed("IdModificadoPor", true);

                await daoDET.SaveEntity(p);
            }
          
        }

        public override async Task<m.SCV.Interfaces.IReporteFalla> Delete(int id)
        {
            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenes>();
            var bpFiles = Get<p.Kontrol.Interfaces.IKontrolFiles>();
            m.SCV.Interfaces.IReporteFalla retValue = null;

            try
            {
                BeginTransaction();

                var parametros = new Dictionary<string, object>();
                parametros.Add("idReporte", id);

                var partidas = await daoDET.GetAll(parametros);
                if (partidas != null && partidas.Count > 0)
                {
                    foreach (var p in partidas)
                    {
                        await daoDET.Delete((int)p.ID);
                    }
                }

                var dictamenes = await daoDIC.GetAll(parametros);
                if (dictamenes != null && dictamenes.Count > 0)
                {
                    foreach (var dm in dictamenes)
                    {
                        parametros.Clear();
                        parametros.Add("entityId", (int)dm.ID);
                        parametros.Add("entityType", string.Format("reporte$dictamenes${0}", id));

                        await bpFiles.DeleteByParams(parametros);
                        await daoDIC.Delete((int)dm.ID);
                    }
                }

                retValue = await this.dao.GetById(id);

                await this.dao.Delete((int)retValue.IdFolio);

                var deletedItem = await this.dao.GetById(id);
                if (deletedItem == null)
                {
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    retValue = deletedItem;
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                }

                await Log(retValue);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        private async Task<int> SavePartidas(List<m.SCV.Interfaces.IReporteFallaDetalle> partidas, m.SCV.Interfaces.IReporteFalla reporte, List<m.SCV.Interfaces.IOrdenTrabajoRUBA> OrdenesTrabajo, List<m.SCV.Interfaces.IReporteDictamen> Listdictamenes)
        {
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            var bpCausaFalla = Get<p.SCV.Interfaces.ICausasFallas>();
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            try
            {
                var estatus = await bpCG.Get("ESTATUS", "A");

                foreach (var p in partidas)
                {
                    //if(p.EstatusDictamen != "ABIERTO") {
                    //  p.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    //}

                    bool guardarPartida = true;

                    if (p.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                    {
                        m.SCV.Interfaces.IReporteFallaDetalle row = p;

                        if (row.TipoFalla == null)
                        {
                            base.SetReturnInfo(1, "No se capturó el Tipo de Falla en la partida " + row.Partida + ". Por favor verifique e intente de nuevo.");
                            return -1;
                        }

                        if (row.Falla == null)
                        {
                            base.SetReturnInfo(1, "No se capturó la Falla en la partida " + row.Partida + ". Por favor verifique e intente de nuevo.");
                            return -1;
                        }

                        if (row.UbicacionFalla == null)
                        {
                            base.SetReturnInfo(1, "No se capturó la Ubicación de la Falla en la partida " + row.Partida + ". Por favor verifique e intente de nuevo.");
                            return -1;
                        }

                        if (row.ID == null || row.ID <= 0)
                        {
                            row.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            row.Activo =  1;
                            row.CostoBase = 0;
                            row.Creado = DateTime.Now;
                            row.IdModificadoPor = base.getUserId();
                            row.EstatusAutorizacion = "N";
                            row.EstatusPartidaValor = "N";
                            row.EstatusDictamen = "ABIERTO";
                            row.IdEstatusDictamen = 1101;
                            row.FechaCambioEnDiagnostico = null;
                            row.UsuarioCambioEnDiagnostico = null;
                            if (row.CausaFalla == null)
                            {
                                var causaFalla = await bpCausaFalla.GetByClave("DIN");
                                if (causaFalla != null)
                                {
                                    row.IdCausaFalla = (int)causaFalla.ID;
                                    row.CausaFalla = causaFalla;
                                }
                            }
                            row.AutorizadoGerente = true;
                            if (row.Reincidencias <= 0 && row.DiasGarantia < 0)
                            {
                                row.AutorizadoGerente = false;
                            }
                        }
                        else
                        {
                            m.SCV.Interfaces.IReporteFallaDetalle bckp = p;
                            row = await daoDET.GetById((int)p.ID);
                            row.Partida = bckp.Partida;
                            row.Procede = bckp.Procede;
                            row.IdTipoFalla = Convert.ToInt32(bckp.TipoFalla.ID);
                            row.TipoFalla = bckp.TipoFalla;
                            row.IdFalla = bckp.Falla.IdFalla;
                            row.Falla = bckp.Falla;
                            row.IdCausaFalla = bckp.IdCausaFalla;
                            row.CausaFalla = bckp.CausaFalla;
                            row.IdUbicacionFalla = bckp.IdUbicacionFalla;
                            row.UbicacionFalla = bckp.UbicacionFalla;
                            row.IdContratista = bckp.IdContratista;
                            row.Contratista = bckp.Contratista;
                            row.TerminoGarantia = bckp.TerminoGarantia;
                            row.DiasGarantia = bckp.DiasGarantia;
                            row.FechaCerrado = bckp.FechaCerrado;
                            row.EstatusPartida = bckp.EstatusPartida;
                            row.EstatusPartidaValor = bckp.EstatusPartidaValor;
                            row.EstatusAutorizacion = bckp.EstatusAutorizacion;
                            row.PartidaAutorizada = bckp.PartidaAutorizada;
                            row.ObservacionesContratista = bckp.ObservacionesContratista;
                            row.Observaciones = bckp.Observaciones;
                            row.Dictamenes = bckp.Dictamenes;
                            row.Estado = bckp.Estado;
                            row.Version = bckp.Version;
                            row.TerminadoCat = bckp.TerminadoCat;
                        }

                        if (p.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            await daoDET.Delete((int)p.ID);
                        }
                        else
                        {
                            if (p.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                row.Creado = DateTime.Now;
                                row.IdCreadoPor = base.getUserId();
                                row.ReincidenciaNotificada = true;
                            }

                            if (row.CausaFalla != null)
                            {
                                row.IdCausaFalla = row.CausaFalla.IdCausaFalla;
                            }

                            if (row.DiasGarantia >= 0)
                            {
                                row.Procede = "S";
                            }
                            else
                            {
                                row.Procede = "N";
                            }

                            row.IdTipoFalla = Convert.ToInt32(row.TipoFalla.ID); ;
                            row.TipoFalla = row.TipoFalla;
                            row.IdFalla = row.Falla.IdFalla;
                            row.IdUbicacionFalla = row.UbicacionFalla.IdUbicacionFalla;
                            row.IdReporte = (int)reporte.ID;
                            row.IdResponsable = row.IdContratista;
                            row.DesarrolloClave = reporte.DesarrolloClave;
                            row.IdEstatus = estatus.ID;
                            row.Estatus = estatus;
                            row.Modificado = DateTime.Now;
                            row.IdModificadoPor = base.getUserId();

                            var dictamenes = row.Dictamenes;
                            if (dictamenes != null)
                            {
                                var dd = dictamenes.Where(d => d.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado).ToList();
                                if (dd != null && dd.Count > 0)
                                {
                                    var dictamen = dd.LastOrDefault();
                                    //if (dictamen.EstatusDictamen != null && dictamen.EstatusDictamen.Clave == "A")
                                    if (p.EstatusDictamen != null && p.EstatusDictamen == "ACEPTADO")
                                    {
                                        row.Procede = "S";
                                        row.EstatusPartidaValor = "N";
                                        row.IdEstatusDictamen = p.IdEstatusDictamen;
                                        row.EstatusDictamen = p.EstatusDictamen;
                                    }
                                    else
                                    {
                                        row.Procede = "N";
                                        row.EstatusPartidaValor = "D";
                                        row.IdEstatusDictamen = p.IdEstatusDictamen;
                                        row.EstatusDictamen = p.EstatusDictamen;
                                    }
                                    if ((reporte.EstatusReporte.Clave == "T" || reporte.EstatusReporte.Clave == "C") && row.EstatusPartidaValor == "D")
                                    {
                                        row.EstatusPartidaValor = "X";
                                    }

                                    //row.FechaCambioEnDiagnostico = DateTime.Now;
                                    if (p.EstatusDictamen == "ACEPTADO" || p.EstatusDictamen == "NO PROCEDE")
                                    {
                                        if (row.FechaCambioEnDiagnostico == null || row.FechaCambioEnDiagnostico.Value.Year <= 1)
                                        {
                                            //bool isInOT = false;
                                            //if(OrdenesTrabajo != null)
                                            //{
                                            //    foreach (var ot in OrdenesTrabajo)
                                            //    {
                                            //        var pta = ot.Partidas.Where(x => x.IdPartida == row.ID).FirstOrDefault();
                                            //        if (pta != null)
                                            //        {
                                            //            isInOT = true;
                                            //            break;
                                            //        }

                                            //    }
                                            //}
                                            
                                            if (!row.TerminadoCat)
                                            {
                                                row.FechaCambioEnDiagnostico = DateTime.Now;
                                                row.UsuarioCambioEnDiagnostico = base.getUserId();
                                            }
                                            
                                        }
                                    }

                                }
                            }

                            if (row.Procede == "S")
                            {
                                row.PartidaAutorizada = "A";
                            }
                            else
                            {
                                row.PartidaAutorizada = "R";
                            }

                            if (row.Reincidencias > 0 && row.DiasGarantia < 0)
                            {
                                row.Procede = "S";
                                row.PartidaAutorizada = "A";
                            }

                            //if(row.noProcedePorVigencia == true)
                            //{
                            //    row.Activo = 0;
                            //}

                            row = await daoDET.SaveEntity(row, false, false);

                            if (row.Reincidencias > 0 && p.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                try
                                {
                                    var parametroNotificacionReincidencias = new Dictionary<string, object>();
                                    parametroNotificacionReincidencias.Add("idCliente", reporte.IdCliente);
                                    parametroNotificacionReincidencias.Add("idFalla", row.Falla.IdFalla);
                                    parametroNotificacionReincidencias.Add("idTipoFalla", row.IdTipoFalla);
                                    parametroNotificacionReincidencias.Add("idUbicacionFalla", row.IdUbicacionFalla);
                                    // p.Add("proceden", "T");
                                    var reincidencias = await this.dao.GetNotificacionReincidencias(parametroNotificacionReincidencias);

                                    dynamic expando = new ExpandoObject();
                                    expando.Cliente = reporte.Cliente;
                                    expando.Ubicacion = await this.GetUbicacionById((int)reporte.IdUbicacion);
                                    expando.Partidas = reincidencias;

                                    object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                                    List<string> elementosEmails = new List<string>();
                                    ///////////////////////////////////////////////////
                                    var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                                    var parametrosPlaza = new Dictionary<string, object>();
                                    List<m.Kontrol.Interfaces.IUsuario> correosNiveles = null;

                                    parametrosPlaza.Add("IdPlaza", reporte.IdPlaza);
                                    parametrosPlaza.Add("IdNivel", 65); //65 GCIA
                                    correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                                    foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }

                                    parametrosPlaza.Remove("IdNivel");
                                    parametrosPlaza.Add("IdNivel", 84); //84 SCDC - GCIA
                                    correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                                    foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }

                                    parametrosPlaza.Remove("IdNivel");
                                    parametrosPlaza.Add("IdNivel", 133); //DIRECTOR TECNICO
                                    correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                                    foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }
                                    var ClaveFraccionamiento = expando.Ubicacion.DesarrolloClave;
                                    parametrosPlaza.Remove("IdNivel");
                                    parametrosPlaza.Add("IdNivel", 134); //CAT
                                                                         //=======
                                    parametrosPlaza.Add("ClaveFracc", ClaveFraccionamiento);


                                    //var parametrosOrdenTrabajo = new Dictionary<string, object>();
                                    //parametrosOrdenTrabajo.Add("IdOT", c.IdOrdenTrabajo);
                                    //correosNiveles = await daoPlaza.getUserByOrdenTrabajoID(parametrosOrdenTrabajo);
                                    //if (correosNiveles == null || correosNiveles.Count <= 0)
                                    //{
                                    //    correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                                    //}
                                    //correosNiveles = await daoPlaza.getCatByClaveUbicacion(parametrosPlaza);
                                    //if (correosNiveles.Count <= 0)
                                    //{
                                    //    correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                                    //}
                                    //==============
                                    //correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                                    foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }
                                    ///////////////////////////////////////////////////
                                    var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                                    var moneda = await bpMON.GetByClave("MXN");
                                    //Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("NOTIFICAR-REINCIDENCIAS-DOCUMENTO", obj, null, moneda);
                                    //Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);
                                    //EK.Drivers.Common.IKontrolFiles[] documentos = { documento };
                                    //var plantillaObj = await this.GetPlantilla("NOTIFICAR-REINCIDENCIAS", obj);
                                    //bpClientEmail.SendMessage(elementosEmails.ToArray(), null, plantillaObj.Titulo, plantillaObj.Plantilla_Contenido, documentos, true);
                                }
                                catch (FormatException)
                                {
                                    //base.SetReturnInfo(2, "No se pudo enviar la notificación, El correo no es válido.");
                                }
                                catch (Exception)
                                {
                                    ////base.SetReturnInfo(2, "No se pudo enviar la notificación:" + ex.Message);
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

            return 0;
        }

        public async Task<int> SaveEvidenciasCliente(Dictionary<string,object> parametros)
        {
            parametros.Add("usuario", base.getUserId());
            var val = await this.dao.SaveEvidenciaCliente(parametros);
            return val;
        }

        public async Task<int> DeleteEvidenciasCliente(Dictionary<string, object> parametros)
        {
            var val = await this.dao.DeleteEvidenciaCliente(parametros);
            return val;
        }


        private async Task<bool> EnviarEmailCambiocontratista(m.SCV.Interfaces.IOrdenTrabajoRUBA o, string IdPlaza, bool cambiocat)
        {
            try
            {
                var parametrosPlaza = new Dictionary<string, object>();
                var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                var daoAgenda = Get<d.SCV.Interfaces.IAgendaSPV>();
                var bpREP = Get<p.SCV.Interfaces.IReportesFallas>();
                var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
                List<string> elementosEmails = new List<string>();
                List<m.Kontrol.Interfaces.IUsuario> correosNiveles = null;
                var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
                //var ClaveFraccionamiento = c.Ubicacion.DesarrolloClave;
                //var ubi = bpREP.GetUbicacionById(o.IdReporte);

                //parametrosPlaza.Add("IdPlaza", IdPlaza);
                //parametrosPlaza.Add("IdNivel", 134);
                ////var folio = bpREP.GetUbicacionById
                ////parametrosPlaza.Add("ClaveFracc", ClaveFraccionamiento);

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
                //correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);

                foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }
                var ot = await daoOT.SaveEntity(o, false, true);
                var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                var moneda = await bpMON.GetByClave("MXN");
                //elementosEmails.Clear();
                //elementosEmails.Add("fvillegas@enkontrol.com");
                string[] to = elementosEmails.ToArray();
                var documento = await this.GetDocumentOTHtmlFile(o.ID.Value);
                //var documento = await bpREP.GetDocumentOT(o.ID.Value);
                var tituloAdicionalPlantilla = "";
                EK.Drivers.Common.IKontrolFiles[] documentos = { documento };

                bool addCC = false;
                List<string> EmailsCC = new List<string>();
                var parametrosUsuariosEmailCat = new Dictionary<string, object>();
                var parametrosUsuariosEmailPlazaCC = new Dictionary<string, object>();
                parametrosUsuariosEmailCat.Add("IdParametro", 108);
                parametrosUsuariosEmailPlazaCC.Add("IdParametro", 109); //Plazas a las que se pondra copia
                var result = await daoAgenda.GetUsuariosEmailCat(parametrosUsuariosEmailCat);
                var plazasCC = await daoAgenda.GetPlazasEmailCC(parametrosUsuariosEmailPlazaCC);
                if (result != null)
                {
                    string stringPlz = "";
                    if (plazasCC != null)
                    {
                        dynamic jsonPlz = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(plazasCC));
                        var valorPlz = jsonPlz[0];
                        stringPlz = valorPlz.valor;
                        if (stringPlz == "" || stringPlz.ToLower() == "all" || stringPlz.Contains(IdPlaza))
                        {
                            addCC = true;
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

                Drivers.Emailing.Plantilla plantillaObj;
                if (cambiocat)
                {
                    plantillaObj = await this.GetPlantilla("NOTIFICAR-NUEVA-AGENDA-CONTRATISTA", o);
                }
                else
                {
                    plantillaObj = await this.GetPlantilla("NOTIFICAR-CAMBIOCONTRATISTA", o);
                }

                bpClientEmail.SendMessage(to, EmailsCC.ToArray(), $"{ plantillaObj.Titulo}{ tituloAdicionalPlantilla}", plantillaObj.Plantilla_Contenido, documentos, true);
                var daoUsuariosEK = Get<d.Kontrol.Interfaces.IUsuarios>();
                var currentUser = await daoUsuariosEK.GetById(base.getUserId());
                var parametrosPushNotificacion = new Dictionary<string, object>();
                parametrosPushNotificacion.Add("UserSend", currentUser.Email);
                parametrosPushNotificacion.Add("UserTo", to[0]);
                parametrosPushNotificacion.Add("Folio", o.ID);
                //parametrosPushNotificacion.Add("Folio", o.IdReporte);
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

       

        protected override async Task<m.SCV.Interfaces.IReporteFalla> saveModel(m.SCV.Interfaces.IReporteFalla item)
        {
            m.SCV.Interfaces.IReporteFalla retValue = null;

            int? id = item.IdFolio;
            item.IdFolio = item.ID;
            item.ID = id;

            item.IdFolio = item.IdFolio > 0 ? item.IdFolio : null;
            item.ID = item.ID > 0 ? item.ID : -1;

            item.Estado = item.ID == null || item.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
            if (item != null)
            {
                item.Modificado = DateTime.Now;
                item.IdModificadoPor = base.getUserId();
            }

            if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
            {
                item.Creado = DateTime.Now;
                item.IdCreadoPor = base.getUserId();
            }

            retValue = await this.dao.SaveEntity(item, false, true);
            retValue = await this.dao.GetByEntityId((int)retValue.ID);
            retValue.Estado = item.ID == null || item.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;

            await this.afterSaveItem(retValue);
            await this.afterSaveItem(retValue, item);
            //await Log(retValue);

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IReporteFalla> LoadReporte(int idPrereporte)
        {
            var bpPRE = Get<p.SCV.Interfaces.IPrereportes>();
            var daoDT = Get<d.Kontrol.Interfaces.IDateDifference>();
            var daoCU = Get<d.SCV.Interfaces.IContratistasUbicaciones>();
            var daoDET = Get<d.SCV.Interfaces.IPrereportesDetalles>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpCU = Get<p.SCV.Interfaces.IContratistasUbicaciones>();
            var bpCF = Get<p.SCV.Interfaces.ICausasFallas>();

            try
            {
                var pprt = await bpPRE.GetById(idPrereporte);

                var retValue = Get<m.SCV.Interfaces.IReporteFalla>();
                retValue.IdCliente = pprt.IdCliente;
                retValue.Cliente = pprt.Cliente;
                retValue.Ubicacion = await this.GetUbicacionById((int)pprt.IdUbicacion);
                retValue.Contactos = await this.GetContactoCliente(pprt.IdCliente);

                DateTime fechaEntrega = DateTime.Now;

                var etapa = await this.GetClienteEtapa(pprt.IdCliente, DateTime.Now);
                if (etapa != null && etapa.FechaLiberacion != null)
                {
                    fechaEntrega = (DateTime)etapa.FechaLiberacion;
                }

                if (pprt.Cliente != null)
                {
                    // var diff = await daoDT.GetDateDifference("yy", fechaEntrega, DateTime.Now);
                    var diff = 0;
                    retValue.Cliente.Antiguedad = 0;
                }

                var parametros = new Dictionary<string, object>();
                parametros.Add("idUbicacion", pprt.IdUbicacion);
                retValue.Contratistas = await daoCU.GetAll(parametros);

                var cOrigen = await bpCU.GetContratistaDefault((int)pprt.IdUbicacion);
                if (cOrigen != null)
                {
                    retValue.Contratista = cOrigen;
                    retValue.IdContratista = cOrigen.ID;
                }

                var newPartidas = new List<m.SCV.Interfaces.IReporteFallaDetalle>();

                parametros.Clear();
                parametros.Add("idPrereporte", pprt.IdPrereporte);
                parametros.Add("idCliente", pprt.IdCliente);
                var prePartidas = await daoDET.GetAll(parametros);

                if (prePartidas != null)
                {
                    for (int i = 0; i < prePartidas.Count; i++)
                    {
                        var pp = prePartidas[i];
                        var np = Get<m.SCV.Interfaces.IReporteFallaDetalle>();
                        np.IdUbicacionFalla = pp.IdUbicacionFalla;
                        np.UbicacionFalla = pp.UbicacionFalla;
                        np.IdCliente = pp.IdCliente;
                        np.Cliente = pp.Cliente;
                        np.Partida = pp.Partida;
                        np.Observaciones = pp.Observaciones;
                        np.TerminoGarantia = DateTime.Now;
                        np.DiasGarantia = 0;
                        np.PartidaAutorizada = "A";
                        np.Procede = "S";
                        np.EstatusAutorizacion = "N";
                        np.EstatusPartidaValor = "N";
                        np.EstatusPartida = await bpCGV.Get("SPVESTATUSREPORTEPARTIDA", "N");
                        np.Reincidencias = 0;
                        np.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        np.ID = (i + 1) * -1;

                        if (cOrigen != null)
                        {
                            np.Contratista = cOrigen;
                            np.IdContratista = cOrigen.ID;
                        }

                        var causaFalla = await bpCF.GetByClave("DIN");
                        if (causaFalla != null)
                        {
                            np.IdCausaFalla = (int)causaFalla.ID;
                            np.CausaFalla = causaFalla;
                        }

                        newPartidas.Add(np);
                    }
                }

                retValue.Partidas = newPartidas;
                retValue.OrdenesTrabajo = new List<m.SCV.Interfaces.IOrdenTrabajoRUBA>();
                retValue.IdPrereporte = idPrereporte;
                retValue.Prereporte = pprt;
                retValue.FechaEntregaVivienda = fechaEntrega;
                retValue.FechaCaptura = DateTime.Now;
                retValue.MesesTranscurridos = 0;
                retValue.IdEstatusReporte = "N";
                retValue.EstatusReporte = await bpCGV.Get("SPVESTATUSREPORTEFALLAS", "N");

                if (fechaEntrega != null)
                {
                    var diff = await daoDT.GetDateDifference("dd", fechaEntrega, DateTime.Now);
                    retValue.MesesTranscurridos = diff.Days;
                }

                retValue.DiasSolucion = 0;
                retValue.DiasContratista = 0;

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        protected override async Task<m.SCV.Interfaces.IReporteFalla> afterGetItem(m.SCV.Interfaces.IReporteFalla item)
        {
            var daoCU = Get<d.SCV.Interfaces.IContratistasUbicaciones>();
            var daoRP = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBA>();
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenes>();
            var daoDT = Get<d.Kontrol.Interfaces.IDateDifference>();

            item.Ubicacion = await this.GetUbicacionById((int)item.IdUbicacion);
            item.Contactos = await this.GetContactoCliente(item.IdCliente);

            var fechaLiberacion = DateTime.Now;
            var etapa = await this.GetClienteEtapa(item.IdCliente, (DateTime)item.FechaCaptura);
            if (etapa != null && etapa.FechaLiberacion != null)
            {
                fechaLiberacion = (DateTime)etapa.FechaLiberacion;
            }

            if (item.Cliente != null)
            {
                var diff = await daoDT.GetDateDifference("yy", fechaLiberacion, DateTime.Now);
                item.Cliente.Antiguedad = diff.Year;
            }

            var parametros = new Dictionary<string, object>();
            parametros.Add("idUbicacion", item.IdUbicacion);
            item.Contratistas = await daoCU.GetAll(parametros);

            parametros.Clear();
            parametros.Add("idReporte", item.ID);

            item.Partidas = await daoRP.GetAll(parametros);
            item.Dictamenes = await daoDIC.GetAll(parametros);
            item.OrdenesTrabajo = await daoOT.GetAll(parametros);

            if (item.Partidas != null && item.Partidas.Count > 0)
            {
                foreach (var pp in item.Partidas)
                {
                    var re = await this.CalcularReincidencias(pp);
                    if (re != null)
                    {
                        pp.Reincidencias = re.Reincidencias;
                        pp.ReincidenciasValues = re.ReincidenciasValues;
                    }
                    pp.ListaEvidenciasCte = await this.GetEvidenciasCliente(pp.ID.Value);

                    if (item.Dictamenes != null)
                    {
                        pp.Dictamenes = item.Dictamenes.FindAll(dm => dm.IdReporte == pp.IdReporte && dm.IdReporteDetalle == pp.ID);
                    }
                }
            }

            if (item.OrdenesTrabajo != null)
            {
                foreach (var ot in item.OrdenesTrabajo)
                {
                    parametros.Clear();
                    parametros.Add("idOrdenTrabajo", ot.ID);
                    ot.Partidas = await daoOTD.GetAll(parametros);
                }
            }

            if (item.FechaCaptura == null)
            {
                item.FechaCaptura = DateTime.Now;
            }

            if (item.FechaEntregaVivienda != null)
            {
                var diff = await daoDT.GetDateDifference("dd", (DateTime)item.FechaEntregaVivienda, (DateTime)item.FechaCaptura);
                item.MesesTranscurridos = diff.Days;
            }
            else
            {
                item.MesesTranscurridos = 0;
            }

            this.CalcularTiemposReparacion(ref item);
            item.EvidenciasReporte = await this.GetEvidencias(item.ID.Value);

            if(item.EvidenciasReporte.Count > 0)
            {
                foreach(var e in item.EvidenciasReporte)
                {
                    if (e.ind_archivo)
                    {
                        byte[] imageArray = System.IO.File.ReadAllBytes(@"\\\\10.1.70.29\\Enkontrol_GEOJSON\\"+e.Imagen);
                        string base64Image = Convert.ToBase64String(imageArray);
                        e.b64Img = $"data:image/png;base64,{base64Image}";
                    }
                }
            }

            item.HistorialFechasOT = await this.GetHistorialFechasOT(item.ID.Value);

            return await base.afterGetItem(item);
        }

        public void CalcularTiemposReparacion(ref m.SCV.Interfaces.IReporteFalla item)
        {
            item.DiasSolucion = 0;
            item.FechaSolucionReporte = item.FechaCaptura.Value.Date;
            item.DiasContratista = 0;

            if (item.OrdenesTrabajo != null && item.OrdenesTrabajo.Count > 0)
            {
                var items = item.OrdenesTrabajo.Where(o => o.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado).ToList();
                if (items != null && items.Count > 0)
                {
                    DateTime? fechaFinal = items.Max(o => o.FechaFin);
                    item.FechaSolucionTerminacion = fechaFinal;

                    if (fechaFinal != null && item.FechaCaptura != null)
                    {
                        item.DiasSolucion = ((fechaFinal.Value.Date - item.FechaSolucionReporte.Value.Date).Days) + 1;
                    }

                    DateTime? fechaInicial = items.Min(o => o.FechaInicioReal);
                    item.FechaContratistaInicial = fechaInicial;

                    var terminadas = items.All(o => o.FechaFinReal != null && o.EstatusOrdenTrabajo.Clave == "T");
                    if (terminadas == true)
                    {
                        fechaFinal = items.Max(o => o.FechaFinReal);
                        item.FechaContratistaFinal = fechaFinal;

                        if (fechaFinal != null && fechaInicial != null)
                        {
                            item.DiasContratista = ((fechaFinal.Value.Date - fechaInicial.Value.Date).Days) + 1;
                        }
                    }
                }
            }
        }

        public async Task<List<m.SCV.Interfaces.IReporteFallaDetalle>> GetReincidencias(Dictionary<string, object> parametros)
        {
            return await this.dao.GetReincidencias(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IReporteFallaDetalle>> GetNotificacionReincidencias(Dictionary<string, object> parametros)
        {
            return await this.dao.GetNotificacionReincidencias(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IClienteContactos>> GetContactoCliente(int idCliente)
        {
            var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();
            var daoCSPV = Get<d.SCV.Interfaces.IClientesSPV>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            try
            {
                bool addTelefonoCasa = true;
                bool addTelefonoOficina = true;
                bool addTelefonoOtro = true;

                var parametros = new Dictionary<string, object>();
                parametros.Add("idCliente", idCliente);

                var contactos = await daoRL.GetAll(parametros);
                if (contactos != null)
                {
                    var contactosTelefono = contactos.FindAll(c => c.TipoContacto.Clave == "TELEFONO");
                    if (contactosTelefono != null)
                    {
                        addTelefonoCasa = !contactosTelefono.Exists(c => c.TipoTelefono.Clave == "CS");
                        addTelefonoOficina = !contactosTelefono.Exists(c => c.TipoTelefono.Clave == "T");
                        addTelefonoOtro = !contactosTelefono.Exists(c => c.TipoTelefono.Clave == "O");
                    }
                }

                var clienteSPV = await daoCSPV.GetById(idCliente);

                if (addTelefonoCasa == true)
                {
                    if (!string.IsNullOrEmpty(clienteSPV.TelefonoCasa))
                    {
                        var item = Get<m.SCV.Interfaces.IClienteContactos>();
                        item.ID = -1;
                        item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        item.Contacto = clienteSPV.TelefonoCasa;
                        item.TipoContacto = await bpCGV.Get("TIPOCONTACTO", "TELEFONO");
                        item.TipoTelefono = await bpCGV.Get("TIPOTELEFONO", "CS");
                        contactos.Add(item);
                    }
                }

                if (addTelefonoOficina == true)
                {
                    if (!string.IsNullOrEmpty(clienteSPV.TelefonoOficina))
                    {
                        var item = Get<m.SCV.Interfaces.IClienteContactos>();
                        item.ID = -2;
                        item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        item.Contacto = clienteSPV.TelefonoOficina;
                        item.TipoContacto = await bpCGV.Get("TIPOCONTACTO", "TELEFONO");
                        item.TipoTelefono = await bpCGV.Get("TIPOTELEFONO", "T");
                        contactos.Add(item);
                    }
                }

                if (addTelefonoOtro == true)
                {
                    if (!string.IsNullOrEmpty(clienteSPV.TelefonoOtros))
                    {
                        var item = Get<m.SCV.Interfaces.IClienteContactos>();
                        item.ID = -3;
                        item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        item.Contacto = clienteSPV.TelefonoOtros;
                        item.TipoContacto = await bpCGV.Get("TIPOCONTACTO", "TELEFONO");
                        item.TipoTelefono = await bpCGV.Get("TIPOTELEFONO", "O");
                        contactos.Add(item);
                    }
                }

                return contactos;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IClienteContactos>> GetOnlycontactosAdicionalesCliente(int idCliente)
        {
            var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();
            var daoCSPV = Get<d.SCV.Interfaces.IClientesSPV>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            try
            {
                bool addTelefonoCasa = true;
                bool addTelefonoOficina = true;
                bool addTelefonoOtro = true;

                var parametros = new Dictionary<string, object>();
                parametros.Add("idCliente", idCliente);

                var contactos = await daoRL.GetAll(parametros);
                if (contactos != null)
                {
                    var contactosTelefono = contactos.FindAll(c => c.TipoContacto.Clave == "TELEFONO");
                    if (contactosTelefono != null)
                    {
                        addTelefonoCasa = !contactosTelefono.Exists(c => c.TipoTelefono.Clave == "CS");
                        addTelefonoOficina = !contactosTelefono.Exists(c => c.TipoTelefono.Clave == "T");
                        addTelefonoOtro = !contactosTelefono.Exists(c => c.TipoTelefono.Clave == "O");
                    }
                }

                //var clienteSPV = await daoCSPV.GetById(idCliente);

                //if (addTelefonoCasa == true)
                //{
                //    if (!string.IsNullOrEmpty(clienteSPV.TelefonoCasa))
                //    {
                //        var item = Get<m.SCV.Interfaces.IClienteContactos>();
                //        item.ID = -1;
                //        item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                //        item.Contacto = clienteSPV.TelefonoCasa;
                //        item.TipoContacto = await bpCGV.Get("TIPOCONTACTO", "TELEFONO");
                //        item.TipoTelefono = await bpCGV.Get("TIPOTELEFONO", "CS");
                //        contactos.Add(item);
                //    }
                //}

                //if (addTelefonoOficina == true)
                //{
                //    if (!string.IsNullOrEmpty(clienteSPV.TelefonoOficina))
                //    {
                //        var item = Get<m.SCV.Interfaces.IClienteContactos>();
                //        item.ID = -2;
                //        item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                //        item.Contacto = clienteSPV.TelefonoOficina;
                //        item.TipoContacto = await bpCGV.Get("TIPOCONTACTO", "TELEFONO");
                //        item.TipoTelefono = await bpCGV.Get("TIPOTELEFONO", "T");
                //        contactos.Add(item);
                //    }
                //}

                //if (addTelefonoOtro == true)
                //{
                //    if (!string.IsNullOrEmpty(clienteSPV.TelefonoOtros))
                //    {
                //        var item = Get<m.SCV.Interfaces.IClienteContactos>();
                //        item.ID = -3;
                //        item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                //        item.Contacto = clienteSPV.TelefonoOtros;
                //        item.TipoContacto = await bpCGV.Get("TIPOCONTACTO", "TELEFONO");
                //        item.TipoTelefono = await bpCGV.Get("TIPOTELEFONO", "O");
                //        contactos.Add(item);
                //    }
                //}

                return contactos;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IUbicaciones> GetUbicacionById(int id)
        {
            var daoUbicaciones = Get<d.SCV.Interfaces.IUbicaciones>();
            var retValue = await daoUbicaciones.GetById(id);
            retValue.Plaza = retValue.Plaza != null ? retValue.Plaza : Get<m.SCV.Interfaces.IPlaza>();
            retValue.Plaza.ValidarResponsablePlaza = await this.dao.ValidarResponsablePlaza(retValue.IdPlaza);
            return retValue;
        }

        public async Task<m.SCV.Interfaces.IClienteSPVEtapa> GetClienteEtapa(int idCliente, DateTime fechaReporte)
        {
            var daoDT = Get<d.Kontrol.Interfaces.IDateDifference>();
            var daoCPV = Get<d.SCV.Interfaces.IClientesSPV>();
            var daoUB = Get<d.SCV.Interfaces.IUbicaciones>();

            var retValue = Get<m.SCV.Interfaces.IClienteSPVEtapa>();
            retValue.MesesTranscurridos = 0;
            retValue.MesesTranscurridosEntrega = 0;

            var cliente = await daoCPV.GetById(idCliente);
            if (cliente != null && cliente.IdUbicacion != null)
            {
                var ubicacion = await daoUB.GetById(cliente.IdUbicacion ?? 0);
                if (ubicacion != null && ubicacion.FechaEntregaCalidad != null)
                {
                    var diff = await daoDT.GetDateDifference("dd", (DateTime)ubicacion.FechaEntregaCalidad, fechaReporte);
                    var diffDias = await daoDT.GetDateDifference("mm", (DateTime)ubicacion.FechaEntregaCalidad, fechaReporte);
                    retValue.MesesTranscurridos = diff.Days;
                    retValue.MesesTranscurridosEntrega = diffDias.Month;
                    retValue.FechaLiberacion = ubicacion.FechaEntregaCalidad;
                }
            }

            return retValue;
        }

        public async Task<List<m.SCV.Interfaces.IComponente>> GetComponentes(Dictionary<string, object> parametros)
        {
            return await this.dao.GetComponentes(parametros);
        }

        private async Task<m.SCV.Interfaces.IReporteFallaDetalle> CalcularGarantia(m.SCV.Interfaces.IReporteFallaDetalle partida, int duracionGarantia, DateTime fechaEntrega, DateTime fechaCaptura)
        {
            var daoDT = Get<d.Kontrol.Interfaces.IDateDifference>();

            try
            {
                DateTime terminoGarantia = fechaEntrega.AddMonths(duracionGarantia);
                var diff = await daoDT.GetDateDifference("dd", fechaCaptura, terminoGarantia);
                partida.DiasGarantia = diff.Days + 1;
                partida.TerminoGarantia = terminoGarantia;

                return partida;
            }
            catch
            {
                throw new Exception("Error al calcular la garantía de la partida ");
            }
        }

        public async Task<m.SCV.Interfaces.IReporteFallaDetalle> CalcularPartida(m.SCV.Interfaces.IReporteFallaDetalle partida, m.SCV.Interfaces.IReporteFalla reporte)
        {
            var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpCausaFalla = Get<p.SCV.Interfaces.ICausasFallas>();

            try
            {
                var falla = await this.dao.GetFallaPartida((int)partida.Falla.IdFalla, (int)partida.Falla.IdTipoFalla);
                if (falla == null)
                {
                    base.SetReturnInfo(1, "La Falla seleccionada no corresponde con el Tipo de Falla o el Tipo de Vivienda Establecido.");
                    return null;
                }

                int valida_vivienda_entregada = await this.dao.ValidarEntregaVivienda();
                if (valida_vivienda_entregada == 1)
                {
                    if (reporte.FechaEntregaVivienda == null)
                    {
                        base.SetReturnInfo(1, "Al cliente no se le ha entregado la vivienda. Por favor verifique la información e intente de nuevo.");
                        return null;
                    }
                }

                if (reporte.FechaEntregaVivienda != null)
                {
                    if (reporte.ID <= 0 || reporte.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                    {
                        reporte.FechaCaptura = DateTime.Now;
                    }

                    partida = await this.CalcularGarantia(partida, (int)falla.DuracionGarantia, (DateTime)reporte.FechaEntregaVivienda, (DateTime)reporte.FechaCaptura);
                }
                else
                {
                    partida.TerminoGarantia = DateTime.Now;
                    partida.DiasGarantia = 0;
                }

                if (partida.DiasGarantia >= 0)
                {
                    partida.PartidaAutorizada = "A";
                    partida.Procede = "S";
                }
                else
                {
                    partida.PartidaAutorizada = "R";
                    partida.Procede = "N";
                }

                partida.EstatusAutorizacion = "N";
                partida.EstatusPartidaValor = "N";
                partida.EstatusPartida = await bpEstatus.Get("SPVESTATUSREPORTEPARTIDA", "N");

                if (partida.ID == null || partida.ID <= 0)
                {
                    partida.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

                    var causaFalla = await bpCausaFalla.GetByClave("DIN");
                    if (causaFalla != null)
                    {
                        partida.IdCausaFalla = (int)causaFalla.ID;
                        partida.CausaFalla = causaFalla;
                    }
                }
                else
                {
                    partida.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                }

                return partida;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IReporteFallaDetalle> AutorizarPartidasSinGarantia(dynamic parametros)
        {
            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            var daoBIT = Get<d.SCV.Interfaces.IBitacoraAutorizacionIncidencia>();
            var daoUSER = Get<d.Kontrol.Interfaces.IUsuarios>();
            dynamic param = Newtonsoft.Json.JsonConvert.DeserializeObject(parametros);
            string nivelesstring = (string)param.NivelAutorizador;
            var nivelesautorizadores = nivelesstring.Split(',');
            try
            {
                if (param.AutorizarSinValidar == true)
                {

                    m.SCV.Interfaces.IReporteFallaDetalle Partida = await daoDET.GetById((int)param.Incidencia);
                    if (Partida != null)
                    {
                        Partida.AutorizadoGerente = true;
                        Partida.Changed("AutorizadoGerente", true);

                        var retValue = await daoDET.SaveEntity(Partida, false, false);
                        if (retValue != null)
                        {
                            var parametrosBit = new Dictionary<string, object>();

                            DateTime fechaentviv = param.FechaEntregaViv;
                            DateTime fechaVencimiento = param.VencimientoGarantia;

                            parametrosBit.Add("Plaza", (string)param.Plaza);
                            parametrosBit.Add("Cliente", (string)param.Cliente);
                            parametrosBit.Add("Folio", (string)param.Folio);
                            parametrosBit.Add("Incidencia", (string)param.Incidencia);
                            parametrosBit.Add("FechaEntregaVivienda", fechaentviv);
                            parametrosBit.Add("VencimientoGarantia", fechaVencimiento);
                            parametrosBit.Add("FechaAutorizacion", DateTime.Now);
                            parametrosBit.Add("UsuarioAutorizo", base.getUserId());
                            parametrosBit.Add("NoIncidencia", (string)param.NoIncidencia);
                            try
                            {
                                await this.dao.SaveBitacoraAutorizacion(parametrosBit);

                            }
                            catch (Exception exc)
                            {
                                base.SetReturnInfo(1, "Se autorizo la incidencia, no se pudo guardar la bitacora");
                                return null;
                            }
                        }


                        return retValue;
                    }
                    else
                    {
                        base.SetReturnInfo(1, "Hay un error con la partida");
                        return null;
                    }
                }
                else
                {
                    int NumUsuario = (int)param.NumeroUsuario;
                    dynamic user = await daoUSER.Login(NumUsuario.ToString());
                    if (user != null)
                    {
                        bool IsNivelAutorizador = false;
                        string nivelUsuario = user.Nivel.ToString();
                        foreach (var n in nivelesautorizadores)
                        {
                            if (nivelUsuario == n)
                            {
                                IsNivelAutorizador = true;
                                break;
                            }
                        }
                        if (!IsNivelAutorizador)
                        {
                            base.SetReturnInfo(1, "El usuario ingresado no tiene el nivel para autorizar");
                            return null;
                        }
                        string userID = $"{user.ID}@{param.ClaveUsuario}";
                        string loginPassword = this.generateSHA512String(userID);
                        if (user.Password != loginPassword)
                        {
                            base.SetReturnInfo(1, "clave incorrecta");
                            return null;

                        }
                        else
                        {
                            m.SCV.Interfaces.IReporteFallaDetalle Partida = await daoDET.GetById((int)param.Incidencia);
                            if (Partida != null)
                            {
                                Partida.AutorizadoGerente = true;
                                Partida.Changed("AutorizadoGerente", true);
                                var retValue = await daoDET.SaveEntity(Partida, false, false);
                                if (retValue != null)
                                {
                                    var parametrosBit = new Dictionary<string, object>();

                                    DateTime fechaentviv = param.FechaEntregaViv;
                                    DateTime fechaVencimiento = param.VencimientoGarantia;

                                    parametrosBit.Add("Plaza", (string)param.Plaza);
                                    parametrosBit.Add("Cliente", (string)param.Cliente);
                                    parametrosBit.Add("Folio", (string)param.Folio);
                                    parametrosBit.Add("Incidencia", (string)param.Incidencia);
                                    parametrosBit.Add("FechaEntregaVivienda", fechaentviv);
                                    parametrosBit.Add("VencimientoGarantia", fechaVencimiento);
                                    parametrosBit.Add("FechaAutorizacion", DateTime.Now);
                                    parametrosBit.Add("UsuarioAutorizo", base.getUserId());
                                    parametrosBit.Add("NoIncidencia", (string)param.NoIncidencia);
                                    try
                                    {
                                        await this.dao.SaveBitacoraAutorizacion(parametrosBit);

                                    }
                                    catch (Exception exc)
                                    {
                                        base.SetReturnInfo(1, "Se autorizo la incidencia, no se pudo guardar la bitacora");
                                        return null;
                                    }
                                }
                                return retValue;
                            }
                            else
                            {
                                base.SetReturnInfo(1, "Hay un error con la partida");
                                return null;
                            }
                        }
                    }
                    else
                    {
                        base.SetReturnInfo(1, "El numero de usuario es incorrecto");
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                base.SetReturnInfo(1, "Hay un problema al intentar autorizar la partida");
                return null;
            }
        }

        private string generateSHA512String(string inputString)
        {
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputString);
            byte[] hash = sha256.ComputeHash(bytes);
            return getStringFromHash(hash);

        }
        private string getStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }
        public async Task<m.SCV.Interfaces.IReporteFallaDetalle> CalcularReincidencias(m.SCV.Interfaces.IReporteFallaDetalle item)
        {
            try
            {
                var p = new Dictionary<string, object>();
                p.Add("idCliente", item.IdCliente);
                p.Add("idFalla", item.Falla.IdFalla);
                p.Add("idTipoFalla", item.IdTipoFalla);
                p.Add("idUbicacionFalla", item.UbicacionFalla.IdUbicacionFalla);
                p.Add("idReporte", item.IdReporte);
                p.Add("proceden", "T");

                var reincidencias = await this.dao.GetReincidencias(p);
                if (reincidencias != null)
                {
                    dynamic values = new ExpandoObject();
                    values.ProcedenSi = reincidencias.Where(r => r.Procede == "S").Count();
                    values.ProcedenNo = reincidencias.Where(r => r.Procede == "N").Count();

                    item.Reincidencias = reincidencias.Count;
                    item.ReincidenciasValues = Newtonsoft.Json.JsonConvert.SerializeObject(values);
                }

                return item;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> GetIndicadorCliente(Dictionary<string, object> parametros)
        {
           return await this.dao.GetIndicadorCliente(parametros); 
        }

        public async Task<List<m.SCV.Interfaces.IOrdenTrabajoDetalleRUBA>> CalcularPartidasOT(int idReporte, int idContratista, m.SCV.Interfaces.IOrdenTrabajoRUBA orden, List<m.SCV.Interfaces.IOrdenTrabajoRUBA> ordenes)
        {
            var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpCGV.Get("ESTATUS", "A");

            // validar que las ordenes sean del contratista en edición.
            ordenes = ordenes != null ? ordenes : new List<m.SCV.Interfaces.IOrdenTrabajoRUBA>();
            int ordenIndex = -1;
            if (orden.ID != 0)
            {
                ordenes = ordenes.Where(o => o.IdContratista == idContratista).ToList();
                // colocar las partidas capturadas en la sección en el array de ordenes
                ordenIndex = ordenes.FindIndex(o => o.ID == orden.ID);
                if (ordenIndex != -1)
                {
                    ordenes[ordenIndex].Partidas = orden.Partidas;
                }
                else
                {
                    ordenes.Add(orden);
                    ordenIndex = ordenes.FindIndex(o => o.ID == orden.ID);
                }
            }

            // partidas disponibles para agregar a la edición del contratista.
            var freePartidas = new List<m.SCV.Interfaces.IOrdenTrabajoDetalleRUBA>();

            // consultar las partidas autorizadas del reporte de fallas.
            var parametros = new Dictionary<string, object>();
            parametros.Add("idReporte", idReporte);
            parametros.Add("idContratista", idContratista);
            parametros.Add("autorizado", "A");
            parametros.Add("peritaje", 0);
            parametros.Add("autgerente", true);


            var partidas = await daoDET.GetAll(parametros);
            if (partidas != null)
            {
                foreach (var p in partidas)
                {
                    bool pFound = false;

                    foreach (var ot in ordenes)
                    {
                        if (ot.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            if (ot.Partidas != null)
                            {
                                var otPartidas = ot.Partidas.Where(d => d.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado).ToList();
                                if (otPartidas.Any(d => d.IdPartida == p.ID) == true)
                                {
                                    pFound = true;
                                    break;
                                }
                            }
                        }
                    }

                    if (p.EstatusDictamen == "NO PROCEDE" || p.IdEstatusDictamen == 1102)
                    {
                        pFound = true;
                    }
                    // agregar la partida como disponible si no es utilizada en una OT
                    if (pFound == false)
                    {
                        var det = Get<m.SCV.Interfaces.IOrdenTrabajoDetalleRUBA>();
                        det.ID = null;
                        det.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        det.IdPartida = (int)p.ID;
                        det.Partida = p;
                        det.IdOrdenTrabajo = (int)orden.ID;
                        det.Observaciones = string.Empty;
                        det.IdModificadoPor = base.getUserId();
                        det.IdCreadoPor = base.getUserId();
                        det.IdEstatus = estatus.ID;
                        det.Estatus = estatus;

                        freePartidas.Add(det);
                    }
                }
            }

            var retValue = new List<m.SCV.Interfaces.IOrdenTrabajoDetalleRUBA>();

            if (ordenIndex != -1)
            {
                var otPartidas = ordenes[ordenIndex].Partidas;
                if (otPartidas != null)
                {
                    retValue = otPartidas;
                }
            }

            retValue.AddRange(freePartidas);

            foreach (var p in retValue)
            {
                if (p.Partida == null)
                {
                    p.Partida = await daoDET.GetById(p.IdPartida);
                }
            }

            return retValue.OrderBy(p => p.Partida.Partida).ToList();
        }

        #region DASHBOARD  REPORTE DE FALLAS
        public async Task<List<m.SCV.Interfaces.IReporteFalla>> getGridDashBoard(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "REPORTE-FALLAS-DASHBOARD-GRID");
            parametros.Add("IdUsuario", getUserId());
            //if(!parametros.ContainsKey("US"))
            //{
            //  parametros.Add("GetAllGrid",true);
            //}
            return await this.dao.getGridDashBoard(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getStateDashBoard(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "REPORTE-FALLAS-DASHBOARD-ESTADOS");
            parametros.Add("IdUsuario", getUserId());
            return await this.dao.getStateDashBoard(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getUsersDashBoard(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "REPORTE-FALLAS-DASHBOARD-USUARIOS");
            parametros.Add("IdUsuario", getUserId());
            return await this.dao.getUsersDashBoard(parametros);
        }

        public async Task<List<m.SCV.Interfaces.ITopReport>> getTopReportDashBoard(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "REPORTE-FALLAS-DASHBOARD-TOP-REPORT");
            parametros.Add("IdUsuario", getUserId());
            return await this.dao.getTopReportDashBoard(parametros);
        }

        public async override Task<object[]> Search(string criteria)
        {
            var parametros = new Dictionary<string, object>();
            parametros.Add("IdUsuario", getUserId());
            parametros.Add("search", criteria);
            var result = await this.dao.Search(parametros);
            if(result.Count() > 0)
            {

            }
            return result;
        }
        #endregion


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
           var HTMLDataString = testMode? 
            System.IO.File.ReadAllText($"\\\\10.1.70.52\\RepositorioEK10\\kontrolFiles\\plantillas\\{plantilla.ID}\\anexos\\{file.Uid}"):
            System.IO.File.ReadAllText($"\\\\10.1.70.50\\RepositorioEK10\\kontrolFiles\\plantillas\\{plantilla.ID}\\anexos\\{file.Uid}");
            //produccion
            //var HTMLDataString = System.IO.File.ReadAllText($"\\\\10.1.70.52\\RepositorioEK10\\kontrolFiles\\plantillas\\{plantilla.ID}\\anexos\\{file.Uid}");

            //pruebas
            //var HTMLDataString = System.IO.File.ReadAllText($"\\\\10.1.70.52\\RepositorioEK10\\kontrolFiles\\plantillas\\{plantilla.ID}\\anexos\\pruebas\\{file.Uid}");
            return HTMLDataString;
        }
        public string MergeAllHtmlWithObj(dynamic obj, string HtmlString, string ruta)
        {
            string retvalue;
            retvalue = CombinarObjConHtml(obj, HtmlString, ruta);
            retvalue = createHtmlTaginLoop(obj, retvalue, ruta);
            return retvalue;
        }
        public string CombinarObjConHtml(dynamic obj, string HtmlString, string ruta)
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
                            
                            valor = CreateImgHtmlStringTag(valor,ruta);
                        }
                        HtmlString = HtmlString.Replace($"@@{m}@@", valor);
                    }
                    catch (Exception ex) { }

                }
            }
            return HtmlString;
        }
        public string createHtmlTaginLoop(dynamic obj, string html, string ruta)
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
                                    
                                    string tagloop = CombinarObjConHtml(i, st, ruta);
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
            int total  = Regex.Matches(html, "@@TotalPage@@").Count -1;
            //====== Reemplazar los marcadores de totalpage por el numero de paginas totales.
            html = html.Replace("@@TotalPage@@", total.ToString());
            return html;
        }

        public string PaginarSeccion( string html, List<string> partidas,bool diagnostico)
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
            } else
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

        public string PaginarBloqueSecciones(string html, dynamic obj, List<string> restantes, int pageNumber,bool diagnostico)
        {
            string fullhtml = html;
            string partidasNuevaPagina = "";
            string newPage = this.GetContenidoEntreMarcadores("NUEVAPAGINA", fullhtml);
            newPage = newPage.Replace("@@currentPage@@", pageNumber.ToString());
            string nuevaTablaIncidencias = "";

            if (restantes.Count > 0)
            {
                foreach (var r in restantes) { partidasNuevaPagina += r; }
                fullhtml = fullhtml.Replace(partidasNuevaPagina, "");
                nuevaTablaIncidencias = this.GetContenidoEntreMarcadores("ExtraPage_HeaderOpenPartidas", fullhtml);
                nuevaTablaIncidencias += partidasNuevaPagina;
                nuevaTablaIncidencias += "</table>";
            }
            

            string dataBodyNuevaPagina = this.GetContenidoEntreMarcadores("BREAKPAGE_SECCIONES", fullhtml);
            fullhtml = fullhtml.Replace(dataBodyNuevaPagina, "");
            dataBodyNuevaPagina = nuevaTablaIncidencias + dataBodyNuevaPagina;

            if (pageNumber > 2)
            {
                string br = "";
                for (int i = 0; i < pageNumber; i++){ br += "<br />"; }
                dataBodyNuevaPagina = br + dataBodyNuevaPagina;
            }
            newPage = newPage.Replace("@@ContenidoNuevaPagina@@", dataBodyNuevaPagina);
            newPage += "@@NuevaPagina@@";
            fullhtml = fullhtml.Replace("@@NuevaPagina@@", newPage);
            fullhtml = this.paginarSeccionesNewPage(fullhtml, restantes, pageNumber+1,diagnostico);

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

        public string paginarSeccionesNewPage(string html, List<string> partidas, int pageNumber,bool diagnostico)
        {
            string fullhtml = html;
            string nuevaPagina = this.GetContenidoEntreMarcadores("NUEVAPAGINA", fullhtml);
            nuevaPagina = nuevaPagina.Replace("@@currentPage@@", pageNumber.ToString());
            string seccionFirmas = this.GetContenidoEntreMarcadores("SECCIONFIRMAS", fullhtml);
            string seccionObsCat = this.GetContenidoEntreMarcadores("SECCIONOBSCAT", fullhtml);
            string seccionObs = this.GetContenidoEntreMarcadores("SECCIONOBS", fullhtml);

            string contenido = "";
            if(diagnostico)
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
            } else
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

        //FIRMAB64
        //public string CreateImgHtmlStringTag(string img, string ruta)
        //{
        //    if (img == "")
        //    {
        //        return img;
        //    }
        //    WebClient cliente = new WebClient();

        //    var bpRF = Get<d.SCV.Interfaces.IReportesFallas>();
        //    var rutaImg = bpRF.GetRutaFirmas(img);
        //    byte[] imageArray;
        //    if (rutaImg.Result.Contains("Enkontrol_GEOJSON"))
        //    {
        //        imageArray = System.IO.File.ReadAllBytes(rutaImg.Result + img);
        //    }
        //    else
        //    {
        //        imageArray = cliente.DownloadData($"{rutaImg.Result}{img}");
        //    }
        //    try
        //    {
        //        //Image imagen;
        //        using (MemoryStream ms = new MemoryStream(imageArray))
        //        {
        //            using (Image imagen = Image.FromStream(ms))
        //            {
        //                //imagen = Image.FromStream(ms);
        //                int left = 0;
        //                int right = imagen.Width;
        //                int top = GetBoundary(imagen, "Top");
        //                top = top > 20 ? top - 20 : top;
        //                int bottom = GetBoundary(imagen, "Bottom") + 15;

        //                int width = right - left;
        //                int height = bottom - top;

        //                Bitmap croppedImage = new Bitmap(width, height);
        //                using (Graphics g = Graphics.FromImage(croppedImage))
        //                {
        //                    g.DrawImage(imagen, new Rectangle(0, 0, width, height), new Rectangle(left, top, width, height), GraphicsUnit.Pixel);
        //                }

        //                using (MemoryStream msCropped = new MemoryStream())
        //                {
        //                    croppedImage.Save(msCropped, ImageFormat.Png);
        //                    byte[] croppedBytes = msCropped.ToArray();
        //                    string base64Cropped = Convert.ToBase64String(croppedBytes);
        //                    var ImgSrcString = $"data:image/png;base64,{base64Cropped}";
        //                    return ImgSrcString;
        //                }
        //            }

        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        var msgErro = ex.Message;
        //        return msgErro;
        //    }

        //}

        public string CreateImgHtmlStringTag(string img, string ruta)
        {
            if (img == "")
            {
                return img;
            }
            WebClient cliente = new WebClient();

            var bpRF = Get<d.SCV.Interfaces.IReportesFallas>();
            var rutaImg = bpRF.GetRutaFirmas(img);
            byte[] imageArray;
            if (rutaImg.Result.Contains("Enkontrol_GEOJSON"))
            {
                //rutaImg = @"" +rutaImg;
                imageArray = System.IO.File.ReadAllBytes(rutaImg.Result + img);
            }
            else
            {
                imageArray = cliente.DownloadData($"{rutaImg.Result}{img}");
            }

            string imageData = Convert.ToBase64String(imageArray);
            var ImgSrcString = $"data:image/png;base64,{imageData}";
            return ImgSrcString;
        }

        private int GetBoundary(Image image, string direction)
        {
            int width = image.Width;
            int height = image.Height;
            int XY_Pos;
            bool endScan = false;
            int pixelPos = -1;
            switch (direction)
            {
                case "Right":
                    XY_Pos = width-1;
                    do
                    {
                       pixelPos =  this.GetPixelColorX(image, XY_Pos, height);
                        XY_Pos--;
                       endScan = XY_Pos < 0 ? true : false;
                       if(pixelPos > 0)
                       {
                            endScan = true;
                       }
                    }
                    while (!endScan);
                    pixelPos = pixelPos > 0 ? pixelPos : width;
                    break;
                case "Left":
                    XY_Pos = 0;
                    do
                    {
                        pixelPos = this.GetPixelColorX(image, XY_Pos, height);
                        XY_Pos++;
                        endScan = XY_Pos >= width ? true : false;
                        if (pixelPos > 0)
                        {
                            endScan = true;
                        }
                    }
                    while (!endScan);
                    pixelPos = pixelPos > 0 ? pixelPos : 0;
                    break;
                case "Top":
                    XY_Pos = 0;
                    do
                    {
                        pixelPos = this.GetPixelColorY(image, XY_Pos, width);
                        XY_Pos++;
                        endScan = XY_Pos >= height ? true : false;
                        if (pixelPos > 0)
                        {
                            endScan = true;
                        }
                    }
                    while (!endScan);
                    pixelPos = pixelPos > 0 ? pixelPos : 0;
                    break;
                case "Bottom":
                    XY_Pos = height-1;
                    do
                    {
                        pixelPos = this.GetPixelColorY(image, XY_Pos, width);
                        XY_Pos--;
                        endScan = XY_Pos < 0 ? true : false;
                        if (pixelPos > 0)
                        {
                            endScan = true;
                        }
                    }
                    while (!endScan);
                    pixelPos = pixelPos > 0 ? pixelPos : height;
                    break;
            }

            return pixelPos;
        }

        private int GetPixelColorX(Image image, int xPos, int height)
        {
            Bitmap bitmap = new Bitmap(image);
            for (int y = 0; y < height; y++)
            {
                Color pixelColor = bitmap.GetPixel(xPos, y);
                if (pixelColor.Name != "ffffffff") // Si el píxel no es blanco
                {
                    return xPos;
                }
            }
            return 0;
        }
        private int GetPixelColorY(Image image, int YPos, int width)
        {
            Bitmap bitmap = new Bitmap(image);

            for (int x = 0; x < width; x++)
            {

                Color pixelColor = bitmap.GetPixel(x, YPos);
               // var colorHex = pixelColor.ToHexString();
                if (pixelColor.Name != "ffffffff") // Si el píxel no es blanco
                {
                    return YPos;
                }
            }
            return 0;
        }

        //private int GetPixelColorX(MagickImage img, int xPos, int height)
        //{
        //    var pixels = img.GetPixels();
        //    for (int y = 0; y < height; y++)
        //    {
        //        var pixelColor = pixels[xPos, y].ToColor();
        //        if (pixelColor.ToHexString() != "#FFFFFF") // Si el píxel no es blanco
        //        {
        //            return xPos;
        //        }
        //    }
        //    return 0;
        //}
        //private int GetPixelColorY(MagickImage img, int YPos, int width)
        //{
        //    var pixels = img.GetPixels();
        //    for (int x = 0; x < width; x++)
        //    {

        //        var pixelColor = pixels[x, YPos].ToColor();
        //        var colorHex = pixelColor.ToHexString();
        //        if (pixelColor.ToHexString() != "#FFFFFF") // Si el píxel no es blanco
        //        {
        //            return YPos;
        //        }
        //    }
        //    return 0;
        //}
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
        public async Task<string> GetDocumentOTHtml(dynamic DocumentData)
        {
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var daoAG = Get<d.SCV.Interfaces.IAgendaSPV>();
            try
            {
                dynamic DatosOT = Newtonsoft.Json.JsonConvert.DeserializeObject(DocumentData);
                int idOT = (int)DatosOT.OrdenTrabajo.ID;

                var moneda = await bpMON.GetByClave("MXN");
                var citas = await daoAG.GetAgendaDetalleHistorial("Contratista", idOT, null);
                if (citas != null && citas.Count > 0)
                {
                    if (citas[citas.Count - 1].EstatusAgenda.Clave != "ATE")
                        citas[citas.Count - 1].EstatusAgenda.Nombre += "       *** última actualización ***";

                    foreach (var x in citas)
                    {
                        x.FechaInicioC = x.FechaInicio.ToString("dd/MM/yyyy h:mm:ss tt");  
                    }
                }
                dynamic expando = new ExpandoObject();
                expando.ID = DatosOT.ID;
                expando.Folio = DatosOT.Folio;
                expando.FechaActual = DateTime.Now.ToString();
                expando.OrdenTrabajo = DatosOT.OrdenTrabajo;
                expando.FechaEntregaVivienda = DatosOT.FechaEntregaVivienda.ToString("dd/MM/yyyy hh:mm tt");
                expando.FechaCaptura = DatosOT.FechaCaptura.ToString("dd/MM/yyyy hh:mm tt");
                expando.Cliente = DatosOT.Cliente;
                expando.Ubicacion = DatosOT.Ubicacion;
                expando.CreadoPor = DatosOT.CreadoPor;
                expando.ModificadoPor = DatosOT.ModificadoPor;
                expando.TelefonoCasa = DatosOT.TelefonoCasa;
                expando.TelefonoOficina = DatosOT.TelefonoOficina;
                expando.TelefonoCelular = DatosOT.TelefonoCelular;
                expando.TelefonoOtros = DatosOT.TelefonoOtros;
                expando.DesarrolloClave = DatosOT.DesarrolloClave;
                expando.SuperManzana = DatosOT.SuperManzana;
                expando.Manzana = DatosOT.Manzana;
                expando.Lote = DatosOT.Lote;
                expando.Interior = DatosOT.Interior;
                expando.Exterior = DatosOT.Exterior;
                expando.Coordinador = DatosOT.Coordinador;
                expando.ResponsableConstruccion = DatosOT.ResponsableConstruccion;
                expando.ObservacionesSC = DatosOT.ObservacionesSC;
                expando.ObservacionesCAT = DatosOT.ObservacionesCAT;
                expando.Contratista = DatosOT.Contratista;
                expando.ContratistaOrigen = DatosOT.ContratistaOrigen;
                expando.Citas = citas;
                expando.Partidas = DatosOT.Partidas;
                expando.Dictamenes = DatosOT.Dictamenes;
                expando.IdFolio = DatosOT.IdFolio;
                expando.Ubicacion = DatosOT.Ubicacion;
                expando.ImagenFirma = DatosOT.ImagenFirma;
                expando.ImagenFirmaContratista = DatosOT.ImagenFirmaContratista;
                expando.ImagenFirmaCatSuper = DatosOT.ImagenFirmaCatSuper;

                object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                var Html = await GetHTMLStringFromPlantilla("REP-FALLAS-RUBA");
                var bpRF = Get<d.SCV.Interfaces.IReportesFallas>();
                var rutaImg = await bpRF.GetRutaFirmas();
                string retValue = MergeAllHtmlWithObj(obj, Html,rutaImg);
                return retValue;
            }
            catch (Exception ex)
            {
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
            try
            {
                var ordenTrabajo = await daoOT.GetById(id);

                var reporte = await this.dao.GetById(ordenTrabajo.IdReporte);

                ordenTrabajo.Observaciones = ordenTrabajo.Observaciones.Replace("♪", "   -   ");
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
                        //p.ObservacionesDiagAppCat = p.ObservacionesAppCat;
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
                expando.ObservacionesSC = reporte.ObservacionesContratista;
                expando.ObservacionesCliente = reporte.ObservacionesServicio;
                //expando.ObservacionesCAT = reporte.ObservacionesContratista;
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
                var bpRF = Get<d.SCV.Interfaces.IReportesFallas>();
                var rutaImg = await bpRF.GetRutaFirmas();
                string docString = MergeAllHtmlWithObj(obj, Html, rutaImg);

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
        public async Task<Drivers.Common.IKontrolFiles> GetDocumentOT(dynamic DocumentData)
        {
            
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var daoAG = Get<d.SCV.Interfaces.IAgendaSPV>();
            try
            {
                dynamic DatosOT = Newtonsoft.Json.JsonConvert.DeserializeObject(DocumentData);
                int idOT = (int)DatosOT.OrdenTrabajo.ID;

                var moneda = await bpMON.GetByClave("MXN");
                var citas = await daoAG.GetAgendaDetalleHistorial("Contratista", idOT, null);
                if (citas != null && citas.Count > 0)
                {
                    if (citas[citas.Count - 1].EstatusAgenda.Clave != "ATE")
                        citas[citas.Count - 1].EstatusAgenda.Nombre += "       *** última actualización ***";
                }
                dynamic expando = new ExpandoObject();
                expando.ID = DatosOT.ID;
                expando.Folio = DatosOT.Folio;
                expando.OrdenTrabajo = DatosOT.OrdenTrabajo;
                expando.FechaEntregaVivienda = DatosOT.FechaEntregaVivienda;
                expando.FechaCaptura = DatosOT.FechaCaptura;
                expando.Cliente = DatosOT.Cliente;
                expando.Ubicacion = DatosOT.Ubicacion;
                expando.CreadoPor = DatosOT.CreadoPor;
                expando.ModificadoPor = DatosOT.ModificadoPor;
                expando.TelefonoCasa = DatosOT.TelefonoCasa;
                expando.TelefonoOficina = DatosOT.TelefonoOficina;
                expando.TelefonoCelular = DatosOT.TelefonoCelular;
                expando.TelefonoOtros = DatosOT.TelefonoOtros;
                expando.DesarrolloClave = DatosOT.DesarrolloClave;
                expando.SuperManzana = DatosOT.SuperManzana;
                expando.Manzana = DatosOT.Manzana;
                expando.Lote = DatosOT.Lote;
                expando.Interior = DatosOT.Interior;
                expando.Exterior = DatosOT.Exterior;
                expando.Coordinador = DatosOT.Coordinador;
                expando.ResponsableConstruccion = DatosOT.ResponsableConstruccion;
                expando.ObservacionesSC = DatosOT.ObservacionesSC;
                expando.ObservacionesCAT = DatosOT.ObservacionesCAT;
                expando.Contratista = DatosOT.Contratista;
                expando.ContratistaOrigen = DatosOT.ContratistaOrigen;
                expando.Citas = citas;
                expando.Partidas = DatosOT.Partidas;
                expando.Dictamenes = DatosOT.Dictamenes;
                expando.IdFolio = DatosOT.IdFolio;
                expando.Ubicacion = DatosOT.Ubicacion;

                string htmltag = DatosOT.ImagenFirma;
                //WebUtility.HtmlDecode("");
                expando.ImagenFirma = WebUtility.HtmlEncode(htmltag);

                //byte[] htmlbytes = Encoding.UTF8.GetBytes(htmltag);

                //byte[] byteOT = Encoding.UTF8.GetBytes(plantilla.Plantilla_Contenido);

                //expando.ImagenFirma = Encoding.UTF8.GetString(htmlbytes);

                //MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(htmltag)); 
                //DocPicture dp = DatosOT.ImagenFirma;
                //Image img;
                //expando.ImagenFirma = dp;

                object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));


                //Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("REP-FALLAS-RUBA", obj, null, moneda);
                //Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("NOTIFICAR-DIAGNOSTICO", obj);

                Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("REP-FALLAS-RUBA", obj, null, moneda);
                Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);

                return documento;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Drivers.Common.IKontrolFiles> GetDocumentOT(int id)
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
            try
            {
                var ordenTrabajo = await daoOT.GetById(id);

                var reporte = await this.dao.GetById(ordenTrabajo.IdReporte);
                var ubicacion = await this.GetUbicacionById((int)reporte.IdUbicacion);
                var moneda = await bpMON.GetByClave("MXN");

                var parametros = new Dictionary<string, object>();
                parametros.Add("idReporte", ordenTrabajo.IdReporte);
                parametros.Add("idContratista", ordenTrabajo.IdContratista);

                var partidas = await daoDET.GetAll(parametros);

                var dictamenesTotalPartidas = Get<m.SCV.Interfaces.IReporteFalla>();
                dictamenesTotalPartidas.Dictamenes = await daoDIC.GetAll(parametros);

                parametros.Clear();
                parametros.Add("idOrdenTrabajo", ordenTrabajo.ID);

                var partidasOT = await daoOTD.GetAll(parametros);
                var partidasTable = new List<m.SCV.Interfaces.IReporteFallaDetalle>();

                foreach (var p in partidas)
                {
                    if (partidasOT.FirstOrDefault(d => d.IdPartida == p.ID) != null)
                    {
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
                //expando.ObservacionesSC = reporte.ObservacionesServicio;
                expando.ObservacionesSC = reporte.ObservacionesContratista;
                expando.ObservacionesCliente = reporte.ObservacionesServicio;
                expando.ObservacionesCAT = reporte.ObservacionesContratista;
                expando.Contratista = ordenTrabajo.Contratista;
                expando.ContratistaOrigen = cOrigen;
                expando.Citas = citas;
                expando.Partidas = partidasTable;
                expando.Dictamenes = dictamenesPartidas;
                expando.IdFolio = reporte.ID;

                var pm = await GetGlobalParameters("INSTALACION");
                string linkTarea = $"{pm.Value<string>("SitioWeb")}{"/scv/pv/reportesFallas/"}{reporte.ID}";
                var parametros2 = new Dictionary<string, object>()
                        {
                            { "Link", linkTarea
                            }
                        };


                object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));


                Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("REP-FALLAS-RUBA", obj, null, moneda);
                Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);

                return documento;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        // Freddy - Modificacion: Validacion en estatus de las citas de la OT
        //public async Task<string> GetEncodedDocumentOT(dynamic obj)
        //{
        //    try
        //    {
        //        string retValue = null;

        //        dynamic DatosOT = Newtonsoft.Json.JsonConvert.DeserializeObject(obj);
        //        //int idot = DatosOT.OrdenTrabajo.ID;
        //        using (MemoryStream ms = new MemoryStream())
        //        {
        //            var documento = await this.GetDocumentOTHtml(obj);
        //            SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
        //            converter.Options.PdfPageSize = SelectPdf.PdfPageSize.A3;
        //            SelectPdf.PdfDocument doc = converter.ConvertHtmlString(documento);
        //            doc.Save(ms);
        //            doc.Close();
        //            retValue = Convert.ToBase64String(ms.ToArray());
        //            byte[] data = Convert.FromBase64String(retValue);
        //            string decodedString = Encoding.UTF8.GetString(data);

        //        }

        //        return retValue;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public async Task<string> GetEncodedDocumentOTById(int id)
        {
            try
            {
                string retValue = null;

                //dynamic DatosOT = Newtonsoft.Json.JsonConvert.DeserializeObject(obj);
                //int idot = DatosOT.OrdenTrabajo.ID;
                using (MemoryStream ms = new MemoryStream())
                {
                    //var documento = await this.GetDocumentOTHtmlFile(id);
                    //SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
                    //converter.Options.PdfPageSize = SelectPdf.PdfPageSize.A3;
                    //SelectPdf.PdfDocument doc = converter.ConvertHtmlString(documento);
                    //doc.Save(ms);
                    //doc.Close();
                    //retValue = Convert.ToBase64String(ms.ToArray());
                    //byte[] data = Convert.FromBase64String(retValue);
                    //string decodedString = Encoding.UTF8.GetString(data);
                    var documento = await this.GetDocumentOTHtmlFile(id);
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

        public async Task<dynamic> DescargaMasivaDocumentos(string parametros)
        {

            List<dynamic> listaDocs = new List<dynamic>();
            try
            {
                BeginTransaction(true);

                var datos = parametros.Split('|');

                var pdf = Get<m.Kontrol.Interfaces.IKontrolFile>();
                int id = Int32.Parse(datos[0]);
                string tipo = datos[2];
                string documento;
                if(tipo == "DIAG")
                {
                    documento = await this.GetEncodedDocumentDiagnostico(id);
                } else
                {
                    documento = await this.GetEncodedDocumentOTById(id);
                }
                    //documentoDiag = documentoDiag.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

                    dynamic expando = new ExpandoObject();
                    expando.fileName = datos[1];
                    expando.datab64 = documento;
                    //listaDocs.Add(expando);
                    //strings.Add(documentoDiag);

                

                Commit();

                return expando; //bytes;
            }
            catch (Exception ex)
            {
                Rollback();
                return null;
            }
        }

        //public async Task<List<dynamic>> DescargaMasivaDocumentos(List<string> parametros)
        //{

        //    List<dynamic> listaDocs =new List<dynamic>();
        //    try
        //    {
        //        BeginTransaction(true);
        //        foreach (var p in parametros)
        //        {
        //            var datos = p.Split('|');

        //            var pdf = Get<m.Kontrol.Interfaces.IKontrolFile>();
        //            int id = Int32.Parse(datos[0]);
        //            string tipo = datos[2];
        //            string documento = tipo == "DIAG" ? await this.GetEncodedDocumentDiagnostico(id) : await this.GetEncodedDocumentOTById(id);
        //            //documentoDiag = documentoDiag.Replace("\"", string.Empty).Replace("\\n", "\n").Replace("\\r", "\r");

        //            dynamic expando = new ExpandoObject();
        //            expando.fileName = datos[1];
        //            expando.datab64 = documento;
        //            listaDocs.Add(expando);
        //            //strings.Add(documentoDiag);

        //        }

        //        Commit();

        //        return listaDocs; //bytes;
        //    }
        //    //catch (IOException ex)
        //    //{
        //    //    Rollback();
        //    //    //
        //    //    model.ProcesoImpresion = "0";
        //    //    base.SetReturnInfo(1, "Error el Documento se encuentra abierto [ " + ex.Message + " ]", 1);
        //    //    // 
        //    //    return model;
        //    //}
        //    catch (Exception ex)
        //    {
        //        Rollback();
        //        //
        //        //model.ProcesoImpresion = "0";
        //        //base.SetReturnInfo(1, ex.Message, 1);
        //        // 
        //        return null;
        //    }
        //}

        public async Task<string> GetEncodedDocumentDiagnostico(int id)
        {
            try
            {
                string retValue = null;

                using (MemoryStream ms = new MemoryStream())
                {
                    //var documento = await this.GetDocumentDiagnostico(id);
                    //documento.Content.Position = 0;
                    //documento.Content.CopyTo(ms);

                    //retValue = Convert.ToBase64String(ms.ToArray());
                    var documento = await this.GetDocumentDiagnosticoHtml(id);

                    SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
                    converter.Options.PdfPageSize = SelectPdf.PdfPageSize.A3;
                    SelectPdf.PdfDocument doc = converter.ConvertHtmlString(documento);
                    doc.Save(ms);
                    doc.Close();

                    retValue = Convert.ToBase64String(ms.ToArray());
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public async Task<MemoryStream> GetEncodedDocumentDiagnosticoStream(int id)
        //{
        //    try
        //    {
        //        MemoryStream retValue = null;

        //        using (MemoryStream ms = new MemoryStream())
        //        {
        //            //var documento = await this.GetDocumentDiagnostico(id);
        //            //documento.Content.Position = 0;
        //            //documento.Content.CopyTo(ms);

        //            //retValue = Convert.ToBase64String(ms.ToArray());
        //            var documento = await this.GetDocumentDiagnosticoHtml(id);

        //            MemoryStream mst = new MemoryStream();
        //            SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
        //            converter.Options.PdfPageSize = SelectPdf.PdfPageSize.A3;
        //            SelectPdf.PdfDocument doc = converter.ConvertHtmlString(documento);
        //            doc.Save(mst);
        //            doc.Close();

        //            mst.Position = 0;
        //            mst.CopyTo(ms);
        //            retValue = ms;
        //            //retValue = Convert.ToBase64String(ms.ToArray());
        //        }

        //        return retValue;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public async Task<string> GetDocumentDiagnosticoHtml(int id)
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

                var dictamen = await daoDIC.GetById(id);
                var reporteFalla = await this.dao.GetById((int)dictamen.IdReporte);
                var ubicacion = await this.GetUbicacionById((int)reporteFalla.IdUbicacion);
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

                //reporteFalla.FechaCaptura = Convert.ToDateTime(String.Format("dd/MM/yyyy", reporteFalla.FechaCaptura));
                //reporteFalla.FechaEntregaVivienda = Convert.ToDateTime(String.Format("dd/MM/yyyy", reporteFalla.FechaCaptura));


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
               // expando.ObservacionesCAT = reporteFalla.ObservacionesServicio;
                expando.ObservacionesSC = reporteFalla.ObservacionesContratista;
                expando.ObservacionesCliente = reporteFalla.ObservacionesServicio;
                expando.ComentarioCAT = dictamenUpdate.ComentarioGeneralDictamen;
                expando.ImagenFirma = dictamenUpdate.FirmaClienteString;
                expando.ImagenFirmaCatSuper = dictamenUpdate.FirmaCatSupString;
                expando.FechaActual = DateTime.Now.ToString();
                expando.FechaEntregaVivienda = reporteFalla.FechaEntregaVivienda.Value.ToString("dd/MM/yyyy");
                expando.FechaCaptura = reporteFalla.FechaCaptura.Value.ToString("dd/MM/yyyy");

                object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));

                //Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("NOTIFICAR-DIAGNOSTICO-DOCUMENTO", obj, null, moneda);
                //Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);
                var Html = await GetHTMLStringFromPlantilla("NOTIFICAR-DIAGNOSTICO-DOCUMENTO");
                var bpRF = Get<d.SCV.Interfaces.IReportesFallas>();
                var rutaImg = await bpRF.GetRutaFirmas();
                string retValue = MergeAllHtmlWithObj(obj, Html, rutaImg);
                return retValue;
                //return "";
                //return documento;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Drivers.Common.IKontrolFiles> GetDocumentDiagnostico(int id)
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

                var dictamen = await daoDIC.GetById(id);
                var reporteFalla = await this.dao.GetById((int)dictamen.IdReporte);
                var ubicacion = await this.GetUbicacionById((int)reporteFalla.IdUbicacion);
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
                //expando.ObservacionesCAT = reporteFalla.ObservacionesServicio;
                expando.ObservacionesSC = reporteFalla.ObservacionesContratista;
                expando.ObservacionesCliente = reporteFalla.ObservacionesServicio;
                expando.ComentarioCAT = dictamenUpdate.ComentarioGeneralDictamen;

                object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));

                Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("NOTIFICAR-DIAGNOSTICO-DOCUMENTO", obj, null, moneda);
                Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);

                return documento;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Drivers.Common.IKontrolFiles> GetFormalizacionVenta(int idCliente)
        {
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();

            try
            {
                var moneda = await bpMON.GetByClave("MXN");
                dynamic encabezado = await this.dao.GetEncabezadoFormalizacionVenta(idCliente);
                dynamic descuentos = await this.dao.GetDescuentosFormalizacionVenta(idCliente);
                dynamic creditos = await this.dao.GetCreditosFormalizacionVenta(idCliente);
                dynamic subsidios = await this.dao.GetSubsidiosFormalizacionVenta(idCliente);
                //
                decimal precioVenta = 0;
                decimal descuento = 0;
                decimal tAbono = 0;
                //
                encabezado.monto_avaluo_edita = Convert.ToDecimal(encabezado.monto_avaluo_edita);
                encabezado.monto_avaluo = Convert.ToDecimal(encabezado.monto_avaluo);
                encabezado.precio_vta = Convert.ToDecimal(encabezado.precio_vta);
                encabezado.otros_descuentos = Convert.ToDecimal(encabezado.otros_descuentos);
                encabezado.id_segmento = Convert.ToInt32(encabezado.id_segmento);
                encabezado.monto_abo_cxc = Convert.ToDecimal(encabezado.monto_abo_cxc);
                encabezado.monto_pago_cte = Convert.ToDecimal(encabezado.monto_pago_cte);
                encabezado.monto_abonos_ant = Convert.ToDecimal(encabezado.monto_abonos_ant);
                encabezado.monto_credito_dec = Convert.ToDecimal(encabezado.monto_credito_dec);
                encabezado.total_gastos_ruba = Convert.ToDecimal(encabezado.total_gastos_ruba);
                encabezado.credito_cofinavit = Convert.ToDecimal(encabezado.credito_cofinavit);
                encabezado.monto_subsidio = Convert.ToDecimal(encabezado.monto_subsidio);
                //
                if (encabezado.monto_avaluo_edita > encabezado.precio_vta)
                {
                    encabezado.PrecioVenta = encabezado.monto_avaluo_edita;
                    precioVenta = encabezado.monto_avaluo_edita;
                }
                else
                {
                    encabezado.PrecioVenta = encabezado.precio_vta;
                    precioVenta = encabezado.precio_vta;
                }

                try
                {
                    if (encabezado.monto_avaluo_edita > 0)
                    {
                        if (encabezado.monto_avaluo_edita > encabezado.precio_vta)
                        {
                            descuento = encabezado.monto_avaluo_edita - encabezado.precio_vta;
                        }
                        else
                        {
                            descuento = 0;
                        }
                    }
                    else if (encabezado.monto_avaluo > encabezado.precio_vta)
                    {
                        descuento = encabezado.monto_avaluo - encabezado.precio_vta;
                    }
                    else
                    {
                        descuento = 0;
                    }
                }
                catch
                {
                    descuento = 0;
                }

                encabezado.Descuento = descuento;
                encabezado.PrecioVentaDescuento = (precioVenta - (descuento + encabezado.otros_descuentos));

                if (encabezado.id_segmento != 14)
                {
                    encabezado.MontoAbonoCXC = encabezado.monto_abo_cxc;
                    tAbono = encabezado.monto_abo_cxc;
                }
                else
                {
                    tAbono = encabezado.monto_abo_cxc + encabezado.monto_pago_cte;
                    encabezado.MontoAbonoCXC = tAbono;
                }
                //
                encabezado.TotalAbonos = (encabezado.monto_abonos_ant + tAbono);
                encabezado.DiferenciaPagar = ((encabezado.PrecioVentaDescuento + encabezado.total_gastos_ruba) - (encabezado.monto_credito_dec + encabezado.credito_cofinavit + encabezado.monto_subsidio + encabezado.TotalAbonos));
                //
                dynamic expando = new ExpandoObject();
                expando = encabezado;
                expando.Descuentos = descuentos;
                expando.Creditos = creditos;
                expando.Subsidios = subsidios;
                //
                dynamic obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("FORMALIZACION-VENTA-RUBA", obj, null, moneda);
                Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);

                return documento;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<bool> VerificarPlantilla(string Nombre)
        {
            Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla(Nombre, null);
            if (plantilla != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<Drivers.Common.IKontrolFiles> GetEquipamientoVivienda(int idCliente)
        {
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();

            try
            {
                var moneda = await bpMON.GetByClave("MXN");
                dynamic encabezado = await this.dao.GetEncabezadoEquipamientoVivienda(idCliente);
                dynamic detalle = await this.dao.GetDetalleEquipamientoVivienda(idCliente);
                //
                dynamic expando = new ExpandoObject();
                expando = encabezado;
                expando.Detalle = detalle;
                //
                dynamic obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("EQUIPAMIENTO-RUBA", obj, null, moneda);
                if (plantilla != null)
                {
                    Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);
                    return documento;
                }
                else
                {
                    base.SetReturnInfo(1, "No se pudo encontrar la plantilla especifica para este proceso [EQUIPAMIENTO-RUBA]");
                    return null;
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<string> GetEncodedDocumento(string accion, int id)
        {
            try
            {
                string retValue = null;

                using (MemoryStream ms = new MemoryStream())
                {
                    Drivers.Common.IKontrolFiles documento = null;

                    switch (accion)
                    {
                        case "FormalizacionVenta": documento = await this.GetFormalizacionVenta(id); break;
                        case "EquipamientoVivienda": documento = await this.GetEquipamientoVivienda(id); break;
                    };

                    if (documento != null)
                    {
                        documento.Content.Position = 0;
                        documento.Content.CopyTo(ms);
                    }

                    retValue = Convert.ToBase64String(ms.ToArray());
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IContratista>> GetContratistas(int idReporte)
        {
            var parametros = new Dictionary<string, object>();
            parametros.Add("operacion", "CONSULTAR_REPORTE_CONTRATISTAS");
            parametros.Add("idReporte", idReporte);

            return await this.dao.GetContratistas(parametros);
        }
        public async Task<List<m.SCV.Interfaces.IEvidenciaDiagnostico>> GetEvidencias(int idReporte)
        {
            var parametros = new Dictionary<string, object>();
            //parametros.Add("operacion", "CONSULTAR_REPORTE_CONTRATISTAS");
            parametros.Add("idReporte", idReporte);
            return await this.dao.GetEvidencias(parametros);
        }

        public async Task<object[]> GetEvidenciasCliente(int incidencia)
        {
            var parametros = new Dictionary<string, object>();
            //parametros.Add("operacion", "CONSULTAR_REPORTE_CONTRATISTAS");
            parametros.Add("incidencia", incidencia);
            return await this.dao.GetEvidenciasCliente(parametros);
        }

        public async Task<object[]> GetIncidenciasEntrega(Dictionary<string, object> parametros)
        {
            return await this.dao.GetIncidenciasEntregaCliente(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IAgendaContratista>> GetHistorialFechasOT(int idReporte)
        {
            var parametros = new Dictionary<string, object>();
            //parametros.Add("operacion", "CONSULTAR_REPORTE_CONTRATISTAS");
            parametros.Add("idReporte", idReporte);

            return await this.dao.GetHistorialFechasOT(parametros);
        }
        public async Task<string> RequestURI(string uri, object obj)
        {
            string retValue = string.Empty;
            try
            {
                //var mainPath = ConfigurationManager.AppSettings["servicesPostSale"];
                // Uri requestUriToken = new Uri(mainPath);
                //var objClienttoken = new System.Net.Http.HttpClient();
                //objClienttoken.DefaultRequestHeaders.Add("enk-token", token);


                var pathServices = ConfigurationManager.AppSettings["servicesPostSale"] + uri;
                //string token = ConfigurationManager.AppSettings["servicesPostSaleToken"] == null ? "" : ConfigurationManager.AppSettings["servicesPostSaleToken"];
                string token = "fa268ec9cc9d774c066643f309eb21a6";
                Uri requestUri = new Uri(pathServices);
                string sJson = Newtonsoft.Json.JsonConvert.SerializeObject(obj);
                var objClient = new System.Net.Http.HttpClient();
                objClient.DefaultRequestHeaders.Add("enk-token", token);
                System.Net.Http.HttpResponseMessage respon = await objClient.PostAsync(requestUri, new StringContent(sJson, System.Text.Encoding.UTF8, "application/json"));

                retValue = await respon.Content.ReadAsStringAsync();
                //this.Log();
                return retValue;
            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }
        }

        public override async Task<object[]> Export(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "REPORTE-FALLAS-DASHBOARD-GRID");
            parametros.Add("IdUsuario", getUserId());

            dynamic retValue = new List<dynamic>();

            var reportes = await this.dao.getGridDashBoard(parametros);
            if (reportes != null && reportes.Count > 0)
            {
                retValue = reportes.Select(r => new
                {
                    r.ID,
                    r.Cliente,
                    r.ResponsableConstruccion,
                    r.Ubicacion,
                    r.EstatusReporte,
                    r.IdPrereporte,
                    r.Creado,
                    r.IdCreadoPor,
                    r.CreadoPor,
                    r.Modificado,
                    r.IdModificadoPor,
                    r.ModificadoPor,
                    r.IdEstatus,
                    r.Estatus,
                    r.Version
                }).ToList<dynamic>();
            }

            return retValue.ToArray();
        }

        public async Task<object> ValidateSecurityQuestions(int idCliente, Dictionary<string, object> questions)
        {
            var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();
            var daoCLI = Get<d.SCV.Interfaces.IClientesSPV>();
            var daoUB = Get<d.SCV.Interfaces.IUbicaciones>();

            var cliente = await daoCLI.GetById(idCliente);
            var ubicacion = await daoUB.GetById((int)cliente.IdUbicacion);

            int correctAnswers = 0;
            object[] answers = new object[3];

            if (questions.TryGetValue("FechaNacimiento", out answers[0]) &&
                questions.TryGetValue("DireccionVivienda", out answers[1]) &&
                questions.TryGetValue("AnioCompra", out answers[2]))
            {
                DateTime fechaNacimiento = Convert.ToDateTime(answers[0]);
                string direccionVivienda = Convert.ToString(answers[1]);
                int anioCompra = Convert.ToInt32(answers[2]);
                DateTime fechaEntrega = (DateTime)ubicacion.FechaEntregaCalidad;

                //validacion de la fecha de nacimiento del cliente.
                DateTime date1 = new DateTime(fechaNacimiento.Year, fechaNacimiento.Month, fechaNacimiento.Day);
                DateTime date2 = new DateTime(cliente.FechaNacimiento.Year, cliente.FechaNacimiento.Month, cliente.FechaNacimiento.Day);
                if (DateTime.Compare(date1, date2) == 0)
                {
                    correctAnswers++;
                }

                //validacion para la direccion de la vivienda.
                if (direccionVivienda.IndexOf(ubicacion.Interior, 0, StringComparison.InvariantCultureIgnoreCase) != 1 &&
                    direccionVivienda.IndexOf(ubicacion.Calle, 0, StringComparison.InvariantCultureIgnoreCase) != 1 &&
                    direccionVivienda.IndexOf(ubicacion.Desarrollo.Nombre, 0, StringComparison.InvariantCultureIgnoreCase) != 1)
                {
                    correctAnswers++;
                }

                //validacion para el año de compra de la vivienda.
                if ((anioCompra - fechaEntrega.Year == -1) ||
                    (anioCompra - fechaEntrega.Year == 0) ||
                    (anioCompra - fechaEntrega.Year == -1))
                {
                    correctAnswers++;
                }
            }

            dynamic retValue = new ExpandoObject();
            retValue.success = false;
            retValue.currentEmail = string.Empty;

            var parametros = new Dictionary<string, object>();
            parametros.Add("idCliente", idCliente);
            parametros.Add("ClaveTipoContacto", "CORREO");

            //obtener el correo actual del cliente.
            var contactos = await daoRL.GetAll(parametros);
            if (contactos != null && contactos.Count > 0)
            {
                var contactoEmail = contactos.FirstOrDefault(c => c.Titular == true);
                if (contactoEmail != null)
                {
                    retValue.currentEmail = contactoEmail.Contacto;
                }
            }

            if (correctAnswers >= 3)
            {
                retValue.success = true;
            }
            else
            {
                base.SetReturnInfo(1, "Algunas respuestas son incorrectas. Verifique la información e intente de nuevo.");
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IClienteContactos> SaveEmailGarantias(m.SCV.Interfaces.IClienteContactos item)
        {
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();

            try
            {
                var tipoCorreo = await bpCG.Get("TIPOCONTACTO", "CORREO");
                var estatus = await bpCG.Get("ESTATUS", "A");

                var parametros = new Dictionary<string, object>();
                parametros.Add("idCliente", item.IdCliente);
                parametros.Add("ClaveTipoContacto", "CORREO");

                m.SCV.Interfaces.IClienteContactos retValue = null;
                m.SCV.Interfaces.IClienteContactos emailGarantia = null;

                var contactos = await daoRL.GetAll(parametros);
                if (contactos != null && contactos.Count > 0)
                {
                    emailGarantia = contactos.FirstOrDefault(c => c.Titular == true);
                }

                if (emailGarantia == null)
                {
                    emailGarantia = Get<m.SCV.Interfaces.IClienteContactos>();
                    emailGarantia.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                    emailGarantia.Creado = DateTime.Now;
                    emailGarantia.IdCreadoPor = base.getUserId();
                }
                else
                {
                    emailGarantia.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                }

                emailGarantia.IdCliente = item.IdCliente;
                emailGarantia.Contacto = item.Contacto;
                emailGarantia.IdTipoContacto = (int)tipoCorreo.ID;
                emailGarantia.Titular = true;
                emailGarantia.IdEstatus = (int)estatus.ID;
                emailGarantia.Modificado = DateTime.Now;
                emailGarantia.IdModificadoPor = base.getUserId();

                retValue = await daoRL.SaveEntity(emailGarantia, false);
                retValue.Estado = m.Kontrol.KontrolEstadosEnum.Exitoso;

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IOrdenTrabajoRUBA>> GetOrdenesTrabajo(Dictionary<string, object> parametros)
        {
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBA>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBA>();

            try
            {
                var retValue = await daoOT.GetAll(parametros);
                if (retValue != null)
                {
                    foreach (var ot in retValue)
                    {
                        parametros.Clear();
                        parametros.Add("idOrdenTrabajo", ot.ID);
                        ot.Partidas = await daoOTD.GetAll(parametros);
                    }
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IReporteFalla> CerrarReporte(int id)
        {
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            m.SCV.Interfaces.IReporteFalla retValue = null;

            try
            {
                bool pFinished = false;

                retValue = await this.GetById(id);

                var partidas = retValue.Partidas;
                var contPartidasTerminadas = 0;
                if (partidas != null && partidas.Count > 0)
                {
                    foreach (var p in partidas)
                    {
                        if (p.EstatusPartidaValor == "T" || (p.EstatusPartidaValor == "D" && p.PartidaAutorizada == "R" && p.Procede == "N"))
                        {
                            contPartidasTerminadas++;
                            if (contPartidasTerminadas == partidas.Count)
                                pFinished = true;
                        }
                        else
                        {
                            p.EstatusPartidaValor = "X";
                            p.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        }
                    }
                }

                var ordenesTrabajo = retValue.OrdenesTrabajo;
                if (ordenesTrabajo != null && ordenesTrabajo.Count > 0)
                {
                    var estatusOT = await bpCGV.Get("SPVESTATUSOT", "C");

                    foreach (var o in ordenesTrabajo)
                    {
                        if (o.EstatusOrdenTrabajo.Clave != "T")
                        {
                            o.IdEstatusOrdenTrabajo = estatusOT.ID;
                            o.EstatusOrdenTrabajo = estatusOT;
                            o.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        }
                    }
                }

                retValue.Partidas = partidas;
                retValue.OrdenesTrabajo = ordenesTrabajo;

                if (pFinished == true)
                {
                    retValue.IdEstatusReporte = "T";
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                }
                else
                {
                    retValue.IdEstatusReporte = "X";
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                }

                retValue = await this.Save(retValue);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }


        //public async Task<m.SCV.Interfaces.IReporteFalla> CancelaReporte(m.SCV.Interfaces.IMotivosCancelacionPV motivo)
        public async Task<m.SCV.Interfaces.IReporteFalla> CancelaReporte(string motivo)
        {
            var daoRF = Get<d.SCV.Interfaces.IReportesFallas>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            m.SCV.Interfaces.IReporteFalla retValue = null;
            string[] IDs = motivo.Split('|');
            var res = await daoRF.CancelarDetallesFolio(IDs[0]);
            try
            {

                retValue = await this.GetById(Int32.Parse(IDs[0]));
                //retValue.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                retValue.Cancelado = "S";
                retValue.IdMotivoCancelado = Int16.Parse(IDs[1]);
                retValue.FechaCancelacion = DateTime.Now;
                retValue.IdEstatusReporte = "X";
                retValue = await this.Save(retValue);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<int> GuardarIncidenciaNoVigente(Dictionary<string, object> parametros)
        {

            JArray parArray = (JArray)parametros["lista"];

            // Convertir el JArray a una lista de dynamic
            List<dynamic> listaPar = parArray.ToObject<List<dynamic>>();
            try
            {
                int allSaved = 0;
                if (listaPar != null)
                {
                    var daoRF = Get<d.SCV.Interfaces.IReportesFallas>();

                    foreach (var li in listaPar)
                    {
                        var itemParams = li.ToObject<Dictionary<string, object>>();
                        itemParams.Add("creado_por", base.getUserId());
                        var res = await daoRF.GuardarIncidenciaNoVigente(itemParams);
                        allSaved += res;
                    }
                }
                if(allSaved == listaPar.Count)
                {
                    return 1;
                } else
                {
                    return 0;
                }
               
            }
            catch (Exception ex)
            {
                //throw ex;
                return -2;
            }
        }

        public async Task<m.SCV.Interfaces.IReporteFalla> convertirComentariosEntregaAFolio(Dictionary<string, object> parametros)
        {
            string redirectUrl = ConfigurationManager.AppSettings["drivers:scdc:redirectReportUrl"];
            var Reporte = Get<m.SCV.Interfaces.IReporteFalla>();

            var partidas = new List<m.SCV.Interfaces.IReporteFallaDetalle>();
            
            JArray parArray = (JArray)parametros["lista"];

            // Convertir el JArray a una lista de dynamic
            List<dynamic> listaPar = parArray.ToObject<List<dynamic>>();
            try
            {
                int allSaved = 0;
                if (listaPar != null)
                {
                    var daoRF = Get<d.SCV.Interfaces.IReportesFallas>();
                    int indexPartida = 0;
                    foreach (var li in listaPar)
                    {
                        indexPartida++;
                        var itemParams = li.ToObject<Dictionary<string, object>>();
                        var daoFalla = Get<p.SCV.Interfaces.IFallas>();
                        var daoTipoFalla = Get<p.SCV.Interfaces.ITiposComponentes>();
                        var daoUbicacion = Get<p.SCV.Interfaces.IUbicacionesFalla>();
                        //Falla.ID = itemParams["IdComponente"];
                        //TipoFalla.ID = itemParams["IdFamilia"];
                        //Ubicacion.ID = itemParams["IdUbicacion"];

                        var falla = await daoFalla.GetById((int)itemParams["IdComponente"]);
                        var tipoFalla = await daoTipoFalla.GetById((int)itemParams["IdFamilia"]);
                        var ubicacion = await daoUbicacion.GetById((int)itemParams["IdUbicacion"]);

                        var det = Get<m.SCV.Interfaces.IReporteFallaDetalle>();
                        det.Activo = 1;
                        det.AutorizadoGerente = true;
                       // det.IdTipoFalla = itemParams["IdFamilia"];
                        //det.IdFalla = itemParams["IdComponente"];
                       // det.IdUbicacionFalla = itemParams["IdUbicacion"];
                        det.IdContratista = (int)itemParams["IdContratista"];
                        det.IdContratistaImputable = (int)itemParams["IdContratista"];
                        det.Falla = falla;
                        det.TipoFalla = tipoFalla;
                        det.UbicacionFalla = ubicacion;
                        det.Procede = "S";
                        det.PartidaAutorizada = "A";
                        det.Partida = indexPartida;
                        det.DiasGarantia = (int)itemParams["dias_garantia"];
                        det.Observaciones = itemParams["observaciones"];
                        partidas.Add(det);

                        //itemParams.Add("creado_por", base.getUserId());
                        //var res = await daoRF.GuardarIncidenciaNoVigente(itemParams);
                        //allSaved += res;
                    }
                }
                var daoUbicacionCte = Get<d.SCV.Interfaces.IUbicaciones>();
                var daoCte = Get<d.SCV.Interfaces.IClientesSPV>();
                var daoCgv = Get<d.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var medio = await daoCgv.GetByClave("SPVMEDIOSCOMUNICACION", "E");

                var ubicacioncte = await daoUbicacionCte.GetById(Convert.ToInt32(parametros["lote_id"]));
                var cliente = await daoCte.GetById(Convert.ToInt32(parametros["IdCliente"]));
                Reporte.Cliente = cliente;
                Reporte.IdPlaza = parametros["IdPlaza"].ToString();
                Reporte.Ubicacion = ubicacioncte;
                Reporte.MedioSolicitud = medio;
                Reporte.IdCliente = Convert.ToInt32(parametros["IdCliente"]);
                Reporte.IdUbicacion = Convert.ToInt32(parametros["lote_id"]);
                Reporte.Partidas = partidas;
                var resp = await this.Save(Reporte);
                resp.redirectReporteUrl = redirectUrl;
                return resp;

            }
            catch (Exception ex)
            {
                //throw ex;
                return null;
            }
        }


        public async Task<int> GuardarIncidenciasEntrega(Dictionary<string, object> parametros)
        {

            JArray parArray = (JArray)parametros["lista"];

            // Convertir el JArray a una lista de dynamic
            List<dynamic> listaPar = parArray.ToObject<List<dynamic>>();
            try
            {
                int allSaved = 0;
                if (listaPar != null)
                {
                    var daoRF = Get<d.SCV.Interfaces.IReportesFallas>();

                    foreach (var li in listaPar)
                    {
                        var itemParams = li.ToObject<Dictionary<string, object>>();
                        itemParams.Add("creado_por", base.getUserId());
                        var res = await daoRF.GuardarIncidenciasEntrega(itemParams);
                        allSaved += res;
                    }
                }
                if (allSaved == listaPar.Count)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }

            }
            catch (Exception ex)
            {
                //throw ex;
                return -2;
            }
        }        
        
        public async Task<int> updateIncidenciasEntrega(Dictionary<string, object> parametros)
        {
            try
            {
                var daoRF = Get<d.SCV.Interfaces.IReportesFallas>();
                parametros.Add("idUsuario", base.getUserId());
                var res = await daoRF.updateIncidenciasEntrega(parametros);
                return res;
            }

            catch (Exception ex)
            {
                //throw ex;
                return -2;
            }
        }

        private dynamic ConvertListToDynamic(List<object> list)
        {
            // Convertir la lista a una lista de objetos anónimos
            var anonymousList = list.ConvertAll(x => (object)new { item = x });

            // Convertir la lista de objetos anónimos a una lista dinámica
            dynamic dynamicList = JsonConvert.DeserializeObject<dynamic>(JsonConvert.SerializeObject(anonymousList));

            return dynamicList;
        }

        //public async Task<m.SCV.Interfaces.IReporteFalla> NoGenerarFolioPorVigencia(m.SCV.Interfaces.IReporteFalla incidencias)
        //{
        //    var daoRF = Get<d.SCV.Interfaces.IReportesFallas>();
        //    var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
        //    m.SCV.Interfaces.IReporteFalla retValue = null;
        //    string[] IDs = motivo.Split('|');
        //    var res = await daoRF.CancelarDetallesFolio(IDs[0]);
        //    try
        //    {

        //        retValue = await this.GetById(Int32.Parse(IDs[0]));
        //        //retValue.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
        //        retValue.Cancelado = "S";
        //        retValue.IdMotivoCancelado = Int16.Parse(IDs[1]);
        //        retValue.FechaCancelacion = DateTime.Now;
        //        retValue.IdEstatusReporte = "X";
        //        retValue = await this.Save(retValue);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }

        //    return retValue;
        //}


        public async Task<List<m.SCV.Interfaces.IAgendaDictamenDetalle>> GetDictamenes(Dictionary<string, object> parametros)
        {
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenes>();
            try
            {
                return await daoDIC.GetDictamenes(parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IDiagnosticosImagenesCAT>> GetDiagnosticateImageCAT(Dictionary<string, object> parametros)
        {
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenes>();
            try
            {   
                parametros.Add("OperacionEspecificaSP", "IMAGENES-DIAGNOSTICOS");
                return await daoDIC.GetDiagnosticateImageCAT(parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IDiagnosticosNotaCAT>> GetDiagnosticateNoteCAT(Dictionary<string, object> parametros)
        {
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenes>();
            try
            {
                parametros.Add("OperacionEspecificaSP", "NOTAS-DIAGNOSTICOS");
                return await daoDIC.GetDiagnosticateNoteCAT(parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<m.SCV.Interfaces.IReporteDictamen>> GetDictamenesReporte(Dictionary<string, object> parametros)
        {
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenes>();
            try
            {
                return await daoDIC.GetAll(parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<object[]> GetClienteReportes(int idCliente)
        {
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenes>();
            var drd = new Dictionary<int, List<m.SCV.Interfaces.IReporteDictamen>>();
            var daoReporte = Get<d.SCV.Interfaces.IReportesFallas>();
            try
            {
                var retValue = await this.dao.GetClienteReportes(idCliente);
                if (retValue != null && retValue.Count() > 0)
                {
                    foreach (dynamic pp in retValue)
                    {
                        int idDetalle = Convert.ToInt32(pp.ID);
                        int idReporte = Convert.ToInt32(pp.IdReporte);

                        if (!drd.ContainsKey(idReporte))
                        {
                            var parametros = new Dictionary<string, object>() { { "idReporte", idReporte } };
                            var dictamenes = await daoDIC.GetAll(parametros);

                            drd.Add(idReporte, dictamenes);
                        }

                        var rrDictamenes = new List<m.SCV.Interfaces.IReporteDictamen>();
                        var r = await daoReporte.GetById(idReporte);
                        if (drd.TryGetValue(idReporte, out rrDictamenes))
                        {
                            pp.Dictamenes = new ExpandoObject();
                            pp.Dictamenes = rrDictamenes.FindAll(dm => dm.IdReporte == idReporte && dm.IdReporteDetalle == idDetalle);
                        }
                        pp.ClaveEstatusReporte = r.EstatusReporte.Clave;
                        pp.NombreEstatusReporte = r.EstatusReporte.Nombre;
                    }
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private string getFullFileName(string dirName, string fileName)
        {
            string retValue = null;

            var fName = fileName;
            var dName = dirName;

            if (!string.IsNullOrEmpty(fName))
            {
                fName = fName.Trim();
                if (fName.Contains("/"))
                {
                    fName = fName.Replace('/', '\\');
                }
                if (!fName.StartsWith(@"\"))
                {
                    fName = $"\\{fName}";
                }
            }
            if (!string.IsNullOrEmpty(dName))
            {
                dName = dName.Trim();
                if (dName.Contains("/"))
                {
                    dName = dName.Replace('/', '\\');
                }
                if (dName.EndsWith(@"\"))
                {
                    dName = dName.Remove(dName.Length - 1, 1);
                }
            }
            retValue = $"{dName}{fName}";
            return retValue;
        }



        public async Task<List<m.SCV.Interfaces.IDiagnosticosImagenesCAT>> GetPathDiagnosticateImageCAT(int id)
        {
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenes>();
            List<m.SCV.Interfaces.IDiagnosticosImagenesCAT> DiagnosticateValue;
            try
            {
                var parameterDiagnosticate = new Dictionary<string, object>();
                parameterDiagnosticate.Add("ID", id);
                parameterDiagnosticate.Add("OperacionEspecificaSP", "IMAGENES-DIAGNOSTICOS-ID");
                DiagnosticateValue = await daoDIC.GetDiagnosticateImageCAT(parameterDiagnosticate);

                if (DiagnosticateValue != null)
                {
                    DiagnosticateValue[0].PathImageDiagnosticate = this.getFullFileName(DiagnosticateValue[0].PathImageDiagnosticate, "");
                }
                else
                {
                    return DiagnosticateValue;
                }

                return DiagnosticateValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}