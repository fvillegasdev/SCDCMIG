using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class TabuladoresConfiguracion
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITabuladoresConfiguracion>, d.SCV.Interfaces.ITabuladoresConfiguracion
    {
        private const string USP_TABULADORES_CONFIGURACION = "usp_scv_Tabuladores_Configuracion_select";

        public TabuladoresConfiguracion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_TABULADORES_CONFIGURACION, string.Empty, "scv_Tabulador_Configuracion")
        {

        }
    }
}
