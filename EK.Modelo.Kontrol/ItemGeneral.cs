using System;
using EK.Modelo.Kontrol.Interfaces;
namespace EK.Modelo.Kontrol
{
    public class ItemGeneral : BaseKontrol, IItemGeneral
    {
        private IItemGeneral catalogo;
        private int ?idCatalogo;
        private string icono;
        private string color;
        private string bgColor;

        public IItemGeneral Catalogo
        {
            get
            {
                return this.catalogo;
            }

            set
            {
                this.catalogo = value;
                base.PropertyChanged("Catalogo");
            }
        }

        public int? IdCatalogo
        {
            get
            {
                return this.idCatalogo;
            }

            set
            {
                this.idCatalogo = value;
                base.PropertyChanged("IdCatalogo");
            }
        }

        public string Icono
        {
            get
            {
                return this.icono;
            }

            set
            {
                this.icono = value;
                base.PropertyChanged("Icono");
            }
        }

        public string Color
        {
            get
            {
                return this.color;
            }

            set
            {
                this.color = value;
                base.PropertyChanged("Color");
            }
        }

        public string BGColor
        {
            get
            {
                return this.bgColor;
            }

            set
            {
                this.bgColor = value;
                base.PropertyChanged("BGColor");
            }
        }

    }
}