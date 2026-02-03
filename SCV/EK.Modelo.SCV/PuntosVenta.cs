//using System;
//using EK.Modelo.SCV.Interfaces;
//using EK.Modelo.Kontrol.Interfaces;
//using mKontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class PuntoVenta : mKontrol.BaseKontrol, IPuntoVenta
//    {
//        private string codigoPostal;
//        public string CodigoPostal
//        {
//            get
//            {
//                return codigoPostal;
//            }

//            set
//            {
//                codigoPostal = value;
//                base.PropertyChanged("CodigoPostal");
//            }
//        }

//        private string clave;
//        public string Clave
//        {
//            get
//            {
//               return clave;
//            }

//            set
//            {
//                clave = value;
//                base.PropertyChanged("Clave");
//            }
//        }

//        private string nombre;
//        public string Nombre
//        {
//            get
//            {
//                return nombre;
//            }

//            set
//            {
//                nombre = value;
//                base.PropertyChanged("Nombre");
//            }
//        }

//        private int _id;
//        public int Id
//        {
//            get
//            {
//                return _id;
//            }

//            set
//            {
//                _id = value;
//                base.PropertyChanged("Id");
//            }
//        }

//        private int idLocalidad;
//        public int IdLocalidad
//        {
//            get
//            {
//                return idLocalidad;
//            }

//            set
//            {
//                idLocalidad = value;
//                base.PropertyChanged("IdLocalidad");
//            }
//        }

//        private IAsentamiento asentamiento;
//        public IAsentamiento Asentamiento
//        {
//            get { return asentamiento; }
//            set { asentamiento = value;
//                base.PropertyChanged("Asentamiento");
//            }
//        }

//        private string telefono1;
//        public string Telefono1
//        {
//            get
//            {
//                return telefono1;
//            }

//            set
//            {
//                telefono1 = value;
//                base.PropertyChanged("Telefono1");
//            }
//        }
//        private string telefono2;
//        public string Telefono2
//        {
//            get
//            {
//                return telefono2;
//            }

//            set
//            {
//                telefono2 = value;
//                base.PropertyChanged("Telefono2");
//            }
//        }
//        private string direccion;
//        public string Direccion
//        {
//            get
//            {
//               return direccion;
//            }

//            set
//            {
//                direccion = value;
//                base.PropertyChanged("Direccion");
//            }
//        }
//    }
//}
