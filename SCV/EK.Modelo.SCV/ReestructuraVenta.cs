using System;
using System.Collections.Generic;

using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCV.Interfaces;
using mkontrol = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV
{
    public class ReestructuraVenta
        : mkontrol.BaseKontrolMM, IReestructuraVenta
    {
        private int idVenta;
        private string motivo;
        private decimal? importeNuevo;
        private decimal? importeMonedaNuevo;
        private int versionVenta;
        private int idExpediente;
        private int numero;
        private string status;
        private DateTime vencimiento;
        private string tipoConceptoPago;
        private IItemGeneral tipoAbono;
        private string referenciaInteres;
        private string referenciaCapital;

        public int IdVenta
        {
            get
            {
                return this.idVenta;
            }

            set
            {
                this.idVenta = value;
            }
        }

        public decimal? ImporteMonedaNuevo
        {
            get
            {
                return this.importeMonedaNuevo;
            }

            set
            {
                this.importeMonedaNuevo = value;
            }
        }

        public decimal? ImporteNuevo
        {
            get
            {
                return this.importeNuevo;
            }

            set
            {
                this.importeNuevo = value;
            }
        }

        public string Motivo
        {
            get
            {
                return this.motivo;
            }

            set
            {
                this.motivo = value;
            }
        }

        public int VersionVenta
        {
            get { return this.versionVenta; }
            set { this.versionVenta = value; }
        }

        public int IdExpediente
        {
            get { return this.idExpediente; }
            set { this.idExpediente = value; }
        }

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

        public string Status
        {
            get
            {
                return this.status;
            }

            set
            {
                this.status = value;
            }
        }

        public string TipoConceptoPago
        {
            get
            {
                return this.tipoConceptoPago;
            }

            set
            {
                this.tipoConceptoPago = value;
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

        public IItemGeneral TipoAbono
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

        public string ReferenciaInteres
        {
            get { return this.referenciaInteres; }
            set { this.referenciaInteres = value; }
        }

        public string ReferenciaCapital
        {
            get { return this.referenciaCapital; }
            set { this.referenciaCapital = value; }
        }
    }
}