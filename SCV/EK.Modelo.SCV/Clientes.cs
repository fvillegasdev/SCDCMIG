//using System;
//using System.Collections.Generic;

//using EK.Modelo.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;
//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.SCV
//{
//    public class Cliente 
//        : mkontrol.BaseKontrol, Interfaces.ICliente
//    {
//        private string nombre;
//        public string Nombre
//        {
//            get { return this.nombre; }
//            set
//            {
//                this.nombre = value;
//                base.PropertyChanged("Nombre");
//            }
//        }
//        private string apellidoPaterno;
//        public string ApellidoPaterno
//        {
//            get { return this.apellidoPaterno; }
//            set
//            {
//                this.apellidoPaterno = value;
//                base.PropertyChanged("APaterno");
//            }
//        }
//        private string apellidoMaterno;
//        public string ApellidoMaterno
//        {
//            get { return this.apellidoMaterno; }
//            set
//            {
//                this.apellidoMaterno = value;
//                base.PropertyChanged("AMaterno");
//            }
//        }
//        private DateTime fechaNacimiento;
//        public DateTime FechaNacimiento
//        {
//            get { return this.fechaNacimiento; }
//            set
//            {
//                this.fechaNacimiento = value;
//                base.PropertyChanged("FechaNacimiento");
//            }
//        }
//        private string rfc;
//        public string RFC
//        {
//            get { return this.rfc; }
//            set
//            {
//                this.rfc = value;
//                base.PropertyChanged("RFC");
//            }
//        }
//        private string nss;
//        public string NSS
//        {
//            get { return this.nss; }
//            set
//            {
//                this.nss = value;
//                base.PropertyChanged("NSS");
//            }
//        }
//        private string curp;
//        public string CURP
//        {
//            get { return this.curp; }
//            set
//            {
//                this.curp = value;
//                base.PropertyChanged("CURP");
//            }
//        }
//        private string domicilio;
//        public string Domicilio
//        {
//            get { return this.domicilio; }
//            set
//            {
//                this.domicilio = value;
//                base.PropertyChanged("domicilio");
//            }
//        }
//        private string codigopostal;
//        public string CodigoPostal
//        {
//            get { return this.codigopostal; }
//            set
//            {
//                this.codigopostal = value;
//                base.PropertyChanged("CodigoPostal");
//            }
//        }
//        private int antiguedadDomicilio;
//        public int AntiguedadDomicilio
//        {
//            get { return this.antiguedadDomicilio; }
//            set
//            {
//                this.antiguedadDomicilio = value;
//                base.PropertyChanged("AntiguedadDomicilio");
//            }
//        }
//        private string email;
//        public string Email
//        {
//            get { return this.email; }
//            set
//            {
//                this.email = value;
//                base.PropertyChanged("Email");
//            }
//        }
//        private miKontrol.IItemGeneral genero;

//        public miKontrol.IItemGeneral Genero
//        {
//            get { return this.genero; }
//            set
//            {
//                this.genero = value;
//                base.PropertyChanged("Genero");
//            }
//        }
//        private string telefono;
//        public string Telefono
//        {
//            get { return this.telefono; }
//            set
//            {
//                this.telefono = value;
//                base.PropertyChanged("Telefono");
//            }
//        }
//        private string celular;
//        public string Celular
//        {
//            get { return this.celular; }
//            set
//            {
//                this.celular = value;
//                base.PropertyChanged("Celular");
//            }
//        }

//        private miKontrol.IItemGeneral estadoCivil;
//        public miKontrol.IItemGeneral EstadoCivil
//        {
//            get { return this.estadoCivil; }
//            set
//            {
//                this.estadoCivil = value;
//                base.PropertyChanged("EstadoCivil");
//            }
//        }
//        private miKontrol.IItemGeneral regimenConyugal;
//        public miKontrol.IItemGeneral RegimenConyugal
//        {
//            get { return this.regimenConyugal; }
//            set
//            {
//                this.regimenConyugal = value;
//                base.PropertyChanged("RegimenConyugal");
//            }
//        }
//        private miKontrol.IItemGeneral nacionalidad;
//        public miKontrol.IItemGeneral Nacionalidad
//        {
//            get { return this.nacionalidad; }
//            set
//            {
//                this.nacionalidad = value;
//                base.PropertyChanged("Nacionalidad");
//            }

//        }

//        private IAsentamiento asentamiento;
//        public miKontrol.IAsentamiento Asentamiento {
//            get { return this.asentamiento; }
//            set
//            {
//                this.asentamiento = value;
//            }
//        }

//        private IRangoIngresos rangoIngresos;
//        public IRangoIngresos RangoIngresos {
//            get { return this.rangoIngresos; }
//            set
//            {
//                this.rangoIngresos = value;
//                base.PropertyChanged("RangoIngresos");
//            }
//        }

//        private IClienteAdicional informacionAdicional;
//        public IClienteAdicional InformacionAdicional {

//            get { return this.informacionAdicional; }
//            set
//            {
//                this.informacionAdicional = value;
//                base.PropertyChanged("Adicional");
//            }
//        }

//        private List<IClienteReferencia> referencias;
//        public List<IClienteReferencia> Referencias {
//            get {
//                return this.referencias;
//            }
//            set {
//                this.referencias = value;
//            }
//        }

//        private List<IClienteRefLaboral> refLaborales;
//        public List<IClienteRefLaboral> RefLaborales {
//            get {
//                return this.refLaborales;
//            }

//            set {
//                this.refLaborales = value;
//            }
//        }

//        private int? idAsentamiento;
//        public int? IdAsentamiento
//        {
//            get
//            {
//                return this.idAsentamiento;
//            }
//            set
//            {
//                this.idAsentamiento = value;
//            }
//        }

//        private int? idEstadoCivil;
//        public int? IdEstadoCivil
//        {
//            get
//            {
//                return this.idEstadoCivil;
//            }
//            set
//            {
//                this.idEstadoCivil = value;
//            }
//        }

//        private int? idRegimenConyugal;
//        public int? IdRegimenConyugal
//        {
//            get
//            {
//                return this.idRegimenConyugal;
//            }
//            set
//            {
//                this.idRegimenConyugal = value;
//            }
//        }

//        private int? idNacionalidad;
//        public int? IdNacionalidad
//        {
//            get
//            {
//                return this.idNacionalidad;
//            }
//            set
//            {
//                this.idNacionalidad = value;
//            }
//        }

//        private int? idRangoIngresos;
//        public int? IdRangoIngresos
//        {
//            get
//            {
//                return this.idRangoIngresos;
//            }
//            set
//            {
//                this.idRangoIngresos = value;
//            }
//        }

//        private int? idGenero;
//        public int? IdGenero
//        {
//            get
//            {
//                return this.idGenero;
//            }
//            set
//            {
//                this.idGenero = value;
//            }
//        }
//    }
//}
