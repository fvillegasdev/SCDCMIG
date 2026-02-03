using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.SGP.Interfaces
{

    [m.Kontrol.Table("sgp_proyectos")]
    public interface IProyectos : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        DateTime? FechaInicio { get; set; }
        [m.Kontrol.Column()]
        DateTime? FechaFin { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoVisualizacion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoVisualizacion { get; set; }

        [m.Kontrol.Column()]
        int? IdTipo { get; set; }
        m.SGP.Interfaces.ITipoProyecto Tipo { get; set; }

        [m.Kontrol.Column()]
        int? IdResponsable { get; set; }
        m.Kontrol.Interfaces.IUsuario Responsable { get; set; }

        [m.Kontrol.Column()]
        int? IdAsignadoA { get; set; }
        m.Kontrol.Interfaces.IUsuario AsignadoA { get; set; }

        [m.Kontrol.Column()]
        int? IdEstatusProyecto { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusProyecto { get; set; }
        
        [m.Kontrol.Column()]
        string Descripcion { get; set; }

        List<m.SGP.Interfaces.IColaboradores> Colaboradores { get; set; }
        List<m.Kontrol.Interfaces.IPersonalizarCampo_Valor> CUSTOMFORM { get; set; }

        int TotalComentarios { get; set; }
        int TotalColaboradores { get; set; }

        string Foto { get; set; }
    }
}