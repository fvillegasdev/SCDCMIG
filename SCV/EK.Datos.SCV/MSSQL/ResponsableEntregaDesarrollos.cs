using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using EK.Datos.Kontrol.Interfaces;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ResponsableEntregaDesarrollos
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IResponsableEntregaDesarrollo>, d.SCV.Interfaces.IResponsableEntregaDesarrollos
    {
        private const string USP_SPV_BASE_SELECT = "";

        public ResponsableEntregaDesarrollos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_BASE_SELECT, null, "")
        { }
       


    }
}