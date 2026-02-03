//using System;
//using System.Collections.Generic;
//using EK.Modelo.Kontrol.Interfaces;
//using EK.Modelo.SCO.Interfaces;
//using EK.Modelo.SCV.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class Ubicaciones : mkontrol.BaseKontrol, IUbicaciones
//    {
//        private string nombre;
//        private string clave;
//        private string descripcion;
//        private string superManzana;
//        private string manzana;
//        private string lote;
//        private string interior;
//        private int? numeroExterior;
//        private string calle;
//        private decimal? superficie;
//        private decimal? excedente;
//        private decimal? frenteUbicacion;
//        private string rUC;
//        private string rUV;
//        private DateTime? fechaHabitabilidad;
//        private DateTime? fechaProgramada;
//        private DateTime? fechaEntrega;
//        private string colindanciaGeneral;
//        private string colindanciaComun;
//        private string observaciones;
//        private bool bloqueado;
//        private ISegmento segmento;
//        private IItemGeneral tipoUbicacion;
//        private Interfaces.ICliente cliente;
//        private IDesarrollo desarrollo;
//        private IPrototipo prototipo;
//        private ICentroCosto centroCosto;
//        private IItemGeneral estatusUbicacion;
//        private IItemGeneral estatusExpediente;
//        private List<IEntidadCaracteristica> caracteristicas;

//        public string Calle
//        {
//            get { return calle; }
//            set
//            {
//                calle = value;
//                base.PropertyChanged("Calle");
//            }
//        }

//        public Interfaces.ICliente Cliente
//        {
//            get { return cliente; }
//            set
//            {
//                cliente = value;
//                base.PropertyChanged("Cliente");
//            }
//        }

//        public string ColindanciaComun
//        {
//            get { return colindanciaComun; }
//            set
//            {
//                colindanciaComun = value;
//                base.PropertyChanged("ColindanciaComun");
//            }
//        }

//        public string ColindanciaGeneral
//        {
//            get { return colindanciaGeneral; }
//            set
//            {
//                colindanciaGeneral = value;
//                base.PropertyChanged("ColindanciaGeneral");
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

//        public DateTime? FechaEntrega
//        {
//            get { return fechaEntrega; }
//            set
//            {
//                fechaEntrega = value;
//                base.PropertyChanged("FechaEntrega");
//            }
//        }

//        public DateTime? FechaHabitabilidad
//        {
//            get { return fechaHabitabilidad; }
//            set
//            {
//                fechaHabitabilidad = value;
//                base.PropertyChanged("FechaHabitabilidad");
//            }
//        }

//        public DateTime? FechaProgramada
//        {
//            get { return fechaProgramada; }
//            set
//            {
//                fechaProgramada = value;
//                base.PropertyChanged("FechaProgramada");
//            }
//        }

//        public decimal? FrenteUbicacion
//        {
//            get { return frenteUbicacion; }
//            set
//            {
//                frenteUbicacion = value;
//                base.PropertyChanged("FrenteUbicacion");
//            }
//        }

//        public string Interior
//        {
//            get { return interior; }
//            set
//            {
//                interior = value;
//                base.PropertyChanged("Interior");
//            }
//        }

//        public string Lote
//        {
//            get { return lote; }
//            set
//            {
//                lote = value;
//                base.PropertyChanged("Lote");
//            }
//        }

//        public string Manzana
//        {
//            get { return manzana; }
//            set
//            {
//                manzana = value;
//                base.PropertyChanged("Manzana");
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

//        public int? NumeroExterior
//        {
//            get { return numeroExterior; }
//            set
//            {
//                numeroExterior = value;
//                base.PropertyChanged("NumeroExterior");
//            }
//        }

//        public string RUC
//        {
//            get { return rUC; }
//            set
//            {
//                rUC = value;
//                base.PropertyChanged("RUC");
//            }
//        }

//        public string RUV
//        {
//            get { return rUV; }
//            set
//            {
//                rUV = value;
//                base.PropertyChanged("RUV");
//            }
//        }

//        public ISegmento Segmento
//        {
//            get { return segmento; }
//            set
//            {
//                segmento = value;
//                base.PropertyChanged("Segmento");
//            }
//        }

//        public decimal? Superficie
//        {
//            get { return superficie; }
//            set
//            {
//                superficie = value;
//                base.PropertyChanged("Superficie");
//            }
//        }

//        public decimal? Excedente
//        {
//            get { return excedente; }
//            set { excedente = value;
//                base.PropertyChanged("Excedente");
//            }
//        }
//        public string SuperManzana
//        {
//            get { return superManzana; }
//            set
//            {
//                superManzana = value;
//                base.PropertyChanged("SuperManzana");
//            }
//        }

//        public IItemGeneral TipoUbicacion
//        {
//            get { return tipoUbicacion; }
//            set
//            {
//                tipoUbicacion = value;
//                base.PropertyChanged("TipoUbicacion");
//            }
//        }

//        public IDesarrollo Desarrollo
//        {
//            get { return desarrollo; }
//            set
//            {
//                desarrollo = value;
//                base.PropertyChanged("Desarrollo");
//            }
//        }

//        public IPrototipo Prototipo
//        {
//            get { return prototipo; }
//            set
//            {
//                prototipo = value;
//                base.PropertyChanged("Prototipo");
//            }
//        }

//        public IItemGeneral EstatusUbicacion
//        {
//            get { return estatusUbicacion; }
//            set
//            {
//                estatusUbicacion = value;
//                base.PropertyChanged("EstatusUbicacion");
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

//        public string Observaciones
//        {
//            get { return observaciones; }
//            set
//            {
//                observaciones = value;
//                base.PropertyChanged("Observaciones");
//            }
//        }

//        public IItemGeneral EstatusExpediente
//        {
//            get { return estatusExpediente; }
//            set
//            {
//                estatusExpediente = value;
//                base.PropertyChanged("EstatusExpediente");
//            }
//        }

//        public bool Bloqueado
//        {
//            get { return bloqueado; }
//            set
//            {
//                bloqueado = value;
//                base.PropertyChanged("Bloqueado");
//            }
//        }

//        public List<IEntidadCaracteristica> Caracteristicas
//        {
//            get { return caracteristicas; }
//            set
//            {
//                caracteristicas = value;
//            }
//        }

//        public ICentroCosto CentroCosto
//        {
//            get { return centroCosto; }
//            set
//            {
//                centroCosto = value;
//                base.PropertyChanged("CentroCosto");
//            }
//        }
//    }
//}
