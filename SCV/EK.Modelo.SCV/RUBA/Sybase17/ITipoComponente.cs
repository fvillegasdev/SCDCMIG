#if RUBA
using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_Tipo_Falla")]
    public interface ITipoComponente : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("desc_tipo_falla")]
        new string Nombre { get; set; }

        [m.Kontrol.Column("siglas")]
        new string Clave { get; set; }

        [m.Kontrol.Column("duracion_garantia")]
        int DuracionGarantia { get; set; }

        m.Kontrol.Interfaces.IItemGeneral UsoFalla { get; set; }

        [m.Kontrol.Column()]
        int IdUsoFalla { get; set; }
    }
}
#endif