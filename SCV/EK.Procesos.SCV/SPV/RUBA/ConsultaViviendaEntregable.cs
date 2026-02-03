using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class ConsultaViviendaEntregable
        : p.Kontrol.BPBase<m.SCV.Interfaces.IConsultaViviendaEntregable, d.SCV.Interfaces.IConsultaViviendaEntregables>, p.SCV.Interfaces.IConsultaViviendaEntregable

    {
        public ConsultaViviendaEntregable(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IConsultaViviendaEntregables dao)
            : base(factory, dao, "ConsultaViviendaEntregable")
        { }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePlazas>> GetPlazas(int Usuario=0)
        {
          
            Usuario = base.getUserId();

            var Plazas = await this.dao.GetPlazas(Usuario);

            return Plazas;
        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePlazas>> GetPlazasFracCats(int Usuario = 0)
        {

            Usuario = base.getUserId();

            var Plazas = await this.dao.GetPlazasFracCats(Usuario);

            return Plazas;
        }
        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePlazas>> GetSPVPlazasSupervisoresCat(int Usuario = 0)
        {

            Usuario = base.getUserId();

            var Plazas = await this.dao.GetSPVPlazasSupervisoresCat(Usuario);

            return Plazas;
        }
        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableHipotecaVerde>> GetHipotecaVerde()
        {
            var HipotecaVerde = await this.dao.GetHipotecaVerde();

            return HipotecaVerde;
        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableEquipamiento>> GetEquipamiento()
        {
            var Equipamiento = await this.dao.GetEquipamiento();

            return Equipamiento;
        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableFinanciamiento>> GetFinanciamiento()
        {
            var Financiamiento = await this.dao.GetFinanciamiento();

            return Financiamiento;
        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableVivEntregadas>> GetViviendasEntregadas()
        {
            var ViviendasEntregadas = await this.dao.GetViviendasEntregadas();

            return ViviendasEntregadas;
        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableTipoVivienda>> GetTipoVivienda()
        {
            var TipoVivienda = await this.dao.GetTipoVivienda();

            return TipoVivienda;
        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePersonalEntregaViv>> GetPersonaEntregaV(Dictionary<string, object> parametros)
        {
            parametros.Add("Usuario",getUserId());
            var PersonaEntregaV = await this.dao.GetPersonaEntregaV(parametros);

            return PersonaEntregaV;

        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableRezagosEntrega>> GetMotivoRezago()
        {
            var MotivoRezago = await this.dao.GetMotivoRezago();

            return MotivoRezago;
        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableDetallesReprog>> GetDetallesReprog(Dictionary<string, object> parametros)
        {
            var DetallesReprog = await this.dao.GetDetallesReprog(parametros);

            return DetallesReprog;
        }


        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableResult>> GetViviendasEntregables(Dictionary<string, object> parametros)
        {

            parametros.Add("Usuario", getUserId());
            var ResultViviendasEntregable = await this.dao.GetViviendasEntregables(parametros);

            return ResultViviendasEntregable;
        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaAgendaEntregableResult>> GetAgendaViviendasEntregables(string PlazaInicial, string FraccInicial, int PersonaEntregaV)
        {

            var idUser = base.getUserId();

            var AgendaViviendasEntregables = await this.dao.GetAgendaViviendasEntregables(PlazaInicial, FraccInicial, PersonaEntregaV, idUser);

            return AgendaViviendasEntregables;

        }


        public async Task<List<m.SCV.Interfaces.IConsultaViviendaDetallesCitaAgendaResult>> GetAgendaDetalleCita(int IdAgenda, int IdAgendaDetalle)
        {

            var AgendaDetalleCita = await this.dao.GetAgendaDetalleCita(IdAgenda, IdAgendaDetalle);

            return AgendaDetalleCita;

        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregableEquipamiento>> GetEquipamientoUbicacion(int idCliente)
        {
            return await this.dao.GetEquipamientoUbicacion(idCliente);
        }
        public async Task<object[]> GetReporteEncuestaEntregaVivienda(Dictionary<string, object> parametros)
        {
            return await this.dao.GetReporteEncuestaEntregaVivienda(parametros);
        }
        public async Task<object[]> GetReporteEncuestaEntregaViviendaGrafica(Dictionary<string, object> parametros)
        {
            return await this.dao.GetReporteEncuestaEntregaViviendaGrafica(parametros);
        }
    }
}