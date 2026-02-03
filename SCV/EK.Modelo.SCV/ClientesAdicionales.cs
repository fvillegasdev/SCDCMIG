//using System;
//using EK.Modelo.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;
//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.SCV
//{
//    public class ClienteAdicionales 
//        : mkontrol.BaseKontrol, IClienteAdicional
//    {
//        private int? idCentralObrera;
//        public int? IdCentralObrera {
//            get {
//                return this.idCentralObrera;
//            }
//            set {
//                this.idCentralObrera = value;
//            }
//        }

//        private int? idEstudios;
//        public int? IdEstudios {
//            get {
//                return this.idEstudios;
//            }
//            set {
//                this.idEstudios = value;
//            }
//        }

//        private int? idTipoCasa;
//        public int? IdTipoCasa {
//            get {
//                return this.idTipoCasa;
//            }
//            set {
//                this.idTipoCasa = value;
//            }
//        }

//        private int? idTipoPercepcion;
//        public int? IdTipoPercepcion {
//            get {
//                return this.idTipoPercepcion;
//            }
//            set {
//                this.idTipoPercepcion = value;
//            }
//        }

//        private decimal descuentoPension;
//        public decimal DescuentoPension {
//            get { return descuentoPension; }
//            set
//            {
//                descuentoPension = value;
//            }
//        }
//        private int dependienteEconomicos;
//        public int DependientesEconomicos {
//            get { return dependienteEconomicos; }
//            set
//            {
//                dependienteEconomicos = value;
//            }
//        }

//        private IItemGeneral estudios;
//        public IItemGeneral Estudios
//        {
//            get { return estudios; }
//            set
//            {
//                estudios = value;
//            }
//        }

//        private IItemGeneral tipoCasa;
//        public IItemGeneral TipoCasa {
//            get { return tipoCasa; }
//            set
//            {
//                tipoCasa = value;
//            }

//        }
//        private IItemGeneral tipoPercepcion;
//        public IItemGeneral TipoPercepcion {
//            get { return tipoPercepcion; }
//            set
//            {
//                tipoPercepcion = value;
//            }

//        }
//        private int autoPropio;
//        public int AutosPropios {
//            get { return autoPropio; }
//            set
//            {
//                autoPropio = value;
//            }

//        }

//        private ICentralObrera centralObrera;
//        public ICentralObrera CentralObrera {
//            get { return centralObrera; }
//            set
//            {
//                centralObrera = value;
//            }

//        }
//    }
//}
