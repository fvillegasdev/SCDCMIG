using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.SGP.Interfaces
{
    [m.Kontrol.Table("sgp_tareas_dependencias")]
    public interface ITareasDependencias : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdTarea { get; set; }
        [m.Kontrol.Column()]
        int IdTareaDependencia { get; set; }
        m.SGP.Interfaces.ITareas TareaDependencia { get; set; }
        [m.Kontrol.Column()]
        int IdTipoDependencia { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoDependencia { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

    }
}