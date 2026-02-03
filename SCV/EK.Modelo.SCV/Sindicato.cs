//using System;
//using System.Collections.Generic;
//using EK.Modelo.Kontrol.Interfaces;
//using EK.Modelo.SCV.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class Sindicato : mkontrol.BaseKontrol, ISindicato
//    {
//        string domicilio;
//        ILocalidad localidad;
//        string telefono;
//        string telefono2;
//        string celular;
//        string fax;
//        string email;
//        string contacto;
//        IUsuario agente;
//        IUsuario agenteExterno;

//        public IUsuario Agente
//        {
//            get { return agente; }
//            set
//            {
//                agente = value;
//                base.PropertyChanged("Agente");
//            }
//        }

//        public IUsuario AgenteExterno
//        {
//            get { return agenteExterno; }
//            set
//            {
//                agenteExterno = value;
//                base.PropertyChanged("AgenteExterno");
//            }
//        }

//        public string Celular
//        {
//            get { return celular; }
//            set
//            {
//                celular = value;
//                base.PropertyChanged("Celular");
//            }
//        }
//        public string Contacto
//        {
//            get { return contacto; }
//            set
//            {
//                contacto = value;
//                base.PropertyChanged("Contacto");
//            }
//        }

//        public string Domicilio
//        {
//            get { return domicilio; }
//            set
//            {
//                domicilio = value;
//                base.PropertyChanged("Domicilio");
//            }
//        }

//        public string Email
//        {
//            get { return email; }
//            set
//            {
//                email = value;
//                base.PropertyChanged("Email");
//            }
//        }

//        public string Fax
//        {
//            get { return fax; }
//            set
//            {
//                fax = value;
//                base.PropertyChanged("Fax");
//            }
//        }

//        public ILocalidad Localidad
//        {
//            get { return localidad; }
//            set
//            {
//                localidad = value;
//                base.PropertyChanged("Localidad");
//            }
//        }


//        public string Telefono
//        {
//            get { return telefono; }
//            set
//            {
//                telefono = value;
//                base.PropertyChanged("Telefono");
//            }
//        }

//        public string Telefono2
//        {
//            get { return telefono2; }
//            set
//            {
//                telefono2 = value;
//                base.PropertyChanged("Telefono2");
//            }
//        }
//    }
//}
