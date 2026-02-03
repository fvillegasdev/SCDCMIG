//using System;
//using m = EK.Modelo.SCV;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class VentaPPDocumento
//          : mkontrol.BaseKontrolMM, m.Interfaces.IVentaPPDocumento
//    {
//        private int idConceptoPago;
//        private int idVenta;
//        private int numero;
//        private mkontrol.Interfaces.IItemGeneral tipoAbono;
//        private DateTime vencimiento;
//        private m.Interfaces.IVentaVersion ventaVersion;
//        private int? idVentaVersion;
//        //private int versionPP;

//        public int IdConceptoPago
//        {
//            get
//            {
//                return this.idConceptoPago;
//            }

//            set
//            {
//                this.IdConceptoPago = value;
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

//        public int Numero
//        {
//            get
//            {
//                return this.numero;
//            }

//            set
//            {
//                this.numero = value;
//            }
//        }

//        public mkontrol.Interfaces.IItemGeneral TipoAbono
//        {
//            get
//            {
//                return tipoAbono;
//            }

//            set
//            {
//                this.tipoAbono = value;
//            }
//        }

//        public DateTime Vencimiento
//        {
//            get
//            {
//                return this.vencimiento;
//            }

//            set
//            {
//                this.vencimiento = value;
//            }
//        }

//        //public decimal? Pagado
//        //{
//        //    get
//        //    {
//        //        return this.pagado;
//        //    }

//        //    set
//        //    {
//        //        this.pagado = value;
//        //    }
//        //}

//        //public int VersionPP
//        //{
//        //    get
//        //    {
//        //        return this.versionPP;
//        //    }

//        //    set
//        //    {
//        //        this.versionPP = value;
//        //    }
//        //}

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