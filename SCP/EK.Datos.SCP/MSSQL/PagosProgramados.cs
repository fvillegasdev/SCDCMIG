using db = EK.Datos.Kontrol.Interfaces;
using im = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCP.MSSQL
{
    public partial class PagosProgramados 
        : EK.Datos.Kontrol.DAOBase, Interfaces.IPagosProgramados
    {
        private const string SP_PAGOS_PROGRAMADOS_SELECT = "sp_pagos_programados_select";

        public PagosProgramados(im.IContainerFactory factory, db.IDBHelper helper)
        {
            base.factory = factory;
            base.helper = helper;
        }
    }
}