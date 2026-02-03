//using System;
//using System.Collections.Generic;
//using m = EK.Modelo.SCV;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class VentaUbicacion
//        : mkontrol.BaseKontrolMM, m.Interfaces.IVentaUbicacion
//    {
//        private m.Interfaces.IUbicaciones ubicacion;
//        private int idVenta;
//        private int versionVenta;
//        private decimal importeComisionable;
//        private List<m.Interfaces.IVentaCaracteristica> caracteristicas;
//        private int? idVentaVersion;
//        private m.Interfaces.IVentaVersion ventaVersion;
//        private List<mkontrol.Interfaces.IKontrolFile> archivos;
//        private decimal? importeUbicacion;
//        private int? idListaPreciosVersion;

//        public m.Interfaces.IUbicaciones Ubicacion
//        {
//            get { return ubicacion; }
//            set
//            {
//                ubicacion = value;

//            }
//        }

//        public int IdVenta
//        {
//            get
//            {
//                { return idVenta; }
//            }

//            set
//            {
//                idVenta = value;
//            }
//        }

//        public List<m.Interfaces.IVentaCaracteristica> Caracteristicas
//        {
//            get
//            {
//                return caracteristicas;
//            }

//            set
//            {
//                caracteristicas = value;
//            }
//        }

//        public int VersionVenta
//        {
//            get { return this.versionVenta; }
//            set { this.versionVenta = value; }
//        }


//        public decimal ImporteComisionable
//        {
//            get { return this.importeComisionable; }
//            set { this.importeComisionable = value; }
//        }

//        public int? IdVentaVersion
//        {
//            get { return this.idVentaVersion; }
//            set { this.idVentaVersion = value; }
//        }

//        public m.Interfaces.IVentaVersion VentaVersion
//        {
//            get { return this.ventaVersion; }
//            set { this.ventaVersion = value; }
//        }

//        public List<mkontrol.Interfaces.IKontrolFile> Archivos
//        {
//            get { return this.archivos; }
//            set { this.archivos = value; }
//        }

//        public decimal? ImporteUbicacion
//        {
//            get { return this.importeUbicacion; }
//            set { this.importeUbicacion = value; }
//        }
//        public int? IdListaPreciosVersion
//        {
//            get { return this.idListaPreciosVersion; }
//            set { this.idListaPreciosVersion = value; }
//        }
//    }
//}