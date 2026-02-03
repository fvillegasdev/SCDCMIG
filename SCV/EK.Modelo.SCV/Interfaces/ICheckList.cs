using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_checklists")]
    public interface ICheckList
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? PlazoDias { get; set; }
        [m.Kontrol.Column()]
        bool Obligatorio { get; set; }
        [m.Kontrol.Column()]
        int IdTipoCheckList { get; set; }
        [m.Kontrol.Column()]
        int IdCategoriaCheckList { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoCheckList { get; set; }
        m.Kontrol.Interfaces.IItemGeneral CategoriaCheckList { get; set; }
        List<m.SCV.Interfaces.ICheckListPlanAccion> PlanAccion { get; set; }

        [m.Kontrol.Column()]
        int? IdFlujoAutorizacion { get; set; }
        m.Kontrol.Interfaces.IWorkflow FlujoAutorizacion { get; set; }
    }
}

