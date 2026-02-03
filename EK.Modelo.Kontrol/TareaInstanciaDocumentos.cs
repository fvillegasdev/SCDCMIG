using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol
{
    public class DocumentosTareaInstancia : ITareaInstanciaDocumentos
    {
        private int? flujoTrabajoInstanciaId;
        private int tareaInstanciaId;
        private int documentoId;
        private int archivoId;
        private string texto;
        private string titulo;
        private string obligatorio;
        private string showDeleteButton;
        private string referencia;

        public DocumentosTareaInstancia()
        {
        }

        public int? FlujoTrabajoInstanciaId
        {
            get
            {
                return this.flujoTrabajoInstanciaId;
            }

            set
            {
                this.flujoTrabajoInstanciaId = value;
            }
        }

        public int TareaInstanciaId
        {
            get
            {
                return this.tareaInstanciaId;
            }

            set
            {
                this.tareaInstanciaId = value;
            }
        }

        public int ID
        {
            get
            {
                return this.documentoId;
            }

            set
            {
                this.documentoId = value;
            }
        }

        public int ArchivoId
        {
            get
            {
                return this.archivoId;
            }

            set
            {
                this.archivoId = value;
            }
        }

        public int DocumentoId
        {
            get
            {
                return this.documentoId;
            }

            set
            {
                this.documentoId = value;
            }
        }

        public string text
        {
            get
            {
                return this.texto;
            }

            set
            {
                this.texto = value;
            }
        }

        public string title
        {
            get
            {
                return this.titulo;
            }

            set
            {
                this.titulo = value;
            }
        }

        public string Obligatorio
        {
            get
            {
                return this.obligatorio;
            }

            set
            {
                this.obligatorio = value;
            }
        }

        public string ShowDeleteButton
        {
            get
            {
                return this.showDeleteButton;
            }

            set
            {
                this.showDeleteButton = value;
            }
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
            }
        }
    }
}
