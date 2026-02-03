using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class Componentes
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComponente>, d.SCV.Interfaces.IComponentes
    {
        private const string USP_SPV_COMPONENTES_SELECT = "usp_spv_Componentes_select";
        public Componentes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_COMPONENTES_SELECT, null, "spv_equivalencias_familias")
        { }
    }
}