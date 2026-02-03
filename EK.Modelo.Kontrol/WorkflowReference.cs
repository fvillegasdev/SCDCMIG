using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol
{
    public class WorkflowReference:BaseKontrol,IWorkflowReference
    {
        private string referencia;
        private TipoReferenciaEnum idTipo;
        private string tipo;
        private string cc;
        private string cliente;
        private string descripcion;
        public WorkflowReference() : base()
        {

        }

        public string Referencia
        {
            get
            {
                return this.referencia;
            }

            set
            {
                this.referencia = value;
                base.PropertyChanged("Referencia");
            }
        }
        public string Descripcion
        {
            get
            {
                return this.descripcion;
            }

            set
            {
                this.descripcion = value;
                base.PropertyChanged("Descripcion");
            }
        }
        public TipoReferenciaEnum IdTipo
        {
            get
            {
                return this.idTipo;
            }

            set
            {
                this.idTipo = value;
                base.PropertyChanged("IdTipo");
            }
        }
        public string Tipo
        {
            get
            {
                return this.tipo;
            }

            set
            {
                this.tipo = value;
                base.PropertyChanged("Tipo");
            }
        }
        public string CC
        {
            get
            {
                return this.cc;
            }

            set
            {
                this.cc = value;
                base.PropertyChanged("CC");
            }
        }
        public string Cliente
        {
            get
            {
                return this.cliente;
            }

            set
            {
                this.cliente = value;
                base.PropertyChanged("Cliente");
            }
        }
    }
}
