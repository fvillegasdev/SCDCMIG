//using mkontrol = EK.Modelo.Kontrol;
//using m = EK.Modelo.SCV;
//using EK.Modelo.SCV.Interfaces;
//using System;

//namespace EK.Modelo.SCV
//{
//    public class VentaFinanciamientoInstitucion : mkontrol.BaseKontrol, m.Interfaces.IVentaFinanciamientoInstitucion
//    {
//        private int idVenta;
//        private string comentarios;
//        private int idVentaFinanciamiento;
//        private decimal montoCredito;
//        private m.Interfaces.IInstitucion institucion;
//        private int? idVentaVersion;
//        private m.Interfaces.IVentaVersion ventaVersion;

//        public int IdVenta
//        {
//            get
//            {
//                return this.idVenta;
//            }

//            set
//            {
//                this.idVenta = value;
//            }
//        }

//        public int IdVentaFinanciamiento
//        {
//            get
//            {
//                return this.idVentaFinanciamiento;
//            }
//            set
//            {
//                this.idVentaFinanciamiento = value;
//            }
//        }

//        public IInstitucion Institucion
//        {
//            get
//            {
//                return this.institucion;
//            }

//            set
//            {
//                this.institucion = value;
//            }
//        }

//        public string Comentarios
//        {
//            get
//            {
//                return this.comentarios;
//            }

//            set
//            {
//                this.comentarios = value;
//            }
//        }

//        public decimal MontoCredito
//        {
//            get
//            {
//                return this.montoCredito;
//            }

//            set
//            {
//                this.montoCredito = value;
//            }
//        }

//        public int? IdVentaVersion
//        {
//            get
//            {
//                return this.idVentaVersion;
//            }

//            set
//            {
//                this.idVentaVersion = value;
//            }
//        }

//        public IVentaVersion VentaVersion
//        {
//            get
//            {
//                return this.ventaVersion;
//            }

//            set
//            {
//                this.ventaVersion = value;
//            }
//        }
//    }
//}