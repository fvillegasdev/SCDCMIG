//using System.Collections.Generic;
//using m = EK.Modelo.SCV;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class VentaPPConcepto
//        : mkontrol.BaseKontrolMM, m.Interfaces.IVentaPPConcepto
//    {
//        private int idVenta;
//        private m.Interfaces.IConceptoPago conceptoPago;
//        private mkontrol.Interfaces.IItemGeneral frecuenciaPago;
//        private bool modificable;
//        private int? numeroPagos;
//        private int? numeroPlazoPrimerPago;
//        private mkontrol.Interfaces.IItemGeneral periodoPrimerPago;
//        private decimal? porcentaje;
//        private decimal? porcentajeTIF;
//        private decimal? porcentajeTIM;
//        private List<mkontrol.Interfaces.IDocumentoPago> documentos;
//        private List<mkontrol.Interfaces.IAbono> abonos;
//        private int versionPP;
//        private int? idVentaVersion;
//        private m.Interfaces.IVentaVersion ventaVersion;

//        public m.Interfaces.IConceptoPago ConceptoPago
//        {
//            get { return this.conceptoPago; }
//            set
//            {
//                this.conceptoPago = value;
//            }
//        }

//        public List<mkontrol.Interfaces.IDocumentoPago> Documentos
//        {
//            get
//            {
//                return this.documentos;
//            }

//            set
//            {
//                this.documentos = value;
//            }
//        }

//        public List<mkontrol.Interfaces.IAbono> Abonos
//        {
//            get
//            {
//                return this.abonos;
//            }

//            set
//            {
//                this.abonos = value;
//            }
//        }

//        public mkontrol.Interfaces.IItemGeneral FrecuenciaPago
//        {
//            get { return this.frecuenciaPago; }
//            set
//            {
//                this.frecuenciaPago = value;
//            }
//        }

//        public bool Modificable
//        {
//            get { return this.modificable; }
//            set
//            {
//                this.modificable = value;
//            }
//        }

//        public int? NumeroPagos
//        {
//            get { return this.numeroPagos; }
//            set
//            {
//                this.numeroPagos = value;
//            }
//        }

//        public int? NumeroPlazoPrimerPago
//        {
//            get { return this.numeroPlazoPrimerPago; }
//            set
//            {
//                this.numeroPlazoPrimerPago = value;
//            }
//        }

//        public mkontrol.Interfaces.IItemGeneral PeriodoPrimerPago
//        {
//            get { return this.periodoPrimerPago; }
//            set
//            {
//                this.periodoPrimerPago = value;
//            }
//        }

//        public decimal? Porcentaje
//        {
//            get { return this.porcentaje; }
//            set
//            {
//                this.porcentaje = value;
//            }
//        }

//        public decimal? PorcentajeTIF
//        {
//            get { return this.porcentajeTIF; }
//            set
//            {
//                this.porcentajeTIF = value;
//            }
//        }

//        public decimal? PorcentajeTIM
//        {
//            get { return this.porcentajeTIM; }
//            set
//            {
//                this.porcentajeTIM = value;
//            }
//        }

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

//        public int VersionPP
//        {
//            get
//            {
//                return this.versionPP;
//            }

//            set
//            {
//                this.versionPP = value;
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

//        public m.Interfaces.IVentaVersion VentaVersion
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