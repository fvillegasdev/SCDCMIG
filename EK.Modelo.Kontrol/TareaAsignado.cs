using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol
{
    public class TareaAsignado 
        : BaseKontrol, ITareaAsignado
    {
        private int tareaId;
        private int? asignadoId;
        private string nombreAsignado;
        private string tipo;

        public TareaAsignado() : base()
        {

        }

        public int TareaId
        {
            get
            {
                return this.tareaId;
            }

            set
            {
                this.tareaId = value;
                base.PropertyChanged("TareaId");
            }
        }
        public int? AsignadoId
        {
            get
            {
                return this.asignadoId;
            }

            set
            {
                this.asignadoId = value;
                base.PropertyChanged("AsignadoId");
            }
        }

        public string NombreAsignado
        {
            get
            {
                return this.nombreAsignado;
            }

            set
            {
                this.nombreAsignado = value;
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

    }
}
