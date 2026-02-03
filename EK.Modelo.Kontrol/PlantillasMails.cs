//using System;
//using System.Collections.Generic;
//using System.Text;

//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.Kontrol
//{
//    public class PlantillasMails 
//        : BaseKontrol, IPlantillasMails
//    {
//        private IDictionary<string, string> parametros;
//        private string descripcion;

//        public string Descripcion
//        {
//            get { return descripcion; }
//            set
//            {
//                descripcion = value;
//                base.PropertyChanged("Descripcion");
//            }
//        }

//        private string plantilla;

//        public string Plantilla
//        {
//            get { return plantilla; }
//            set
//            {
//                plantilla = value;
//                base.PropertyChanged("Plantilla");
//            }
//        }

//        public IPlantillasMails Add(string parametro, string valor) {
//            if (this.parametros == null) {
//                this.parametros = new Dictionary<string, string>();
//            }

//            if (this.parametros.ContainsKey(parametro))
//            {
//                this.parametros[parametro] = valor;
//            }
//            else {
//                this.parametros.Add(parametro, valor);
//            }

//            return this;
//        }

//        public override string ToString() {
//            var content = new StringBuilder(this.plantilla);

//            if (this.parametros != null)
//            {
//                foreach (var entry in this.parametros)
//                {
//                    content.Replace(entry.Key, entry.Value);
//                }
//            }

//            return content.ToString();
//        }
//    }
//}