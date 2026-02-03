using System;
using EK.Modelo.Kontrol.Interfaces;
using miSCO = EK.Modelo.SCO.Interfaces;
using mKontrol = EK.Modelo.Kontrol;
using mSCO = EK.Modelo.SCO;


namespace EK.Modelo.SCO
{
    public class MovimientosPoliza :
        mKontrol.BaseKontrolCompania, miSCO.IMovimientosPoliza
    {


        public MovimientosPoliza():base()
        {

        }

        private int linea; 
        public int Linea {
            get
            {
                return this.linea;
            }

            set
            {
                this.linea = value;
                base.PropertyChanged("Linea");
            }
        }
        private int cta;
        public int Cta {
            get
            {
                return this.cta;
            }

            set
            {
                this.cta = value;
                base.PropertyChanged("Cta");
            }
        }
        private int scta;
        public int Scta {
            get
            {
                return this.scta;
            }

            set
            {
                this.scta = value;
                base.PropertyChanged("Scta");
            }
        }

        private int sscta; 
        public int Sscta {

            get
            {
                return this.sscta;
            }

            set
            {
                this.sscta = value;
                base.PropertyChanged("Sscta");
            }
        }
        private int digito;
        public int Digito {
            get
            {
                return this.digito;
            }

            set
            {
                this.digito = value;
                base.PropertyChanged("Digito");
            }
        }
        private int idTipoMovimiento; 
        public int IdTipoMovimiento {
            get
            {
                return this.idTipoMovimiento;
            }

            set
            {
                this.idTipoMovimiento = value;
                base.PropertyChanged("IdTipoMovimiento");
            }
        }
        private string   referencia; 
        public string Referencia {
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
        private string cvecc;
        public string CveCC {
            get
            {
                return this.cvecc;
            }

            set
            {
                this.cvecc = value;
                base.PropertyChanged("CveCC");
            }
        }
        private int monto; 
        public int Monto {
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
        private int ordenCompra; 
        public int OrdenCompra {
            get
            {
                return this.ordenCompra;
            }

            set
            {
                this.ordenCompra = value;
                base.PropertyChanged("OrdenCompra");
            }
        }
        private int idProveedor; 
        public int IdProveedor {
            get
            {
                return this.idProveedor;
            }

            set
            {
                this.idProveedor = value;
                base.PropertyChanged("IdProveedor");
            }
        }

        private miSCO.IPoliza poliza;
        public miSCO.IPoliza Poliza {

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
        private string concepto;
        public string Concepto
        {
            get
            {
                return this.concepto;
            }

            set
            {
                this.concepto = value;
                base.PropertyChanged("Concepto");
            }
        }
    }
}
