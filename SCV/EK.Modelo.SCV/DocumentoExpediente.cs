//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using mkontrol = EK.Modelo.Kontrol;
//using EK.Modelo.SCV.Interfaces;
//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.SCV
//{
//    public class DocumentoExpediente
//        : mkontrol.BaseKontrol, IDocumentoExpediente
//    {
//        private string clave;
//        private string nombre;
//        private int numeroCopias;

//        public string Clave
//        {
//            get { return clave; }
//            set
//            {
//                clave = value;
//                PropertyChanged("Clave");
//            }
//        }

//        public string Nombre
//        {
//            get { return nombre; }
//            set
//            {
//                nombre = value;
//                PropertyChanged("Nombre");
//            }
//        }

//        public int NumeroCopias
//        {
//            get { return numeroCopias; }
//            set
//            {
//                numeroCopias = value;
//                PropertyChanged("NumeroCopias");
//            }
//        }
//    }
//}
