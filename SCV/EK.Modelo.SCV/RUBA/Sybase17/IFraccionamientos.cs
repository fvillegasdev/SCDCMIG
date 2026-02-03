using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("Fraccionamiento")]
    public interface IFraccionamientos
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [EK.Modelo.Kontrol.Column()]
        new string ID { get; set; }

        [EK.Modelo.Kontrol.Column("LatitudLongitud", true)]
        string LatitudLongitud { get; set; }

        [EK.Modelo.Kontrol.Column("CapasGJson", true)]
        string CapasGJson { get; set; }

        string Direccion { get; set; }

        m.SCV.Interfaces.IPlaza Plaza { get; set; }

        [EK.Modelo.Kontrol.Column("Latitud", true)]
        string Latitud  { get; set; }

        [EK.Modelo.Kontrol.Column("Longitud", true)]
        string Longitud  { get; set; }
    }
}