
//using System;
//using EK.Modelo.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class MotivosCancelacion : mkontrol.BaseKontrol, IMotivosCancelacion
//    {
//        private string abrev;
//        public string Abrev
//        {
//            get
//            {
//                return abrev;
//            }

//            set
//            {
//                abrev = value;
//                base.PropertyChanged("Abrev");
//            }
//        }

//        private string descripcion;
//        public string Descripcion
//        {
//            get
//            {
//                return descripcion;
//            }

//            set
//            {
//                descripcion = value;
//                base.PropertyChanged("Descripcion");
//            }
//        }

//        private Decimal porcentaje;
//        public Decimal Porcentaje
//        {
//            get
//            {
//                return porcentaje;
//            }

//            set
//            {
//                porcentaje = value;
//                base.PropertyChanged("Porcentaje");
//            }
//        }
//    }
//}
