using miKontrol = EK.Modelo.Kontrol.Interfaces;
namespace EK.Modelo.SCP.Interfaces
{
    public interface IProveedor 
        : miKontrol.IBaseKontrol
    {
        string NombreCorto { get; set; }
    }
}