using EK.Modelo.Kontrol;
using EK.Modelo.SCO.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SCO
{
    public class Poliza 
        : BaseKontrolCompania, IPoliza
    {
        private int numeroPoliza;
        private IItemGeneralValores tipoPoliza;
        private DateTime fechaPoliza;
        private decimal cargos;
        private decimal abonos;
        private int anio;
        private int mes;
        private string generadoPor;
        private string concepto;

        public Poliza():base()
        {
            
        }

        public int NumeroPoliza {
            get
            {
                return this.numeroPoliza;
            }

            set
            {
                this.numeroPoliza = value;
                base.PropertyChanged("NumeroPoliza");
            }
        }
        public IItemGeneralValores TipoPoliza {
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
        public DateTime FechaPoliza {
            get
            {
                return this.fechaPoliza;
            }

            set
            {
                this.fechaPoliza = value;
                base.PropertyChanged("FechaPoliza");
            }

        }
        public decimal Cargos {
            get
            {
                return this.cargos;
            }

            set
            {
                this.cargos = value;
                base.PropertyChanged("Cargos");
            }
        }
        public decimal Abonos {
            get
            {
                return this.abonos;
            }

            set
            {
                this.abonos = value;
                base.PropertyChanged("Abonos");
            }

        }

      
        public int Anio {
            get
            {
                return this.anio;
            }

            set
            {
                this.anio = value;
                base.PropertyChanged("Anio");
            }
        }

        public int Mes
        {
            get
            {
                return this.mes;
            }

            set
            {
                this.mes = value;
                base.PropertyChanged("Mes");
            }
        }
        public string  GeneradoPor
        {
            get
            {
                return this.generadoPor;
            }

            set
            {
                this.generadoPor = value;
                base.PropertyChanged("GeneradoPor");
            }
        }

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
