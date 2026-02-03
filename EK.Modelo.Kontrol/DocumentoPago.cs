using System;

namespace EK.Modelo.Kontrol
{
    public class DocumentoPago
        : BaseKontrolMM, Interfaces.IDocumentoPago
    {
        private int numero;
        private DateTime vencimiento;
        private Interfaces.IItemGeneral tipoAbono;
        private string referenciaCapital;
        private string referenciaInteres;
        private int idEstatusDoc;
        private string estatusDoc;
        private string status;
        public int Numero
        {
            get
            {
                return this.numero;
            }

            set
            {
                this.numero = value;
            }
        }

        public DateTime Vencimiento
        {
            get
            {
                return this.vencimiento;
            }

            set
            {
                this.vencimiento = value;
            }
        }

        public Interfaces.IItemGeneral TipoAbono
        {
            get
            {
                return this.tipoAbono;
            }

            set
            {
                this.tipoAbono = value;
            }
        }

        public string ReferenciaCapital
        {
            get { return this.referenciaCapital; }
            set { referenciaCapital = value; }
        }

        public string ReferenciaInteres
        {
            get { return this.referenciaInteres; }
            set { this.referenciaInteres = value; }
        }

        public int IdEstatusDoc
        {
            get
            {
                return this.idEstatusDoc;
            }

            set
            {
                this.idEstatusDoc = value;
            }
        }

        public string EstatusDoc
        {
            get { return this.estatusDoc; }
            set { estatusDoc = value; }
        }

        public string Status
        {
            get { return this.status; }
            set { status = value; }
        }
    }
}
