using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class CG
         : d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.ICatalogoGeneral>, d.Kontrol.Interfaces.ICG
    {
        private const string USP_CATALOGOSGENERALES_SELECT = "usp_catalogosgenerales_select";

        public CG(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_CATALOGOSGENERALES_SELECT, null, "CatalogosGenerales")
        { }

    }
}
