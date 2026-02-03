//using m = EK.Modelo;

//namespace EK.Modelo.SCV
//{
//    public class CaracteristicaAdicional
//        : m.Kontrol.BaseKontrol,
//        m.SCV.Interfaces.ICaracteristicaAdicional
//    {
//        private int idTipoCaracteristica;
//        private m.Kontrol.Interfaces.IItemGeneral tipoCaracteristica;
//        private int idTipoEntidad;
//        private m.Kontrol.Interfaces.IItemGeneral tipoEntidad;
//        private bool escriturado;

//        public int IdTipoCaracteristica
//        {
//            get { return idTipoCaracteristica; }
//            set
//            {
//                idTipoCaracteristica = value;
//                base.PropertyChanged("IdTipoCaracteristica");
//            }
//        }

//        public m.Kontrol.Interfaces.IItemGeneral TipoCaracteristica
//        {
//            get { return tipoCaracteristica; }
//            set
//            {
//                tipoCaracteristica = value;
//                base.PropertyChanged("TipoCaracteristica");
//            }
//        }

//        public bool Escriturado
//        {
//            get { return escriturado; }
//            set
//            {
//                escriturado = value;
//                base.PropertyChanged("Escriturado");
//            }
//        }

//        public int IdTipoEntidad
//        {
//            get { return idTipoEntidad; }
//            set
//            {
//                idTipoEntidad = value;
//                base.PropertyChanged("IdTipoEntidad");
//            }
//        }

//        public m.Kontrol.Interfaces.IItemGeneral TipoEntidad
//        {
//            get { return tipoEntidad; }
//            set
//            {
//                tipoEntidad = value;
//                base.PropertyChanged("TipoEntidad");
//            }
//        }
//    }
//}