using EK.Drivers.Log;
using EM = EK.Drivers.Emailing; 

using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

using NT = EK.Drivers.Notifications;

namespace EK.Procesos.SCV
{
    public class Ventas
        : p.Kontrol.BPBase<m.SCV.Interfaces.IVenta, d.SCV.Interfaces.IVentas>, 
        p.SCV.Interfaces.IVentas,
        p.Kontrol.Interfaces.IWorkflowBP,
        p.SCV.Interfaces.ITabuladoresCalculo
    {
        public Ventas(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IVentas dao)
            : base(factory, dao, "ventas")
        {
        }

        #region Public Functions

        public async Task<m.SCV.Interfaces.IVenta> GetEntidadByExpedienteId(int IdExpediente)
        {


            var retValue = await this.dao.GetByExpedienteId(IdExpediente);



            if (retValue.EstatusVenta.Clave == "CO")
            {
                //Si está en estatus Cotización y ya existen cotizaciones guardadas, selecciona la primer cotización.
                var retCotizaciones = await this.GetCotizaciones(IdExpediente);

                var bpExpediente = Get<p.SCV.Interfaces.IExpedientes>();
                retValue.Expediente = await bpExpediente.GetByCatalogo(IdExpediente);

                if (retCotizaciones != null && retCotizaciones.Count > 0)
                {
                    retValue = await this.GetCurrentCotizacion((int)retCotizaciones[0].ID, IdExpediente);
                }
                else
                {
                    retValue.ReadOnlyKontrol = await this.IsAllowedToEdit((int)retValue.ID);
                    retValue.AllowToCotizar = await this.IsAllowedToCotizar(IdExpediente);
                    retValue.VentaProceso = await this.GetProcesoActivo((int)retValue.ID);
                }
            }
            else
            {
                //Si el estatus es cotizacion pero sin cotizaciones ó si es otro estatus.
                retValue = await this.GetVentaByExpedienteId(IdExpediente);
            }


            retValue.TipoComercializacion = retValue.Expediente.TipoComercializacion;
            retValue.Fase = retValue.Expediente.Fase;
            retValue.Etapa = retValue.Expediente.Etapa;
            retValue.Proceso = retValue.VentaProceso.VentaProceso;

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVenta> GetVentaByExpedienteId(int IdExpediente)
        {
            var retValue = Get<m.SCV.Interfaces.IVenta>();
            var daoCT = Get<d.SCV.Interfaces.ICotizaciones>();


            var bpExpediente = Get<p.SCV.Interfaces.IExpedientes>();

            try
            {
                retValue = await this.dao.GetByExpedienteId(IdExpediente);
                var currentVersion = await this.GetCurrentVersion(retValue.ID.Value);
                retValue.PlanPagos = await this.GetPlanDeVenta((int)retValue.ID, currentVersion.ID ?? 0, IdExpediente);
                retValue.Financiamiento = await this.GetVentaFinanciamiento((int)retValue.ID, currentVersion.ID ?? 0, IdExpediente);


                var ubicaciones = await this.GetUbicacionesById((int)retValue.ID, currentVersion.ID ?? 0, IdExpediente);

                //var ubicaciones = retValue.IdCotizacion!=null?
                //    await daoCT.GetUbicacionesById(retValue.IdCotizacion.Value, 0):
                //    await this.GetUbicacionesById((int)retValue.ID, currentVersion.ID ?? 0, IdExpediente);

                
                var newUbicaciones = new List<m.SCV.Interfaces.IVentaUbicacion>();

                if (ubicaciones != null && ubicaciones.Count > 0)
                {
                    foreach (var u in ubicaciones)
                    {
                        if (retValue.IdCotizacion!=null)
                        {
                            u.Caracteristicas = await daoCT.GetCaracteristicasVenta(retValue.IdCotizacion.Value, (int)u.ID, 0);
                        }

                        //{tomar desarrollo de la ubicacion y esquema de la venta
                        int idDesarrollo = u.Ubicacion.Desarrollo.ID ?? 0;
                        int idFinanciamiento = retValue.Financiamiento != null ? (retValue.Financiamiento.Financiamiento.ID ?? 0) : 0;

                        //{consultar desarrollo-esquema para obtener caracteristicas obligatorias}
                        var bpDE = this.factory.GetInstance<p.SCV.Interfaces.IDesarrollos>();
                        var desarrolloFinanciamiento = await bpDE.GetDesarrolloFinanciamiento(idDesarrollo, idFinanciamiento);

                        //{consultar precio de lista, con las caracteristicas adicionales};
                        var bpListaPrecios = this.factory.GetInstance<p.SCV.Interfaces.IListaPrecios>();
                        var lp = await bpListaPrecios.GetByUbicacion(u.Ubicacion.ID.Value, desarrolloFinanciamiento.ID.Value, u.Caracteristicas, IdExpediente);
                        if (lp == null || lp.ID == -1)
                        {
                            //base.SetReturnInfo(1, "La ubicación no cuenta con Precio Vigente en la lista de precios, verificar.", 1);
                            u.ImporteUbicacion = 0;
                        }
                        else
                        {
                            u.ImporteUbicacion = lp.ValorUbicacion;
                            u.ValorAvaluo = lp.ValorAvaluo ?? 0;
                            u.ValorExcedente = (lp.Ubicacion.Excedente * lp.Ubicacion.Desarrollo.PrecioExcedenteM2);
                            u.PrecioExcedente = lp.Ubicacion.Desarrollo.PrecioExcedenteM2;
                        }
                        u.Archivos = await this.GetArchivosUbicacion(u);
                        newUbicaciones.Add(u);
                    }
                }

                retValue.Ubicaciones = newUbicaciones;

                retValue.ReadOnlyKontrol = await this.IsAllowedToEdit((int)retValue.ID);
                retValue.AllowToCotizar = await this.IsAllowedToCotizar(IdExpediente);
                retValue.Expediente = await bpExpediente.GetByCatalogo(IdExpediente);
                retValue.VentaProceso = await this.GetProcesoActivo((int)retValue.ID);
                retValue.Cotizaciones = await this.GetCotizaciones(IdExpediente);
            }
            catch (Exception ex)
            {
               throw ex;
            }

            return retValue;
        }

        public async Task<List<m.SCV.Interfaces.IVentaUbicacion>> ObtenerUbicaciones(Dictionary<string,object>parametros)
        {
            var daoCT = Get<d.SCV.Interfaces.ICotizaciones>();

            object idExpediente = 0;
            parametros.TryGetValue("idExpediente", out idExpediente);


            var venta = await this.dao.GetByExpedienteId(Convert.ToInt32(idExpediente));
            var currentVersion = await this.GetCurrentVersion(venta.ID.Value);

            //var ubicaciones = await daoCT.GetUbicacionesById(venta.IdCotizacion.Value, 0);

            var ubicaciones = await this.GetUbicacionesById((int)venta.ID, currentVersion.ID.Value, Convert.ToInt32(idExpediente));

            venta.Financiamiento = await this.GetVentaFinanciamiento((int)venta.ID, currentVersion.ID ?? 0, (Convert.ToInt32(idExpediente)));

            // GetUbicacionesCotizacionById


            var newUbicaciones = new List<m.SCV.Interfaces.IVentaUbicacion>();

            if (ubicaciones != null && ubicaciones.Count > 0)
            {
                foreach (var u in ubicaciones)
                {
                    if (venta.IdCotizacion > 0)
                    {
                        u.Caracteristicas = await daoCT.GetCaracteristicasVenta(venta.IdCotizacion.Value, u.ID.Value, 0);
                        //{tomar desarrollo de la ubicacion y esquema de la venta
                        int idDesarrollo = u.Ubicacion.Desarrollo.ID ?? 0;
                        int idFinanciamiento = venta.Financiamiento != null ? (venta.Financiamiento.Financiamiento.ID ?? 0) : 0;

                        //{consultar desarrollo-esquema para obtener caracteristicas obligatorias}
                        var bpDE = this.factory.GetInstance<p.SCV.Interfaces.IDesarrollos>();
                        var desarrolloFinanciamiento = await bpDE.GetDesarrolloFinanciamiento(idDesarrollo, idFinanciamiento);

                        //{consultar precio de lista, con las caracteristicas adicionales};
                        var bpListaPrecios = this.factory.GetInstance<p.SCV.Interfaces.IListaPrecios>();
                        var lp = await bpListaPrecios.GetByUbicacion(u.Ubicacion.ID.Value, desarrolloFinanciamiento.ID.Value, u.Caracteristicas, Convert.ToInt32(idExpediente));
                        if (lp == null || lp.ID == -1)
                        {
                           // base.SetReturnInfo(1, "La ubicación no cuenta con Precio Vigente en la lista de precios, verificar.", 1);
                            u.ImporteUbicacion = 0;
                        }
                        else
                        {
                            u.ImporteUbicacion = lp.ValorUbicacion;
                            u.ValorAvaluo = lp.ValorAvaluo ?? 0;
                            u.ValorExcedente = (lp.Ubicacion.Excedente * lp.Ubicacion.Desarrollo.PrecioExcedenteM2);
                            u.PrecioExcedente = lp.Ubicacion.Desarrollo.PrecioExcedenteM2;
                        }
                        u.Moneda = venta.Moneda;
                        newUbicaciones.Add(u);
                    }
                }
            }

            return newUbicaciones;

        }

        public async Task<List<m.SCV.Interfaces.IVentaFinanciamiento>> ObtenerFinanciamiento(Dictionary<string, object> parametros)
        {
            object idExpediente = 0;
            parametros.TryGetValue("idExpediente", out idExpediente);

            var retValue = Get<m.SCV.Interfaces.IVenta>();

            List<m.SCV.Interfaces.IVentaFinanciamiento> ventfinanciaiento = new List<m.SCV.Interfaces.IVentaFinanciamiento>();

            retValue = await this.dao.GetByExpedienteId(Convert.ToInt32(idExpediente));
            var currentVersion = await this.GetCurrentVersion(retValue.ID.Value);

            var financiamiento= await this.GetVentaFinanciamiento((int)retValue.ID, currentVersion.ID ?? 0, Convert.ToInt32(idExpediente));
            ventfinanciaiento.Add(financiamiento);
            return ventfinanciaiento;
        }

        public async Task<m.SCV.Interfaces.IVenta> GetByExpedienteId(int IdExpediente)
        {

            var venta = await this.dao.GetByExpedienteId(IdExpediente);
            var currentVersion = await this.GetCurrentVersion(venta.ID ?? 0);
            var retValue = await this.GetById(venta, currentVersion.ID ?? 0);
            retValue.ReadOnlyKontrol = await this.IsAllowedToEdit((int)retValue.ID);

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVenta> SaveNuevaVenta(int? idExpediente, int? idDesarrollo, int? idAgente)
        {
            var retValue = Get<m.SCV.Interfaces.IVenta>();

            try
            {
                BeginTransaction(true);

                var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                var bpEstatusVenta = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusVenta = await bpEstatusVenta.Get("ESTATUSVENTA", "CO");

                var venta = Get<m.SCV.Interfaces.IVenta>();
                //venta.IdTipoCliente = idTipoCliente;
                venta.IdExpediente = idExpediente.Value;
                venta.IdAgente = idAgente;
                venta.Creado = DateTime.UtcNow;
                venta.IdCreadoPor = base.getUserId();
                venta.Modificado = DateTime.UtcNow;
                venta.IdModificadoPor = base.getUserId();
                venta.IdDesarrollo = idDesarrollo ?? 0;
                venta.EstatusVenta = estatusVenta;
                venta.IdEstatusVenta = estatusVenta.ID ?? 0;
                venta.IdEstatus = estatus.ID;
                venta.Estatus = estatus;

                //{guardar y obtener la nueva venta}
                await this.dao.SaveNuevaVenta(venta);
                retValue = await this.dao.GetByExpedienteId(idExpediente.Value);

                //{incrementar versión de la nueva venta}
                if (retValue != null)
                {
                    await this.IncrementVersion(retValue.ID ?? 0);
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

        public async Task<m.SCV.Interfaces.IVenta> GetById(m.SCV.Interfaces.IVenta venta, int idVentaVersion)
        {
            var retValue = venta;

            retValue.Ubicaciones = await this.GetUbicacionesById((int)retValue.ID, idVentaVersion, (int)retValue.IdExpediente);
            retValue.PlanPagos = await this.GetPlanDeVenta((int)retValue.ID, idVentaVersion, (int)retValue.IdExpediente);
            retValue.Financiamiento = await this.GetVentaFinanciamiento((int)retValue.ID, idVentaVersion, (int)retValue.IdExpediente);

            return retValue;
        }

        public async Task<object[]> GetEstatusVentaAll(int id, int activos)
        {
            return await this.dao.GetEstatusVentaAll(id, activos);
        }

        public async Task<m.SCV.Interfaces.IVentaPP> RecalcularPlanPagos(m.SCV.Interfaces.IVenta venta, m.SCV.Interfaces.IVentaPPConcepto concepto)
        {
            var calculoPP = Get<p.SCV.Interfaces.ICalculoPlanVenta>();

            await calculoPP.Calcular(venta, concepto);

            return venta.PlanPagos;
        }

        private int getNextLowerID(List<m.SCV.Interfaces.IVentaCaracteristica> caracteristicas)
        {
            int id = 0;

            if (caracteristicas != null)
            {
                for (var i = 0; i < caracteristicas.Count; i++)
                {
                    if (caracteristicas[i].ID <= 0)
                    {
                        if (caracteristicas[i].ID < id)
                        {
                            id = caracteristicas[i].ID.Value;
                        }
                    }
                }
            }
            id--;

            return id;
        }

        public async Task<object[]> RecalcularUbicaciones(int idVenta, List<m.SCV.Interfaces.IVentaUbicacion> ubicaciones, int idFinanciamiento, int idExpediente)
        {
            var retValue = new List<object>();

            try
            {
                var bpTipoEntidad = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var tipoFinanciamiento = await bpTipoEntidad.Get("SCVTIPOSENTIDADES", "F");
                bool agrega = true;
                var currentVersion = await this.GetCurrentVersion(idVenta);
                var bpListaPrecios = this.factory.GetInstance<p.SCV.Interfaces.IListaPrecios>();

                var ci = 0;

                if (ubicaciones != null)
                {
                    foreach (var u in ubicaciones)
                    {
                        if (u.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            agrega = true;
                            //{tomar desarrollo de la ubicacion y esquema de la venta
                            int idDesarrollo = u.Ubicacion.Desarrollo.ID ?? 0;

                            //{consultar desarrollo-esquema para obtener caracteristicas obligatorias}
                            var bpDE = this.factory.GetInstance<p.SCV.Interfaces.IDesarrollos>();
                            var desarrolloFinanciamiento = await bpDE.GetDesarrolloFinanciamiento(idDesarrollo, idFinanciamiento);

                            var caracteristicas = u.Caracteristicas != null ? u.Caracteristicas : new List<m.SCV.Interfaces.IVentaCaracteristica>();
                            var lp = await bpListaPrecios.GetByUbicacion(u.Ubicacion.ID.Value, desarrolloFinanciamiento.ID.Value, u.Caracteristicas, idExpediente);
                            u.Caracteristicas = new List<m.SCV.Interfaces.IVentaCaracteristica>();
                            int tope = 0;

                            if (lp == null || lp.ID == -1)
                            {
                               // base.SetReturnInfo(1, "La ubicación no cuenta con Precio Vigente en la lista de precios, verificar.", 1);
                            }else if (lp != null && lp.ValorAvaluo == null && u.PrecioVenta.Clave == "A") {
                                //base.SetReturnInfo(1, "La ubicación no cuenta con Valor Avalúo en la lista de precios, verificar.", 1);
                                agrega = false;
                            }
                            else if (lp != null && lp.Caracteristicas != null)
                            {
                                lp.ValorAutorizado = lp.ValorAutorizado ?? 0;
                                u.TotalCaracteristicas = 0;
                                var valorAvaluo = lp.ValorAvaluo ?? 0;
                                u.Diferencia = 0;
                                foreach (var c in lp.Caracteristicas)
                                {
                                    var vc = Get<m.SCV.Interfaces.IVentaCaracteristica>();
                                    var uc = caracteristicas.FirstOrDefault(
                                        ca => ca.Caracteristica != null && ca.Caracteristica.Clave == c.Caracteristica.Clave);


                                    if (uc != null)
                                    {
                                        vc.ID = uc.ID;
                                        vc.Estado = uc.Estado; //Modificado, Eliminado
                                    }
                                    else
                                    {
                                        vc.ID = --ci;
                                        vc.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo; //Nuevo
                                    }
                                    
                                    if (c.VentaOpcional == false && tope == 0) { 
                                            
                                            if (u.PrecioVenta.Clave == "A" && u.Topar == true && (valorAvaluo - (lp.ValorAutorizado + u.TotalCaracteristicas + c.Importe)) < 0)
                                            {
                                                tope = 1;
                                            }
                                            if (tope == 0)
                                            {
                                                u.TotalCaracteristicas = u.TotalCaracteristicas + c.Importe;
                                                if (valorAvaluo > 0)
                                                {
                                                    u.Diferencia = valorAvaluo - (lp.ValorAutorizado + u.TotalCaracteristicas);
                                                }
                                            }
                                        }
                                    if (tope == 0)
                                    {
                                        vc.Caracteristica = Get<m.SCV.Interfaces.ICaracteristicaAdicional>();
                                        vc.Caracteristica = c.Caracteristica; //all properties
                                        vc.IdCaracteristica = c.IdCaracteristica;
                                        vc.IdTipoEntidad = c.IdTipoEntidad;
                                        vc.IdEntidad = c.IdEntidad;
                                        vc.Clave = c.Caracteristica.Clave;
                                        vc.Nombre = c.Caracteristica.Nombre;
                                        vc.VentaOpcional = c.VentaOpcional;
                                        vc.Importe = c.Importe;
                                        vc.IdVentaUbicacion = u.ID;
                                        vc.TipoEntidad = c.TipoEntidad;
                                        vc.IdEntidadCaracteristica = c.ID;
                                        vc.VentaVersion = currentVersion;
                                        vc.IdVentaVersion = currentVersion.ID;

                                        u.Caracteristicas.Add(vc);
                                    }
                                }
                            }

                            //************** Eliminará las caracteristicas tipo esquema que ya estén grabadas **************//
                            if (idFinanciamiento <= 0)
                            {
                                if (caracteristicas != null)
                                {
                                    //Caracteristicas que vienen de React
                                    foreach (var cv in caracteristicas)
                                    {
                                        //Descartar que ya hayan sido borradas en React
                                        if (cv.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado)
                                        {
                                            //Eliminar caracteristicas de tipo Esquema
                                            if (cv.IdTipoEntidad == tipoFinanciamiento.ID)
                                            {
                                                var ce = Get<m.SCV.Interfaces.IVentaCaracteristica>();
                                                ce = cv;
                                                ce.Estado = m.Kontrol.KontrolEstadosEnum.Eliminado;
                                                u.Caracteristicas.Add(ce);
                                            }
                                        }
                                    }
                                }
                            }
                            //************************************************************************************************//
                            if (lp != null && lp.ID > 0 && agrega == true)
                            {
                                var valorAvaluo = lp.ValorAvaluo ?? lp.ValorAutorizado;
                                lp.ValorAvaluo = lp.ValorAvaluo ?? 0;


                                if (u.PrecioVenta.Clave == "A")
                                {
                                    u.ImporteMoneda = valorAvaluo;
                                    if (u.Topar == false)
                                    { //Si topar está falso, se le agrega el total de características adicionales al valor avalúo.
                                        u.ImporteMoneda = valorAvaluo + u.TotalCaracteristicas;
                                    }
                                    u.ImporteComisionable = u.ImporteMoneda ?? 0;
                                }
                                else if (u.PrecioVenta.Clave == "O")
                                {
                                    u.ImporteMoneda = lp.ValorAutorizado + u.TotalCaracteristicas;
                                    u.ImporteComisionable = lp.ValorAutorizado + u.TotalCaracteristicas ?? 0;
                                }

                                /*Si se cambio el precio de venta, pasar valor d ela propiedad directamente*/
                                if (u.ImporteNuevo > 0)
                                {
                                    u.ImporteMoneda = u.ImporteNuevo;
                                    u.ImporteComisionable = u.ImporteNuevo ?? 0;
                                }


                                //if (tope == 0)
                                //{
                                u.ImporteUbicacion = lp.ValorUbicacion;
                                    u.TipoCambio = 1;
                                    u.VentaVersion = currentVersion;
                                    u.IdVentaVersion = currentVersion.ID;
                                    u.IdListaPreciosVersion = lp.ListaPreciosVersion.ID;
                                    u.Estado = m.Kontrol.KontrolEstadosEnum.Modificado; //<-- forzar a la ubicación como modificada
                                    u.ValorAvaluo = lp.ValorAvaluo;
                                    u.Diferencia = 0;
                                    if (lp.ValorAvaluo > 0)
                                    {
                                        u.Diferencia = lp.ValorAvaluo - (lp.ValorAutorizado + u.TotalCaracteristicas);
                                    }
                                    u.Importe = u.ImporteMoneda;
                                    u.ValorExcedente=(lp.Ubicacion.Excedente * lp.Ubicacion.Desarrollo.PrecioExcedenteM2);
                                    u.PrecioExcedente = lp.Ubicacion.Desarrollo.PrecioExcedenteM2;
                                    u.ValorOperativo = u.ImporteUbicacion + u.TotalCaracteristicas;
                                    dynamic newUbicacion = base.ToDynamic(u);
                                    newUbicacion.Archivos = await this.GetArchivosUbicacion(u);

                                    retValue.Add(newUbicacion);
                                //}
                                //else
                                //{
                                if (tope == 1) { 

                                    base.SetReturnInfo(1, "No es posible agregar características ya que sobrepasa el Avalúo, verificar.", 1);
                                }
                            }
                        }
                        else
                        {
                            dynamic newUbicacion = base.ToDynamic(u);
                            newUbicacion.Archivos = await this.GetArchivosUbicacion(u);

                            retValue.Add(newUbicacion);
                        }
                    }
                }

                return retValue.ToArray();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IVentaPP> AgregarAbonoCapital(m.SCV.Interfaces.IVenta venta, m.SCV.Interfaces.IVentaPPConcepto concepto, m.Kontrol.Interfaces.IAbono abono)
        {
            p.SCV.Interfaces.ICalculoPlanVenta calculoPP = this.factory.GetInstance<p.SCV.Interfaces.ICalculoPlanVenta>();
            await calculoPP.Calcular(venta, concepto);
            return venta.PlanPagos;
        }

        public async Task<m.SCV.Interfaces.IVentaPP> CalcularPlanPagos(int idVenta, int idPlanPagos, int idExpediente, m.SCV.Interfaces.IVentaFinanciamiento financiamiento, List<m.SCV.Interfaces.IVentaUbicacion> ubicaciones)
        {
            var ppBO = Get<p.SCV.Interfaces.IPlanesPagos>();

            m.SCV.Interfaces.IVenta venta = await this.GetByExpedienteId(idExpediente);

            venta.Financiamiento = financiamiento;
            venta.Ubicaciones = ubicaciones;

            var currentVersion = await this.GetCurrentVersion(venta.ID ?? 0);

            m.SCV.Interfaces.IPlanPagos planPagosCatalogo = await ppBO.GetById(idPlanPagos);

            //Obtenemos los Conceptos del PP
            planPagosCatalogo.ConceptoPago = await ppBO.GetConceptosPagoById(idPlanPagos);


            m.SCV.Interfaces.IVentaPP planPagos = this.factory.GetInstance<m.SCV.Interfaces.IVentaPP>();
            planPagos.Conceptos = new List<m.SCV.Interfaces.IVentaPPConcepto>();

            if (planPagosCatalogo != null)
            {
                planPagos.ID = -1;
                planPagos.Clave = planPagosCatalogo.Clave;
                planPagos.Descripcion = planPagosCatalogo.Descripcion;
                planPagos.IdPlanVenta = idPlanPagos;
                planPagos.VentaVersion = currentVersion;
                planPagos.IdVentaVersion = currentVersion.ID;

                if (planPagosCatalogo.ConceptoPago != null && planPagosCatalogo.ConceptoPago.Count > 0)
                {
                    var planesPagoConceptos = planPagosCatalogo.ConceptoPago.OrderBy(x => x.Orden);

                    int idConcepto = 0;
                    foreach (var c in planesPagoConceptos)
                    {

                        var concepto = this.factory.GetInstance<m.SCV.Interfaces.IVentaPPConcepto>();
                        concepto.ID = (--idConcepto);
                        concepto.ConceptoPago = c.ConceptoPago;
                        concepto.ImporteMoneda = c.Importe;
                        concepto.Importe = c.Importe;
                        concepto.Saldo = c.Importe;
                        concepto.FrecuenciaPago = c.FrecuenciaPago;
                        concepto.NumeroPagos = c.NumeroPagos;
                        concepto.NumeroPlazoPrimerPago = c.NumeroPlazoPrimerPago;
                        concepto.Porcentaje = c.Porcentaje;
                        concepto.PorcentajeTIF = c.PorcentajeTIF;
                        concepto.PorcentajeTIM = c.PorcentajeTIM;
                        concepto.PeriodoPrimerPago = c.PeriodoPrimerPago;
                        concepto.Modificable = c.Modificable;
                        concepto.VentaVersion = currentVersion;
                        concepto.IdVentaVersion = currentVersion.ID;
                        concepto.Formula = c.Formula;

                        concepto.Orden = c.Orden;
                        concepto.Venta = c.Venta;
                        concepto.Reestructura = c.Reestructura;
                        concepto.Finiquito = c.Finiquito;

                        planPagos.Conceptos.Add(concepto);
                    }
                }
            }
            venta.PlanPagos = planPagos;

            p.SCV.Interfaces.ICalculoPlanVenta calculoPP = this.factory.GetInstance<p.SCV.Interfaces.ICalculoPlanVenta>();
            await calculoPP.Calcular(venta);

            return venta.PlanPagos;
        }

        public async Task<m.SCV.Interfaces.IVentaUbicacion> VentaUbicacion(
            m.SCV.Interfaces.IVentaUbicacion ventaUbicacion,
            m.SCV.Interfaces.IVentaFinanciamiento ventaFinanciamiento,
            int idVenta,
            int idExpediente,
            bool allowSave)
        {
            var ubicacionBP = Get<p.SCV.Interfaces.IUbicaciones>();
            var listapreciosBP = base.Get<p.SCV.Interfaces.IListaPrecios>();
            var tipoCambioBP = base.Get<p.SCV.Interfaces.ITiposCambio>();
            var companiaBP = this.factory.GetInstance<p.Kontrol.Interfaces.ICompania>();
            var idUbicacion = ventaUbicacion.Ubicacion.ID ?? 0;
            var ubicacion = await ubicacionBP.GetById(idUbicacion);

            var DAO = await this.GetDAO(idExpediente);
            var venta = await DAO.GetById(idVenta);

            if (ubicacion != null)
            {
                //{consultar la versión de la venta}
                var currentVersion = await this.GetCurrentVersion(idVenta);

                //{guardar las características de la venta-ubicación}
                if (allowSave == true)
                {
                    if (ventaUbicacion.Caracteristicas != null && ventaUbicacion.Caracteristicas.Count > 0)
                    {
                        var caracteristicas = new List<m.SCV.Interfaces.IVentaCaracteristica>();
                        foreach (var c in ventaUbicacion.Caracteristicas)
                        {
                            var vc = Get<m.SCV.Interfaces.IVentaCaracteristica>();
                            vc.ID = c.ID;
                            vc.IdCaracteristica = c.IdCaracteristica ?? 0;
                            vc.IdEntidad = ventaUbicacion.ID ?? 0;
                            vc.IdVentaUbicacion = ventaUbicacion.ID ?? 0;
                            vc.IdEntidadCaracteristica = c.IdEntidadCaracteristica;
                            vc.IdTipoEntidad = c.Caracteristica.IdTipoEntidad;
                            vc.Caracteristica = c.Caracteristica;
                            vc.TipoEntidad = c.Caracteristica.TipoEntidad;
                            vc.VentaOpcional = c.VentaOpcional;
                            vc.Clave = c.Caracteristica.Clave;
                            vc.Nombre = c.Caracteristica.Nombre;
                            vc.Importe = c.Importe;
                            vc.Estado = c.Estado;

                            caracteristicas.Add(vc);

                            if (c.VentaOpcional == false)
                            {
                                ventaUbicacion.TotalCaracteristicas = ventaUbicacion.TotalCaracteristicas + c.Importe;
                            }
                        }

                        foreach (var c in caracteristicas)
                        {
                            if (c.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                            {
                                c.IdCreadoPor = base.getUserId();
                                c.IdModificadoPor = base.getUserId();

                                if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                {
                                    await DAO.DeleteCaracteristicas(c.ID.Value);
                                }
                                else
                                {
                                    await DAO.SaveCaracteristicas(idVenta, idUbicacion, currentVersion.ID, c);
                                }
                            }
                        }
                    }
                }

                //{desarrollo de la ubicación que se está procesando}
                int idDesarrollo = ventaUbicacion.Ubicacion.IdDesarrollo;

                int idFinanciamiento = 0;
                if (ventaFinanciamiento != null && ventaFinanciamiento.Financiamiento != null)
                {
                    idFinanciamiento = ventaFinanciamiento.Financiamiento.ID ?? 0;
                }

                //{consultar desarrollo-esquema para obtener caracteristicas obligatorias}
                var bpDesarrollos = base.Get<p.SCV.Interfaces.IDesarrollos>();
                var desarrolloFinanciamiento = await bpDesarrollos.GetDesarrolloFinanciamiento(idDesarrollo, idFinanciamiento);

                //{consultar lista de precios por ubicación}
                var ubicacionLP = await listapreciosBP.GetByUbicacion(idUbicacion, desarrolloFinanciamiento.ID.Value, ventaUbicacion.Caracteristicas, idExpediente);

                if (ubicacionLP != null && ubicacionLP.ID >0)
                {
                    int idMonedaDesarrollo = ventaUbicacion.IdMoneda ?? 0;
                    int idCompania = ubicacion.Desarrollo.IdCompania ?? 0;
                    var compania = await companiaBP.GetById(idCompania);
                    int idMonedaBase = compania.IdMonedaBase ?? 0;
                    decimal? tc = 0;
                    if (idMonedaBase != idMonedaDesarrollo)
                    {
                        tc = await tipoCambioBP.GetTipoCambioAlDia(idMonedaDesarrollo, idMonedaBase) ?? 0;
                    }
                    else
                    {
                        tc = 1;
                    };
                    if (tc == 0)
                    {
                        base.SetReturnInfo(1, "El Tipo de Cambio no está definido, verificar.", 1);
                    };
                    ventaUbicacion.Ubicacion = ubicacion;
                    // importe origen
                    if (ventaUbicacion.PrecioVenta.Clave == "A")
                    {
                        ventaUbicacion.ImporteMoneda = ubicacionLP.ValorAvaluo ?? ubicacionLP.ValorAutorizado;
                        if (ventaUbicacion.Topar == false)
                        {
                            ventaUbicacion.ImporteMoneda = ventaUbicacion.ImporteMoneda + ventaUbicacion.TotalCaracteristicas;
                        }
                    }
                    else
                    {
                        ventaUbicacion.ImporteMoneda = ubicacionLP.ValorAutorizado + ventaUbicacion.TotalCaracteristicas;
                    }
                    ventaUbicacion.Importe = ventaUbicacion.ImporteMoneda * tc;
                    ventaUbicacion.TipoCambio = tc;
                    ventaUbicacion.Moneda = compania.MonedaBase;
                    ventaUbicacion.IdListaPreciosVersion = ubicacionLP.ListaPreciosVersion.ID;

                    /**/
                    ventaUbicacion.ImporteOriginal = ventaUbicacion.Importe;
                    ventaUbicacion.ImporteOriginalMoneda = ventaUbicacion.ImporteMoneda;

                }
                else
                {
                    //base.SetReturnInfo(1, "La Ubicación no cuenta con Precio vigente en la Lista de Precios, verificar.", 1);
                }
            }

            return ventaUbicacion;
        }

        public async Task<m.SCV.Interfaces.IVentaFinanciamiento> GetVentaFinanciamiento(int idVenta)
        {
            var venta = await this.dao.GetById(idVenta);
            var version = await this.GetCurrentVersion(idVenta);
            var retValue = await this.GetVentaFinanciamiento(idVenta, (int)version.ID, venta.IdExpediente);
            return retValue;
        }

        public async Task<List<m.SCV.Interfaces.IVentaPPConcepto>> GetConceptosPago(int idExpediente)
        {

            var venta = await this.dao.GetByExpedienteId(idExpediente);
            var currentVersion = await this.GetCurrentVersion((int)venta.ID);
            var conceptosPago= await  this.dao.GetConceptosPP(venta.ID.Value, currentVersion.ID.Value, "A");
            return conceptosPago;

        }

        public async Task<m.SCV.Interfaces.IVentaPP> GetPlanDeVenta(int id, int idVentaVersion, int? idExpediente)
         {
            var DAO = await this.GetDAO(idExpediente);
            var retValue = await DAO.GetPlanPagos(id, idVentaVersion);
            var ventaVersion = await this.GetSpecificVersion(idVentaVersion, null, null, null, null);

            if (retValue != null)
            {
                retValue.Conceptos = await DAO.GetConceptosPP(id, idVentaVersion, "A");

                if (retValue.Conceptos != null && retValue.Conceptos.Count > 0)

                {
                    var conceptosOrdenados= retValue.Conceptos.OrderBy(z => z.Orden).ToList();
                    retValue.Conceptos = conceptosOrdenados;
                    foreach (var c in retValue.Conceptos)
                    {
                        c.Documentos = await DAO.GetDocumentosPP((int)c.ID, idVentaVersion);
                    }
                }
                else
                {
                    retValue.Conceptos = await DAO.GetConceptosPagoById(retValue.IdPlanVenta);

                    if (retValue.Conceptos != null && retValue.Conceptos.Count > 0)
                    {
                        var conceptosOrdenados = retValue.Conceptos.OrderBy(z => z.Orden).ToList();
                        retValue.Conceptos = conceptosOrdenados;
                        foreach (var c in retValue.Conceptos)
                        {
                            c.VentaVersion = ventaVersion;
                            c.IdVentaVersion = ventaVersion.ID;
                            c.Documentos = await DAO.GetDocumentosPP((int)c.ID, idVentaVersion);
                        }
                    }
                }
            }
            else
            {
                retValue = Get<m.SCV.Interfaces.IVentaPP>();
                retValue.VentaVersion = ventaVersion;
                retValue.IdVentaVersion = ventaVersion.ID;
                retValue.Conceptos = new List<m.SCV.Interfaces.IVentaPPConcepto>();
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVentaFinanciamiento> GetVentaFinanciamiento(int idVenta, int idVentaVersion, int? idExpediente)
        {
            var DAO = await this.GetDAO(idExpediente);
            //
            var retValue = await DAO.GetVentaFinanciamiento(idVenta, idVentaVersion);
            if (retValue != null)
            {
                retValue.FinanciamientoInstituciones = await DAO.GetVentaFinanciamientoInstituciones(idVenta, idVentaVersion);
                if (retValue.FinanciamientoInstituciones != null)
                {
                    foreach (var fi in retValue.FinanciamientoInstituciones)
                    {
                        fi.Conceptos = await DAO.GetVentaInstitucionConceptos(idVenta, (int)fi.ID, idVentaVersion);
                    }
                }
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVenta> SeleccionarCotizacion(int idCotizacion, int idExpediente)
            {


            try
            {
                BeginTransaction(true);

                var retValue = Get<m.SCV.Interfaces.IVenta>();
                var daoCotizaciones = Get<d.SCV.Interfaces.ICotizaciones>();
                var daoExpedientes = Get<d.SCV.Interfaces.IExpedientes>();
                var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();

                //{obtener la cotización de referencia}
                var cotizacion = await this.GetCotizacionById(idCotizacion);

                //{obtener información del expediente}            
                var expediente = await daoExpedientes.GetById(idExpediente);

                //{obtener información del seguimiento activo y el agente activo}           
                var seguimiento = await bpSeguimientos.GetSeguimientoActivo(idExpediente);

                //{consultar el estatus draft para actualizar la venta}
                var bpEstatusVenta = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusVenta = await bpEstatusVenta.Get("ESTATUSVENTA", "D");

                //{obtener la venta del expediente}
                var venta = await this.dao.GetByExpedienteId(idExpediente);
                venta.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                venta.Moneda = expediente.Desarrollo.Moneda;
                venta.IdMoneda = expediente.Desarrollo.IdMoneda;
                venta.IdAgente = seguimiento.Posicion.IdUsuario;
                venta.EstatusVenta = estatusVenta;
                venta.IdEstatusVenta = estatusVenta.ID ?? 0;
                venta.Desarrollo = expediente.Desarrollo;
                venta.IdDesarrollo = expediente.IdDesarrollo;
                venta.Expediente = expediente;
                venta.IdExpediente = idExpediente;
                venta.Importe = cotizacion.Importe;
                venta.ImporteMoneda = cotizacion.ImporteMoneda;
                venta.TipoCambio = cotizacion.TipoCambio;
                venta.IdCotizacion = idCotizacion;

                //{actualizar estatus de la venta a DRAFT}
                venta = await this.saveModel(venta);

                //{consultar versión de la venta}
                var ventaVersion = await this.dao.GetVersion(null, venta.ID, null, null, null);

                //{procesar ubicaciones y caracteristicas}
                var ubicaciones = cotizacion.Ubicaciones;
                if (ubicaciones != null)
                {
                    ubicaciones.ForEach(ub =>
                    {
                        ub.ID = -1;
                        ub.IdVentaVersion = ventaVersion.ID ?? 0;
                        ub.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

                        if (ub.Caracteristicas != null)
                        {
                            ub.Caracteristicas.ForEach(ca =>
                            {
                                ca.ID = -1;
                                ca.IdVentaVersion = ventaVersion.ID ?? 0;
                                ca.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            });
                        }
                    });
                }

                //{procesar financiamiento e instituciones}
                var financiamiento = cotizacion.Financiamiento;
                if (financiamiento != null)
                {
                    financiamiento.ID = -1;
                    financiamiento.IdVentaVersion = ventaVersion.ID ?? 0;
                    financiamiento.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

                    if (financiamiento.FinanciamientoInstituciones != null)
                    {
                        financiamiento.FinanciamientoInstituciones.ForEach(fi =>
                        {
                            fi.ID = -1;
                            fi.IdVentaVersion = ventaVersion.ID ?? 0;
                            fi.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

                            if (fi.Conceptos != null)
                            {
                                fi.Conceptos.ForEach(cc =>
                                {
                                    cc.ID = -1;
                                    cc.IdVentaVersion = ventaVersion.ID ?? 0;
                                    cc.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                });
                            }
                        });
                    }
                }

                //{procesar plan pagos, conceptos y documentos}
                var planPagos = cotizacion.PlanPagos;
                if (planPagos != null)
                {
                    planPagos.ID = -1;
                    planPagos.IdVenta = venta.ID ?? 0;
                    planPagos.IdVentaVersion = ventaVersion.ID ?? 0;
                    planPagos.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

                    if (planPagos.Conceptos != null)
                    {
                        planPagos.Conceptos.ForEach(cp =>
                        {
                            cp.ID = -1;
                            cp.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            cp.IdVenta = venta.ID ?? 0;
                            cp.IdVentaVersion = ventaVersion.ID ?? 0;

                            if (cp.Documentos != null)
                            {
                                cp.Documentos.ForEach(doc =>
                                {
                                    doc.ID = -1;
                                    doc.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                });
                            }
                        });
                    }
                }

                //{asignar las ubicaciones, esquemas, plan de pagos de la cotización a la venta}
                venta.Ubicaciones = ubicaciones;
                venta.Financiamiento = financiamiento;
                venta.PlanPagos = planPagos;

                //{consultar el estatus seleccionado para marcar la cotización como venta}
                var bpEstatusCotizacion = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusCotizacion = await bpEstatusCotizacion.Get("ESTATUSCOTIZACION", "SE");

                //{actualizar la cotización como seleccionada}
                cotizacion.IdCreadoPor = base.getUserId();
                cotizacion.IdModificadoPor = base.getUserId();
                cotizacion.IdEstatusVenta = estatusCotizacion.ID ?? 0;
                cotizacion.FechaSeleccion = DateTime.UtcNow;
                await daoCotizaciones.Save(cotizacion);

                //{consultar el estatus de proceso ejecutado}
                var bpEstatusProceso = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusProceso = await bpEstatusProceso.Get("SCVSEGESTATUSPROCESO", "E");

                //{consultar el proceso de cotizacion del expediente para ejecutarlo}
                var procesoCotizacion = await bpSeguimientos.getExpedienteProceso(idExpediente, "PROC-COTIZACION");

                //{ejecutar el proceso de cotizacion del expediente}
                await bpSeguimientos.UpdateExpedienteProceso(procesoCotizacion, "E");
                await bpSeguimientos.EjecutarProceso(procesoCotizacion, false);

                //{guardar cambios de la venta}
                retValue = await this.SaveVenta(venta);

                Commit();

                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

        }

        public async Task<m.SCV.Interfaces.IVenta> SaveCotizacion(m.SCV.Interfaces.IVenta item)
        {
            m.SCV.Interfaces.IVenta retValue = null;

            try
            {
                BeginTransaction(true);
                //{respaldar las secciones de la cotización}
                var model = item;
                var usaPaquete = item.Expediente.TipoComercializacion.Paquete;
                
                //{buscar información de la cotización capturada en la sección de cotizaciones}
                if (item.Cotizaciones != null)
                {
                    var c = item.Cotizaciones.Find(o => item.ID == o.ID);
                    item.Nombre = c.Nombre;
                    item.FechaVigencia = c.FechaVigencia;
                    item.Importe = c.Importe;
                    item.ImporteMoneda = c.ImporteMoneda;
                }

                //{obtener información del expediente para la cotización a guardar}
                var daoExpedientes = Get<d.SCV.Interfaces.IExpedientes>();
                var expediente = await daoExpedientes.GetById(item.IdExpediente);

                //{obtener información del seguimiento activo y el agente activo}
                var daoSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();
                var seguimiento = await daoSeguimientos.GetSeguimientoActivo(item.IdExpediente);

                //{obtener tipo de cambio dia}
                var tipoCambioBP = base.Get<p.SCV.Interfaces.ITiposCambio>();
                var tipoCambio = await tipoCambioBP.GetTipoCambioAlDia((int)expediente.Desarrollo.IdMoneda, (int)expediente.Desarrollo.IdMoneda);

                item.TipoCambio = tipoCambio;
                item.IdAgente = seguimiento.Posicion.IdUsuario;
                item.Desarrollo = expediente.Desarrollo;
                item.IdDesarrollo = expediente.IdDesarrollo;
                item.Moneda = expediente.Desarrollo.Moneda;
                item.IdMoneda = expediente.Desarrollo.IdMoneda;
                item.IdCreadoPor = base.getUserId();
                item.IdModificadoPor = base.getUserId();

                var cotizacionesDAO = Get<d.SCV.Interfaces.ICotizaciones>();
                var ubicacionBP = Get<p.SCV.Interfaces.IUbicaciones>();
                var bpPaquetes = Get<p.SCV.Interfaces.IPaquetes>();

                //{generar ID para las nuevas cotizaciones}
                if (item.ID == null || item.ID <= 0 || item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    item = await cotizacionesDAO.Save(item);
                    item.Cotizaciones = model.Cotizaciones;
                    item.Ubicaciones = model.Ubicaciones;
                    item.Financiamiento = model.Financiamiento;
                    item.PlanPagos = model.PlanPagos;
                }

                int idCotizacion = item.ID ?? 0;
                int idExpediente = item.IdExpediente;

                //{guardar información del esquema de financiamiento}
                var idFinanciamiento = await this.SaveFinanciamiento(item, idCotizacion, 0);

                //{guardar ubicaciones de la venta}
                if (item.EstatusVenta != null)
                {
                    if (item.Ubicaciones != null && item.Ubicaciones.Count > 0)
                    {
                        decimal totalUbicacion = 0;
                        decimal totalUbicacionIM = 0;
                        foreach (var u in item.Ubicaciones)
                        {
                            if (u.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                            {
                                if (u.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                {
                                    //Quita la ubicación relacionada a la Venta, 
                                    //Actualiza el estatus a Disponible y Borra las caracteristicas de venta.
                                    await cotizacionesDAO.DeleteRelacionUbicacion(u);
                                    if (usaPaquete)
                                    {
                                        await bpPaquetes.UpdateEstatusUbicacion((int)u.Ubicacion.ID, "D");
                                    }
                                    // await ubicacionBP.ActualizaEstatusUbicacion((int)u.Ubicacion.ID, "D");
                                    foreach (var c in u.Caracteristicas)
                                    {
                                        await cotizacionesDAO.DeleteCaracteristicas((int)c.ID);
                                    }
                                    u.Importe = 0;
                                    u.ImporteMoneda = 0;
                                }
                                else
                                {
                                    //Guarda la relación venta-ubicación, 
                                    //Reserva la ubicación y Guarda las características de la venta.
                                    u.IdModificadoPor = base.getUserId();

                                    u.ID = await cotizacionesDAO.SaveRelacionUbicacion(idCotizacion, u);

                                    if (usaPaquete)
                                    {
                                        await bpPaquetes.UpdateEstatusUbicacion((int)u.Ubicacion.ID, "A");
                                    }
                                    var vtaUbicacion = await this.VentaUbicacion(u, item.Financiamiento, idCotizacion, idExpediente, true);
                                    if (item.Importe == null)
                                    {
                                        item.Importe = 0;
                                        u.ImporteComisionable = 0;
                                    }
                                    totalUbicacion += (decimal)vtaUbicacion.Importe;
                                    totalUbicacionIM += (decimal)vtaUbicacion.ImporteMoneda;
                                    u.ImporteComisionable = (decimal)vtaUbicacion.Importe;
                                }
                                item.Importe = totalUbicacion;
                                item.ImporteMoneda = totalUbicacionIM;
                            }
                        }
                    }

                    if (item.PlanPagos != null)
                    {
                        if (item.PlanPagos.IdPlanVenta > 0)
                        {
                            //Guardamos el PP
                            retValue = await this.SavePP(item, idExpediente, item.PlanPagos.IdPlanVenta, 1);
                        }
                    }

                    item.IdCreadoPor = base.getUserId();
                    item.IdModificadoPor = base.getUserId();

                    //{actualizar la cotización}
                    await cotizacionesDAO.Save(item);

                    //{actualizar datos de venta}
                    var daoVentas = Get<d.SCV.Interfaces.IVentas>();
                    var venta = await this.dao.GetByExpedienteId(idExpediente);

                    await this.saveModel(venta);

                    //{obtener la información de la cotización completa}
                    retValue = await this.GetCurrentCotizacion(idCotizacion, idExpediente);

                    await Log(retValue);

                    Commit();
                }
                else
                {
                    throw new Exception("Error: La cotización no tiene un estatus definido.");
                }
            }
            catch (Exception ex)
            {
                Rollback();
                //
                throw ex;
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVenta> SaveVenta(m.SCV.Interfaces.IVenta item)
        {
            m.SCV.Interfaces.IVenta retValue = null;

            try
            {
                //llenado de variables
                var ventasDAO = Get<d.SCV.Interfaces.IVentas>();
                var ubicacionBP = Get<p.SCV.Interfaces.IUbicaciones>();
                int idVenta = (int)item.ID;
                int idExpediente = (int)item.IdExpediente;
                var financiamiento = item.Financiamiento;
                var usaPaquete = item.Expediente.TipoComercializacion.Paquete;

                var bpPaquetes = Get<p.SCV.Interfaces.IPaquetes>();

                item.IdModificadoPor = base.getUserId();
                item.Modificado = DateTime.UtcNow;

                //{obtenemos Informacion de la Venta}
                retValue = await this.GetByExpedienteId(idExpediente);

                var currentVersion = await this.GetCurrentVersion(retValue.ID ?? 0);

                if (retValue.Estatus.Clave == "P")
                {
                    this.SetReturnInfo(0, "La venta está pendiente por autorizar");
                    return retValue;
                }

                //{guardamos el Esquema de Financiamiento}
                var idFinanciamiento = await this.SaveFinanciamiento(item, idVenta, currentVersion.ID ?? 0);

                //{guardar ubicaciones de la venta}
                if ((item.EstatusVenta != null && item.EstatusVenta.Clave != "A") || item.EstatusVenta.Clave != "P")
                {
                    if (item.Ubicaciones != null && item.Ubicaciones.Count > 0)
                    {
                        decimal totalUbicacion = 0;
                        decimal totalUbicacionIM = 0;
                        foreach (var u in item.Ubicaciones)
                        {
                            var idNuevo = u.IdVentaVersion != currentVersion.ID ? -1 : 1;

                            if (u.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                            {
                                if (u.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                {//Quita la ubicación relacionada a la Venta, Actualiza el estatus a Disponible y Borra las caracteristicas de venta.
                                    await dao.DeleteRelacionUbicacion(u);
                                    await ubicacionBP.ActualizaEstatusUbicacion((int)u.Ubicacion.ID, true);
                                    //Pendiente actualizar el estatus de la ubicación relacionada al paquete para que quede disponible.
                                    //Pendiente actualizar el estatus del paquete si se libera alguna ubicación como disponible.
                                    await bpPaquetes.UpdateEstatusUbicacion((int)u.Ubicacion.ID, "D");
                                    //------------------------------------------------------------------------------------------------//
                                    //await ubicacionBP.ActualizaEstatusUbicacion((int)u.Ubicacion.ID, "D");
                                    foreach (var c in u.Caracteristicas)
                                    {
                                        await this.dao.DeleteCaracteristicas((int)c.ID);
                                    }
                                    u.Importe = 0;
                                    u.ImporteMoneda = 0;
                                }
                                else
                                { //Guarda la relación venta-ubicación, Reserva la ubicación y Guarda las características de la venta.
                                    u.ID = (u.ID < 0 ? u.ID : u.ID * idNuevo);
                                    u.VentaVersion = currentVersion;
                                    u.IdVentaVersion = currentVersion.ID ?? 0;
                                    u.IdModificadoPor = base.getUserId();

                                    /*Asignaicon d evalor original de la ubicacion*/
                                    if (u.ID < 0)
                                    {
                                        u.ImporteOriginal = u.Importe;
                                        u.ImporteOriginalMoneda = u.ImporteMoneda;
                                    }

                                    /*Cambio del precio de venta*/
                                    if (u.ImporteNuevo > 0)
                                    {
                                        u.ImporteMoneda = u.ImporteNuevo;
                                        u.Importe = (decimal)u.TipoCambio * (decimal)u.ImporteNuevo;

                                        /*Almacenar elemento en bitacora*/
                                        /*Consultando valor anterior de la ubicacion*/
                                        var ubicacionesVenta = await this.GetUbicacionesById((int)item.ID);
                                        var ubicacionEdicion = ubicacionesVenta.Where(x => x.Ubicacion.ID == u.Ubicacion.ID).FirstOrDefault();

                                        /*Registro en bitacora la autorizacion del proceso*/
                                        string comentario = "Cambio de precio de venta de " +Math.Round((decimal)ubicacionEdicion.ImporteMoneda,2) + " a " + u.ImporteNuevo;
                                        var bpBitacora = Get<p.Kontrol.Interfaces.IBitacora>();
                                        await bpBitacora.SaveBitacora(comentario, "Expediente", "CATBT-SI-CPV", item.IdExpediente, "Expediente", item.IdExpediente, null);


                                    }

                                    var idEntidad = await ventasDAO.SaveRelacionUbicacion(idVenta, u);

                                    if (usaPaquete) {
                                        //Actualizar el estatus en la relación de paquetes ubicación.
                                        //Actualizar el estatus del paquete si ya han sido reservadas todas las ubicaciones.
                                        await bpPaquetes.UpdateEstatusUbicacion((int)u.Ubicacion.ID, "A");
                                        //----------------------------------------------------------//
                                    }
                                    //await ubicacionBP.ActualizaEstatusUbicacion((int)u.Ubicacion.ID, false);
                                    //await ubicacionBP.ActualizaEstatusUbicacion((int)u.Ubicacion.ID, "N");
                                    u.ID = idEntidad;
                                    var vtaUbicacion = await this.VentaUbicacion(u, financiamiento, idVenta, idExpediente, true);
                                    if (item.Importe == null)
                                    {
                                        item.Importe = 0;
                                        u.ImporteComisionable = 0;
                                    }
                                    totalUbicacion += (decimal)vtaUbicacion.Importe;
                                    totalUbicacionIM += (decimal)vtaUbicacion.ImporteMoneda;
                                    u.ImporteComisionable = (decimal)vtaUbicacion.Importe;
                                }
                                item.Importe = totalUbicacion;
                                item.ImporteMoneda = totalUbicacionIM;
                            }
                        }
                    }

                    if (item.PlanPagos != null)
                    {
                        if (item.PlanPagos.IdPlanVenta > 0)
                        {
                            //Guardamos el PP
                            retValue = await this.SavePP(item, idExpediente, item.PlanPagos.IdPlanVenta, 1);
                        }
                    }

                    //save sin transacción
                    await this.dao.SaveEntity(item,true,false);

                    //{obtener venta x expediente con información completa}
                    retValue = await this.GetVentaByExpedienteId(idExpediente);

                    await Log(retValue);
                }
                else
                {
                    throw new Exception("Error: La venta no tiene un estatus definido.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        private async Task EliminarFinanciamiento(m.SCV.Interfaces.IVentaFinanciamiento financiamiento, d.SCV.Interfaces.IVentas ___dao)
        {
            if (financiamiento.FinanciamientoInstituciones != null && financiamiento.FinanciamientoInstituciones.Count > 0)
            {
                foreach (var fi in financiamiento.FinanciamientoInstituciones)
                {
                    if (fi.Conceptos != null && fi.Conceptos.Count > 0)
                    {
                        foreach (var cc in fi.Conceptos)
                        {
                            await ___dao.DeleteVentaInstitucionConcepto((int)cc.ID);
                        }
                    }

                    await ___dao.DeleteVentaInstitucion((int)fi.ID);
                }
            }

            await ___dao.DeleteRelacionFinanciamiento((int)financiamiento.ID);
        }

        public async Task<m.SCV.Interfaces.IVenta> SaveFinanciamiento(m.SCV.Interfaces.IVenta venta, int idVenta, int idVersionventa)
        {
            m.SCV.Interfaces.IVenta retValue = null;

            try
            {
                BeginTransaction(true);
                //
                int idExpediente = venta.IdExpediente;
                var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");
                var ventaDAO = await this.GetDAO(idExpediente);

                var current = await this.GetVentaFinanciamiento(idVenta, idVersionventa, venta.IdExpediente);
                //
                if (current != null) {
                    if (venta.Financiamiento != null)
                    {
                        if (current.ID != venta.Financiamiento.ID)
                        {
                            await this.EliminarFinanciamiento(current, ventaDAO);
                        }
                        else {
                            if (current.FinanciamientoInstituciones != null && current.FinanciamientoInstituciones.Count > 0) {
                                if (venta.Financiamiento.FinanciamientoInstituciones != null && venta.Financiamiento.FinanciamientoInstituciones.Count > 0)
                                {
                                    foreach (var f in current.FinanciamientoInstituciones)
                                    {
                                        m.SCV.Interfaces.IVentaFinanciamientoInstitucion fvFound = null;
                                        foreach (var fv in venta.Financiamiento.FinanciamientoInstituciones)
                                        {
                                            fvFound = f;
                                            //
                                            if (f.ID == fv.ID)
                                            {
                                                fvFound = null;
                                                //
                                                break;
                                            }
                                        }

                                        if (fvFound != null)
                                        {
                                            if (fvFound.Conceptos != null && fvFound.Conceptos.Count > 0)
                                            {
                                                foreach (var cc in fvFound.Conceptos)
                                                {
                                                    await ventaDAO.DeleteVentaInstitucionConcepto((int)cc.ID);
                                                }
                                            }
                                            //
                                            await ventaDAO.DeleteVentaInstitucion((int)fvFound.ID);
                                        }
                                    }
                                }
                                else {
                                    foreach (var f in current.FinanciamientoInstituciones)
                                    {
                                        if (f.Conceptos != null && f.Conceptos.Count > 0)
                                        {
                                            foreach (var cc in f.Conceptos)
                                            {
                                                await ventaDAO.DeleteVentaInstitucionConcepto((int)cc.ID);
                                            }
                                        }
                                        //
                                        await ventaDAO.DeleteVentaInstitucion((int)f.ID);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        await this.EliminarFinanciamiento(current, ventaDAO);
                    }
                }

                if (venta.Financiamiento != null)
                {
                    retValue = await ventaDAO.GetById(idVenta);
                    //
                    var reestructura = retValue.EstatusVenta.Clave == "RE";
                    //
                    if (retValue.EstatusVenta.Clave != "A" || reestructura)
                    {
                        var currentVersion = await this.GetCurrentVersion(retValue.ID ?? 0);
                        //
                        var financiamiento = venta.Financiamiento;
                        if (financiamiento.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            if (financiamiento.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await this.EliminarFinanciamiento(financiamiento, ventaDAO);
                            }
                            else
                            {
                                financiamiento.IdCreadoPor = base.getUserId();
                                financiamiento.Creado = DateTime.UtcNow;
                                financiamiento.IdModificadoPor = base.getUserId();
                                financiamiento.Modificado = DateTime.UtcNow;
                                financiamiento.VentaVersion = currentVersion;
                                financiamiento.IdVentaVersion = currentVersion.ID ?? 0;
                                //
                                var idVentaFinanciamiento = await ventaDAO.SaveFinanciamiento(financiamiento, idVenta, currentVersion.ID ?? 0);
                                //
                                if (financiamiento.FinanciamientoInstituciones != null && financiamiento.FinanciamientoInstituciones.Count > 0)
                                {
                                    foreach (var c in financiamiento.FinanciamientoInstituciones)
                                    {
                                        if (c.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                                        {
                                            if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                            {
                                                if (c.Conceptos != null && c.Conceptos.Count > 0)
                                                {
                                                    foreach (var ci in c.Conceptos)
                                                    {
                                                        await ventaDAO.DeleteVentaInstitucionConcepto((int)ci.ID);
                                                    }
                                                }

                                                await ventaDAO.DeleteVentaInstitucion((int)c.ID);
                                            }
                                            else
                                            {
                                                c.IdCreadoPor = base.getUserId();
                                                c.IdModificadoPor = base.getUserId();
                                                c.IdVenta = idVenta;
                                                c.VentaVersion = currentVersion;
                                                c.IdVentaVersion = (int)currentVersion.ID;
                                                c.IdVentaFinanciamiento = idVentaFinanciamiento;
                                                //
                                                int idVentaFInstitucion = await ventaDAO.SaveVentaFinanciamientoInstitucion(c);
                                                //
                                                if (c.Conceptos != null && c.Conceptos.Count > 0)
                                                {
                                                    foreach (var ci in c.Conceptos)
                                                    {
                                                        if (ci.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                                                        {
                                                            if (ci.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                                            {
                                                                await ventaDAO.DeleteVentaInstitucionConcepto((int)ci.ID);
                                                            }
                                                            else
                                                            {
                                                                ci.IdCreadoPor = base.getUserId();
                                                                ci.IdModificadoPor = base.getUserId();
                                                                ci.Clave = ci.Concepto.Clave;
                                                                ci.Nombre = ci.Concepto.Nombre;
                                                                ci.VentaVersion = currentVersion;
                                                                ci.IdVentaVersion = (int)currentVersion.ID;
                                                                ci.IdVenta = idVenta;
                                                                ci.IdEstatus = (int)estatus.ID;
                                                                ci.IdVentaFInstitucion = idVentaFInstitucion;

                                                                //{convert dd/mm/yyyy to yyyy-MM-dd javascript}
                                                                if (ci.Concepto.TipoConcepto.Clave == "FECHA")
                                                                {
                                                                    if (!string.IsNullOrEmpty(ci.ValorEstimado))
                                                                    {
                                                                        var date = DateTime.Parse(ci.ValorEstimado);
                                                                        ci.ValorEstimado = date.ToString("yyyy-MM-dd");
                                                                    }

                                                                    if (!string.IsNullOrEmpty(ci.ValorAutorizado))
                                                                    {
                                                                        var date = DateTime.Parse(ci.ValorAutorizado);
                                                                        ci.ValorAutorizado = date.ToString("yyyy-MM-dd");
                                                                    }
                                                                }

                                                                await ventaDAO.SaveVentaInstitucionConcepto(ci);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        retValue = await ventaDAO.GetById(idVenta);
                    }
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                //
                throw ex;
            }

            return retValue;
        }

        public override async Task<m.SCV.Interfaces.IVenta> Save(m.SCV.Interfaces.IVenta item)
        {
            var retValue = Get<m.SCV.Interfaces.IVenta>();

            try
            {
                BeginTransaction(true);

                var venta = await this.dao.GetByExpedienteId(item.IdExpediente);
                if (venta.EstatusVenta.Clave == "CO")
                {
                    retValue = await this.SaveCotizacion(item);
                }
                else
                {

                    retValue = await this.SaveVenta(item);
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

        public async Task<m.SCV.Interfaces.IVenta> SavePP(m.SCV.Interfaces.IVenta ventaPlanPago, int IdExpediente, int idPlanPagos, int? save)
        {
            m.SCV.Interfaces.IVenta retValue = null;
            m.SCV.Interfaces.IVentaPP retValuePP = null;

            var PlanPagosPP = Get<m.SCV.Interfaces.IPlanPagosConceptoPago>();
            var ppBO = Get<p.SCV.Interfaces.IPlanesPagos>();
            var daoPP = Get<d.SCV.Interfaces.IPlanesPagos>();
            var DAO = await this.GetDAO(IdExpediente);

            int IdVenta = (int)ventaPlanPago.ID;
            //Obtenemos Informacion de la Venta
            retValue = await DAO.GetById(IdVenta);
            //{consultar estatus de bitacora}
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            try
            {
                if (ventaPlanPago.PlanPagos != null)
                {
                    BeginTransaction();

                    var planPago = ventaPlanPago.PlanPagos;
                    var idPlanVenta = planPago.IdPlanVenta;

                    //Obtenemos Informacion de la Venta
                    planPago.IdModificadoPor = base.getUserId();

                    var reestructura = retValue.EstatusVenta.Clave == "RE";
                    var currentVersion = await this.GetCurrentVersion(retValue.ID ?? 0);

                    retValuePP = await DAO.GetPlanPagos(IdVenta, currentVersion.ID ?? 0);

                    if ((retValue.EstatusVenta.Clave != "A") || reestructura)
                    {
                        if (retValuePP == null)
                        {
                            PlanPagosPP = await daoPP.GetListConceptosPagoById(idPlanPagos);

                            planPago.ID = -1;
                            planPago.IdPlanVenta = idPlanPagos;
                            planPago.Clave = PlanPagosPP.Clave;
                            planPago.Descripcion = PlanPagosPP.Nombre;
                            planPago.Estatus = estatus;
                            planPago.IdEstatus = estatus.ID ?? 0;
                            planPago.IdCreadoPor = PlanPagosPP.IdCreadoPor;
                            planPago.IdModificadoPor = PlanPagosPP.IdModificadoPor;
                            planPago.IdVentaVersion = currentVersion.ID;
                            planPago.VentaVersion = currentVersion;
                        }
                        else
                        {
                            planPago.Estatus = estatus;
                            planPago.IdEstatus = estatus.ID ?? 0;
                            planPago.IdPlanVenta = (int)idPlanVenta;
                            planPago.IdVentaVersion = currentVersion.ID;
                            planPago.VentaVersion = currentVersion;
                        }

                        //Guardamos el Plan de Pagos
                        if (save > 0)
                        {
                            var idVentaPP = await DAO.SavePP(planPago, IdVenta);
                        }

                        m.SCV.Interfaces.IPlanPagos planPagosCatalogo = await ppBO.GetById(planPago.IdPlanVenta);
                        {
                            //TC
                            p.SCV.Interfaces.ITiposCambio tipoCambioBP = base.Get<p.SCV.Interfaces.ITiposCambio>();

                            var tc = await tipoCambioBP.GetTipoCambioAlDia((int)ventaPlanPago.IdMoneda, (int)ventaPlanPago.IdMoneda);

                            //Guardar Conceptos del Plan de Pago de la Venta.
                            if (ventaPlanPago.PlanPagos.Conceptos != null && ventaPlanPago.PlanPagos.Conceptos.Count > 0)
                            {
                                foreach (var c in ventaPlanPago.PlanPagos.Conceptos)
                                {
                                    //{eliminar los conceptos que se removieron del pp}
                                    if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                    {
                                        await DAO.DeleteRelacionConcepto((int)c.ID, IdVenta);
                                    }
                                    else
                                    {
                                        ////Guardamos los Conceptos del PP Nuevo
                                        if (c.ID < 0)
                                        {
                                            ventaPlanPago.TipoCambio = tc;
                                            c.Estatus = estatus;
                                            c.IdEstatus = estatus.ID ?? 0;
                                            c.IdModificadoPor = base.getUserId();
                                            c.IdCreadoPor = base.getUserId();
                                            c.VentaVersion = currentVersion;
                                            c.IdVentaVersion = currentVersion.ID;
                                            c.IdMoneda = ventaPlanPago.IdMoneda;

                                            var idVentaConcepto = await DAO.SavePPConceptos(ventaPlanPago, idPlanVenta, c);

                                            if (c.Documentos != null)
                                            {
                                                foreach (var d in c.Documentos)
                                                {
                                                    //Guardamos los Documentos del PP Nuevo
                                                    d.Estatus = estatus;
                                                    d.IdEstatus = estatus.ID ?? 0;
                                                    d.IdModificadoPor = base.getUserId();
                                                    d.IdCreadoPor = base.getUserId();
                                                    d.IdMoneda = retValue.IdMoneda;

                                                    //Guardamos los Documentos del PP
                                                    var Documentos = await DAO.SavePPDocumentos(ventaPlanPago, d, idVentaConcepto, IdVenta, currentVersion.ID);
                                                }
                                            }
                                         
                                        }
                                        else
                                        {
                                            c.IdModificadoPor = base.getUserId();
                                            c.VentaVersion = currentVersion;
                                            c.IdVentaVersion = currentVersion.ID;

                                            var idVentaConcepto = await DAO.SavePPConceptos(ventaPlanPago, idPlanVenta, c);

                                            //Guardamos los Documentos del PP Existente
                                            foreach (var d in c.Documentos)
                                            {
                                                //Elimina la primera vez los documentos existentes
                                                if ((d.ID) == -1)
                                                {
                                                    var Estatus = retValue.EstatusVenta.Clave == "D" || retValue.EstatusVenta.Clave == "CO";

                                                    if (Estatus == true)
                                                    {
                                                        //Eliminamos Documentos de PP y Conceptos Existentes CJCC
                                                        var DelDocs = await DAO.DeleteRelacionDocumentos((int)c.ID, IdVenta);
                                                    }
                                                }

                                                //Guardamos los Documentos del PP
                                                d.Estatus = estatus;
                                                d.IdEstatus = estatus.ID ?? 0;
                                                d.IdModificadoPor = base.getUserId();
                                                d.IdCreadoPor = base.getUserId();
                                                d.IdMoneda = retValue.IdMoneda;

                                                if (d.EstatusDoc == null)
                                                {
                                                    d.EstatusDoc = d.Status;
                                                }

                                                switch (d.EstatusDoc)
                                                {
                                                    case "CANCELADO":
                                                        d.IdEstatusDoc = 1;
                                                        break;
                                                    case "PAGADO":
                                                        d.IdEstatusDoc = 2;
                                                        break;
                                                    case "POR PAGAR":
                                                        d.IdEstatusDoc = 3;
                                                        break;
                                                    default:
                                                        d.IdEstatusDoc = 0;
                                                        break;
                                                }

                                                //Guardamos los Documentos del PP
                                                var Documentos = await DAO.SavePPDocumentos(ventaPlanPago, d, (int)c.ID, IdVenta, currentVersion.ID);
                                            }
                                        }
                                    }
                                }
                            }



                            //Obtenemos el Expediente actualizado
                            retValue = await DAO.GetById(IdVenta);

                            Commit();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            return retValue;
        }

        public async Task UpdatePP(m.SCV.Interfaces.IVenta venta, int IdExpediente, m.SCV.Interfaces.IVentaPPConcepto Conceptos)
        {
            if (venta != null && venta.PlanPagos != null)
            {
                p.SCV.Interfaces.ICalculoPlanVenta calculoPP = this.factory.GetInstance<p.SCV.Interfaces.ICalculoPlanVenta>();
                await calculoPP.Calcular(venta);
                await this.SavePP(venta, IdExpediente, 0, 1);
            }
        }

        private async Task Log(m.SCV.Interfaces.IVenta obj)
        {
            dynamic entity = new ElasticEntity();

            entity.ID = obj.ID;

            entity.Creado = obj.Creado;
            entity.IdCreadoPor = obj.IdCreadoPor;
            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

            entity.Modificado = obj.Modificado;
            entity.IdModificadoPor = obj.ModificadoPor.ID;
            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

            await this.factory.GetInstance<ILogger>().AddAsync(this.entityName, entity);
        }

        public async Task<List<m.SCV.Interfaces.IVentaUbicacion>> GetUbicacionesById(int idVenta)
        {
            var currentVersion = await this.GetCurrentVersion(idVenta);
            var ubicaciones = await this.dao.GetUbicacionesById(idVenta, currentVersion.ID);
            return ubicaciones;
        }

        public async Task<List<m.SCV.Interfaces.IVentaUbicacion>> GetUbicacionesCotizacionById(int idVenta)
        {
            var dalCotizacion  = Get<d.SCV.Interfaces.ICotizaciones>();
            //
            return await dalCotizacion.GetUbicacionesById(idVenta, 0);
        }

        public async Task<List<m.Kontrol.Interfaces.IKontrolFile>> GetArchivosUbicacion(m.SCV.Interfaces.IVentaUbicacion ubicacion)
        {
            var bpFiles = Get<p.Kontrol.Interfaces.IKontrolFiles>();
            var parametros = new Dictionary<string, object>() {
                { "tipo", "anexos" },
                { "entityType", "prototipos" },
                { "entityId", ubicacion.Ubicacion.Prototipo.ID }
            };

            return await bpFiles.GetAll(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IVentaUbicacion>> GetUbicacionesById(int idVenta, int idVentaVersion, int? idExpediente)
        {
            var DAO = await this.GetDAO(idExpediente);
            var ubicaciones = await DAO.GetUbicacionesById(idVenta, idVentaVersion);
            var caracteristicasBP = base.Get<p.SCV.Interfaces.IUbicaciones>();
            var retValue = new List<object>();

            if (ubicaciones != null && ubicaciones.Count > 0)
            {
                foreach (var u in ubicaciones)
                {
                    u.Caracteristicas = await this.GetCaracteristicasVenta(idVenta, (int)u.ID, idVentaVersion, idExpediente);
                }
            }

            return ubicaciones;
        }

        public async Task<m.SCV.Interfaces.IVenta> UpdateEstatusVenta(int idVenta, string claveEstatus)
        {
            m.SCV.Interfaces.IVenta retValue = null;

            try
            {
                BeginTransaction();

                //{obtenemos la venta por su id}
                var venta = await this.GetById(idVenta);

                //{actualizamos la Version de la Venta a Por Autorizar}
                venta.Modificado = DateTime.UtcNow;
                venta.IdModificadoPor = base.getUserId();
                var EstatusVenta = await this.dao.UpdateEstatusVenta(idVenta, claveEstatus, venta);

                //Regresamos la informacion de la Venta ya con el Estatus Actualizado.
                retValue = await this.GetById(idVenta);

                Commit();
            }
            catch
            {
                Rollback();
                throw;
            }

            return retValue;
        }

        public async Task<List<m.SCV.Interfaces.IVentaCaracteristica>> GetCaracteristicasVenta(int idVenta, int IdVentaUbicacion, int idVentaVersion, int? idExpediente)
        {
            var DAO = await this.GetDAO(idExpediente);
            return await DAO.GetCaracteristicasVenta(idVenta, IdVentaUbicacion, idVentaVersion);
        }
        //Obtenemos los Documentos Cancelados
        public async Task<List<EK.Modelo.Kontrol.Interfaces.IDocumentoPago>> GetDocumentosCancelados(int idVenta, int idConceptopago, int ventaVersion, int idExpediente)
        {
            var currentVersion = await this.GetCurrentVersion(idVenta);

            return await this.dao.GetDocumentosCancelados(idVenta, idConceptopago, currentVersion.VentaVersion, idExpediente);
        }

        public async Task<m.SCV.Interfaces.IVentaCaracteristica> GetEntidadCaracteristica(m.SCV.Interfaces.IVentaCaracteristica item)
        {
            var caracteristicasDAO = Get<d.SCV.Interfaces.ICaracteristicaAdicional>();
            var idEntidadCaracteristica = item.IdEntidadCaracteristica;
            var retValue = Get<m.SCV.Interfaces.IVentaCaracteristica>();
            var caracteristica = await caracteristicasDAO.GetCaracteristicasById((int)idEntidadCaracteristica);

            if (caracteristica != null)
            {
                retValue.ID = item.ID;
                retValue.VentaOpcional = caracteristica.VentaOpcional;
                retValue.Importe = caracteristica.Importe;
                retValue.IdEntidadCaracteristica = caracteristica.ID;
                retValue.TipoEntidad = caracteristica.TipoEntidad;
                retValue.IdEntidad = caracteristica.IdEntidad;
                retValue.Caracteristica = caracteristica.Caracteristica;
                retValue.TipoEntidad = caracteristica.TipoEntidad;
                retValue.IdModificadoPor = base.getUserId();
            }
            return retValue;
        }
        #endregion Public Functions

        #region "Workflow"
        public override async Task<string> GetDescripcion(dynamic obj)
        {
            var idExpediente = Convert.ToInt32(obj.ID);
            var venta = await this.GetByExpedienteId(idExpediente);

            // AUT-VENTA
            var plantilla = await GetPlantilla("AUT-VENTA", venta, null);
            return plantilla.ToString();
        }

        public async Task<p.Kontrol.WorkflowResult> Authorize(int id, m.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var retValue = new p.Kontrol.WorkflowResult();

            try
            {
                BeginTransaction();

                retValue.Success = true;
                retValue.Message = $"Se autorizó la venta #{id}";

                //{obtener la venta por id}
                var venta = await this.GetByExpedienteId(id);
                var bpCliente = Get<p.SCV.Interfaces.IClientes>();
                var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();

                if (instance.Workflow.Clave == "VENTA-INICIO")
                {
                    //{validar que el proceso esté sin ejecutar}                   
                    var ejecutado = await bpSeguimientos.ValidarProceso(venta.IdExpediente, "PROC-CIERRE-VENTA", "E");
                    if (ejecutado == false)
                    {
                        //{obtener el proceso de cierre de venta}
                        var proceso = await bpSeguimientos.getExpedienteProceso(venta.IdExpediente, "PROC-CIERRE-VENTA");

                        //{actualizar estatus del proceso del expediente y ejecutarlo}
                        await bpSeguimientos.UpdateExpedienteProceso(proceso, "E");
                        await bpSeguimientos.EjecutarProceso(proceso, false);

                        //cerrar el proceso cotización del seguimiento e iniciar el proceso de información general
                        await this.SaveVentaProceso(venta.ID.Value, "CI", "FINALIZAR_PROCESO");
                        await this.SaveVentaProceso(venta.ID.Value, "GI", "INICIAR_PROCESO");
                    }

                    //{actualizar el estatus de la venta como autorizada}
                    await this.UpdateEstatusVenta((int)venta.ID, "A");

                    //{actualizar el estatus del cliente, cambia de prospecto a cliente.}
                    var idCliente = venta.Cliente.ID;
                    await bpCliente.UpdateProspecto((int)idCliente, "CLI");

                    //{actualizar el valor autorizado como estimado de los conceptos de credito}
                    await this.UpdateConceptosCredito((int)venta.ID);
                }
                else if (instance.Workflow.Clave == "VENTA-REESTRUCTURA")
                {
                    //{validar si la venta estuvo finiquitada anteriormente}
                    var ejecutado = await bpSeguimientos.ValidarProceso(venta.IdExpediente, "PROC-FINIQUITO", "E");
                    if (ejecutado == true)
                    {
                        //{actualizar nuevamente como venta finiquitada}
                        await this.UpdateEstatusVenta((int)venta.ID, "T");
                    }
                    else
                    {
                        //{flujo default: actualizar venta como autorizada}
                        await this.UpdateEstatusVenta((int)venta.ID, "A");
                    }
                }
                else if (instance.Workflow.Clave == "VENTA-FINIQUITO")
                {
                    //{validar que el proceso esté sin ejecutar}
                    var ejecutado = await bpSeguimientos.ValidarProceso(venta.IdExpediente, "PROC-FINIQUITO", "E");
                    if (ejecutado == false)
                    {
                        //{obtener el proceso finiquito}
                        var proceso = await bpSeguimientos.getExpedienteProceso(venta.IdExpediente, "PROC-FINIQUITO");

                        //{actualizar estatus del proceso del expediente y ejecutarlo}
                        await bpSeguimientos.UpdateExpedienteProceso(proceso, "E");
                        await bpSeguimientos.EjecutarProceso(proceso, false);

                        //cerrar el proceso de finiquito
                        await this.SaveVentaProceso(venta.ID.Value, "FI", "FINALIZAR_PROCESO");
                    }

                    //{actualizar el estatus de la venta como completada}
                    await this.UpdateEstatusVenta((int)venta.ID, "T");
                }
                else if (instance.Workflow.Clave == "VENTA-FINIQUITO-RTRA")
                {
                    //{actualizar la venta como reestructura}
                    await this.UpdateEstatusVenta((int)venta.ID, "RE");

                    //{incrementar la versión de la venta}
                    await this.IncrementVersion((int)venta.ID);
                }



                //{actualizar estatus version}
                await this.UpdateVersion((int)venta.ID, "D");


                /*Registro en bitacora la autorizacion del proceso*/
                var bpBitacora = Get<p.Kontrol.Interfaces.IBitacora>();
                await bpBitacora.SaveBitacora("Aprobación de solicitud de autorización de "+ instance.Workflow.Nombre, "seguimientos", "CATBT-SI-ASA", id, "Expediente", id, null);
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<p.Kontrol.WorkflowResult> Reject(int id, m.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var retValue = new p.Kontrol.WorkflowResult();

            try
            {
                BeginTransaction();

                var venta = await this.GetByExpedienteId(id);

                if (instance.Workflow.Clave == "VENTA-INICIO")
                {
                    //{actualizar el estatus de la venta como draft}
                    await this.UpdateEstatusVenta(venta.ID.Value, "D");

                    //Libera la ubicación de la venta.
                    var ubicacionesDAO = Get<d.SCV.Interfaces.IUbicaciones>();
                    string ubicacionesNoDisponibles = null;

                    var ubicaciones = venta.Ubicaciones;
                    var ubicacionBP = Get<p.SCV.Interfaces.IUbicaciones>();
                    if (ubicaciones != null)
                    {
                        //Si todas las ubicaciones están disponibles, las reserva.
                        if (ubicacionesNoDisponibles == null)
                        {
                            foreach (var u in venta.Ubicaciones)
                            {
                                await ubicacionBP.ActualizaEstatusUbicacion((int)u.Ubicacion.ID, true);
                            }
                        }
                    }
                }
                else if (instance.Workflow.Clave == "VENTA-REESTRUCTURA")
                {
                    //{validar si la venta estuvo finiquitada anteriormente}
                    var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();
                    var ejecutado = await bpSeguimientos.ValidarProceso(venta.IdExpediente, "PROC-FINIQUITO", "E");
                    if (ejecutado == true)
                    {
                        //{actualizar nuevamente como venta finiquitada}
                        await this.UpdateEstatusVenta((int)venta.ID, "T");
                    }
                    else
                    {
                        //{flujo default: actualizar venta como reestructura}
                        await this.UpdateEstatusVenta(venta.ID.Value, "RE");
                    }
                }
                else if (instance.Workflow.Clave == "VENTA-FINIQUITO")
                {
                    //{actualizar el estatus de la venta como finiquito}
                    await this.UpdateEstatusVenta(venta.ID.Value, "F");
                }
                else if (instance.Workflow.Clave == "VENTA-FINIQUITO-RTRA")
                {
                    //{actualizar venta como finiquitada (reversión)
                    await this.UpdateEstatusVenta(venta.ID.Value, "T");
                }





                retValue.Success = true;
                retValue.Message = $"Se rechazó la autorización de la venta #{id}";

                //{actualizar estatus version}
                await this.UpdateVersion(venta.ID.Value, "A");


                /*Registro en bitacora la autorizacion del proceso*/
                var bpBitacora = Get<p.Kontrol.Interfaces.IBitacora>();
                await bpBitacora.SaveBitacora("Rechazo de solicitud de autorización de "+ instance.Workflow.Nombre, "seguimientos", "CATBT-SI-REA", id, "Expediente", id, null);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        #endregion

        #region VERSION_VENTA
        public async Task<m.SCV.Interfaces.IVentaVersion> GetCurrentVersion(int idVenta)
        {
            var retValue = await this.dao.GetVersion(null, idVenta, null, null, true);
            if (retValue == null)
            {
                retValue = Get<m.SCV.Interfaces.IVentaVersion>();
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVentaVersion> GetSpecificVersion(int? id, int? idVenta, int? versionVenta, string estatus, bool? actual)
        {
            int? idEstatusVersion = null;

            if (!String.IsNullOrEmpty(estatus))
            {
                var bpEstatusVersion = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusVersion = await bpEstatusVersion.Get("SCVESTATUSVERSIONVENTA", estatus);
                idEstatusVersion = estatusVersion.ID ?? null;
            }

            var retValue = await this.dao.GetVersion(id, idVenta, versionVenta, idEstatusVersion, actual);
            if (retValue == null)
            {
                retValue = Get<m.SCV.Interfaces.IVentaVersion>();
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVentaVersion> IncrementVersion(int idVenta)
        {
            var retValue = Get<m.SCV.Interfaces.IVentaVersion>();

            try
            {
                BeginTransaction(true);

                //{obtener la ultima versión}
                var latestVersion = await this.GetCurrentVersion(idVenta);
                if (latestVersion == null)
                {
                    latestVersion = Get<m.SCV.Interfaces.IVentaVersion>();
                }

                //consultar los estatus de bitacora
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                //{consultar los estatus de versión de venta}
                var bpEstatusVersion = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusActual = await bpEstatusVersion.Get("SCVESTATUSVERSIONVENTA", "A");

                latestVersion.VentaVersion = latestVersion.VentaVersion + 1;
                latestVersion.FechaInicio = DateTime.UtcNow;
                latestVersion.IdVenta = idVenta;
                latestVersion.EstatusVersion = estatusActual;
                latestVersion.IdEstatusVersion = estatusActual.ID ?? 0;
                latestVersion.Actual = true;
                latestVersion.Estatus = estatus;
                latestVersion.IdEstatus = estatus.ID ?? 0;
                latestVersion.IdCreadoPor = base.getUserId();
                latestVersion.IdModificadoPor = base.getUserId();

                //actualizar la información de la nueva versión
                retValue = await this.SaveVersion(latestVersion);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<List<m.SCV.Interfaces.IReestructuraVenta>> GetEdocuenta(int idVenta, int idConceptopago, int estatus, m.SCV.Interfaces.IVentaPPConcepto concepto, int idExpediente)
        {
            //Listas
            var ListConceptos = new List<m.SCV.Interfaces.IReestructuraVenta>();
            var Conceptos = new List<m.SCV.Interfaces.IReestructuraVenta>();
            m.SCV.Interfaces.IVenta retValue = null;

            retValue = await this.GetByExpedienteId(idExpediente);
            //Reestructura 
            if (estatus == 1)
            {

                if (concepto.Documentos != null)
                {
                    int idConcepto = 0;
                    for (int i = 0; i < retValue.PlanPagos.Conceptos.Count; i++)
                    {
                        if (retValue.PlanPagos.Conceptos[i].ID == concepto.ID)
                        {
                            foreach (var d in retValue.PlanPagos.Conceptos[i].Documentos)
                            {
                                var Docs = this.factory.GetInstance<m.SCV.Interfaces.IReestructuraVenta>();
                                Docs.ID = (d.ID);
                                Docs.Numero = d.Numero;
                                Docs.Importe = d.Importe;
                                Docs.ImporteMoneda = Convert.ToDecimal(d.ImporteMoneda);
                                Docs.Pagado = d.Pagado;
                                Docs.Saldo = Convert.ToDecimal(d.Saldo);
                                Docs.Vencimiento = d.Vencimiento;
                                Docs.Interes = Convert.ToDecimal(d.Interes);
                                Docs.InteresMoneda = d.InteresMoneda;
                                Docs.IdVenta = idVenta;
                                Docs.Capital = d.Capital;
                                Docs.CapitalMoneda = d.CapitalMoneda;
                                Docs.Estado = m.Kontrol.KontrolEstadosEnum.Modificado; //<-- forzar a la ubicación como modificada
                                Docs.ReferenciaCapital = d.ReferenciaCapital;
                                Docs.ReferenciaInteres = d.ReferenciaInteres;
                                if (d.Pagado >= d.CapitalMoneda)
                                {
                                    Docs.Status = "PAGADO";
                                }
                                else
                                {
                                    Docs.Status = "CANCELADO";
                                }
                                Docs.TipoAbono = Get<m.Kontrol.Interfaces.IItemGeneral>();
                                Docs.TipoAbono = d.TipoAbono;

                                ListConceptos.Add(Docs);
                            }

                        }
                    }

                    var Recalcular = await this.RecalcularPlanPagos(retValue, concepto);
                    
                    foreach (var c in concepto.Documentos)
                    {
                        if (c.EstatusDoc != "CANCELADO")
                        {
                            var Docs = this.factory.GetInstance<m.SCV.Interfaces.IReestructuraVenta>();
                            Docs.ID = (--idConcepto);
                            Docs.Numero = c.Numero;
                            Docs.Importe = c.Importe;
                            Docs.ImporteMoneda = Convert.ToDecimal(c.ImporteMoneda);
                            Docs.Pagado = c.Pagado;
                            Docs.Saldo = Convert.ToDecimal(c.Saldo);
                            Docs.Vencimiento = c.Vencimiento;
                            Docs.Interes = Convert.ToDecimal(c.Interes);
                            Docs.InteresMoneda = c.InteresMoneda;
                            Docs.IdVenta = idVenta;
                            Docs.Capital = c.Capital;
                            Docs.CapitalMoneda = c.CapitalMoneda;
                            Docs.Estado = m.Kontrol.KontrolEstadosEnum.Modificado; //<-- forzar a la ubicación como modificada
                            Docs.Status = "POR PAGAR";
                            Docs.TipoAbono = Get<m.Kontrol.Interfaces.IItemGeneral>();
                            Docs.TipoAbono = c.TipoAbono;
                            ListConceptos.Add(Docs);
                        }
                    }
                }
            }
            else
            {
                //Estado de Cuenta
                if (concepto.Documentos != null)
                {
                    int idConcepto = 0;
                    foreach (var c in concepto.Documentos)
                    {
                        var Docs = this.factory.GetInstance<m.SCV.Interfaces.IReestructuraVenta>();
                        Docs.ID = (--idConcepto);
                        Docs.Numero = c.Numero;
                        Docs.Importe = c.Importe;
                        Docs.ImporteMoneda = Convert.ToDecimal(c.ImporteMoneda);
                        Docs.Pagado = c.Pagado;
                        Docs.Saldo = Convert.ToDecimal(c.Saldo);
                        Docs.Vencimiento = c.Vencimiento;
                        Docs.Interes = Convert.ToDecimal(c.Interes);
                        Docs.InteresMoneda = c.InteresMoneda;
                        Docs.IdVenta = idVenta;
                        Docs.Capital = c.Capital;
                        Docs.CapitalMoneda = c.CapitalMoneda;
                        Docs.Estado = m.Kontrol.KontrolEstadosEnum.Modificado; //<-- forzar a la ubicación como modificada
                        Docs.Status = "EDOCUENTA";
                        Docs.TipoAbono = Get<m.Kontrol.Interfaces.IItemGeneral>();
                        Docs.TipoAbono = c.TipoAbono;

                        ListConceptos.Add(Docs);
                    }
                }
            }

            //Recalculo de Conceptos 
            if (estatus == 2)
            {
                if (concepto.Documentos != null)
                {
                    int idConcepto = 0;
                    var Recalcular = await this.RecalcularPlanPagos(retValue, concepto);

                    foreach (var c in concepto.Documentos)
                    {
                        var Docs = this.factory.GetInstance<m.SCV.Interfaces.IReestructuraVenta>();
                        Docs.ID = (--idConcepto);
                        Docs.Numero = c.Numero;
                        Docs.Importe = c.Importe;
                        Docs.ImporteMoneda = Convert.ToDecimal(c.ImporteMoneda);
                        Docs.Pagado = c.Pagado;
                        Docs.Saldo = Convert.ToDecimal(c.Saldo);
                        Docs.Vencimiento = c.Vencimiento;
                        Docs.Interes = Convert.ToDecimal(c.Interes);
                        Docs.InteresMoneda = c.InteresMoneda;
                        Docs.IdVenta = idVenta;
                        Docs.Capital = c.Capital;
                        Docs.CapitalMoneda = c.CapitalMoneda;
                        Docs.Estado = m.Kontrol.KontrolEstadosEnum.Modificado; //<-- forzar a la ubicación como modificada
                        Docs.Status = "POR PAGAR";
                        Docs.TipoAbono = Get<m.Kontrol.Interfaces.IItemGeneral>();
                        Docs.TipoAbono = c.TipoAbono;

                        Conceptos.Add(Docs);
                    }
                }
            }

            if (estatus == 2)
            {
                return Conceptos;
            }
            else
            {
                return ListConceptos;
            }
        }

        public async Task<m.SCV.Interfaces.IVentaVersion> SaveVersion(m.SCV.Interfaces.IVentaVersion model)
        {
            var retValue = Get<m.SCV.Interfaces.IVentaVersion>();
            try
            {
                BeginTransaction();

                int id = await this.dao.SaveVersion(model);
                retValue = await this.dao.GetVersion(id, null, null, null, null);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVentaVersion> UpdateVersion(int idVenta, string claveEstatus)
        {
            var retValue = Get<m.SCV.Interfaces.IVentaVersion>();
            try
            {
                //{consultar el estatus version venta}
                var bpEstatusVersion = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusVersion = await bpEstatusVersion.Get("SCVESTATUSVERSIONVENTA", claveEstatus);

                //{obtener versión actual de la venta para actualizarla}
                var currentVersion = await this.GetCurrentVersion(idVenta);
                currentVersion.EstatusVersion = estatusVersion;
                currentVersion.IdEstatusVersion = estatusVersion.ID;
                currentVersion.Creado = DateTime.UtcNow;
                currentVersion.IdCreadoPor = this.getUserId();
                currentVersion.Modificado = DateTime.UtcNow;
                currentVersion.IdModificadoPor = this.getUserId();

                //{actualizar la version con el nuevo estatus}
                retValue = await this.SaveVersion(currentVersion);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        #endregion

        #region AUTHORIZE_VENTA
        public async Task<bool> IsAllowedToEdit(int id)
        {
            bool retValue = true;

            //{consultar venta}
            var venta = await this.GetById(id);

            var bpUsuario = Get<p.Kontrol.Interfaces.IUsuario>();
            var bpEstatusProceso = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            //{consultar clasificador para cotizacion}
            if (venta.EstatusVenta.Clave == "CO")
            {
                //{consultar clasificador para cotización}
                var estatusCotizacion = await bpEstatusProceso.Get("PROCESOSVENTA", "CI");
                retValue = await bpUsuario.CheckClasificador(base.getUserId(), "PROCESOSVENTA", estatusCotizacion.ID);
            }

            //{consultar clasificador para cierre-venta}
            if (venta.EstatusVenta.Clave == "D")
            {
                //{consultar el proceso cierre-Venta}
                var estatusCierre = await bpEstatusProceso.Get("PROCESOSVENTA", "GI");
                retValue = await bpUsuario.CheckClasificador(base.getUserId(), "PROCESOSVENTA", estatusCierre.ID);
            }

            //{consultar clasificador para reestructura}
            if (venta.EstatusVenta.Clave == "RE")
            {
                //{consultar el proceso reestructura}
                var estatusRee = await bpEstatusProceso.Get("PROCESOSVENTA", "GI");
                retValue = await bpUsuario.CheckClasificador(base.getUserId(), "PROCESOSVENTA", estatusRee.ID);
            }

            //{consultar clasificador para finiquito}
            if (venta.EstatusVenta.Clave == "F")
            {
                //{consultar el proceso finiquito}
                var estatusFi = await bpEstatusProceso.Get("PROCESOSVENTA", "FI");
                retValue = await bpUsuario.CheckClasificador(base.getUserId(), "PROCESOSVENTA", estatusFi.ID);
            }

            //{verificar estatus pendiente por autorizar}
            if (venta.EstatusVenta.Clave == "P")
            {
                retValue = false;
            }

            //{verificar estatus autorizado}
            if (venta.EstatusVenta.Clave == "A")
            {
                retValue = false;
            }

            //{verificar estatus completado}
            if (venta.EstatusVenta.Clave == "T")
            {
                retValue = false;
            }

            return retValue;
        }

        public async Task<object> IsAllowedToAuthorize(int idExpediente)
        {
            //retorno de permiso para activar autorizacion
            dynamic retValue = new ElasticEntity();
            retValue.Allowed = false;

            //Obtenemos Informacion de la Venta
            var venta = await this.GetByExpedienteId(idExpediente);

            //Validar que la venta no sea cotización
            if (venta.EstatusVenta.Clave == "CO")
            {
                return retValue;
            }

            //{validar que la venta tenga ubicaciones}
            if (venta.Ubicaciones.Count <= 0)
            {
                return retValue;
            }

            //{validar que la venta tenga plan de pagos}
            if (venta.PlanPagos.IdPlanVenta <= 0)
            {
                return retValue;
            }

            //{consultar el estatus de venta Draft}
            var bpEstatusVenta = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatusDraft = await bpEstatusVenta.Get("ESTATUSVENTA", "D");
            var estatusReestructura = await bpEstatusVenta.Get("ESTATUSVENTA", "RE");
            var estatusFiniquito = await bpEstatusVenta.Get("ESTATUSVENTA", "F");

            //{validar que la venta se encuentre en estatus draft para mandar autorizar}
            if (venta.EstatusVenta.ID == estatusDraft.ID)
            {
                //si el proceso está iniciado entonces se podrá autorizar la venta
                var bpSeguimiento = Get<p.SCV.Interfaces.ISeguimientos>();
                var resultado = await bpSeguimiento.ValidarProceso(idExpediente, "PROC-CIERRE-VENTA", "B");
                if (resultado)
                {
                    retValue.Allowed = true;
                }
            }
            //{validar que la venta se encuentre en estatus reestructura para mandar autorizar}
            if (venta.EstatusVenta.ID == estatusReestructura.ID)
            {
                retValue.Allowed = true;
            }
            //{validar que la venta se encuentre en estatus finiquito para mandar autorizar}
            if (venta.EstatusVenta.ID == estatusFiniquito.ID)
            {
                //pendiente agregar la validación de capital de ubicacion vs saldo total
                retValue.Allowed = true;
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVenta> RequestAuthorize(int idVenta, int idExpediente)
        {
            var retValue = Get<m.SCV.Interfaces.IVenta>();

            try
            {
                BeginTransaction(true);

                //{consultar la venta del expediente}
                var venta = await this.GetByExpedienteId(idExpediente);

                var daoexpediente = Get<d.SCV.Interfaces.IExpedientes>();
                var expediente = await daoexpediente.GetById(idExpediente);


                var idUsuario = base.getUserId();

                var ubicacionesDAO = Get<d.SCV.Interfaces.IUbicaciones>();
                m.SCV.Interfaces.IUbicaciones retUbicacion = null;
                string ubicacionesNoDisponibles = null;

                if (venta.EstatusVenta.Clave == "D")
                {

                    var ubicaciones = venta.Ubicaciones;
                    var ubicacionBP = Get<p.SCV.Interfaces.IUbicaciones>();
                    if (ubicaciones != null)
                    {
                        foreach (var u in venta.Ubicaciones)
                        {
                            //Verifica si las ubicaciones están disponibles.
                            retUbicacion = await ubicacionesDAO.GetById((int)u.Ubicacion.ID);
                            if (retUbicacion.IdEstatusUbicacion == false)
                            {
                                ubicacionesNoDisponibles = ubicacionesNoDisponibles + retUbicacion.Nombre + ", ";

                            }
                        }
                        //Si todas las ubicaciones están disponibles, las reserva.
                        if (ubicacionesNoDisponibles == null)
                        {
                            foreach (var u in venta.Ubicaciones)
                            {
                                await ubicacionBP.ActualizaEstatusUbicacion((int)u.Ubicacion.ID, false);
                            }
                            //{determinar el flujo de trabajo a iniciar}
                            await StartWorkflow("VENTA-INICIO", expediente, idUsuario);
                        }
                    }
                }

                if (ubicacionesNoDisponibles == null)
                {
                    //{actualizar el estatus de la venta como pendiente por Autorizar}
                    await this.UpdateEstatusVenta(idVenta, "P");

                    //{actualizar el estatus de la version}
                    await this.UpdateVersion(idVenta, "B");


                    if (venta.EstatusVenta.Clave == "RE")
                    {
                        await StartWorkflow("VENTA-REESTRUCTURA", expediente, idUsuario);
                    }
                    else if (venta.EstatusVenta.Clave == "F")
                    {
                        await StartWorkflow("VENTA-FINIQUITO", expediente, idUsuario);
                    }

                }
                else
                {
                    base.SetReturnInfo(1, "No se puede solicitar autorización, existen ubicaciones no disponibles: " + ubicacionesNoDisponibles, 1);

                }
                //{retornar la venta por expediente}
                retValue = await this.GetVentaByExpedienteId(idExpediente);
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVenta> StartFiniquito(int idVenta, int idExpediente)
        {
            var retValue = Get<m.SCV.Interfaces.IVenta>();

            try
            {
                BeginTransaction(true);

                //{actualizar la venta con estatus finiquito}
                retValue = await this.UpdateEstatusVenta(idVenta, "F");

                //cerrar el proceso información general e iniciar el proceso de finiquito
                await this.SaveVentaProceso(idVenta, "GI", "FINALIZAR_PROCESO");
                await this.SaveVentaProceso(idVenta, "FI", "INICIAR_PROCESO");

                //{incrementar la versión de la venta}
                await this.IncrementVersion(idVenta);




                /*Recalcular plan pagos*/

                var daoPP = Get<d.SCV.Interfaces.IVentas>();

                var ventaC = await GetEntidadByExpedienteId(idExpediente);

                var conceptosFiniquito = ventaC.PlanPagos.Conceptos.Where(x => x.Finiquito == true);

                if (conceptosFiniquito != null && conceptosFiniquito.Count() > 0)
                {
                    var result = await this.RecalcularPlanPagos(ventaC, null);

                    foreach (var item in result.Conceptos)
                    {
                        var idVentaConcepto = await daoPP.SavePPConceptos(ventaC, result.IdPlanVenta, item);
                    }
                }



                //{retornar la venta por expediente}
                retValue = await this.GetVentaByExpedienteId(idExpediente);
                Commit();
            }
            catch
            {
                Rollback();
                throw;
            }

            return retValue;
        }

        public async Task<object> IsAllowedToReestructura(int idExpediente)
        {
            //{estructura de retorno a ReactJS}
            dynamic retValue = new ElasticEntity();
            retValue.Allowed = false;

            //{obtener la venta por el expediente}
            var venta = await this.dao.GetByExpedienteId(idExpediente);

            //{validar reestructura de una venta o una venta finiquitada}
            var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();
            var ejecutado = await bpSeguimientos.ValidarProceso(idExpediente, "PROC-FINIQUITO", "E");
            if (ejecutado == true)
            {
                //{validar si la venta está finiquitada}
                if (venta.EstatusVenta.Clave == "T")
                {
                    var currentVersion = await this.GetCurrentVersion((int)venta.ID);
                    bool saldoPendiente = false;

                    //{si existe un documento por pagar la venta se podría reestructurar}
                    var planPagos = await this.GetPlanDeVenta((int)venta.ID, currentVersion.ID ?? 0, idExpediente);
                    if (planPagos != null)
                    {
                        foreach (var c in planPagos.Conceptos)
                        {
                            foreach (var d in c.Documentos)
                            {
                                if (d.EstatusDoc == "POR PAGAR")
                                {
                                    saldoPendiente = true;
                                    break;
                                }
                            }

                            if (saldoPendiente == true)
                            {
                                retValue.Allowed = true;
                                break;
                            }
                        }
                    }
                }
            }
            else
            {
                //{validar que la venta esté autorizada para poder reestructurar}
                if (venta.EstatusVenta.Clave == "A")
                {
                    retValue.Allowed = true;
                }
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVenta> StartReestructura(int idVenta, int idExpediente)
        {
            var retValue = Get<m.SCV.Interfaces.IVenta>();

            try
            {
                BeginTransaction(true);

                //{consultar venta por id}
                var venta = await this.dao.GetById(idVenta);

                //{si se reestructura una venta finiquitada hay que solicitar autorización}
                if (venta.EstatusVenta.Clave == "T")
                {
                    var expedienteBP = Get<p.SCV.Interfaces.IExpedientes>();
                    var expediente = await expedienteBP.GetByCatalogo(idExpediente);

                    //{actualizar el estatus de la venta como pendiente por autorizar}
                    await this.UpdateEstatusVenta(idVenta, "P");



                    //{actualizar el estatus de la version}
                    await this.UpdateVersion(idVenta, "B");


                   

                    await base.StartWorkflow("VENTA-FINIQUITO-RTRA", expediente, base.getUserId());

                }
                else
                {
                    //{actualizar la venta como reestructura}
                    await this.UpdateEstatusVenta(idVenta, "RE");

                    //{incrementar la versión de la venta}
                    await this.IncrementVersion(idVenta);
                }

                /*Recalcular plan pagos*/

                var daoPP = Get<d.SCV.Interfaces.IVentas>();

                var ventaC = await GetEntidadByExpedienteId(idExpediente);
                var result = await this.RecalcularPlanPagos(ventaC, null);

                var conceptosReestructura = ventaC.PlanPagos.Conceptos.Where(x => x.Reestructura == true);

                if (conceptosReestructura != null && conceptosReestructura.Count() > 0)
                {
                    foreach (var item in result.Conceptos)
                    {
                        var idVentaConcepto = await daoPP.SavePPConceptos(ventaC, result.IdPlanVenta, item);
                    }
                }

                //{retornar la venta por expediente}
                retValue = await this.GetVentaByExpedienteId(idExpediente);

                Commit();
            }
            catch
            {
                Rollback();
                throw;
            }

            return retValue;
        }
        #endregion

        #region VENTA_PROCESOS
        public async Task<m.SCV.Interfaces.IVenta> CreateProcesos(int idVenta)
        {
            //{consultar el estatus de registros}
            var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            //{consultar el estatus pendiente para los nuevos proceso}
            var bpEstatusProceso = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatusProceso = await bpEstatusProceso.Get("ESTATUSVENTAPROCESOS", "P");

            //{consultar los procesos de la venta}
            var bpProcesosVenta = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var procesosVenta = await bpProcesosVenta.GetByCatalogo("PROCESOSVENTA");
            if (procesosVenta != null)
            {
                foreach (m.Kontrol.Interfaces.IItemGeneralValores p in procesosVenta)
                {
                    var newProceso = Get<m.SCV.Interfaces.IVentaProceso>();
                    newProceso.IdVenta = idVenta;
                    newProceso.IdVentaProceso = p.ID ?? 0;
                    newProceso.FechaInicio = null;
                    newProceso.FechaFin = null;
                    newProceso.IdEstatusProceso = estatusProceso.ID ?? 0;
                    newProceso.IdEstatus = estatus.ID ?? 0;
                    newProceso.IdCreadoPor = base.getUserId();
                    newProceso.IdModificadoPor = base.getUserId();
                    newProceso.Creado = DateTime.UtcNow;
                    newProceso.Modificado = DateTime.UtcNow;
                    await this.dao.SaveVentaProceso(newProceso, null);
                }
            }

            return await this.GetById(idVenta);
        }

        public async Task<m.SCV.Interfaces.IVentaProceso> SaveVentaProceso(int idVenta, string claveProceso, string operacion)
        {
            var retValue = Get<m.SCV.Interfaces.IVentaProceso>();
            try
            {
                //{consultar información del proceso original}
                var bpProceso = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var proceso = await bpProceso.Get("PROCESOSVENTA", claveProceso);

                //{consultar el proceso de la venta}
                var procesoVenta = await this.dao.GetVentaProceso(idVenta, proceso.ID.Value);
                int id = await this.dao.SaveVentaProceso(procesoVenta, operacion);

                //{consultar el proceso actualizado de la venta}
                retValue = await this.dao.GetVentaProceso(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVentaProceso> GetProcesoActivo(int idVenta)
        {
            var retValue = await this.dao.GetVentaProceso(idVenta, "GET_PROCESO_ACTIVO");
            if (retValue == null)
            {
                //{consultar información del proceso original}
                var bpProceso = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var proceso = await bpProceso.Get("PROCESOSVENTA", "FI");

                //{consultar el proceso de la venta}
                retValue = await this.dao.GetVentaProceso(idVenta, proceso.ID.Value);
                if (retValue == null)
                {
                    retValue = Get<m.SCV.Interfaces.IVentaProceso>();
                }
            }
            return retValue;
        }

        #endregion

        #region COTIZACIONES
        public async Task<string> ImprimirCotizacion(int idCotizacion, int idExpediente)
        {
            try
            {
                var bpVentas = Get<p.SCV.Interfaces.IVentas>();
                var bpSeguimiento = Get<p.SCV.Interfaces.ISeguimientos>();
                //
                dynamic expando = new ExpandoObject();
                //
                var propuesta = await bpVentas.GetCotizacionById(idCotizacion);
                var agente = await bpSeguimiento.GetAgenteSeguimientoActivo(idExpediente);
                expando.Propuesta = propuesta;
                expando.Asesor = agente;
                //
                var daoMonedas = Get<d.Kontrol.Interfaces.IMonedas>();
                m.Kontrol.Interfaces.IMoneda moneda = await daoMonedas.GetById((int)propuesta.Desarrollo.IdMoneda);
                //
                dynamic result = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                var plantillaDocumento = await this.GetPlantilla("COT-VEN", result, null, moneda);
                //var documento = plantillaDocumento.GetDocument(false);
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
                string error = ex.ToString();
                throw;
            }
        }

        public async Task<bool> EnviarCotizacion(Dictionary<string,object> parametros)
        {
            try
            {
                object expedienteId = string.Empty;
                object cotizacionId = string.Empty;

                parametros.TryGetValue("idCotizacion", out cotizacionId);
                parametros.TryGetValue("idExpediente", out expedienteId);

                int idExpediente = Convert.ToInt32(expedienteId);
                int idCotizacion = Convert.ToInt32(cotizacionId);

                var bpVentas = Get<p.SCV.Interfaces.IVentas>();
                var bpSeguimiento = Get<p.SCV.Interfaces.ISeguimientos>();
                var daoClienteContacto = Get<d.SCV.Interfaces.IClienteContacto>();

                dynamic expando = new ExpandoObject();
                var propuesta = await bpVentas.GetCotizacionById(idCotizacion);
                var agente = await bpSeguimiento.GetAgenteSeguimientoActivo(idExpediente);
                expando.Propuesta = propuesta;
                expando.Asesor = agente;

                var daoMonedas = Get<d.Kontrol.Interfaces.IMonedas>();
                m.Kontrol.Interfaces.IMoneda moneda = await daoMonedas.GetById((int)propuesta.Desarrollo.IdMoneda);

                dynamic result = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));

                var plantillaDocumento = await this.GetPlantilla("COT-VEN", result, null,moneda);

                var documento = plantillaDocumento.GetDocument(false, plantillaDocumento, result, factory, moneda);

                dynamic obj = new ExpandoObject();
                obj.Cliente = propuesta.Cliente;
                obj.Desarrollo = propuesta.Desarrollo;
                obj.Agente = agente;

                /*Obteniendo Correo Principal del cliente*/
                var correoClienteObject = await daoClienteContacto.ObtenerContactoPrincipal(propuesta.Cliente.ID.Value, "CORREO");
                string correoCliente = correoClienteObject != null ? correoClienteObject.Contacto : "";

                var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();
                String[] to = { correoCliente }; //propuesta.Cliente.Email
                String[] cc = { agente.Usuario.Email };
                EK.Drivers.Common.IKontrolFiles[] documents = { documento };
                var a = bpClientEmail.GetType();

                var plantilla = await this.GetPlantilla("COT-VENT-CORREO", obj);

                bpClientEmail.SendMessage(to, cc, plantilla.Titulo, plantilla.Plantilla_Contenido, documents, true);


                await LogEvent(idExpediente, "expedientes", 1053, "Se ha enviado una cotizacion"); 
                await LogEvent(propuesta.Cliente.ID.Value, "scvclientes", 1053, "Se ha enviado una cotizacion");

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public async Task<d.SCV.Interfaces.IVentas> GetDAO(int? idExpediente)
        {
            d.SCV.Interfaces.IVentas retValue = null;
            var ventasDAO = Get<d.SCV.Interfaces.IVentas>();

            //{consultar venta por id}
            var venta = await ventasDAO.GetByExpedienteId(idExpediente.Value);
            if (venta != null)
            {
                //{si la venta está en cotizacion, se retorna el DAO de Cotizaciones}
                if (venta.EstatusVenta.Clave == "CO")
                {
                    retValue = Get<d.SCV.Interfaces.ICotizaciones>();
                }
                else
                {
                    //{se retorna el DAO de Ventas}
                    retValue = Get<d.SCV.Interfaces.IVentas>();
                }
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVenta> GetCotizacionById(int id)
        {
            var daoCT = Get<d.SCV.Interfaces.ICotizaciones>();
            var bpCAR = Get<p.SCV.Interfaces.IUbicaciones>();
            var bpDE = Get<p.SCV.Interfaces.IDesarrollos>();
            var bpLP = Get<p.SCV.Interfaces.IListaPrecios>();

            //{consultar la cotizacion por id}
            var retValue = await daoCT.GetById(id);

            //{obtener plan de pagos de la cotización}
            var planPagos = await daoCT.GetPlanPagos(id, 0);
            if (planPagos != null)
            {
                planPagos.Conceptos = await daoCT.GetConceptosPP(id, 0, "A");

                if (planPagos.Conceptos != null && planPagos.Conceptos.Count > 0)
                {
                    foreach (var c in planPagos.Conceptos)
                    {
                        c.Documentos = await daoCT.GetDocumentosPP((int)c.ID, 0);
                    }
                }
                else
                {
                    planPagos.Conceptos = await daoCT.GetConceptosPagoById(planPagos.IdPlanVenta);

                    if (planPagos.Conceptos != null && planPagos.Conceptos.Count > 0)
                    {
                        foreach (var c in planPagos.Conceptos)
                        {
                            c.Documentos = await daoCT.GetDocumentosPP((int)c.ID, 0);
                        }
                    }
                }
            }

            //{obtener financiamiento de la cotización}
            var financiamiento = await daoCT.GetVentaFinanciamiento(id, 0);
            if (financiamiento != null)
            {
                financiamiento.FinanciamientoInstituciones = await daoCT.GetVentaFinanciamientoInstituciones(id, 0);
                if (financiamiento.FinanciamientoInstituciones != null)
                {
                    foreach (var fi in financiamiento.FinanciamientoInstituciones)
                    {
                        fi.Conceptos = await daoCT.GetVentaInstitucionConceptos(id, (int)fi.ID, 0);
                        foreach (var item in fi.Conceptos)
                        {
                            if (item.Concepto.TipoConcepto.Clave == "IMP")
                            {
                                item.Valor = item.ValorEstimado;
                            }
                            else if(item.Concepto.TipoConcepto.Clave == "LIS")
                            {
                                string valorEstimado = ((Newtonsoft.Json.Linq.JObject)Newtonsoft.Json.JsonConvert.DeserializeObject(item.ValorEstimado))["Nombre"].ToString();
                                item.Valor= valorEstimado;
                            }
                        }
                    }
                }
            }

            //{obtener ubicaciones de la cotización}
            var ubicaciones = await daoCT.GetUbicacionesById(id, 0);
            if (ubicaciones != null && ubicaciones.Count > 0)
            {
                foreach (var u in ubicaciones)
                {
                    u.Caracteristicas = await daoCT.GetCaracteristicasVenta(id, (int)u.ID, 0);

                    foreach (var item in u.Caracteristicas)
                    {
                        item.Tipo = item.VentaOpcional ? "Incluida" : "Adicional";
                        if (!item.VentaOpcional)
                        {
                            item.ImporteCaracteristica = item.Importe;
                        }
                    }

                    //{tomar desarrollo de la ubicacion y esquema de la venta
                    int idDesarrollo = u.Ubicacion.Desarrollo.ID ?? 0;
                    int idFinanciamiento = financiamiento != null ? (financiamiento.Financiamiento.ID ?? 0) : 0;

                    //{consultar desarrollo-esquema para obtener caracteristicas obligatorias}                 
                    var desarrolloFinanciamiento = await bpDE.GetDesarrolloFinanciamiento(idDesarrollo, idFinanciamiento);

                    //{consultar precio de lista, con las caracteristicas adicionales}
                    var lp = await bpLP.GetByUbicacion((int)u.Ubicacion.ID, (int)desarrolloFinanciamiento.ID, u.Caracteristicas, retValue.IdExpediente);
                    if (lp == null || lp.ID==-1)
                    {
                       // base.SetReturnInfo(1, "La ubicación no cuenta con Precio Vigente en la lista de precios, verificar.", 1);
                        u.ImporteUbicacion = 0;
                    }
                    else
                    {
                        u.ImporteUbicacion = lp.ValorUbicacion;
                        u.ValorAvaluo = lp.ValorAvaluo ?? 0;
                        u.ValorExcedente=(lp.Ubicacion.Excedente * lp.Ubicacion.Desarrollo.PrecioExcedenteM2);
                        u.PrecioExcedente = lp.Ubicacion.Desarrollo.PrecioExcedenteM2;  
                    }

                    //{obtener los archivos de mapa de la ubicación iterada}
                    u.Archivos = await this.GetArchivosUbicacion(u);
                }
            }
            if (planPagos != null)
            {
                retValue.PlanPagos = planPagos;

            }
            if (financiamiento != null)
            {
                retValue.Financiamiento = financiamiento;
            }
            if (ubicaciones != null && ubicaciones.Count>0)
            {
                retValue.Ubicaciones = ubicaciones;
            }

            return retValue;
        }

        public async Task<m.SCV.Interfaces.IVenta> GetCotizacionSeleccionada(int idExpediente)
        {
            var retValue = Get<m.SCV.Interfaces.IVenta>();
            try
            {
                //{consultar el estatus seleccionada}
                var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUSCOTIZACION", "SE");

                //{consultar la cotizacion seleccionada del expediente}
                var cotizaciones = await this.GetCotizaciones(idExpediente);
                var seleccionada = cotizaciones.FirstOrDefault(c => c.IdEstatusVenta == estatus.ID);
                if (seleccionada != null)
                {
                    retValue = await this.GetCotizacionById((int)seleccionada.ID);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<List<m.SCV.Interfaces.IVenta>> GetCotizaciones(int idExpediente)
        {
            var cotizacionesDAO = Get<d.SCV.Interfaces.ICotizaciones>();
            var parametros = new Dictionary<string, object>() { { "IdExpediente", idExpediente } };

            return await cotizacionesDAO.GetAll(parametros);
        }

        public async Task<m.SCV.Interfaces.IVenta> SetCotizacion(m.SCV.Interfaces.IVenta item, int idExpediente, List<m.SCV.Interfaces.IVenta> cotizaciones)
        {
            //var retValue = await this.GetCotizacionById(item.ID ?? 0, idExpediente);
            var retValue = await this.GetCurrentCotizacion((int)item.ID, idExpediente);

            retValue.TipoComercializacion = retValue.Expediente.TipoComercializacion;
            retValue.Fase = retValue.Expediente.Fase;
            retValue.Etapa = retValue.Expediente.Etapa;
            retValue.Proceso = retValue.VentaProceso.VentaProceso;

            //{actualizar el item dentro de la sección de cotizaciones}
            if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
            {
                int index = cotizaciones.FindIndex(co => co.ID == item.ID);
                if (index != -1)
                {
                    item.IdExpediente = retValue.IdExpediente;
                    item.IdDesarrollo = retValue.IdDesarrollo;
                    item.Desarrollo = retValue.Desarrollo;
                    item.IdEstatusVenta = retValue.IdEstatusVenta;
                    item.EstatusVenta = retValue.EstatusVenta;
                    item.IdEstatus = retValue.IdEstatus;
                    item.Estatus = retValue.Estatus;
                    item.Importe = retValue.Importe;
                    item.ImporteMoneda = retValue.ImporteMoneda;
                    cotizaciones[index] = item;
                }
            }

            retValue.Cotizaciones = cotizaciones;

            return retValue;
        }

        //public async Task<m.SCV.Interfaces.IVenta> GetCotizacionById(int idCotizacion, int idExpediente)
        public async Task<m.SCV.Interfaces.IVenta> GetCurrentCotizacion(int idCotizacion, int idExpediente)
        {
            var retValue = Get<m.SCV.Interfaces.IVenta>();
            var bpExpediente = Get<p.SCV.Interfaces.IExpedientes>();
            var cotizacionesDAO = Get<d.SCV.Interfaces.ICotizaciones>();

            try
            {
                //{obtener la cotización por id}
                retValue = await cotizacionesDAO.GetById(idCotizacion);

                //{consultar venta del expediente}
                var venta = await this.GetByExpedienteId(idExpediente);

                //{inicializar la cotización si es null con datos de venta}
                if (retValue == null)
                {
                    retValue = Get<m.SCV.Interfaces.IVenta>();
                    retValue.IdExpediente = idExpediente;
                    retValue.IdDesarrollo = venta.IdDesarrollo;
                    retValue.Desarrollo = venta.Desarrollo;
                    retValue.IdMoneda = venta.Desarrollo.IdMoneda;
                    retValue.Moneda = venta.Desarrollo.Moneda;
                    retValue.IdCliente = venta.IdCliente;
                    retValue.Cliente = venta.Cliente;
                    retValue.IdAgente = venta.Agente.ID;
                    retValue.Agente = venta.Agente;
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

                    var bpEstatusCotizacion = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var estatusCotizacion = await bpEstatusCotizacion.Get("ESTATUSCOTIZACION", "CO");

                    retValue.IdEstatusVenta = estatusCotizacion.ID ?? 0;
                    retValue.EstatusVenta = estatusCotizacion;

                    var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var estatus = await bpEstatus.Get("ESTATUS", "A");

                    retValue.IdEstatus = estatus.ID ?? 0;
                    retValue.Estatus = estatus;
                }

                //{obtener el plan de pagos y esquema de la cotización}
                retValue.PlanPagos = await this.GetPlanDeVenta((int)retValue.ID, 0, idExpediente);
                retValue.Financiamiento = await this.GetVentaFinanciamiento((int)retValue.ID, 0, idExpediente);

                //{obtener las ubicaciones de la cotización}
                var ubicaciones = await this.GetUbicacionesById((int)retValue.ID, 0, idExpediente);
                var newUbicaciones = new List<m.SCV.Interfaces.IVentaUbicacion>();
                if (ubicaciones != null && ubicaciones.Count > 0)
                {
                    foreach (var u in ubicaciones)
                    {
                        //{tomar desarrollo de la ubicacion y esquema de la venta
                        int idDesarrollo = u.Ubicacion.Desarrollo.ID ?? 0;
                        int idFinanciamiento = retValue.Financiamiento != null ? (retValue.Financiamiento.Financiamiento.ID ?? 0) : 0;

                        //{consultar desarrollo-esquema para obtener caracteristicas obligatorias}
                        var bpDE = Get<p.SCV.Interfaces.IDesarrollos>();
                        var desarrolloFinanciamiento = await bpDE.GetDesarrolloFinanciamiento(idDesarrollo, idFinanciamiento);

                        //{consultar precio de lista, con las caracteristicas adicionales}
                        var bpListaPrecios = this.factory.GetInstance<p.SCV.Interfaces.IListaPrecios>();
                        var lp = await bpListaPrecios.GetByUbicacion(u.Ubicacion.ID.Value, desarrolloFinanciamiento.ID.Value, u.Caracteristicas, idExpediente);
                        if (lp == null || lp.ID == -1)
                        {
                            //base.SetReturnInfo(1, "La ubicación no cuenta con Precio Vigente en la lista de precios, verificar.", 1);
                            u.ImporteUbicacion = 0;
                        }
                        else
                        {
                            u.ImporteUbicacion = lp.ValorUbicacion;
                            u.ValorAvaluo = lp.ValorAvaluo ?? 0;
                            u.ValorExcedente = (lp.Ubicacion.Excedente * lp.Ubicacion.Desarrollo.PrecioExcedenteM2);
                            u.PrecioExcedente = lp.Ubicacion.Desarrollo.PrecioExcedenteM2;
                        }
                        u.Archivos = await this.GetArchivosUbicacion(u);
                        newUbicaciones.Add(u);
                    }
                }

                retValue.Ubicaciones = newUbicaciones;
                retValue.ReadOnlyKontrol = await this.IsAllowedToEdit((int)venta.ID);
                retValue.AllowToCotizar = await this.IsAllowedToCotizar(idExpediente);
                retValue.Expediente = await bpExpediente.GetByCatalogo(idExpediente);
                retValue.VentaProceso = await this.GetProcesoActivo((int)venta.ID);
                retValue.Cotizaciones = await this.GetCotizaciones(idExpediente);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<bool> IsAllowedToCotizar(int idExpediente)
        {
            //{estructura de retorno a ReactJS}
            bool retValue = false;

            //{validar que el proceso de cotización esté iniciado para realizar cotizaciones}
            var bpSeguimiento = Get<p.SCV.Interfaces.ISeguimientos>();
            retValue = await bpSeguimiento.ValidarProceso(idExpediente, "PROC-COTIZACION", "B");

            return retValue;
        }

        public async Task<object> IsAllowedToFiniquito(int idExpediente)
        {
            //{estructura de retorno a ReactJS}
            dynamic retValue = new ElasticEntity();
            retValue.Allowed = false;

            //{validar que la venta no esté en finiquito ni finiquitada}
            var venta = await this.dao.GetByExpedienteId(idExpediente);
            if (venta.EstatusVenta.Clave == "RE" || venta.EstatusVenta.Clave == "A" /*|| venta.EstatusVenta.Clave == "P"*/)
            {
                //{validar que el proceso de finiquito esté iniciado para realizar el finiquito}
                var bpSeguimiento = Get<p.SCV.Interfaces.ISeguimientos>();
                bool result = await bpSeguimiento.ValidarProceso(idExpediente, "PROC-FINIQUITO", "B");

                retValue.Allowed = result;
            }

            return retValue;
        }

        public async Task<object> IsAllowedToSelectCotizacion(int idExpediente)
        {
            //{estructura de retorno para ReactJS}
            dynamic retValue = new ElasticEntity();
            retValue.Allowed = false;

            //{validar que el proceso de Cotización esté activo/pendiente para ejecutar}
            bool allowedCotizar = await this.IsAllowedToCotizar(idExpediente);
            if (!allowedCotizar)
            {
                return retValue;
            }

            //{consultar la venta del expediente y validar que sea cotización}
            var venta = await this.dao.GetByExpedienteId(idExpediente);
            if (venta.EstatusVenta.Clave != "CO")
            {
                return retValue;
            }

            var cotizaciones = await this.GetCotizaciones(idExpediente);
            if (cotizaciones.Count > 0)
            {
                //{validar que no exista alguna cotización seleccionada}
                var cotizacion = cotizaciones.Find(c => c.EstatusVenta.Clave == "SE");
                if (cotizacion == null)
                {
                    retValue.Allowed = true;
                }
            }

            return retValue;
        }

        public async Task<List<m.SCV.Interfaces.IVenta>> RecalcularCotizaciones(m.SCV.Interfaces.IVenta item)
        {
            //{respaldar las cotizaciones y ubicaciones}
            var cotizaciones = item.Cotizaciones;
            var ubicaciones = item.Ubicaciones;
            var financiamiento = item.Financiamiento;

            int idCotizacion = item.ID ?? 0;
            int idExpediente = item.IdExpediente;

            //{iterar las ubicaciones de la cotización actual}
            if (ubicaciones != null && ubicaciones.Count > 0)
            {
                decimal totalUbicacion = 0;
                decimal totalUbicacionIM = 0;

                foreach (var u in ubicaciones)
                {
                    var vtaUbicacion = await this.VentaUbicacion(u, financiamiento, idCotizacion, idExpediente, false);

                    if (item.Importe == null)
                    {
                        item.Importe = 0;
                        item.ImporteMoneda = 0;
                        u.ImporteComisionable = 0;
                    }

                    totalUbicacion += (decimal)vtaUbicacion.Importe;
                    totalUbicacionIM += (decimal)vtaUbicacion.ImporteMoneda;
                    u.ImporteComisionable = (decimal)vtaUbicacion.Importe;
                }

                item.Importe = totalUbicacion;
                item.ImporteMoneda = totalUbicacionIM;
            }

            //{encontrar la cotización dentro de la sectionList para actualizar el Importe en tiempo real}
            if (cotizaciones != null && cotizaciones.Count > 0)
            {
                int index = cotizaciones.FindIndex(c => c.ID == item.ID);
                if (index != -1)
                {
                    cotizaciones[index].Importe = item.Importe;
                    cotizaciones[index].ImporteMoneda = item.ImporteMoneda;
                }
            }

            return cotizaciones;
        }

        #endregion

        /*Filtro Ventas Documentos por Factura y Importe*/
        public async Task<object> GetVentasDocumentosAll(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IVentas>();
            return await daoRL.GetVentasDocumento(parametros);
        }

        //método para ddl instituciones financiamiento
        public async Task<List<m.SCV.Interfaces.ITipoFinanciamientoInstitucion>> GetTFInstituciones(Dictionary<string, object> parametros)
        {
            var daoFI = Get<d.SCV.Interfaces.IInstituciones>();
            var retValue = new List<m.SCV.Interfaces.ITipoFinanciamientoInstitucion>();
            //
            try
            {
                var instituciones = await daoFI.GetAllTFInstituciones(parametros);
                if (instituciones != null && instituciones.Count > 0)
                {
                    foreach (var i in instituciones)
                    {
                        var item = Get<m.SCV.Interfaces.ITipoFinanciamientoInstitucion>();
                        item.ID = i.Institucion.ID;
                        item.Clave = i.Institucion.Clave;
                        item.Nombre = i.Institucion.Nombre;
                        item.IdInstitucion = i.IdInstitucion;
                        item.IdTipoFinanciamiento = i.IdTipoFinanciamiento;
                        item.IdEstatus = i.IdEstatus;
                        item.IdTFInstitucion = (int)i.ID;//ddl
                        item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        //
                        retValue.Add(item);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            //
            return retValue;
        }

        //método para ddl conceptos instituciones
        public async Task<List<m.SCV.Interfaces.IVentaFInstitucionDetalle>> GetInstitucionConceptos(Dictionary<string, object> parametros)
        {
            var daoID = Get<d.SCV.Interfaces.ITF_Institucion_Detalle>();
            var retValue = new List<m.SCV.Interfaces.IVentaFInstitucionDetalle>();
            try
            {
                int idConcepto = 0;
                var conceptos = await daoID.GetInstitucionDetalle(parametros);
                if (conceptos != null && conceptos.Count > 0)
                {
                    foreach (var c in conceptos)
                    {
                        var con = Get<m.SCV.Interfaces.IVentaFInstitucionDetalle>();
                        con.ID = (--idConcepto);
                        con.Clave = c.Clave;
                        con.Nombre = c.Nombre;
                        con.IdConcepto = c.IdConcepto;
                        con.Concepto = c.Concepto;
                        con.Credito = c.Credito;
                        con.ValorEstimado = string.Empty;
                        con.ValorAutorizado = string.Empty;
                        con.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        retValue.Add(con);
                    }
                }

                //{ordenar los conceptos si son parte del credito descendente}
                retValue = retValue.OrderByDescending(c => c.Credito == true).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        private async Task UpdateConceptosCredito(int idVenta)
        {
            var financiamiento = await this.GetVentaFinanciamiento(idVenta);
            if (financiamiento != null)
            {
                var instituciones = financiamiento.FinanciamientoInstituciones;
                if (instituciones != null && instituciones.Count > 0)
                {
                    foreach (var fi in instituciones)
                    {
                        var conceptos = fi.Conceptos;
                        if (conceptos != null && conceptos.Count > 0)
                        {
                            foreach (var cc in conceptos)
                            {
                                cc.ValorAutorizado = cc.ValorEstimado;
                                cc.IdModificadoPor = this.getUserId();

                                await this.dao.SaveVentaInstitucionConcepto(cc);
                            }
                        }
                    }
                }
            }
        }


        public async Task<object> CalculoPorMetas(string clave, m.SCV.Interfaces.ITabuladores tabulador, int idEjecucionProceso, int idPeriodicidadDetalle)
        {
            switch(clave)
            {
                case "VEN":
                    return await  CalculoPorMetasVentas(tabulador, idEjecucionProceso, idPeriodicidadDetalle);
                case "VENCOMPLE":
                    return await GeneracionComisionesComplementarias(tabulador, idEjecucionProceso, idPeriodicidadDetalle);
            }
            return null;
        }

        private async Task<bool> CalculoPorMetasVentas(m.SCV.Interfaces.ITabuladores tabulador, int idEjecucionProceso, int idPeriodicidadDetalle)
        {
            try
            {
                DateTime fechaInicio = DateTime.UtcNow;
                var daoVentas = Get<d.SCV.Interfaces.IVentas>();
                var daoTabuladores = Get<d.SCV.Interfaces.ITabuladores>();
                var daoTabuladoresConfiguracion = Get<d.SCV.Interfaces.ITabuladoresConfiguracion>();
                var daoComisiones = Get<d.SCV.Interfaces.IComisionesTabuladores>();

                var bpCalculoComisiones = Get<p.SCV.Interfaces.IComisionesTabuladores>();
                var bp = Get<p.SCV.Interfaces.IComisionesSeguimiento>();


                int idDesarrollo = tabulador.IdDesarrollo != null ? (int)tabulador.IdDesarrollo : 0;
                int idPlaza = tabulador.IdPlaza != null ? (int)tabulador.IdPlaza : 0;
                int idCategoria = tabulador.IdCategoria;

                var parametros = new Dictionary<string, object>();

                /*Consultar expedientes*/
                parametros.Clear();
                parametros.Add("idCategoria", idCategoria);
                parametros.Add("idDesarrollo", idDesarrollo);
                parametros.Add("idPlaza", idPlaza);
                parametros.Add("idPeriodoDetalle", idPeriodicidadDetalle);

                var conteoVentasPorCategoriasDesarrollo = await daoVentas.GetCalculoVentas(parametros);


                int contador = 0;
                int idProcesoDetalle = 0;
                foreach (var item in conteoVentasPorCategoriasDesarrollo)
                {

                    /*Verificar que en el periodo a calcular para esta categoria y usuario no este calculado ya*/

                    parametros.Clear();
                    parametros.Add("idCategoria", idCategoria);
                    parametros.Add("idDesarrollo", item.IdDesarrollo);
                    parametros.Add("idUsuario", item.IdUsuario);
                    parametros.Add("idPeriodicidadDetalle", idPeriodicidadDetalle);
                    parametros.Add("idTabulador", tabulador.ID.Value);

                    var calculoExistente = await daoComisiones.GetAll(parametros);
                    if (calculoExistente.Count() == 0)
                    {

                        int cantidad = item.Cantidad;

                        if (tabulador.IdDesarrollo == null)
                        {   
                                var busquedaAcorde = conteoVentasPorCategoriasDesarrollo.Where(x => x.IdUsuario == item.IdUsuario &&
                                 x.IdCategoria == item.IdCategoria);

                            cantidad = busquedaAcorde.Sum(d => d.Cantidad);
                        }
                       


                        var rango = await bpCalculoComisiones.BuscarConfiguracionPorTabulador(tabulador.ID.Value, cantidad);
                        if (rango != null)
                        {

                            if (contador == 0)
                            {
                                /*Generar Log en detalle proceso*/
                                var procesoDetalle = await bpCalculoComisiones.GuardarProcesoDetale(
                                    idPeriodicidadDetalle,
                                    idEjecucionProceso, 
                                    fechaInicio,
                                    tabulador);

                                idProcesoDetalle = procesoDetalle.ID.Value;
                                contador++;
                            }

                            /*Guardar Configuracion en tabla de comisiones*/
                            var configuracion = await bpCalculoComisiones.GuardarComisionTabulador(
                                idProcesoDetalle, tabulador, rango, item, cantidad);

                            /*Guardar Registro de expedientes utilizados para la contabilidad*/

                           /*Consultar expedientes*/
                            parametros.Clear();
                            parametros.Add("idCategoria", idCategoria);
                            parametros.Add("idDesarrollo", idDesarrollo);
                            parametros.Add("idPlaza", idPlaza);
                            parametros.Add("idPeriodoDetalle", idPeriodicidadDetalle);
                            parametros.Add("detalle", true);


                            var expedientesCount = await daoVentas.GetExpedientesPorTabulador(parametros);
                            await bpCalculoComisiones.GuardarTabuladorExpediente(expedientesCount, (int)configuracion.ID);

                        }
                    }
                }

                if(contador>0)
                {
                    await bpCalculoComisiones.MarcarEjecucionFinalProceso(idProcesoDetalle);

                }


                return true;
            }
            catch(Exception ex)
            {
                string error = ex.ToString();
                Rollback();
                throw;
            }
        }


       private async Task<bool> GeneracionComisionesComplementarias(m.SCV.Interfaces.ITabuladores tabulador, int idProceso, int idPeriodicidadDetalle)
       {
            try
            {
                var daoVentas = Get<d.SCV.Interfaces.IVentas>();
                var daoComisioensComplementarias = Get<d.SCV.Interfaces.IComisionesComplementarias>();
                var bpCalculoComisiones = Get<p.SCV.Interfaces.IComisionesTabuladores>();

                var parametros = new Dictionary<string, object>();


                int idDesarrollo = tabulador.IdDesarrollo != null ? (int)tabulador.IdDesarrollo : 0;
                int idPlaza = tabulador.IdPlaza != null ? (int)tabulador.IdPlaza : 0;

                parametros.Add("idPeriodoDetalle", idPeriodicidadDetalle);
                parametros.Add("idDesarrollo", idDesarrollo);
                parametros.Add("idPlaza", idPlaza);
                parametros.Add("idCategoria", tabulador.IdCategoria);


                var conteoVentasPorAgente = await daoVentas.GetCalculoVentasComplementarias(parametros);

                foreach (var venta in conteoVentasPorAgente)
                {


                    var rango = await bpCalculoComisiones.BuscarConfiguracionPorTabulador(tabulador.ID.Value, venta.Cantidad);

                    /*Si aplica complementario*/
                    if (rango != null)
                    {
                        /*Insertar ubicaciones comisionables en tabla complementaria*/
                        /*Obtener detalle*/

                        parametros.Add("creadoPor", base.getUserId());
                        parametros.Add("indicador", venta.Cantidad);
                        parametros.Add("monto", rango.Importe);
                        parametros.Add("porcentaje", rango.Porcentaje);
                        parametros.Add("idFase", tabulador.IdFase);
                        parametros.Add("claveTabulador", tabulador.Clave);

                        await daoComisioensComplementarias.GuardarComisionesComplementarias(parametros);

                    }
                }

                return true;
            }
            catch(Exception ex)
            {
                string error = ex.ToString();
                throw;
            }
       }


        public async Task<string> ValidarLPPorDesarrollo(Dictionary<string,object> parametros)
        {
            object expediente;

            parametros.TryGetValue("idExpediente", out expediente);
            int idExpediente = Convert.ToInt32(expediente);

            var daoExp= Get<d.SCV.Interfaces.IExpedientes>();
            var bpListaPrecios = Get<p.SCV.Interfaces.IListaPrecios>();


            var objExpediente = await daoExp.GetById(idExpediente);

            int idDesarrollo =(int)objExpediente.IdDesarrollo;
            int idTipoComercializacion =(int)objExpediente.IdTipoComercializacion;

            string result =await bpListaPrecios.ValidarExistenciaLP(idDesarrollo, idTipoComercializacion);

            return result;
        }


    }
}