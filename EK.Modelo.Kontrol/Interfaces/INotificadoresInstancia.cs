using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("NotificadoresInstancia")]
    public interface INotificadoresInstancia : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdTareaInstancia { get; set; }


        [m.Kontrol.Column()]
        int? IdTipoPuesto { get; set; }


        [m.Kontrol.Column()]
        string Entidad { get; set; }

        [m.Kontrol.Column()]
        int IdRegistro { get; set; }


        [m.Kontrol.Column()]
        int IdFlujoAutorizacionInstancia { get; set; }

        [m.Kontrol.Column()]
        int IdTipoNotificador { get; set; }


        [Column()]
        string Expresion { get; set; }


        [Column()]
        string ExpresionMensaje { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        IItemGeneral TipoNotificador { get; set; }
        IItemGeneral Registro { get; set; }
        IItemGeneral TipoPuesto { get; set; }
        IWorkflowInstance FlujoAutorizacion { get; set; }
    }
}