//using System;
//using System.Collections.Generic;
//using EK.Modelo.SCV.Interfaces;
//using m = EK.Modelo.SCV;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class VentaFinanciamiento : mkontrol.BaseKontrol, m.Interfaces.IVentaFinanciamiento
//    {
//        private m.Interfaces.ITipoFinanciamiento financiamiento;
//        private List<m.Interfaces.IVentaFinanciamientoInstitucion> financiamientoInstituciones;

//        //private int versionVenta;
//        private int? idVentaVersion;
//        private m.Interfaces.IVentaVersion ventaVersion;

//       public List<m.Interfaces.IVentaFinanciamientoInstitucion> FinanciamientoInstituciones
//        {
//            get
//            {
//                return this.financiamientoInstituciones;
//            }
//            set
//            {
//                this.financiamientoInstituciones = value;
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

//        public ITipoFinanciamiento Financiamiento
//        {
//            get
//            {
//                return this.financiamiento;
//            }

//            set
//            {
//                this.financiamiento = value;
//            }
//        }
//    }
//}