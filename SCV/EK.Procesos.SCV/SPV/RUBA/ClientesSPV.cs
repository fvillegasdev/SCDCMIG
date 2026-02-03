using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class ClientesSPV
        : p.Kontrol.BPBase<m.SCV.Interfaces.IClientesSPV, d.SCV.Interfaces.IClientesSPV>, p.SCV.Interfaces.IClientesSPV
    {
        public ClientesSPV(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IClientesSPV dao)
               : base(factory, dao, "clientesspv")
        { }

        public override Task<List<m.SCV.Interfaces.IClientesSPV>> GetAll(Dictionary<string, object> parametros)
       {
            parametros.Add("idUsuario", base.getUserId());
            return base.GetAll(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IClientesSPV>> SearchClienteML(Dictionary<string, object> parametros)
        {
            parametros.Add("IdUsuario", getUserId());
            return await this.dao.SearchClienteML(parametros);
        }
        public async Task<List<m.SCV.Interfaces.IClientesSPV>> SearchClienteEND(Dictionary<string, object> parametros)
        {
            parametros.Add("IdUsuario", getUserId());
            return await this.dao.SearchClienteEND(parametros);
        }
        public async Task<m.SCV.Interfaces.IClienteSPVEtapa> GetEtapaEntrega(int idCliente)
        {
            return await this.dao.GetEtapaEntrega(idCliente);
        }

        public async Task<List<m.SCV.Interfaces.IClientesSPV>> GetClientesSPV(Dictionary<string, object> parametros)
        {
            parametros.Add("IdUsuario", getUserId());
            return await this.dao.GetClientesSPV(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IClienteSPVEtapa>> GetEtapasExpediente(int idCliente)
        {
            return await this.dao.GetEtapasExpediente(idCliente);
        }

        public async Task<List<m.Kontrol.Interfaces.IAgendaEntVivienda>> getBitacoraArchivosEntrega(int idCliente)
        {
            return await this.dao.getBitacoraArchivosEntrega(idCliente);
        }

        public async Task<List<m.Kontrol.Interfaces.IClienteComentarios>> getBitacoraClientesComentarios(int idCliente)
        {
            return await this.dao.getBitacoraClientesComentarios(idCliente);
        }

        public async Task<List<m.SCV.Interfaces.IReporteFallaDetalle>> getHistorialIncidencias(int idCliente)
        {
            return await this.dao.getHistorialIncidencias(idCliente);
        }

        public async Task<m.SCV.Interfaces.IClientesSPV> UpdateContacto(m.SCV.Interfaces.IClientesSPV item)
        {
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoBitacora = Get<d.SCV.Interfaces.IBitacorasProcesoSPV>();
            var bpREP = Get<p.SCV.Interfaces.IReportesFallas>();
            var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();
            dynamic obj = new ExpandoObject();

            m.SCV.Interfaces.IClientesSPV retValue = null;

            try
            {
                int id = (int)item.IdEntity;
                string correo = item.CorreoElectronico;
                item.IdEntity = item.ID;
                item.ID = id;

                item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                item.Modificado = DateTime.UtcNow;
                item.IdModificadoPor = base.getUserId();
                item.CorreoElectronico = correo;
                item.Changed("TelefonoCasa", true);
                item.Changed("TelefonoOtros", true);
                item.Changed("CorreoElectronico", true);
                item.Changed("Modificado", true);
                item.Changed("IdModificadoPor", true);

                var previous = await this.dao.GetById((int)item.IdEntity);

                //retValue = await this.dao.SaveEntity(item, false, false);
                await this.dao.SaveContacto(item);
                if(item.ClienteTelefonoContactos != null && item.ClienteTelefonoContactos.Count > 0)
                {
                    var estatus = await bpCG.Get("ESTATUS", "A");
                    foreach (var c in item.ClienteTelefonoContactos)
                    {
                        switch (c.Estado)
                        {
                            case m.Kontrol.KontrolEstadosEnum.Nuevo:
                                c.IdCliente = item.IdEntity.Value;
                                c.Estatus = estatus;
                                c.IdEstatus = estatus.ID;
                                c.Creado = DateTime.Now;
                                c.IdCreadoPor = base.getUserId();
                                c.Modificado = DateTime.Now;
                                c.IdModificadoPor = base.getUserId();
                                c.IdTipoContacto = (int)c.TipoContacto.ID;
                                await daoRL.SaveEntity(c, false, true);
                                break;
                            case m.Kontrol.KontrolEstadosEnum.Eliminado:
                                await daoRL.Delete(c.ID.Value);
                                break;
                            case m.Kontrol.KontrolEstadosEnum.Modificado:
                                c.Modificado = DateTime.Now;
                                c.IdModificadoPor = base.getUserId();
                                await daoRL.SaveEntity(c, false, true);
                                break;
                        }
                        //if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                        //{
                        //    await daoRL.Delete(c.ID.Value);
                        //}
                        //else
                        //{
                        //    await daoRL.SaveEntity(c, false, true);
                        //}
                    }
                }
                retValue = await this.dao.GetById(item.IdEntity.Value);
                retValue.ClienteTelefonoContactos = item.ClienteTelefonoContactos;
                retValue.Estado = m.Kontrol.KontrolEstadosEnum.Exitoso;

                var bitacora = Get<m.SCV.Interfaces.IBitacoraProcesoSPV>();
                bitacora.IdProceso = 47;
                bitacora.IdUsuario = base.getUserId();
                bitacora.IdAgente = base.getUserId();
                bitacora.IdCliente = item.IdEntity;
                bitacora.IdReferencia = item.IdUbicacion;
                bitacora.TagWin = "EK10-RUBA";
                bitacora.Observaciones = "Se modificó el correo del cliente";
                bitacora.FechaProceso = DateTime.UtcNow.ToString("ddMMyy");
                bitacora.Observaciones = string.Format(
                    "Correo electrónico: {0} => {1}. Teléfono Casa: {2} => {3}. Celular: {4} => {5}.",
                    previous.CorreoElectronico, retValue.CorreoElectronico,
                    previous.TelefonoCasa, retValue.TelefonoCasa,
                    previous.TelefonoOtros, retValue.TelefonoOtros);

                await daoBitacora.Save(bitacora);

                obj.email = previous.CorreoElectronico;
                obj.new_email = item.CorreoElectronico;
                obj.new_cellphone = item.TelefonoOtros;
                await bpREP.RequestURI("user/info/update", obj);

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IBitacoraCliente> GetBitacora(int idCliente)
        {   
            var retValue = Get<m.SCV.Interfaces.IBitacoraCliente>();
            var daoCLI = Get<d.SCV.Interfaces.IClientesSPV>();
            var bpCUB = Get<p.SCV.Interfaces.IContratistasUbicaciones>();
            var daoCVE = Get<d.SCV.Interfaces.IConsultaViviendaEntregables>();
            var daoUB = Get<d.SCV.Interfaces.IUbicaciones>();
            var daoREP = Get<d.SCV.Interfaces.IReportesFallas>();

            try
            {
                var cliente = await daoCLI.GetById(idCliente);
                var equipamientos = await daoCVE.GetEquipamientoUbicacion(idCliente);
                var ubicacion = await daoUB.GetById((int)cliente.IdUbicacion);
                var termino = await daoREP.GetTerminoGarantia(idCliente);

                var etapas = await this.dao.GetEtapasExpediente(idCliente);
                if (etapas != null)
                {
                    var etapa = etapas.FirstOrDefault(e => e.IdEtapa == 12);
                    if (etapa != null)
                    {
                        retValue.IdEsquema = etapa.IdEsquema;
                        retValue.Esquema = etapa.Esquema;
                    }
                }

                var etapaActual = await this.dao.GetEtapaActual(idCliente);
                if (etapaActual != null)
                {
                    retValue.IdEtapa = etapaActual.ID;
                    retValue.Etapa = etapaActual;
                }
                else
                {
                    retValue.IdEtapa = -1;
                    retValue.Etapa = Get<m.SCV.Interfaces.IClienteSPVEtapa>();
                    retValue.Etapa.Clave = "ENT";
                    retValue.Etapa.Nombre = "ENTREGADO";
                }

                var contratista = await bpCUB.GetContratistaDefault((int)cliente.IdUbicacion);
                if (contratista != null)
                {
                    retValue.IdContratista = (int)contratista.ID;
                    retValue.Contratista = contratista;
                };

                retValue.HasEquipamiento = equipamientos.Count > 0;
                retValue.Entregado = ubicacion.FechaEntregaCalidad != null;
                retValue.TerminoGarantia = termino.TerminoGarantia ?? null;

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<IClientesSPV> SaveContacto(IClientesSPV cliente)
        {
            throw new NotImplementedException();
        }
    }
}