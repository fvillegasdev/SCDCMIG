//using mkontrol = EK.Modelo.Kontrol;
//using m = EK.Modelo.SCV;

//namespace EK.Modelo.SCV
//{
//    public class VentaCredito : mkontrol.BaseKontrol, m.Interfaces.IVentaCredito
//    {
//        private int idVenta;
//        private string comentarios;
//        private int idVentaEsquema;
//        private decimal montoCredito;
//        private m.Interfaces.IInstitucion institucion;
//        private int? idVentaVersion;
//        private m.Interfaces.IVentaVersion ventaVersion;

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

//        public int IdVentaEsquema
//        {
//            get
//            {
//                return this.idVentaEsquema;
//            }

//            set
//            {
//                this.idVentaEsquema = value;
//            }
//        }

//        public m.Interfaces.IInstitucion Institucion
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