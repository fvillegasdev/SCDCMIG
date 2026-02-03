using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class ContratistasUbicaciones
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IContratistaUbicacion>, d.SCV.Interfaces.IContratistasUbicaciones
    {
        private const string USP_SPV_CONTRATISTAS_UBICACIONES_SELECT = "usp_spv_Contratistas_Ubicaciones_select";
        public ContratistasUbicaciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_CONTRATISTAS_UBICACIONES_SELECT, null, "sv_contratista_lote")
        { }
    }
}