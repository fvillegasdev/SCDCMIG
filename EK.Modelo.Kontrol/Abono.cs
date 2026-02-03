using System;

namespace EK.Modelo.Kontrol
{
    public class Abono
        : BaseKontrolMM, Interfaces.IAbono
    {
        private DateTime fecha;
        private Interfaces.IItemGeneral tipoAbono;
        private DateTime vencimiento;

        public DateTime Fecha
        {
            get
            {
                return this.fecha;
            }

            set
            {
                this.fecha = value;
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
        public DateTime Vencimiento {
            get { return this.vencimiento; }
            set { this.vencimiento = value; }
        }
       
    }
}
