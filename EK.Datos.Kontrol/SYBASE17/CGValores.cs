using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class CGValores
        : d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IItemGeneral>, d.Kontrol.Interfaces.ICGValores
    {
        private const string USP_CATALOGOSGENERALESVALORES_SELECT = "usp_cgvalores_select";

        public CGValores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_CATALOGOSGENERALESVALORES_SELECT, null, "CatalogosGeneralesValores")
        { }


    }
}
