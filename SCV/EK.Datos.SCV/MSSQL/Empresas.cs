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
    public class Empresas
        : dk.DAOBaseGeneric<m.IEmpresa>, d.IEmpresas
    {
        private const string ENTITY_NAME = "scv_empresas";
        private const string USP_SCV_EMPRESAS_SELECT = "usp_scv_empresas_select";

        public Empresas(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_EMPRESAS_SELECT, null, ENTITY_NAME)
        { }
    }
}
