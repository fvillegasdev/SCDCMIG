using System;
using EK.Modelo.Kontrol;
using EK.Modelo.SBO.Interfaces;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SBO
{
    public class Bancos : BaseKontrol, IBancos
    {
        private string descripcion = string.Empty;
        private string sucursal = string.Empty;
        private string direccion = string.Empty;
        private string telefono1 = string.Empty;
        private string extTel = string.Empty;
        private string responsable = string.Empty;
        private int? idBancoSAT;
        private IItemGeneral bancoSAT;
        private string bancoExtranjero;
        private string swift = string.Empty;
        private string sPEUA = string.Empty;
        private int? idLocalidad;
        private ILocalidad localidad;

        public Bancos()
            : base() {
        }

        public string BancoExtranjero
        {
            get
            {
                return this.bancoExtranjero;
            }

            set
            {
                this.bancoExtranjero = value;
                base.PropertyChanged("BancoExtranjero");
            }
        }

        public int? IdBancoSAT
        {
            get
            {
                return this.idBancoSAT;
            }

            set
            {
                this.idBancoSAT = value;
                base.PropertyChanged("IdBancoSAT");
            }
        }

        public IItemGeneral BancoSAT
        {
            get
            {
                return this.bancoSAT;
            }

            set
            {
                this.bancoSAT = value;
                base.PropertyChanged("BancoSAT");
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
                this.descripcion = value;
                base.PropertyChanged("Descripcion");
            }
        }

        public string Direccion
        {
            get
            {
                return this.direccion;
            }

            set
            {
                this.direccion = value;
                base.PropertyChanged("Direccion");
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

        public string SPEUA
        {
            get
            {
                return this.sPEUA;
            }

            set
            {
                this.sPEUA = value;
                base.PropertyChanged("SPEUA");
            }
        }

        public string Sucursal
        {
            get
            {
                return this.sucursal;
            }

            set
            {
                this.sucursal = value;
                base.PropertyChanged("Sucursal");
            }
        }

        public string Swift
        {
            get
            {
                return this.swift;
            }

            set
            {
                this.swift = value;
                base.PropertyChanged("Swift");
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
                return this.extTel;
            }

            set
            {
                this.extTel = value;
                base.PropertyChanged("ExtTel");
            }
        }


        public int? IdLocalidad
        {
            get
            {
                return this.idLocalidad;
            }

            set
            {
                this.idLocalidad = value;
                base.PropertyChanged("IdLocalidad");
            }
        }

        public ILocalidad Localidad
        {
            get
            {
                return this.localidad;
            }

            set
            {
                this.localidad = value;
                base.PropertyChanged("Localidad");
            }
        }
    }
}
