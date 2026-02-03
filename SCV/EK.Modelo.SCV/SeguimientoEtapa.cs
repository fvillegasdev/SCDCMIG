//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using m = EK.Modelo;

//namespace EK.Modelo.SCV
//{
//    public class SeguimientoEtapa : m.Kontrol.BaseKontrol, m.SCV.Interfaces.ISeguimientoEtapa
//    {
//        private int idSeguimiento;
//        private m.SCV.Interfaces.ISeguimiento seguimiento;

//        private int idEtapa;
//        private m.SCV.Interfaces.IEtapa etapa;

//        private int? orden;
//        private int? plazoVencimiento;
//        private  int? diasParaCulminarEtapa;
//        private DateTime fechaInicio;
//        private  DateTime fechaVencimiento;
//        private  DateTime fechaCierre;

//        private int? idEstatusEtapa;
//        private m.Kontrol.Interfaces.IItemGeneral estatusEtapa;

//        private int? idAreaResponsable;
//        private m.Kontrol.Interfaces.IItemGeneral areaResponsable;

//        private  int? idWorkFlow;
//        private  m.Kontrol.Interfaces.IWorkflow workFlow;
//        private int? readOnlyKontrol; 

//        public int IdEtapa
//        {
//            get { return idEtapa; }
//            set
//            {
//                idEtapa = value;
//                base.PropertyChanged("IdEtapa");
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

//        public m.SCV.Interfaces.ISeguimiento Seguimiento
//        {
//            get { return seguimiento; }
//            set
//            {
//                seguimiento = value;
//                base.PropertyChanged("Seguimiento");
//            }
//        }

//        public m.SCV.Interfaces.IEtapa Etapa
//        {
//            get { return etapa; }
//            set
//            {
//                etapa = value;
//                base.PropertyChanged("Etapa");
//            }
//        }

//        public int? Orden
//        {
//            get { return orden; }
//            set
//            {
//                orden = value;
//                base.PropertyChanged("Orden");
//            }
//        }

//        public int? PlazoVencimiento
//        {
//            get { return plazoVencimiento; }
//            set
//            {
//                plazoVencimiento = value;
//                base.PropertyChanged("PlazoVencimiento");
//            }
//        }

//        public int? DiasParaCulminarEtapa
//        {
//            get { return diasParaCulminarEtapa; }
//            set
//            {
//                diasParaCulminarEtapa = value;
//                base.PropertyChanged("DiasParaCulminarEtapa");
//            }
//        }

//        public DateTime FechaInicio
//        {
//            get { return fechaInicio; }
//            set
//            {
//                fechaInicio = value;
//                base.PropertyChanged("FechaInicio");
//            }
//        }

//        public DateTime FechaVencimiento
//        {
//            get { return fechaVencimiento; }
//            set
//            {
//                fechaVencimiento = value;
//                base.PropertyChanged("FechaVencimiento");
//            }
//        }

//        public DateTime FechaCierre
//        {
//            get { return fechaCierre; }
//            set
//            {
//                fechaCierre = value;
//                base.PropertyChanged("FechaCierre");
//            }
//        }

//        public int? IdEstatusEtapa
//        {
//            get { return idEstatusEtapa; }
//            set
//            {
//                idEstatusEtapa = value;
//                base.PropertyChanged("IdEstatusEtapa");
//            }
//        }

//        public m.Kontrol.Interfaces.IItemGeneral EstatusEtapa
//        {
//            get { return estatusEtapa; }
//            set
//            {
//                estatusEtapa = value;
//                base.PropertyChanged("EstatusEtapa");
//            }
//        }

//        public int? IdAreaResponsable
//        {
//            get { return idAreaResponsable; }
//            set
//            {
//                idAreaResponsable = value;
//                base.PropertyChanged("IdAreaResponsable");
//            }
//        }

//        public m.Kontrol.Interfaces.IItemGeneral AreaResponsable
//        {
//            get { return areaResponsable; }
//            set
//            {
//                areaResponsable = value;
//                base.PropertyChanged("AreaResponsable");
//            }
//        }

//        public int? IdWorkFlow
//        {
//            get { return idWorkFlow; }
//            set
//            {
//                idWorkFlow = value;
//                base.PropertyChanged("IdWorkFlow");
//            }
//        }

//        public m.Kontrol.Interfaces.IWorkflow WorkFlow
//        {
//            get { return workFlow; }
//            set
//            {
//                workFlow = value;
//                base.PropertyChanged("WorkFlow");
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
