namespace EK.Modelo.Kontrol.Interfaces
{
    public interface ILocalidad 
        : IBaseKontrol
    {
        string Tipo { get; set; }
        string CP { get; set; }

        string Descripcion { get; set; }
        int? IdPadre { get; set; }
        ILocalidad Padre { get; set; }
    }
}