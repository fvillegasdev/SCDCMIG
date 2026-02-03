using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.MSSQL
{
    public class ComisionesSeguimientoDetalle:
        d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionesSeguimientoDetalle>,d.SCV.Interfaces.IComisionesSeguimientoDetalle
    {
        private const string ENTITY_NAME = "scv_ComisionesSeguimientoDetalle";
        private const string USP_SCV_COMISIONES_DETALLE_SELECT = "usp_scv_ComisionesSeguimientoDetalle_select";


        public ComisionesSeguimientoDetalle(m.Kontrol.Interfaces.IContainerFactory factory,d.Kontrol.Interfaces.IDBHelper helper)
            :base(factory,helper,USP_SCV_COMISIONES_DETALLE_SELECT,null,ENTITY_NAME)
        { }
    }
}
