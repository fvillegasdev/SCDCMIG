using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_checklists_PlanAccion")]
    public interface ICheckListPlanAccion
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdCheckList { get; set; }
        [m.Kontrol.Column()]
        int? PlazoDias { get; set; }
        [m.Kontrol.Column()]
        string Comentarios { get; set; }
        [m.Kontrol.Column()]
        int IdPlanAccion { get; set; }
        [m.Kontrol.Column()]
        int IdPrioridad { get; set; }
        m.Kontrol.Interfaces.IItemGeneral PlanAccion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Prioridad { get; set; }
    }
}

