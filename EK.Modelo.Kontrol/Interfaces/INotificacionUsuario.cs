using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("sv_notificacion_usuario")]
    public interface INotificacionUsuario
          : IBaseKontrol
    {
        [Column()]
        int idnotificacion { get; set; }

        [Column()]
        int num { get; set; }
    }
}
