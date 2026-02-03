//using diSCO = EK.Datos.SCO.Interfaces;
//using dKontrol = EK.Datos.Kontrol;
//using mKontrol = EK.Modelo.Kontrol;

//namespace EK.Datos.SCO.Sybase
//{
//    public partial class CentroCosto : diSCO.ICentroCosto
//    {
//        private const string USP_CENTROSCOSTO_SELECT = "{call usp_centroscosto_select(?)}";
//        private dKontrol.Interfaces.IDBHelper helper;

//        public CentroCosto(mKontrol.Interfaces.IContainerFactory factory, dKontrol.Interfaces.IDBHelper helper)
//        {
//            this.helper = new dKontrol.Sybase.DBHelper(factory);

//        }
//    }
//}