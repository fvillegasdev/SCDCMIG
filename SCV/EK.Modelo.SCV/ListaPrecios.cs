//using System;
//using EK.Modelo.SCV.Interfaces;
//using EK.Modelo.Kontrol.Interfaces;
//using mKontrol = EK.Modelo.Kontrol;
//using EK.Modelo.SCO.Interfaces;
//using System.Collections.Generic;

//namespace EK.Modelo.SCV
//{
//    public class ListaPrecios : mKontrol.BaseKontrol, IListaPrecios
//    {
//        private IUbicaciones ubicacion;
//        private decimal precioBase;
//        private DateTime? vigencia;
//        private decimal valorActual;
//        private decimal? valorAutorizado;
//        private bool hasCaracteristicas;
//        private decimal totalCaracteristicas;

//        public IUbicaciones Ubicacion
//        {
//            get
//            {
//                return this.ubicacion;
//            }
//            set
//            {
//                this.ubicacion = value;
//                base.PropertyChanged("Ubicacion");
//            }
//        }

//        public decimal ValorActual
//        {
//            get
//            {
//                return this.valorActual;
//            }
//            set
//            {
//                this.valorActual = value;
//                base.PropertyChanged("ValorActual");
//            }
//        }

//        public decimal? ValorAutorizado
//        {
//            get
//            {
//                return this.valorAutorizado;
//            }
//            set
//            {
//                this.valorAutorizado = value;
//                base.PropertyChanged("ValorAutorizado");
//            }
//        }

//        public DateTime? Vigencia
//        {
//            get
//            {
//                return this.vigencia;
//            }
//            set
//            {
//                this.vigencia = value;
//                base.PropertyChanged("Vigencia");
//            }
//        }

//        public decimal PrecioBase
//        {
//            get
//            {
//                return this.precioBase;
//            }
//            set
//            {
//                this.precioBase = value;
//                base.PropertyChanged("PrecioBase");
//            }
//        }

//        #region VariablesCalculadas 

//        public bool HasCaracteristicas
//        {
//            get
//            {
//                return this.hasCaracteristicas;
//            }
//            set
//            {
//                this.hasCaracteristicas = value;
//                base.PropertyChanged("HasCaracteristicas");
//            }
//        }

//        public decimal TotalCaracteristicas
//        {
//            get
//            {
//                return this.totalCaracteristicas;
//            }
//            set
//            {
//                this.totalCaracteristicas = value;
//                base.PropertyChanged("TotalCaracteristicas");
//            }
//        }

//        #endregion
//    }
//}
