//using db = EK.Datos.Kontrol.Interfaces;
//using im = EK.Modelo.Kontrol.Interfaces;

//namespace EK.Datos.SCP.Sybase
//{
//    public partial class PagosProgramados : Interfaces.IPagosProgramados
//    {
//        private const string USP_PAGOS_PROGRAMADOS_SELECT = "{call usp_pagos_programados_select(?,?,?,?,?,?)}";
//        private db.IDBHelper helper;

//        public PagosProgramados(im.IContainerFactory factory, db.IDBHelper helper)
//        {
//            this.helper = new Kontrol.Sybase.DBHelper(factory);
//        }
//    }
//}