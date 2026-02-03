namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IFavorito
        : IBaseKontrol
    {
        string Titulo { get; set; }
        string Icono { get; set; }
        string Enlace { get; set; }

        FavoritoTypeEnum Tipo { get; set; }
        IFavorito Padre { get; set; }

        int? IdPadre{ get; set; }
    }
}

namespace EK.Modelo.Kontrol.Interfaces
{
    public enum FavoritoTypeEnum {
        Item = 1,
        Folder = 2
    }
}