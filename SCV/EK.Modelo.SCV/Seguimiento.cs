//using System;
//using System.Collections.Generic;
//using m = EK.Modelo.SCV;
//using mk = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class Seguimiento : mk.BaseKontrol, m.Interfaces.ISeguimiento
//    {
//        private m.Interfaces.IEsquema esquema;
//        public m.Interfaces.IEsquema Esquema
//        {
//            get { return esquema; }
//            set
//            {
//                esquema = value;
//                base.PropertyChanged("Esquema");
//            }
//        }
//        private int idVenta;
//        public int IdVenta
//        {
//            get { return idVenta; }
//            set
//            {
//                idVenta = value;
//                base.PropertyChanged("IdVenta");
//            }
//        }

//        private mk.Interfaces.IItemGeneral estatusSeguimiento;
//        public mk.Interfaces.IItemGeneral EstatusSeguimiento
//        {
//            get { return estatusSeguimiento; }
//            set
//            {
//                estatusSeguimiento = value;
//                base.PropertyChanged("EstatusSeguimiento");
//            }
//        }

//        private int idEsquema;
//        public int IdEsquema
//        {
//            get { return idEsquema; }
//            set
//            {
//                idEsquema = value;
//                base.PropertyChanged("IdEsquema");
//            }
//        }

//        private int? idEstatusSeguimiento;
//        public int? IdEstatusSeguimiento
//        {
//            get { return idEstatusSeguimiento; }
//            set
//            {
//                idEstatusSeguimiento = value;
//                base.PropertyChanged("IdEstatusSeguimiento");
//            }
//        }

//        private int? idMotivoSuspension;
//        public int? IdMotivoSuspension
//        {
//            get { return idMotivoSuspension; }
//            set
//            {
//                idMotivoSuspension = value;
//                base.PropertyChanged("IdMotivoSuspension");
//            }
//        }

//        private int idEntidadFase;
//        public int IdEntidadFase
//        {
//            get { return idEntidadFase; }
//            set
//            {
//                idEntidadFase = value;
//                base.PropertyChanged("IdEntidadFase");
//            }
//        }


//        private int idFase;
//        public int IdFase
//        {
//            get { return idFase; }
//            set
//            {
//                idFase = value;
//                base.PropertyChanged("IdFase");
//            }
//        }

//        private string justificacion;
//        public string Justificacion
//        {
//            get { return justificacion; }
//            set
//            {
//                justificacion = value;
//                base.PropertyChanged("Justificacion");
//            }
//        }

//        private mk.Interfaces.IItemGeneral motivoSuspension;
//        public mk.Interfaces.IItemGeneral MotivoSuspension
//        {
//            get { return motivoSuspension; }
//            set
//            {
//                motivoSuspension = value;
//                base.PropertyChanged("MotivoSuspension");
//            }
//        }

//        private m.Interfaces.IVenta venta;
//        public m.Interfaces.IVenta Venta
//        {
//            get { return venta; }
//            set
//            {
//                venta = value;
//                base.PropertyChanged("Venta");
//            }
//        }

//        private DateTime? vigenciaEstatus;
//        public DateTime? VigenciaEstatus
//        {
//            get { return vigenciaEstatus; }
//            set
//            {
//                vigenciaEstatus = value;
//                base.PropertyChanged("VigenciaEstatus");
//            }
//        }

//        private int? idMotivoCancelacion;
//        public int? IdMotivoCancelacion
//        {
//            get { return idMotivoCancelacion; }
//            set
//            {
//                idMotivoCancelacion = value;
//                base.PropertyChanged("IdMotivoCancelacion");
//            }
//        }

//        private mk.Interfaces.IItemGeneral motivoCancelacion;
//        public mk.Interfaces.IItemGeneral MotivoCancelacion
//        {
//            get { return motivoCancelacion; }
//            set
//            {
//                motivoCancelacion = value;
//                base.PropertyChanged("MotivoCancelacion");
//            }
//        }

//        private int? idMotivoReanudacion;
//        public int? IdMotivoReanudacion
//        {
//            get { return idMotivoReanudacion; }
//            set
//            {
//                idMotivoReanudacion = value;
//                base.PropertyChanged("IdMotivoReanudacion");
//            }
//        }

//        private mk.Interfaces.IItemGeneral motivoReanudacion;
//        public mk.Interfaces.IItemGeneral MotivoReanudacion
//        {
//            get { return motivoReanudacion; }
//            set
//            {
//                motivoReanudacion = value;
//                base.PropertyChanged("MotivoReanudacion");
//            }
//        }

//        private int idExpediente;
//        public int IdExpediente
//        {
//            get { return idExpediente; }
//            set
//            {
//                idExpediente = value;
//                base.PropertyChanged("IdExpediente");
//            }
//        }

//        private m.Interfaces.IExpediente expediente;
//        public m.Interfaces.IExpediente Expediente
//        {
//            get { return expediente; }
//            set
//            {
//                expediente = value;
//                base.PropertyChanged("Expediente");
//            }
//        }

//        private m.Interfaces.IFaseExpediente fase;
//        public m.Interfaces.IFaseExpediente Fase
//        {
//            get { return fase; }
//            set
//            {
//                fase = value;
//                base.PropertyChanged("Fase");
//            }
//        }

//        private int? idPosicion;
//        public int? IdPosicion
//        {
//            get { return idPosicion; }
//            set
//            {
//                idPosicion = value;
//                base.PropertyChanged("IdPosicion");
//            }
//        }

//        mk.Interfaces.IPosicion posicion { get; set; }
//        public mk.Interfaces.IPosicion Posicion
//        {
//            get { return posicion; }
//            set
//            {
//                posicion = value;
//                base.PropertyChanged("Posicion");
//            }
//        }

//        List<m.Interfaces.ISeguimientoAutorizado> autorizados { get; set; }
//        public List<m.Interfaces.ISeguimientoAutorizado> Autorizados
//        {
//            get { return autorizados; }
//            set
//            {
//                autorizados = value;
//                base.PropertyChanged("Autorizados");
//            }
//        }

//        private bool allowEdicion;
//        public bool AllowEdicion
//        {
//            get { return allowEdicion; }
//            set
//            {
//                allowEdicion = value;
//                base.PropertyChanged("AllowEdicion");
//            }
//        }

//        private string response;
//        public string Response
//        {
//            get { return response; }
//            set
//            {
//                response = value;
//                base.PropertyChanged("Response");
//            }
//        }

//        private decimal? cantidadOrdenSeguimiento;
//        public decimal? CANTIDAD_ORDEN_SEGUIMIENTO
//        {
//            get { return cantidadOrdenSeguimiento; }
//            set
//            {
//                cantidadOrdenSeguimiento = value;
//                base.PropertyChanged("CANTIDAD_ORDEN_SEGUIMIENTO");
//            }
//        }

//        private decimal? cantidadOrdenAvanzada;
//        public decimal? CANTIDAD_ORDEN_AVANZADA
//        {
//            get { return cantidadOrdenAvanzada; }
//            set
//            {
//                cantidadOrdenAvanzada = value;
//                base.PropertyChanged("CANTIDAD_ORDEN_AVANZADA");
//            }
//        }

//        private DateTime? fechaEstimada;
//        public DateTime? FechaEstimada
//        {
//            get { return fechaEstimada; }
//            set
//            {
//                fechaEstimada = value;
//                base.PropertyChanged("FechaEstimada");
//            }
//        }
//    }
//}