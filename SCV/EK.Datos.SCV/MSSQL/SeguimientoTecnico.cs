using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class SeguimientoTecnico
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ISeguimientoTecnico>, d.SCV.Interfaces.ISeguimientoTecnico
    {
        private const string USP_SEGUIMIENTO_TECNICO = "usp_scv_seguimiento_tecnico_select";

        public SeguimientoTecnico(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SEGUIMIENTO_TECNICO, string.Empty, "segumientotecnico")
        {

        }
    }
}