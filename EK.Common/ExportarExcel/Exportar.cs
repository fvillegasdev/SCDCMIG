using System.IO;
using System.Linq;
using System.Collections.Generic;
using OfficeOpenXml;
using System.Web.Mvc;

using Newtonsoft.Json.Linq;
using System;

namespace EK.Common.Exportacion
{
    public class Excel
    {
        public FileStreamResult Exportar(string nombre, dynamic datos)
        {
            MemoryStream stream = new MemoryStream();

            using (var document = new ExcelPackage(stream))
            {
                document.Workbook.Worksheets.Add(nombre);
                ExcelWorksheet ws = document.Workbook.Worksheets[1];
                ws.Name = nombre;
                ws.Cells.Style.Font.Size = 10;
                ws.Cells.Style.Font.Name = "Calibri";

                int col = 0;
                //int row = 1;
                for (int i = 0; i < datos.Count; i++)
                {
                    JObject obj = datos[i];
                    var props = obj.Properties();

                    if (i == 0)
                    {
                        // add headers
                        IEnumerable<JProperty> nprops;

                        
                        foreach (var p in props)
                        {
                           // ws.Cells[1, ++col].Value = p.Name == "numcte" ? "No. Cliente" : p.Name;

                            if (nombre == "ConfigViviendaEntregable")
                            {
                                if ( p.Name != "ap_paterno_cte" && p.Name != "ap_materno_cte")
                                {
                                    ws.Cells[1, ++col].Value = p.Name == "numcte" ? "No. Cliente" : p.Name == "nom_cte" ? "Cliente": p.Name;
                                }
                            }
                            else
                            {
                                ws.Cells[1, ++col].Value = p.Name == "numcte" ? "No. Cliente" : p.Name;
                            }
                            //ws.Column(col).Style.Numberformat.Format = string.IsNullOrWhiteSpace(columna.Formato) ? "" : columna.Formato;
                        }
                    }

                    col = 0;
                    foreach (var c in props)
                    {
                        var value = datos[i].SelectToken(c.Name);
                        if (value != null) {
                            if (value is JObject) {
                                JObject jobj = (JObject)value;

                                JProperty hasDefProp = jobj.Properties().Where(p => p.Name == "Nombre" || p.Name == "Descripcion").FirstOrDefault();
                                if (hasDefProp != null)
                                {
                                    value = value[hasDefProp.Name];
                                }
                            }
                        }
                        if(value.Value is String && value.Value == "True" || value.Value is bool && value.Value == true)
                        {
                            ws.Cells[i + 2, ++col].Value = "SI";
                        } else if(value.Value is String && value.Value == "False" || value.Value is bool && value.Value == false)
                        {
                            ws.Cells[i + 2, ++col].Value = "NO";
                        } else
                        {
                            if (nombre == "ConfigViviendaEntregable")
                            {
                                if ( c.Name != "ap_paterno_cte" && c.Name != "ap_materno_cte")
                                {
                                    ws.Cells[i + 2, ++col].Value = value;
                                    //ws.Cells[1, ++col].Value = p.Name == "numcte" ? "No. Cliente" : p.Name;
                                }
                            }
                            else
                            {
                                ws.Cells[i + 2, ++col].Value = value;
                                // ws.Cells[1, ++col].Value = p.Name == "numcte" ? "No. Cliente" : p.Name;
                            }
                           // ws.Cells[i + 2, ++col].Value = value;
                        }
                       

                    }
                }
                document.Save();
            }

            //
            stream.Position = 0;
            var fsr = new FileStreamResult(stream, System.Net.Mime.MediaTypeNames.Application.Octet);
            fsr.FileDownloadName = $"{nombre}.xlsx";
            return fsr;
        }
    }
}