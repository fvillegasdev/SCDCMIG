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
//    public class PlanPagosConceptoPago : mkontrol.BaseKontrol, IPlanPagosConceptoPago
//    {
//        IConceptoPago conceptoPago;
//        IItemGeneral frecuenciaPago;
//        decimal? importe;
//        bool modificable;
//        int? numeroPagos;
//        int? numeroPlazoPrimerPago;
//        IItemGeneral periodoPrimerPago;
//        decimal? porcentaje;
//        decimal? porcentajeTIF;
//        decimal? porcentajeTIM;

//        public IConceptoPago ConceptoPago
//        {
//            get { return conceptoPago; }
//            set
//            {
//                conceptoPago = value;
//                base.PropertyChanged("ConceptoPago");
//            }
//        }

//        public IItemGeneral FrecuenciaPago
//        {
//            get { return frecuenciaPago; }
//            set
//            {
//                frecuenciaPago = value;
//                base.PropertyChanged("FrecuenciaPago");
//            }
//        }

//        public decimal? Importe
//        {
//            get { return importe; }
//            set
//            {
//                importe = value;
//                base.PropertyChanged("Importe");
//            }
//        }

//        public bool Modificable
//        {
//            get { return modificable; }
//            set
//            {
//                modificable = value;
//                base.PropertyChanged("Modificable");
//            }
//        }

//        public int? NumeroPagos
//        {
//            get { return numeroPagos; }
//            set
//            {
//                numeroPagos = value;
//                base.PropertyChanged("NumeroPagos");
//            }
//        }

//        public int? NumeroPlazoPrimerPago
//        {
//            get { return numeroPlazoPrimerPago; }
//            set
//            {
//                numeroPlazoPrimerPago = value;
//                base.PropertyChanged("NumeroPlazoPrimerPago");
//            }
//        }

//        public IItemGeneral PeriodoPrimerPago
//        {
//            get { return periodoPrimerPago; }
//            set
//            {
//                periodoPrimerPago = value;
//                base.PropertyChanged("PeriodoPrimerPago");
//            }
//        }

//        public decimal? Porcentaje
//        {
//            get { return porcentaje; }
//            set
//            {
//                porcentaje = value;
//                base.PropertyChanged("Porcentaje");
//            }
//        }

//        public decimal? PorcentajeTIF
//        {
//            get { return porcentajeTIF; }
//            set
//            {
//                porcentajeTIF = value;
//                base.PropertyChanged("PorcentajeTIF");
//            }
//        }

//        public decimal? PorcentajeTIM
//        {
//            get { return porcentajeTIM; }
//            set
//            {
//                porcentajeTIM = value;
//                base.PropertyChanged("PorcentajeTIM");
//            }
//        }
//    }
//}
