using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Configuration;
using io = System.IO;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class Fraccionamientos
        : p.Kontrol.BPBase<m.SCV.Interfaces.IFraccionamientos, d.SCV.Interfaces.IFraccionamientos>, p.SCV.Interfaces.IFraccionamientos
    {
        public Fraccionamientos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IFraccionamientos dao)
               : base(factory, dao, "fraccionamientos")
        {
        }

        public async override Task<List<m.SCV.Interfaces.IFraccionamientos>> GetAll(Dictionary<string, object> parametros)
        {
            parametros.Add("usuario", base.getUserId());
            return await this.dao.GetAll(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IFraccionamientos>> getFraccionamientosProyecto(Dictionary<string, object> parametros)
        {
            parametros.Add("usuario", base.getUserId());
            return await this.dao.getFraccionamientosProyecto(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IFraccionamientos>> getFraccionamientosByProyectoID(Dictionary<string, object> parametros)
        {
            parametros.Add("usuario", base.getUserId());
            return await this.dao.getFraccionamientosByProyectoID(parametros);
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

        public class InformacionMapas
        {
            public string rutaGJson { get; set; }
            public string claveFraccionamiento { get; set; }
            public string nombreFraccionamiento { get; set; }

            public string Latitud { get; set; }
            public string Longitud { get; set; }
        }

        public async Task<object> GetGeoJson(Dictionary<string, object> parametros)
        {
            List<InformacionMapas> fileList = new List<InformacionMapas>();
            try
            {
                var parametrosSIstema = await base.GetGlobalParameters("INSTALACION");
                //var siteWebURL = parametrosSIstema.Value<string>("RutaBaseKontrolFile");
                var siteWebURL = "https://apps.gruporuba.com.mx/scdc";

                List<m.SCV.Interfaces.IFraccionamientos> fraccionamientoCapas = await this.GetAll(parametros);
                if (fraccionamientoCapas != null)
                {
                    if (fraccionamientoCapas.Count > 0)
                    {
                        foreach (var filaFracc in fraccionamientoCapas)
                        {
                            string[] capas = filaFracc.CapasGJson.Split(',');
                            if (capas.Length > 1)
                            {
                                foreach (string capasIndividuales in capas)
                                {
                                    if ((capasIndividuales != null) && (capasIndividuales != "") && (capasIndividuales != "SIN CAPAS"))
                                    {
                                        InformacionMapas valorReg = new InformacionMapas();
                                        string[] archivo = capasIndividuales.Split('.');
                                        if (archivo != null && archivo[0] != null && archivo[1] != null)
                                        {
                                            valorReg.rutaGJson = siteWebURL + "/kontrolfiles/GetByStorageCustom/geomaps/Fraccionamientos/" + capasIndividuales + "/true";
                                            valorReg.claveFraccionamiento = filaFracc.Clave;
                                            valorReg.nombreFraccionamiento = filaFracc.Nombre;
                                            valorReg.Latitud = filaFracc.Latitud;
                                            valorReg.Longitud = filaFracc.Longitud; 

                                            var storageTarget = ConfigurationManager.AppSettings["drivers:filesystem:container"];

                                            var fullFileName = this.getFullFileName(storageTarget + "kontrolFiles\\geomaps\\Fraccionamientos\\", capasIndividuales);
                                            var blob = new io.FileInfo(fullFileName);

                                            if (blob != null && blob.Exists == true)
                                            {
                                                fileList.Add(valorReg);
                                            }
                                            else
                                            {
                                                //var a = "";
                                            }
                                        }
                                    }
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

            return fileList;
        }
    }
}