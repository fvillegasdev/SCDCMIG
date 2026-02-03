//using EK.Modelo.SCV.Interfaces;
//using EK.Modelo.Kontrol.Interfaces;
//using System;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class RangosIngresos : mkontrol.BaseKontrol, IRangoIngresos
//    {
//        private string clave;
//        private string nombre;        
//        private Decimal rangoInicial;
//        private Decimal rangoFinal;        

//        public string Clave
//        {
//            get { return clave; }
//            set
//            {
//                clave = value;
//                base.PropertyChanged("Clave");
//            }
//        }

//        public string Nombre
//        {
//            get { return nombre; }
//            set
//            {
//                nombre = value;
//                base.PropertyChanged("Nombre");
//            }
//        }

//        public Decimal RangoInicial
//        {
//            get { return rangoInicial; }
//            set
//            {
//                rangoInicial = value;
//                base.PropertyChanged("RangoInicial");
//            }
//        }

//        public Decimal RangoFinal
//        {
//            get { return rangoFinal; }
//            set
//            {
//                rangoFinal = value;
//                base.PropertyChanged("RangoFinal");
//            }
//        }
      
//    }
//}
