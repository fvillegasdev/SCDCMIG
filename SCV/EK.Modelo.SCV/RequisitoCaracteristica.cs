//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using mkontrol = EK.Modelo.Kontrol;
//using EK.Modelo.SCV.Interfaces;

//namespace EK.Modelo.SCV
//{
//    public class RequisitoCaracteristica
//        : mkontrol.BaseKontrol, IRequisitoCaracteristica
//    {
//        string caracteristica;
//        int idRequisito;
//        string observaciones;

//        public string Caracteristica
//        {
//            get { return caracteristica; }
//            set
//            {
//                caracteristica = value;
//                base.PropertyChanged("Caracteristica");
//            }
//        }

//        public int IdRequisito
//        {
//            get { return idRequisito; }
//            set
//            {
//                idRequisito = value;
//                base.PropertyChanged("IdRequisito");
//            }
//        }

//        public string Observaciones
//        {
//            get { return observaciones; }
//            set
//            {
//                observaciones = value;
//                base.PropertyChanged("Observaciones");
//            }
//        }
//    }
//}
