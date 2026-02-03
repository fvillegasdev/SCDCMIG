//using m = EK.Modelo.SCV;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class VentaCaracteristica : mkontrol.BaseKontrol, m.Interfaces.IVentaCaracteristica
//    {
//        private m.Interfaces.ICaracteristicaAdicional caracteristica;
//        private int? idEntidadCaracteristica;
//        private int? idTipoEntidad;
//        private decimal importe;
//        private mkontrol.Interfaces.IItemGeneral tipoEntidad;
//        private bool ventaOpcional;
//        private int? idVenta;
//        private int? idVentaUbicacion;
//        private int? idEntidad;
//        private int? idCaracteristica;
//        private m.Interfaces.IVentaVersion ventaVersion;
//        private int? idVentaVersion;

//        public m.Interfaces.ICaracteristicaAdicional Caracteristica
//        {
//            get
//            {
//                return caracteristica;
//            }

//            set
//            {
//                caracteristica = value;
//            }
//        }

//        public int? IdCaracteristica
//        {
//            get
//            {
//                return idCaracteristica;
//            }

//            set
//            {
//                idCaracteristica = value;
//            }
//        }

//        public int? IdEntidad
//        {
//            get
//            {
//                return idEntidad;
//            }

//            set
//            {
//                idEntidad = value;
//            }
//        }

//        public int? IdEntidadCaracteristica
//        {
//            get
//            {
//                return idEntidadCaracteristica;
//            }

//            set
//            {
//                idEntidadCaracteristica = value;
//            }
//        }

//        public int? IdTipoEntidad
//        {
//            get
//            {
//                return idTipoEntidad;
//            }

//            set
//            {
//                idTipoEntidad = value;
//            }
//        }

//        public int? IdVenta
//        {
//            get
//            {
//                return idVenta;
//            }

//            set
//            {
//                idVenta = value;
//            }
//        }

//        public int? IdVentaUbicacion
//        {
//            get
//            {
//                return idVentaUbicacion;
//            }

//            set
//            {
//                idVentaUbicacion = value;
//            }
//        }

//        public decimal Importe
//        {
//            get
//            {
//                return importe;
//            }

//            set
//            {
//                importe = value;
//            }
//        }

//        public mkontrol.Interfaces.IItemGeneral TipoEntidad
//        {
//            get
//            {
//                return tipoEntidad;
//            }

//            set
//            {
//                tipoEntidad = value;
//            }
//        }

//        public bool VentaOpcional
//        {
//            get
//            {
//                return ventaOpcional;
//            }

//            set
//            {
//                ventaOpcional = value;
//            }
//        }

//        public m.Interfaces.IVentaVersion VentaVersion
//        {
//            get
//            {
//                return ventaVersion;
//            }

//            set
//            {
//                ventaVersion = value;
//            }
//        }

//        public int? IdVentaVersion
//        {
//            get
//            {
//                return idVentaVersion;
//            }

//            set
//            {
//                idVentaVersion = value;
//            }
//        }
//    }
//}