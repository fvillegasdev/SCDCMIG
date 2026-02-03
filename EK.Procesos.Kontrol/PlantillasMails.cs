using System.Collections.Generic;
using System.Text;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace EK.Procesos.Kontrol
{
    public class PlantillasMails
        : BPBase<m.Kontrol.Interfaces.IPlantillasMails, d.Kontrol.Interfaces.IPlantillasMails>, p.Kontrol.Interfaces.IPlantillasMails
    {
        public PlantillasMails(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IPlantillasMails dao)
               : base(factory, dao, "plantillas")
        {
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.Plantilla = obj.Plantilla;
        }

        public override Task<List<m.Kontrol.Interfaces.IPlantillasMails>> GetAll(Dictionary<string, object> parametros)
        {
            parametros.Add("IdUser", base.getUserId());       
            return base.GetAll(parametros);
        }
    }

    public class PlantillaWrapper
    {
        private m.Kontrol.Interfaces.IPlantillasMails plantilla;
        private List<string> parametros;
        private dynamic obj;
        private m.Kontrol.Interfaces.IContainerFactory factory;
        private m.Kontrol.Interfaces.IMoneda moneda;

        public PlantillaWrapper(m.Kontrol.Interfaces.IPlantillasMails plantilla, dynamic obj)
        {
            this.plantilla = plantilla;
            this.obj = obj;
            this.parametros = new List<string>();

            //extrar el nombre de la plantilla
            this.extractParameters(this.plantilla.Nombre);

            //procesar plantilla del editor HTML
            if (this.plantilla.TipoPlantilla.Clave == "HTMLE")
            {
                if (!string.IsNullOrEmpty(this.plantilla.Plantilla))
                {
                    this.extractParameters(this.plantilla.Plantilla);
                }
            }
        }

        public PlantillaWrapper(m.Kontrol.Interfaces.IPlantillasMails plantilla, dynamic obj, m.Kontrol.Interfaces.IMoneda moneda, m.Kontrol.Interfaces.IContainerFactory factory)
        {
            this.plantilla = plantilla;
            this.obj = obj;
            this.parametros = new List<string>();

            //extrar el nombre de la plantilla
            this.extractParameters(this.plantilla.Nombre);

            //procesar plantilla del editor HTML
            if (this.plantilla.TipoPlantilla.Clave == "HTMLE")
            {
                if (!string.IsNullOrEmpty(this.plantilla.Plantilla))
                {
                    this.extractParameters(this.plantilla.Plantilla);
                }
            }

            this.factory = factory;
            this.moneda = moneda;
        }

        private void extractParameters(string plantilla)
        {
            var nextIndex = plantilla.Length == 0 ? -1 : 0;

            while (nextIndex >= 0)
            {
                var startIndex = plantilla.IndexOf("@@", nextIndex);

                string parameterName = string.Empty;

                if (startIndex >= 0)
                {
                    var endIndex = plantilla.IndexOf("@@", startIndex + 2);

                    if (endIndex >= 0)
                    {
                        parameterName = plantilla.Substring(startIndex + 2, endIndex - startIndex - 2);

                        this.parametros.Add(parameterName);

                        if (endIndex < (plantilla.Length - 1))
                        {
                            nextIndex = endIndex + 1;
                        }
                        else
                        {
                            nextIndex = -1;
                        }
                    }
                }
                else
                {
                    nextIndex = -1;
                }
            }
        }

        public void Empty()
        {
            this.parametros.Clear();
        }

        public m.Kontrol.Interfaces.IPlantillasMails Instance
        {
            get
            {
                return this.plantilla;
            }
        }

        private string getFullText(string str)
        {
            var content = new StringBuilder(str);

            if (this.parametros != null)
            {
                foreach (var entry in this.parametros)
                {
                    object tokenValue = this.obj.SelectToken(entry);
                    string pValue;
                    if (tokenValue != null)
                    {
                        pValue = tokenValue.ToString();
                    }
                    else
                    {
                        pValue = string.Empty;
                    }

                    content.Replace($@"@@{entry}@@", pValue);
                }
            }

            return content.ToString();
        }

        public m.Kontrol.Interfaces.IKontrolDocument GetDocument()
        {
            return this.GetDocument(true);
        }

        public m.Kontrol.Interfaces.IKontrolDocument GetDocument(bool useBookmarks)
        {
            m.Kontrol.Interfaces.IKontrolDocument retValue = null;

            if (this.plantilla.TipoPlantilla.Clave == "WORDF")
            {
                retValue = this.factory.GetInstance<m.Kontrol.Interfaces.IKontrolDocument>();

                var docFactory = this.factory.GetInstance<EK.Drivers.Documents.IDocument>();
                var jsonData = JsonConvert.SerializeObject(obj);
                string jsonMoneda = null;

                if (this.moneda != null)
                {
                    jsonMoneda = JsonConvert.SerializeObject(this.moneda);
                }

                retValue.Extension = "pdf";
                retValue.Nombre = string.Format("{0}.pdf", this.getFullText(this.plantilla.Nombre));
                retValue.ContentType = "application/pdf";
                retValue.Content = docFactory.ConvertToPDF(jsonData, plantilla.Contenido, jsonMoneda, this.plantilla.Idioma.Clave, useBookmarks);
                retValue.Size = retValue.Content.Length;
            }

            return retValue;
        }

        public string GetNombre()
        {
            return this.getFullText(this.plantilla.Nombre);
        }

        public override string ToString()
        {
            return this.getFullText(this.plantilla.Plantilla);
        }
    }
}