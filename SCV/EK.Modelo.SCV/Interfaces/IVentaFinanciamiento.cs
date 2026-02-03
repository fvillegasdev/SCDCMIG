using System.Collections.Generic;
using mk = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IVentaFinanciamiento : mk.Interfaces.IBaseKontrol
    {
        int IdFinanciamiento { get; set; }
        ITipoFinanciamiento Financiamiento { get; set; }
        List<IVentaFinanciamientoInstitucion> FinanciamientoInstituciones { get; set; }
        int? IdVentaVersion { get; set; }
        IVentaVersion VentaVersion { get; set; }
    }
}