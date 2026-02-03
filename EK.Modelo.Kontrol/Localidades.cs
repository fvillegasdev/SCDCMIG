//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.Kontrol
//{
//    public class Localidades : BaseKontrol, ILocalidad
//    {
//        public Localidades(IContainerFactory factory) : base()
//        {
//            //this.estatus = factory.GetInstance<IItemGeneral>();
//        }

//        private string tipo;
//        private int relacion;
//        private string descripcion;
//        private string nombre;

//        public string Tipo
//        {
//            get
//            {
//                return this.tipo;
//            }

//            set
//            {
//                this.tipo = value;
//                base.PropertyChanged("Tipo");
//            }
//        }

//        public int Relacion
//        {
//            get
//            {
//                return this.relacion;
//            }

//            set
//            {
//                this.relacion = value;
//                base.PropertyChanged("Relacion");
//            }
//        }

//        public string Descripcion
//        {
//            get
//            {
//                return this.descripcion;
//            }

//            set
//            {
//                this.descripcion = value;
//                base.PropertyChanged("Descripcion");
//            }
//        }

//        public string Nombre
//        {
//            get
//            {
//                return this.nombre;
//            }

//            set
//            {
//                this.nombre = value;
//                base.PropertyChanged("Nombre");
//            }
//        }
//    }
//}