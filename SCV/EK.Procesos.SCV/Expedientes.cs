using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Dynamic;

using Newtonsoft.Json.Linq;
using System.IO;

namespace EK.Procesos.SCV
{
    public class Expedientes
        : p.Kontrol.BPBase<m.SCV.Interfaces.IExpediente, d.SCV.Interfaces.IExpedientes>, p.SCV.Interfaces.IExpedientes,
       p.Kontrol.Interfaces.IWorkflowBP
    {
        public Expedientes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IExpedientes dao)
            : base(factory, dao, "expedientes")
        {
        }

        public async Task<object> GetByIdV2(int id)
        {
            dynamic retValue;
            var exp = await this.dao.GetByIdV2(id);

            retValue = JObject.FromObject(exp);
            if (exp != null) {
                if (exp.TipoExpediente.Clave == "D")
                {
                    var bpDocs = Get<p.Kontrol.Interfaces.IKontrolFiles>();
                    var doc = await bpDocs.GetById(exp.IdEntidad.Value);
                    //
                    if (doc != null) {
                        retValue.Documento = JObject.FromObject(doc);
                        //
                        if (doc.TipoEntidad.Clave == "Obra") {
                            var bpObra = Get<p.SCCO.Interfaces.IObra>();
                            var entidad = await bpObra.GetById(doc.EntityId);
                            //
                            retValue.Entidad = JObject.FromObject(entidad);
                        }
                    }
                }
                else if(exp.TipoExpediente.Clave == "V") {
                    
                }
            }

            return retValue;
        }


        public async Task<object> GetDocumentByIdV2(string clave)
        {
            var daoDocs = Get<d.Kontrol.Interfaces.IKontrolFiles>();
            return await daoDocs.GetByClave(clave);

        }



        public async Task<object> GetByIdConfiguration(int id)
        {
            try
            {
                dynamic retValue;
                var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();
                var exp = await this.dao.GetById(id);

                /*Agregar dueno del expediente*/
                var daoOW = Get<d.SCV.Interfaces.IExpedientesOwners>();
                var param = new Dictionary<string, object> { { "idExpediente", exp.ID } };
                var duenosActual = await daoOW.GetAll(param);
                if (duenosActual != null && duenosActual.Count > 0)
                {
                    var duenio = duenosActual.Where(x => x.Principal == true).FirstOrDefault();
                    if (duenio != null)
                    {
                        exp.Asesor = duenio.Posicion;
                    }
                }

                retValue = JObject.FromObject(exp);
                retValue.Procesos = JArray.FromObject(await bpSeguimientos.GetExpedienteProcesos(id));
                // append cotizaciones
                var bpVentas = Get<p.SCV.Interfaces.IVentas>();
                var cotizaciones = await bpVentas.GetCotizaciones(id);
                if (cotizaciones != null && cotizaciones.Count() > 0)
                {
                    foreach (var c in cotizaciones)
                    {
                        c.Ubicaciones = await bpVentas.GetUbicacionesCotizacionById(c.ID.Value);
                    }
                }
                retValue.Cotizaciones = JArray.FromObject(cotizaciones);
                //
                return retValue;
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
                throw;
            }

         
        }


        public async Task<object> GetExpedienteObject(int id, string entityName, int idExpediente)
        {
            var bpVentas = Get<p.SCV.Interfaces.IVentas>();
            var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();
            var bpClientes = Get<p.SCV.Interfaces.IClientes>();
            var propuesta = Get<m.SCV.Interfaces.IVenta>();
            var expediente = await this.dao.GetById(idExpediente);

            if (entityName == "cotizacion")
            {
                propuesta = await bpVentas.GetCotizacionById(id);
            }
            else if (entityName == null || entityName == "venta")
            {
                propuesta = await bpVentas.GetVentaByExpedienteId(idExpediente);
            }

            var seguimiento = await bpSeguimientos.GetSeguimientoActivo(idExpediente);
            var etapas = await bpSeguimientos.getSeguimientoEtapas((int)seguimiento.ID);
            var cliente = await bpClientes.GetById((int)expediente.IdCliente);

            var parametros = new Dictionary<string, object>();
            parametros.Add("IdCliente", expediente.IdCliente);
            parametros.Add("ClaveTipoContacto", "TELEFONO");
            var contactos = await bpClientes.GetContactoClientes(parametros);

            parametros.Clear();
            parametros.Add("IdCliente", expediente.IdCliente);
            parametros.Add("ClaveTipoContacto", "CORREO");
            var correos = await bpClientes.GetContactoClientes(parametros);

            parametros.Clear();
            parametros.Add("IdCliente", expediente.IdCliente);
            var referencias = await bpClientes.GetReferencias(parametros);

            dynamic expando = new ExpandoObject();
            expando.ID = expediente.ID;
            expando.Propuesta = propuesta;
            expando.Desarrollo = expediente.Desarrollo;
            expando.Etapas = etapas;
            if (seguimiento.Posicion != null)
            {
                expando.Agente = seguimiento.Posicion.Usuario;
            }
            expando.Cliente = JObject.FromObject(cliente);
            //
            //expando.Cliente.Telefono = string.Empty;
            var telefono = contactos.Find(item => item.TipoTelefono != null && (item.TipoTelefono.Clave == "CS" || item.TipoTelefono.Clave == "P"));
            if (telefono != null)
            {
                expando.Cliente.Telefono = telefono.Contacto;
            }
            //
            expando.Cliente.TelefonoOficina = string.Empty;
            var telOficina = contactos.Find(item => item.TipoTelefono.Clave == "T");
            if (telOficina != null)
            {
                expando.Cliente.TelefonoOficina = telOficina.Contacto;
            }
            //
            expando.Cliente.Celular = string.Empty;
            var celular = contactos.Find(item => item.TipoTelefono.Clave == "C");
            if (celular != null)
            {
                expando.Cliente.Celular = celular.Contacto;
            }
            //
            expando.Cliente.Email = string.Empty;
            var email = correos.FirstOrDefault();
            if (email != null)
            {
                expando.Cliente.Email = email.Contacto;
            }
            //
            expando.Cliente.Conyugue = referencias.Find(item => item.TipoReferencia.Clave == "RP-1");
            if (expando.Cliente.Conyugue == null)
            {
                expando.Cliente.Conyugue = JObject.FromObject(Get<m.SCV.Interfaces.IClienteReferencia>());
            }

            dynamic retValue = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
            return retValue;
        }

        public async Task<m.SCV.Interfaces.IExpediente> GetByCatalogo(int id)
        {
            var parametros = new Dictionary<string, object>() {
                { "Id", id },
                { "OperacionEspecificaSP", "DashBoard" }
            };
            var expedientes = await this.GetAll(parametros);

            var retValue = expedientes.FirstOrDefault();
            if (retValue == null)
            {
                retValue = Get<m.SCV.Interfaces.IExpediente>();
                retValue.Estatus = Get<m.Kontrol.Interfaces.IItemGeneral>();
                retValue.Fase = Get<m.SCV.Interfaces.IFaseExpediente>();
                retValue.Etapa = Get<m.SCV.Interfaces.IEtapa>();
            }
            else
            {
                retValue = expedientes.FirstOrDefault();
            }

            return retValue;
        }

        public async override Task<m.SCV.Interfaces.IExpediente> Save(m.SCV.Interfaces.IExpediente item)
        {
            try
            { 
                bool isNew = item.ID == null || item.ID <= 0;

                if (item.IdCliente <= 0)
                {
                    base.SetReturnInfo(1, "El Cliente es requerido");
                    return null;
                }

                if (item.IdDesarrollo <= 0)
                {
                    base.SetReturnInfo(1, "El Desarrollo es requerido");
                    return null;
                }

                if (item.IdTipoComercializacion <= 0)
                {
                    base.SetReturnInfo(1, "El Tipo Comercialización es requerido");
                    return null;
                }
                var asesor = item.Asesor;

                //int idTipoCliente = item.IdTipoCliente;
                //{validar el desarrollo requerido}
                //if (item.IdDesarrollo <= 0)
                //{
                //    base.SetReturnInfo(1, "El Desarrollo es requerido");
                //    return null;
                //}

                //{validar el tipo de comercialización requerido}
                //if (item.IdTipoComercializacion <= 0)
                //{
                //    base.SetReturnInfo(1, "El Tipo de Comercialización es requerido");
                //    return null;
                //}

                BeginTransaction(true);

                var bpVenta = Get<p.SCV.Interfaces.IVentas>();
                var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();

                var duenios = item.Owners;
                var relacionados = item.Relacionados;
                var seguimientos = item.Seguimientos;

                var bpEstatusExpediente = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusExpediente = await bpEstatusExpediente.Get("SCVESTATUSEXPEDIENTE", "A");

                var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                item.EstatusExpediente = estatusExpediente;
                item.IdEstatusExpediente = estatusExpediente.ID ?? 0;
                item.Estatus = estatus;
                item.IdEstatus = estatus.ID ?? 0;

                item = await base.saveModel(item);

                int idExpediente = (int)item.ID;
                int idDesarrollo = (int)item.IdDesarrollo;

                var newOwner = Get<m.SCV.Interfaces.IExpedienteOwner>();


                /*Agregando agente como dueño del expediente*/
                if (!isNew)
                {
                    var daoOW = Get<d.SCV.Interfaces.IExpedientesOwners>();
                    var param = new Dictionary<string, object> { { "idExpediente", idExpediente } };
                    var duenosActual =await daoOW.GetAll(param);
                    if (duenosActual != null && duenosActual.Count>0)
                    {
                        var duenio = duenosActual.Where(x => x.Principal == true).FirstOrDefault();

                        if (duenio!=null && duenio.ID > 0)
                        {
                            /*Dueño del expediente*/
                            duenio.Modificado = DateTime.UtcNow;
                            duenio.IdModificadoPor = base.getUserId();
                            duenio.IdPosicion = asesor.ID;
                            newOwner = await daoOW.SaveEntity(duenio, true);
                    
                        }
                        else
                        {
                            newOwner=await this.guardarDuenio(idExpediente, estatus, (int)asesor.ID);
                        }
                    }
                }
                else
                {
                    newOwner=await this.guardarDuenio(idExpediente, estatus, (int)asesor.ID);
                }



                //{actualizar los colaboradores del expediente}
                var daoPU = Get<d.SCV.Interfaces.IExpedientesRelacionados>();
                if (relacionados != null && relacionados.Count > 0)
                {
                    foreach (var r in relacionados)
                    {
                        if (r.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            r.IdExpediente = idExpediente;
                            r.Estatus = estatus;
                            r.IdEstatus = estatus.ID;
                            r.Modificado = DateTime.UtcNow;
                            r.IdModificadoPor = base.getUserId();
                            //
                            if (r.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                r.Creado = DateTime.UtcNow;
                                r.IdCreadoPor = base.getUserId();
                            }
                            //
                            if (r.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoPU.Delete(r.ID.Value);
                            }
                            else
                            {
                                await daoPU.SaveEntity(r, false, true);
                            }
                        }
                    }
                }

                if (isNew)
                {
                    //{crear nueva venta einiciar el proceso de cotización}
                    var venta = await bpVenta.SaveNuevaVenta(idExpediente, idDesarrollo, null);
                    await bpVenta.CreateProcesos(venta.ID.Value);
                    await bpVenta.SaveVentaProceso(venta.ID.Value, "CI", "INICIAR_PROCESO");
                }
                else
                {
                    var daoVentas = Get<d.SCV.Interfaces.IVentas>();
                    var venta = await bpVenta.GetVentaByExpedienteId(idExpediente);

                    venta.Changed("Modificado", true);
                    venta.Changed("IdModificadoPor", true);

                    venta.Modificado = DateTime.UtcNow;
                    venta.IdModificadoPor = base.getUserId();
                    //venta.IdTipoCliente = idTipoCliente;
                    await daoVentas.Save(venta);


                }
                //{consultar estatus seguimiento}
                var bpEstatusSeguimiento = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusSeguimiento = await bpEstatusSeguimiento.Get("SCVESTATUSSEGUIMIENTO", "A");
                var estatusEsperaSeguimiento = await bpEstatusSeguimiento.Get("SCVESTATUSSEGUIMIENTO", "E");
                int idEstatusSeguimiento = estatusSeguimiento.ID.Value;

                //{actualizar el seguimiento configurado}
                if (seguimientos != null && seguimientos.Count > 0)
                {
                    foreach (var s in seguimientos)
                    {
                        if (s.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios && s.Estado!=Modelo.Kontrol.KontrolEstadosEnum.SinEstablecer)
                        {
                            s.IdExpediente = (int)item.ID;
                            if (s.ID == -1 && s.Fase.Orden > 1)
                            {
                                s.EstatusSeguimiento = estatusEsperaSeguimiento;
                                s.IdEstatusSeguimiento = estatusEsperaSeguimiento.ID;
                            }
                            else {
                                s.EstatusSeguimiento = estatusSeguimiento;
                                s.IdEstatusSeguimiento = idEstatusSeguimiento;
                            }

                            int result = await this.SaveConfiguracion(s);

                           

                            //{obtener el proceso de cierre de venta}
                            //Hola Mundo





                            if (result < 0)
                            {
                                Rollback();
                                return item;
                            }

                            //actualizar cliente de contacto a prospecto al iniciar la prospección
                            if (s.Fase.Clave == "FASE-PROS" && isNew)
                            {
                                var bpClientes = Get<p.SCV.Interfaces.IClientes>();
                                await bpClientes.UpdateProspecto((int)item.IdCliente, "PROPS");
                            }

                            estatusSeguimiento = await bpEstatusSeguimiento.Get("SCVESTATUSSEGUIMIENTO", "E");
                            idEstatusSeguimiento = estatusSeguimiento.ID.Value;
                        }
                    }
                }

                item = await this.dao.GetById(idExpediente);
                if (newOwner != null && newOwner.ID > 0)
                {
                    item.Asesor = newOwner.Posicion;
                }
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return item;
        }

        private async Task<m.SCV.Interfaces.IExpedienteOwner> guardarDuenio(int idExpediente,m.Kontrol.Interfaces.IItemGeneral estatus,int idPosicion)
        {
            BeginTransaction(true);

            var daoOW = Get<d.SCV.Interfaces.IExpedientesOwners>();
            var duenioExp = Get<m.SCV.Interfaces.IExpedienteOwner>();

            duenioExp.ID = -1;
            duenioExp.Principal = true;
            duenioExp.IdPosicion = idPosicion;
            duenioExp.IdExpediente = idExpediente;
            duenioExp.Estatus = estatus;
            duenioExp.IdEstatus = estatus.ID;
            duenioExp.Modificado = DateTime.UtcNow;
            duenioExp.IdModificadoPor = base.getUserId();
            duenioExp.Creado = DateTime.UtcNow;
            duenioExp.IdCreadoPor = base.getUserId();
            duenioExp.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
            var result= await daoOW.SaveEntity(duenioExp, false, true);
            Commit();
            return result;
        }

        public async Task<List<m.SCV.Interfaces.IExpedienteOwner>> GetOwners(Dictionary<string, object> parametros)
        {
            var daoOwners = Get<d.SCV.Interfaces.IExpedientesOwners>();
            return await daoOwners.GetAll(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IExpedienteRelacionado>> GetRelacionados(Dictionary<string, object> parametros)
        {
            var daoPU = Get<d.SCV.Interfaces.IExpedientesRelacionados>();
            return await daoPU.GetAll(parametros);
        }

        //public async Task<m.SCV.Interfaces.ISeguimiento> SaveConfiguracion(m.SCV.Interfaces.ISeguimiento item)
        public async Task<int> SaveConfiguracion(m.SCV.Interfaces.ISeguimiento item)
        {
            BeginTransaction(true);
            var daoVentas = Get<d.SCV.Interfaces.IVentas>();
            var bpFases = Get<p.SCV.Interfaces.IFasesExpediente>();
            var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();

            int retValue = -1;


            try
            {
                //{respaldo autorizados}
                var autorizados = item.Autorizados;

                var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                //{validar posición responsable de la fase configuración}
                if (item.Posicion == null)
                {
                    base.SetReturnInfo(1, "El responsable del seguimiento no fue seleccionado.");
                    return retValue;
                }

                //{expediente base}
                int idExpediente = item.IdExpediente;
               
                int idAgente = item.Posicion.IdUsuario ?? 0;



                //{validar si seguimiento es nuevo o existente}
                bool isNew = item.ID == null || item.ID <= 0;
                if (isNew)
                {
                    //{consultar fase expediente}
                    var faseExpediente = await bpFases.GetByClave(item.Fase.Clave);

                    //{consultar venta del expediente}               
                    var ventaExpediente = await daoVentas.GetByExpedienteId(idExpediente);

                    //{validar que el esquema seguimiento haya sido seleccionado}
                    if (item.Esquema == null)
                    {
                        base.SetReturnInfo(2, "El esquema del seguimiento no fue seleccionado.");
                        return retValue;
                    }

                    int idFaseExpediente = faseExpediente.ID ?? 0;
                    int idEsquema = item.Esquema.ID ?? 0;
                    int idPosicion = item.Posicion.ID ?? 0;
                    int idVenta = ventaExpediente !=null && ventaExpediente.ID>0? (int)ventaExpediente.ID:0;

                    var proceso = await bpSeguimientos.getExpedienteProceso(idExpediente, faseExpediente.Proceso.Clave);
                    if (proceso != null)
                    {
                        if(faseExpediente.Proceso.Clave!=null)
                        {
                            await bpSeguimientos.UpdateExpedienteProceso(proceso, "E");
                        }
                        //await bpSeguimientos.EjecutarProceso(proceso, false);
                    }
                    var segumientoActivo = await bpSeguimientos.GetSeguimientoActivo(item.IdExpediente);
                    var etapa = await bpSeguimientos.getSeguimientoEtapas(segumientoActivo.ID.Value);

                    /*Crear Seguimiento*/
                    item = await bpSeguimientos.Create(idExpediente, idFaseExpediente, idEsquema, idPosicion, idVenta, item.FechaEstimada, item.EstatusSeguimiento.Clave);
                    var etapas = await bpSeguimientos.getSeguimientoEtapas(item.ID.Value);
                    if(faseExpediente.Clave== "FASE-PROS")
                    {
                        foreach (var element in etapas)
                        {
                            if (element.EstatusEtapa.Clave == "A" && element.Orden==1)
                            {
                                /*Guardar Instantanea de la primer etapa de la fase de prospeccion*/
                                var bpInstantaneas = Get<p.SCV.Interfaces.IExpedientesInstantaneas>();
                                await bpInstantaneas.SaveInstantaneasAll(item.ID.Value, element.Orden, "FECHAINICIO");

                                var procesosSeguimiento = await bpSeguimientos.ObtenerSeguimientoProcesos(idExpediente,item.ID.Value,element.IdEtapa);

                                foreach (var procesoS in procesosSeguimiento)
                                {
                                    await bpSeguimientos.UpdateExpedienteProceso(procesoS, "B");
                                }
                                break;
                            }

                        }
                    }
                    foreach (var element in etapa)
                    {
                        if (element.EstatusEtapa.Clave == "A")
                        {
                            //
                            await bpSeguimientos.VerificaAvanzarEtapa(element);
                        }

                    }
                }
                else
                {
                    item.Estatus = estatus;
                    item.IdEstatus = estatus.ID ?? 0;
                    item = await bpSeguimientos.Save(item);
                }

                //{actualizar venta del expediente}
                var venta = await daoVentas.GetByExpedienteId(idExpediente);
                if (venta != null)
                {
                    venta.IdExpediente = idExpediente;
                    venta.IdAgente = idAgente;
                    venta.Modificado = DateTime.UtcNow;
                    venta.IdModificadoPor = base.getUserId();
                    await daoVentas.Save(venta);
                }
               

                //{guardar los autorizados del seguimiento}
                if (autorizados != null && autorizados.Count > 0)
                {
                    var daoSA = Get<d.SCV.Interfaces.ISeguimientosAutorizados>();

                    foreach (var a in autorizados)
                    {
                        if (a.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            a.IdSeguimiento = (int)item.ID;
                            a.Estatus = estatus;
                            a.IdEstatus = estatus.ID;
                            a.Modificado = DateTime.UtcNow;
                            a.IdModificadoPor = base.getUserId();

                            if (a.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                a.Creado = DateTime.UtcNow;
                                a.IdCreadoPor = base.getUserId();
                            }

                            if (a.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoSA.Delete(a.ID.Value);
                            }
                            else
                            {
                                await daoSA.SaveEntity(a, false, true);
                            }
                        }
                    }
                }
                Commit();
                return retValue = 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object> AllowCancelacion(int id)
        {
            //retorno de permiso para activar autorizacion
            var retValue = new { Allowed = false };

            var parametros = new Dictionary<string, object> { { "idExpediente", id }, { "activos", 1 } };
            var ownersDAO = Get<d.SCV.Interfaces.IExpedientesOwners>();
            var owners = await ownersDAO.GetAll(parametros);

            var auxiliaresDAO = Get<d.SCV.Interfaces.IExpedientesRelacionados>();
            var auxiliares = await auxiliaresDAO.GetAll(parametros);

            if (owners != null && owners.Count > 0)
            {
                foreach (var o in owners)
                {
                    if (o.Posicion.IdUsuario == base.getUserId())
                    {
                        retValue = new { Allowed = true };
                    }
                }
            }

            if (!retValue.Allowed && auxiliares != null && auxiliares.Count > 0)
            {
                foreach (var a in auxiliares)
                {
                    if (a.Posicion.IdUsuario == base.getUserId())
                    {
                        retValue = new { Allowed = true };
                    }
                }
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IExpediente> CancelarExpediente(int id)
        {
            //{backup del expediente}
            var retValue = await this.dao.GetById(id);

            //{consultar seguimientos del expediente para cancelación}
            var parametros = new Dictionary<string, object> { { "idExpediente", id }, { "activos", 1 } };
            var seguimientosDAO = Get<d.SCV.Interfaces.ISeguimientos>();
            var seguimientosBP = Get<p.SCV.Interfaces.ISeguimientos>();
            var seguimientos = await seguimientosDAO.GetAll(parametros);

            try
            {
                BeginTransaction();

                if (seguimientos != null && seguimientos.Count > 0)
                {
                    foreach (var s in seguimientos)
                    {
                        //cancelar cada uno de los seguimientos activos del seguimiento
                        var result = await seguimientosBP.UpdateSeguimiento(s, "C");
                        if (result == null)
                        {
                            Rollback();
                            return null;
                        }
                    }
                }

                //{consultar venta del expediente}
                var daoVentas = Get<d.SCV.Interfaces.IVentas>();
                var venta = await daoVentas.GetByExpedienteId(id);

                //{actualizar estatus de la venta}
                var ventasBP = Get<p.SCV.Interfaces.IVentas>();
                await ventasBP.UpdateEstatusVenta(venta.ID.Value, "C");

                //{consultar el estatus expediente cancelado}
                var bpEstatusExpediente = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusExpediente = await bpEstatusExpediente.Get("SCVESTATUSEXPEDIENTE", "C");

                //{consultar el estatus bitacora baja}
                var bpEstatusBaja = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusBaja = await bpEstatusBaja.Get("ESTATUS", "B");

                //consultar el expediente original
                var item = await this.dao.GetById(id);
                item.IdModificadoPor = base.getUserId();
                item.Modificado = DateTime.UtcNow;
                item.EstatusExpediente = estatusExpediente;
                item.IdEstatusExpediente = estatusExpediente.ID ?? 0;
                item.Estatus = estatusBaja;
                item.IdEstatus = estatusBaja.ID ?? 0;

                //{actualizar el expediente para cancelación}
                var bajaItem = await base.saveModel(item);
                if (bajaItem == null)
                {
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    retValue = bajaItem;
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<int> UpdateRequisito(int idExpediente, string claveRequisito, string valor)
        {
            //{consultar requisito de expediente por autorizar}
            var bpSeguimiento = Get<p.SCV.Interfaces.ISeguimientos>();
            var requisito = await bpSeguimiento.getExpedienteRequisito(idExpediente, claveRequisito);

            //{consultar estatus requisito autorizado}
            var bpEstatusRequisito = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatusRequisito = await bpEstatusRequisito.Get("SCVSEGESTATUSREQUISITOS", "U");

            //{consultar estatus bitacora}
            var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            //{capturar automaticamente el requisito}
            var parameters = new Dictionary<string, object>();
            parameters.Add("Id", requisito.IdRequisito);
            parameters.Add("IdExpediente", requisito.IdExpediente);
            parameters.Add("Valor", valor);
            parameters.Add("ModificadoPor", base.getUserId());
            parameters.Add("OperacionEspecificaSP", "CAPTURA_REQUISITO");
            parameters.Add("FechaVencimiento", DBNull.Value);

            var seguimientosDAO = Get<d.SCV.Interfaces.ISeguimientos>();
            await seguimientosDAO.SaveRequisito(parameters);

            //{actualizar requisito de expediente como autorizado} {25/04/2018}
            parameters.Clear();
            parameters.Add("Id", requisito.IdRequisito);
            parameters.Add("IdExpediente", requisito.IdExpediente);
            parameters.Add("ModificadoPor", base.getUserId());
            parameters.Add("IdEstatus", estatus.ID);
            parameters.Add("IdEstatuRequisito", estatusRequisito.ID);
            parameters.Add("OperacionEspecificaSP", "ACTUALIZAR_ESTATUS_REQUISITO");

            return await seguimientosDAO.SaveRequisito(parameters);
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            if (obj.Cliente != null)
            {
                entity.IdCliente = obj.Cliente.ID;
                entity.IdClienteClave = obj.Cliente.Clave;
                entity.IdClienteNombre = $"{obj.Cliente.Nombre} {obj.Cliente.ApellidoPaterno} {obj.Cliente.ApellidoMaterno}";
            }

            if (obj.EstatusExpediente != null)
            {
                entity.IdEstatusExpediente = obj.EstatusExpediente.ID;
                entity.IdEstatusExpedienteClave = obj.EstatusExpediente.Clave;
                entity.IdEstatusExpedienteNombre = obj.EstatusExpediente.Nombre;
            }
        }

        public async Task<List<m.SCV.Interfaces.ISeguimiento>> GetConfiguracionAll(int idExpediente)
        {
            var daoSEG = Get<d.SCV.Interfaces.ISeguimientos>();
            var daoSA = Get<d.SCV.Interfaces.ISeguimientosAutorizados>();
            var bpFE = Get<p.SCV.Interfaces.IFasesExpediente>();

            var parametros = new Dictionary<string, object>() { { "idExpediente", idExpediente } };
            var items = await daoSEG.GetAll(parametros);
            int asignacionID = -1;
            //{inicializacion manual para seguimientos que no han sido activados}
            var found = items.FirstOrDefault(s => s.Fase.Clave == "FASE-PROS");
            if (found == null)
            {
                found = Get<m.SCV.Interfaces.ISeguimiento>();
                found.EstatusSeguimiento = Get<m.Kontrol.Interfaces.IItemGeneral>();
                found.IdExpediente = idExpediente;
                found.Fase = await bpFE.GetByClave("FASE-PROS");
                found.ID = asignacionID;
                items.Add(found);
                asignacionID = asignacionID - 1;
            }

            found = items.FirstOrDefault(s => s.Fase.Clave == "FASE-VENT");
            if (found == null)
            {
                found = Get<m.SCV.Interfaces.ISeguimiento>();
                found.EstatusSeguimiento = Get<m.Kontrol.Interfaces.IItemGeneral>();
                found.IdExpediente = idExpediente;
                found.Fase = await bpFE.GetByClave("FASE-VENT");
                found.ID = asignacionID;
                items.Add(found);
                asignacionID = asignacionID - 1;
            }

            found = items.FirstOrDefault(s => s.Fase.Clave == "FASE-POST");
            if (found == null)
            {
                found = Get<m.SCV.Interfaces.ISeguimiento>();
                found.EstatusSeguimiento = Get<m.Kontrol.Interfaces.IItemGeneral>();
                found.IdExpediente = idExpediente;
                found.Fase = await bpFE.GetByClave("FASE-POST");
                found.ID = asignacionID;
                items.Add(found);
                asignacionID = asignacionID - 1;
            }

            //{obtener lista de autorizados de cada seguimiento}
            foreach (var i in items)
            {
                parametros.Clear();
                parametros.Add("idSeguimiento", (int)i.ID);

                i.Autorizados = await daoSA.GetAll(parametros);
            }

            return items;
        }

        public async Task<List<m.Kontrol.Interfaces.IClasificador>> SaveTags(int IdExpediente, List<m.Kontrol.Interfaces.IClasificador> tags)
        {
            /**/
            var daoTagsExpediente = Get<d.SCV.Interfaces.IExpedientesTags>();

            var tagsExpediente = await this.ObtenerTagsPorExpediente(IdExpediente);

            foreach (var item in tags)
            {
                bool tagsExistente = this.EncontrarTags(tagsExpediente, item.ID.Value, "expedienteTags");
                if(!tagsExistente)
                {

                    var mExpedienteTags = Get<m.SCV.Interfaces.IExpedienteTags>();
                    mExpedienteTags.IdTag = item.ID.Value;
                    mExpedienteTags.IdExpediente = IdExpediente;
                    mExpedienteTags.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                    var elemento = await base.Assign(mExpedienteTags);
                    await daoTagsExpediente.SaveEntity(elemento, true);
                }
            }

            foreach(var item in tagsExpediente)
            {

                bool tagsExistente = this.EncontrarTags(tags, item.Tag.ID.Value, "clasificador");
                if (!tagsExistente)
                {
                    await daoTagsExpediente.Delete(item.ID.Value);
                }
            }
            var lista = await this.ObtenerTagsExpediente(IdExpediente);
            return lista;
        }
        public bool EncontrarTags(object lista,int idTag, string tipoEntidad)
        {
            bool result = false;
            dynamic tags = lista;
            foreach(var item in tags)
            {
                if (tipoEntidad == "expedienteTags")
                {
                    if (item.Tag.ID == idTag)
                    {
                        result = true;
                        break;
                    }
                }
                else
                {
                    if (item.ID == idTag)
                    {
                        result = true;
                        break;
                    }
                }
            }
            return result;

        }

        public async Task<List<m.Kontrol.Interfaces.IClasificador>> ObtenerTagsExpediente(int IdExpediente)
        {
           var listaTags = new List<m.Kontrol.Interfaces.IClasificador>();

            var daoTagsExpediente = Get<d.SCV.Interfaces.IExpedientesTags>();
            var parametros = new Dictionary<string, object>{
                { "idExpediente",IdExpediente}
            };
            listaTags=await daoTagsExpediente.ObtenerTagsExpediente(parametros);
            return listaTags;

        }
        private async Task<List<m.SCV.Interfaces.IExpedienteTags>> ObtenerTagsPorExpediente(int IdExpediente)
        {
            var listaTags = new List<m.SCV.Interfaces.IExpedienteTags>();

            var daoTagsExpediente = Get<d.SCV.Interfaces.IExpedientesTags>();
            var parametros = new Dictionary<string, object>{
                { "idExpediente",IdExpediente},
                { "tipoEntidad","ExpedienteTags"}
            };
            listaTags = await daoTagsExpediente.ObtenerTagsPorExpediente(parametros);
            return listaTags;

        }


        public async Task<object> ObtenerExpedientePorEscriturarPorID(Dictionary<string,object> parametros)
        {
            return await dao.GetExpedienteEnEscrituracion(parametros);
        }

        public async Task<object> SaveEscrituracion(m.SCV.Interfaces.IExpediente item)
        {
            var expediente = await dao.GetById(item.ID.Value);

            expediente.NumeroEscrituracion = item.NumeroEscrituracion;
            expediente.IdNotario = item.Notario.ID;

            expediente.Changed("NumeroEscrituracion", true);
            expediente.Changed("IdNotario", true);

            await dao.Save(expediente);
            var p= new  Dictionary<string, object>{ {"id",item.ID } };

            return await this.ObtenerExpedientePorEscriturarPorID(p);
        }

        public async Task<string> GenerarEscrituracion(int idExpediente)
        {
            try
            {

                var bpVentas = Get<p.SCV.Interfaces.IVentas>();
                var daoExpediente = Get<d.SCV.Interfaces.IExpedientes>();
                var bpExpediente = Get<p.SCV.Interfaces.IExpedientes>();
                var bpSeguimiento = Get<p.SCV.Interfaces.ISeguimientos>();

                dynamic escrituracion = new ExpandoObject();
                var venta = await bpVentas.GetVentaByExpedienteId(idExpediente);
                var expediente = await daoExpediente.GetById(idExpediente);
                var cotizacion = await bpVentas.GetCotizacionById(venta.IdCotizacion.Value);

                escrituracion.Venta = venta;
                escrituracion.Expediente = expediente;
                escrituracion.Cotizacion = cotizacion;
                escrituracion.MontoCredito = cotizacion.Financiamiento.FinanciamientoInstituciones.Count() > 0 ? cotizacion.Financiamiento.FinanciamientoInstituciones[0].MontoCredito :0;

                var daoMonedas = Get<d.Kontrol.Interfaces.IMonedas>();
                m.Kontrol.Interfaces.IMoneda moneda = await daoMonedas.GetById((int)venta.Desarrollo.IdMoneda);

                dynamic result = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(escrituracion));

                var plantillaDocumento = await this.GetPlantilla("EXP-ESCRITURACION", result, null, moneda);
                var documento = plantillaDocumento.GetDocument(false, plantillaDocumento, result, factory, moneda);

                string retValue = null;
                //{memoria del documento para manipular los bytes}
                using (MemoryStream ms = new MemoryStream())
                {
                    documento.Content.Position = 0;
                    documento.Content.CopyTo(ms);

                    //{convertir bytes a base64 para evitar perdida de información}
                    retValue = Convert.ToBase64String(ms.ToArray());
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> GenerarHojaDatosGenerales(int idExpediente)
        {
            try
            {
                var daoExpediente = Get<d.SCV.Interfaces.IExpedientes>();
                var daoCliente = Get<d.SCV.Interfaces.IClientes>();
                var daoClienteContacto = Get<d.SCV.Interfaces.IClienteContacto>();

                var expediente = await daoExpediente.GetById(idExpediente);

                dynamic hojaDatosGenerales = new ExpandoObject();
                hojaDatosGenerales.Expediente= expediente;

                var daoMonedas = Get<d.Kontrol.Interfaces.IMonedas>();
                m.Kontrol.Interfaces.IMoneda moneda = await daoMonedas.GetById((int)expediente.Desarrollo.IdMoneda);


                hojaDatosGenerales.Cliente = await daoCliente.GetById(expediente.Cliente.ID.Value);

                /*Obteniendo datos de contacto*/
                m.SCV.Interfaces.IClienteContactos corrreo= await daoClienteContacto.ObtenerContactoPrincipal(expediente.Cliente.ID.Value, "CORREO");
                m.SCV.Interfaces.IClienteContactos celular =await daoClienteContacto.ObtenerContactoPrincipal(expediente.Cliente.ID.Value, "TELEFONO");

                hojaDatosGenerales.Correo =corrreo!=null? corrreo.Contacto:"";
                hojaDatosGenerales.Celular =celular!=null? celular.Contacto:"";

                dynamic result = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(hojaDatosGenerales));

                var plantillaDocumento = await this.GetPlantilla("HOJA-DATOS-GENERALES", result, null, moneda);
                var documento = plantillaDocumento.GetDocument(false, plantillaDocumento, result, factory, moneda);


                string retValue = null;
                //{memoria del documento para manipular los bytes}
                using (MemoryStream ms = new MemoryStream())
                {
                    documento.Content.Position = 0;
                    documento.Content.CopyTo(ms);

                    //{convertir bytes a base64 para evitar perdida de información}
                    retValue = Convert.ToBase64String(ms.ToArray());
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async  Task<m.SCV.Interfaces.IExpediente> GenerarExpediente(Dictionary<string, object> parametros)
       {
            var expediente = Get<m.SCV.Interfaces.IExpediente>();

            try
            {
                BeginTransaction(true);

                int idcliente = 1;
                int iddDesarrollo = 1;


                var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();

                var bpEstatusExpediente = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusExpediente = await bpEstatusExpediente.Get("SCVESTATUSEXPEDIENTE", "A");

                var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                var bpTipoExpediente = Get<p.SCV.Interfaces.ITiposExpediente>();
                var tipoExpediente = await bpTipoExpediente.GetByClave("D");

                expediente.EstatusExpediente = estatusExpediente;
                expediente.IdEstatusExpediente = estatusExpediente.ID ?? 0;
                expediente.Estatus = estatus;
                expediente.IdEstatus = estatus.ID ?? 0;
                expediente.IdCliente = idcliente;
                expediente.IdDesarrollo = iddDesarrollo;
                expediente.IdTipoExpediente = tipoExpediente.ID.Value;

                var bpDocs = Get<p.Kontrol.Interfaces.IKontrolFiles>();
                var doc = await bpDocs.GetById(850);

                var DAOtipoEntidad = Get<d.Kontrol.Interfaces.ITiposEntidad>();
                var tipoEntidad = await DAOtipoEntidad.GetByClave("documentos");


                expediente.IdTipoEntidad = tipoEntidad.ID.Value;
                expediente.IdEntidad = doc.ID;

                expediente = await base.saveModel(expediente);

                int idExpediente = (int)expediente.ID;


                //crear nueva venta einiciar el proceso de cotización

                var bpVenta = Get<p.SCV.Interfaces.IVentas>();
                var venta = await bpVenta.SaveNuevaVenta(idExpediente, iddDesarrollo, null);
                await bpVenta.CreateProcesos(venta.ID.Value);
                await bpVenta.SaveVentaProceso(venta.ID.Value, "CI", "INICIAR_PROCESO");

              

                //consultar estatus seguimiento
                var bpEstatusSeguimiento = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusSeguimiento = await bpEstatusSeguimiento.Get("SCVESTATUSSEGUIMIENTO", "A");
                var estatusEsperaSeguimiento = await bpEstatusSeguimiento.Get("SCVESTATUSSEGUIMIENTO", "E");
                int idEstatusSeguimiento = estatusSeguimiento.ID.Value;

                var param = new Dictionary<string, object> { { "claveTipoExpediente", "D" } };
                var daoFases= Get<d.SCV.Interfaces.IFasesExpediente>();
                var fasesExpedienteLista = await daoFases.GetAll(param);

                var daoEsquema = Get<d.SCV.Interfaces.IEsquemas>();
                var daoposicion = Get<d.Kontrol.Interfaces.IPosiciones>();
                var daoUsuario = Get<d.Kontrol.Interfaces.IUsuarios>();
                var usuario = await daoUsuario.GetById(base.getUserId());
                var posicion = await daoposicion.GetById(usuario.Posicion.ID.Value);
                var esquema = await daoEsquema.GetById(35);

                foreach (var item in fasesExpedienteLista)
                {

                    /*Generar seguimientos*/
                    var seguimiento = Get<m.SCV.Interfaces.ISeguimiento>();

                    if (item.Orden > 1)
                    {
                        seguimiento.EstatusSeguimiento = estatusEsperaSeguimiento;
                        seguimiento.IdEstatusSeguimiento = estatusEsperaSeguimiento.ID;
                    }
                    else
                    {
                        seguimiento.EstatusSeguimiento = estatusSeguimiento;
                        seguimiento.IdEstatusSeguimiento = idEstatusSeguimiento;
                    }

                    seguimiento.Esquema = esquema;
                    seguimiento.IdEsquema = 35;
                    seguimiento.IdPosicion = posicion.ID.Value;
                    seguimiento.Posicion = posicion;
                    seguimiento.Fase = item;
                    seguimiento.IdExpediente = idExpediente;
                    int result = await this.SaveConfiguracion(seguimiento);

                    if(item.Orden==1)
                    {
                        var etapa = await bpSeguimientos.getSeguimientoEtapas(result);

                        foreach (var element in etapa)
                        {
                            await bpSeguimientos.VerificaAvanzarEtapa(element);
                        }
                    }
                }

               // var seguimientoActivo = await bpSeguimientos.GetSeguimientoActivo(idExpediente);

               


                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return expediente;
        }


        #region "Workflow"
        public override async Task<string> GetDescripcion(dynamic obj)
        {
            //var expediente = await this.ObtenerExpedientePorEscriturarPorID(obj.ID);
            var plantilla = await GetPlantilla("AUT-ESCRITU", obj, null);
            return plantilla.ToString();
        }
        public async Task<p.Kontrol.WorkflowResult> Authorize(int id, m.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            try
            {
                BeginTransaction(true);

                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();

                var retValue = new p.Kontrol.WorkflowResult();

                var expediente = await this.GetById(id);

                if (expediente.IdMotivoCancelacion > 0)
                {
                    /*Proceso de cancelacion*/

                    /*Cambiar estatus a cancelado*/
                    var estatusExpediente = await bpEstatus.Get("SCVESTATUSEXPEDIENTE", "C");
                    var estatusVenta= await bpEstatus.Get("ESTATUSVENTA", "C");



                    expediente.Changed("Modificado", true);
                    expediente.Changed("IdModificadoPor", true);
                    expediente.Changed("IdEstatusExpediente", true);
                    expediente.Modificado = DateTime.UtcNow;
                    expediente.IdModificadoPor = base.getUserId();
                    expediente.IdEstatusExpediente = estatusExpediente.ID.Value;
                    expediente = await this.dao.SaveEntity(expediente, false);

                    /*Cambiar estatus de venta a cancelada*/

                    var daoVenta = Get<d.SCV.Interfaces.IVentas>();

                    var venta = await daoVenta.GetByExpedienteId(id);
                    venta.Changed("Modificado", true);
                    venta.Changed("IdModificadoPor", true);
                    venta.Changed("IdEstatusExpediente", true);
                    venta.Modificado = DateTime.UtcNow;
                    venta.IdModificadoPor = base.getUserId();
                    venta.IdEstatusVenta = (int)estatusVenta.ID;
                    venta = await daoVenta.SaveEntity(venta, false);

                    /*poner ubicaciones como disponibles*/
                    await this.ActualizarUbicacionesDisponibles((int)expediente.ID);
                    await this.ActualizarConceptosPlanPago((int)expediente.ID);
                    await this.ActualizarComisiones((int)expediente.ID);


                    retValue.Success = true;
                    retValue.Message = $"Se autorizó la cancelación del expediente #{id}";

                }
                else
                {
                    /*Proceso de escrituracion*/
                    var proceso = await bpSeguimientos.getExpedienteProceso(id, "PROC-ESCRITURACION");

                    if (proceso != null)
                    {
                        await bpSeguimientos.UpdateExpedienteProceso(proceso, "E");
                    }

                    /*Registro en bitacora la autorizacion del proceso*/
                    var bpBitacora = Get<p.Kontrol.Interfaces.IBitacora>();
                    await bpBitacora.SaveBitacora("Aprobación de solicitud de autorización de " + instance.Workflow.Nombre, "seguimientos", "CATBT-SI-ASA", id, "Expediente", id, null);

                    retValue.Success = true;
                    retValue.Message = $"Se autorizó la escrituración del expediente #{id}";

                }

                Commit();
                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }
        public async Task<p.Kontrol.WorkflowResult> Reject(int id, m.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var retValue = new p.Kontrol.WorkflowResult();
            try
            {
                BeginTransaction(true);

                /*Rechazo de la cancelacion del expediente*/

                var expediente=await this.dao.GetById(id);

                if (expediente.IdMotivoCancelacion > 0)
                {
                    /*Proceso de cancelacion*/

                    /*Cambiar estatus a activo*/
                    var estatusExpediente = await bpEstatus.Get("SCVESTATUSEXPEDIENTE", "A");


                    expediente.Changed("Modificado", true);
                    expediente.Changed("IdModificadoPor", true);
                    expediente.Changed("IdEstatusExpediente", true);

                    expediente.Changed("IdMotivoCancelacion", true);
                    expediente.Changed("FechaCancelacion", true);
                    expediente.Changed("ObservacionesCancelacion", true);

                    expediente.Modificado = DateTime.UtcNow;
                    expediente.IdModificadoPor = base.getUserId();
                    expediente.IdEstatusExpediente = estatusExpediente.ID.Value;

                    expediente.IdMotivoCancelacion = null;
                    expediente.FechaCancelacion = null;
                    expediente.ObservacionesCancelacion = null;

                    expediente = await this.dao.SaveEntity(expediente, false);

                    retValue.Success = true;
                    retValue.Message = $"Se Rechazo el proceso de cancelación del expediente #{id}";

                    /*Registro en bitacora la autorizacion del proceso*/
                    var bpBitacora = Get<p.Kontrol.Interfaces.IBitacora>();
                    await bpBitacora.SaveBitacora("Rechazo de solicitud de autorización de " + instance.Workflow.Nombre, "seguimientos", "CATBT-SI-REA", id, "Expediente", id, null);

                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }
        public async Task<object> RequestAuthorize(Dictionary<string,object> parametros)
        {
            try
            {
                BeginTransaction(true);

                object idExpediente;
                parametros.TryGetValue("id", out idExpediente);

                var expedienteAutorizacion = await this.GetById(Convert.ToInt32(idExpediente));
                await StartWorkflow("ESCRITURACION", expedienteAutorizacion, base.getUserId());

                Commit();
                var expediente = await this.ObtenerExpedientePorEscriturarPorID(parametros);
                return expediente;

            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }
        #endregion


        #region "Cancelacion Expediente"


        public async Task<List<m.SCV.Interfaces.IVentaPPConcepto>> GetConceptosPago(Dictionary<string, object> parametros)
        {
            object expedienteId = string.Empty;
            parametros.TryGetValue("idExpediente", out expedienteId);
            int idExpediente = Convert.ToInt32(expedienteId);

            /*Obtenemos conceptos de pago*/
            var bpVentas = Get<p.SCV.Interfaces.IVentas>();
            var daoVentas = Get<d.SCV.Interfaces.IVentas>();

            var venta = await daoVentas.GetByExpedienteId(idExpediente);
            var conceptosPago = await bpVentas.GetConceptosPago(idExpediente);

            var expediente = await this.dao.GetById(idExpediente);

            /*Buscar configuracion de conceptos en base al desarrollo*/
            var bpDesarrollo = Get<p.SCV.Interfaces.IDesarrollos>();
            parametros.Clear();
            parametros.Add("idDesarrollo", expediente.IdDesarrollo);

            var configuracionConceptos = await bpDesarrollo.GetConceptosPago(parametros);

            List<m.SCV.Interfaces.IVentaPPConcepto> conceptosPagoList = new List<m.SCV.Interfaces.IVentaPPConcepto>();

            foreach (var item in conceptosPago)
            {
                var conceptoPago = Get<m.SCV.Interfaces.IVentaPPConcepto>();
                conceptoPago.ID = item.ID;
                conceptoPago.Nombre = item.ConceptoPago.Nombre;
                conceptoPago.Saldo = item.Saldo;
                conceptoPago.ImporteMoneda = item.ImporteMoneda;
                conceptoPago.Pagado = item.Pagado;

                conceptoPago.ImporteReembolsable =0;
                conceptoPago.PorcentajeReembolso =0;
                conceptoPago.Moneda = venta.Moneda;

                var search = configuracionConceptos.Where(x => x.IdConceptoPago == item.ConceptoPago.ID);
                if (search != null && search.Count()>0)
                {
                    var config = search.FirstOrDefault();
                    conceptoPago.PorcentajeReembolso = config.Reembolso;
                    conceptoPago.ImporteReembolsable = (item.Pagado * config.Reembolso)/100M;
                     
                }
                conceptosPagoList.Add(conceptoPago);
            }

            return conceptosPagoList;
        }


        public async Task<List<m.SCV.Interfaces.IComisionesSeguimientoDetalle>> GetComisiones(Dictionary<string, object> parametros)
        {
            object expedienteId = string.Empty;
            object motivoCancelacionId = string.Empty;

            parametros.TryGetValue("idExpediente", out expedienteId);
            parametros.TryGetValue("idMotivoCancelacion", out motivoCancelacionId);

            int idExpediente = Convert.ToInt32(expedienteId);
            int idMotivoCancelacion = Convert.ToInt32(motivoCancelacionId);

            var expediente = await this.dao.GetById(idExpediente);
            var bpComisiones = Get<p.SCV.Interfaces.IComisionesSeguimiento>();


            /*Buscar configuracion de conceptos en base al desarrollo*/
            var bpDesarrollo = Get<p.SCV.Interfaces.IDesarrollos>();
            parametros.Clear();
            parametros.Add("idDesarrollo", expediente.IdDesarrollo);
            parametros.Add("idMotivoCancelacion", idMotivoCancelacion);
            var configuracionMotivoCancelacion = await bpDesarrollo.GetMotivosCancelacion(parametros);

            /*Obtenemos comisiones generadas por expediente*/
            var comisiones = await bpComisiones.ObtenerComisionesPorExpediente(idExpediente);

            List<m.SCV.Interfaces.IComisionesSeguimientoDetalle> comisionesList = new List<m.SCV.Interfaces.IComisionesSeguimientoDetalle>();

            foreach (var item in comisiones)
            {
                var comision = Get<m.SCV.Interfaces.IComisionesSeguimientoDetalle>();

                comision.ID = item.ID;
                comision.Usuario = item.Usuario;
                comision.TipoComision = item.TipoComision;
                comision.Moneda = item.Moneda;
                comision.ComisionMoneda = item.ComisionMoneda;
                comision.Clave = item.Clave;

                comision.ImportePenalizacion = 0;
                comision.PorcentajePenalizacion = 0;

                if (configuracionMotivoCancelacion != null && configuracionMotivoCancelacion.Count()>0)
                {
                    var config = configuracionMotivoCancelacion.FirstOrDefault();
                    comision.PorcentajePenalizacion = config.Penalizacion;
                    comision.ImportePenalizacion = (item.ComisionMoneda * config.Penalizacion) / 100M;

                }
                comisionesList.Add(comision);
            }

            return comisionesList;
        }


        /*Guardar Expediente*/
        public async Task<object> SaveCancelacion(m.SCV.Interfaces.IExpediente item)
        {

            try
            {
                BeginTransaction(true);
                int idExpediente = item.ID.Value;
                /*Requisitos para la cancelacion del expediente*/

                /*Validando que el proceso de escrituracion no este completado o por autorizar*/
                var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();
                var procesoEscrituracion = await bpSeguimientos.getExpedienteProceso(idExpediente, "PROC-ESCRITURACION");

                if (procesoEscrituracion != null && procesoEscrituracion.EstatusProceso.Clave != "P")
                {
                    base.SetReturnInfo(1, "No se puede iniciar la cancelación del expediente porque  el proceso de escrituracion esta en curso", 1);
                    return await this.GetByIdConfiguration(idExpediente);
                }

                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusExpediente = await bpEstatus.Get("SCVESTATUSEXPEDIENTE", "PA");

                var expediente = await this.dao.GetById(idExpediente);

                expediente.Changed("IdMotivoCancelacion", true);
                expediente.Changed("FechaCancelacion", true);
                expediente.Changed("ObservacionesCancelacion", true);
                expediente.Changed("Modificado", true);
                expediente.Changed("IdModificadoPor", true);
                expediente.Changed("IdEstatusExpediente", true);

                expediente.IdMotivoCancelacion = item.IdMotivoCancelacion;
                expediente.FechaCancelacion = item.FechaCancelacion;
                expediente.ObservacionesCancelacion = item.ObservacionesCancelacion;
                expediente.Modificado = DateTime.UtcNow;
                expediente.IdModificadoPor = base.getUserId();
                expediente.IdEstatusExpediente = estatusExpediente.ID.Value;

                expediente= await this.dao.SaveEntity(expediente, false);

                await StartWorkflow("CANCELACION-EXP", expediente, base.getUserId());

                Commit();
                return await this.GetByIdConfiguration(idExpediente);
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

        }


        /*Actualizar ubicaciones a disponibles*/
        public async Task<bool> ActualizarUbicacionesDisponibles(int idExpediente)
        {

            var daoVentas = Get<d.SCV.Interfaces.IVentas>();
            var bpVentas = Get<p.SCV.Interfaces.IVentas>();
            var daoUbicaciones = Get<d.SCV.Interfaces.IUbicaciones>();

            var venta = await daoVentas.GetByExpedienteId(idExpediente);
            var currentVersion = await bpVentas.GetCurrentVersion(venta.ID ?? 0);

            var ventaUbicaciones = await daoVentas.GetUbicacionesById(venta.ID.Value, currentVersion.ID ?? 0);

            /*Estatus Disponible*/
            var bpUbicacionEstatus = Get<d.SCV.Interfaces.IUbicacionesEstatus>();
            var estatusUbicacion =await bpUbicacionEstatus.GetByClave("D");


            foreach (var ventaUbicacion in ventaUbicaciones)
            {
                var ubicacion = await daoUbicaciones.GetById(ventaUbicacion.Ubicacion.ID.Value);

                ubicacion.Changed("Cierre", true);
                ubicacion.Changed("IdEstatusUbicacion", true);
                ubicacion.Changed("Modificado", true);
                ubicacion.Changed("IdModificadoPor", true);
                ubicacion.Changed("IdEstatusDeUbicacion", true);

                ubicacion.Cierre = false;
                /*disponible*/
                ubicacion.IdEstatusUbicacion = true;
                ubicacion.IdEstatusDeUbicacion = estatusUbicacion.ID.Value;
                ubicacion.Modificado = DateTime.UtcNow;
                ubicacion.IdModificadoPor = base.getUserId();
                await daoUbicaciones.SaveEntity(ubicacion, false);

            }

            return true;
        }


        /*Actualizar conceptos plan de pago*/
        public async Task<bool> ActualizarConceptosPlanPago(int idExpediente)
        {
            var pa = new Dictionary<string, object>();
            pa.Add("idExpediente", idExpediente);
            var conceptosPago = await this.GetConceptosPago(pa);

            var daoVentaConceptoPago = Get<d.SCV.Interfaces.IVentaPPConceptosPago>();

            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            foreach (var item in conceptosPago)
            {
                var conceptoPago = await daoVentaConceptoPago.GetById(item.ID.Value);

                conceptoPago.Changed("Modificado", true);
                conceptoPago.Changed("IdModificadoPor", true);
                conceptoPago.Changed("ImporteReembolsable", true);
                conceptoPago.Changed("ImporteReembolsableMoneda", true);
                conceptoPago.Changed("PorcentajeReembolso", true);


                conceptoPago.Modificado = DateTime.UtcNow;
                conceptoPago.IdModificadoPor = base.getUserId();
                conceptoPago.ImporteReembolsable = item.ImporteReembolsable;
                conceptoPago.ImporteReembolsableMoneda = item.ImporteReembolsable*conceptoPago.TipoCambio;
                conceptoPago.PorcentajeReembolso = item.PorcentajeReembolso;

                await daoVentaConceptoPago.Save(conceptoPago);
            }

            return true;
        }


        /*Actualizar conceptos plan de pago*/
        public async Task<bool> ActualizarComisiones(int idExpediente)
        {

            var pa = new Dictionary<string, object>();
            pa.Add("idExpediente", idExpediente);

            var comisiones = await this.GetComisiones(pa);

            var daocomisionSeguimiento = Get<d.SCV.Interfaces.IComisionesSeguimientoDetalle>();
            var daoComisonTabulador = Get<d.SCV.Interfaces.IComisionesTabuladores>();

            var bpCatalogoGeneral = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            var estatusCancelado = await bpCatalogoGeneral.Get("ESTATUSCOMISIONES", "CAN");


            foreach (var item in comisiones)
            {
                if (item.Clave == "comisionesTabuladores")
                {
                    var comisonTa = await daoComisonTabulador.GetById(item.ID.Value);

                    int nuevaCantidad = comisonTa.CantidadBase - 1;
                    if (nuevaCantidad <= comisonTa.Maximo && nuevaCantidad >= comisonTa.Minimo)
                    {
                        /*No hacer nada aun aplica la comision*/
                    }
                    else
                    {
                        comisonTa.Changed("Modificado", true);
                        comisonTa.Changed("IdModificadoPor", true);
                        comisonTa.Changed("ImportePenalizacion", true);
                        comisonTa.Changed("ImportePenalizacionMoneda", true);
                        comisonTa.Changed("PorcentajePenalizacion", true);
                        comisonTa.Changed("IdEstatus", true);

                        comisonTa.Modificado = DateTime.UtcNow;
                        comisonTa.IdModificadoPor = base.getUserId();
                        comisonTa.ImportePenalizacion = item.ImportePenalizacion;
                        comisonTa.ImportePenalizacionMoneda = item.ImportePenalizacion * comisonTa.TipoCambio;
                        comisonTa.PorcentajePenalizacion = item.PorcentajePenalizacion;
                        comisonTa.IdEstatus = estatusCancelado.ID.Value;

                        await daoComisonTabulador.Save(comisonTa);
                    }

                   

                }
                else if (item.Clave == "comisionesSeguimiento")
                {

                    var comisonSe = await daocomisionSeguimiento.GetById(item.ID.Value);

                    comisonSe.Changed("Modificado", true);
                    comisonSe.Changed("IdModificadoPor", true);
                    comisonSe.Changed("ImportePenalizacion", true);
                    comisonSe.Changed("ImportePenalizacionMoneda", true);
                    comisonSe.Changed("PorcentajePenalizacion", true);
                    comisonSe.Changed("IdEstatus", true);

                    comisonSe.Modificado = DateTime.UtcNow;
                    comisonSe.IdModificadoPor = base.getUserId();
                    comisonSe.ImportePenalizacion = item.ImportePenalizacion;
                    comisonSe.ImportePenalizacionMoneda = item.ImportePenalizacion * comisonSe.TipoCambio;
                    comisonSe.PorcentajePenalizacion = item.PorcentajePenalizacion;
                    comisonSe.IdEstatus = estatusCancelado.ID.Value;
                    await daocomisionSeguimiento.Save(comisonSe);

                }
            }


            return true;
        }

        #endregion



        #region "Exportar Expediente"


        public new async Task<object> Export(Dictionary<string, object> parametros)
        {
            var bpDasboard = Get<p.SCV.Interfaces.IDashBoardExpedientes>();
            return await bpDasboard.GetDashboardExpedientes(parametros);
        }
        #endregion


        }

}