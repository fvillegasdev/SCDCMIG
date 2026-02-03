using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.Sybase17
{
    public class CheckLists
        : dk.DAOBaseGeneric<m.ICheckList>, d.ICheckLists
    {
        private const string ENTITY_NAME = "CheckList";
        private const string USP_BASE_SELECT = "usp_spv_CheckList_select";

        public CheckLists(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_BASE_SELECT, null, ENTITY_NAME)
        { }
    }
}