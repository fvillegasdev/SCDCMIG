using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class CausasFallas :
        d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ICausaFalla>, d.SCV.Interfaces.ICausasFallas
    {
        private const string USP_SPV_CAUSAS_FALLAS_SELECT = "usp_spv_Causas_Fallas_select";
        public CausasFallas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_CAUSAS_FALLAS_SELECT, null, "sv_causas_falla")
        { }
    }
}