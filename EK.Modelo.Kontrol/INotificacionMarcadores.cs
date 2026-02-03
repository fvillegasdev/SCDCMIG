using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("sv_notificacion_marcadores")]
    public interface INotificacionMarcadores
        : IBaseKontrol
    {
        [Column()]
        int idnotificacion { get; set; }

        [Column()]
        string marcador { get; set; }

        [Column()]
        string valor { get; set; }
        //new string Clave { get; set; }

    }
}
