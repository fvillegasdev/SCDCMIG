using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using mki = EK.Modelo.Kontrol.Interfaces;
using dki = EK.Datos.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class PlanesPagosConfiguracion
        :  dk.DAOBaseGeneric<m.IPlanPagosConfiguracion>, d.IPlanesPagosConfiguracion
    {
        private const string ENTITY_NAME = "scv_Planes_Pagos_Configuracion";
        private const string USP_SCV_PLANES_PAGOS_CONFIGURACION_SELECT = "usp_scv_Planes_Pagos_Configuracion_select";

        public PlanesPagosConfiguracion(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_PLANES_PAGOS_CONFIGURACION_SELECT, null, ENTITY_NAME)
        { }
    }
}
