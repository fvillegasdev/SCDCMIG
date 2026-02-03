using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using EK.Drivers.Emailing.MM.Views;
using EK.Drivers.Emailing.Models;
using System.Net;
using System.Drawing;
using System.Dynamic;
using System.Web.Routing;
using EK.Utils;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace EK.Drivers.Emailing.Controllers
{
    public class TrackingController : BaseKontrollerOpen /*Controller*/
    {
        //"localhost:57544/{RUTAUUID}/Opened/{ATID}/AVID"
        [Route("{RUTAUUID}/Opened/{ATID}/{AVID}")]
        public ActionResult Opened(Guid? RUTAUUID, Guid? ATID, Guid? AVID)
        {
            EmailingClient client = new EmailingClient();
            bool validate = client.Opened(ATID, AVID);
            if (validate)
            {
                var dir = Server.MapPath("/Images");
                var path = Path.Combine(dir, "enkontrol.png");
                return base.File(path, "image/png");
            }
            return null;
        }

        // localhost:57544/{RUTAUUID}/Unsubscribe/{ATID}/{AVID}
        [Route("{RUTAUUID}/Unsubscribe/{ATID}/{AVID}")]
        public ActionResult Unsubscribe(Guid? RUTAUUID, Guid? ATID, Guid? AVID)
        {
            MktListLogItem mktListLog = new MktListLogItem
            {
                ATID = ATID.ToString().ToUpper(),
                AVID = AVID.ToString().ToUpper()
            };
            var client = new EmailingClient();
            return new EmailingViewResult("Lamentamos que quieras irte, pero, si no necesitas seguir recibiendo correos, solo debes seleccionar Si ", mktListLog);
        }

        [Route("kontrol/em/links/Unsubscribe/YES/{ATID}/{AVID}")]
        public ActionResult SI(Guid? ATID, Guid? AVID)
        {
            EmailingClient client = new EmailingClient();
            client.Unsubscribe(ATID, AVID);
            return new EmailingViewResult("Operación completada con éxito, ahora puede cerrar esta ventana.");
        }


        [Route("kontrol/em/links/Unsubscribe/NO/{ATID}/{AVID}")]
        public ActionResult NO(Guid? ATID, Guid? AVID)
        {
            return new EmailingViewResult("Operación completada con éxito, ahora puede cerrar esta ventana.");
        }

        //[Route("kontrol/em/links/clickEK/{UUID}")]
        [Route("{SERVERUUID}/{ROUTEUUID}/{LINKUUID}/Clic")]
        public async Task<ActionResult> Clic(Guid? SERVERUUID, Guid? ROUTEUUID, Guid? LINKUUID)
        {
            MktListLinksItem mktListLinks = new MktListLinksItem();
            EmailingClient client = new EmailingClient();
            mktListLinks = client.Clic(LINKUUID, true);
            IAPIClient apiClient = base.getClient();
            //Metodo para validar si es una accion de sistema, instanciar el BP y generar el evento que corresponda.
            if (mktListLinks.Sistema == true && mktListLinks.BPType != null && mktListLinks.BPType != string.Empty)
            {
                Dictionary<string, object> parametros = new Dictionary<string, object>();
                dynamic obj;
                string commandActionMethod = string.Empty;
                obj = JsonConvert.SerializeObject(mktListLinks);

                //Se agrega el objeto serializado a parametros para buscar EntityName (GetBP)
                parametros.Add("PullNotificationsLinks", obj);
                commandActionMethod = "/PullNotifications/ActionMethod";
                var content = await apiClient
                    .GetServiceCommand(commandActionMethod)
                    .Add("parametros", parametros)
                    .AddKey("20B8CD99-CB72-4557-ADED-222B16A11E56")
                    .ExecuteAsync();
                //Devuelve una vista generica            
                return new EmailingViewResult("Operación completada con éxito, ahora puede cerrar esta ventana.");
            }
            else if (mktListLinks != null && mktListLinks.URL != string.Empty && mktListLinks.URL != null)
            {
                return Redirect(mktListLinks.URL);
            }
            else if (mktListLinks != null && mktListLinks.SRC != string.Empty && mktListLinks.SRC != null)
            {
                if (mktListLinks.SRC.Contains("base64"))
                {
                    var type = client.GetTypeImage(mktListLinks.SRC);
                    var base64 = client.GetBase64String(mktListLinks.SRC);
                    byte[] vs = Convert.FromBase64String(base64);
                    return new FileContentResult(vs, type);
                }
                else
                {
                    return View("Error");
                }
            }
            return null;
        }

        //[Route("kontrol/em/image/{UUID}")]
        [Route("{SERVERUUID}/{RUTAUUID}/{LINKUUID}/image")]
        public FileContentResult Image(Guid? SERVERUUID, Guid? ROUTEUUID, Guid? LINKUUID)
        {
            MktListLinksItem mktListLinks = new MktListLinksItem();
            EmailingClient client = new EmailingClient();
            mktListLinks = client.Clic(LINKUUID, false);
            if (mktListLinks != null && mktListLinks.SRC != string.Empty && mktListLinks.SRC != null)
            {
                if (mktListLinks.SRC.Contains("base64"))
                {
                    var type = client.GetTypeImage(mktListLinks.SRC);
                    var base64 = client.GetBase64String(mktListLinks.SRC);
                    byte[] vs = Convert.FromBase64String(base64);
                    return new FileContentResult(vs, type);
                }
            }
            return null;
        }

        //[Route("{SERVERUUID}/{RUTAUUID}/LD/{LEADUUID}")]
        [Route("{SERVERUUID}/{RUTAUUID}/LD/{LEADUUID}")]
        public ActionResult Lead(Guid? SERVERUUID, Guid? RUTAUUID, Guid? LEADUUID)
        {
            EmailingClient client = new EmailingClient();
            bool validate = client.ValidateLead(LEADUUID);
            if (validate)
            {
                LeadItem leadItem = new LeadItem
                {
                    UUID = LEADUUID.ToString().ToUpper(),
                };
                return View("LeadForm", leadItem);
            }
            return null;
        }

        [Route("LD/{LEADUUID}/{TOKEN}")]
        [HttpPost]
        public ActionResult LeadForm(FormCollection formCollection, string TOKEN)
        {
            LeadItem leadItem = new LeadItem
            {
                TOKEN = TOKEN,
                EK_desarrollo = formCollection["EK_desarrollo"],
                EK_desarrollo_ID = formCollection["EK_desarrollo_ID"],
                EK_origen = formCollection["EK_origen"],
                EK_nombre = formCollection["EK_nombre"],
                EK_apaterno = formCollection["EK_apaterno"],
                //EK_amaterno = formCollection["EK_amaterno"],
                EK_telefono = formCollection["EK_telefono"],
                EK_celular = formCollection["EK_celular"],
                EK_correo = formCollection["EK_correo"],
                EK_nss = formCollection["EK_nss"],
                EK_fecha_nacimiento = formCollection["EK_fecha_nacimiento"],
                EK_comentarios = formCollection["EK_comentarios"]
            };

            RouteValueDictionary keyValuePairs = new RouteValueDictionary(leadItem);
            return RedirectToAction("LeadRegister", "KontrolM", keyValuePairs);
        }

        //[Route("Google/{TOKEN}")]
        //public ActionResult Google(string DOMINIO, Guid? TOKEN)

        //{
        //    return Redirect("https://www.google.com/");
        //}

    }
}
