//using EK.Modelo.SCV.Interfaces;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using mkontrol = EK.Modelo.Kontrol;
//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.SCV
//{
//    public class Requisito
//        : mkontrol.BaseKontrol, IRequisito
//    {
//        string clave;
//        string descripcion;
//        string observaciones;
//        IItemGeneral tipoRequisito;
//        List<IRequisitoCaracteristica> caracteristicas;

//        public List<IRequisitoCaracteristica> Caracteristicas
//        {
//            get { return caracteristicas; }
//            set
//            {
//                caracteristicas = value;
//                PropertyChanged("Caracteristicas");
//            }
//        }

//        public string Clave
//        {
//            get { return clave; }
//            set
//            {
//                clave = value;
//                PropertyChanged("Clave");
//            }
//        }

//        public string Descripcion
//        {
//            get { return descripcion; }
//            set
//            {
//                descripcion = value;
//                PropertyChanged("Descripcion");
//            }
//        }

//        public IItemGeneral TipoRequisito
//        {
//            get { return tipoRequisito; }
//            set
//            {
//                tipoRequisito = value;
//                PropertyChanged("TipoRequisito");
//            }
//        }

//        public string Observaciones
//        {
//            get { return observaciones; }
//            set
//            {
//                observaciones = value;
//                PropertyChanged("Observaciones");
//            }
//        }
//    }
//}
