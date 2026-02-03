using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Dynamic;
using System.Configuration;
using System.Net.Http;
using System.IO;
using EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class ReporteFallasAreasComunes
        : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteFallasAreasComunes, d.SCV.Interfaces.IReporteFallasAreasComunes>,
        p.SCV.Interfaces.IReporteFallasAreasComunes

    {
        public ReporteFallasAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReporteFallasAreasComunes dao)
           : base(factory, dao, "ReporteFallasAreasComunes")
        {
        }

        #region ============================== PROCESO ===================================
        #region +++++++++++++++++++++ Obtener Tipo fallas +++++++++++++++++++++
        public async Task<object> GetTipoFallas(int idUsuario = 0)
        {
            idUsuario = base.getUserId();
            var TipoFallas = await this.dao.GetTipoFallas(idUsuario);
            return TipoFallas;
        }
        #endregion

        #region +++++++++++++++++++++ Obtener fallas +++++++++++++++++++++
        public async Task<object> GetFallaAreaComun(Dictionary<string, object> parametros)
        {
            var TipoFallas = await this.dao.GetFallaAreaComun(parametros);
            return TipoFallas;
        }
        #endregion

        #region +++++++++++++++++++++ Obtener ubicacion falla++++++++++++++++++++++++
        public async Task<object> GetUbicacionFalla(int idUsuario = 0)
        {
            idUsuario = base.getUserId();
            var UbicacionFalla = await this.dao.GetUbicacionFalla(idUsuario);
            return UbicacionFalla;
        }
        #endregion

        #region +++++++++++++++++++++ Obtener causa falla +++++++++++++++++++++++++
        public async Task<object> GetCausaFalla(int idUsuario)
        {
            idUsuario = base.getUserId();
            var UbicacionFalla = await this.dao.GetCausaFalla(idUsuario);
            return UbicacionFalla;
        }
        #endregion


        #region +++++++++++++++++++++ Proceso Guardar Reporte fallas Areas comunes +++++++++++++++++++++++
        public override async Task<m.SCV.Interfaces.IReporteFallasAreasComunes> Save(m.SCV.Interfaces.IReporteFallasAreasComunes item)
        {
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpCU = Get<p.SCV.Interfaces.IContratistasUbicaciones>();
            var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBAAreasComunes>();
            var daoOTDTemp = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBAAreasComunes>();
            var daoDT = Get<d.Kontrol.Interfaces.IDateDifference>();
            var bpPRE = Get<p.SCV.Interfaces.IPrereportes>();
            var daoPRE = Get<d.SCV.Interfaces.IPrereportes>();
            var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
            var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenesAreasComunes>();
            var bpFiles = Get<p.Kontrol.Interfaces.IKontrolFiles>();
            var daoADET = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
           // var daoADET = Get<d.SCV.Interfaces.IAgendaSPV>();
           // var daoAgenda = Get<d.SCV.Interfaces.IAgendaSPV>();
            var bpMC = Get<p.SCV.Interfaces.IMotivosCancelacionPV>();

            try
            {
                BeginTransaction();

                int? idPrereporte = item.IdPrereporte;
                bool isNew = item.ID == null || item.ID <= 0 || item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo;


                var closeReportByOT = false;
                var closeReportByPartidas = false;
                var closeEstatus = string.Empty;
                var closeReport = item.IdEstatusReporte == "T" || item.IdEstatusReporte == "X";
                //var closeReport = item.IdEstatusReporte == "T";

                if (item.IdEstatusReporte == "X") item.Cancelado = "S";
                if (closeReport == true)
                {
                    closeEstatus = item.IdEstatusReporte;
                }

                if (item.ID == null || item.ID <= 0)
                {
                    if (item.UsuarioReporta != "PorCliente")
                    {
                        if (item.IdPlaza == null)
                        {
                            base.SetReturnInfo(1, "La plaza no a sido seleccionada. Por favor verifique e intente de nuevo.");
                            return null;
                        }
                        if (item.DesarrolloClave == "none")
                        {
                            base.SetReturnInfo(1, "El fraccionamiento no a sido seleccionado. Por favor verifique e intente de nuevo.");
                            return null;
                        }
                    }
                    if (item.UsuarioReporta == "PorColaborador")
                    {
                        item.IdCliente = item.Usuario.ID.Value;
                        item.TipoCliente = await bpCG.Get("SPVTIPOSCLIENTE", "C");
                        item.IdTipoCliente = "C";
                    }
                    else if (item.UsuarioReporta == "PorAnonimo")
                    {
                        item.IdCliente = 999999;
                        item.TipoCliente = await bpCG.Get("SPVTIPOSCLIENTE", "A");
                        item.IdTipoCliente = "A";
                    }
                    else
                    {
                        item.IdTipoCliente = "E";
                        item.TipoCliente = await bpCG.Get("SPVTIPOSCLIENTE", "E");
                    }
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                    item.FechaCaptura = DateTime.Now;
                    item.IdEstatusReporte = "N";
                    item.EstatusReporte = await bpCG.Get("SPVESTATUSREPORTEFALLAS", "N");
                    item.IdEstatusRevisado = "N";
                    item.EsReprogramacion = 0;
                    item.EsClienteNormal = "S";
                    item.EsClientePerito = "N";
                    item.EsClienteProblema = "N";
                    item.EsClienteProfeco = "N";
                    item.Activo = 1;
                    item.Cancelado = "N";
                    item.CostoReal = 0;
                    item.OC = string.Empty;
                    item.IdRecibidoPor = base.getUserId();
                    item.Recibido = DateTime.Now;

                    //var numReincidencias = await this.dao.GetClienteReportesCount(item.IdCliente);
                    //item.Reincidencia = string.Format("{0}-{1}", item.IdCliente, numReincidencias + 1);
                }
                else
                {
                    m.SCV.Interfaces.IReporteFallasAreasComunes bckp = item;
                    item = await this.dao.GetById((int)item.ID);
                    item.IdUbicacion = bckp.IdUbicacion;
                    item.Ubicacion = bckp.Ubicacion;
                    item.IdSupervisorContratista = bckp.IdSupervisorContratista;
                    item.SupervisorContratista = bckp.SupervisorContratista;
                    item.IdResponsableConstruccion = bckp.IdResponsableConstruccion;
                    item.ResponsableConstruccion = bckp.ResponsableConstruccion;
                    item.IdMedioSolicitud = bckp.IdMedioSolicitud;
                    item.MedioSolicitud = bckp.MedioSolicitud;
                    item.ObservacionesServicio = bckp.ObservacionesServicio;
                    item.ObservacionesContratista = bckp.ObservacionesContratista;
                    item.Contactos = bckp.Contactos;
                    item.Partidas = bckp.Partidas;
                    item.OrdenesTrabajo = bckp.OrdenesTrabajo;
                    item.Dictamenes = bckp.Dictamenes;
                    item.EstatusReporte = bckp.EstatusReporte;
                    item.IdEstatusReporte = bckp.IdEstatusReporte;
                    item.Estado = bckp.Estado;
                    item.Version = bckp.Version;
                    item.Cancelado = bckp.Cancelado;
                    item.IdMotivoCancelado = bckp.IdMotivoCancelado;
                    item.FechaCancelacion = bckp.FechaCancelacion;
                    item.IdTipoContratista = bckp.TipoContratista.ID;
                    item.TipoContratista = bckp.TipoContratista;
                    item.FechaSolucionReporte = bckp.FechaSolucionReporte;
                    item.IdContratista = bckp.Contratista.ID;
                    item.CalleA = bckp.CalleA;
                    item.CalleB = bckp.CalleB;
                    item.UbicacionNombre = bckp.UbicacionNombre;
                    if (item.Ubicacion == null)
                    {
                        item.DesarrolloClave = bckp.DesarrolloClave;
                        //item.IdPlaza = bckp.IdPlaza;
                    }
                    else
                    {
                        item.DesarrolloClave = bckp.Ubicacion.DesarrolloClave;
                        //item.IdPlaza = bckp.Ubicacion.IdPlaza;
                    }
                }

                var estatus = await bpCG.Get("ESTATUS", "A");
                item.IdEstatus = estatus.ID;
                item.Estatus = estatus;

                if (item.ID <= 0)
                {
                    if (item.Ubicacion == null)
                    {
                        item.DesarrolloClave = item.DesarrolloClave;
                        item.IdPlaza = item.IdPlaza;
                    }
                    else
                    {
                        item.DesarrolloClave = item.Ubicacion.DesarrolloClave;
                        item.IdPlaza = item.Ubicacion.IdPlaza;
                    }
                }

                item.IdMedio = item.MedioSolicitud.Clave;
                item.IdMedioSolicitud = (int)item.MedioSolicitud.ID;
                item.IdResponsable = item.IdResponsableConstruccion;
                item.TelefonoCasa = item.TelefonoCasa;
                item.TelefonoOficina = item.TelefonoOficina;
                item.TelefonoOtros = item.TelefonoOtros;

                var partidas = item.Partidas;
                var ordenesTrabajo = item.OrdenesTrabajo;
                var dictamenes = item.Dictamenes;


                this.CalcularTiemposReparacion(ref item);
                item = await this.saveModel(item);


                List<PartidasPendientesOt> AceptadasPendientes = new List<PartidasPendientesOt>();
                if (partidas != null && partidas.Count > 0)
                {
                    int result = await this.SavePartidas(partidas, item);
                    if (result < 0)
                    {
                        Rollback();
                        return null;
                    }

                    var contadorToD = 0;

                    foreach (var p in partidas)
                    {
                        if (p.EstatusPartidaValor.Contains('T') || p.EstatusDictamen.Contains("NO PROCEDE"))
                            contadorToD++;

                        if (p.EstatusPartidaValor.Contains('T') && p.EstatusDictamen.Contains("ACEPTADO") || p.EstatusPartidaValor.Contains('N') && p.EstatusDictamen.Contains("ACEPTADO"))
                        {
                            PartidasPendientesOt pp = new PartidasPendientesOt();
                            pp.Id = p.ID;
                            pp.PendienteOt = true;
                            AceptadasPendientes.Add(pp);
                        }
                    }
                    if (contadorToD == partidas.Count) closeReportByPartidas = true;

                    foreach (var d in dictamenes)
                    {
                        var contPartidasTerminadas = 0;
                        foreach (var p in d.IdPartidas.Split(','))
                        {
                            m.SCV.Interfaces.IReporteFallasAreasComunesPartida partida;
                            partida = partidas.Where(x => x.ID == int.Parse(p)).FirstOrDefault();
                            // partida = await daoDET.GetById(int.Parse(p));
                            if (partida.EstatusDictamen != "ABIERTO" && partida.EstatusDictamen != "CANCELADO")
                                contPartidasTerminadas++;
                        }

                        if (contPartidasTerminadas == d.IdPartidas.Split(',').Length)
                        {
                            var estatusDictamenCerrado = await bpCG.Get("SPVESTATUSDICTAMEN", "C");
                            d.EstatusDictamen = estatusDictamenCerrado;
                            d.EstatusDictamenValue = estatusDictamenCerrado.Clave;
                            d.IdEstatusDictamen = (int)estatusDictamenCerrado.ID;
                        }
                    }
                }

                if (ordenesTrabajo != null)
                {
                    var estatusNuevo = await bpCG.Get("SPVESTATUSOT", "N");
                    var estatusTerminado = await bpCG.Get("SPVESTATUSOT", "T");

                    foreach (var o in ordenesTrabajo)
                    {
                        if (o.IdAgenda != null)
                        {
                            var agendaDetalle = await daoADET.GetById((int)o.IdAgenda);
                            if (agendaDetalle != null)
                            {

                                agendaDetalle.IdUsuarioAsignado = o.IdContratista;
                                agendaDetalle.Changed("IdUsuarioAsignado", true);
                                await daoADET.SaveEntity(agendaDetalle);
                            }
                        }

                        if (o.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            o.Estatus = estatus;
                            o.IdEstatus = estatus.ID;
                            o.Modificado = DateTime.Now;
                            o.IdModificadoPor = base.getUserId();
                            o.IdReporte = (int)item.ID;

                            if (o.ID == null || o.ID <= 0)
                            {
                                o.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                o.Creado = DateTime.Now;
                                o.IdCreadoPor = base.getUserId();
                                o.EstatusOrdenTrabajo = estatusNuevo;
                                o.IdEstatusOrdenTrabajo = estatusNuevo.ID;
                                o.Autorizada = false;
                            }

                            //actualizar información de la orden de trabajo
                            if (o.EstatusOrdenTrabajo.Clave == "N" || o.EstatusOrdenTrabajo.Clave == "C")
                            {
                                if (o.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                {
                                    if (o.Partidas != null)
                                    {
                                        foreach (var d in o.Partidas)
                                        {
                                            await daoOTD.Delete(d.ID.Value);
                                        }
                                    }

                                    await daoOT.Delete(o.ID.Value);
                                }
                                else
                                {
                                    if (o.ID.Value != -1 && o.ID.Value > 0)
                                    {
                                        var savedOT = await daoOT.GetById(o.ID.Value);
                                        if (savedOT.IdContratista != o.IdContratista)
                                        {
                                            // enviar correo
                                            var res = this.EnviarEmailCambiocontratistaAreasComunes(o, item.IdPlaza);
                                        }
                                    }
                                    var ot = await daoOT.SaveEntity(o, false, true);

                                    if (o.Partidas != null)
                                    {
                                        foreach (var d in o.Partidas)
                                        {
                                            if (d.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                                            {
                                                d.IdOrdenTrabajo = (int)ot.ID;
                                                d.Estatus = estatus;
                                                d.IdEstatus = estatus.ID;
                                                d.Modificado = DateTime.Now;
                                                d.IdModificadoPor = base.getUserId();

                                                if (d.ID == null || d.ID <= 0)
                                                {
                                                    d.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                                }

                                                if (d.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                                {
                                                    d.Creado = DateTime.Now;
                                                    d.IdCreadoPor = base.getUserId();
                                                }

                                                if (d.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                                {
                                                    await daoOTD.Delete(d.ID.Value);
                                                }
                                                else
                                                {
                                                    await daoOTD.SaveEntity(d, false, true);
                                                }
                                            }
                                        }
                                    }
                                    //
                                    if (o.EstatusOrdenTrabajo.Clave == "C" && o.IdAgenda > 0)
                                    {
                                        var estatusCancelado = await bpCG.Get("AgendaEstatus", "CAN");
                                        var motivoCancelacion = await bpMC.GetByClave("OTC999");

                                        var agendaDetalle = await daoADET.GetById((int)o.IdAgenda);
                                        if (agendaDetalle != null)
                                        {
                                            agendaDetalle.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                            agendaDetalle.IdEstatusAgenda = estatusCancelado.ID;
                                            agendaDetalle.IdMotivo = motivoCancelacion.ID;
                                            agendaDetalle.IdModificadoPor = base.getUserId();
                                            agendaDetalle.Modificado = DateTime.Now;
                                            agendaDetalle.Changed("IdEstatusAgenda", true);
                                            agendaDetalle.Changed("IdModificadoPor", true);
                                            agendaDetalle.Changed("IdMotivo", true);
                                            agendaDetalle.Changed("Modificado", true);

                                            await daoADET.SaveEntity(agendaDetalle);
                                        }
                                    }
                                }
                            }

                            //actualizar trabajo de la orden de trabajo
                            if (o.EstatusOrdenTrabajo.Clave == "E")
                            {
                                if (o.Partidas != null && o.Partidas.Count > 0)
                                {
                                    foreach (var p in o.Partidas)
                                    {
                                        if (p.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios && p.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado)
                                        {
                                            var partida = await daoDET.GetById(p.IdPartida);
                                            partida.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                            partida.IdCausaFalla = p.Partida.CausaFalla.ID;
                                            partida.FechaInicioReal = o.FechaInicioReal;
                                            partida.FechaTerminacion = o.FechaFinReal;
                                            partida.IdModificadoPor = base.getUserId();
                                            partida.Modificado = DateTime.Now;
                                            partida.Changed("IdCausaFalla", true);
                                            partida.Changed("FechaInicioReal", true);
                                            partida.Changed("FechaTerminacion", true);
                                            partida.Changed("IdModificadoPor", true);
                                            partida.Changed("Modificado", true);

                                            await daoDET.SaveEntity(partida, false, false);
                                        }
                                        else
                                        {
                                            if (p.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                            {
                                                await daoOTD.Delete(p.ID.Value);
                                                var partida = await daoDET.GetById(p.IdPartida);
                                                partida.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                                partida.EstatusPartidaValor = "N";
                                                partida.IdModificadoPor = base.getUserId();
                                                partida.Modificado = DateTime.Now;
                                                partida.Changed("EstatusPartidaValor", true);
                                                partida.Changed("IdModificadoPor", true);
                                                partida.Changed("Modificado", true);
                                                await daoDET.SaveEntity(partida, false, false);
                                            }
                                        }
                                    }
                                }

                                o.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                o.IdModificadoPor = base.getUserId();
                                o.Modificado = DateTime.Now;
                                o.Changed("FechaInicioReal", true);
                                o.Changed("FechaFinReal", true);
                                o.Changed("Observaciones", true);
                                o.Changed("IdModificadoPor", true);
                                o.Changed("Modificado", true);

                                if (o.CerrarRegistro == true)
                                {
                                    o.EstatusOrdenTrabajo = estatusTerminado;
                                    o.IdEstatusOrdenTrabajo = estatusTerminado.ID;
                                    o.Changed("IdEstatusOrdenTrabajo", true);

                                    if (o.Partidas != null && o.Partidas.Count > 0)
                                    {
                                        foreach (var p in o.Partidas)
                                        {
                                            var partida = await daoDET.GetById(p.IdPartida);
                                            partida.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                            partida.FechaCerrado = o.FechaFinReal;
                                            partida.EstatusPartidaValor = "T";
                                            partida.IdModificadoPor = base.getUserId();
                                            partida.Modificado = DateTime.Now;
                                            partida.Changed("FechaCerrado", true);
                                            partida.Changed("EstatusPartidaValor", true);
                                            partida.Changed("IdModificadoPor", true);
                                            partida.Changed("Modificado", true);

                                            await daoDET.SaveEntity(partida, false, false);
                                            foreach (var ppend in AceptadasPendientes)
                                            {
                                                if (ppend.Id == p.IdPartida)
                                                {
                                                    ppend.PendienteOt = false;
                                                }
                                            }
                                        }
                                    }

                                    closeReportByOT = true;
                                }

                                await daoOT.SaveEntity(o, false, false);
                            }
                        }
                        else
                        {
                            if (o.EstatusOrdenTrabajo.Clave == "T" || o.EstatusOrdenTrabajo.Clave == "C" || o.EstatusOrdenTrabajo.Clave == "X")
                            {
                                if (o.Partidas != null && o.Partidas.Count > 0)
                                {
                                    foreach (var p in o.Partidas)
                                    {
                                        foreach (var ppend in AceptadasPendientes)
                                        {
                                            if (ppend.Id == p.IdPartida)
                                            {
                                                ppend.PendienteOt = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        /*  reorgizar los estatus de las OTs y las Partidas
                        var parametrosOTDetalle = new Dictionary<string, object>();
                        parametrosOTDetalle.Add("IdOrdenTrabajo", o.ID);

                        var partidasOTDetalles = await daoOTDTemp.GetAll(parametrosOTDetalle);
                        if (partidasOTDetalles != null && partidasOTDetalles.Count > 0)
                        {
                            foreach (var rowPartidas in partidasOTDetalles)
                            {
                                var partida = await daoDET.GetById(rowPartidas.IdPartida);
                                partida.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                partida.EstatusPartidaValor = o.EstatusOrdenTrabajo.Clave;
                                partida.Changed("EstatusPartidaValor", true);
                                await daoDET.SaveEntity(partida, false, false);
                            }
                        }
                        */
                    }
                }

                if (dictamenes != null)
                {
                    foreach (var dm in dictamenes)
                    {
                        if (dm.IdAgenda != null)
                        {
                            var agendaDetalle = await daoADET.GetById((int)dm.IdAgenda);
                            if (agendaDetalle != null)
                            {
                                agendaDetalle.IdUsuarioAsignado = dm.IdResponsableDictamen;
                                agendaDetalle.Changed("IdUsuarioAsignado", true);
                                await daoADET.SaveEntity(agendaDetalle);
                            }
                        }

                        if (dm.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            var estatusDictamenAbierto = await bpCG.Get("SPVESTATUSDICTAMEN", "I");

                            dm.Estatus = estatus;
                            dm.IdEstatus = estatus.ID;
                            dm.Modificado = DateTime.Now;
                            dm.IdModificadoPor = base.getUserId();
                            if (dm.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                if (dm.EstatusDictamenValue == null || dm.EstatusDictamenValue == "ABIERTO")
                                {
                                    dm.EstatusDictamenValue = estatusDictamenAbierto.Clave;
                                    dm.IdEstatusDictamen = (int)estatusDictamenAbierto.ID;
                                }
                            }
                            else
                            {
                                dm.EstatusDictamenValue = dm.EstatusDictamen.Clave;
                                dm.IdEstatusDictamen = (int)dm.EstatusDictamen.ID;
                            }
                            dm.IdResponsableDictamen = (int)dm.ResponsableDictamen.ID;

                            if (dm.IdReporte <= 0)
                            {
                                dm.IdReporte = (int)item.ID;
                            }

                            if (dm.IdReporteDetalle <= 0)
                            {
                                if (dm.Partida != null)
                                {
                                    dm.IdReporteDetalle = (int)dm.Partida.ID;
                                }
                            }

                            if (dm.ID == null || dm.ID <= 0)
                            {
                                dm.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            }

                            if (dm.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                dm.Activo = true;
                                dm.IdUsuarioCaptura = base.getUserId();
                                dm.FechaDictamen = DateTime.Now;
                                dm.Creado = DateTime.Now;
                                dm.IdCreadoPor = base.getUserId();
                            }

                            if (dm.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoDIC.Delete((int)dm.ID);

                                var parametros = new Dictionary<string, object>();
                                parametros.Add("entityId", (int)dm.ID);
                                parametros.Add("entityType", string.Format("reporte$dictamenes${0}", item.ID));

                                await bpFiles.DeleteByParams(parametros);
                            }
                            else
                            {
                                await daoDIC.SaveEntity(dm, false, true);
                            }
                        }
                        else
                        {
                            await daoDIC.SaveEntity(dm, false, true);
                        }
                    }
                }
                closeReportByOT = true;
                foreach (var ppend in AceptadasPendientes)
                {
                    if (ppend.PendienteOt)
                    {
                        closeReportByOT = false;
                        break;
                    }
                }

                if (closeReport == true)
                {
                    item = await this.TryCerrarReporte(item, closeEstatus, true);
                }
                else if (closeReportByOT == true || closeReportByPartidas == true)
                {
                    item = await this.TryCerrarReporte(item, "T", true);
                }

                item = await this.afterGetItem(item);

                Commit();

                idPrereporte = item.IdPrereporte;
                if (idPrereporte > 0)
                {
                    partidas = item.Partidas;
                    var pprtNotificacion = await bpPRE.GetById((int)idPrereporte);
                    dynamic obj = new ExpandoObject();
                    obj.pre_folio = pprtNotificacion.IdPrereporte;
                    obj.client_code = item.Cliente.ID;
                    obj.folio = item.ID;
                    obj.date = DateTime.Now.ToString("yyyy'-'MM'-'dd HH:mm:ss");

                    List<dynamic> listOfx = new List<dynamic>();
                    var estatusNotificacion = "";
                    foreach (var p in partidas)
                    {
                        estatusNotificacion = "";
                        if (p.Procede == "N")
                        {
                            estatusNotificacion = "rejected";
                        }
                        else
                        {
                            switch (p.EstatusPartida.Clave)
                            {
                                case "N": //NUEVO
                                    estatusNotificacion = "verified";
                                    break;
                                case "T": //TERMINADO
                                    estatusNotificacion = "resolved";
                                    break;
                                case "P": //PENDIENTE
                                    estatusNotificacion = "verified";
                                    break;
                                case "L": //EN PROCESO
                                    estatusNotificacion = "verified";
                                    break;
                                case "A": //ASIGNADO
                                    estatusNotificacion = "verified";
                                    break;
                                case "E": //ENTREGADO
                                    estatusNotificacion = "verified";
                                    break;
                                case "R": //REVISADO
                                    estatusNotificacion = "verified";
                                    break;
                                case "X": //CANCELADO
                                    estatusNotificacion = "rejected";
                                    break;
                                case "D": //DICTAMEN
                                    estatusNotificacion = "verified";
                                    break;
                                default:
                                    estatusNotificacion = "verified";
                                    break;
                            }
                        }
                        dynamic x = new ExpandoObject();
                        x.issue_number = p.Partida;
                        x.status = estatusNotificacion;
                        x.location = p.UbicacionFalla.Descripcion;
                        x.description = p.Observaciones;

                        listOfx.Add(x);
                    }
                    obj.issues = listOfx;
                    await this.RequestURI("report/status", obj);
                }
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return item;
        }

        private async Task<bool> EnviarEmailCambiocontratistaAreasComunes(m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes o, string IdPlaza)
        {
            try
            {
                var parametrosPlaza = new Dictionary<string, object>();
                var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                var daoAgenda = Get<d.SCV.Interfaces.IAgendaSPV>();
                var bpREP = Get<p.SCV.Interfaces.IReporteFallasAreasComunes>();
                var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
                var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes>();
                var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBAAreasComunes>();
                var daoAC = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBAAreasComunes>();
                List<string> elementosEmails = new List<string>();
                List<m.Kontrol.Interfaces.IUsuario> correosNiveles = null;
                var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
                parametrosPlaza.Add("IdPlaza", IdPlaza);
                parametrosPlaza.Add("IdNivel", 134);

                //var parametrosOrdenTrabajo = new Dictionary<string, object>();
                //parametrosOrdenTrabajo.Add("IdOT", o.ID);
                //parametrosOrdenTrabajo.Add("AC", 1);
                //correosNiveles = await daoPlaza.getUserByOrdenTrabajoID(parametrosOrdenTrabajo);
                //if (correosNiveles == null || correosNiveles.Count <= 0)
                //{
                correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                //}



                foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }
                var bpClientEmail = this.factory.GetInstance<EK.Drivers.Notifications.IClientEmail>();
                var moneda = await bpMON.GetByClave("MXN");
                var parametros = new Dictionary<string, object>();
                parametros.Add("idOrdenTrabajo", o.ID.Value);

                var partidasOT = await daoOTD.GetAll(parametros);
                List<m.SCV.Interfaces.IReporteFallaDetalle> partidasList = new List<m.SCV.Interfaces.IReporteFallaDetalle>();
                foreach (var p in partidasOT)
                {
                    var partida = await daoDET.GetById(p.IdPartida);
                    //partidasList.Add(partida);
                    partida.IdContratista = o.IdContratista;
                    partida.IdResponsable = o.IdContratista;
                    partida.Changed("IdContratista", true);
                    partida.Changed("IdResponsable", true);
                    await daoDET.SaveEntity(partida);
                }
                //o.Partidas = partidasOT;
                //var ot = await daoOT.SaveEntity(o, false, true);
                //elementosEmails.Clear();
                //elementosEmails.Add("fvillegas@enkontrol.com");
                string[] to = elementosEmails.ToArray();
                to = to.Where(x => x != "").ToArray();
                //var documento = await bpREP.GetDocumentOT(o.ID.Value);
                // var documento = await this.GetDocumentOTHtmlFile((int)o.ID.Value);
                var documento = await bpREP.GetDocumentOT((int)o.ID.Value);
                //ACTUALIZAR EL ID DE CONTRATISTA EN LAS PARTIDAS DE LA OT
                var tituloAdicionalPlantilla = "";
                EK.Drivers.Common.IKontrolFiles[] documentos = { documento };

                bool addCC = false;
                List<string> EmailsCC = new List<string>();
                var parametrosUsuariosEmailCat = new Dictionary<string, object>();
                var parametrosUsuariosEmailPlazaCC = new Dictionary<string, object>();
                parametrosUsuariosEmailCat.Add("IdParametro", 108);
                parametrosUsuariosEmailPlazaCC.Add("IdParametro", 109); //Plazas a las que se pondra copia
                var result = await daoAgenda.GetUsuariosEmailCat(parametrosUsuariosEmailCat);
                var plazasCC = await daoAgenda.GetPlazasEmailCC(parametrosUsuariosEmailPlazaCC);
                if (result != null)
                {
                    string stringPlz = "";
                    if (plazasCC != null)
                    {
                        dynamic jsonPlz = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(plazasCC));
                        var valorPlz = jsonPlz[0];
                        stringPlz = valorPlz.valor;
                        if (stringPlz == "" || stringPlz.ToLower() == "all" || stringPlz.Contains(IdPlaza))
                        {
                            addCC = true;
                        }
                    }
                    dynamic objJson = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                    var valor = objJson[0];
                    string emails = valor.valor;
                    if (emails != "" && addCC)
                    {
                        string[] mailsCC = emails.Split(',');
                        foreach (var email in mailsCC)
                        {
                            EmailsCC.Add(email);
                        }
                    }

                }

                var plantillaObj = await this.GetPlantilla("NOTIFICAR-CAMBIOCONTRATISTA", o);
                bpClientEmail.SendMessage(to, EmailsCC.ToArray(), $"{ plantillaObj.Titulo}{ tituloAdicionalPlantilla}", plantillaObj.Plantilla_Contenido, documentos, true);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }


        #endregion

        #region +++++++++++++++++++++ Guarda informacion del reporte de falla areas comunes++++++++++++
        protected override async Task<m.SCV.Interfaces.IReporteFallasAreasComunes> saveModel(m.SCV.Interfaces.IReporteFallasAreasComunes item)
        {
            m.SCV.Interfaces.IReporteFallasAreasComunes retValue = null;

            int? id = item.IdFolio;
            item.IdFolio = item.ID;
            item.ID = id;

            item.IdFolio = item.IdFolio > 0 ? item.IdFolio : null;
            item.ID = item.ID > 0 ? item.ID : -1;

            item.Estado = item.ID == null || item.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;
            if (item != null)
            {
                item.Modificado = DateTime.Now;
                item.IdModificadoPor = base.getUserId();
            }

            if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
            {
                item.Creado = DateTime.Now;
                item.IdCreadoPor = base.getUserId();
            }

            retValue = await this.dao.SaveEntity(item, false, true);
            retValue = await this.dao.GetByEntityId((int)retValue.ID);
            retValue.Estado = item.ID == null || item.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;

            await this.afterSaveItem(retValue);
            await this.afterSaveItem(retValue, item);
            //await Log(retValue);

            return retValue;
        }
        #endregion

        #region +++++++++++++++++++++ Guardar partidas +++++++++++++++
        private async Task<int> SavePartidas(List<m.SCV.Interfaces.IReporteFallasAreasComunesPartida> partidas, m.SCV.Interfaces.IReporteFallasAreasComunes item)
        {
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
            var bpCausaFalla = Get<p.SCV.Interfaces.ICausasFallas>();
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            try
            {
                var estatus = await bpCG.Get("ESTATUS", "A");

                foreach (var p in partidas)
                {
                    //if(p.EstatusDictamen != "ABIERTO") {
                    //  p.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    //}
                    if (p.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                    {
                        m.SCV.Interfaces.IReporteFallasAreasComunesPartida row = p;

                        if (row.TipoFalla == null)
                        {
                            base.SetReturnInfo(1, "No se capturó el Tipo de Falla en la partida " + row.Partida + ". Por favor verifique e intente de nuevo.");
                            return -1;
                        }

                        if (row.Falla == null)
                        {
                            base.SetReturnInfo(1, "No se capturó la Falla en la partida " + row.Partida + ". Por favor verifique e intente de nuevo.");
                            return -1;
                        }

                        if (row.UbicacionFalla == null)
                        {
                            base.SetReturnInfo(1, "No se capturó la Ubicación de la Falla en la partida " + row.Partida + ". Por favor verifique e intente de nuevo.");
                            return -1;
                        }

                        if (row.ID == null || row.ID <= 0)
                        {
                            row.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            row.Activo = 1;
                            row.Creado = DateTime.Now;
                            row.IdCreadoPor = base.getUserId();
                            row.IdModificadoPor = base.getUserId();
                            row.EstatusAutorizacion = "N";
                            row.EstatusPartidaValor = "N";
                            row.EstatusDictamen = "ABIERTO";
                            row.IdEstatusDictamen = 1101;
                            row.Procede = "S";
                        }
                        else
                        {
                            m.SCV.Interfaces.IReporteFallasAreasComunesPartida bckp = p;
                            row = await daoDET.GetById((int)p.ID);
                            row.Partida = bckp.Partida;
                            row.Procede = bckp.Procede;
                            row.IdTipoFalla = Convert.ToInt32(bckp.TipoFalla.ID);
                            row.TipoFalla = bckp.TipoFalla;
                            row.IdFalla = bckp.Falla.ID;
                            row.Falla = bckp.Falla;
                            row.IdCausaFalla = bckp.IdCausaFalla;
                            row.CausaFalla = bckp.CausaFalla;
                            row.IdUbicacionFalla = bckp.IdUbicacionFalla;
                            row.UbicacionFalla = bckp.UbicacionFalla;
                            row.IdContratista = bckp.IdContratista;
                            row.Contratista = bckp.Contratista;
                            row.TerminoGarantia = bckp.TerminoGarantia;
                            row.DiasGarantia = bckp.DiasGarantia;
                            row.FechaCerrado = bckp.FechaCerrado;
                            row.EstatusPartida = bckp.EstatusPartida;
                            row.EstatusPartidaValor = bckp.EstatusPartidaValor;
                            row.EstatusAutorizacion = bckp.EstatusAutorizacion;
                            row.PartidaAutorizada = bckp.PartidaAutorizada;
                            row.ObservacionesContratista = bckp.ObservacionesContratista;
                            row.Observaciones = bckp.Observaciones;
                            row.Dictamenes = bckp.Dictamenes;
                            row.Estado = bckp.Estado;
                            row.Version = bckp.Version;
                        }
                        if (p.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            await daoDET.Delete((int)p.ID);
                        }
                        else
                        {
                            if (p.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                row.Creado = DateTime.Now;
                                row.IdCreadoPor = base.getUserId();
                                //row.ReincidenciaNotificada = true;
                            }

                            //if (row.CausaFalla != null)
                            //{
                            //    row.IdCausaFalla = row.CausaFalla.IdCausaFalla;
                            //}

                            //if (row.DiasGarantia > 0)
                            //{
                            //    row.Procede = "S";
                            //}
                            //else
                            //{
                            //    row.Procede = "N";
                            //}
                            row.DesarrolloClave = item.DesarrolloClave;
                            row.IdResponsable = row.IdContratista;
                            row.IdEstatus = estatus.ID;
                            row.Estatus = estatus;
                            row.Modificado = DateTime.Now;
                            row.IdModificadoPor = base.getUserId();
                            row.IdReporte = (int)item.ID;


                            var dictamenes = row.Dictamenes;
                            if (dictamenes != null)
                            {
                                var dd = dictamenes.Where(d => d.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado).ToList();
                                if (dd != null && dd.Count > 0)
                                {
                                    var dictamen = dd.LastOrDefault();
                                    //if (dictamen.EstatusDictamen != null && dictamen.EstatusDictamen.Clave == "A")
                                    if (p.EstatusDictamen != null && p.EstatusDictamen == "ACEPTADO")
                                    {
                                        row.Procede = "S";
                                        row.EstatusPartidaValor = "N";
                                        row.IdEstatusDictamen = p.IdEstatusDictamen;
                                        row.EstatusDictamen = p.EstatusDictamen;
                                    }
                                    else
                                    {
                                        row.Procede = "N";
                                        row.EstatusPartidaValor = "D";
                                        row.IdEstatusDictamen = p.IdEstatusDictamen;
                                        row.EstatusDictamen = p.EstatusDictamen;
                                    }
                                    if ((item.EstatusReporte.Clave == "T" || item.EstatusReporte.Clave == "C") && row.EstatusPartidaValor == "D")
                                    {
                                        row.EstatusPartidaValor = "X";
                                    }
                                }
                            }

                            if (row.Procede == "S")
                            {
                                row.PartidaAutorizada = "A";
                            }
                            else
                            {
                                row.PartidaAutorizada = "R";
                            }

                            row = await daoDET.SaveEntity(row, true, true);

                            #region reincidencias implementardespues
                            //if (row.Reincidencias > 0 && p.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            //{
                            //    try
                            //    {
                            //        var parametroNotificacionReincidencias = new Dictionary<string, object>();
                            //        parametroNotificacionReincidencias.Add("idCliente", reporte.IdCliente);
                            //        parametroNotificacionReincidencias.Add("idFalla", row.Falla.IdFalla);
                            //        parametroNotificacionReincidencias.Add("idTipoFalla", row.IdTipoFalla);
                            //        parametroNotificacionReincidencias.Add("idUbicacionFalla", row.IdUbicacionFalla);
                            //        // p.Add("proceden", "T");
                            //        var reincidencias = await this.dao.GetNotificacionReincidencias(parametroNotificacionReincidencias);

                            //        dynamic expando = new ExpandoObject();
                            //        expando.Cliente = reporte.Cliente;
                            //        expando.Ubicacion = await this.GetUbicacionById((int)reporte.IdUbicacion); ;
                            //        expando.Partidas = reincidencias;

                            //        object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                            //        List<string> elementosEmails = new List<string>();
                            //        ///////////////////////////////////////////////////
                            //        var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                            //        var parametrosPlaza = new Dictionary<string, object>();
                            //        List<m.Kontrol.Interfaces.IUsuario> correosNiveles = null;

                            //        parametrosPlaza.Add("IdPlaza", reporte.IdPlaza);
                            //        parametrosPlaza.Add("IdNivel", 65); //65 GCIA
                            //        correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                            //        foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }

                            //        parametrosPlaza.Remove("IdNivel");
                            //        parametrosPlaza.Add("IdNivel", 84); //84 SCDC - GCIA
                            //        correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                            //        foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }

                            //        parametrosPlaza.Remove("IdNivel");
                            //        parametrosPlaza.Add("IdNivel", 133); //DIRECTOR TECNICO
                            //        correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                            //        foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }

                            //        parametrosPlaza.Remove("IdNivel");
                            //        parametrosPlaza.Add("IdNivel", 134); //CAT
                            //        correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                            //        foreach (var correo in correosNiveles) { if (correo.Email != null) { elementosEmails.Add(correo.Email); } }
                            //        ///////////////////////////////////////////////////
                            //var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                            //var moneda = await bpMON.GetByClave("MXN");
                            //Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("NOTIFICAR-REINCIDENCIAS-DOCUMENTO", obj, null, moneda);
                            //Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);
                            //EK.Drivers.Common.IKontrolFiles[] documentos = { documento };
                            //var plantillaObj = await this.GetPlantilla("NOTIFICAR-REINCIDENCIAS", obj);
                            //bpClientEmail.SendMessage(elementosEmails.ToArray(), null, plantillaObj.Titulo, plantillaObj.Plantilla_Contenido, documentos, true);
                            //    }
                            //    catch (FormatException)
                            //    {
                            //        //base.SetReturnInfo(2, "No se pudo enviar la notificación, El correo no es válido.");
                            //    }
                            //    catch (Exception)
                            //    {
                            //        ////base.SetReturnInfo(2, "No se pudo enviar la notificación:" + ex.Message);
                            //    }
                            //} 
                            #endregion
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return 0;
        }
        #endregion

        #region +++++++++++++++++ CONSULTAR CONTRATISTAS OT ++++++++++++++++++++
        public async Task<List<m.SCV.Interfaces.IContratista>> GetContratistas(int idReporte)
        {
            var parametros = new Dictionary<string, object>();
            parametros.Add("operacion", "CONSULTAR_REPORTE_CONTRATISTAS");
            parametros.Add("idReporte", idReporte);

            return await this.dao.GetContratistas(parametros);
        }
        #endregion

        #region +++++++++++++++++++++ Calcular timpo reparacion++++++++++++++++
        public void CalcularTiemposReparacion(ref m.SCV.Interfaces.IReporteFallasAreasComunes item)
        {
            item.DiasSolucion = 0;
            item.FechaSolucionReporte = item.FechaCaptura.Value.Date;
            item.DiasContratista = 0;

            if (item.OrdenesTrabajo != null && item.OrdenesTrabajo.Count > 0)
            {
                var items = item.OrdenesTrabajo.Where(o => o.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado).ToList();
                if (items != null && items.Count > 0)
                {
                    DateTime? fechaFinal = items.Max(o => o.FechaFin);
                    item.FechaSolucionTerminacion = fechaFinal;

                    if (fechaFinal != null && item.FechaCaptura != null)
                    {
                        item.DiasSolucion = ((fechaFinal.Value.Date - item.FechaSolucionReporte.Value.Date).Days) + 1;
                    }

                    DateTime? fechaInicial = items.Min(o => o.FechaInicioReal);
                    item.FechaContratistaInicial = fechaInicial;

                    var terminadas = items.All(o => o.FechaFinReal != null && o.EstatusOrdenTrabajo.Clave == "T");
                    if (terminadas == true)
                    {
                        fechaFinal = items.Max(o => o.FechaFinReal);
                        item.FechaContratistaFinal = fechaFinal;

                        if (fechaFinal != null && fechaInicial != null)
                        {
                            item.DiasContratista = ((fechaFinal.Value.Date - fechaInicial.Value.Date).Days) + 1;
                        }
                    }
                }
            }
        }
        #endregion

        #region +++++++++++++++++++++ obtener toda la informacion del reporte +++++++++++++++++++++++++++++++++++
        protected override async Task<m.SCV.Interfaces.IReporteFallasAreasComunes> afterGetItem(m.SCV.Interfaces.IReporteFallasAreasComunes item)
        {
            var daoCU = Get<d.SCV.Interfaces.IContratistasUbicaciones>();
            var daoRP = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBAAreasComunes>();
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenesAreasComunes>();
            var daoDT = Get<d.Kontrol.Interfaces.IDateDifference>();

            //item.Ubicacion = await this.GetUbicacionById((int)item.IdUbicacion);
            //item.Contactos = await this.GetContactoCliente(item.IdCliente);

            var fechaLiberacion = DateTime.Now;
            //var etapa = await this.GetClienteEtapa(item.IdCliente, (DateTime)item.FechaCaptura);
            //if (etapa != null && etapa.FechaLiberacion != null)
            //{
            //    fechaLiberacion = (DateTime)etapa.FechaLiberacion;
            //}

            //if (item.Cliente != null)
            //{
            //    var diff = await daoDT.GetDateDifference("yy", fechaLiberacion, DateTime.Now);
            //    item.Cliente.Antiguedad = diff.Year;
            //}

            var parametros = new Dictionary<string, object>();
            //parametros.Add("idUbicacion", item.IdUbicacion);
            //item.Contratistas = await daoCU.GetAll(parametros);

            parametros.Add("idReporte", item.ID);

            item.Partidas = await daoRP.GetAll(parametros);
            item.Dictamenes = await daoDIC.GetAll(parametros);
            item.OrdenesTrabajo = await daoOT.GetAll(parametros);

            if (item.Partidas != null && item.Partidas.Count > 0)
            {
                foreach (var pp in item.Partidas)
                {
                    //var re = await this.CalcularReincidencias(pp);
                    //if (re != null)
                    //{
                    //    pp.Reincidencias = re.Reincidencias;
                    //    pp.ReincidenciasValues = re.ReincidenciasValues;
                    //}

                    if (item.Dictamenes != null)
                    {
                        pp.Dictamenes = item.Dictamenes.FindAll(dm => dm.IdReporte == pp.IdReporte && dm.IdReporteDetalle == pp.ID);
                    }
                }
            }

            if (item.OrdenesTrabajo != null)
            {
                foreach (var ot in item.OrdenesTrabajo)
                {
                    parametros.Clear();
                    parametros.Add("idOrdenTrabajo", ot.ID);
                    ot.Partidas = await daoOTD.GetAll(parametros);
                }
            }

            if (item.FechaCaptura == null)
            {
                item.FechaCaptura = DateTime.Now;
            }

            if (item.FechaEntregaVivienda != null)
            {
                var diff = await daoDT.GetDateDifference("dd", (DateTime)item.FechaEntregaVivienda, (DateTime)item.FechaCaptura);
                item.MesesTranscurridos = diff.Days;
            }
            else
            {
                item.MesesTranscurridos = 0;
            }

            this.CalcularTiemposReparacion(ref item);

            return await base.afterGetItem(item);
        }
        #endregion

        #region +++++++++++++++++++++ Calcular Partidas OT ++++++++++++++++
        public async Task<List<m.SCV.Interfaces.IOrdenTrabajoDetalleRUBAAreasComunes>> CalcularPartidasOT(int idReporte, int idContratista, m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes orden, List<m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes> ordenes)
        {
            var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpCGV.Get("ESTATUS", "A");

            // validar que las ordenes sean del contratista en edición.
            ordenes = ordenes != null ? ordenes : new List<m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes>();
            ordenes = ordenes.Where(o => o.IdContratista == idContratista).ToList();

            // colocar las partidas capturadas en la sección en el array de ordenes
            int ordenIndex = ordenes.FindIndex(o => o.ID == orden.ID);
            if (ordenIndex != -1)
            {
                ordenes[ordenIndex].Partidas = orden.Partidas;
            }
            else
            {
                ordenes.Add(orden);
                ordenIndex = ordenes.FindIndex(o => o.ID == orden.ID);
            }

            // partidas disponibles para agregar a la edición del contratista.
            var freePartidas = new List<m.SCV.Interfaces.IOrdenTrabajoDetalleRUBAAreasComunes>();

            // consultar las partidas autorizadas del reporte de fallas.
            var parametros = new Dictionary<string, object>();
            parametros.Add("IdReporte", idReporte);
            parametros.Add("idContratista", idContratista);
            parametros.Add("autorizado", "A");

            var partidas = await daoDET.GetAll(parametros);
            if (partidas != null)
            {
                foreach (var p in partidas)
                {
                    bool pFound = false;

                    foreach (var ot in ordenes)
                    {
                        if (ot.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            if (ot.Partidas != null)
                            {
                                var otPartidas = ot.Partidas.Where(d => d.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado).ToList();
                                if (otPartidas.Any(d => d.IdPartida == p.ID) == true)
                                {
                                    pFound = true;
                                    break;
                                }
                            }
                        }
                    }

                    // agregar la partida como disponible si no es utilizada en una OT
                    if (pFound == false)
                    {
                        var det = Get<m.SCV.Interfaces.IOrdenTrabajoDetalleRUBAAreasComunes>();
                        det.ID = null;
                        det.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        det.IdPartida = (int)p.ID;
                        det.Partida = p;
                        det.IdOrdenTrabajo = (int)orden.ID;
                        det.Observaciones = string.Empty;
                        det.IdModificadoPor = base.getUserId();
                        det.IdCreadoPor = base.getUserId();
                        det.IdEstatus = estatus.ID;
                        det.Estatus = estatus;

                        freePartidas.Add(det);
                    }
                }
            }

            var retValue = new List<m.SCV.Interfaces.IOrdenTrabajoDetalleRUBAAreasComunes>();

            if (ordenIndex != -1)
            {
                var otPartidas = ordenes[ordenIndex].Partidas;
                if (otPartidas != null)
                {
                    retValue = otPartidas;
                }
            }

            retValue.AddRange(freePartidas);

            foreach (var p in retValue)
            {
                if (p.Partida == null)
                {
                    p.Partida = await daoDET.GetById(p.IdPartida);
                }
            }

            return retValue.OrderBy(p => p.Partida.Partida).ToList();
        }
        #endregion

        #region +++++++++++++++++++++ GETDICTAMENES ++++++++++++++++
        public async Task<List<m.SCV.Interfaces.IAgendaDictamenDetalleAreasComunes>> GetDictamenes(Dictionary<string, object> parametros)
        {
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenesAreasComunes>();
            try
            {
                return await daoDIC.GetDictamenes(parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region +++++++++++++++++++++ GETDITAMENES REPORTE +++++++++++++++
        public async Task<List<m.SCV.Interfaces.IReporteAreasComunesDictamen>> GetDictamenesReporte(Dictionary<string, object> parametros)
        {
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenesAreasComunes>();
            try
            {
                return await daoDIC.GetAll(parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region +++++++++++++++++++++ TRYCERRAR REPORTE ++++++++++++++++
        public async Task<m.SCV.Interfaces.IReporteFallasAreasComunes> TryCerrarReporte(m.SCV.Interfaces.IReporteFallasAreasComunes item, string estatus, bool validate)
        {
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes>();
            var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
            m.SCV.Interfaces.IReporteFallasAreasComunes retValue = null;


            try
            {
                var ordenesEstatus = new List<string> { "N", "P", "L", "S", "E" };
                var partidasEstatus = new List<string> { "N", "P", "L", "A", "R", "D" };

                bool pendingItems = false;

                if (validate == true)
                {
                    var parametros = new Dictionary<string, object>();
                    parametros.Add("idReporte", item.ID);

                    var pendingPartidas = await daoDET.GetAll(parametros);
                    if (pendingPartidas != null)
                    {
                        foreach (var pp in pendingPartidas)
                        {
                            //if (pp.EstatusPartidaValor.Contains('D') && pp.Procede.Contains('N')) continue;
                            if (partidasEstatus.Contains(pp.EstatusPartidaValor, StringComparer.OrdinalIgnoreCase) && pp.EstatusDictamen == "ABIERTO")
                            {
                                pendingItems = true;
                            }
                        }
                    }

                    var pendingOrdenes = await daoOT.GetAll(parametros);
                    if (pendingOrdenes != null)
                    {
                        foreach (var po in pendingOrdenes)
                        {
                            if (ordenesEstatus.Contains(po.EstatusOrdenTrabajo.Clave, StringComparer.OrdinalIgnoreCase))
                            {
                                pendingItems = true;
                            }
                        }
                    }
                }

                if (!pendingItems)
                {
                    int _id = (int)item.IdFolio;
                    item.IdFolio = item.ID;
                    item.ID = _id;
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    item.IdEstatusReporte = estatus;
                    item.IdModificadoPor = base.getUserId();
                    item.Modificado = DateTime.Now;
                    item.IdUsuarioProcesoFin = base.getUserId();
                    item.FechaTerminacionFolio = DateTime.Now;
                    //item.IdRecibidoPor = base.getUserId();
                    //item.Recibido = DateTime.Now;
                    item.FechaContratistaFinal = DateTime.Now;
                    item.Changed("IdEstatusReporte", true);
                    item.Changed("IdModificadoPor", true);
                    item.Changed("Modificado", true);
                    item.Changed("IdUsuarioProcesoFin", true);
                    //item.Changed("IdRecibidoPor", true);
                    //item.Changed("Recibido", true);
                    item.Changed("FechaContratistaFinal", true);
                    item.Changed("FechaTerminacionFolio", true);

                    retValue = await this.dao.SaveEntity(item, false, false);
                    retValue = await this.dao.GetByEntityId((int)retValue.ID);
                    retValue = await this.afterGetItem(retValue);
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                }
                else
                {
                    retValue = item;
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region +++++++++++++++++++++ REQUESTURL +++++++++++++++++++
        public async Task<string> RequestURI(string uri, object obj)
        {
            string retValue = string.Empty;
            try
            {
                var pathServices = ConfigurationManager.AppSettings["servicesPostSale"] + uri;
                string token = ConfigurationManager.AppSettings["servicesPostSaleToken"] == null ? "" : ConfigurationManager.AppSettings["servicesPostSaleToken"];
                Uri requestUri = new Uri(pathServices);
                string sJson = Newtonsoft.Json.JsonConvert.SerializeObject(obj);
                var objClient = new System.Net.Http.HttpClient();
                objClient.DefaultRequestHeaders.Add("enk-token", token);
                System.Net.Http.HttpResponseMessage respon = await objClient.PostAsync(requestUri, new StringContent(sJson, System.Text.Encoding.UTF8, "application/json"));

                retValue = await respon.Content.ReadAsStringAsync();
                return retValue;
            }
            catch (Exception)
            {
                return "";
            }
        }
        #endregion

        #region +++++++++++++++++++++ GETDOCUMENTOOT ++++++++++++++++
        public async Task<Drivers.Common.IKontrolFiles> GetDocumentOT(int id)
        {
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var bpCU = Get<p.SCV.Interfaces.IContratistasUbicaciones>();
            var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBAAreasComunes>();
            var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();
            var daoCF = Get<d.SCV.Interfaces.ICausasFallas>();
            var daoAG = Get<d.SCV.Interfaces.IAgendaSPV>();
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenesAreasComunes>();

            try
            {
                var ordenTrabajo = await daoOT.GetById(id);

                var reporte = await this.dao.GetById(ordenTrabajo.IdReporte);
                //var ubicacion = await this.GetUbicacionById((int)reporte.IdUbicacion);
                var moneda = await bpMON.GetByClave("MXN");

                var parametros = new Dictionary<string, object>();
                parametros.Add("idReporte", ordenTrabajo.IdReporte);
                parametros.Add("idContratista", ordenTrabajo.IdContratista);

                var partidas = await daoDET.GetAll(parametros);
                var dictamenesTotalPartidas = Get<m.SCV.Interfaces.IReporteFallasAreasComunes>();
                dictamenesTotalPartidas.Dictamenes = await daoDIC.GetAll(parametros);

                parametros.Clear();
                parametros.Add("idOrdenTrabajo", ordenTrabajo.ID);

                var partidasOT = await daoOTD.GetAll(parametros);
                var partidasTable = new List<m.SCV.Interfaces.IReporteFallasAreasComunesPartida>();

                foreach (var p in partidas)
                {
                    if (partidasOT.FirstOrDefault(d => d.IdPartida == p.ID) != null)
                    {
                        partidasTable.Add(p);
                    }
                }

                //var cOrigen = await bpCU.GetContratistaDefault((int)reporte.IdUbicacion);
                //if (cOrigen == null)
                //{
                //    cOrigen = Get<m.SCV.Interfaces.IContratista>();
                //}

                parametros.Clear();
                parametros.Add("idCliente", reporte.IdCliente);

                string telefonoCasa = reporte.TelefonoCasa;
                string telefonoOficina = reporte.TelefonoOficina;
                string telefonoCelular = string.Empty;
                string telefonoOtros = reporte.TelefonoOtros;

                #region contactos
                //var contactos = await daoRL.GetAll(parametros);
                //if (contactos != null)
                //{
                //    var telefonos = contactos.FindAll(c => c.TipoContacto.Clave == "TELEFONO");
                //    if (telefonos != null)
                //    {
                //        foreach (var t in telefonos)
                //        {
                //            if (t.TipoTelefono.Clave == "CS")
                //            {
                //                telefonoCasa = t.Contacto;
                //            }
                //            else if (t.TipoTelefono.Clave == "T")
                //            {
                //                telefonoOficina = t.Contacto;
                //            }
                //            else if (t.TipoTelefono.Clave == "C")
                //            {
                //                telefonoCelular = t.Contacto;
                //            }
                //            else if (t.TipoTelefono.Clave == "O")
                //            {
                //                telefonoOtros = t.Contacto;
                //            }
                //        }
                //    }
                //}
                #endregion


                var citas = await daoAG.GetAgendaDetalleHistorial("ContratistaAreasComunes", id, null);
                if (citas != null && citas.Count > 0)
                {
                    // citas = citas.FindAll(c => c.EstatusAgenda.Clave == "ACT" || c.EstatusAgenda.Clave == "REP" || c.EstatusAgenda.Clave == "SEG");
                    if (citas[citas.Count - 1].EstatusAgenda.Clave != "ATE")
                        citas[citas.Count - 1].EstatusAgenda.Nombre += "       *** última actualización ***";
                }

                var dictamenesPartidas = new List<m.SCV.Interfaces.IReporteAreasComunesDictamen>();
                if (partidas != null && partidas.Count > 0)
                {
                    var partidasDictamenes = Get<m.SCV.Interfaces.IReporteAreasComunesDictamen>();

                    foreach (var pp in partidas)
                    {

                        partidasDictamenes = dictamenesTotalPartidas.Dictamenes.FindLast(dm => dm.Partida.Partida == pp.Partida);
                        if (partidasDictamenes != null)
                        {
                            dictamenesPartidas.Add(partidasDictamenes);
                        }
                    }


                }
                if (reporte.UsuarioReporta == "PorAnonimo")
                {
                    reporte.Cliente.Nombre = "Anonimo";
                    reporte.Cliente.ID = 999999;
                }
                if (reporte.UsuarioReporta == "PorColaborador")
                {
                    reporte.Cliente.Nombre = reporte.Usuario.Nombre;
                    reporte.Cliente.ID = reporte.Usuario.ID;
                }
                dynamic expando = new ExpandoObject();
                expando.ID = reporte.ID;
                expando.Folio = reporte.IdFolio;
                expando.OrdenTrabajo = ordenTrabajo;
                expando.FechaEntregaVivienda = reporte.FechaEntregaVivienda;
                expando.FechaCaptura = reporte.FechaCaptura;
                expando.Cliente = reporte.Cliente;
                expando.CalleA = reporte.CalleA;
                expando.CalleB = reporte.CalleB;
                expando.UbicacionNombre = reporte.UbicacionNombre;
                //expando.Ubicacion = ubicacion;
                expando.CreadoPor = reporte.CreadoPor;
                expando.ModificadoPor = reporte.ModificadoPor;
                expando.TelefonoCasa = telefonoCasa;
                expando.TelefonoOficina = telefonoOficina;
                expando.TelefonoCelular = telefonoCelular;
                expando.TelefonoOtros = telefonoOtros;
                expando.DesarrolloClave = reporte.DesarrolloClave;
                //expando.SuperManzana = reporte.SuperManzana;
                //expando.Manzana = reporte.Manzana;
                //expando.Lote = reporte.Lote;
                //expando.Interior = reporte.Interior;
                //expando.Exterior = reporte.Exterior;
                expando.Coordinador = reporte.Coordinador;
                expando.ResponsableConstruccion = reporte.ResponsableConstruccion;
                expando.ObservacionesSC = reporte.ObservacionesServicio;
                expando.ObservacionesCAT = reporte.ObservacionesContratista;
                expando.Contratista = reporte.Contratista;
                expando.ContratistaPartida = partidas.Select(x => x.Contratista.Nombre).FirstOrDefault();
                expando.Fraccionamiento = reporte.Desarrollo;
                expando.DesarrolloClave = reporte.DesarrolloClave;
                //expando.ContratistaOrigen = cOrigen;
                expando.Citas = citas;
                expando.Partidas = partidasTable;
                expando.Dictamenes = dictamenesPartidas;
                expando.IdFolio = reporte.ID;
                var pm = await GetGlobalParameters("INSTALACION");
                string linkTarea = $"{pm.Value<string>("SitioWeb")}{"/scv/pv/reporteFallasAreasComunes/"}{reporte.ID}";
                var parametros2 = new Dictionary<string, object>()
                        {
                            { "Link", linkTarea
                            }
                        };

                //notificacion supervisor asignado
                object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                //notificación UAT
                var bpAgenda = Get<p.SCV.Interfaces.IAgendaSPV>();
                var daoPlaza = Get<d.SCV.Interfaces.IPlaza>();
                var parametrosPlaza = new Dictionary<string, object>();
                parametrosPlaza.Add("IdPlaza", reporte.IdPlaza);
                parametrosPlaza.Add("IdNivel", 134);
                List<m.Kontrol.Interfaces.IUsuario> correosNiveles = null;
                correosNiveles = await daoPlaza.getGerentes(parametrosPlaza);
                //foreach (var integrantes in correosNiveles)
                //{
                   // if (integrantes.Email != null)
                   // {
                       // await bpAgenda.SendNotificationNewKalendar(correosNiveles, "NOTIFICAR-NUEVA-AGENDA-CONTRATISTA", linkTarea, obj, parametros2);
                    //}
                //}

                Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("REP-FALLAS-AREAS-COMUNES-RUBA", obj, null, moneda);
                Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);

                return documento;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region +++++++++++++++++++ GETORDENESTRABAJO +++++++++++++++++
        public async Task<List<m.SCV.Interfaces.IOrdenTrabajoRUBAAreasComunes>> GetOrdenesTrabajo(Dictionary<string, object> parametros)
        {
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes>();
            var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetallesRUBAAreasComunes>();

            try
            {
                var retValue = await daoOT.GetAll(parametros);
                if (retValue != null)
                {
                    foreach (var ot in retValue)
                    {
                        parametros.Clear();
                        parametros.Add("idOrdenTrabajo", ot.ID);
                        ot.Partidas = await daoOTD.GetAll(parametros);
                    }
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region ++++++++++++++++ CANCELARFOLIO ++++++++++++++++++++
        public async Task<m.SCV.Interfaces.IReporteFallasAreasComunes> CancelaReporte(string motivo)
        {
            var daoRF = Get<d.SCV.Interfaces.IReporteFallasAreasComunes>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            m.SCV.Interfaces.IReporteFallasAreasComunes retValue = null;
            string[] IDs = motivo.Split('|');
            var res = await daoRF.CancelarDetallesFolio(IDs[0]);
            try
            {

                retValue = await this.GetById(Int32.Parse(IDs[0]));
                //retValue.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                retValue.Cancelado = "S";
                retValue.IdMotivoCancelado = Int16.Parse(IDs[1]);
                retValue.FechaCancelacion = DateTime.Now;
                retValue.IdEstatusReporte = "X";
                retValue = await this.Save(retValue);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }
        #endregion

        #region +++++++++++++++++++++++ GetFraccReportes +++++++++++++++++++++
        public async Task<object[]> GetFraccReportes(string DesarrolloClave)
        {
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenesAreasComunes>();
            var drd = new Dictionary<int, List<m.SCV.Interfaces.IReporteAreasComunesDictamen>>();

            try
            {
                var retValue = await this.dao.GetFraccReportes(DesarrolloClave);
                if (retValue != null && retValue.Count() > 0)
                {
                    foreach (dynamic pp in retValue)
                    {
                        int idDetalle = Convert.ToInt32(pp.ID);
                        int idReporte = Convert.ToInt32(pp.IdReporte);

                        if (!drd.ContainsKey(idReporte))
                        {
                            var parametros = new Dictionary<string, object>() { { "idReporte", idReporte } };
                            var dictamenes = await daoDIC.GetAll(parametros);

                            drd.Add(idReporte, dictamenes);
                        }

                        var rrDictamenes = new List<m.SCV.Interfaces.IReporteAreasComunesDictamen>();

                        if (drd.TryGetValue(idReporte, out rrDictamenes))
                        {
                            pp.Dictamenes = new ExpandoObject();
                            pp.Dictamenes = rrDictamenes.FindAll(dm => dm.IdReporte == idReporte && dm.IdReporteDetalle == idDetalle);
                        }
                    }
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region +++++++++++++++ IMPRIMIR DIAGNOSTICO +++++++++++++++++++
        public async Task<string> GetEncodedDocumentDiagnostico(int id)
        {
            try
            {
                string retValue = null;

                using (MemoryStream ms = new MemoryStream())
                {
                    var documento = await this.GetDocumentDiagnostico(id);
                    documento.Content.Position = 0;
                    documento.Content.CopyTo(ms);

                    retValue = Convert.ToBase64String(ms.ToArray());
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Drivers.Common.IKontrolFiles> GetDocumentDiagnostico(int id)
        {
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var daoRF = Get<d.SCV.Interfaces.IReporteFallasAreasComunes>();
            var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
            var daoAG = Get<d.SCV.Interfaces.IAgendaSPV>();
            var daoAgenda = Get<d.SCV.Interfaces.IAgendasContratistasAreasComunes>();
            var daoAgendaDetalle = Get<d.Kontrol.Interfaces.IAgendaEntVivienda>();
            var daoDIC = Get<d.SCV.Interfaces.IReportesDictamenesAreasComunes>();

            try
            {
                var moneda = await bpMON.GetByClave("MXN");

                var dictamen = await daoDIC.GetById(id);
                var reporteFalla = await this.dao.GetById((int)dictamen.IdReporte);
                //var ubicacion = await this.GetUbicacionById((int)reporteFalla.IdUbicacion);
                var citas = await daoAG.GetAgendaDetalleHistorial("DictamenAreasComunes", id, null);

                m.SCV.Interfaces.IReporteAreasComunesDictamen dictamenUpdate = await daoDIC.GetById(id);

                var daoCliente = Get<d.SCV.Interfaces.IClientesSPV>();
                var cliente = await daoCliente.GetById((int)dictamenUpdate.IdCliente);
                if (reporteFalla.UsuarioReporta == "PorAnonimo")
                {
                    reporteFalla.Cliente.Nombre = "Anonimo";
                    reporteFalla.ID = 999999;
                }
                if (reporteFalla.UsuarioReporta == "PorColaborador")
                {
                    reporteFalla.Cliente.Nombre = reporteFalla.Usuario.Nombre;
                    reporteFalla.ID = reporteFalla.Usuario.ID;
                }
                var IdAgendaDetalle = 0;
                if (dictamenUpdate.IdAgenda != null)
                {
                    IdAgendaDetalle = (int)dictamenUpdate.IdAgenda;
                }
                var model = await daoAgendaDetalle.GetById(IdAgendaDetalle);

                var IdAgenda = 0;
                if (model != null)
                {
                    IdAgenda = (int)model.IdAgenda;
                }
                var agenda = await daoAgenda.GetById(IdAgenda);


                var parametrosFolioDetalle = new Dictionary<string, object>();
                parametrosFolioDetalle.Add("idReporte", dictamenUpdate.IdReporte);
                //parametrosFolioDetalle.Add("ID", dictamenUpdate.Partida.ID.Value);
                var partidas = await daoDET.GetAll(parametrosFolioDetalle);
                int[] arrayPartidas = new int[partidas.Count];
                for (int i = 0; i < partidas.Count; i++)
                    arrayPartidas[i] = partidas[i].ID.Value;

                var partidasDictamenIDs = dictamen.IdPartidas.Split(',');
                List<m.SCV.Interfaces.IReporteFallasAreasComunesPartida> PartidasEnDictamen = new List<m.SCV.Interfaces.IReporteFallasAreasComunesPartida>();
                foreach (var p in partidasDictamenIDs)
                {
                    foreach (var partida in partidas)
                    {
                        if (p == partida.ID.ToString())
                        {
                            PartidasEnDictamen.Add(partida);
                        }
                    }
                }
                /*for (int i = 0; i < arrayPartidas.Length; i++)
                {
                    int IdPartida = arrayPartidas[i];
                    if (!dictamen.IdPartidas.Contains(IdPartida.ToString()))
                    {
                        for (int j = 0; j < partidas.Count; j++)
                            if (partidas[j].ID == IdPartida) partidas.RemoveAt(j);
                    }

                }*/
                List<dynamic> listOfDiagnosticos = new List<dynamic>();
                List<dynamic> listOfCitas = new List<dynamic>();
                List<dynamic> listOfPartidas = new List<dynamic>();
                listOfDiagnosticos.Add(dictamenUpdate);

                dynamic expando = new ExpandoObject();
                expando.Agenda = agenda;
                expando.Citas = citas;
                expando.Cliente = cliente;
                //expando.Ubicacion = ubicacion;
                expando.Dictamenes = listOfDiagnosticos;
                expando.Responsable = dictamenUpdate.ResponsableDictamen;
                expando.Partidas = PartidasEnDictamen;
                expando.Folio = reporteFalla;
                expando.IdDictamen = dictamenUpdate.ID;



                object obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));

                Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("NOTIFICAR-DIAGNOSTICO-AREAS-COMUNES-DOCUMENTO", obj, null, moneda);
                Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);

                return documento;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IUbicaciones> GetUbicacionById(int id)
        {
            var daoUbicaciones = Get<d.SCV.Interfaces.IUbicaciones>();
            var retValue = await daoUbicaciones.GetById(id);
            retValue.Plaza = retValue.Plaza != null ? retValue.Plaza : Get<m.SCV.Interfaces.IPlaza>();
            retValue.Plaza.ValidarResponsablePlaza = await this.dao.ValidarResponsablePlaza(retValue.IdPlaza);
            return retValue;
        }
        #endregion

        #region ++++++++++++++++++ IMPRIMIR OT ++++++++++++++++++++++
        public async Task<string> GetEncodedDocumentOT(int id)
        {
            try
            {
                string retValue = null;

                using (MemoryStream ms = new MemoryStream())
                {
                    var documento = await this.GetDocumentOT(id);
                    documento.Content.Position = 0;
                    documento.Content.CopyTo(ms);

                    retValue = Convert.ToBase64String(ms.ToArray());
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #endregion

        #region ============================== Dashboard ==============================

        #region ++++++++++++++++++++++++++ GETSTATESDASHBOARD +++++++++++++++++++++++++
        public async Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getStateDashBoard(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "REPORTE-FALLAS-DASHBOARD-ESTADOS");
            parametros.Add("IdUsuario", getUserId());
            return await this.dao.getStateDashBoard(parametros);
        }
        #endregion

        #region ++++++++++++++++++++++++ GETUSUARIOSGRID ++++++++++++++++++++++++++++
        public async Task<List<m.SCV.Interfaces.IReporteFallaIndicador>> getUsersDashBoard(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "REPORTE-FALLAS-DASHBOARD-USUARIOS");
            parametros.Add("IdUsuario", getUserId());
            return await this.dao.getUsersDashBoard(parametros);
        }
        #endregion

        #region +++++++++++++++++++++++ GETTOPFALLAS ++++++++++++++++++++++++++++++
        public async Task<List<m.SCV.Interfaces.ITopReport>> getTopReportDashBoard(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "REPORTE-FALLAS-DASHBOARD-TOP-REPORT");
            parametros.Add("IdUsuario", getUserId());
            return await this.dao.getTopReportDashBoard(parametros);
        }
        #endregion

        #region +++++++++++++++++++++ GETGRIDINFO ++++++++++++++++++++++++++++++
        public async Task<List<m.SCV.Interfaces.IReporteFallasAreasComunes>> getGridDashBoard(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "REPORTE-FALLAS-DASHBOARD-GRID");
            parametros.Add("IdUsuario", getUserId());
            return await this.dao.getGridDashBoard(parametros);
        }
        #endregion

        #region ++++++++++++++++++++++ SEARCH REPORT +++++++++++++++++++++++++++
        public async override Task<object[]> Search(string criteria)
        {
            var parametros = new Dictionary<string, object>();
            parametros.Add("IdUsuario", getUserId());
            parametros.Add("OperacionEspecificaSP", "SEARCHREPORT");
            parametros.Add("search", criteria);

            return await this.dao.Search(parametros);
        }
        #endregion

        #region ++++++++++++++++++++++ EXPORT +++++++++++++++++++++++++++++++
        public override async Task<object[]> Export(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "REPORTE-FALLAS-DASHBOARD-GRID");
            parametros.Add("IdUsuario", getUserId());

            dynamic retValue = new List<dynamic>();

            var reportes = await this.dao.getGridDashBoard(parametros);
            if (reportes != null && reportes.Count > 0)
            {
                retValue = reportes.Select(r => new
                {
                    r.ID,
                    r.Cliente,
                    r.ResponsableConstruccion,
                    r.EstatusReporte,
                    r.Creado,
                    r.IdCreadoPor,
                    r.CreadoPor,
                    r.Modificado,
                    r.IdModificadoPor,
                    r.ModificadoPor,
                    r.IdEstatus,
                    r.Estatus,
                    r.Version
                }).ToList<dynamic>();
            }

            return retValue.ToArray();
        }


        #endregion
        #endregion

        #region +++++++++++++++++++++++++++++++++ACTIVADOR+++++++++++++++++++++++++++++++
        public async Task<IReporteFallasAreasComunes> ReverseReporteFallas(IReporteFallasAreasComunes item)
        {
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoDET = Get<d.SCV.Interfaces.IReporteFallasAreasComunesPartidas>();
            var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes>();
            var daoDict = Get<d.SCV.Interfaces.IReportesDictamenesAreasComunes>();

            try
            {
                BeginTransaction(true);
                var ordenesTrabajo = item.OrdenesTrabajo;
                var Dictamenes = item.Dictamenes;

                switch (item.IdEstatusReporte)
                {
                    case "T":
                        if (ordenesTrabajo != null && ordenesTrabajo.Count > 0)
                        {
                            var estatusNuevo = await bpCG.Get("SPVESTATUSOT", "N");
                            foreach (var ot in ordenesTrabajo)
                            {
                                if (ot.seleccionAbrir)
                                {
                                    var partidasOT = ot.Partidas;
                                    if (partidasOT != null && partidasOT.Count > 0)
                                    {
                                        foreach (var pp in partidasOT)
                                        {
                                            var p = await daoDET.GetById(pp.IdPartida);
                                            p.EstatusAutorizacion = "N";
                                            p.EstatusPartidaValor = "N";
                                            p.Procede = "S";
                                            p.Modificado = DateTime.Now;
                                            p.IdModificadoPor = base.getUserId();
                                            p.Changed("EstatusAutorizacion", true);
                                            p.Changed("EstatusPartidaValor", true);
                                            p.Changed("Procede", true);
                                            p.Changed("IdCausaFalla", true);
                                            p.Changed("Modificado", true);
                                            p.Changed("IdModificadoPor", true);
                                            await daoDET.SaveEntity(p);
                                        }
                                    }

                                    ot.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                    ot.IdEstatusOrdenTrabajo = estatusNuevo.ID;
                                    ot.FechaInicio = null;
                                    ot.FechaInicioReal = null;
                                    ot.FechaFin = null;
                                    ot.FechaFinReal = null;
                                    ot.DiasEstimadoCulminacion = 0;
                                    ot.Autorizada = false;
                                    ot.Modificado = DateTime.Now;
                                    ot.IdModificadoPor = base.getUserId();
                                    ot.IdAgenda = null;
                                    if (ot.Observaciones != null && ot.Observaciones.Contains("♪"))
                                    {
                                        var Obs = ot.Observaciones.Split('♪');
                                        ot.Observaciones = Obs[0];
                                    }
                                    ot.Changed("IdEstatusOrdenTrabajo", true);
                                    ot.Changed("FechaInicio", true);
                                    ot.Changed("FechaInicioReal", true);
                                    ot.Changed("FechaFin", true);
                                    ot.Changed("FechaFinReal", true);
                                    ot.Changed("DiasEstimadoCulminacion", true);
                                    ot.Changed("Autorizada", true);
                                    ot.Changed("Modificado", true);
                                    ot.Changed("IdModificadoPor", true);
                                    ot.Changed("IdAgenda", true);
                                    ot.Changed("Observaciones", true);

                                    await daoOT.SaveEntity(ot);
                                }
                            }
                        }
                        break;
                    case "X":
                        if (ordenesTrabajo != null && ordenesTrabajo.Count > 0)
                        {
                            var estatusNuevo = await bpCG.Get("SPVESTATUSOT", "N");

                            foreach (var ot in ordenesTrabajo)
                            {
                                if (ot.IdEstatusOrdenTrabajo == 1095 || ot.seleccionAbrir)
                                {
                                    var partidasOT = ot.Partidas;
                                    if (partidasOT != null && partidasOT.Count > 0)
                                    {
                                        foreach (var pp in partidasOT)
                                        {
                                            var p = await daoDET.GetById(pp.IdPartida);
                                            p.EstatusAutorizacion = "N";
                                            p.EstatusPartidaValor = "N";
                                            p.Procede = "S";
                                            p.Modificado = DateTime.Now;
                                            p.IdModificadoPor = base.getUserId();
                                            p.Changed("EstatusAutorizacion", true);
                                            p.Changed("EstatusPartidaValor", true);
                                            p.Changed("Procede", true);
                                            p.Changed("IdCausaFalla", true);
                                            p.Changed("Modificado", true);
                                            p.Changed("IdModificadoPor", true);

                                            await daoDET.SaveEntity(p);
                                        }
                                    }

                                    ot.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                    ot.IdEstatusOrdenTrabajo = estatusNuevo.ID;
                                    ot.FechaInicio = null;
                                    ot.FechaInicioReal = null;
                                    ot.FechaFin = null;
                                    ot.FechaFinReal = null;
                                    ot.DiasEstimadoCulminacion = 0;
                                    ot.Autorizada = false;
                                    ot.Modificado = DateTime.Now;
                                    ot.IdModificadoPor = base.getUserId();
                                    ot.IdAgenda = null;
                                    if (ot.Observaciones != null && ot.Observaciones.Contains("♪"))
                                    {
                                        var Obs = ot.Observaciones.Split('♪');
                                        ot.Observaciones = Obs[0];
                                    }
                                    ot.Changed("IdEstatusOrdenTrabajo", true);
                                    ot.Changed("FechaInicio", true);
                                    ot.Changed("FechaInicioReal", true);
                                    ot.Changed("FechaFin", true);
                                    ot.Changed("FechaFinReal", true);
                                    ot.Changed("DiasEstimadoCulminacion", true);
                                    ot.Changed("Autorizada", true);
                                    ot.Changed("Modificado", true);
                                    ot.Changed("IdModificadoPor", true);
                                    ot.Changed("IdAgenda", true);
                                    ot.Changed("Observaciones", true);

                                    await daoOT.SaveEntity(ot);
                                }
                            }
                        }
                        if (Dictamenes != null && Dictamenes.Count > 0)
                        {
                            foreach (var dictamen in Dictamenes)
                            {
                                var d = await daoDict.GetById(dictamen.ID.Value);
                                if (d.IdEstatusDictamen == 1095)
                                {
                                    var ptas = d.IdPartidas;
                                    var partidasDiagnostico = ptas.Split(',');
                                    foreach (var p in partidasDiagnostico)
                                    {
                                        var pta = await daoDET.GetById(Convert.ToInt32(p));
                                        pta.IdEstatusDictamen = 1101;
                                        pta.EstatusDictamen = "ABIERTO";
                                        if (pta.EstatusPartidaValor == "X")
                                        {
                                            pta.EstatusPartidaValor = "N";
                                            pta.Changed("EstatusPartidaValor", true);
                                        }
                                        pta.Changed("IdEstatusDictamen", true);
                                        pta.Changed("EstatusDictamen", true);

                                        await daoDET.SaveEntity(pta);
                                    }
                                    d.IdEstatusDictamen = 1101;
                                    d.EstatusDictamenValue = "I";
                                    d.IdAgenda = null;
                                    d.Changed("IdEstatusDictamen", true);
                                    d.Changed("EstatusDictamenValue", true);
                                    d.Changed("IdAgenda", true);
                                    await daoDict.SaveEntity(d);
                                }
                            }
                        }
                        break;

                }
                item.IdEstatusReporte = "N";
                item.Cancelado = "N";
                item.IdMotivoCancelado = null;
                item.FechaCancelacion = null;
                item.FechaContratistaFinal = null;
                item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                item.IdEstatusRevisado = "N";
                item.Modificado = DateTime.Now;
                item.IdModificadoPor = base.getUserId();
                item.Changed("IdEstatusReporte", true);
                item.Changed("IdEstatusRevisado", true);
                item.Changed("Modificado", true);
                item.Changed("IdModificadoPor", true);
                item.Changed("Cancelado", true);
                item.Changed("IdMotivoCancelado", true);
                item.Changed("FechaCancelacion", true);
                item.Changed("FechaContratistaFinal", true);
                item.Changed("Estado", true);


                int? id = item.IdFolio;
                item.IdFolio = item.ID;
                item.ID = id;

                await this.dao.SaveEntity(item);

                item.Estado = m.Kontrol.KontrolEstadosEnum.Exitoso;

                Commit();
                return item;

            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        #endregion

    }
}
public class PartidasPendientesOt
{
    public int? Id { get; set; }
    public bool PendienteOt { get; set; }
}