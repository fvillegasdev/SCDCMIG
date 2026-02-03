using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class PlantillasMails
        : DAOBaseGeneric<m.Kontrol.Interfaces.IPlantillasMails>, d.Kontrol.Interfaces.IPlantillasMails
    {
        private const string USP_PLANTILLASMAILS_SELECT = "usp_plantillasmails_select";

        public PlantillasMails(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_PLANTILLASMAILS_SELECT, null, "plantillasMails")
        { }
    }
}
