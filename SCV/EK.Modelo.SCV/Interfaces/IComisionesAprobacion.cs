using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ComisionesAprobacion")]
    public interface IComisionesAprobacion
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        int IdRevision { get; set; }

        [m.Kontrol.Column()]
        int IdReferencia { get; set; }

        [m.Kontrol.Column()]
        int? IdCompania { get; set; }

        [m.Kontrol.Column()]
        int? IdCentroCosto { get; set; }


        [m.Kontrol.Column()]
        int IdTipoEntidad { get; set; }



        [m.Kontrol.Column()]
        decimal ImporteComision{ get; set; }

        [m.Kontrol.Column()]
        decimal ImporteComisionMoneda { get; set; }

        [m.Kontrol.Column()]
        decimal ImporteAplicadoRevision { get; set; }

        [m.Kontrol.Column()]
        decimal ImporteAplicado { get; set; }

        [m.Kontrol.Column()]
        decimal ImportePorAplicar { get; set; }

        int IdDesarrollo { get; set; }

        decimal TipoCambio { get; set; }

        int IdMoneda { get; set; }



        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }


        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        m.Kontrol.Interfaces.ITipoEntidad TipoEntidad { get; set; }

        m.Kontrol.Interfaces.IUsuario Usuario { get; set; }
        m.SCV.Interfaces.IAgente Agente { get; set; }

        m.SCV.Interfaces.ITmComisiones TipoComision { get; set; }

        m.Kontrol.Interfaces.IItemGeneral Compania { get; set; }

        m.Kontrol.Interfaces.ICentrosCosto CentroCosto { get; set; }


        m.Kontrol.Interfaces.IItemGeneral TipoMovimiento { get; set; }

        m.SCV.Interfaces.IComisionesRevision Revision { get; set; }

        m.Kontrol.Interfaces.IItemGeneral Referencia { get; set; }

       List<m.SCV.Interfaces.IComisionesAprobacion> ComisionesPorAprobar { get; set; }

       m.Kontrol.Interfaces.IMoneda Moneda { get; set; }

    }
}
