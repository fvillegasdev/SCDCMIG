using System;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("PersonalizarCamposSecciones")]
    public interface IPersonalizarCamposSecciones: IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdTipoEntidad { get; set; }

        [m.Kontrol.Column()]
        int Orden { get; set; }

        [m.Kontrol.Column()]
        bool Visible { get; set; }

        [m.Kontrol.Column()]
        int? xs { get; set; }

        [m.Kontrol.Column()]
        int? sm { get; set; }

        [m.Kontrol.Column()]
        int? md { get; set; }

        [m.Kontrol.Column()]
        int? lg { get; set; }

        [m.Kontrol.Column()]
        string Size { get; set; }

        [m.Kontrol.Column()]
        string Icono { get; set; }
    }
}

