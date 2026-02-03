using System.Collections.Generic;
using m = EK.Modelo.SCV;
using mk = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV
{
    public class EsquemaEtapa
        : mk.BaseKontrol, m.Interfaces.IEsquemaEtapa
    {
        private int idEsquema;
        private int idEtapa;
        private m.Interfaces.IEtapa etapa;
        private int plazoDias;
        private int? orden;
        private int? idWorkFlow;
        private mk.Interfaces.IWorkflow workFlow;
        private int idAreaResponsable;
        private mk.Interfaces.IItemGeneral areaResponsable;

        private List<m.Interfaces.IEsquemaEtapaRequisito> requisitos;
        private List<m.Interfaces.IEsquemaEtapaDocumento> documentos;
        private List<m.Interfaces.IEsquemaEtapaProceso> procesos;

        public m.Interfaces.IEtapa Etapa
        {
            get { return etapa; }
            set
            {
                etapa = value;
                base.PropertyChanged("Etapa");
            }
        }

        public int IdEsquema
        {
            get { return idEsquema; }
            set
            {
                idEsquema = value;
                base.PropertyChanged("IdEsquema");
            }
        }

        public int IdEtapa
        {
            get { return idEtapa; }
            set
            {
                idEtapa = value;
                base.PropertyChanged("IdEtapa");
            }
        }

        public int PlazoDias
        {
            get { return plazoDias; }
            set
            {
                plazoDias = value;
                base.PropertyChanged("PlazoDias");
            }
        }

        public int IdAreaResponsable
        {
            get { return idAreaResponsable; }
            set
            {
                idAreaResponsable = value;
                base.PropertyChanged("IdAreaResponsable");
            }
        }

        public mk.Interfaces.IItemGeneral AreaResponsable
        {
            get { return areaResponsable; }
            set
            {
                areaResponsable = value;
                base.PropertyChanged("AreaResponsable");
            }
        }

        public List<m.Interfaces.IEsquemaEtapaRequisito> Requisitos
        {
            get { return requisitos; }
            set
            {
                requisitos = value;
                base.PropertyChanged("Requisitos");
            }
        }

        public List<m.Interfaces.IEsquemaEtapaDocumento> Documentos
        {
            get { return documentos; }
            set
            {
                documentos = value;
                base.PropertyChanged("Documentos");
            }
        }

        public List<m.Interfaces.IEsquemaEtapaProceso> Procesos
        {
            get { return procesos; }
            set
            {
                procesos = value;
                base.PropertyChanged("Procesos");
            }
        }

        public int? Orden
        {
            get { return orden; }
            set
            {
                orden = value;
                base.PropertyChanged("Orden");
            }
        }

        #region AUTORIZACION

        public mk.Interfaces.IWorkflow WorkFlow
        {
            get { return workFlow; }
            set
            {
                workFlow = value;
                base.PropertyChanged("WorkFlow");
            }
        }

        public int? IdWorkFlow
        {
            get { return idWorkFlow; }
            set
            {
                idWorkFlow = value;
                base.PropertyChanged("IdWorkFlow");
            }
        }

        #endregion
    }
}