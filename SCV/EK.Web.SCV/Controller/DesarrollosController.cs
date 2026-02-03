using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
//using
using EK.Common.Exportacion;
using Newtonsoft.Json.Linq;
using s = EK.Drivers.Storage;
//using System.Web.
namespace EK.Web.SCV.Controller
{
    public class DesarrollosController : EK.Common.BaseKontroller
    {
        [Route("Desarrollos/GetFileLocations/{id}")]
        public async Task<ActionResult> GetFileLocations(int id)
        {
            List<string> retValue = new List<string>();

            var fileParams = new Dictionary<string, object>() {
                { "tipo", "anexos" },
                { "entityType", "desarrollos" },
                { "entityId", id },
                { "activos", 1 } };

            var files = await Get("/KontrolFiles/GetAll")
                .Add("parametros", fileParams)
                .ExecuteAsync<JToken>();


            if (files != null)
            {
                foreach (dynamic f in files)
                {
                    if (Convert.ToString(f.FileExtension).ToLower() == "geojson")
                    {
                        retValue.Add($"/kontrolFiles/GetFile/{f.EntityType}/{f.EntityId}/{f.Tipo}/{f.Uid}");
                    }
                }
            }

            //if (string.IsNullOrEmpty(fileUrl) || string.IsNullOrWhiteSpace(fileUrl))
            //{

            //}
            //else
            //{
            //    byte[] data = Convert.FromBase64String(fileUrl);
            //    string decodedString = Encoding.UTF8.GetString(data);

            //    retValue.Add(System.Net.WebUtility.UrlDecode(decodedString));
            //}

            return Json(retValue, JsonRequestBehavior.AllowGet);
        }

        [Route("GIS")]
        [Route("GIS/{idDesarrollo}")]
        [HttpGet]
        public async Task<ActionResult> GIS(int? idDesarrollo)
        {
            Modelo.SCV.Map m = new Modelo.SCV.Map();

            m.IdDesarrollo = idDesarrollo != null ? idDesarrollo.Value : -1;
            m.Sale = false;

            return await Task.Run(() => PartialView("_Map", m));
        }

        [Route("Desarrollos/GetLocations/{id}")]
        [Route("Desarrollos/GetLocations/{id}/{ubicacion}")]
        [Route("Desarrollos/GetLocations/{id}/{ubicacion}/{idvista}/{Sale}")]
        [Route("Desarrollos/GetLocations/{id}/{ubicacion}/{idvista}/{Sale}/{fileUrl}")]
        [HttpGet]
        //public async Task<ActionResult> GetLocations(int id, string ubicacion, int? idVista, bool? Sale = false, bool? ML = false)
        public async Task<ActionResult> GetLocations(int id, string ubicacion, int? idVista, bool? Sale = false, string fileUrl = "")
        {
            var desarrollo = await Get($"/desarrollos/GetById")
                .Add("id", id)
                .ExecuteAsync<JToken>();

            Modelo.SCV.Map m = new Modelo.SCV.Map();


            m.Geo = desarrollo != null ? desarrollo["Geolocalizacion"].ToString() : string.Empty;
            var latLng = !string.IsNullOrEmpty(m.Geo) ? m.Geo.Split(',') : null;
            if (latLng != null)
            {
                if (latLng.Length > 0)
                {
                    m.Lat = decimal.Parse(latLng[0]);
                    m.Long = decimal.Parse(latLng[1]);
                }
            }
            //m.geoJsonList = fileList;
            bool isCsv = false;
            KeyValuePair<string, object> kvUbicacion = UbicacionParams(ubicacion, out isCsv);

            var ubicacionParams = new Dictionary<string, object>()
            {
                { "activos", "1"}, {"idDesarrollo", id}
            };
            if (!kvUbicacion.Equals(new KeyValuePair<string, object>()))
                ubicacionParams.Add(kvUbicacion.Key, kvUbicacion.Value);


            if (idVista.HasValue)
            {
                var ubicacionColorsParams = new Dictionary<string, object>()
                {
                    { "Id",idVista },
                    { "IdFilter", id }
                };
                if (isCsv)
                    ubicacionColorsParams.Add("ubicaciones", ubicacion);

                m.Ubicaciones = Newtonsoft.Json.JsonConvert.SerializeObject(await Get($"/GISVistasElementos/GetUbicacionColores").Add("parametros", ubicacionColorsParams).ExecuteAsync<JToken>());
            }
            else
            {
                m.Ubicaciones = Newtonsoft.Json.JsonConvert.SerializeObject(await Get($"/ubicaciones/GetAll").Add("parametros", ubicacionParams).ExecuteAsync<JToken>());
                //if (ML.HasValue)
                //if (ML)
                //{
                //    var param = new Dictionary<string, object>() { { "IdDesarrollo", id } };
                //    if (!kvUbicacion.Equals(new KeyValuePair<string, object>()))
                //    {
                //        param.Add(kvUbicacion.Key, kvUbicacion.Value);
                //    }
                //    m.Ubicaciones = Newtonsoft.Json.JsonConvert.SerializeObject(await Get($"/UbicacionCoordenadas/GetById").Add("parametros", param).ExecuteAsync<JToken>());

                //}
                //else
                //{


                //}
            }


            m.IdDesarrollo = id;
            m.Sale = Sale;
            //m.LocationsMap = ML;
            return await Task.Run(() => PartialView("_Map", m));
        }

        [Route("Desarrollos/GIS/Ubicaciones/{id}({idVista}")]
        [HttpPost]
        public async Task<ActionResult> GetGISUbicaciones(int id, int idVista)
        {
            var p = new Dictionary<string, object>()
                {
                    { "Id", idVista },
                    { "IdFilter", id }
                };

            return await Get($"/GISVistasElementos/GetUbicacionColores")
                .Add("parametros", p)
                .ExecuteAsync();
        }

        [Route("Desarrollos/UbicacionesLatLngSave/{coord?}")]
        [HttpPost]
        public async Task<ActionResult> UbicacionesLatLngSave(string coord)
        {
            var obj = base.GetEncodedString(coord);
            //var rs = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<List<EK.Modelo.SCV.UbicacionCoordenadas>>(obj);
            var r = Newtonsoft.Json.JsonConvert.DeserializeObject<List<EK.Modelo.SCV.UbicacionCoordenadas>>(obj);
            return await Get($"/UbicacionCoordenadas/Save").Add("elementos", obj).ExecuteAsync();
        }

        private KeyValuePair<string, object> UbicacionParams(string UbicacionParam, out bool isSCV)
        {
            KeyValuePair<string, object> result = new KeyValuePair<string, object>();
            isSCV = false;
            int idUbicacion;
            string[] ubicacionesList = !string.IsNullOrEmpty(UbicacionParam) ? UbicacionParam.Split('|') : new string[0];
            if (ubicacionesList.Length > 0)
            {
                if (ubicacionesList.Length == 1 && ubicacionesList[0] != "")
                    if (int.TryParse(ubicacionesList[0], out idUbicacion))
                        result = new KeyValuePair<string, object>("id", idUbicacion);
                if (ubicacionesList.Length > 1)
                {
                    result = new KeyValuePair<string, object>("ubicaciones", UbicacionParam);
                    isSCV = true;
                }
            }
            return result;
        }
    }
}