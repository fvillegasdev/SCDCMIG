using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Planes_Pagos_Configuracion")]
    public interface IPlanPagosConfiguracion: IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdPlanPagos { get; set; }

        IPlanPagos PlanPagos { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoFinanciamiento { get; set; }

        ITipoFinanciamiento TipoFinanciamiento { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoComercializacion { get; set; }

        ITipoComercializacion TipoComercializacion { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
    }
}
