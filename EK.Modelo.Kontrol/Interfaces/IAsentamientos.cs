namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IAsentamiento 
        : IBaseKontrol
    {
        string CP { get; set; }
        //string Descripcion { get; set; }

        int? IdLocalidad { get; set; }
        ILocalidad Localidad { get; set; }
    }
}