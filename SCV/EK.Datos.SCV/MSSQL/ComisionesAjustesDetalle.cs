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
    public class ComisionesAjustesDetalle :
         d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionesAjustesDetalle>, d.SCV.Interfaces.IComisionesAjustesDetalle
    {
        private const string ENTITY_NAME = "scv_ComisionesAjustesDetalle";
        private const string USP_SCV_COMISIONES_AJUSTE_SELECT = "usp_scv_ComisionesAjustesDetalle_select";

        public ComisionesAjustesDetalle(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
                : base(factory, helper, USP_SCV_COMISIONES_AJUSTE_SELECT, null, ENTITY_NAME)
        { }


    }
}
