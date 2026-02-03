//using System;
//using EK.Modelo.Kontrol.Interfaces;
//using EK.Modelo.SCV.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class Proceso : mkontrol.BaseKontrol, IProceso
//    {
//        private int idAccionProceso;
//        private IItemGeneral accionProceso;
//        private string evento;
//        private string responsable;

//        public IItemGeneral AccionProceso
//        {
//            get { return accionProceso; }
//            set
//            {
//                accionProceso = value;
//                base.PropertyChanged("AccionProceso");
//            }
//        }

//        public string Evento
//        {
//            get { return evento; }
//            set
//            {
//                evento = value;
//                base.PropertyChanged("Evento");
//            }
//        }

//        public int IdAccionProceso
//        {
//            get { return idAccionProceso; }
//            set
//            {
//                idAccionProceso = value;
//                base.PropertyChanged("IdAccionProceso");
//            }
//        }

//        public string Responsable
//        {
//            get { return responsable; }
//            set
//            {
//                responsable = value;
//                base.PropertyChanged("Responsable");
//            }
//        }
//    }
//}
