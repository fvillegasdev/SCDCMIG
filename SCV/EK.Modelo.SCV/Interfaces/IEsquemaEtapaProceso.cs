using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Esquemas_Etapas_Procesos")]
    public interface IEsquemaEtapaProceso : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdEsquema { get; set; }

        [m.Kontrol.Column()]
        int IdEtapa { get; set; }

        [m.Kontrol.Column()]
        int IdProceso { get; set; }

        [m.Kontrol.Column()]
        string Configuracion { get; set; }
        IEtapa Etapa { get; set; }
        IProceso Proceso { get; set; }
    }
}
