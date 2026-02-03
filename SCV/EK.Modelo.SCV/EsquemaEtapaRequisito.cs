//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using m = EK.Modelo.SCV;
//using mk = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class EsquemaEtapaRequisito
//        : mk.BaseKontrol, m.Interfaces.IEsquemaEtapaRequisito
//    {
//        private int idEsquema;
//        private int idEtapa;
//        private int idRequisito;
//        private int? plazoDias;
//        private bool obligatorio;
//        private m.Interfaces.IEtapa etapa;
//        private m.Interfaces.IRequisito requisito;

//        public int IdEsquema
//        {
//            get { return idEsquema; }
//            set
//            {
//                idEsquema = value;
//                base.PropertyChanged("IdEsquema");
//            }
//        }

//        public int IdEtapa
//        {
//            get { return idEtapa; }
//            set
//            {
//                idEtapa = value;
//                base.PropertyChanged("IdEtapa");
//            }
//        }

//        public m.Interfaces.IEtapa Etapa
//        {
//            get { return etapa; }
//            set
//            {
//                etapa = value;
//                base.PropertyChanged("Etapa");
//            }
//        }

//        public bool Obligatorio
//        {
//            get { return obligatorio; }
//            set
//            {
//                obligatorio = value;
//                base.PropertyChanged("Obligatorio");
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

//        public m.Interfaces.IRequisito Requisito
//        {
//            get { return requisito; }
//            set
//            {
//                requisito = value;
//                base.PropertyChanged("Requisito");
//            }
//        }

//        public int? PlazoDias
//        {
//            get { return plazoDias; }
//            set
//            {
//                plazoDias = value;
//                base.PropertyChanged("PlazoDias");
//            }
//        }
//    }
//}