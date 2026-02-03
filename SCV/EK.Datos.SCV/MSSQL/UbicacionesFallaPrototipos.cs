using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class UbicacionesFallaPrototipos : dk.DAOBaseGeneric<m.IUbicacionFallaPrototipo>, d.IUbicacionesFallaPrototipos
    {
        private const string ENTITY_NAME = "spv_UbicacionesFalla_Prototipos";
        private const string USP_SCV_UFP_SELECT = "usp_spv_UbicacionesFalla_Prototipos_select";

        public UbicacionesFallaPrototipos(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_UFP_SELECT, null, ENTITY_NAME)
        {


        }
    }
}