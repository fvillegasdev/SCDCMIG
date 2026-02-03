using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Indicadores
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IIndicadores>, d.SCV.Interfaces.IIndicadores
    {
        private const string USP_INDICADORES = "usp_scv_Indicadores_select";

        public Indicadores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_INDICADORES, string.Empty, "indicadores")
        {

        }
    }
}
