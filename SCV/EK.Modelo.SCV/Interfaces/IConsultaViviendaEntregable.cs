using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{

    public interface IConsultaViviendaEntregable
          : m.Kontrol.Interfaces.IBaseKontrol
    {

        List<IConsultaViviendaEntregablePlazas> GetPlazas { get; set; }
        List<IConsultaViviendaEntregablePlazas> GetPlazasFracCats { get; set; }
        List<IConsultaViviendaEntregablePlazas> GetSPVPlazasSupervisoresCat { get; set; }

        List<IConsultaViviendaEntregableHipotecaVerde> GetHipotecaVerde{ get; set; }

        List<IConsultaViviendaEntregableEquipamiento> GetEquipamiento { get; set; }

        List<IConsultaViviendaEntregableFinanciamiento> GetFinanciamiento { get; set; }

        List<IConsultaViviendaEntregableVivEntregadas> GetViviendasEntregadas { get; set; }

        List<IConsultaViviendaEntregableTipoVivienda> GetTipoVivienda { get; set; }

        List<IConsultaViviendaEntregableResult> GetViviendasEntregables { get; set; }

        List<IConsultaViviendaEntregableRezagosEntrega> GetMotivoRezago { get; set; }

        List<IConsultaViviendaEntregablePersonalEntregaViv> GetPersonaEntregaV { get; set; }

    }
}
