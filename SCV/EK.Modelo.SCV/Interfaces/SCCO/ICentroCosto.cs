using miKontrol = EK.Modelo.Kontrol.Interfaces;
namespace EK.Modelo.SCO.Interfaces
{
    public interface ICentroCosto : miKontrol.IBaseKontrol
    {
        string Descripcion { get; set; }
    }
}

