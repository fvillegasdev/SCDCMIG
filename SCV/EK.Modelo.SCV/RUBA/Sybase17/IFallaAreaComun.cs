using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_falla_area_comun")]
    public interface IFallaAreaComun : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("desc_falla", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("desc_falla")]
        string Descripcion { get; set; }

        [m.Kontrol.Column("duracion_garantia")]
        int? DuracionGarantia { get; set; }

        [m.Kontrol.Column("clave_falla")]
        int Clave { get; set; }
    }
}
