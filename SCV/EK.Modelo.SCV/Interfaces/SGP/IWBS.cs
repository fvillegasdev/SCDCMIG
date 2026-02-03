using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.SGP.Interfaces
{

    [m.Kontrol.Table("sgp_WBS")]
    public interface IWBS : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        int IdProyecto { get; set; }
        [m.Kontrol.Column()]
        int IdTiponodo { get; set; }
        [m.Kontrol.Column()]
        int? IdPadre { get; set; }
        [m.Kontrol.Column()]
        bool TieneHijos { get; set; }
        string Type { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoNodo { get; set; }      
        m.SGP.Interfaces.IWBS Padre { get; set; }
        List<m.SGP.Interfaces.IWBS> children { get; set; }

        bool PresentacionGantt { get; set; }
        bool Contemplaravance { get; set; }

        DateTime FechaInicio { get; set; }
        DateTime FechaFin { get; set; }
        DateTime HoraInicio { get; set; }
        DateTime HoraFin { get; set; }
        string Descripcion { get; set; }
        int TotalComentarios { get; set; }
        int TotalArchivos { get; set; }
        decimal Importe { get; set; }
        ITareas Tarea { get; set; }

        [m.Kontrol.Column("EstatusDashBoard", true)]
        String EstatusDashBoard { get; set; }
    }
}