using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class SCVNotificacion
        : dk.DAOBaseGeneric<m.ISCVNotification>, d.ISCVNotificacion
    {
        private const string ENTITY_NAME = "Notificaciones";
        private const string USP_NOTIFICADORES_SELECT = "usp_notificaciones_select"; 

        public SCVNotificacion(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_NOTIFICADORES_SELECT, null, ENTITY_NAME)
        { }
    }
}