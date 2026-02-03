//using System;
//using miSCV = EK.Modelo.SCV.Interfaces;
//using EK.Modelo.Kontrol.Interfaces;
//using mKontrol = EK.Modelo.Kontrol;
//using EK.Modelo.SCO.Interfaces;
//using System.Collections.Generic;

//namespace EK.Modelo.SCV
//{
//    public class Venta
//        : mKontrol.BaseKontrolMM, miSCV.IVenta
//    {
//        //    private IUsuario agente;
//        private miSCV.IPuntoVenta puntoventa;
//        private IItemGeneral gradointeres;
//        private miSCV.ICliente cliente;
//        private IItemGeneral estatusventa;
//        private miSCV.IDesarrollos desarrollo;
//        private miSCV.ICliente clienterecomienda;
//        private miSCV.IAgente agente;
//        private int? idAgente;
//        private int idPuntoVenta;
//        private int idGradoInteres;
//        private int? idClienteRecomienda;
//        private int idDesarrollo;
//        private int idEstatusVenta;
//        private int idExpediente;
//        private miSCV.IExpediente expediente;
//        private int versionVenta;
//        private int idCliente;
//        private miSCV.IVentaPP planPagos;
//        private List<miSCV.IVentaPPConcepto> conceptos;
//        private int idUbicacion;
//        private List<miSCV.IVentaUbicacion> ubicaciones;
//        private List<miSCV.ICaracteristicaAdicional> caracteristica;
//        private miSCV.IVentaEsquema esquema;


//        private int versionReestructura;
//        public miSCV.IVentaEsquema Esquema
//        { get {
//                return this.esquema;
//            }
//          set {
//                this.esquema = value;
//            }
//        }

//        public int IdPuntoVenta
//        {
//            get
//            {
//                return this.idPuntoVenta;
//            }

//            set
//            {
//                this.idPuntoVenta = value;
//            }
//        }

//        public int IdUbicacion
//        {
//            get
//            {
//                return this.idUbicacion;
//            }

//            set
//            {
//                this.idUbicacion = value;
//            }
//        }


//        public int IdGradoInteres
//        {
//            get
//            {
//                return this.idGradoInteres;
//            }

//            set
//            {
//                this.idGradoInteres = value;
//            }
//        }


//        public int IdEstatusVenta
//        {
//            get
//            {
//                return this.idEstatusVenta;
//            }

//            set
//            {
//                this.idEstatusVenta = value;
//            }
//        }

//        public miSCV.IVentaPP PlanPagos
//        {
//            get {
//                return this.planPagos;
//            }
//            set {
//                this.planPagos = value;
//            }
//        }

//        public List<miSCV.IVentaPPConcepto> Conceptos
//        {
//            get
//            {
//                return this.conceptos;
//            }

//            set
//            {
//                this.conceptos = value;
//            }
//        }

//        public miSCV.IAgente Agente {
//            get {
//                return this.agente;
//            }
//            set {
//                this.agente = value;
//            }
//        }

//      public miSCV.ICliente Cliente
//      {
//          get
//            {
//                return this.cliente;
//            }

//            set
//            {
//                this.cliente = value;
//            }
//        }

//        public miSCV.ICliente ClienteRecomienda
//        {
//            get
//            {
//               return this.clienterecomienda;
//            }

//            set
//            {
//                this.clienterecomienda = value;
//            }
//        }

//        public miSCV.IDesarrollos Desarrollo
//        {
//            get
//            {
//               return this.desarrollo;
//            }

//            set
//            {
//                this.desarrollo = value;
//            }
//        }

//        public IItemGeneral EstatusVenta
//        {
//            get
//            {
//                return this.estatusventa;
//            }

//            set
//            {
//                this.estatusventa = value;
//            }
//        }

//        public IItemGeneral GradoInteres
//        {
//            get
//            {
//                return this.gradointeres;
//            }

//            set
//            {
//                this.gradointeres = value;
//            }
//        }

//        public miSCV.IPuntoVenta PuntoVenta
//        {
//            get
//            {
//                return this.puntoventa;
//            }

//            set
//            {
//                this.puntoventa = value;
//            }
//        }

//        public int IdCliente
//        {
//            get
//            {
//               return this.idCliente;
//            }

//            set
//            {
//                this.idCliente = value;
//            }
//        }

//        public int IdDesarrollo
//        {
//            get
//            {
//                return this.idDesarrollo;
//            }

//            set
//            {
//                this.idDesarrollo = value;
//            }
//        }

//        public int? IdClienteRecomienda
//        {
//            get { return this.idClienteRecomienda; }
//            set { this.idClienteRecomienda = value; }
//        }

//        public int? IdAgente
//        {
//            get { return this.idAgente; }
//            set { this.idAgente = value; }
//        }

//        public List<miSCV.IVentaUbicacion> Ubicaciones
//        {
//            get
//            {
//                return this.ubicaciones;
//            }

//            set
//            {
//                this.ubicaciones = value;
//            }
//        }

//        public List<miSCV.ICaracteristicaAdicional> Caracteristica
//        {
//            get
//            {
//                return this.caracteristica;
//            }

//            set
//            {
//                this.caracteristica = value;
//            }
//        }

//        public int IdExpediente
//        {
//            get
//            {
//                return this.idExpediente;
//            }

//            set
//            {
//                this.idExpediente = value;
//            }
//        }

//        public miSCV.IExpediente Expediente
//        {
//            get
//            {
//                return this.expediente;
//            }
//            set
//            {
//                this.expediente = value;
//            }
//        }

//        public int VersionVenta
//        {
//            get
//            {
//                return this.versionVenta;
//            }

//            set
//            {
//                this.versionVenta = value;
//            }
//        }

//        public int VersionReestructura
//        {
//            get { return this.versionReestructura; }
//            set { this.versionReestructura = value;  }
//        }
//    }
//}
