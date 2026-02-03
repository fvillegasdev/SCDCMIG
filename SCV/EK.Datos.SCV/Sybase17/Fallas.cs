using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class Fallas
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IFalla>, d.SCV.Interfaces.IFallas
    {
        private const string USP_SPV_FALLAS_SELECT = "usp_spv_fallas_select";
        public Fallas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_FALLAS_SELECT, null, "sv_fallas")
        { }
    }
}