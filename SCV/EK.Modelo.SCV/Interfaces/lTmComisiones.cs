using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_TM_Comisiones")]
    public interface ITmComisiones
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string Descripcion { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoMovimiento_OC { get; set; }
        m.SCV.Interfaces.ITipoMovimiento TipoMovimiento_OC { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoMovimiento_Cancelacion { get; set; }
        m.SCV.Interfaces.ITipoMovimiento TipoMovimiento_Cancelacion { get; set; }

        int IdCompania { get; set; }
        m.Kontrol.Interfaces.ICompania Compania { get; set; }

        [m.Kontrol.Column()]
        int IdInsumo { get; set; }
        m.SCCO.Interfaces.IInsumo Insumo { get; set; }
        
        [m.Kontrol.Column()]
        string IdTipoComision { get; set; }
        m.SCV.Interfaces.ITmComisiones TipoComision { get; set; }

        List<IComisionCompania> ComisionCCompania{ get; set; }
        

        

    }
}
