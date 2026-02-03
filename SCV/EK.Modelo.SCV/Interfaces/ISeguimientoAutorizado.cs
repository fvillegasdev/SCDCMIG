using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Expedientes_Seguimientos_Autorizados")]
    public interface ISeguimientoAutorizado
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdSeguimiento { get; set; }

        [m.Kontrol.Column()]
        int? IdPosicion { get; set; }
        m.Kontrol.Interfaces.IPosicion Posicion { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
    }
}