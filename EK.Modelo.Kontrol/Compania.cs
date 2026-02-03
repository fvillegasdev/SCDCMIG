//using System;
//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.Kontrol
//{
//    public class Compania
//        : BaseUsuario, IBaseKontrol, ICompania
//    {
//        private int? idCliente;
//        private ICliente cliente;
//        private string clave;
//        private string domicilio;
//        private int? idLocalidad;
//        private ILocalidad localidad;
//        private int? idMonedaBase;
//        private int? idTimeZone;
//        private IMoneda monedaBase;
//        private IItemGeneral timeZone;
//        private string rfc;
//        int aplicaVivienda;

//        public Compania()
//            : base()
//        {
//        }

//        public string Clave
//        {
//            get
//            {
//                return this.clave;
//            }

//            set
//            {
//                this.clave = value;
//                base.PropertyChanged("Clave");
//            }
//        }

//        public string Domicilio
//        {
//            get
//            {
//                return this.domicilio;
//            }

//            set
//            {
//                this.domicilio = value;
//                base.PropertyChanged("Domicilio");
//            }
//        }

//        public int? IdMonedaBase {
//            get {
//                return this.idMonedaBase;
//            }
//            set {
//                this.idMonedaBase = value;
//            }
//        }

//        public int? IdTimeZone
//        {
//            get
//            {
//                return this.idTimeZone;
//            }
//            set
//            {
//                this.idTimeZone = value;
//            }
//        }

//        public IMoneda MonedaBase {
//            get {
//                return this.monedaBase;
//            }
//            set {
//                this.monedaBase = value;
//            }
//        }

//        public IItemGeneral TimeZone
//        {
//            get
//            {
//                return this.timeZone;
//            }
//            set
//            {
//                this.timeZone = value;
//            }
//        }

//        public int? IdCliente
//        {
//            get
//            {
//                return this.idCliente;
//            }

//            set
//            {
//                this.idCliente = value;
//                base.PropertyChanged("IdCliente");
//            }
//        }

//        public ICliente Cliente
//        {
//            get
//            {
//                return this.cliente;
//            }

//            set
//            {
//                this.cliente = value;

//                if (this.cliente != null)
//                {
//                    this.IdCliente = this.cliente.ID;
//                }

//                base.PropertyChanged("Cliente");
//            }
//        }

//        public int? IdLocalidad
//        {
//            get
//            {
//                return this.idLocalidad;
//            }

//            set
//            {
//                this.idLocalidad = value;
//                base.PropertyChanged("IdLocalidad");
//            }
//        }

//        public ILocalidad Localidad
//        {
//            get
//            {
//                return this.localidad;
//            }

//            set
//            {
//                this.localidad = value;

//                if (this.localidad != null)
//                {
//                    this.idLocalidad = this.localidad.ID;
//                }

//                base.PropertyChanged("Localidad");
//            }
//        }

//        public string Rfc
//        {
//            get
//            {
//                return this.rfc;
//            }

//            set
//            {
//                this.rfc = value;
//                base.PropertyChanged("Rfc");
//            }
//        }
//        private string idClienteNombre;

//        public string IdClienteNombre
//        {
//            get { return idClienteNombre; }
//            set { idClienteNombre = value; }
//        }

//        public int AplicaVivienda
//        {
//            get
//            {
//                return this.aplicaVivienda;
//            }

//            set
//            {
//                this.aplicaVivienda = value;
//                base.PropertyChanged("AplicaVivienda");
//            }
//        }
//    }
//}
