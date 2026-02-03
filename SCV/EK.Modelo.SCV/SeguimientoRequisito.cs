//using System;
//using m = EK.Modelo;

//namespace EK.Modelo.SCV
//{
//    public class SeguimientoRequisito : m.Kontrol.BaseKontrol, m.SCV.Interfaces.ISeguimientoRequisito
//    {
//        private int idSeguimiento;
//        private int idEtapa;
//        private m.SCV.Interfaces.IEtapa etapa;
//        private int idEstatusRequisito;
//        private m.Kontrol.Interfaces.IItemGeneral estatusRequisito;
//        private int idRequisito;
//        private m.SCV.Interfaces.IRequisito requisito;
//        private string valor;
//        private DateTime? fechaVencimiento;
//        private int idExpediente;
//        private string valores;
//        private int? idWorkFlow;
//        private m.Kontrol.Interfaces.IWorkflow workFlow;
//        private int? readOnlyKontrol;
//        private m.SCV.Interfaces.ISeguimiento seguimiento;
//        private int? idTipoEntidad;

//        public SeguimientoRequisito()
//            : base()
//        {

//            //parametros = new Parametros();
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

//        public int IdExpediente
//        {
//            get { return idExpediente; }
//            set
//            {
//                idExpediente = value;
//                base.PropertyChanged("IdExpediente");
//            }
//        }
//        public int IdRequisito
//        {
//            get { return idRequisito; }
//            set
//            {
//                idRequisito = value;
//                base.PropertyChanged("IdRequisito");
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

//        public string Valor
//        {
//            get { return valor; }
//            set
//            {
//                valor = value;
//                base.PropertyChanged("Valor");
//            }
//        }

//        public DateTime? FechaVencimiento
//        {
//            get
//            {
//                return this.fechaVencimiento;
//            }
//            set
//            {
//                fechaVencimiento = value;
//                PropertyChanged("FechaVencimiento");
//            }
//        }

//        public string Valores
//        {
//            get { return this.valores; }
//            set
//            {
//                valores = value;
//                PropertyChanged("Valores");
//            }
//        }

//        public m.SCV.Interfaces.IEtapa Etapa
//        {
//            get { return this.etapa; }
//            set
//            {
//                etapa = value;
//                PropertyChanged("Etapa");
//            }
//        }

//        public m.SCV.Interfaces.IRequisito Requisito
//        {
//            get { return this.requisito; }
//            set
//            {
//                requisito = value;
//                PropertyChanged("Requisito");
//            }
//        }

//        public int IdEstatusRequisito
//        {
//            get { return this.idEstatusRequisito; }
//            set
//            {
//                idEstatusRequisito = value;
//                PropertyChanged("IdEstatusRequisito");
//            }
//        }

//        public m.Kontrol.Interfaces.IItemGeneral EstatusRequisito
//        {
//            get { return this.estatusRequisito; }
//            set
//            {
//                estatusRequisito = value;
//                PropertyChanged("EstatusRequisito");
//            }
//        }

//        public int? IdWorkFlow
//        {
//            get { return this.idWorkFlow; }
//            set
//            {
//                idWorkFlow = value;
//                PropertyChanged("IdWorkFlow");
//            }
//        }

//        public m.Kontrol.Interfaces.IWorkflow WorkFlow
//        {
//            get { return this.workFlow; }
//            set
//            {
//                workFlow = value;
//                PropertyChanged("WorkFlow");
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

//        public m.SCV.Interfaces.ISeguimiento Seguimiento
//        {
//            get { return seguimiento; }
//            set
//            {
//                seguimiento = value;
//                base.PropertyChanged("Seguimiento");
//            }
//        }

//        public int? IdTipoEntidad
//        {
//            get { return idTipoEntidad; }
//            set
//            {
//                idTipoEntidad = value;
//                base.PropertyChanged("IdTipoEntidad");
//            }
//        }
//    }
//}