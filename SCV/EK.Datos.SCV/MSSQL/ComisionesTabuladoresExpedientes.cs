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
    public class ComisionesTabuladoresExpedientes :
         d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionesTabuladoresExpedientes>,
        d.SCV.Interfaces.IComisionesTabuladoresExpedientes
    {
        private const string ENTITY_NAME = "scv_ComisionesTabuladoresExpedientes";
        private const string USP_SCV_COMISIONES_SELECT = "usp_scv_ComisionesTabuladoresExpedientes";

        public ComisionesTabuladoresExpedientes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
                : base(factory, helper, USP_SCV_COMISIONES_SELECT, null, ENTITY_NAME)
        { }


    }
}
