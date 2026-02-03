//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.Kontrol
//{
//    public class Asentamientos : BaseUsuario, IBaseKontrol, IAsentamiento
//    {
//        private string cp;

//        public string CP
//        {
//            get { return cp; }
//            set
//            {
//                cp = value;
//                base.PropertyChanged("CP");
//            }
//        }

//        private string clave;

//        public string Clave
//        {
//            get { return clave; }
//            set
//            {
//                clave = value;
//                base.PropertyChanged("Clave");
//            }
//        }

//        private string descripcion;

//        public string Descripcion
//        {
//            get { return descripcion; }
//            set
//            {
//                descripcion = value;
//                base.PropertyChanged("Descripcion");
//            }
//        }

//        private int? idLocalidad;

//        public int? IdLocalidad
//        {
//            get { return idLocalidad; }
//            set
//            {
//                idLocalidad = value;
//                base.PropertyChanged("IdLocalidad");
//            }
//        }

//        private ILocalidad localidad;

//        public ILocalidad Localidad
//        {
//            get { return localidad; }
//            set
//            {
//                localidad = value;
//                base.PropertyChanged("Localidad");
//            }
//        }
//    }
//}