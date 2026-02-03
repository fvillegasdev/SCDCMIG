using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.MSSQL
{
    public class ComisionesAjustes:
         d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionesAjustes>, d.SCV.Interfaces.IComisionesAjustes
    {
        private const string ENTITY_NAME = "scv_ComisionesAjustes";
        private const string USP_SCV_COMISIONES_SELECT = "usp_scv_ComisionesAjustes_select";

        public ComisionesAjustes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
                : base(factory, helper, USP_SCV_COMISIONES_SELECT, null, ENTITY_NAME)
        { }


    }
}
