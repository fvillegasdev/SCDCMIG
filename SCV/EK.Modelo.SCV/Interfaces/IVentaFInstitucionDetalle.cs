using EK.Modelo.Kontrol.Interfaces;
namespace EK.Modelo.SCV.Interfaces
{
    public interface IVentaFInstitucionDetalle : IBaseKontrol
    {
        int IdVenta { get; set; }
        int IdVentaFInstitucion { get; set; }
        int IdConcepto { get; set; }
        IConceptosCredito Concepto { get; set; }
        bool Credito { get; set; }
        string ValorEstimado { get; set; }
        string Valor { get; set; }

        string ValorAutorizado { get; set; }
        int? IdVentaVersion { get; set; }
        IVentaVersion VentaVersion { get; set; }
    }
}