//using System;
//using mKontrol = EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.SCV
//{
//    public class ClienteReferencia
//        : EK.Modelo.Kontrol.BaseKontrol, Interfaces.IClienteReferencia
//    {
//        private string apellidoMaterno;
//        private string apellidoPaterno;
//        private string celular;
//        private int idCliente;
//        private int idTipoReferencia;
//        private string nombre;
//        private string telefono;

//        public string ApellidoMaterno
//        {
//            get
//            {
//                return this.apellidoMaterno;
//            }

//            set
//            {
//                this.apellidoMaterno = value;
//            }
//        }

//        public string ApellidoPaterno
//        {
//            get
//            {
//                return this.apellidoPaterno;
//            }

//            set
//            {
//                this.apellidoPaterno = value;
//            }
//        }

//        public string Celular
//        {
//            get
//            {
//                return this.celular;
//            }

//            set
//            {
//                this.celular = value;
//            }
//        }

//        public int IdCliente
//        {
//            get
//            {
//                return this.idCliente;
//            }

//            set
//            {
//                this.idCliente = value;
//            }
//        }

//        public int IdTipoReferencia
//        {
//            get
//            {
//                return this.idTipoReferencia;
//            }

//            set
//            {
//                this.idTipoReferencia = value;
//            }
//        }

//        public string Nombre
//        {
//            get
//            {
//                return this.nombre;
//            }

//            set
//            {
//                this.nombre = value;
//            }
//        }

//        public string Telefono
//        {
//            get
//            {
//                return this.telefono;
//            }

//            set
//            {
//                this.telefono = value;
//            }
//        }

//        private mKontrol.IItemGeneral tipoReferencia;
//        public mKontrol.IItemGeneral TipoReferencia {
//            get {
//                return this.tipoReferencia;
//            }
//            set {
//                this.tipoReferencia = value;
//            }
//        }
//    }
//}
