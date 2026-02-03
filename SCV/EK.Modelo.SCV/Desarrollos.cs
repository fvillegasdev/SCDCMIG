//using System;
//using EK.Modelo.SCV.Interfaces;
//using EK.Modelo.Kontrol.Interfaces;
//using mKontrol = EK.Modelo.Kontrol;
//using EK.Modelo.SCO.Interfaces;
//using System.Collections.Generic;
//using EK.Modelo.SBO.Interfaces;

//namespace EK.Modelo.SCV
//{
//    public class Desarrollos 
//        : mKontrol.BaseKontrolCompania, IDesarrollo
//    {
//        private string clave;
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

//        private string descripcion;
//        public string Descripcion
//        {
//            get
//            {
//                return this.descripcion;
//            }

//            set
//            {
//                this.descripcion = value;
//                base.PropertyChanged("Descripcion");
//            }
//        }

//        private int _id;
//        public int Id
//        {
//            get
//            {
//                return this._id;
//            }

//            set
//            {
//                this._id = value;
//                base.PropertyChanged("Id");
//            }
//        }

//        private int idCentroCosto;
//        public int IdCentroCosto
//        {
//            get
//            {
//                return this.idCentroCosto;
//            }

//            set
//            {
//                this.idCentroCosto = value;
//              //  base.PropertyChanged("IdCentroCosto");
//            }
//        }

//        private ICentroCosto centroCosto;
//        public ICentroCosto CentroCosto
//        {
//            get
//            {
//                return this.centroCosto;
//           }

//            set
//            {
//                this.centroCosto = value;
//                base.PropertyChanged("CentroCosto");
//            }
//        }

//        private string direccion;
//        public string Direccion
//        {
//            get
//            {
//                return this.direccion;
//            }

//            set
//            {
//                this.direccion = value;
//                base.PropertyChanged("Direccion");
//            }
//        }

//        private string codigoPostal;
//        public string CodigoPostal
//        {
//            get
//            {
//               return this.codigoPostal;
//            }

//            set
//            {
//                this.codigoPostal = value;
//                base.PropertyChanged("CodigoPostal");
//            }
//        }

//        private ILocalidad localidad;
//        public ILocalidad Localidad
//        {
//            get
//            {
//                return this.localidad;
//            }

//            set
//            {
//                this.localidad = value;
//                base.PropertyChanged("Localidad");
//            }
//        }

//        private int? idNotario;
//        public int? IdNotario
//        {
//            get
//            {
//                return this.idNotario;
//            }

//            set
//            {
//                this.idNotario = value;
//                base.PropertyChanged("IdNotario");
//            }
//        }

//        private IItemGeneralValores moneda;
//        public IItemGeneralValores Moneda
//        {
//            get
//            {
//                return this.moneda;
//            }

//            set
//            {
//                this.moneda = value;
//                base.PropertyChanged("Moneda");
//            }
//        }

//        private string nombreRep;
//        public string NombreRep
//        {
//            get
//            {
//                return this.nombreRep;
//            }

//            set
//            {
//                this.nombreRep = value;
//                base.PropertyChanged("NombreRep");
//            }
//        }

//        //private string ladaRep;
//        //public string LadaRep
//        //{
//        //    get
//        //    {
//        //       return this.ladaRep;
//        //    }

//        //    set
//        //    {
//        //        this.ladaRep = value;
//        //        base.PropertyChanged("LadaRep");
//        //    }
//        //}

//        private string telefonoRep;
//        public string TelefonoRep
//        {
//            get
//            {
//                return this.telefonoRep;
//            }

//            set
//            {
//                this.telefonoRep = value;
//                base.PropertyChanged("TelefonoRep");
//            }
//        }

//        private string extensionRep;
//        public string ExtensionRep
//        {
//            get
//            {
//                return this.extensionRep;
//            }

//            set
//            {
//                this.extensionRep = value;
//                base.PropertyChanged("ExtensionRep");
//            }
//        }

//        private int sector;
//        public int Sector
//        {
//            get
//            {
//                return this.sector;
//            }

//            set
//            {
//                this.sector = value;
//                base.PropertyChanged("Sector");
//            }
//        }

//        private int segmentaPrecios;
//        public int SegmentaPrecios
//        {
//            get
//            {
//                return this.segmentaPrecios;
//            }

//            set
//            {
//                this.segmentaPrecios = value;
//                base.PropertyChanged("SegmentaPrecios");
//            }
//        }

//        private ICompania compania;
//        public ICompania Compania
//        {
//            get
//            {
//                return this.compania;
//            }

//            set
//            {
//                this.compania = value;
//                base.PropertyChanged("Compania");
//            }
//        }

//         private string claveConjunto;
//        public string ClaveConjunto
//        {
//            get
//            {
//                return this.claveConjunto;
//            }

//            set
//            {
//                this.claveConjunto = value;
//                base.PropertyChanged("ClaveConjunto");
//            }
//        }

//        private string nombreAcreedor;
//        public string NombreAcreedor
//        {
//            get
//            {
//               return this.nombreAcreedor;
//            }

//            set
//            {
//                this.nombreAcreedor = value;
//                base.PropertyChanged("NombreAcreedor");
//            }
//        }

//        private string rfcAcreedor;
//        public string RFCAcreedor
//        {
//            get
//            {
//                return this.rfcAcreedor;
//            }

//            set
//            {
//                this.rfcAcreedor = value;
//                base.PropertyChanged("RFCAcreedor");
//            }
//        }

//        private string clabeAcreedor;
//        public string ClabeAcreedor
//        {
//            get
//            {
//                return this.clabeAcreedor;
//            }

//            set
//            {
//                this.clabeAcreedor = value;
//                base.PropertyChanged("ClabeAcreedor");
//            }
//        }

//        //private IItemGeneralValores estatusDes;
//        //public IItemGeneralValores EstatusDes
//        //{
//        //    get
//        //    {
//        //        return estatusDes;
//        //    }

//        //    set
//        //    {
//        //        estatusDes = value;
//        //        base.PropertyChanged("EstatusDes");
//        //    }
//        //}

//        private int idLocalidad;
//        public int IdLocalidad
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

//        private int idMoneda;
//        public int IdMoneda
//        {
//            get
//            {
//                return this.idMoneda;
//            }

//            set
//            {
//                this.idMoneda = value;
//                base.PropertyChanged("IdMoneda");
//            }
//        }
//        private List<IDesarrolloPrototipo> prototipos;
//        public List<IDesarrolloPrototipo> Prototipos
//        {
//            get
//            {
//                return this.prototipos;
//            }

//            set
//            {
//                this.prototipos = value;
//            }
//        }

//        private INotario notario;
//        public INotario Notario
//        {
//            get { return this.notario; }
//            set
//            {
//                this.notario = value;
//                base.PropertyChanged("Notario");
//            }
//        }

//        private List<ICuentaBancaria> cuentas;
//        public List<ICuentaBancaria> Cuentas
//        {
//            get
//            {
//                return this.cuentas;
//            }

//            set
//            {
//                this.cuentas = value;
//            }
//        }

//        private List<IDesarrolloEsquema> esquemas;
//        public List<IDesarrolloEsquema> Esquemas
//        {
//            get
//            {
//                return this.esquemas;
//            }

//            set
//            {
//                this.esquemas = value;
//            }
//        }

//        private List<IEntidadCaracteristica> caracteristicas;
//        public List<IEntidadCaracteristica> Caracteristicas
//        {
//            get
//            {
//                return this.caracteristicas;
//            }

//            set
//            {
//                this.caracteristicas = value;
//            }
//        }

//        private decimal precioExcedenteM2;
//        public decimal PrecioExcedenteM2
//        {
//            get
//            {
//                return precioExcedenteM2;
//            }

//            set
//            {
//               precioExcedenteM2 = value;
//            }
//        }
//    }
//}
