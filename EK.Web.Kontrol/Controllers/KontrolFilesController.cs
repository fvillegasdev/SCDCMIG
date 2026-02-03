using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using io = System.IO;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Linq;
using p = EK.Procesos;
using System.Configuration;

namespace EK.Web.Kontrol.Controllers
{
    public class KontrolFilesController : EK.Common.BaseKontroller
    {
        [NonAction]
        private string getRepositoryPath(string entityType, int entityId, string tipo, string uid)
        {
            return string.Format("kontrolFiles/{0}/{1}/{2}/{3}", entityType, entityId, tipo, uid);
        }

        [Route("KontrolFiles/all/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetAll(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/KontrolFiles/GetAll")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("KontrolFiles/item/{filtros}")]
        [HttpGet]
        public async Task<ActionResult> GetItem(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);

            return await Get("/KontrolFiles/GetItem")
                .Add("parametros", obj)
                .ExecuteAsync();
        }

        [Route("KontrolFiles/id/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            return await Get("/KontrolFiles/GetById")
                .Add("id", id)
                .ExecuteAsync();
        }

        [Route("KontrolFiles/Save")]
        [HttpPut]
        public async Task<ActionResult> Save()
        {
            try
            {
                Request.InputStream.Position = 0;
                var input = Request.Form["item"];

                if (Request.Files.Count > 0)
                {
                    var file = Request.Files[0];

                    var stream = new MemoryStream();
                    file.InputStream.CopyTo(stream);

                    return await Get("/KontrolFiles/SaveFile")
                        .Add("item", input)
                        .Add("stream", stream)
                        .Add("contentType", file.ContentType)
                        .ExecuteAsync();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return HttpNotFound();
        }

        [Route("KontrolFiles/GetFile/{entityType}/{entityId}/{tipo}/{uid}/{inline?}")]
        [HttpGet]
        public async Task<ActionResult> GetFile(string entityType, int entityId, string tipo, string uid, bool inline = false)
        {
            try
            {
                string result = await Get("/KontrolFiles/GetByUid").Add("uid", uid).ExecuteAsync<string>();
                dynamic obj = JsonConvert.DeserializeObject(result);

                string filePath = string.Format("kontrolFiles/{0}/{1}/{2}/{3}", entityType, entityId, tipo, uid);
                var file = GetFileManager().GetFile(filePath);

                if (file != null)
                {
                    string behavior = inline == true ? "inline" : "attachment";
                    string content = string.Format("{0}; filename=\"{1}\"", behavior, obj.Nombre);
                    Response.AddHeader("content-disposition", content);
                    var tipoEntidad = entityType.Substring(0, 7);
                    if (tipoEntidad == "EK10_PE")
                    {
                        //bool testMode = Convert.ToBoolean(ConfigurationManager.AppSettings["testMode"]);
                        //var filePathDelete = string.Format("kontrolFiles\{0}", entityType);
                        //var fullpath = testMode ? @"\\10.1.70.52\RepositorioEK10\kontrolFiles\" + entityType : @"\\10.1.70.50\RepositorioEK10\kontrolFiles\" + entityType;
                        //GetFileManager().Delete(filePathDelete);
                        // await Get(" / KontrolFiles/DeleteFile")
                        //.Add("path", filePathDelete)
                        //.ExecuteAsync();
                        string rootPath = ConfigurationManager.AppSettings["drivers:filesystem:container"];
                        string folderClientPath = string.Format(@"{0}kontrolFiles\{1}", rootPath, entityType);
                        Directory.Delete(folderClientPath, true);
                    }
                   
                    file.Content.Position = 0;
                    return File(file.Content, file.ContentType);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return HttpNotFound();
        }



        [Route("KontrolFiles/GetByStorageCustom/{entityType}/{tipo}/{uid}/{inline?}")]
        [HttpGet]
        public async Task<ActionResult> GetFileCustom(string entityType,  string tipo, string uid, bool inline = false)
        {
            try
            {
                string filePath = string.Format("kontrolFiles/{0}/{1}/{2}", entityType, tipo, uid);
                var file = GetFileManager().GetFile(filePath);

                if (file != null)
                {
                    string behavior = inline == true ? "inline" : "attachment";
                    string content = string.Format("{0}; filename=\"{1}\"", behavior, uid );
                    Response.AddHeader("content-disposition", content);
                    file.Content.Position = 0;
                    return File(file.Content, file.ContentType);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return HttpNotFound();
        }


        [Route("KontrolFiles/Delete")]
        [HttpPut]
        public async Task<ActionResult> Delete()
        {
            dynamic obj = base.GetInputObject();

            try
            {
                string rp = this.getRepositoryPath(
                    Convert.ToString(obj.EntityType),
                    Convert.ToInt32(obj.EntityId),
                    Convert.ToString(obj.Tipo),
                    Convert.ToString(obj.Uid));

                GetFileManager().Delete(rp);

                return await Get("/KontrolFiles/Delete").Add("id", obj.ID).ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("KontrolFiles/UpdateGeoJson")]
        [HttpPut]
        public async Task<ActionResult> UpdateGeoJson()
        {
            try
            {
                dynamic obj = base.GetInputData();
                //base.get
                string Data = string.Empty;
                if (obj != null)
                {
                    Data = obj;
                }
                if (!string.IsNullOrEmpty(Data) || !string.IsNullOrWhiteSpace(Data))
                {
                    //byte[] data = Convert.FromBase64String(Data);
                    //List<EK.Modelo.Kontrol.GeoJsonMap> m = JsonConvert.DeserializeObject<List<Modelo.Kontrol.GeoJsonMap>>(System.Text.Encoding.UTF8.GetString(data));
                    List<EK.Modelo.Kontrol.GeoJsonMap> m = JsonConvert.DeserializeObject<List<Modelo.Kontrol.GeoJsonMap>>(Data);

                    if (m != null)
                    {
                        if (m.Count > 0)
                        {
                            string sp = m[0].Repo;
                            if (!string.IsNullOrEmpty(sp) || !string.IsNullOrWhiteSpace(sp))
                            {
                                var geoJsonFile = GetFileManager().GetFile(sp);
                                string fExt = string.Empty;
                                if (geoJsonFile.MetaData.TryGetValue("name", out fExt))
                                {
                                    string js = string.Empty;
                                    if (fExt.EndsWith("geojson"))
                                    {
                                        geoJsonFile.Content.Position = 0;

                                        var ms = new MemoryStream();
                                        geoJsonFile.Content.CopyTo(ms);
                                        ms.Position = 0;
                                        byte[] btArr = ms.ToArray();
                                        //st.Content.CopyTo( //..ToArray();
                                        //st.Co
                                        js = System.Text.Encoding.Default.GetString(btArr);
                                        JObject geoJson = JObject.Parse(js);
                                        JToken jtkn = geoJson["features"];
                                        if (jtkn != null)
                                        {
                                            int order = 0; string FileId = string.Empty;
                                            Modelo.Kontrol.GeoJsonMap g = new Modelo.Kontrol.GeoJsonMap();
                                            foreach (dynamic f in jtkn)
                                            {
                                                if (f.properties.Order != null)
                                                {
                                                    if (f.properties.FileId != null)
                                                    {
                                                        order = f.properties.Order;
                                                        FileId = f.properties.FileId;
                                                        g = m.Where(w => w.Order.Equals(order) && w.FileId.Equals(FileId)).FirstOrDefault();
                                                        if (g != null)
                                                        {
                                                            f.properties.Clave = g.Clave;
                                                        }
                                                    }

                                                }
                                            }
                                            geoJson["features"] = jtkn;
                                        }
                                        byte[] finalArr = System.Text.Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(geoJson));
                                        GetFileManager().Save(sp, geoJsonFile.ContentType, geoJsonFile.MetaData, finalArr);
                                    }
                                }
                            }

                        }
                    }
                    return await Task.Run(() => Json(true, JsonRequestBehavior.AllowGet));
                }
                else
                {
                    return await Task.Run(() => Json(false, JsonRequestBehavior.AllowGet));
                }
            }
            catch (Exception E)
            {
                string e = E.Message;
                return await Task.Run(() => Json(false, JsonRequestBehavior.AllowGet));
            }
        }
    }
}