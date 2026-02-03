//using EK.Modelo.SCV.Interfaces;
//using EK.Modelo.Kontrol.Interfaces;

//using System;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class Agente
//        : mkontrol.Usuario, IAgente
//    {
//        private int? idProveedor;
//        public int? IdProveedor
//        {
//            get
//            {
//                return this.idProveedor;
//            }
//            set
//            {
//                this.idProveedor = value;
//            }
//        }

//        private EK.Modelo.SCP.Interfaces.IProveedor proveedor;
//        public EK.Modelo.SCP.Interfaces.IProveedor Proveedor
//        {
//            get
//            {
//                return this.proveedor;
//            }
//            set
//            {
//                this.proveedor = value;
//            }
//        }

//        private bool comisionable;
//        public bool Comisionable
//        {
//            get
//            {
//                return this.comisionable;
//            }
//            set
//            {
//                this.comisionable = value;
//            }
//        }

//        private bool asesorCredito;
//        public bool AsesorCredito
//        {
//            get
//            {
//                return this.asesorCredito;
//            }
//            set
//            {
//                this.asesorCredito = value;
//            }
//        }

//        private decimal limitePagare;
//        public decimal LimitePagare
//        {
//            get
//            {
//                return this.limitePagare;
//            }
//            set
//            {
//                this.limitePagare = value;
//            }
//        }

//        private int? idAgente;
//        public int? IdAgente
//        {
//            get
//            {
//                return this.idAgente;
//            }

//            set
//            {
//                this.idAgente = value;
//            }
//        }
//    }
//}
