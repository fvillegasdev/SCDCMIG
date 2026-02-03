using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

using mk = EK.Modelo.Kontrol;
using System.Configuration;

namespace EK.Procesos.SCV
{
    public class ConfigViviendaEntregable
        : p.Kontrol.BPBase<m.SCV.Interfaces.IConfigViviendaEntregable, d.SCV.Interfaces.IConfigViviendaEntregable>, p.SCV.Interfaces.IConfigViviendaEntregable

    {
        public ConfigViviendaEntregable(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IConfigViviendaEntregable dao)
            : base(factory, dao, "ConfigViviendaEntregable")
        {
        }

        public async Task<List<m.SCV.Interfaces.IConfigViviendaEntregable>> GetConfigViviendaEntregable(Dictionary<string, object> parametros)
        {
            parametros.Add("Usuario", getUserId());
            var ResultConfigViviendaEntregable = await this.dao.GetConfigViviendaEntregable(parametros);

            return ResultConfigViviendaEntregable;

        }


        public async Task<List<m.SCV.Interfaces.IConfigViviendaEntregable>> SaveConfigViv(int numcte, DateTime fecha_programacion, int num_entrega_viv, string lugar_hora_entrega, string bit_detalles)
        {

            var SaveConfigViv = await this.dao.SaveConfigViv(numcte, fecha_programacion, num_entrega_viv, lugar_hora_entrega, bit_detalles);

            return SaveConfigViv;

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

        

        public async Task<m.SCV.Interfaces.IConfigViviendaEntregable> GetDocumentoImpresion(m.SCV.Interfaces.IConfigViviendaEntregable model)
        {
            var bpMonedas = Get<p.Kontrol.Interfaces.IMonedas>();
            var bpKontrolFiles = Get<p.Kontrol.Interfaces.IKontrolFiles>();
            string trackLine = "0";

            try
            {
                BeginTransaction(true);

                var filesToCompress = new List<m.Kontrol.Interfaces.IKontrolFile>();

                string indicaError = "";
                foreach (var c in model.ImpresionDocs)
                {
                    //Documentos del Cliente
                    trackLine = "Inicio foreach";
                    var Documentos = await this.dao.GetDocumentoImpresion(c);
                    var idUbicacionVenta = c.IdUbicacionVenta;
                    trackLine = "documento obtenido y ubicacion venta";

                    if (Documentos.Count > 0)
                    {
                        string Ruta = Documentos[0].ruta;
                        //Informacion del Cliente
                        trackLine = "ruta" + Ruta;

                        var InformacionCte = await this.GetInformacionCte(idUbicacionVenta);
                        trackLine = "informacion cliente obtenida";

                        var claveDcto = Documentos[0].clave_dcto;
                        claveDcto = InformacionCte.EsCoacreditado ? claveDcto + "-CCD" : claveDcto;

                        var fileName = claveDcto + ".docx";
                        var fullFileName = this.getFullFileName(Ruta, fileName);
                        var blob = new System.IO.FileInfo(fullFileName);
                        MemoryStream fileStream = null;
                        trackLine = "creacion blob";

                        //
                        if (blob.Exists)
                        {
                            if (blob != null)
                            {
                                string FullName = fileName;
                                var ContentType = EK.Drivers.Common.MimeType.GetByFileName(fullFileName);
                                DateTime LastModified = blob.LastWriteTimeUtc;
                                fileStream = new System.IO.MemoryStream(System.IO.File.ReadAllBytes(fullFileName));
                                trackLine = "creacion filestream";

                            }
                            //
                            var moneda = await bpMonedas.GetByClave("MXN");
                            //
                            trackLine = "antes de crear pdf "+ fullFileName + " Byte length: " + fileStream.Length + " " + fileStream.CanSeek;

                            var PDF = await bpKontrolFiles.ConvertirDocumento("SPVEntregaPaquetes", idUbicacionVenta, "SPV", "anexos", fileStream, InformacionCte, moneda, "es-MX", claveDcto, "pdf", "application/pdf");
                            //
                            trackLine = "creado pdf";


                            if (PDF.ID > 0)
                            {
                                trackLine = "pdf agregar a lista ";

                                filesToCompress.Add(PDF);
                                c.ProcesoImpresion = "1";
                                trackLine = "pdf agregado a lista";

                            }
                            else
                            {
                                trackLine = "error al agregar ";

                                c.ProcesoImpresion = "0";
                                base.SetReturnInfo(2, "Proceso con detalle");
                                model.Estado = mk.KontrolEstadosEnum.Fallido;
                                indicaError = "Proceso con detalle";

                            }
                        }

                        else
                        {
                            trackLine = "error de blob ";

                            indicaError = indicaError + Documentos[0].clave_dcto + "<br>";
                            c.ProcesoImpresion = "0";
                        }
                    }
                    else
                    {
                        trackLine = "sin documento ";

                        indicaError = indicaError + "Plaza " + c.plaza + " Vocación " + c.clave_tipo_vivienda + " H.V " + c.hipoteca_verde + " Sin  Configuración <br>";
                        c.ProcesoImpresion = "0";
                    }
                   
                }

                if (indicaError == "")
                {
                    trackLine = "sin errores hast aqui ";

                    string datetime = DateTime.UtcNow.ToString("yyyyMMddHHmmss");
                    string filename = string.Format("EK10_PE_{0}_{1}", base.getUserId(), datetime);
                    trackLine = "convertir pdf a bytes ";

                    byte[] bytes = bpKontrolFiles.CompressFiles(filesToCompress);
                    trackLine = "convetido a bytes y guardar en zip ";

                    model.FileReference = await bpKontrolFiles.SaveZipFile(bytes, filename);
                    trackLine = "agregado a zip ";

                    model.ProcesoImpresion = "1";
                    model.Estado = mk.KontrolEstadosEnum.Exitoso;
                }
                else
                {
                    model.ProcesoImpresion = "0";
                    base.SetReturnInfo(1, "Proceso con detalle, no existe los siguientes DOC. <br> " + indicaError, 1);
                    model.Estado = mk.KontrolEstadosEnum.Fallido;
                }

                foreach (var c in model.ImpresionDocs)
                {
                     trackLine = "elimina archivos temporales";

                    var idUbicacionVenta = c.IdUbicacionVenta;
                    string rootPath = ConfigurationManager.AppSettings["drivers:filesystem:container"];
                    string folderClientPath = string.Format(@"{0}kontrolFiles\SPVEntregaPaquetes\{1}", rootPath, idUbicacionVenta);
                    Directory.Delete(folderClientPath, true);
                    trackLine = "temporal eliminado";

                }
                Commit();
               
                return model;
            }
            catch (IOException ex)
            {
                Rollback();
                //
                model.ProcesoImpresion = "0";
                base.SetReturnInfo(1, "Error el Documento se encuentra abierto [ "+ ex.Message+" ]", 1);
                // 
                return model;
            }
            catch (Exception ex)
            {
                Rollback();
                //
                model.ProcesoImpresion = "0";
                base.SetReturnInfo(1,"GE-" + trackLine + " " + ex.Message, 1);
                // 
                return model;
            }
        }

        public async Task<m.SCV.Interfaces.IPreparacionViviendaDocs> GetInformacionCte(int idUbicacionVenta)
        {

            try
            {
                //Informacion del Cliente
                var InformacionCte = await this.dao.GetInformacionCte(idUbicacionVenta);

                return InformacionCte;

            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }


        }

        public async Task<int> UpdateResponsableEntViv(Dictionary<string, object> parametros)
        {
            var response = await this.dao.UpdateResponsableEntViv(parametros);
            return response;    
        }
        public async Task<int> EncuestaViviendaEntregable(Dictionary<string, object> parametros)
        {

            parametros.Add("USUARIO", getUserId());
            var response = await this.dao.EncuestaVivienddaEntregable(parametros);
            return response;
        }

    }
}