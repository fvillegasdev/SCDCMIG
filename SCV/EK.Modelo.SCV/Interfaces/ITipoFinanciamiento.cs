using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_TipoFinanciamiento")]
    public interface ITipoFinanciamiento
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        List<ITipoFinanciamientoInstitucion> Instituciones { get; set; }
    }
}