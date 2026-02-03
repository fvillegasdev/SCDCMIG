using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_checklists_control")]
    public interface IChecklistControl : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdChecklist { get; set; }

        [m.Kontrol.Column("CulminadoPor")]
        int? IdCulminadoPor { get; set; }

        IBaseUsuario CulminadoPor { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaCulminado { get; set; }

        [m.Kontrol.Column()]
        bool? Revisado { get; set; }

        [m.Kontrol.Column("RevisadoPor")]
        int? IdRevisadoPor { get; set; }
        
        IBaseUsuario RevisadoPor { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaRevisado { get; set; }

        [m.Kontrol.Column()]
        int? TotalAvance { get; set; }

        int TotalComentarios { get; set; }
        int TotalArchivos { get; set; }

        [m.Kontrol.Column()]
        int? IdEstatusChecklist { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusChecklist { get; set; }

        [m.Kontrol.Column()]
        int? IdFlujoAutorizacion { get; set; }
        m.Kontrol.Interfaces.IWorkflow FlujoAutorizacion { get; set; }

        [m.Kontrol.Column()]
        string Modulo { get; set; }

        [m.Kontrol.Column()]
        string EntityType { get; set; }

        [m.Kontrol.Column()]
        int EntityId { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaCompromiso { get; set; }
    }
}
