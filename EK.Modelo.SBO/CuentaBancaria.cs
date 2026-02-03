using EK.Modelo.Kontrol;
using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SBO.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SBO
{
    public class CuentaBancaria : BaseKontrol, ICuentaBancaria
    {

        private string centrocosto;
        private string clabe;
        private int clasificacion;
        private string contrato;
        private string cuentacontable;
        private string descripcion;
        private DateTime? fechainicio;
        private IBancos banco;
        private int idbanco;
        private int idcentrocosto;
        private int idcuentacontable;
        private IItemGeneralValores moneda;
        private int idmoneda;
        private int idtipocuenta;
        private IItemGeneralValores tipopoliza;
        private int idtipopoliza;
        private string lugaremision;
        private string nombreClasificacion;
        private string plaza;
        private string referencia;
        private string sucursalOrigen;
        private IItemGeneralValores tipocuenta;
        private string chequeFisico;
        private string cuentabanco;
        private string chequeElectronico;
        private string bancaElectronica;
        private string responsable;
        private string telefono1;
        private string exttel;
        private int cuentaTercero;
        private ICompania compania;
        public CuentaBancaria()
            : base() {
        }

        public string CentroCosto
        {
            get
            {
                return this.centrocosto;
            }

            set
            {
                this.centrocosto = value;
                base.PropertyChanged("CentroCosto");
            }
        }

        public string Clabe
        {
            get
            {
                return this.clabe;
            }

            set
            {
                this.clabe= value;
                base.PropertyChanged("Clabe");
            }
        }
        public int Clasificacion
        {
            get
            {
                return this.clasificacion;
            }

            set
            {
                this.clasificacion = value;
                base.PropertyChanged("Clasificacion");
            }
        }
        public string Contrato
        {
            get
            {
                return this.contrato;
            }

            set
            {
                this.contrato = value;
                base.PropertyChanged("Contrato");
            }
        }
        public string CuentaContable
        {
            get
            {
                return this.cuentacontable;
            }

            set
            {
                this.cuentacontable = value;
                base.PropertyChanged("CuentaContable");
            }
        }
       public string Descripcion
        {
            get
            {
                return this.descripcion;
            }

            set
            {
                this.descripcion= value;
                base.PropertyChanged("Descripcion");
            }
        }
        public DateTime? FechaInicio
        {
            get
            {
                return this.fechainicio;
            }

            set
            {
                this.fechainicio= value;
                base.PropertyChanged("FechaInicio");
            }
        }
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
        public int IdCentroCosto
        {
            get
            {
                return this.idcentrocosto;
            }

            set
            {
                this.idcentrocosto = value;
                base.PropertyChanged("IdCentroCosto");
            }
        }
        public int IdCuentaContable
        {
            get
            {
                return this.idcuentacontable;
            }

            set
            {
                this.idcuentacontable = value;
                base.PropertyChanged("IdCuentaContable");
            }
        }
        public IItemGeneralValores Moneda
        {
            get
            {
                return this.moneda;
            }

            set
            {
                this.moneda = value;
                base.PropertyChanged("Moneda");
            }
        }
        public int IdTipoCuenta
        {
            get
            {
                return this.idtipocuenta;
            }

            set
            {
                this.idtipocuenta = value;
                base.PropertyChanged("IdTipoCuenta");
            }
        }
        public IItemGeneralValores TipoPoliza
        {
            get
            {
                return this.tipopoliza;
            }

            set
            {
                this.tipopoliza = value;
                base.PropertyChanged("IdTipoPoliza");
            }
        }
        public string LugarEmision
        {
            get
            {
                return this.lugaremision;
            }

            set
            {
                this.lugaremision = value;
                base.PropertyChanged("LugarEmision");
            }
        }
        public string NombreClasificacion
        {
            get
            {
                return this.nombreClasificacion;
            }

            set
            {
                this.nombreClasificacion = value;
                base.PropertyChanged("NombreClasificacion");
            }
        }
        public string Plaza
        {
            get
            {
                return this.plaza;
            }

            set
            {
                this.plaza = value;
                base.PropertyChanged("Plaza");
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
                base.PropertyChanged("Referencia");
            }
        }
        public string SucursalOrigen
        {
            get
            {
                return this.sucursalOrigen;
            }

            set
            {
                this.sucursalOrigen = value;
                base.PropertyChanged("SucursalOrigen");
            }
        }
        public IItemGeneralValores TipoCuenta
        {
            get
            {
                return this.tipocuenta;
            }

            set
            {
                this.tipocuenta = value;
                base.PropertyChanged("TipoCuenta");
            }
        }
      
        public string ChequeFisico
        {
            get
            {
                return this.chequeFisico;
            }

            set
            {
                this.chequeFisico = value;
                base.PropertyChanged("ChequeFisico");
            }
        }
        public string CuentaBanco
        {
            get
            {
                return this.cuentabanco;
            }

            set
            {
                this.cuentabanco = value;
                base.PropertyChanged("CuentaBanco");
            }
        }

        public string ChequeElectronico
        {
            get
            {
                return this.chequeElectronico;
            }

            set
            {
                this.chequeElectronico = value;
                base.PropertyChanged("ChequeElectronico");
            }
        }

        public string BancaElectronica
        {
            get
            {
                return this.bancaElectronica;
            }

            set
            {
                this.bancaElectronica = value;
                base.PropertyChanged("BancaElectronica");
            }
        }

        public string Responsable
        {
            get
            {
                return this.responsable;
            }

            set
            {
                this.responsable = value;
                base.PropertyChanged("Responsable");
            }
        }

        public string Telefono1
        {
            get
            {
                return this.telefono1;
            }

            set
            {
                this.telefono1 = value;
                base.PropertyChanged("Telefono1");
            }
        }

        public string ExtTel
        {
            get
            {
                return this.exttel;
            }

            set
            {
                this.exttel = value;
                base.PropertyChanged("ExtTel");
            }
        }

        public int CuentaTercero
        {
            get
            {
                return this.cuentaTercero;
            }

            set
            {
                this.cuentaTercero = value;
                base.PropertyChanged("CuentaTercero");
            }
        }

        public int IdBanco {

            get
            {
                return this.idbanco;
            }

            set
            {
                this.idbanco = value;
                base.PropertyChanged("IdBanco");
            }
        }
        public int IdMoneda {
            get
            {
                return this.idmoneda;
            }

            set
            {
                this.idmoneda = value;
                base.PropertyChanged("IdMoneda");
            }
        }
        public int IdTipoPoliza {
            get
            {
                return this.idtipopoliza;
            }

            set
            {
                this.idtipopoliza = value;
                base.PropertyChanged("IdTipoPoliza");
            }
        }

        public ICompania Compania
        {
            get { return this.compania; }
            set { this.compania = value; }
        }
    }
}
