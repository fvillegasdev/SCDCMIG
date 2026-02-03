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
    public class CheckListsPlanAccion
        : dk.DAOBaseGeneric<m.ICheckListPlanAccion>, d.ICheckListsPlanAccion
    {
        private const string ENTITY_NAME = "spv_CheckLists_PlanAccion";
        private const string USP_BASE_SELECT = "usp_spv_CheckList_PlanAccion_select";

        public CheckListsPlanAccion(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_BASE_SELECT, null, ENTITY_NAME)
        { }
    }
}