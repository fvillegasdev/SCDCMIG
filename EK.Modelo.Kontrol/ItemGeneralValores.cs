using EK.Modelo.Kontrol.Interfaces;
namespace EK.Modelo.Kontrol
{
    public class ItemGeneralValores : BaseKontrol, IItemGeneralValores
    {
        public ItemGeneralValores(IContainerFactory factory)
            : base() { }

        private ItemGeneralValores seccion;

        public ItemGeneralValores Seccion
        {
            get { return seccion; }
            set
            {
                seccion = value;
                base.PropertyChanged("Seccion");
            }
        }

        private int? idSeccion;

        public int? IdSeccion
        {
            get { return idSeccion; }
            set
            {
                idSeccion = value;
                base.PropertyChanged("IdSeccion");
            }
        }

        private ItemGeneral catalogo;

        public ItemGeneral Catalogo
        {
            get { return catalogo; }
            set
            {
                catalogo = value;
                base.PropertyChanged("Catalogo");
            }
        }

        private int? idCatalogo;

        public int? IdCatalogo
        {
            get { return idCatalogo; }
            set
            {
                idCatalogo = value;
                base.PropertyChanged("IdCatalogo");
            }
        }

        private string valor;

        public string Valor
        {
            get { return valor; }
            set
            {
                valor = value;
                base.PropertyChanged("Valor");
            }
        }

        private string claveCatalogo;

        public string ClaveCatalogo
        {
            get { return claveCatalogo; }
            set { claveCatalogo = value; }
        }


        private string icono;
        private string color;
        private string bgcolor;

        public string Icono
        {
            get { return icono; }
            set { icono = value; }
        }

        public string Color
        {
            get { return color; }
            set { color = value; }
        }

        public string BGColor
        {
            get { return bgcolor; }
            set { bgcolor = value; }
        }


    }
}