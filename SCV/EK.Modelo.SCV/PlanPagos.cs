//using System;
//using System.Collections.Generic;

//using EK.Modelo.Kontrol.Interfaces;
//using EK.Modelo.SCV.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class PlanPagos 
//        : mkontrol.BaseKontrol, IPlanPagos
//    {
//        string clave;
//        string descripcion;
//        IItemGeneral moneda;
//        DateTime vigenciaInicio;
//        DateTime vigenciaFin;
//        List<IPlanPagosConceptoPago> conceptosPago;

//        public string Clave
//        {
//            get { return clave; }
//            set
//            {
//                clave = value;
//                base.PropertyChanged("Clave");
//            }
//        }

//        public string Descripcion
//        {
//            get { return descripcion; }
//            set
//            {
//                descripcion = value;
//                base.PropertyChanged("Descripcion");
//            }
//        }

//        public IItemGeneral Moneda
//        {
//            get { return moneda; }
//            set
//            {
//                moneda = value;
//                base.PropertyChanged("Moneda");
//            }
//        }

//        public DateTime VigenciaFin
//        {
//            get { return vigenciaFin; }
//            set
//            {
//                vigenciaFin = value;
//                base.PropertyChanged("VigenciaFin");
//            }
//        }

//        public DateTime VigenciaInicio
//        {
//            get { return vigenciaInicio; }
//            set
//            {
//                vigenciaInicio = value;
//                base.PropertyChanged("VigenciaInicio");
//            }
//        }

//        public List<IPlanPagosConceptoPago> ConceptosPago
//        {
//            get { return conceptosPago; }
//            set
//            {
//                conceptosPago = value;
//                base.PropertyChanged("ConceptosPago");
//            }
//        }
//    }
//}
