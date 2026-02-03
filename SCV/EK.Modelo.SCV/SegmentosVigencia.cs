//using EK.Modelo.SCV.Interfaces;
//using System;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class SegmentoVigencia : mkontrol.BaseKontrol, ISegmentoVigencia
//    {
//        private int idSegmento;

//        public int IdSegmento
//        {
//            get { return idSegmento; }
//            set
//            {
//                idSegmento = value;
//                base.PropertyChanged("IdSegmento");
//            }
//        }

//        private ISegmento segmento;

//        public ISegmento Segmento
//        {
//            get { return segmento; }
//            set
//            {
//                segmento = value;
//                base.PropertyChanged("Segmento");
//            }
//        }

//        private DateTime vigencia;

//        public DateTime Vigencia
//        {
//            get { return vigencia; }
//            set
//            {
//                vigencia = value;
//                base.PropertyChanged("Vigencia");
//            }
//        }

//        private decimal precioInicial;

//        public decimal PrecioInicial
//        {
//            get { return precioInicial; }
//            set
//            {
//                precioInicial = value;
//                base.PropertyChanged("PrecioInicial");
//            }
//        }

//        private decimal precioFinal;

//        public decimal PrecioFinal
//        {
//            get { return precioFinal; }
//            set
//            {
//                precioFinal = value;
//                base.PropertyChanged("PrecioFinal");
//            }
//        }
//    }
//}