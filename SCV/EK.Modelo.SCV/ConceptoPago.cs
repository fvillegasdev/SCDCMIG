//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using EK.Modelo.Kontrol.Interfaces;
//using EK.Modelo.SCV.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class ConceptoPago : mkontrol.BaseKontrol, IConceptoPago
//    {
//        int idTipoConceptoPago;
//        int? idTipoMovimiento_Capital;
//        int? idTipoMovimiento_Capital_Cancelacion;
//        int? idTipoMovimiento_Interes;
//        int? idTipoMovimiento_Interes_Cancelacion;
//        int? idTipoMovimiento_Moratorio;
//        int? idTipoMovimiento_PagoAnticipo;
//        IItemGeneral tipoConceptoPago;

//        public int IdTipoConceptoPago
//        {
//            get { return idTipoConceptoPago; }
//            set
//            {
//                idTipoConceptoPago = value;
//                base.PropertyChanged("IdTipoConceptoPago");
//            }
//        }

//        public int? IdTipoMovimiento_Capital
//        {
//            get { return idTipoMovimiento_Capital; }
//            set
//            {
//                idTipoMovimiento_Capital = value;
//                base.PropertyChanged("IdTipoMovimiento_Capital");
//            }
//        }

//        public int? IdTipoMovimiento_Capital_Cancelacion
//        {
//            get { return idTipoMovimiento_Capital_Cancelacion; }
//            set
//            {
//                idTipoMovimiento_Capital_Cancelacion = value;
//                base.PropertyChanged("IdTipoMovimiento_Capital_Cancelacion");
//            }
//        }

//        public int? IdTipoMovimiento_Interes
//        {
//            get { return idTipoMovimiento_Interes; }
//            set
//            {
//                idTipoMovimiento_Interes = value;
//                base.PropertyChanged("IdTipoMovimiento_Interes");
//            }
//        }

//        public int? IdTipoMovimiento_Interes_Cancelacion
//        {
//            get { return idTipoMovimiento_Interes_Cancelacion; }
//            set
//            {
//                idTipoMovimiento_Interes_Cancelacion = value;
//                base.PropertyChanged("IdTipoMovimiento_Interes_Cancelacion");
//            }
//        }

//        public int? IdTipoMovimiento_Moratorio
//        {
//            get { return idTipoMovimiento_Moratorio; }
//            set
//            {
//                idTipoMovimiento_Moratorio = value;
//                base.PropertyChanged("IdTipoMovimiento_Moratorio");
//            }
//        }

//        public int? IdTipoMovimiento_PagoAnticipo
//        {
//            get { return idTipoMovimiento_PagoAnticipo; }
//            set
//            {
//                idTipoMovimiento_PagoAnticipo = value;
//                base.PropertyChanged("IdTipoMovimiento_PagoAnticipo");
//            }
//        }

//        public IItemGeneral TipoConceptoPago
//        {
//            get { return tipoConceptoPago; }
//            set
//            {
//                tipoConceptoPago = value;
//                base.PropertyChanged("TipoConceptoPago");
//            }
//        }
//    }
//}
