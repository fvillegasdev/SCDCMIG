using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_ordenes_trabajo_detalle_areas_comunes")]
    public interface IOrdenTrabajoDetalleRUBAAreasComunes :
        m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("IdOrdenTrabajo")]
        int IdOrdenTrabajo { get; set; }

        [m.Kontrol.Column("IdPartida")]
        int IdPartida { get; set; }

        [m.Kontrol.Column("Observaciones")]
        string Observaciones { get; set; }

        m.SCV.Interfaces.IReporteFallasAreasComunesPartida Partida { get; set; }
    }
}
