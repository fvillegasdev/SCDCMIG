//using System.Collections.Generic;
//using m = EK.Modelo.SCV;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class VentaEsquema : mkontrol.BaseKontrol, m.Interfaces.IVentaEsquema
//    {
//        private m.Interfaces.IEsquema esquema;
//        private m.Interfaces.ITipoFinanciamiento tipoFinanciamiento;
//        private List<m.Interfaces.IVentaCredito> creditos;

//        //private int versionVenta;
//        private int? idVentaVersion;
//        private m.Interfaces.IVentaVersion ventaVersion;

//        public m.Interfaces.IEsquema Esquema
//        {
//            get
//            {
//                return this.esquema;
//            }

//            set
//            {
//                this.esquema = value;
//            }
//        }

//        public m.Interfaces.ITipoFinanciamiento TipoFinanciamiento
//        {
//            get
//            {
//                return this.tipoFinanciamiento;
//            }

//            set
//            {
//                this.tipoFinanciamiento = value;
//            }
//        }

//        public List<m.Interfaces.IVentaCredito> Creditos
//        {
//            get
//            {
//                return this.creditos;
//            }
//            set
//            {
//                this.creditos = value;
//            }
//        }

//        //public int VersionVenta
//        //{
//        //    get { return this.versionVenta; }
//        //    set { this.versionVenta = value; }
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