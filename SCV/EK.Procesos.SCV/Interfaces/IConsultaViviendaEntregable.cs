using System.Threading.Tasks;
using miSCV = EK.Modelo.SCV.Interfaces;
using mKontrol = EK.Modelo.Kontrol;
using System.Collections.Generic;
using System.Data;
using System;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;


namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ConsultaViviendaEntregable")]

    public interface IConsultaViviendaEntregable
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IConsultaViviendaEntregable>
    {
        //Plazas
        Task<List<miSCV.IConsultaViviendaEntregablePlazas>> GetPlazas(int Usuario=0);
        //HipotecaVerde
        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePlazas>> GetPlazasFracCats(int Usuario=0);
        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePlazas>> GetSPVPlazasSupervisoresCat(int Usuario);
        Task<List<miSCV.IConsultaViviendaEntregableHipotecaVerde>> GetHipotecaVerde();
        //Equipamiento
        Task<List<miSCV.IConsultaViviendaEntregableEquipamiento>> GetEquipamiento();
        //Financiamiento
        Task<List<miSCV.IConsultaViviendaEntregableFinanciamiento>> GetFinanciamiento();
        //ViviendasEntregadas
        Task<List<miSCV.IConsultaViviendaEntregableVivEntregadas>> GetViviendasEntregadas();
        //TipoVivienda
        Task<List<miSCV.IConsultaViviendaEntregableTipoVivienda>> GetTipoVivienda();
        //PersonaEntregaV
        Task<List<miSCV.IConsultaViviendaEntregablePersonalEntregaViv>> GetPersonaEntregaV(Dictionary<string, object> parametros);
        //RechazoEntrega
        Task<List<miSCV.IConsultaViviendaEntregableRezagosEntrega>> GetMotivoRezago();
        //DetallesReprogramacion
        Task<List<miSCV.IConsultaViviendaEntregableDetallesReprog>> GetDetallesReprog(Dictionary<string, object> parametros);
        //ViviendasEntregables
        Task<List<miSCV.IConsultaViviendaEntregableResult>> GetViviendasEntregables(Dictionary<string, object> parametros);
        //AgendaViviendasEntregables
        Task<List<miSCV.IConsultaViviendaAgendaEntregableResult>> GetAgendaViviendasEntregables(string PlazaInicial, string FraccInicial, int PersonaEntregaV);
        //Detalles Cita Agenda
        Task<List<miSCV.IConsultaViviendaDetallesCitaAgendaResult>> GetAgendaDetalleCita(int IdAgenda, int IdAgendaDetalle);
        Task<List<miSCV.IConsultaViviendaEntregableEquipamiento>> GetEquipamientoUbicacion(int idCliente);

    }
}