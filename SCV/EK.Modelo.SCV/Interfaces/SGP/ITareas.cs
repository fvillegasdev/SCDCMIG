using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.SGP.Interfaces
{

    [m.Kontrol.Table("sgp_tareas")]
    public interface ITareas : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdAsignadoA { get; set; }
        m.Kontrol.Interfaces.IUsuario AsignadoA { get; set; }
        [m.Kontrol.Column()]
        int IdWBS { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaEstimadaInicio { get; set; }
        [m.Kontrol.Column()]
        DateTime? FechaEstimadaFin { get; set; }
        [m.Kontrol.Column()]
        DateTime? HoraEstimadaInicio { get; set; }
        [m.Kontrol.Column()]
        DateTime? HoraEstimadaFin { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaRealInicio { get; set; }
        [m.Kontrol.Column()]
        DateTime? FechaRealFin { get; set; }
        [m.Kontrol.Column()]
        DateTime? HoraRealInicio { get; set; }
        [m.Kontrol.Column()]
        DateTime? HoraRealFin { get; set; }

        [m.Kontrol.Column()]
        string Descripcion { get; set; }

        [m.Kontrol.Column()]
        int? TiempoTotal { get; set; }

        [m.Kontrol.Column()]
        bool PresentacionGantt { get; set; }

        [m.Kontrol.Column()]
        int? IdPrioridad { get; set; }
        [m.Kontrol.Column()]
        int? IdTipoAvance { get; set; }
        [m.Kontrol.Column()]
        decimal? TotalAvance { get; set; }
        [m.Kontrol.Column()]
        int? MaximoValor { get; set; }

        [m.Kontrol.Column()]
        int IdFlujoAvance { get; set; }
        m.Kontrol.Interfaces.IItemGeneral FlujoAvance { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoAvance { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Prioridad { get; set; }
        
        [m.Kontrol.Column()]
        bool Contemplaravance { get; set; }

        [m.Kontrol.Column()]
        int? IdWorkFlow { get; set; }
        m.Kontrol.Interfaces.IWorkflow WorkFlow { get; set; }

        int TieneHijos { get; set; }
        decimal Importe { get; set; }

        List<m.SGP.Interfaces.ITareasDependencias> DependenciasAlInicio { get; set; }
        List<m.SGP.Interfaces.ITareasDependencias> DependenciasAlFin { get; set; }

        int IdProyecto { get; set; }
        m.SGP.Interfaces.IProyectos Proyecto { get; set; }

    }
}