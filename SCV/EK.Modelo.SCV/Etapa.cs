//using m = EK.Modelo;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.SCV
//{
//    public class Etapa : m.Kontrol.BaseKontrol, m.SCV.Interfaces.IEtapa
//    {
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

//        private string nombreCorto;

//        public string NombreCorto
//        {
//            get { return nombreCorto; }
//            set
//            {
//                nombreCorto = value;
//                base.PropertyChanged("NombreCorto");
//            }
//        }

//        private int plazoEstandar;

//        public int PlazoEstandar
//        {
//            get { return plazoEstandar; }
//            set
//            {
//                plazoEstandar = value;
//                base.PropertyChanged("PlazoEstandar");
//            }
//        }

//        private int idEstatusUbicacion;

//        public int IdEstatusUbicacion
//        {
//            get { return idEstatusUbicacion; }
//            set
//            {
//                idEstatusUbicacion = value;
//                base.PropertyChanged("IdEstatusUbicacion");
//            }
//        }

//        private miKontrol.IItemGeneralValores estatusUbicacion;

//        public miKontrol.IItemGeneralValores EstatusUbicacion
//        {
//            get { return estatusUbicacion; }
//            set
//            {
//                estatusUbicacion = value;
//                base.PropertyChanged("EstatusUbicacion");
//            }
//        }
//    }
//}