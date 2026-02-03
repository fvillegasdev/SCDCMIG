using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class SegmentosSPV
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ISegmento>, d.SCV.Interfaces.ISegmentos
    {
        private const string USP_SPV_ESTANDAR_SELECT = "usp_segmentos_select";
        public SegmentosSPV(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_ESTANDAR_SELECT, null, "sm_segmentos")
        { }
    }
}