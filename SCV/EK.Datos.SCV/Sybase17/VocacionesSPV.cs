using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class VocacionesSPV
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IVocacionSPV>, d.SCV.Interfaces.IVocacionesSPV
    {
        private const string USP_SPV_ESTANDAR_SELECT = "usp_spv_vocaciones_select";
        public VocacionesSPV(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_ESTANDAR_SELECT, null, "sm_vocaciones")
        { }
    }
}