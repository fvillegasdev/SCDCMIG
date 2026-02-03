using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("TareaInstancias")]
    public interface ITareaInstancia
        : IBaseKontrol
    {
        [Column()]
        int IdInstancia { get; set; }

        [Column()]
        string Comentarios { get; set; }

        [Column()]
        DateTime? FechaAprobacion { get; set; }

        [Column()]
        DateTime? FechaAsignacion { get; set; }

        [Column()]
        DateTime? FechaVigencia { get; set; }

        [Column("CompletadoPor")]
        int? IdCompletadoPor { get; set; }

        [Column()]
        int Orden { get; set; }

        [Column()]
        int DiasVigencia { get; set; }


        [Column()]
        string Expresion { get; set; }


        [Column()]
        string ExpresionMensaje { get; set; }



        int EstatusVigencia { get; set; }

        IUsuario CompletadoPor { get; set; }
        IWorkflowInstance Instancia { get; set; }
        List<INotificadoresInstancia> Autorizadores { get; set; }

    }
}