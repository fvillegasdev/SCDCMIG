using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ExpedientesRelacionados : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IExpedienteRelacionado>
        , d.SCV.Interfaces.IExpedientesRelacionados
    {
        private const string USP_SCV_EXPEDIENTES_RELACIONADOS_SELECT = "usp_scv_Expedientes_Posiciones_Relacionados_select";
        public ExpedientesRelacionados(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_EXPEDIENTES_RELACIONADOS_SELECT, null, "scv_Expedientes_Posiciones_Relacionados")
        { }
    }
}