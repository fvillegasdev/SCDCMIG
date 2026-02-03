//////using System;
//using System.Collections.Generic;

//using EK.Modelo.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;
//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.SCV
//{
//    public class ClienteRefLaboral
//        : mkontrol.BaseKontrol, Interfaces.IClienteRefLaboral
//    {
//        private int antiguedad;
//        private bool empleoActual;
//        private IEmpresa empresa;
//        private int idEmpresa;
//        private string puesto;

//        public int Antiguedad
//        {
//            get
//            {
//                return this.antiguedad;
//            }

//            set
//            {
//                this.antiguedad = value;
//            }
//        }

//        public bool EmpleoActual
//        {
//            get
//            {
//                return this.empleoActual;
//            }

//            set
//            {
//                this.empleoActual = value;
//            }
//        }

//        public IEmpresa Empresa
//        {
//            get
//            {
//                return this.empresa;
//            }

//            set
//            {
//                this.empresa = value;
//            }
//        }

//        public int IdEmpresa
//        {
//            get
//            {
//                return this.idEmpresa;
//            }

//            set
//            {
//                this.idEmpresa = value;
//            }
//        }

//        public string Puesto
//        {
//            get
//            {
//                return this.puesto;
//            }

//            set
//            {
//                this.puesto = value;
//            }
//        }
//    }
//}
