//using System;
//using EK.Modelo.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class Prototipos : mkontrol.BaseKontrol, IPrototipo
//    {
//        decimal banios;
//        decimal construccion;
//        decimal frenteMinimo;
//        string descripcion;
//        miKontrol.IItemGeneralValores recamara;
//        miKontrol.IItemGeneralValores inmueble;
//        string clave;
//        string nombre;
//        int recamaras;
//        int idTipoInmueble;
//        int idRecamara;
//        int idSalaTV;
//        int idCuartoServicio;

//        public decimal Banios
//        {
//            get { return banios; }
//            set
//            {
//                banios = value;
//                base.PropertyChanged("Banios");
//            }
//        }

//        public decimal Construccion
//        {
//            get { return construccion; }
//            set
//            {
//                construccion = value;
//                base.PropertyChanged("Construccion");
//            }
//        }

//        public string Descripcion
//        {
//            get { return descripcion; }
//            set
//            {
//                descripcion = value;
//                base.PropertyChanged("Descripcion");
//            }
//        }

//        public decimal FrenteMinimo
//        {
//            get { return frenteMinimo; }
//            set
//            {
//                frenteMinimo = value;
//                base.PropertyChanged("FrenteMinimo");
//            }
//        }

//        public int IdCuartoServicio
//        {
//            get { return idCuartoServicio; }
//            set
//            {
//                idCuartoServicio = value;
//                base.PropertyChanged("IdCuartoServicio");
//            }
//        }

//        public int IdRecamara
//        {
//            get { return idRecamara; }
//            set
//            {
//                idRecamara = value;
//                base.PropertyChanged("IdRecamara");
//            }
//        }

//        public miKontrol.IItemGeneralValores Recamara
//        {
//            get { return recamara; }
//            set
//            {
//                recamara = value;
//                base.PropertyChanged("Recamara");
//            }
//        }

//        public int IdSalaTV
//        {
//            get { return idSalaTV; }
//            set
//            {
//                idSalaTV = value;
//                base.PropertyChanged("IdSalaTV");
//            }
//        }

//        public int IdTipoInmueble
//        {
//            get { return idTipoInmueble; }
//            set
//            {
//                idTipoInmueble = value;
//                base.PropertyChanged("IdTipoInmueble");
//            }
//        }

//        public miKontrol.IItemGeneralValores Inmueble
//        {
//            get { return inmueble; }
//            set
//            {
//                inmueble = value;
//                base.PropertyChanged("Inmueble");
//            }
//        }

//        public string Clave
//        {
//            get { return clave; }
//            set
//            {
//                clave = value;
//                base.PropertyChanged("Clave");
//            }
//        }

//        public string Nombre
//        {
//            get { return nombre; }
//            set
//            {
//                nombre = value;
//                base.PropertyChanged("Nombre");
//            }
//        }

//        public int Recamaras
//        {
//            get { return recamaras; }
//            set
//            {
//                recamaras = value;
//                base.PropertyChanged("Recamaras");
//            }
//        }
//    }
//}
