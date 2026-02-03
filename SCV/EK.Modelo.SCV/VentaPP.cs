//using System.Collections.Generic;

//using m = EK.Modelo.SCV;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class VentaPP
//        : mkontrol.BaseKontrol, m.Interfaces.IVentaPP
//    {
//        private string descripcion;
//        private List<m.Interfaces.IVentaPPConcepto> conceptos;
//        private int idPlanVenta;
//        private int versionPP;
//        private int idExpediente;
//        private int idVenta;
//        private m.Interfaces.IVentaVersion ventaVersion;
//        private int? idVentaVersion;

//        public string Descripcion
//        {
//            get { return this.descripcion; }
//            set
//            {
//                this.descripcion = value;
//            }
//        }

//        public List<m.Interfaces.IVentaPPConcepto> Conceptos
//        {
//            get { return this.conceptos; }
//            set
//            {
//                this.conceptos = value;
//            }
//        }

//        public int IdExpediente
//        {
//            get
//            {
//                return idExpediente;
//            }

//            set
//            {
//                this.idExpediente = value;
//            }
//        }
//        public int IdVenta
//        {
//            get
//            {
//                return idVenta;
//            }

//            set
//            {
//                this.idVenta = value;
//            }
//        }

//        public int IdPlanVenta
//        {
//            get
//            {
//                return idPlanVenta;
//            }

//            set
//            {
//                this.idPlanVenta = value;
//            }
//        }

//        public int VersionPP
//        {
//            get { return versionPP; }
//            set { this.versionPP = value; }
//        }

//        public int? IdVentaVersion
//        {
//            get { return idVentaVersion; }
//            set { this.idVentaVersion = value; }
//        }

//        public m.Interfaces.IVentaVersion VentaVersion
//        {
//            get { return ventaVersion; }
//            set { this.ventaVersion = value; }
//        }
//    }
//}