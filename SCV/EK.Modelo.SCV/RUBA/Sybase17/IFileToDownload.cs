using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    public interface IFileToDownload : m.Kontrol.Interfaces.IBaseKontrol
    {
        int IdExpediente { get; set; }
        string TipoExt { get; set; }
        string filename_download { get; set; }
    }
}
