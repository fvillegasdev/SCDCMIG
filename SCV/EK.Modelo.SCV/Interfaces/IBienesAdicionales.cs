using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sm_bien_adicional")]
    public interface IBienesAdicionales : m.Kontrol.Interfaces.IBaseKontrol
    {
        string desarrollo { get; set; }
        string ubicacion { get; set; }
        string tipo_bien_adicional { get; set; }
        string nom_siembra { get; set; }
        string nom_comercial { get; set; }
        bool entregado { get; set; }
    }
}
