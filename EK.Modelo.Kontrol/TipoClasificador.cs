//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.Kontrol
//{
//    public class TipoClasificador : BaseKontrol, ITipoClasificador
//    {
//        private string nombre;

//        public string Nombre
//        {
//            get { return nombre; }
//            set
//            {
//                this.nombre = value;
//                base.PropertyChanged("Nombre");
//            }
//        }

//        private string clave;

//        public string Clave
//        {
//            get { return clave; }
//            set
//            {
//                this.clave = value;
//                base.PropertyChanged("Clave");
//            }
//        }

//        private string descripcion;

//        public string Descripcion
//        {
//            get { return descripcion; }
//            set { descripcion = value;
//                base.PropertyChanged("Descripcion");
//            }
//        }

//        private IItemGeneral catalogoClasificador;

//        public IItemGeneral CatalogoClasificador
//        {
//            get { return catalogoClasificador; }
//            set
//            {
//                this.catalogoClasificador = value;
//                base.PropertyChanged("CatalogoClasificador");
//            }
//        }

//        private int? idCatalogosClasificadores;

//        public int? IdCatalogosClasificadores
//        {
//            get { return idCatalogosClasificadores; }
//            set
//            {
//                this.idCatalogosClasificadores = value;
//                base.PropertyChanged("IdCatalogosClasificadores");
//            }
//        }
//    }
//}