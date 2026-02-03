using System;
using miKontrol = EK.Modelo.Kontrol.Interfaces;
using mkontrol = EK.Modelo.Kontrol;

namespace EK.Modelo.Kontrol
{
    public class TipoCambio 
        : mkontrol.BaseKontrol, Interfaces.ITipoCambio
    {
        private int idMonedaOrigen;

        public int IdMonedaOrigen
        {
            get { return idMonedaOrigen; }
            set
            {
                idMonedaOrigen = value;
                base.PropertyChanged("IdMonedaOrigen");
            }
        }

        private int idMonedaDestino;

        public int IdMonedaDestino
        {
            get { return this.idMonedaDestino; }
            set
            {
                this.idMonedaDestino = value;
            }
        }

        private miKontrol.IMoneda moneda;

        public miKontrol.IMoneda Moneda
        {
            get { return moneda; }
            set
            {
                moneda = value;
            }
        }

        private miKontrol.IMoneda monedaDestino;

        public miKontrol.IMoneda MonedaDestino
        {
            get { return this.monedaDestino; }
            set
            {
                this.monedaDestino = value;
            }
        }

        private DateTime fecha;

        public DateTime Fecha
        {
            get { return fecha; }
            set
            {
                fecha = value;
                base.PropertyChanged("Fecha");
            }
        }

        private DateTime fechaHasta;

        public DateTime FechaHasta
        {
            get { return this.fechaHasta; }
            set
            {
                this.fechaHasta = value;
            }
        }

        private decimal valor;

        public decimal Valor
        {
            get
            {
                return this.valor;
            }
            set
            {
                this.valor = value;
                base.PropertyChanged("Valor");
            }
        }
    }
}