using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_falla_area_comun")]

    public interface IFallasAreasComunes
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("clave_falla ")]
        string Clave { get; set; }
        [m.Kontrol.Column("id_area_falla ")]
        string IdAreaFalla { get; set; }
        [m.Kontrol.Column("desc_falla")]
        string Descripcion { get; set; }
        [m.Kontrol.Column("duracion_garantia")]
        string DuracionGarantia { get; set; }
        [m.Kontrol.Column("impacto_falla")]
        string ImpactoFalla { get; set; }
    }
}
