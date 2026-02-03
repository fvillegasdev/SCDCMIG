using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.Kontrol.MSSQL
{
    public class Periodicidad
         : dk.DAOBaseGeneric<mki.IPeriodicidad>, dki.IPeriodicidad
    {
        private const string ENTITY_NAME = "Periodicidad";
        private const string USP_SCV_COMISIONES_PERIODICIDAD_SELECT = "usp_Periodicidad_select";

        public Periodicidad(mki.IContainerFactory factory, dki.IDBHelper helper)
             : base(factory, helper, USP_SCV_COMISIONES_PERIODICIDAD_SELECT, null, ENTITY_NAME)
        { }

    }
}
