using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IVentaFinanciamientoInstitucion : m.Kontrol.Interfaces.IBaseKontrol
    {
        int IdVenta { get; set; }
        int IdVentaFinanciamiento { get; set; }
        int IdInstitucion { get; set; }
        IInstitucion Institucion { get; set; }
        string Comentarios { get; set; }
        decimal MontoCredito { get; set; }
        int? IdVentaVersion { get; set; }
        IVentaVersion VentaVersion { get; set; }
        List<IVentaFInstitucionDetalle> Conceptos { get; set; }
    }
}