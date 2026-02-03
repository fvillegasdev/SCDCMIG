using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SBO.Interfaces
{
    public interface IBancos: IBaseKontrol
    {
      string Descripcion { get; set; }
      string Sucursal { get; set; }
      string Direccion { get; set; }
      string Telefono1 { get; set; }
      string ExtTel { get; set; }
      string Responsable { get; set; }
      int? IdBancoSAT { get; set; }
      IItemGeneral BancoSAT { get; set; }
      string BancoExtranjero { get; set; }
      string Swift { get; set; }
      string SPEUA { get; set; }
      int? IdLocalidad { get; set; }
      ILocalidad Localidad { get; set; }
    }
}
