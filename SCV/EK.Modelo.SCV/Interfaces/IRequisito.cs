using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_requisitos")]

    public interface IRequisito : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string Descripcion { get; set; }

        [m.Kontrol.Column()]
        int IdTipoRequisito { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoEntidad { get; set; }

        [m.Kontrol.Column()]
        bool TieneVencimiento { get; set; }

        [m.Kontrol.Column()]
        int? IdWorkFlow { get; set; }

        [m.Kontrol.Column()]
        string Valores { get; set; }

        m.Kontrol.Interfaces.IWorkflow WorkFlow { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoRequisito { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoEntidad { get; set; }
        List<m.SCV.Interfaces.IRequisitoCaracteristica> caracteristicas { get; set; }
    }
}