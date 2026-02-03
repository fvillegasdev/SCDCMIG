using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ComisionesSeguimientoDetalle")]
    public interface IComisionesSeguimientoDetalle :
        m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdComision { get; set; }

        [m.Kontrol.Column()]
        int IdEtapa { get; set; }


        [m.Kontrol.Column()]
        decimal Porcentaje { get; set; }

        [m.Kontrol.Column()]
        decimal Comision { get; set; }

        [m.Kontrol.Column()]
        decimal ComisionMoneda { get; set; }

        [m.Kontrol.Column()]
        int IdMoneda { get; set; }

        [m.Kontrol.Column()]
        decimal TipoCambio { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaCalculo { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaEjecucion { get; set; }

        [m.Kontrol.Column()]
        int IdProceso { get; set; }


        [m.Kontrol.Column()]
        int IdTipoComision { get; set; }

        int IdTmComision { get; set; }



        [m.Kontrol.Column()]
        int IdEstatusProceso { get; set; }


        [m.Kontrol.Column()]
        decimal? ImporteAplicado { get; set; }

        [m.Kontrol.Column()]
        decimal? ImportePorAplicar { get; set; }



        [m.Kontrol.Column()]
        decimal? ImportePenalizacion { get; set; }


        [m.Kontrol.Column()]
        decimal? ImportePenalizacionMoneda { get; set; }


        [m.Kontrol.Column()]
        decimal? PorcentajePenalizacion { get; set; }


        m.Kontrol.Interfaces.IUsuario Usuario { get; set; }
        m.SCV.Interfaces.ITmComisiones TipoComision { get; set; }

        m.Kontrol.Interfaces.IMoneda Moneda { get; set; }

    }
}
