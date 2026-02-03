using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Comision_AniosPeriodos")]
    public interface IComisionAniosPeriodos : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdComisionPeriodo { get; set; }

        [m.Kontrol.Column()]
        int IdFase { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaInicio { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaFin { get; set; }

        [m.Kontrol.Column()]
        string Descripcion { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        m.SCV.Interfaces.IFaseExpediente Fase { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoProceso { get; set; }
    }
}