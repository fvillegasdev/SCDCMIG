using System;
using EK.Modelo.Kontrol;
using EK.Modelo.SBO.Interfaces;
using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCO.Interfaces;
using EK.Modelo.SCP.Interfaces;

namespace EK.Modelo.SBO
{
    public class Cheque 
        : BaseKontrolCompania, ICheque
    {
        private Int32 numeroCheque;
        private string descripcion = string.Empty;
        private decimal monto;
        private DateTime fechaMovimiento;
        private DateTime fechaRetencion;
        private string concepto1 = string.Empty;
        private string concepto2 = string.Empty;
        private string concepto3 = string.Empty;
        private string cantidadLetra = string.Empty;
        private ICuentaBancaria cuentaBancaria;
        //private ITipoMovimiento tipoMovimiento;
        private IBancos banco;
        private int tipoCheque;
        private IPoliza poliza;
        private ICentroCosto cc;
        private IItemGeneralValores tipoPoliza;
        private IProveedor proveedor;
        private int estadoCheque;



        public Cheque(): base()
        {
          
        }
        public Int32 NumeroCheque {
            get
            {
                return this.numeroCheque;
            }

            set
            {
                this.numeroCheque = value;
                base.PropertyChanged("NumeroCheque");
            }
        }
        public string Descripcion {
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
        public decimal Monto {
            get
            {
                return this.monto;
            }

            set
            {
                this.monto = value;
                base.PropertyChanged("Monto");
            }
        }

        public string CantidadLetra
        {
            get
            {
                return this.cantidadLetra;
            }

            set
            {
                this.cantidadLetra = value;
                base.PropertyChanged("CantidadLetra");
            }
        }

        public DateTime FechaMovimiento
        {
            get
            {
                return this.fechaMovimiento;
            }

            set
            {
                this.fechaMovimiento = value;
                base.PropertyChanged("FechaMovimiento");
            }
        }
        public DateTime FechaRetencion {
            get
            {
                return this.fechaRetencion;
            }

            set
            {
                this.fechaRetencion = value;
                base.PropertyChanged("FechaRetencion");
            }
        }
        public string Concepto1 {
            get
            {
                return this.concepto1;
            }

            set
            {
                this.concepto1 = value;
                base.PropertyChanged("Concepto1");
            }
        }
        public string Concepto2 {
            get
            {
                return this.concepto2;
            }

            set
            {
                this.concepto2 = value;
                base.PropertyChanged("Concepto2");
            }
        }
        public string Concepto3 {
            get
            {
                return this.concepto3;
            }

            set
            {
                this.concepto3 = value;
                base.PropertyChanged("Concepto3");
            }
        }
        public ICuentaBancaria CuentaBancaria {

            get
            {
                return this.cuentaBancaria;
            }

            set
            {
                this.cuentaBancaria = value;
                base.PropertyChanged("CuentaBancaria");
            }
        }
        //public ITipoMovimiento TipoMovimiento {
        //    get
        //    {
        //        return this.tipoMovimiento;
        //    }

        //    set
        //    {
        //        this.tipoMovimiento = value;
        //        base.PropertyChanged("TipoMovimiento");
        //    }
        //}
        public IBancos Banco
        {
            get
            {
                return this.banco;
            }

            set
            {
                this.banco = value;
                base.PropertyChanged("Banco");
            }
        }
        public int TipoCheque {
            get
            {
                return this.tipoCheque;
            }

            set
            {
                this.tipoCheque = value;
                base.PropertyChanged("TipoCheque");
            }
        }
        public IPoliza Poliza {
            get
            {
                return this.poliza;
            }

            set
            {
                this.poliza = value;
                base.PropertyChanged("Poliza");
            }

        }

        public ICentroCosto CC
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

        public IItemGeneralValores TipoPoliza
        {
            get
            {
                return this.tipoPoliza;
            }

            set
            {
                this.tipoPoliza = value;
                base.PropertyChanged("TipoPoliza");
            }

        }
        public IProveedor Proveedor
        {
            get
            {
                return this.proveedor;
            }

            set
            {
                this.proveedor = value;
                base.PropertyChanged("Proveedor");
            }

        }
       
        public int EstadoCheque
        {
            get
            {
                return this.estadoCheque;
            }

            set
            {
                this.estadoCheque = value;
                base.PropertyChanged("EstadoCheque");
            }

        }
    }
}
