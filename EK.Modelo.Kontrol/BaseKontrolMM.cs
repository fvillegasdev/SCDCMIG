using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol
{
    public abstract class BaseKontrolMM
        : BaseKontrol, Interfaces.IBaseKontrolMM
    {
        protected decimal? capital;
        protected decimal? interes;
        protected decimal? importe;
        protected decimal? capitalMoneda;
        protected decimal? interesMoneda;
        protected decimal? importeMoneda;
        protected IMoneda moneda;
        protected int? idMoneda;
        protected decimal? tipoCambio;
        protected decimal? saldo;
        protected decimal? pagado;

        public decimal? Capital
        {
            get
            {
                return this.capital;
            }

            set
            {
                this.capital = value;
            }
        }

        public decimal? CapitalMoneda
        {
            get
            {
                return this.capitalMoneda;
            }

            set
            {
                this.capitalMoneda = value;
            }
        }

        public decimal? Interes
        {
            get
            {
                return this.interes;
            }

            set
            {
                this.interes = value;
            }
        }

        public decimal? InteresMoneda
        {
            get
            {
                return this.interesMoneda;
            }

            set
            {
                this.interesMoneda = value;
            }
        }

        public decimal? Importe
        {
            get
            {
                return this.importe;
            }

            set
            {
                this.importe = value;
            }
        }

        public decimal? ImporteMoneda
        {
            get
            {
                return this.importeMoneda;
            }

            set
            {
                this.importeMoneda = value;
            }
        }

        public IMoneda Moneda
        {
            get
            {
                return this.moneda;
            }

            set
            {
                this.moneda = value;
            }
        }

        public int? IdMoneda
        {
            get
            {
                return this.idMoneda;
            }

            set
            {
                this.idMoneda = value;
            }
        }

        public decimal? TipoCambio
        {
            get
            {
                return this.tipoCambio; 
            }

            set
            {
                this.tipoCambio = value;
            }
        }

        public decimal? Saldo
        { get { return this.saldo; }
          set { this.saldo = value; }
        }

        public decimal? Pagado
        {
            get { return this.pagado; }
            set { this.pagado = value; }
        }
    }
}
