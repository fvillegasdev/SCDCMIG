using System;
using System.Collections.Generic;
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
    public class ChecklistsControl : dk.DAOBaseGeneric<m.IChecklistControl>, d.IChecklistsControl
    {
        private const string ENTITY_NAME = "spv_checklists_control";
        private const string USP_SPV_CHECKLISTCONTROL_SELECT = "usp_spv_checklists_control_select";

        public ChecklistsControl(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SPV_CHECKLISTCONTROL_SELECT, null, ENTITY_NAME)
        {
        }

    }
}
