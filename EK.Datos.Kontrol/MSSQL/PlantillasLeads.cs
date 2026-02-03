using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class PlantillasLeads
        : DAOBaseGeneric<m.Kontrol.Interfaces.IPlantillasLeads>, d.Kontrol.Interfaces.IPlantillasLeads
    {
        private const string USP_PLANTILLASLEADS_SELECT = "usp_plantillasLeads_select";

        public PlantillasLeads(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_PLANTILLASLEADS_SELECT, null, "plantillasLeads")
        { }
    }
}
