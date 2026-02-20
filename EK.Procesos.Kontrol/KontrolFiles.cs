using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.IO;
using System.Text;
using EK.Drivers.Log;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Globalization;
//using Xceed.Document.NET;
//using Xceed.Words.NET;

using m = EK.Modelo.Kontrol;
using d = EK.Datos.Kontrol;
using p = EK.Procesos.Kontrol;
using Xceed.Words.NET;
using iTextSharp.text;
using iTextSharp.text.pdf;
//using Xceed.Document.NET;
//using iText.Kernel.Geom;
//using iText.Kernel.Pdf;
//using iText.Layout;
//using iText.Layout.Element;
//using iText.Layout.Properties;

namespace EK.Procesos.Kontrol
{
    public class KontrolFiles
        : p.ProcesoBase, p.Interfaces.IKontrolFiles
    {
        private d.Interfaces.IKontrolFiles dao;

        public KontrolFiles(m.Interfaces.IContainerFactory factory, d.Interfaces.IKontrolFiles dao)
            : base(factory, dao, "KontrolFiles")
        {
            this.factory = factory;
            this.dao = dao;
        }

        public async Task<List<m.Interfaces.IKontrolFile>> GetAll(Dictionary<string, object> parametros)
        {
            return await this.dao.GetAll(parametros);
        }

        public async Task<m.Interfaces.IKontrolFile> GetItem(Dictionary<string, object> parametros)
        {
            return await this.dao.GetItem(parametros);
        }

        public async Task<m.Interfaces.IKontrolFile> GetById(int id)
        {
            return await this.dao.GetById(id);
        }

        public async Task<m.Interfaces.IKontrolFile> Save(m.Interfaces.IKontrolFile item)
        {
            var retValue = Get<m.Interfaces.IKontrolFile>();

            try
            {
                BeginTransaction();
                
                item.IdCreadoPor = base.getUserId();
                item.IdModificadoPor = base.getUserId();

                if (item.ID < 1)
                {
                    item.Clave = Guid.NewGuid().ToString();
                }

                int id = await this.dao.Save(item);

                retValue = await this.dao.GetById(id);

                // await Log(retValue);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<m.Interfaces.IKontrolFile> Delete(int id)
        {
            var retValue = Get<m.Interfaces.IKontrolFile>();

            try
            {
                BeginTransaction();

                retValue = await this.dao.GetById(id);

                await this.dao.Delete(id);

                var deletedItem = await this.dao.GetById(id);
                if (deletedItem == null)
                {
                    retValue.Estado = m.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    retValue = deletedItem;
                    retValue.Estado = m.KontrolEstadosEnum.Modificado;
                }

                // await this.Log(retValue);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task Log(m.Interfaces.IKontrolFile obj)
        {
            dynamic entity = new ElasticEntity();

            entity.EntityId = obj.EntityId;
            entity.EntityType = obj.EntityType;
            entity.Modulo = obj.Modulo;
            entity.Uid = obj.Uid;
            entity.Tipo = obj.Tipo;
            entity.FilePath = obj.FilePath;
            entity.Nombre = obj.Nombre;
            entity.FileSize = obj.FileSize;
            entity.FileType = obj.FileType;
            entity.FileVersion = obj.FileVersion;
            entity.FileExtension = obj.FileExtension;

            entity.RecordType = Convert.ToInt32(obj.Estado);
            entity.RecordTypeName = obj.Estado.ToString();
            entity.Creado = obj.Creado;
            entity.IdCreadoPor = obj.CreadoPor.ID;
            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;
            entity.Modificado = obj.Modificado;
            entity.IdModificadoPor = obj.ModificadoPor.ID;
            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;
            // this.Log(entity, obj);
            await this.factory.GetInstance<ILogger>().AddAsync(entityName, entity);
        }

        public async Task<long?> GetLastVersion(string tipo, string modulo, string entityType, int entityId)
        {
            var parametros = new Dictionary<string, object>();
            parametros.Add("Tipo", tipo);
            parametros.Add("Modulo", modulo);
            parametros.Add("EntityType", entityType);
            parametros.Add("EntityId", entityId);
            parametros.Add("versioning", 1);
            parametros.Add("activos", 1);

            long? retValue = 0;

            var result = await this.dao.GetAll(parametros);
            if (result != null && result.Count > 0)
            {
                retValue = result.Max(f => f.FileVersion);
            }
            if (retValue == null)
            {
                retValue = 0;
            }
            return retValue;
        }

        public async Task<m.Interfaces.IKontrolFile> CreateDocumento(string entityType, int entityId, string tipo, string modulo, EK.Drivers.Common.IKontrolFiles documento)
        {
            return await this.createDocumento(entityType, entityId, tipo, modulo, documento);
        }

        public async Task<m.Interfaces.IKontrolFile> CreateDocumento(string entityType, int entityId, string tipo, string modulo, m.Interfaces.IKontrolDocument documento)
        {
            return await this.createDocumento(entityType, entityId, tipo, modulo, documento);
        }

        private async Task<m.Interfaces.IKontrolFile> createDocumento(string entityType, int entityId, string tipo, string modulo, dynamic documento)
        {
            var retValue = Get<m.Interfaces.IKontrolFile>();
            var fileDriver = Get<EK.Drivers.Storage.IStorage>();
            try
            {
                DateTime dt = DateTime.UtcNow;
                string uid = dt.Ticks.ToString();

                var md = new Dictionary<string, string>();
                md.Add("source", "ek");
                md.Add("name", documento.Nombre);
                md.Add("uuid", uid);
                md.Add("tipo", tipo);
                md.Add("entityId", Convert.ToString(entityId));
                md.Add("entityType", entityType);
                md.Add("modulo", modulo);

                string storagePath = string.Format("kontrolFiles/{0}/{1}/{2}/{3}", entityType, entityId, tipo, uid);
                string filePath = string.Format("KontrolFiles/GetFile/{0}/{1}/{2}/{3}", entityType, entityId, tipo, uid);

                var stream = new MemoryStream();
                documento.Content.Position = 0;
                documento.Content.CopyTo(stream);

                stream.Position = 0;
                fileDriver.Save(storagePath, documento.ContentType, md, stream.ToArray());
                

                var bpEstatus = Get<p.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");
                var lastVersion = await this.GetLastVersion(tipo, modulo, entityType, entityId);

                var item = Get<m.Interfaces.IKontrolFile>();
                item.EntityId = entityId;
                item.EntityType = entityType;
                item.Tipo = tipo;
                item.Modulo = modulo;
                item.Clave = null;
                item.Nombre = documento.Nombre;
                item.FileSize = documento.Size;
                item.FilePath = filePath;
                item.FileType = documento.ContentType;
                item.FileExtension = documento.Extension;
                item.FileVersion = lastVersion + 1;
                item.Uid = uid;
                item.IdEstatus = estatus.ID;
                item.IdCreadoPor = base.getUserId();
                item.IdModificadoPor = base.getUserId();

                int id = await this.dao.Save(item);
                retValue = await this.dao.GetById(id);

                //await this.Log(retValue);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<m.Interfaces.IKontrolFile> SaveFile(m.Interfaces.IKontrolFile item, MemoryStream stream, string contentType)
        {
            var retValue = Get<m.Interfaces.IKontrolFile>();
            var fileDriver = Get<EK.Drivers.Storage.IStorage>();

            try
            {
                BeginTransaction();

                if (item != null && item.ID > 0)
                {
                    string deletedFile = string.Format("kontrolFiles/{0}/{1}/{2}/{3}", item.EntityType, item.EntityId, item.Tipo, item.Uid);
                    fileDriver.Delete(deletedFile);
                }

                DateTime dt = DateTime.UtcNow;
                if (item.EntityId == 45 || item.EntityId == 52 || item.EntityId == 53)
                {
                    item.Uid = item.ClavePlantilla;
                    item.Nombre = item.ClavePlantilla;
                }
                else
                {
                    item.Uid = dt.Ticks.ToString();
                }

                var md = new Dictionary<string, string>();
                md.Add("source", "ek");
                md.Add("id", Convert.ToString(item.ID));
                md.Add("name", Convert.ToBase64String(Encoding.UTF8.GetBytes(item.Nombre)));
                md.Add("uuid", item.Uid);
                md.Add("tipo", item.Tipo);
                md.Add("entityId", Convert.ToString(item.EntityId));
                md.Add("entityType", item.EntityType);
                md.Add("modulo", item.Modulo);

                string storagePath = string.Format("kontrolFiles/{0}/{1}/{2}/{3}", item.EntityType, item.EntityId, item.Tipo, item.Uid);
                string filePath = string.Format("KontrolFiles/GetFile/{0}/{1}/{2}/{3}", item.EntityType, item.EntityId, item.Tipo, item.Uid);

                if (item.FileExtension != null)
                {
                    string fExt = string.Empty;
                    fExt = item.FileExtension;
                    string js = string.Empty;
                    if (fExt == "geojson")
                    {
                        stream.Position = 0;
                        byte[] btArr = stream.ToArray();
                        js = System.Text.Encoding.Default.GetString(btArr);
                        JObject geoJson = JObject.Parse(js);
                        JToken jtkn = geoJson["features"];
                        if (jtkn != null)
                        {
                            int order = 0;
                            foreach (dynamic f in jtkn)
                            {
                                f.properties.FileId = Convert.ToString(item.Uid);
                                f.properties.FileUrl = filePath;
                                f.properties.Order = order;
                                f.properties.Repo = storagePath;
                                f.properties.Md = JsonConvert.SerializeObject(md);
                                order++;
                            }
                            geoJson["features"] = jtkn;
                        }

                        byte[] finalArr = System.Text.Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(geoJson));
                        fileDriver.Save(storagePath, contentType, md, finalArr);
                    }
                    else
                    {
                        stream.Position = 0;
                        fileDriver.Save(storagePath, contentType, md, stream.ToArray());
                    }
                }

                var bpEstatus = Get<p.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS_DOCUMENTOS", "NV");

                item.FilePath = filePath;
                item.IdCreadoPor = base.getUserId();
                item.IdModificadoPor = base.getUserId();
                item.IdEstatus = estatus.ID;

                if (item.ID < 1)
                {
                    item.Clave = Guid.NewGuid().ToString();
                    item.FileVersion = 1;
                }

                int id = await this.dao.Save(item);
                retValue = await this.dao.GetById(id);

                // await this.Log(retValue);
                // await Log(retValue);
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }


        public async Task<m.Interfaces.IKontrolFilesVersiones> SaveFileVersion(m.Interfaces.IKontrolFilesVersiones item, MemoryStream stream, string contentType, m.Interfaces.IKontrolFile padre)
        {
            var daoKontrolFileVersion = Get<d.Interfaces.IKontrolFilesVersiones>();
            var retValue = Get<m.Interfaces.IKontrolFilesVersiones>();

            var fileDriver = Get<EK.Drivers.Storage.IStorage>();

            try
            {
                BeginTransaction();

                if (item != null && item.ID > 0)
                {
                    string deletedFile = string.Format("kontrolFiles/{0}/{1}/{2}/{3}", padre.EntityType, padre.EntityId, padre.Tipo, item.Uid);
                    fileDriver.Delete(deletedFile);
                }

                DateTime dt = DateTime.UtcNow;
                item.Uid = dt.Ticks.ToString();

                var md = new Dictionary<string, string>();
                md.Add("source", "ek");
                md.Add("id", Convert.ToString(item.ID));
                md.Add("name", Convert.ToBase64String(Encoding.UTF8.GetBytes(item.Nombre)));
                md.Add("uuid", item.Uid);
                md.Add("tipo", padre.Tipo);
                md.Add("entityId", Convert.ToString(padre.EntityId));
                md.Add("entityType", padre.EntityType);
                md.Add("modulo", padre.Modulo);

                string storagePath = string.Format("kontrolFiles/{0}/{1}/{2}/{3}", padre.EntityType, padre.EntityId, padre.Tipo, item.Uid);
                string filePath = string.Format("KontrolFiles/GetFile/{0}/{1}/{2}/{3}", padre.EntityType, padre.EntityId, padre.Tipo, item.Uid);

                if (item.FileExtension != null)
                {
                    string fExt = string.Empty;
                    fExt = item.FileExtension;
                    string js = string.Empty;
                    if (fExt == "geojson")
                    {
                        stream.Position = 0;
                        byte[] btArr = stream.ToArray();
                        js = System.Text.Encoding.Default.GetString(btArr);
                        JObject geoJson = JObject.Parse(js);
                        JToken jtkn = geoJson["features"];
                        if (jtkn != null)
                        {
                            int order = 0;
                            foreach (dynamic f in jtkn)
                            {
                                f.properties.FileId = Convert.ToString(item.Uid);
                                f.properties.FileUrl = filePath;
                                f.properties.Order = order;
                                f.properties.Repo = storagePath;
                                f.properties.Md = JsonConvert.SerializeObject(md);
                                order++;
                            }
                            geoJson["features"] = jtkn;
                        }

                        byte[] finalArr = System.Text.Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(geoJson));
                        fileDriver.Save(storagePath, contentType, md, finalArr);
                    }
                    else
                    {
                        stream.Position = 0;
                        fileDriver.Save(storagePath, contentType, md, stream.ToArray());
                    }
                }



    ;
                item.FilePath = filePath;
                retValue = await daoKontrolFileVersion.Save(item);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }


        public async Task<m.Interfaces.IKontrolFile> ConvertirDocumento(string entityType, int entityId, string modulo, string tipo, Stream input, dynamic data, m.Interfaces.IMoneda moneda, string languaje, string fileName, string extension, string contentType)
        {
            var documento = Get<m.Interfaces.IKontrolDocument>();
            var docFactory = Get<EK.Drivers.Documents.IDocument>();
            var retValue = Get<m.Interfaces.IKontrolFile>();
            var fileDriver = Get<EK.Drivers.Storage.IStorage>();
            string trackLine = "";
            try
            {
                DateTime dt = DateTime.UtcNow;
                string uid = dt.Ticks.ToString();

                var md = new Dictionary<string, string>();
                md.Add("source", "ek");
                md.Add("name", fileName + "-" + Convert.ToString(entityId) + "." + extension);
                md.Add("uuid", uid);
                md.Add("tipo", tipo);
                md.Add("entityId", Convert.ToString(entityId));
                md.Add("entityType", entityType);
                md.Add("modulo", modulo);
                trackLine = "agregar al dictionario";
                string storagePath = string.Format("kontrolFiles/{0}/{1}/{2}/{3}", entityType, entityId, tipo, uid);
                string filePath = string.Format("KontrolFiles/GetFile/{0}/{1}/{2}/{3}", entityType, entityId, tipo, uid);
                trackLine = "storage y filepath correctos " + storagePath + " " + filePath;
                var jsonData = JsonConvert.SerializeObject(data);
                trackLine = "convertido a json";
                string jsonMoneda = null;

                if (moneda != null)
                {
                    jsonMoneda = JsonConvert.SerializeObject(moneda);
                }
                trackLine = "conversion de moneda a json, agregar extension, nombre, content y position";
                documento.Extension = extension;
                documento.Nombre = string.Format("{0}.{1}", fileName + "-" + Convert.ToString(entityId), extension);
                documento.ContentType = contentType;
                input.Position = 0;
                trackLine = "el streamreader";
                //StreamReader sr = new StreamReader(input);
                //string inputstring = sr.ReadLine();
                trackLine = "leer el stream y tratar de convetir a pdf";
                documento.Content = docFactory.ConvertToPDF(jsonData, input, jsonMoneda, languaje, false);
                //documento.Content = this.ConvertToPDF(jsonData, input, jsonMoneda, languaje, false);
                documento.Size = documento.Content.Length;
                trackLine = "convertido a pdf, y asignacion de sz";
                var bpEstatus = Get<p.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");
                var lastVersion = await this.GetLastVersion(tipo, modulo, entityType, entityId);
                trackLine = "creacion del item";
                var item = Get<m.Interfaces.IKontrolFile>();
                item.EntityId = entityId;
                item.EntityType = entityType;
                item.Tipo = tipo;
                item.Modulo = modulo;
                item.Clave = null;
                item.Nombre = documento.Nombre;
                item.FileSize = documento.Size;
                item.FilePath = filePath;
                item.FileType = documento.ContentType;
                item.FileExtension = documento.Extension;
                item.FileVersion = lastVersion + 1;
                item.Uid = uid;
                item.IdEstatus = estatus.ID;
                item.IdCreadoPor = base.getUserId();
                item.IdModificadoPor = base.getUserId();
                trackLine = "crear nuevo stream";
                var stream = new MemoryStream();
                documento.Content.Position = 0;
                documento.Content.CopyTo(stream);
                trackLine = "copiado a documento y stream, guardar documento";
                //permite guardar el archivo en el repositorio
                //if(entityType != "SPVEntregaPaquetes")
                //{
                fileDriver.Save(storagePath, documento.ContentType, md, stream.ToArray());
                //}
                trackLine = "guardar archivo y obtener id";


                //crea el registro en la base de datos
                int id = await this.dao.Save(item);
                trackLine = "obtener despues de guardaar";
                retValue = await this.dao.GetById(id);
            }
            catch (Exception ex)
            {
                //nex.Message = "";
                throw new Exception($"Error al convertir documento: {trackLine}", ex);

                //throw ex;
            }

            return retValue;
        }


        //public Stream ConvertToPDF(string jsonObject, Stream fileSource, string moneda, string languageId, bool useBookmarks)
        //{

        //    JObject val = (JObject)JsonConvert.DeserializeObject(jsonObject);

        //    fileSource.Position = 0;
        //    var memoryCopy = new MemoryStream();
        //    fileSource.CopyTo(memoryCopy);
        //    memoryCopy.Position = 0;

        //    // 2️⃣ Cargamos el documento Word en memoria
        //    using (var doc = DocX.Load(memoryCopy))
        //    {
        //        // 3️⃣ Recorremos las propiedades del JObject
        //        foreach (var prop in val)
        //        {
        //            string marcador = $"@@{prop.Key}@@";
        //            string valor = prop.Value?.ToString() ?? "";
        //            doc.ReplaceText(marcador, valor);
        //        }

        //        // 4️⃣ Guardamos el Word modificado en memoria
        //        var modifiedDocx = new MemoryStream();
        //        doc.SaveAs(modifiedDocx);
        //        modifiedDocx.Position = 0;

        //        // 5️⃣ Convertimos a PDF
        //        return ConvertDocxToPdf(modifiedDocx);
        //    }
        //}

        //private Stream ConvertDocxToPdf(Stream docxStream)
        //{
        //    docxStream.Position = 0;
        //    var pdfStream = new MemoryStream();

        //    using (var docx = DocX.Load(docxStream))
        //    using (var pdfDoc = new Document(PageSize.A4))
        //    {
        //        PdfWriter writer = PdfWriter.GetInstance(pdfDoc, pdfStream);
        //        writer.CloseStream = false; // 🔹 importante: no cerrar el MemoryStream base
        //        pdfDoc.Open();

        //        foreach (var paragraph in docx.Paragraphs)
        //        {
        //            string text = paragraph.Text.Trim();
        //            if (!string.IsNullOrEmpty(text))
        //            {
        //                var font = FontFactory.GetFont(FontFactory.HELVETICA, 12);
        //                pdfDoc.Add(new Paragraph(text, font));
        //            }
        //        }

        //        pdfDoc.Close();
        //        writer.Close();
        //    }

        //    pdfStream.Position = 0; // 🔹 Rewind antes de devolver
        //    return pdfStream;
        //}
        //private Stream ConvertDocxToPdf(Stream docxStream)
        //{
        //    docxStream.Position = 0;
        //    var pdfStream = new MemoryStream();

        //    using (var docx = DocX.Load(docxStream))
        //    {
        //        using (var writer = new PdfWriter(pdfStream))
        //        using (var pdf = new PdfDocument(writer))
        //        using (var document = new Document(pdf))
        //        {
        //            foreach (var paragraph in docx.Paragraphs)
        //            {
        //                string text = paragraph.Text.Trim();
        //                if (!string.IsNullOrEmpty(text))
        //                {
        //                    document.Add(new Paragraph(text)
        //                        .SetFontSize(12)
        //                        .SetTextAlignment(TextAlignment.LEFT)
        //                        .SetMarginBottom(8));
        //                }
        //            }

        //            document.Close();
        //        }
        //    }

        //    pdfStream.Position = 0;
        //    return pdfStream;
        //}

        public System.IO.Stream GetByStorage(string entityType, int entityId, string tipo, string uid)
        {
            var fileName = string.Format("kontrolFiles/{0}/{1}/{2}/{3}", entityType, entityId, tipo, uid);
            var fileDriver = Get<EK.Drivers.Storage.IStorage>();
            var fileObj = fileDriver.GetFile(fileName);

            return fileObj.Content;
        }

        public async Task<bool> DeleteByParams(Dictionary<string, object> parametros)
        {
            bool successful = true;

            var files = await this.dao.GetAll(parametros);
            if (files != null && files.Count > 0)
            {
                foreach (var f in files)
                {
                    int id = await this.dao.Delete((int)f.ID);
                    if (id < 1)
                    {
                        successful = false;
                    }
                }
            }

            return successful;
        }

        public byte[] CompressFiles(List<m.Interfaces.IKontrolDocument> entries)
        {
            byte[] fileBytes = null;

            try
            {
                using (System.IO.MemoryStream memoryStream = new System.IO.MemoryStream())
                {
                    using (System.IO.Compression.ZipArchive zip = new System.IO.Compression.ZipArchive(memoryStream, System.IO.Compression.ZipArchiveMode.Create, true))
                    {
                        foreach (m.Interfaces.IKontrolDocument e in entries)
                        {
                            System.IO.Compression.ZipArchiveEntry zipItem = zip.CreateEntry(e.Nombre + "." + e.Extension);

                            MemoryStream ms = new MemoryStream();
                            e.Content.Position = 0;
                            e.Content.CopyTo(ms);

                            byte[] buffer = ms.ToArray();

                            using (System.IO.MemoryStream originalFileMemoryStream = new System.IO.MemoryStream(buffer))
                            {
                                using (System.IO.Stream entryStream = zipItem.Open())
                                {
                                    originalFileMemoryStream.CopyTo(entryStream);
                                }
                            }
                        }
                    }

                    fileBytes = memoryStream.ToArray();
                }

                return fileBytes;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public byte[] CompressFiles(List<m.Interfaces.IKontrolFile> files)
        {
            var entries = new List<m.Interfaces.IKontrolDocument>();

            foreach (var f in files)
            {
                using (Stream content = this.GetByStorage(f.EntityType, f.EntityId, f.Tipo, f.Uid))
                {
                    var entry = Get<m.Interfaces.IKontrolDocument>();
                    entry.Nombre = f.Nombre.Split('.')[0];
                    entry.Extension = f.FileExtension;
                    entry.Content = new MemoryStream();
                    content.Position = 0;
                    content.CopyTo(entry.Content);
                    entries.Add(entry);
                }
            }

            return this.CompressFiles(entries);
        }

        public async Task<m.Interfaces.IKontrolFile> SaveZipFile(byte[] bytes, string filename)
        {
            m.Interfaces.IKontrolFile retValue = null;

            try
            {
                using (MemoryStream stream = new MemoryStream(bytes))
                {
                    var documento = Get<m.Interfaces.IKontrolDocument>();
                    documento.Content = stream;
                    documento.ContentType = "application/zip";
                    documento.Extension = "zip";
                    documento.Nombre = string.Format("{0}.zip", filename);

                    retValue = await this.CreateDocumento(filename, 0, "anexos", "kontrol", documento);
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.Interfaces.IKontrolFile> GetByUid(string uid)
        {
            return await this.dao.GetByUid(uid);
        }


        public async Task<List<m.Interfaces.IDocumentoCategorias>> GetCategories(Dictionary<string, object> parametros)
        {
            var daoDocumentoCategories = Get<d.Interfaces.IDocumentoCategorias>();
            return await daoDocumentoCategories.GetAll(parametros);
        }

        public async Task<bool> DeleteFile(string path)
        {
          
            var fileDriver = Get<EK.Drivers.Storage.IStorage>();
            //var resp = await fileDriver.DeleteAsync(path);
            var resp = fileDriver.Delete(path);
            return resp;
        }
    }
}