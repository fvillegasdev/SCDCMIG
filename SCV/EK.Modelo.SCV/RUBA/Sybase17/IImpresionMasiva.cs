using System.Collections.Generic;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    public interface IImpresionMasiva : m.Kontrol.Interfaces.IBaseKontrol
    {
        List<m.SCV.Interfaces.IFileToDownload> detalles { get; set; }
    }
}
