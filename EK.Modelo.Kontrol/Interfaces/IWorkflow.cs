using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("FlujoTrabajo")]
    public interface IWorkflow 
        : IBaseKontrol
    {
        [Column("IdTipo")]
        int IdTipo { get; set; }

        ITipoWorkflow Tipo { get; set; }

        List<ITarea> Tareas { get; set; }

        List<INotificadores> Notificadores { get; set; }





    }
}