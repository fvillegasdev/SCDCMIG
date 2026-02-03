//using System;
//using mk = EK.Modelo.Kontrol;
//using m = EK.Modelo.SCV;

//namespace EK.Modelo.SCV
//{
//    public class SeguimientoProceso
//        : mk.BaseKontrol, m.Interfaces.ISeguimientoProceso
//    {
//        private int? idExpediente;
//        private int? idFaseExpediente;
//        private m.Interfaces.IFaseExpediente fase;
//        private int idSeguimiento;
//        private int idEtapa;
//        private m.Interfaces.IEtapa etapa;
//        private int idProceso;
//        private m.Interfaces.IProceso proceso;
//        private int? idEstatusProceso;
//        private DateTime fechaEjecucion;
//        private mk.Interfaces.IItemGeneral estatusEtapa;
//        private mk.Interfaces.IItemGeneral estatusProceso;
//        private int idSeguimientoEtapa ;
//        private int? readOnlyKontrol;
//        public int? IdExpediente
//        {
//            get { return idExpediente; }
//            set
//            {
//                idExpediente = value;
//                base.PropertyChanged("IdExpediente");
//            }
//        }

//        public int? IdFaseExpediente
//        {
//            get { return idFaseExpediente; }
//            set
//            {
//                idFaseExpediente = value;
//                base.PropertyChanged("IdFaseExpediente");
//            }
//        }

//        public m.Interfaces.IFaseExpediente Fase
//        {
//            get { return fase; }
//            set
//            {
//                fase = value;
//                base.PropertyChanged("Fase");
//            }
//        }

//        public int IdSeguimiento
//        {
//            get { return idSeguimiento; }
//            set
//            {
//                idSeguimiento = value;
//                base.PropertyChanged("IdSeguimiento");
//            }
//        }

//        public int IdEtapa
//        {
//            get { return idEtapa; }
//            set
//            {
//                idEtapa = value;
//                base.PropertyChanged("IdEtapa");
//            }
//        }

//        public m.Interfaces.IEtapa Etapa
//        {
//            get { return etapa; }
//            set
//            {
//                etapa = value;
//                base.PropertyChanged("Etapa");
//            }
//        }

//        public int IdProceso
//        {
//            get { return idProceso; }
//            set
//            {
//                idProceso = value;
//                base.PropertyChanged("IdProceso");
//            }
//        }

//        public m.Interfaces.IProceso Proceso
//        {
//            get { return proceso; }
//            set
//            {
//                proceso = value;
//                base.PropertyChanged("Proceso");
//            }
//        }

//        public int? IdEstatusProceso
//        {
//            get { return idEstatusProceso; }
//            set
//            {
//                idEstatusProceso = value;
//                base.PropertyChanged("IdEstatusProceso");
//            }
//        }

//        public DateTime FechaEjecucion
//        {
//            get { return fechaEjecucion; }
//            set
//            {
//                fechaEjecucion = value;
//                base.PropertyChanged("FechaEjecucion");
//            }
//        }

//        public mk.Interfaces.IItemGeneral EstatusProceso
//        {
//            get { return estatusProceso; }
//            set
//            {
//                estatusProceso = value;
//                base.PropertyChanged("EstatusProceso");
//            }
//        }

//        public mk.Interfaces.IItemGeneral EstatusEtapa
//        {
//            get { return estatusEtapa; }
//            set
//            {
//                estatusEtapa = value;
//                base.PropertyChanged("EstatusEtapa");
//            }
//        }

//        public int IdSeguimientoEtapa
//        {
//            get { return idSeguimientoEtapa; }
//            set
//            {
//                idSeguimientoEtapa = value;
//                base.PropertyChanged("IdSeguimientoEtapa");
//            }
//        }
//        public int? ReadOnlyKontrol
//        {
//            get { return readOnlyKontrol; }
//            set
//            {
//                readOnlyKontrol = value;
//                base.PropertyChanged("ReadOnlyKontrol");
//            }
//        }
//    }
//}