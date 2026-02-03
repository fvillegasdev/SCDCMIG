using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("FlujoTrabajoInstancia")]
    public interface IWorkflowInstance
        : IBaseKontrol
    {
        [Column()]
        int IdFlujo { get; set; }
        [Column("Estado")]
        string EstadoWF { get; set; }
        [Column()]
        int IdReferencia { get; set; }
        string LinkReferencia { get; set; }
        string DescripcionReferencia { get; set; }
        [Column()]
        string Referencia { get; set; }
        [Column()]
        int IdUserOwner { get; set; }
        [Column()]
        DateTime? FechaInicio { get; set; }
        [Column()]
        DateTime? FechaFin { get; set; }
        IWorkflow Workflow { get; set; }
         EK.Modelo.Kontrol.Interfaces.IUsuario UserOwner { get; set; }
        List<ITareaInstancia> Tareas { get; set; }
    }
}
