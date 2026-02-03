using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using EK.Procesos.SCV.Interfaces;
using System.IO;
using System.Dynamic;

namespace EK.Procesos.SCV
{
    public class PlanCompromisosEntrega : p.Kontrol.BPBase<m.SCV.Interfaces.IPlanCompromisosEntrega, d.SCV.Interfaces.IPlanCompromisosEntrega>, p.SCV.Interfaces.IPlanCompromisosEntrega
    {
       

        public PlanCompromisosEntrega(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IPlanCompromisosEntrega dao)
            : base(factory, dao, "PlanCompromisosEntrega")
        { }


        #region DASHBOARD


        public async Task<List<m.SCV.Interfaces.IPlanCompromisosConstruccion>> getGridDashBoard(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "DASHBOARD-GRID");
            parametros.Add("IdUsuario", getUserId());
            return await this.dao.getGridDashBoard(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IPlanCompromisoIndicador>> getDesarrolloDashBoard(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "DASHBOARD-DESARROLLO");
            parametros.Add("IdUsuario", getUserId());
            return await this.dao.getDesarrolloDashBoard(parametros);
        }
        //public async Task<List<m.SCV.Interfaces.ITopReport>> getTopIncidencias(Dictionary<string, object> parametros)
        //{
        //    parametros.Add("OperacionEspecificaSP", "DASHBOARD-TOP-INCIDENCIAS");
        //    parametros.Add("IdUsuario", getUserId());
        //    return await this.dao.getTop(parametros);
        //}
        //public async Task<List<m.SCV.Interfaces.ITopReport>> getTopContratistas(Dictionary<string, object> parametros)
        //{
        //    parametros.Add("OperacionEspecificaSP", "DASHBOARD-TOP-CONTRATISTAS");
        //    parametros.Add("IdUsuario", getUserId());
        //    return await this.dao.getTop(parametros);
        //}
        //public async Task<List<m.SCV.Interfaces.ITopReport>> getTopPrototipos(Dictionary<string, object> parametros)
        //{
        //    parametros.Add("OperacionEspecificaSP", "DASHBOARD-TOP-PROTOTIPOS");
        //    parametros.Add("IdUsuario", getUserId());
        //    return await this.dao.getTop(parametros);
        //}
        //public async Task<List<m.SCV.Interfaces.IExpedienteUbicacion>> getExpedienteUbicaciones(int idCliente)
        //{
        //    var parametros = new Dictionary<string, object>();
        //    //parametros.Add("OperacionEspecificaSP", "DASHBOARD-USUARIOS");
        //    parametros.Add("IdUsuario", getUserId());
        //    parametros.Add("IdCliente", idCliente);
        //    return await this.dao.getExpedienteUbicaciones(parametros);
        //}
        //public async Task<List<m.SCV.Interfaces.IUbicacionComponente>> getUbicacionesComponente(int idPrototipo)
        //{
        //    var parametros = new Dictionary<string, object>();
        //    //parametros.Add("OperacionEspecificaSP", "DASHBOARD-USUARIOS");
        //    parametros.Add("activos", 1);
        //    parametros.Add("idPrototipo", idPrototipo);
        //    return await this.dao.getUbicacionesComponente(parametros);
        //}

        #endregion
        #region "Edit"
        //public async Task<List<m.SCV.Interfaces.IClienteContactos>> GetContactoCliente(int idCliente)
        //{
        //    var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();
        //    var daoCSPV = Get<d.SCV.Interfaces.IClientesSPV>();
        //    var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();

        //    try
        //    {
        //        bool addTelefonoCasa = true;
        //        bool addTelefonoOficina = true;
        //        bool addTelefonoOtro = true;

        //        var parametros = new Dictionary<string, object>();
        //        parametros.Add("idCliente", idCliente);

        //        var contactos = await daoRL.GetAll(parametros);
        //        if (contactos != null)
        //        {
        //            var contactosTelefono = contactos.FindAll(c => c.TipoContacto.Clave == "TELEFONO");
        //            if (contactosTelefono != null)
        //            {
        //                addTelefonoCasa = !contactosTelefono.Exists(c => c.TipoTelefono.Clave == "CS");
        //                addTelefonoOficina = !contactosTelefono.Exists(c => c.TipoTelefono.Clave == "T");
        //                addTelefonoOtro = !contactosTelefono.Exists(c => c.TipoTelefono.Clave == "O");
        //            }
        //        }

        //        var clienteSPV = await daoCSPV.GetById(idCliente);

        //        if (addTelefonoCasa == true)
        //        {
        //            if (!string.IsNullOrEmpty(clienteSPV.TelefonoCasa))
        //            {
        //                var item = Get<m.SCV.Interfaces.IClienteContactos>();
        //                item.ID = -1;
        //                item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
        //                item.Contacto = clienteSPV.TelefonoCasa;
        //                item.TipoContacto = await bpCGV.Get("TIPOCONTACTO", "TELEFONO");
        //                item.TipoTelefono = await bpCGV.Get("TIPOTELEFONO", "CS");
        //                contactos.Add(item);
        //            }
        //        }

        //        if (addTelefonoOficina == true)
        //        {
        //            if (!string.IsNullOrEmpty(clienteSPV.TelefonoOficina))
        //            {
        //                var item = Get<m.SCV.Interfaces.IClienteContactos>();
        //                item.ID = -2;
        //                item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
        //                item.Contacto = clienteSPV.TelefonoOficina;
        //                item.TipoContacto = await bpCGV.Get("TIPOCONTACTO", "TELEFONO");
        //                item.TipoTelefono = await bpCGV.Get("TIPOTELEFONO", "T");
        //                contactos.Add(item);
        //            }
        //        }

        //        if (addTelefonoOtro == true)
        //        {
        //            if (!string.IsNullOrEmpty(clienteSPV.TelefonoOtros))
        //            {
        //                var item = Get<m.SCV.Interfaces.IClienteContactos>();
        //                item.ID = -3;
        //                item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
        //                item.Contacto = clienteSPV.TelefonoOtros;
        //                item.TipoContacto = await bpCGV.Get("TIPOCONTACTO", "TELEFONO");
        //                item.TipoTelefono = await bpCGV.Get("TIPOTELEFONO", "O");
        //                contactos.Add(item);
        //            }
        //        }

        //        return contactos;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //public async Task<m.SCV.Interfaces.ITicketIncidenciaDetalle> CalcularPartida(m.SCV.Interfaces.ITicketIncidenciaDetalle partida, m.SCV.Interfaces.ITicket reporte)
        //{
        //    //var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
        //    var bpCausaIncidencia = Get<p.SCV.Interfaces.ICausasIncidencias>();
        //    var bpComp= Get<p.SCV.Interfaces.IComponentesIncidencias>();
        //    var bpPrototipo = Get<p.SCV.Interfaces.IPrototipo>();
        //    try
        //    {
        //        //var falla = await this.dao.GetFallaPartida((int)partida.Falla.IdFalla, (int)partida.Falla.IdTipoFalla);
        //        //if (falla == null)
        //        //{
        //        //    base.SetReturnInfo(1, "La Falla seleccionada no corresponde con el Tipo de Falla o el Tipo de Vivienda Establecido.");
        //        //    return null;
        //        //}

        //        //int valida_vivienda_entregada = await this.dao.ValidarEntregaVivienda();
        //        //if (valida_vivienda_entregada == 1)
        //        //{
        //        //    if (reporte.FechaEntregaVivienda == null)
        //        //    {
        //        //        base.SetReturnInfo(1, "Al cliente no se le ha entregado la vivienda. Por favor verifique la información e intente de nuevo.");
        //        //        return null;
        //        //    }
        //        //}

        //        if (reporte.ExpedienteUbicacion.Ubicacion.FechaEntrega != null)
        //        {
        //            if (reporte.ID <= 0 || reporte.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
        //            {
        //                reporte.FechaReporte= DateTime.UtcNow;
        //            }
        //            //traemos los valore de ticket
        //            var bkComponente = await bpComp.GetById(partida.Componente.ID.Value);
        //            var bkProto = await bpPrototipo.GetById(reporte.ExpedienteUbicacion.Ubicacion.IdPrototipo);
        //            var tipoInmueble = bkComponente.TiposInmuebles.Where(e => e.TipoInmueble.ID == bkProto.Inmueble.ID).FirstOrDefault();
        //            partida.DiasGarantia = tipoInmueble.Garantia;
        //            partida.DiasSolucion = tipoInmueble.TiempoSolucion;
        //            partida = this.CalcularGarantia(partida, (int)tipoInmueble.Garantia, (DateTime)reporte.ExpedienteUbicacion.Ubicacion.FechaEntrega, (DateTime)reporte.FechaReporte);
        //        }
        //        else
        //        {
        //            partida.TerminoGarantia = DateTime.UtcNow;
        //            partida.DiasGarantia = 0;
        //        }

        //        if (partida.DiasGarantia > 0)
        //        {
        //            partida.PartidaAutorizada = "A";
        //            partida.Procede = "S";
        //            partida.ProcedeBool = true;
        //        }
        //        else
        //        {
        //            partida.PartidaAutorizada = "R";
        //            partida.Procede = "N";
        //            partida.ProcedeBool = false;
        //        }



        //        partida.EstatusAutorizacion = "N";
        //        partida.EstatusPartidaValor = "N";
        //        //partida.EstatusPartida = await bpEstatus.Get("SPVESTATUSREPORTEPARTIDA", "N");

        //        if (partida.ID == null || partida.ID <= 0)
        //        {
        //            partida.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

        //            var causaFalla = await bpCausaIncidencia.GetByClave("DIN");
        //            if (causaFalla != null)
        //            {
        //                partida.IdCausaFalla = (int)causaFalla.ID;
        //                partida.CausaIncidencia = causaFalla;
        //            }
        //        }
        //        else
        //        {
        //            partida.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
        //        }

        //        //partida.Reincidencias = await this.CalcularReincidencias(partida);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }

        //    return partida;
        //}


        //public async Task<List<m.SCV.Interfaces.IOrdenTrabajoDetalle>> CalcularPartidasOT(int idTicket, int idContratista, m.SCV.Interfaces.IOrdenTrabajo orden, List<m.SCV.Interfaces.IOrdenTrabajo> ordenes)
        //{
        //    //var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();

        //    var daoDET = Get<d.SCV.Interfaces.IIncidencias>();
        //    var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
        //    var estatus = await bpCGV.Get("ESTATUS", "A");

        //    // validar que las ordenes sean del contratista en edición.
        //    ordenes = ordenes != null ? ordenes : new List<m.SCV.Interfaces.IOrdenTrabajo>();
        //    ordenes = ordenes.Where(o => o.IdContratista == idContratista).ToList();

        //    // colocar las partidas capturadas en la sección en el array de ordenes
        //    int ordenIndex = ordenes.FindIndex(o => o.ID == orden.ID);
        //    if (ordenIndex != -1)
        //    {
        //        ordenes[ordenIndex].Incidencias = orden.Incidencias;
        //    }
        //    else
        //    {
        //        ordenes.Add(orden);
        //        ordenIndex = ordenes.FindIndex(o => o.ID == orden.ID);
        //    }

        //    // partidas disponibles para agregar a la edición del contratista.
        //    var freePartidas = new List<m.SCV.Interfaces.IOrdenTrabajoDetalle>();

        //    // consultar las partidas autorizadas del reporte de fallas.
        //    var parametros = new Dictionary<string, object>();
        //    parametros.Add("idTicket", idTicket);
        //    parametros.Add("idContratista", idContratista);
        //    parametros.Add("autorizado", "A");

        //    var partidas = await daoDET.GetAll(parametros);
        //    if (partidas != null)
        //    {
        //        foreach (var p in partidas)
        //        {
        //            bool pFound = false;

        //            foreach (var ot in ordenes)
        //            {
        //                if (ot.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado)
        //                {
        //                    if (ot.Incidencias != null)
        //                    {
        //                        var otpartidas = ot.Incidencias.Where(d => d.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado).ToList();
        //                        if (otpartidas.Any(d => d.ID == p.ID) == true)
        //                        {
        //                            pFound = true;
        //                            break;
        //                        }
        //                    }
        //                }
        //            }

        //            // agregar la partida como disponible si no es utilizada en una OT
        //            if (pFound == false)
        //            {
        //                var det = Get<m.SCV.Interfaces.IOrdenTrabajoDetalle>();
        //                det.ID = null;
        //                det.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
        //                det.IdPartida = (int)p.ID;
        //                det.IdIncidencia = (int)p.ID;
        //                det.Incidencia = p;
        //                det.IdOrdenTrabajo = (int)orden.ID;
        //                det.Observaciones = string.Empty;
        //                det.IdModificadoPor = base.getUserId();
        //                det.IdCreadoPor = base.getUserId();
        //                det.IdEstatus = estatus.ID;
        //                det.Estatus = estatus;

        //                freePartidas.Add(det);
        //            }
        //        }
        //    }

        //    var retValue = new List<m.SCV.Interfaces.IOrdenTrabajoDetalle>();

        //    if (ordenIndex != -1)
        //    {
        //        var otPartidas = ordenes[ordenIndex].Incidencias;
        //        if (otPartidas != null)
        //        {
        //            retValue = otPartidas;
        //        }
        //    }

        //    retValue.AddRange(freePartidas);

        //    foreach (var p in retValue)
        //    {
        //        if (p.Incidencia == null)
        //        {
        //            p.Incidencia = await daoDET.GetById(p.IdPartida);
        //        }
        //    }

        //    return retValue.OrderBy(p => p.IdPartida).ToList();
        //}


        //public override async Task<m.SCV.Interfaces.ITicket> Save(m.SCV.Interfaces.ITicket item)
        //{
        //    var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
        //    //var bpCU = Get<p.SCV.Interfaces.IContratistasUbicaciones>();
        //    var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();
        //    var daoIncidencias = Get<d.SCV.Interfaces.IIncidencias>();
        //    var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajo>();
        //    var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetalles>();
        //    //var daoDT = Get<d.Kontrol.Interfaces.IDateDifference>();
        //    //var bpPRE = Get<p.SCV.Interfaces.IPrereportes>();
        //    //var daoPRE = Get<d.SCV.Interfaces.IPrereportes>();
        //    //var daoDET = Get<d.SCV.Interfaces.IReportesFallasDetalles>();
        //    var bpPrototipo = Get<p.SCV.Interfaces.IPrototipo>();
        //    var bpComp = Get<p.SCV.Interfaces.IComponentesIncidencias>();
        //    try
        //    {

        //        //return null;
        //        BeginTransaction();

        //        //int? idPrereporte = item.IdPrereporte;
        //        var ordenesTrabajo = item.OrdenesTrabajo;



        //        if (item.ExpedienteUbicacion == null)
        //        {
        //            base.SetReturnInfo(1, "La ubicación no ha sido seleccionada. Por favor verifique e intente de nuevo.");
        //            return null;
        //        }

        //        if (item.Cliente == null)
        //        {
        //            base.SetReturnInfo(1, "El cliente no ha sido seleccionado. Por favor verifique e intente de nuevo.");
        //            return null;
        //        }

        //        //if (item.Cliente.IdUbicacion == null || item.Cliente.IdUbicacion <= 0)
        //        //{
        //        //    base.SetReturnInfo(1, "El cliente no tiene asignada una ubicación. Por favor verifique e intente de nuevo.");
        //        //    return null;
        //        //}

        //        //if (string.IsNullOrEmpty(item.Ubicacion.IdPlaza))
        //        //{
        //        //    base.SetReturnInfo(1, "La plaza no ha sido configurada correctamente. Por favor verifique e intente de nuevo.");
        //        //    return null;
        //        //}

        //        //int validaResponsablePlaza = await this.dao.ValidarResponsablePlaza(item.Ubicacion.IdPlaza);
        //        //if (validaResponsablePlaza == 0)
        //        //{
        //        //    item.SupervisorContratista = null;
        //        //    item.IdSupervisorContratista = null;
        //        //}

        //        if (item.MedioSolicitud == null)
        //        {
        //            base.SetReturnInfo(1, "El Medio de Solicitud no ha sido seleccionado. Por favor verifique e intente de nuevo.");
        //            return null;
        //        }

        //        if (item.ID == null || item.ID <= 0)
        //        {
        //            item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
        //            //item.FechaCaptura = DateTime.UtcNow;
        //            item.FechaReporte = DateTime.UtcNow;
        //            item.Ubicacion = item.ExpedienteUbicacion.Ubicacion;
        //            item.IdExpediente = item.ExpedienteUbicacion.IdExpediente;
        //            item.IdVentaUbicacion = int.Parse(item.ExpedienteUbicacion.IdVentaUbicacion);

        //            var estatusTicket = await bpCG.Get("SPVESTATUSTICKETS", "A");
        //            item.EstatusTicket = estatusTicket;
        //            item.IdEstatusTicket = estatusTicket.ID.Value;
        //            //item.IdEstatusRevisado = "N";
        //            //item.Revisado = false;
        //            //item.EsReprogramacion = 0;
        //            //item.EsClienteNormal = "S";
        //            //item.EsClientePerito = "N";
        //            //item.EsClienteProblema = "N";
        //            //item.EsClienteProfeco = "N";
        //            //item.IdTipoCliente = "E";
        //            //item.TipoCliente = await bpCG.Get("SPVTIPOSCLIENTE", "E");
        //            //item.Activo = 1;
        //            //item.Cancelado = "N";
        //            //item.CostoBase = 0;
        //            //item.CostoCubierto = "NO";
        //            //item.CostoReal = 0;
        //            //item.OC = string.Empty;

        //            //var numReincidencias = await this.dao.GetNumeroReincidencias(item.IdCliente);
        //            //item.Reincidencia = string.Format("{0}-{1}", item.IdCliente, numReincidencias + 1);


        //            item.Creado = DateTime.UtcNow;
        //            item.IdCreadoPor = base.getUserId();



        //        }
        //        else
        //        {
        //            m.SCV.Interfaces.ITicket bckp = item;
        //            item = await this.dao.GetById((int)item.ID);
        //            //item.IdUbicacion = bckp.IdUbicacion;
        //            item.Ubicacion = bckp.Ubicacion;
        //            //item.IdSupervisorContratista = bckp.IdSupervisorContratista;
        //            //item.SupervisorContratista = bckp.SupervisorContratista;
        //            //item.IdResponsableConstruccion = bckp.IdResponsableConstruccion;
        //            //item.ResponsableConstruccion = bckp.ResponsableConstruccion;
        //            item.IdMedioSolicitud = bckp.IdMedioSolicitud;
        //            item.MedioSolicitud = bckp.MedioSolicitud;
        //            item.ObservacionesContratista = bckp.ObservacionesContratista;
        //            item.ObservacionesCliente = bckp.ObservacionesCliente;
        //            //item.Contactos = bckp.Contactos;
        //            item.Partidas = bckp.Partidas;
        //            item.OrdenesTrabajo = bckp.OrdenesTrabajo;
        //            item.Estado = bckp.Estado;
        //            item.Version = bckp.Version;
        //            item.Incidencias = bckp.Incidencias;
        //        }

        //        //var etapa = await this.GetClienteEtapa(item.IdCliente, (DateTime)item.FechaCaptura);
        //        bool tieneGarantia = true;

        //        //int valida_vivienda_entregada = await this.dao.ValidarEntregaVivienda();
        //        //if (valida_vivienda_entregada == 1)
        //        //{
        //        //    if (etapa != null && etapa.FechaLiberacion == null)
        //        //    {
        //        //        base.SetReturnInfo(1, "Al cliente no se le ha entregado la vivienda. Por favor verifique la información e intente de nuevo.");
        //        //        return null;
        //        //    }
        //        //}

        //        //if (etapa != null && etapa.FechaLiberacion != null)
        //        //{
        //        //    var diff = await daoDT.GetDateDifference("yy", (DateTime)etapa.FechaLiberacion, (DateTime)item.FechaCaptura);
        //        //    if (diff.Year > 5)
        //        //    {
        //        //        tieneGarantia = false;
        //        //    }
        //        //}

        //        var estatus = await bpCG.Get("ESTATUS", "A");
        //        item.IdEstatus = estatus.ID;
        //        item.Estatus = estatus;
        //        //item.IdRecibidoPor = base.getUserId();
        //        //item.Recibido = DateTime.UtcNow;

        //        //if (etapa != null)
        //        //{
        //        //    item.FechaEntregaVivienda = etapa.FechaLiberacion;
        //        //}


        //        item.IdMedioSolicitud = (int)item.MedioSolicitud.ID;

        //        //item.Calle = item.Ubicacion.Calle;
        //        //item.SuperManzana = item.Ubicacion.SuperManzana;
        //        //item.Manzana = item.Ubicacion.Manzana;
        //        //item.Exterior = item.Ubicacion.Exterior;
        //        //item.Interior = item.Ubicacion.Interior;
        //        //item.Lote = item.Ubicacion.Lote;
        //        //item.DesarrolloClave = item.Ubicacion.DesarrolloClave;
        //        //item.IdPlaza = item.Ubicacion.IdPlaza;
        //        //item.IdPrototipo = item.Ubicacion.IdPrototipo;
        //        //item.IdSupervisor = item.Ubicacion.IdSupervisor;
        //        //item.IdCoordinador = item.Ubicacion.IdCoordinador;
        //        //item.IdResponsable = item.IdResponsableConstruccion;

        //        //var cOrigen = await bpCU.GetContratistaDefault((int)item.IdUbicacion);
        //        //if (cOrigen != null)
        //        //{
        //        //    item.Contratista = cOrigen;
        //        //    item.IdContratista = cOrigen.ID;
        //        //}

        //        //if (item.Ubicacion.Segmento != null)
        //        //{
        //        //    item.IdTipoVivienda = item.Ubicacion.Segmento.IdTipoVivienda;
        //        //}

        //        var contactos = item.Contactos;
        //        var partidas = item.Incidencias;
        //        //var ordenesTrabajo = item.OrdenesTrabajo;

        //        //if (contactos != null)
        //        //{
        //        //    foreach (var c in contactos)
        //        //    {
        //        //        if (c.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
        //        //        {
        //        //            if (c.TipoContacto.Clave == "TELEFONO")
        //        //            {
        //        //                if (c.TipoTelefono.Clave == "CS")
        //        //                {
        //        //                    if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
        //        //                    {
        //        //                        item.TelefonoCasa = string.Empty;
        //        //                    }
        //        //                    else
        //        //                    {
        //        //                        item.TelefonoCasa = c.Contacto;
        //        //                    }
        //        //                }
        //        //                else if (c.TipoTelefono.Clave == "T")
        //        //                {
        //        //                    if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
        //        //                    {
        //        //                        item.TelefonoOficina = string.Empty;
        //        //                    }
        //        //                    else
        //        //                    {
        //        //                        item.TelefonoOficina = c.Contacto;
        //        //                    }
        //        //                }
        //        //                else if (c.TipoTelefono.Clave == "O")
        //        //                {
        //        //                    if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
        //        //                    {
        //        //                        item.TelefonoOtros = string.Empty;
        //        //                    }
        //        //                    else
        //        //                    {
        //        //                        item.TelefonoOtros = c.Contacto;
        //        //                    }
        //        //                }
        //        //            }
        //        //        }
        //        //    }
        //        //}

        //        //if (partidas != null && tieneGarantia == true)
        //        //{
        //        //    foreach (var p in partidas)
        //        //    {
        //        //        if (p.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
        //        //        {
        //        //            item.IdEstatusRevisado = "N";
        //        //            break;
        //        //        }
        //        //    }
        //        //}

        //        //Guardamos los dias posibles de solucion
        //        if (item.DiasSolucion == null) {
        //            item.DiasSolucion = 0;
        //            var bkProto = await bpPrototipo.GetById(item.ExpedienteUbicacion.Ubicacion.IdPrototipo);

        //            foreach (var i in item.Incidencias)
        //            {
        //                IComponenteIncidencia bkComponente  = await bpComp.GetById(i.Componente.ID.Value);
        //                var tipoInmueble = bkComponente.TiposInmuebles.Where(e => e.TipoInmueble.ID == bkProto.Inmueble.ID).FirstOrDefault();
        //                item.DiasSolucion =  item.DiasSolucion + tipoInmueble.TiempoSolucion;
        //                item.FechaPosibleSolucion = item.FechaReporte.AddDays((double)item.DiasSolucion);
        //            }

        //        }





        //    item = await this.saveModel(item);

        //        //if (idPrereporte > 0)
        //        //{
        //        //    var pprt = await bpPRE.GetById((int)idPrereporte);
        //        //    pprt.EstatusReporteId = 3;
        //        //    pprt.IdReporte = item.ID;
        //        //    pprt.Modificado = DateTime.UtcNow;
        //        //    pprt.IdModificadoPor = base.getUserId();

        //        //    pprt.Changed("EstatusReporteId", true);
        //        //    pprt.Changed("IdReporte", true);
        //        //    pprt.Changed("Modificado", true);
        //        //    pprt.Changed("IdModificadoPor", true);

        //        //    await daoPRE.Save(pprt);
        //        //}

        //        if (contactos != null)
        //        {
        //            foreach (var c in contactos)
        //            {
        //                if (c.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
        //                {
        //                    if (c.TipoContacto.Clave == "TELEFONO")
        //                    {
        //                        c.TipoTelefono = c.TipoTelefono;
        //                        c.IdTipoTelefono = c.TipoTelefono.ID;
        //                    }

        //                    c.IdCliente = item.Cliente.ID.Value;
        //                    c.Estatus = estatus;
        //                    c.IdEstatus = estatus.ID;
        //                    c.Modificado = DateTime.UtcNow;
        //                    c.IdModificadoPor = base.getUserId();
        //                    c.IdTipoContacto = (int)c.TipoContacto.ID;
        //                    c.Estado = c.ID == null || c.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;

        //                    if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
        //                    {
        //                        c.Creado = DateTime.UtcNow;
        //                        c.IdCreadoPor = base.getUserId();
        //                    }

        //                    if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
        //                    {
        //                        await daoRL.Delete(c.ID.Value);
        //                    }
        //                    else
        //                    {
        //                        await daoRL.SaveEntity(c, false, true);
        //                    }
        //                }
        //            }
        //        }

        //        if (partidas != null && partidas.Count > 0)
        //        {
        //            int result = await this.SaveIncidencias(partidas, item);
        //            if (result < 0)
        //            {
        //                Rollback();
        //                return null;
        //            }
        //        }

        //        bool cerrarReporte = false;



        //        if (ordenesTrabajo != null && tieneGarantia == true)
        //        {
        //            var estatusNuevo = await bpCG.Get("SPVESTATUSOT", "N");
        //            var estatusTerminado = await bpCG.Get("SPVESTATUSOT", "T");

        //            foreach (var o in ordenesTrabajo)
        //            {
        //                if (o.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
        //                {
        //                    o.Estatus = estatus;
        //                    o.IdEstatus = estatus.ID;
        //                    o.Modificado = DateTime.UtcNow;
        //                    o.IdModificadoPor = base.getUserId();
        //                    o.IdVentaUbicacion = (int)item.IdVentaUbicacion;
        //                    o.IdTicket = (int)item.ID;
        //                    if (o.ID == null || o.ID <= 0)
        //                    {
        //                        o.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
        //                        o.Creado = DateTime.UtcNow;
        //                        o.IdCreadoPor = base.getUserId();
        //                        o.EstatusOrdenTrabajo = estatusNuevo;
        //                        o.IdEstatusOrdenTrabajo = estatusNuevo.ID.Value;
        //                        //o.Autorizada = false;
        //                    }

        //                    //actualizar información de la orden de trabajo
        //                    if (o.EstatusOrdenTrabajo.Clave == "N")
        //                    {
        //                        if (o.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
        //                        {
        //                            if (o.Incidencias != null)
        //                            {
        //                                foreach (var d in o.Incidencias)
        //                                {
        //                                    await daoOTD.Delete(d.ID.Value);
        //                                }
        //                            }

        //                            await daoOT.Delete(o.ID.Value);
        //                        }
        //                        else
        //                        {
        //                            var ot = await daoOT.SaveEntity(o, false, true);

        //                            if (o.Incidencias != null)
        //                            {
        //                                foreach (var d in o.Incidencias)
        //                                {
        //                                    if (d.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
        //                                    {
        //                                        d.IdOrdenTrabajo = (int)ot.ID;
        //                                        d.Estatus = estatus;
        //                                        d.IdEstatus = estatus.ID;
        //                                        d.Modificado = DateTime.UtcNow;
        //                                        d.IdModificadoPor = base.getUserId();
        //                                        //d.IdIncidencia = d.IdIncidencia;


        //                                        if (d.ID == null || d.ID <= 0)
        //                                        {
        //                                            d.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
        //                                        }

        //                                        if (d.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
        //                                        {
        //                                            d.Creado = DateTime.UtcNow;
        //                                            d.IdCreadoPor = base.getUserId();
        //                                        }

        //                                        if (d.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
        //                                        {
        //                                            await daoOTD.Delete(d.ID.Value);
        //                                        }
        //                                        else
        //                                        {
        //                                            await daoOTD.SaveEntity(d, false, true);
        //                                        }
        //                                    }
        //                                }
        //                            }
        //                        }
        //                    }

        //                    //actualizar trabajo de la orden de trabajo
        //                    if (o.EstatusOrdenTrabajo.Clave == "E")
        //                    {
        //                        if (o.Incidencias != null && o.Incidencias.Count > 0)
        //                        {
        //                            foreach (var p in o.Incidencias)
        //                            {
        //                                if (p.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
        //                                {
        //                                    //var partida = await daoDET.GetById(p.IdPartida);
        //                                    //partida.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
        //                                    //partida.IdCausaFalla = p.Partida.CausaFalla.IdCausaFalla;
        //                                    //partida.FechaInicioReal = o.FechaInicioReal;
        //                                    //partida.FechaTerminacion = o.FechaFinReal;
        //                                    //partida.IdModificadoPor = base.getUserId();
        //                                    //partida.Modificado = DateTime.UtcNow;
        //                                    //partida.Changed("IdCausaFalla", true);
        //                                    //partida.Changed("FechaInicioReal", true);
        //                                    //partida.Changed("FechaTerminacion", true);
        //                                    //partida.Changed("IdModificadoPor", true);
        //                                    //partida.Changed("Modificado", true);

        //                                    //await daoDET.SaveEntity(partida, false, false);
        //                                }
        //                            }
        //                        }

        //                        o.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
        //                        o.IdModificadoPor = base.getUserId();
        //                        o.Modificado = DateTime.UtcNow;
        //                        o.Changed("FechaInicioReal", true);
        //                        o.Changed("FechaFinReal", true);
        //                        o.Changed("Observaciones", true);
        //                        o.Changed("IdModificadoPor", true);
        //                        o.Changed("Modificado", true);

        //                        //if (o.CerrarRegistro == true)
        //                        //{
        //                        //    cerrarReporte = true;

        //                        //    o.IdEstatusOrdenTrabajo = estatusTerminado.ID;
        //                        //    o.Changed("IdEstatusOrdenTrabajo", true);

        //                        //    if (o.Partidas != null && o.Partidas.Count > 0)
        //                        //    {
        //                        //        foreach (var p in o.Partidas)
        //                        //        {
        //                        //            var partida = await daoDET.GetById(p.IdPartida);
        //                        //            partida.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
        //                        //            partida.FechaCerrado = o.FechaFinReal;
        //                        //            partida.EstatusPartidaValor = "T";
        //                        //            partida.IdModificadoPor = base.getUserId();
        //                        //            partida.Modificado = DateTime.UtcNow;
        //                        //            partida.Changed("FechaCerrado", true);
        //                        //            partida.Changed("EstatusPartidaValor", true);
        //                        //            partida.Changed("IdModificadoPor", true);
        //                        //            partida.Changed("Modificado", true);

        //                        //            await daoDET.SaveEntity(partida, false, false);
        //                        //        }
        //                        //    }
        //                        //}

        //                        await daoOT.SaveEntity(o, false, false);
        //                    }
        //                }
        //            }
        //        }

        //        //if (cerrarReporte == true)
        //        //{
        //        //    item = await this.TryCerrarReporte(item);
        //        //}

        //        item = await this.afterGetItem(item);

        //        Commit();
        //    }
        //    catch (Exception ex)
        //    {
        //        Rollback();
        //        throw ex;
        //    }

        //    item = await GetById(item.ID.Value);

        //    return item;
        //}

        //public override async Task<ITicket> GetById(int id)
        //{
        //    var dao = Get<d.SCV.Interfaces.ITickets>();


        //    var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajo>();
        //    var daoOTDetalle = Get<d.SCV.Interfaces.IOrdenesTrabajoDetalles>();
        //    var daoIncidencias = Get<d.SCV.Interfaces.IIncidencias>();
        //    var daoDIC = Get<d.SCV.Interfaces.ITicketsDictamenes>();

        //    var item = await dao.GetById(id);

        //    item.Contactos = await GetContactoCliente(item.Cliente.ID.Value);

        //    //var tipoFalla = await daoTipoFalla.GetById(item.TipoFalla.ID??0);

        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "idTicket", id}
        //        };
        //        //item.TipoFalla = tipoFalla;
        //        //List<IFallaTipoFalla> tiposFallas = (List<IFallaTipoFalla>)await daoTipoFalla.GetAll(parameters);
        //        List<IIncidencia> incidencias = (List<IIncidencia>)await daoIncidencias.GetAll(parameters);
        //        List<IOrdenTrabajo> ots = (List<IOrdenTrabajo>)await daoOT.GetAll(parameters);

        //        foreach (var ot in ots)
        //        {
        //            var parOt = new Dictionary<string, object>
        //            {
        //                { "idTicket", id},
        //                { "idOT", ot.ID}
        //            };

        //            ot.Incidencias = (List<IOrdenTrabajoDetalle>)await daoOTDetalle.GetAll(parOt);

        //        }
        //        foreach (var incidencia in incidencias)
        //        {
        //            var parametros = new Dictionary<string, object>();
        //            parametros.Add("idIncidencia", incidencia.ID);


        //            incidencia.Dictamenes = await daoDIC.GetAll(parametros);
        //        }

        //        //item.TiposFallas = tiposFallas;
        //        item.Incidencias = incidencias;
        //        item.Partidas = incidencias;
        //        item.OrdenesTrabajo = ots;

        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }



        //    return item;
        //}

        //private async Task<int> SaveIncidencias(List<m.SCV.Interfaces.IIncidencia> incidencias, m.SCV.Interfaces.ITicket ticket)
        //{
        //    var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
        //    var daoDET = Get<d.SCV.Interfaces.IIncidencias>();
        //    var bpCausa = Get<p.SCV.Interfaces.ICausasIncidencias>();
        //    var daoDIC = Get<d.SCV.Interfaces.ITicketsDictamenes>();
        //    //var bpFiles = Get<p.Kontrol.Interfaces.IKontrolFiles>();

        //    try
        //    {
        //        var estatus = await bpCG.Get("ESTATUS", "A");

        //        foreach (var p in incidencias)
        //        {
        //            if (p.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
        //            {
        //                m.SCV.Interfaces.IIncidencia row = p;

        //                //if (row.TipoFalla == null)
        //                //{
        //                //    base.SetReturnInfo(1, "No se capturó el Tipo de Falla en la partida " + row.Partida + ". Por favor verifique e intente de nuevo.");
        //                //    return -1;
        //                //}

        //                //if (row.Falla == null)
        //                //{
        //                //    base.SetReturnInfo(1, "No se capturó la Falla en la partida " + row.Partida + ". Por favor verifique e intente de nuevo.");
        //                //    return -1;
        //                //}

        //                //if (row.UbicacionFalla == null)
        //                //{
        //                //    base.SetReturnInfo(1, "No se capturó la Ubicación de la Falla en la partida " + row.Partida + ". Por favor verifique e intente de nuevo.");
        //                //    return -1;
        //                //}

        //                if (row.ID == null || row.ID <= 0)
        //                {
        //                    row.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
        //                    //row.Activo = 1;
        //                    //row.CostoBase = 0;
        //                    row.Creado = DateTime.UtcNow;
        //                    row.IdModificadoPor = base.getUserId();
        //                    row.IdTicket = ticket.ID.Value;
        //                    row.IdUbicacionComponente = p.IdUbicacionComponente;

        //                    row.FechaTerminoGarantia = DateTime.UtcNow;
        //                    row.FechaCierre = DateTime.UtcNow;

        //                    //row.IdCausa = ticket.;

        //                    if (row.CausaIncidencia == null)
        //                    {
        //                        var causaFalla = await bpCausa.GetByClave("DIN");
        //                        if (causaFalla != null)
        //                        {
        //                            row.IdCausa = (int)causaFalla.ID;
        //                            row.CausaIncidencia = causaFalla;
        //                        }
        //                    }
        //                }
        //                else
        //                {
        //                    m.SCV.Interfaces.IIncidencia bckp = p;
        //                    row = await daoDET.GetById((int)p.ID);
        //                    //row.Partida = bckp.Partida;
        //                    //row.Procede = bckp.Procede;
        //                    //row.ProcedeBool = bckp.ProcedeBool;
        //                    //row.IdTipocompo = bckp.IdTipoFalla;
        //                    row.Componente = bckp.Componente;
        //                    row.IdComponente = bckp.IdComponente;
        //                    //row.Falla = bckp.Falla;
        //                    row.IdCausa = bckp.IdCausa;
        //                    row.CausaIncidencia = bckp.CausaIncidencia;
        //                    row.IdUbicacionComponente = bckp.IdUbicacionComponente;
        //                    row.UbicacionComponente = bckp.UbicacionComponente;
        //                    row.IdContratista = bckp.IdContratista;
        //                    row.Contratista = bckp.Contratista;
        //                    row.FechaTerminoGarantia = bckp.FechaTerminoGarantia;
        //                    row.DiasGarantia = bckp.DiasGarantia;
        //                    //row.FechaCerrado = bckp.FechaCerrado;
        //                    row.EstatusIncidencia = bckp.EstatusIncidencia;
        //                    //row.EstatusPartidaValor = bckp.EstatusPartidaValor;
        //                    //row.EstatusAutorizacion = bckp.EstatusAutorizacion;
        //                    //row.PartidaAutorizada = bckp.PartidaAutorizada;
        //                    row.ObservacionesContratista = bckp.ObservacionesContratista;
        //                    row.ObservacionesCliente = bckp.ObservacionesCliente;
        //                    row.Dictamenes = bckp.Dictamenes;
        //                    row.Estado = bckp.Estado;
        //                    row.Version = bckp.Version;
        //                }

        //                if (p.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
        //                {
        //                    await daoDET.Delete((int)p.ID);

        //                    if (p.Dictamenes != null)
        //                    {
        //                        foreach (var pd in p.Dictamenes)
        //                        {
        //                            await daoDIC.Delete((int)pd.ID);

        //                            var parametros = new Dictionary<string, object>();
        //                            parametros.Add("entityId", (int)pd.ID);
        //                            parametros.Add("entityType", string.Format("reporte$dictamenes${0}", p.ID));

        //                            //await bpFiles.DeleteByParams(parametros);
        //                        }
        //                    }
        //                }
        //                else
        //                {
        //                    if (p.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
        //                    {
        //                        row.Creado = DateTime.UtcNow;
        //                        row.IdCreadoPor = base.getUserId();
        //                    }

        //                    //if (row.CausaFalla != null)
        //                    //{
        //                    //    row.IdCausaFalla = row.CausaFalla.IdCausaFalla;
        //                    //}

        //                    //if (row.DiasGarantia > 0)
        //                    //{
        //                    //    row.PartidaAutorizada = "A";
        //                    //}
        //                    //else
        //                    //{
        //                    //    row.PartidaAutorizada = "R";
        //                    //}

        //                    //if (row.ProcedeBool == true)
        //                    //{
        //                    //    row.Procede = "S";
        //                    //}
        //                    //else
        //                    //{
        //                    //    row.Procede = "N";
        //                    //    row.PartidaAutorizada = "R";
        //                    //}

        //                    //row.EstatusAutorizacion = "N";
        //                    //row.EstatusPartidaValor = "N";
        //                    //row.IdUbicacionFalla = row.UbicacionFalla.IdUbicacionFalla;
        //                    //row.IdReporte = (int)ticket.ID;
        //                    //row.IdResponsable = base.getUserId();
        //                    //row.DesarrolloClave = ticket.DesarrolloClave;
        //                    row.IdEstatus = estatus.ID;
        //                    row.Estatus = estatus;
        //                    row.Modificado = DateTime.UtcNow;
        //                    row.IdModificadoPor = base.getUserId();
        //                    //row.IdComponente = 15;
        //                    //row.IdUbicacionComponente= row.IdUbicacionComponente;


        //                    bool dictaminado = false;

        //                    var dictamenes = row.Dictamenes;
        //                    if (dictamenes != null)
        //                    {
        //                        //var dictamenesActivos = dictamenes.Where(d => d.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado).ToList();
        //                        //if (dictamenesActivos != null && dictamenesActivos.Count > 0)
        //                        //{
        //                        //    var dictamen = dictamenesActivos.LastOrDefault();
        //                        //    if (!(dictamen.EstatusDictamen != null && dictamen.EstatusDictamen.Clave == "A"))
        //                        //    {
        //                        //        dictaminado = true;
        //                        //    }
        //                        //}

        //                        //if (dictaminado == true)
        //                        //{
        //                        //    row.PartidaAutorizada = "R";
        //                        //    row.EstatusPartidaValor = "D";
        //                        //}
        //                    }

        //                    row = await daoDET.SaveEntity(row, true, true);

        //                    if (dictamenes != null)
        //                    {
        //                        foreach (var dm in dictamenes)
        //                        {
        //                            if (dm.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
        //                            {
        //                                dm.Estatus = estatus;
        //                                dm.IdEstatus = estatus.ID;
        //                                dm.Modificado = DateTime.UtcNow;
        //                                dm.IdModificadoPor = base.getUserId();
        //                                //dm.IdReporte = (int)ticket.ID;
        //                                //dm.IdReporteDetalle = (int)row.ID;
        //                                //dm.EstatusDictamenValue = dm.EstatusDictamen.Clave;
        //                                //dm.IdEstatusDictamen = (int)dm.EstatusDictamen.ID;
        //                                dm.IdIncidencia = row.ID.Value;



        //                                if (dm.ID == null || dm.ID <= 0)
        //                                {
        //                                    dm.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
        //                                }

        //                                if (dm.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
        //                                {
        //                                    //dm.Activo = true;
        //                                    //dm.IdUsuarioCaptura = base.getUserId();
        //                                    //dm.FechaDictamen = DateTime.UtcNow;
        //                                    dm.Creado = DateTime.UtcNow;
        //                                    dm.IdCreadoPor = base.getUserId();
        //                                }

        //                                if (dm.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
        //                                {
        //                                    await daoDIC.Delete((int)dm.ID);

        //                                    var parametros = new Dictionary<string, object>();
        //                                    parametros.Add("entityId", (int)dm.ID);
        //                                    parametros.Add("entityType", string.Format("reporte$dictamenes${0}", row.ID));

        //                                    //await bpFiles.DeleteByParams(parametros);
        //                                }
        //                                else
        //                                {
        //                                    await daoDIC.SaveEntity(dm, false, true);
        //                                }
        //                            }
        //                        }
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }

        //    return 0;
        //}


        #endregion

        //public async Task<List<m.SCV.Interfaces.IContratista>> GetContratistas(int idTicket)
        //{
        //    var parametros = new Dictionary<string, object>();
        //    parametros.Add("OperacionEspecificaSP", "CONSULTAR_TICKET_CONTRATISTAS");
        //    parametros.Add("idTicket", idTicket);

        //    return await this.dao.GetContratistas(parametros);
        //}

        //public async Task<List<m.SCV.Interfaces.IContratista>> GetContratistasByUbicacion(int idUbicacion)
        //{

        //    var parametros = new Dictionary<string, object>();

        //    parametros.Add("idUbicacion", idUbicacion);

        //   var contratistaUbicaciones= await this.dao.GetContratistasByUbicacion(parametros);


        //    return contratistaUbicaciones.Select(e=>e.Contratista).ToList();
        //}


        //public async Task<string> GetEncodedDocumentOT(int id)
        //{
        //    try
        //    {
        //        string retValue = null;

        //        using (MemoryStream ms = new MemoryStream())
        //        {
        //            var documento = await this.GetDocumentOT(id);
        //            documento.Content.Position = 0;
        //            documento.Content.CopyTo(ms);

        //            retValue = Convert.ToBase64String(ms.ToArray());
        //        }

        //        return retValue;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        //public async Task<Drivers.Common.IKontrolFiles> GetDocumentOT(int id)
        //{
        //    var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
        //    var bpCU = Get<p.SCV.Interfaces.IContratistasUbicaciones>();
        //    var daoDET = Get<d.SCV.Interfaces.IOrdenesTrabajoDetalles>();
        //    var daoOT = Get<d.SCV.Interfaces.IOrdenesTrabajo>();
        //    var daoOTD = Get<d.SCV.Interfaces.IOrdenesTrabajoDetalles>();
        //    var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();
        //    var daoCF = Get<d.SCV.Interfaces.ICausasIncidencias>();
        //    var daoAG = Get<d.SCV.Interfaces.IAgendaSPV>();
        //    var daoInci = Get<d.SCV.Interfaces.IIncidencias>();


        //    try
        //    {
        //        var ordenTrabajo = await daoOT.GetById(id);

        //        var ticket = await this.dao.GetById(ordenTrabajo.IdTicket);
        //        //var ubicacion = await this.GetUbicacionById((int)reporte.IdUbicacion);
        //        var moneda = await bpMON.GetByClave("MXN");

        //        var parametros = new Dictionary<string, object>();
        //        parametros.Add("idOT", ordenTrabajo.ID);
        //        parametros.Add("idContratista", ordenTrabajo.IdContratista);

        //        var partidas = await daoDET.GetAll(parametros);

        //        parametros.Clear();
        //        parametros.Add("idOT", ordenTrabajo.ID);

        //        var partidasOT = await daoOTD.GetAll(parametros);
        //        var partidasTable = new List<m.SCV.Interfaces.IIncidencia>();

        //        foreach (var p in partidas)
        //        {
        //            if (partidasOT.FirstOrDefault(d => d.IdIncidencia == p.IdIncidencia) != null)
        //            {
        //                partidasTable.Add(p.Incidencia);
        //            }
        //        }

        //        var cOrigen = await bpCU.GetContratistaDefault((int)ticket.IdUbicacion);
        //        if (cOrigen == null)
        //        {
        //            cOrigen = Get<m.SCV.Interfaces.IContratista>();
        //        }

        //        parametros.Clear();
        //        parametros.Add("idCliente", ticket.IdCliente);

        //        string telefonoCasa = string.Empty;
        //        string telefonoOficina = string.Empty;
        //        string telefonoCelular = string.Empty;
        //        string telefonoOtros = string.Empty;
        //        string correoCliente = string.Empty;

        //        var contactos = await daoRL.GetAll(parametros);
        //        if (contactos != null)
        //        {
        //            var telefonos = contactos.FindAll(c => c.TipoContacto.Clave == "TELEFONO");

        //            if (telefonos != null)
        //            {
        //                foreach (var t in telefonos)
        //                {
        //                    if (t.TipoTelefono.Clave == "CS")
        //                    {
        //                        telefonoCasa = t.Contacto;
        //                    }
        //                    else if (t.TipoTelefono.Clave == "T")
        //                    {
        //                        telefonoOficina = t.Contacto;
        //                    }
        //                    else if (t.TipoTelefono.Clave == "C")
        //                    {
        //                        telefonoCelular = t.Contacto;
        //                    }
        //                    else if (t.TipoTelefono.Clave == "O")
        //                    {
        //                        telefonoOtros = t.Contacto;
        //                    }
        //                }
        //            }

        //            var correos = contactos.FindAll(c => c.TipoContacto.Clave == "CORREO");
        //            if (correos != null)
        //            {
        //                foreach (var c in correos)
        //                {
        //                    correoCliente = c.Contacto;
        //                }
        //            }
        //        }
        //        //var citas = await daoAG.GetAgendaDetalleHistorial("Contratista", id, null);
        //        //if (citas != null && citas.Count > 0)
        //        //{
        //        //    citas = citas.FindAll(c => c.EstatusAgenda.Clave == "ACT" || c.EstatusAgenda.Clave == "REP");
        //        //}

        //        dynamic expando = new ExpandoObject();
        //        expando.ID = ticket.ID;
        //        expando.Folio = ticket.ID;
        //        expando.OrdenTrabajo = ordenTrabajo;
        //        expando.FechaEntregaVivienda = ticket.FechaReporte;
        //        //expando.FechaCaptura = ticket.ExpedienteUbicacion.;
        //        expando.Cliente = ticket.Cliente;
        //        expando.Ubicacion = ticket.Ubicacion;
        //        expando.CreadoPor = ticket.CreadoPor;
        //        expando.ModificadoPor = ticket.ModificadoPor;
        //        expando.TelefonoCasa = telefonoCasa;
        //        expando.TelefonoOficina = telefonoOficina;
        //        expando.TelefonoCelular = telefonoCelular;
        //        expando.TelefonoOtros = telefonoOtros;
        //        expando.CorreoCliente = correoCliente;
        //        expando.Expediente = ticket.IdExpediente; 
        //        expando.DesarrolloClave = ticket.Ubicacion.Desarrollo.Clave;
        //        //expando.SuperManzana = ticket.SuperManzana;
        //        //expando.Manzana = ticket.Manzana;
        //        //expando.Lote = ticket.Lote;
        //        //expando.Interior = ticket.Interior;
        //        //expando.Exterior = ticket.Exterior;
        //        //expando.Coordinador = ticket.Coordinador;
        //        expando.ResponsableConstruccion = ticket.ResponsableConstruccion;
        //        expando.ObservacionesSC = ticket.ObservacionesCliente;
        //        expando.ObservacionesCAT = ticket.ObservacionesContratista;
        //        expando.Contratista = ordenTrabajo.Contratista;
        //        expando.ContratistaOrigen = cOrigen;

        //        //expando.Citas = citas;
        //        expando.Incidencias = partidasTable;

        //        dynamic obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
        //        Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("TICKET-OT", obj, null, moneda);
        //        Drivers.Common.IKontrolFiles documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);

        //        return documento;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}


        //public async Task<List<m.SCV.Interfaces.IIncidencia>> GetReincidencias(Dictionary<string, object> parametros)
        //{
        //    return await this.dao.GetReincidencias(parametros);
        //}
        //private ITicketIncidenciaDetalle CalcularGarantia(m.SCV.Interfaces.ITicketIncidenciaDetalle partida, int duracionGarantia, DateTime fechaEntrega, DateTime fechaCaptura)
        //{
        //    //var daoDT = Get<d.Kontrol.Interfaces.IDateDifference>();

        //    try
        //    {
        //        DateTime terminoGarantia = fechaEntrega.AddMonths(duracionGarantia);
        //        var diff = fechaCaptura.Day - terminoGarantia.Day;
        //        //await daoDT.GetDateDifference("dd", fechaCaptura, terminoGarantia);
        //        partida.DiasGarantia = diff;
        //        partida.TerminoGarantia = terminoGarantia;

        //        return partida;
        //    }
        //    catch
        //    {
        //        throw new Exception("Error al calcular la garantía de la partida ");
        //    }
        //}

    }

}