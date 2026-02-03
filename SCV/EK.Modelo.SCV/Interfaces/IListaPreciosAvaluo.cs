using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ListaPreciosAvaluo")]
    public interface IListaPreciosAvaluo
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }


        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        decimal? ValorAvaluo { get; set; }


        [m.Kontrol.Column()]
        DateTime? Vigencia { get; set; }

        [m.Kontrol.Column()]
        int? IdUbicacion { get; set; }

        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }

    }
}