//using System;
//using EK.Modelo.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;
//using EK.Modelo.Kontrol.Interfaces;
//using System.Collections.Generic;

//namespace EK.Modelo.SCV
//{
//    public class DesarrolloEsquema : Esquema, IDesarrolloEsquema
//    {
//        private List<IEntidadCaracteristica> caracteristicas;
//        private IEsquema esquema;
//        private int idEsquema;

//        public List<IEntidadCaracteristica> Caracteristicas
//        {
//            get
//            {
//                return caracteristicas;
//            }
//            set
//            {
//                caracteristicas = value;
//            }
//        }

//        public IEsquema Esquema
//        {
//            get { return esquema; }
//            set
//            {
//                esquema = value;
//                base.PropertyChanged("Esquema");
//            }
//        }

//        public int IdEsquema
//        {
//            get { return idEsquema; }
//            set
//            {
//                idEsquema = value;
//                base.PropertyChanged("IdEsquema");
//            }
//        }
//    }
//}