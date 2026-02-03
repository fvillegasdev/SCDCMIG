using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;

using System;
using System.Collections.Generic;
using System.Text;
using System.Web.Mvc;
using System.Threading.Tasks;

namespace EK.Web.Kontrol.Controllers
{
    public class MapController
        : EK.Common.BaseKontroller
    {
        public MapController()
            : base("kontrol", "Mapa")
        { }

        [Route("kontrol/map/address/{address?}")]
        public async Task<ActionResult> GetAddress(string address = null)
        {
            ViewBag.Address = address == null ? string.Empty : base.GetEncodedString(address);
            return await Task.Run(() => PartialView("_Address"));
        }

        [Route("kontrol/map/location/{location?}")]
        public async Task<ActionResult> GetLocation(string location = null)
        {
            ViewBag.Geolocalizacion = location == null ? string.Empty : base.GetEncodedString(location);
            return await Task.Run(() => PartialView("_Address"));
        }

        [Route("kontrol/map/multilocations/{filtros?}")]
        public async Task<ActionResult> SetLocations(string filtros = null)
        {
            var obj = filtros != null ? base.GetEncodedDictionary(filtros) : new Dictionary<string, object>();
            var obj2 = new Dictionary<string, object>();
            if (obj["Geo"].ToString() == "0")
            {
                if (obj.ContainsKey("ACT")){
                    obj2.Add("activos", obj["ACT"]);
                }
                else
                {
                    obj2.Add("activos", 1);
                }
                if (obj.ContainsKey("TA"))
                {
                    obj2.Add("TipoAgenda", obj["TA"]);
                }
                if (obj.ContainsKey("PS"))
                {
                    obj2.Add("IdPlaza", obj["PS"]);
                }

                if (obj.ContainsKey("CE"))
                {
                    obj2.Add("ClaveEstado", obj["CE"]);
                }

                if (obj.ContainsKey("US"))
                {
                    obj2.Add("UsuarioSeleccionado", obj["US"]);
                }

                if (obj.ContainsKey("FA"))
                {
                    obj2.Add("FuncionAgenda", obj["FA"]);
                }

                if (obj.ContainsKey("Geo"))
                {
                    obj2.Add("Geolocalizacion", obj["Geo"]);
                }

                if (obj.ContainsKey("FS"))
                {
                    obj2.Add("IdFraccionamiento", obj["FS"]);
                }


                dynamic locations = await Get($"/AgendaSPV/getGeoCalendarDashBoard")
                                                 .Add("parametros", obj2)
                                                 .ExecuteAsync();
                ViewBag.Geolocalizaciones = locations == null ? string.Empty : locations.Content;
            }
            else
            {
                if (obj.ContainsKey("ACT"))
                {
                    obj2.Add("activos", obj["ACT"]);
                }
                else
                {
                    obj2.Add("activos", 1);
                }
                if (obj.ContainsKey("PS"))
                {
                    obj2.Add("IdPlaza", obj["PS"]);
                }
                if (obj.ContainsKey("Geo"))
                {
                    obj2.Add("Geolocalizacion", obj["Geo"]);
                }
                if (obj.ContainsKey("FS"))
                {
                    obj2.Add("IdFraccionamiento", obj["FS"]);
                }

                ViewBag.Geolocalizaciones = "[{\"AsignadoA\": { \"Nombre\": \"\"},\"TipoAgenda\": {\"Clave\": \"\",\"Nombre\": \"\"},\"Geolocalizacion\": \"" + obj2["Geolocalizacion"].ToString() + "\",\"EstatusAgendaIconoColor\": \"" + "#094293" + "\",\"FechaInicio\": \"" + "En Planificacion" + "\",\"FechaFin\": \"" + "En Planificacion" + "\" }]";

            }
            dynamic capasGJ = await Get($"/fraccionamientos/GetGeoJson")
                                 .Add("parametros", obj2)
                                 .ExecuteAsync();

            ViewBag.geoJsonList = capasGJ == null ? string.Empty : capasGJ.Content;
            return await Task.Run(() => PartialView("_MultiGeolocalizacionesAgenda"));
        }

        [Route("kontrol/map/markers")]
        public async Task<ActionResult> GetMapByMarkers()
        {
            return await Task.Run(() => PartialView("_MarkerBase"));
        }
    }
}
