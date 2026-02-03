//using EK.Modelo.Kontrol.Interfaces;
//using System;

//namespace EK.Modelo.Kontrol
//{
//    public class Usuario
//        : BaseKontrol, IUsuario
//    {
//        private string nombre;
//        private ICliente cliente;
//        private bool bloqueado;
//        private bool interno;
//        private IPosicion posicion;
//        private IItemGeneral timeZone;
//        private IItemGeneral idioma;
//        private int idCliente;
//        private int? idPosicion;
//        private int idTimeZone;
//        private int idIdioma;


//        public Usuario()
//            : base()
//        {
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
//                base.PropertyChanged("Nombre");
//            }
//        }

//        private string _Email = string.Empty;

//        public string Email
//        {
//            get
//            {
//                return this._Email;
//            }

//            set
//            {
//                this._Email = value;
//                base.PropertyChanged("Email");
//            }
//        }

//        private string _Telefono = string.Empty;

//        public string Telefono
//        {
//            get
//            {
//                return this._Telefono;
//            }

//            set
//            {
//                this._Telefono = value;
//                base.PropertyChanged("Telefono");
//            }
//        }

//        private DateTime? _vigenciaFin;

//        public DateTime? VigenciaFin
//        {
//            get
//            {
//                return this._vigenciaFin;
//            }

//            set
//            {
//                this._vigenciaFin = value;
//                base.PropertyChanged("VigenciaFin");
//            }
//        }

//        private DateTime? _vigenciaInicio;

//        public DateTime? VigenciaInicio
//        {
//            get
//            {
//                return this._vigenciaInicio;
//            }

//            set
//            {
//                this._vigenciaInicio = value;
//                base.PropertyChanged("VigenciaInicio");
//            }
//        }

//        private string _UUID = string.Empty;

//        public string UUID
//        {
//            get
//            {
//                return this._UUID;
//            }

//            set
//            {
//                this._UUID = value;
//                base.PropertyChanged("UUID");
//            }
//        }

//        private string _Foto = string.Empty;

//        public string Foto
//        {
//            get
//            {
//                return this._Foto;
//            }

//            set
//            {
//                this._Foto = value;
//                base.PropertyChanged("Foto");
//            }
//        }

//        public bool Bloqueado
//        {
//            get
//            {
//                return this.bloqueado;
//            }

//            set
//            {
//                this.bloqueado = value;
//                base.PropertyChanged("Bloqueado");
//            }
//        }

//        public bool Interno
//        {
//            get
//            {
//                return this.interno;
//            }

//            set
//            {
//                this.interno = value;
//                base.PropertyChanged("Interno");
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
//            }
//        }

//        public IPosicion Posicion
//        {
//            get
//            {
//                return this.posicion;
//            }
//            set
//            {
//                this.posicion = value;
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

//        public IItemGeneral Idioma
//        {
//            get
//            {
//                return this.idioma;
//            }
//            set
//            {
//                this.idioma = value;
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

//        public int? IdPosicion
//        {
//            get
//            {
//                return this.idPosicion;
//            }
//            set
//            {
//                this.idPosicion = value;
//            }
//        }

//        public int IdTimeZone
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

//        public int IdIdioma
//        {
//            get
//            {
//                return this.idIdioma;
//            }
//            set
//            {
//                this.idIdioma = value;
//            }
//        }

//        private string apellidos;

//        public string Apellidos
//        {
//            get { return apellidos; }
//            set { apellidos = value; }
//        }

//        public ICatalogoClasificador Clasificadores { get; set; }

//    }
//}