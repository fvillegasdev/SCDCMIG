using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using miKontrol = EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;
using d = EK.Datos;


namespace EK.Datos.SCV.Interfaces
{
    public interface IConsultaViviendaEntregables
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IConsultaViviendaEntregable>
    {
        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePlazas>> GetPlazas(int Usuario);
        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePlazas>> GetPlazasFracCats(int Usuario);
        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePlazas>> GetSPVPlazasSupervisoresCat(int Usuario);

        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableHipotecaVerde>> GetHipotecaVerde();

        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableEquipamiento>> GetEquipamiento();

        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableFinanciamiento>> GetFinanciamiento();

        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableVivEntregadas>> GetViviendasEntregadas();

        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableTipoVivienda>> GetTipoVivienda();

        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePersonalEntregaViv>> GetPersonaEntregaV(Dictionary<string, object> parametros);

        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableRezagosEntrega>> GetMotivoRezago();

        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableDetallesReprog>> GetDetallesReprog(Dictionary<string, object> parametros);

        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableResult>> GetViviendasEntregables(Dictionary<string, object> parametros);

        Task<List<m.SCV.Interfaces.IConsultaViviendaAgendaEntregableResult>> GetAgendaViviendasEntregables(string PlazaInicial, string FraccInicial, int PersonaEntregaV, int Usuario);

        Task<List<m.SCV.Interfaces.IConsultaViviendaDetallesCitaAgendaResult>> GetAgendaDetalleCita(int IdAgenda, int IdAgendaDetalle);

        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableEquipamiento>> GetEquipamientoUbicacion(int IdCliente);
        Task<object[]> GetReporteEncuestaEntregaVivienda(Dictionary<string, object> parametros);
        Task<object[]> GetReporteEncuestaEntregaViviendaGrafica(Dictionary<string, object> parametros);


    }
}
