using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IEsquemaEtapa : IBaseKontrol
    {
        int IdEsquema { get; set; }
        int IdEtapa { get; set; }
        IEtapa Etapa { get; set; }
        int? Orden { get; set; }
        int PlazoDias { get; set; }

        #region AUTORIZACION
        int? IdWorkFlow { get; set; }
        IWorkflow WorkFlow { get; set; }
        #endregion

        int IdAreaResponsable { get; set; }
        IItemGeneral AreaResponsable { get; set; }

        List<IEsquemaEtapaRequisito> Requisitos { get; set; }
        List<IEsquemaEtapaDocumento> Documentos { get; set; }
        List<IEsquemaEtapaProceso> Procesos { get; set; }
    }
}