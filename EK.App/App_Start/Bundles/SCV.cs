using System.Collections.Generic;
using System.Web.Optimization;

namespace EK.App.App_Start.Bundles
{
    public static class SCV
    {
        public static Bundle GetBundle(string version)
        {
            var scripts = new string[]{
                "~/Scripts/modulos/scv/Pages/motivosDescartarBoleta.js",
                "~/Scripts/modulos/scv/Pages/motivosDescartarBoleta-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/paquetes.js",
                "~/Scripts/modulos/scv/Pages/paquetes-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/categoriasBitacora.js",
                "~/Scripts/modulos/scv/Pages/categoriasBitacora-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/FasesExpediente.js",
                "~/Scripts/modulos/scv/Pages/FasesExpediente-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/MacroEtapas.js",
                "~/Scripts/modulos/scv/Pages/MacroEtapas-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/Empresas.js",
                "~/Scripts/modulos/scv/Pages/Empresas-Editar.js",
                "~/Scripts/modulos/scv/Pages/TmComisiones.js",
                "~/Scripts/modulos/scv/Pages/TmComisiones-Editar.js",
                "~/Scripts/modulos/scv/Pages/ComisionesAprobacion.js",


                "~/Scripts/modulos/scv/Pages/Expedientes-Cancelados-Suspendidos.js",
                "~/Scripts/modulos/scv/Pages/Expedientes-AnalisisPorEtapa.js",


                "~/Scripts/modulos/scv/Pages/comisiones/comisionesAjustes-Editar.js",
                "~/Scripts/modulos/scv/Pages/comisiones/comisionesAjustes.js",


                "~/Scripts/modulos/scv/Pages/OrigenLead.js",
                "~/Scripts/modulos/scv/Pages/OrigenLead-Catalogo.js",


                "~/Scripts/modulos/scv/Pages/boletasProspeccion.js",
                "~/Scripts/modulos/scv/Pages/boletasProspeccion-Catalogo.js",
                "~/Scripts/modulos/scv/pages/TiposCambio.js",
                "~/Scripts/modulos/scv/pages/TiposCambio-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/Categorias.js",
                "~/Scripts/modulos/scv/Pages/MediosPublicidad.js",
                "~/Scripts/modulos/scv/Pages/MediosPublicidad-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/GradosInteres.js",
                "~/Scripts/modulos/scv/Pages/GradosInteres-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/Giros.js",
                "~/Scripts/modulos/scv/Pages/Giros-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/ConceptosCredito.js",
                "~/Scripts/modulos/scv/Pages/ConceptosCredito-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/origenProspeccion.js",
                "~/Scripts/modulos/scv/Pages/origenProspeccion-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/Categorias-Catalogo.js",

                "~/Scripts/modulos/scv/Pages/TipoInmueble.js",
                "~/Scripts/modulos/scv/Pages/TipoInmueble-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/TipoFinanciamiento.js",
                "~/Scripts/modulos/scv/Pages/TipoFinanciamiento-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/IMotivoSuspension.js",
                "~/Scripts/modulos/scv/Pages/MotivoSuspension-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/Etapas.js",
                "~/Scripts/modulos/scv/Pages/Segmentos.js",
                "~/Scripts/modulos/scv/Pages/Segmentos-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/SegmentosVigencia.js",
                "~/Scripts/modulos/scv/Pages/SegmentosVigencia-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/Tramites.js",
                "~/Scripts/modulos/scv/Pages/Tramites-Editar.js",
                "~/Scripts/modulos/scv/Pages/Etapas-Catalogo.js",

                "~/Scripts/modulos/scv/Pages/UbicacionEstatus-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/UbicacionEstatus.js",

                "~/Scripts/modulos/scv/Pages/ModelosPaquete.js",
                "~/Scripts/modulos/scv/Pages/ModelosPaquete-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/TiposUbicacion.js",
                "~/Scripts/modulos/scv/Pages/TiposUbicacion-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/CampaniaPublicidad.js",
                "~/Scripts/modulos/scv/Pages/CampaniaPublicidad-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/ReferenciasPersonales.js",
                "~/Scripts/modulos/scv/Pages/ReferenciasPersonales-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/RangosIngresos.js",
                "~/Scripts/modulos/scv/Pages/RangosIngresos-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/Instituciones.js",
                "~/Scripts/modulos/scv/Pages/Instituciones-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/Clientes.js",
                "~/Scripts/modulos/scv/Pages/Clientes-Editar.js",
                "~/Scripts/modulos/scv/Pages/MotivosCancelacion.js",
                "~/Scripts/modulos/scv/Pages/MotivosCancelacion-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/MotivoReanudacion.js",
                "~/Scripts/modulos/scv/Pages/MotivoReanudacion-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/MotivoSuspension.js",
                "~/Scripts/modulos/scv/Pages/MotivoSuspension-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/PuntosVenta.js",
                "~/Scripts/modulos/scv/Pages/PuntosVenta-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/Prototipos.js",
                "~/Scripts/modulos/scv/Pages/Prototipos-Editar.js",
                "~/Scripts/modulos/scv/Pages/TiposCaracteristicaAdicional.js",
                "~/Scripts/modulos/scv/Pages/TiposCaracteristicaAdicional-Editar.js",
                "~/Scripts/modulos/scv/Pages/CaracteristicaAdicional.js",
                "~/Scripts/modulos/scv/Pages/CaracteristicaAdicional-Editar.js",
                "~/Scripts/modulos/scv/Pages/Desarrollos.js",
                "~/Scripts/modulos/scv/Pages/Desarrollos-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/Ubicaciones.js",

                "~/Scripts/modulos/scv/Pages/ConsultaUbicaciones.js",

                "~/Scripts/modulos/scv/Pages/Ubicaciones-Editar.js",
                "~/Scripts/modulos/scv/Pages/EstatusExpediente.js",
                "~/Scripts/modulos/scv/Pages/EstatusExpediente-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/Sindicatos.js",
                "~/Scripts/modulos/scv/Pages/Sindicatos-Editar.js",
                "~/Scripts/modulos/scv/Pages/Esquemas.js",
                "~/Scripts/modulos/scv/Pages/Esquemas-Editar.js",
                "~/Scripts/modulos/scv/Pages/Esquemas-Etapas.js",
                "~/Scripts/modulos/scv/Pages/Esquemas-Requisitos.js",
                "~/Scripts/modulos/scv/Pages/Esquemas-Documentos.js",
                "~/Scripts/modulos/scv/Pages/Esquemas-Procesos.js",
                "~/Scripts/modulos/scv/Pages/Esquemas-ProcesosDetalle.js",

                "~/Scripts/modulos/scv/Pages/CentralesObreras.js",
                "~/Scripts/modulos/scv/Pages/CentralesObreras-Editar.js",
                "~/Scripts/modulos/scv/Pages/TipoFinanciamiento.js",
                "~/Scripts/modulos/scv/Pages/TipoFinanciamiento-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/Procesos.js",
                "~/Scripts/modulos/scv/Pages/Procesos-Editar.js",
                "~/Scripts/modulos/scv/Pages/Notarios.js",
                "~/Scripts/modulos/scv/Pages/Notarios-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/PlanesPagos.js",
                "~/Scripts/modulos/scv/Pages/PlanesPagos-Editar.js",
                "~/Scripts/modulos/scv/Pages/ConceptosPago.js",
                "~/Scripts/modulos/scv/Pages/ConceptosPago-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/ConceptosCredito.js",
                "~/Scripts/modulos/scv/Pages/ConceptosCredito-Catalogo.js",

                "~/Scripts/modulos/scv/Pages/Ventas.js",
                "~/Scripts/modulos/scv/Pages/Ventas-EditarPrecioVenta.js",


                "~/Scripts/modulos/scv/Pages/Ventas-general.js",
                "~/Scripts/modulos/scv/Pages/Ventas-Editar.js",
                "~/Scripts/modulos/scv/Pages/Ventas-Esquema.js",
                "~/Scripts/modulos/scv/Pages/Ventas-PP.js",
                "~/Scripts/modulos/scv/Pages/Ventas-Components.js",
                "~/Scripts/modulos/scv/Pages/Ventas-Cotizaciones.js",
                "~/Scripts/modulos/scv/Pages/ListaPrecios.js",
                "~/Scripts/modulos/scv/Pages/ListaPrecios-Editar.js",
                "~/Scripts/modulos/scv/Pages/Requisitos.js",
                "~/Scripts/modulos/scv/Pages/Requisitos-Editar.js",
                "~/Scripts/modulos/scv/Pages/DocumentosExpediente.js",
                "~/Scripts/modulos/scv/Pages/DocumentosExpediente-Editar.js",
                "~/Scripts/modulos/scv/Pages/Expedientes.js",
                "~/Scripts/modulos/scv/Pages/Expedientes-Configuracion.js",


                "~/Scripts/modulos/scv/Pages/ExpedientesEscrituracion.js",
                "~/Scripts/modulos/scv/Pages/ExpedienteEscrituracion-Detalle.js",

                "~/Scripts/modulos/scv/Pages/ExpedientesFiniquito.js",
                "~/Scripts/modulos/scv/Pages/ExpedientesGenerarPoliza.js",



                "~/Scripts/modulos/scv/Pages/Seguimientos.js",
                "~/Scripts/modulos/scv/Pages/Seguimientos-Editar.js",
                "~/Scripts/modulos/scv/Pages/Seguimientos-EditarV2.js",
                "~/Scripts/modulos/scv/Pages/Seguimientos-Documentos.js",
                "~/Scripts/modulos/scv/Pages/Seguimientos-Procesos.js",
                "~/Scripts/modulos/scv/Pages/Seguimientos-Etapas.js",
                "~/Scripts/modulos/scv/Pages/Seguimientos-Requisitos.js",
                "~/Scripts/modulos/scv/Pages/Seguimientos-Requisitos-Inputs.js",

                "~/Scripts/modulos/scv/Pages/TmComisiones.js",
                "~/Scripts/modulos/scv/Pages/TmComisiones-Editar.js",
                //"~/Scripts/modulos/scv/Pages/ComisionesAprobacion.js",
                //"~/Scripts/modulos/scv/Pages/ComisionesAprobacion-Catalogo.js",

                "~/Scripts/modulos/scv/Pages/comisiones/ComisionesAprobacion.js",
                "~/Scripts/modulos/scv/Pages/comisiones/ComisionesAprobacion-Catalogo.js",

                "~/Scripts/modulos/scv/Pages/comisiones/calculo.js",
                "~/Scripts/modulos/scv/Pages/comisiones/configuracionComisiones.js",
                "~/Scripts/modulos/scv/Pages/comisiones/configuracionPlanEsquema.js",
                "~/Scripts/modulos/scv/Pages/comisiones/configuracionPeriodos.js",
                "~/Scripts/modulos/scv/Pages/comisiones/configuracionCalculo.js",
                "~/Scripts/modulos/scv/Pages/comisiones/EK-HorizontalTimeLine.js",

                "~/Scripts/modulos/scv/Pages/ExpedientesDocumentos.js",





                 "~/Scripts/modulos/scv/Pages/TiposComercializacion.js",
                "~/Scripts/modulos/scv/Pages/TiposComercializacion-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/TramiteAsignado.js",
                "~/Scripts/modulos/scv/Pages/TramiteAsignado-Editar.js",
                "~/Scripts/modulos/scv/Pages/comisiones/Tabuladores.js",
                "~/Scripts/modulos/scv/Pages/comisiones/Tabuladores-Editar.js",
                "~/Scripts/modulos/scv/Pages/Indicador.js",
                "~/Scripts/modulos/scv/Pages/Indicador-Editar.js",
                "~/Scripts/modulos/scv/store/reducers/CategoriasReducer.js",
                "~/Scripts/modulos/scv/store/reducers/EstatusUbicacionReducer.js",
                "~/Scripts/modulos/scv/store/reducers/MediosPublicidadReducer.js",
                "~/Scripts/modulos/scv/store/reducers/GradosInteresReducer.js",
                "~/Scripts/modulos/scv/store/reducers/ModelosPaqueteReducer.js",
                "~/Scripts/modulos/scv/store/reducers/EstatusUbicacionReducer.js",
                "~/Scripts/modulos/scv/store/reducers/MediosPublicidadReducer.js",
                "~/Scripts/modulos/scv/store/reducers/GradosInteresReducer.js",
                "~/Scripts/modulos/scv/store/reducers/TipoInmuebleReducer.js",
                "~/Scripts/modulos/scv/store/reducers/TipoFinanciamientoReducer.js",
                "~/Scripts/modulos/scv/store/reducers/TiposUbicacionReducer.js",
                "~/Scripts/modulos/scv/store/reducers/EtapasReducer.js",
                "~/Scripts/modulos/scv/store/reducers/CampaniaPublicidadReducer.js",
                "~/Scripts/modulos/scv/store/reducers/SegmentosReducer.js",
                "~/Scripts/modulos/scv/store/reducers/SegmentosVigenciasReducer.js",
                "~/Scripts/modulos/scv/store/reducers/ReferenciasPersonalesReducer.js",
                "~/Scripts/modulos/scv/store/reducers/RangosIngresosReducer.js",
                "~/Scripts/modulos/scv/store/reducers/InstitucionesReducer.js",
                "~/Scripts/modulos/scv/store/reducers/ClientesReducer.js",
                "~/Scripts/modulos/scv/store/reducers/MotivosCancelacionReducer.js",
                "~/Scripts/modulos/scv/store/reducers/EmpresasReducer.js",
                "~/Scripts/modulos/scv/store/reducers/ProcesosReducer.js",
                "~/Scripts/modulos/scv/store/reducers/PuntosVentaReducer.js",
                "~/Scripts/modulos/scv/store/reducers/PrototiposReducer.js",
                "~/Scripts/modulos/scv/store/reducers/TiposCaracteristicaAdicionalReducer.js",
                "~/Scripts/modulos/scv/store/reducers/CaracteristicaAdicionalReducer.js",
                "~/Scripts/modulos/scv/store/reducers/DesarrollosReducer.js",
                "~/Scripts/modulos/scv/store/reducers/UbicacionesReducer.js",
                "~/Scripts/modulos/scv/store/reducers/EstatusExpedienteReducer.js",
                "~/Scripts/modulos/scv/store/reducers/SindicatosReducer.js",
                "~/Scripts/modulos/scv/store/reducers/CentralesObrerasReducer.js",
                "~/Scripts/modulos/scv/store/reducers/NotariosReducer.js",
                "~/Scripts/modulos/scv/store/reducers/PlanesPagosReducer.js",
                "~/Scripts/modulos/scv/store/reducers/ConceptosPagoReducer.js",
                "~/Scripts/modulos/scv/store/reducers/VentasReducer.js",
                "~/Scripts/modulos/scv/store/reducers/ListaPreciosReducer.js",
                "~/Scripts/modulos/scv/store/reducers/RequisitosReducer.js",
                "~/Scripts/modulos/scv/store/reducers/DocumentosExpedienteReducer.js",
                "~/Scripts/modulos/scv/store/reducers/EsquemasReducer.js",
                "~/Scripts/modulos/scv/store/reducers/SeguimientosReducer.js",
                "~/Scripts/modulos/scv/store/reducers/FasesExpedienteReducer.js",
                "~/Scripts/modulos/scv/store/reducers/ExpedientesReducer.js",
                "~/Scripts/modulos/scv/store/reducers/CoordenadasReducer.js",
                "~/Scripts/modulos/scv/store/reducers/reducers.js",
                "~/Scripts/modulos/scv/Pages/postventa/UbicacionesFalla.js",
                "~/Scripts/modulos/scv/Pages/postventa/UbicacionesFalla-Editar.js",
                "~/Scripts/modulos/scv/Pages/postventa/PlanificacionComponent.js",
                "~/Scripts/modulos/scv/Pages/postventa/PlanificacionComponentAtencion.js",
                "~/Scripts/modulos/scv/Pages/postventa/PlanificacionComponentDashboard.js",
                "~/Scripts/modulos/scv/Pages/postventa/PlanificacionComponentViewTasks.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/UbicacionComun.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/UbicacionComun-Editar.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/TipoContratista.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/TipoContratista-Editar.js",
                "~/Scripts/modulos/scv/Pages/postventa/OrigenFalla.js",
                "~/Scripts/modulos/scv/Pages/postventa/OrigenFalla-Editar.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/RezagosEntrega.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/RezagosEntrega-Editar.js",
                "~/Scripts/modulos/scv/pages/postventa/MotivosCancelacionPV.js",
                "~/Scripts/modulos/scv/pages/postventa/MotivosCancelacionPV-Editar.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/CausasReprogramacion.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/CausasReprogramacion-Editar.js",
                "~/Scripts/modulos/scv/pages/postventa/TiposComponentes.js",
                "~/Scripts/modulos/scv/pages/postventa/TiposComponentes-Editar.js",
                "~/Scripts/modulos/scv/pages/postventa/Falla.js",
                "~/Scripts/modulos/scv/pages/postventa/Falla-Editar.js",

                "~/Scripts/modulos/scv/pages/postventa/ComponentesIncidencias.js",
                "~/Scripts/modulos/scv/pages/postventa/ComponentesIncidencias-Editar.js",


                "~/Scripts/modulos/scv/pages/postventa/Tickets-Editar.js",
                "~/Scripts/modulos/scv/pages/postventa/Tickets.js",
                "~/Scripts/modulos/scv/pages/postventa/ResponsableEntregaDesarrollos.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/BitacoraClienteSPV.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/ComentariosOT.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/CancelarReporteFalla.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/PhotoViewer.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/PhotoViewerMulti.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/ModalPdfViewer.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/ModalArchivosEntrega.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/ModalAutorizarGte.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/ModalDateLocker.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/ReporteBienesAdicionales.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/RadarClientes.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/ReporteRadarClientes.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/RadarComunidades.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/ReporteRadarComunidades.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/ReporteIncidenciasNoVigentes.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/ReporteIncidenciasEntrega.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/ReporteFoliosVivienda.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/DescargaMasivaPDF.js",


                "~/Scripts/modulos/scv/pages/postventa/PlanCompromisosConstruccion.js",
                "~/Scripts/modulos/scv/pages/postventa/PlanCompromisosEntrega.js",




                "~/Scripts/modulos/scv/pages/postventa/ruba/TipoFallaAreaComun.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/TipoFallaAreaComun-Editar.js",
                "~/Scripts/modulos/scv/pages/Plaza.js",
                "~/Scripts/modulos/scv/pages/Plaza-Editar.js",
                "~/Scripts/modulos/scv/pages/ListasMkt.js",
                "~/Scripts/modulos/scv/pages/ListasMkt-Catalogo.js",
                "~/Scripts/modulos/scv/pages/TipoMovimiento.js",
                "~/Scripts/modulos/scv/pages/TipoMovimiento-Catalogo.js",
                "~/Scripts/modulos/scv/pages/Impuestos.js",
                "~/Scripts/modulos/scv/pages/Impuestos-Catalogo.js",
                "~/Scripts/modulos/scv/pages/Regimen.js",
                "~/Scripts/modulos/scv/pages/Regimen-Editar.js",
                "~/Scripts/modulos/scv/pages/ListaMarketingCliente.js",
                "~/Scripts/modulos/scv/pages/ListaMarketingBoleta.js",
                "~/Scripts/modulos/scv/pages/ListaMarketingUsuario.js",
                "~/Scripts/modulos/scv/pages/TipoOrigen.js",
                "~/Scripts/modulos/scv/pages/TipoOrigen-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/SeguimientoCampaniaPublicidad.js",
                "~/Scripts/modulos/scv/Pages/SeguimientoCampaniaPublicidad-Catalogo.js",
                "~/Scripts/modulos/scv/Pages/SeguimientoCampaniaPublicidadEvento.js",
                "~/Scripts/modulos/scv/Pages/SeguimientoCampaniaPublicidadUsuario.js",
                "~/Scripts/modulos/scv/Pages/TiposdeProceso.js",
                 "~/Scripts/modulos/scv/Pages/TiposdeProceso-Catalogo.js",
                 "~/Scripts/modulos/scv/Pages/ReporteBoletasProspeccion.js",
                 "~/Scripts/modulos/scv/Pages/ReporteProspectosClientes.js",
                 "~/Scripts/modulos/scv/Pages/ReporteAnaliticoProspectos.js",
                 "~/Scripts/modulos/scv/Pages/ReporteExpedientes.js",
                 "~/Scripts/modulos/scv/Pages/ReporteInformativoMacroEtapas.js",
                 "~/Scripts/modulos/scv/Pages/ReporteFuerzaVentas.js",
                 "~/Scripts/modulos/scv/Pages/ReporteForecast.js",

                 "~/Scripts/modulos/scv/Pages/AnalisisProspecto.js",
                 "~/Scripts/modulos/scv/Pages/AnalisisProspecto-Editar.js",

                 "~/Scripts/modulos/scv/Pages/GestionDocumentos-Editar.js",
                 "~/Scripts/modulos/scv/Pages/GestionDocumentos.js",


                "~/Scripts/modulos/scv/pages/postventa/CheckLists.js",
                  "~/Scripts/modulos/scv/pages/postventa/CheckLists-Editar.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/PersonalEntregaUbicaciones.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/SPVSupervisoresCoordinadores.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/SPVFraccionamientosCat.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/SPVSupervisoresCAT.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ConfigViviendaEntregable.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ConsultaPreparacionVivienda.js",
               "~/Scripts/modulos/scv/pages/postventa/ruba/ConsultaViviendaEntregable.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/CapturaFechaConstruccion.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/EntregaPaquetes.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/DashBoardFallas.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/AgendaFiltroSPV.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/AgendaEntregaViviendaSPV.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/AgendaDashBoarEntregaVivienda.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ContratistasUbicaciones.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ReportesFallas-Actualizador.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ReportesFallas-Consulta.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ContribucionPorPlaza.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ConsultaFallasIncidencias.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ReporteEntregaChecklistPendiente.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ReportesFallas-Componentes.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ReportesFallas-Editar.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ReporteAnalisisComunidades.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ConsultaReporteAnalisisComunidades.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ReporteDatosSega.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ReportesFallas.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/Prereportes.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/Prereportes-Editar.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/DashBoardFailureReport.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/DashBoardUsuarios.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/CheckList.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/VerDocumentosVivienda.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/Agenda/Agenda.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/Agenda/NewCalendarModal.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/Agenda/CalendarType.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/AgendaModoPostVenta.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/AgendaModoReporteFalla.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/AgendaContratistaSPV.js",
                 "~/Scripts/modulos/scv/pages/postventa/ruba/AgendaDictamenSPV.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/DocumentosImpresion.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/DocumentosImpresion-Editar.js",
                "~/Scripts/modulos/scv/Pages/postventa/MediosComunicacion.js",
                "~/Scripts/modulos/scv/Pages/postventa/MediosComunicacion-Editar.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/SupervisoresUbicaciones.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ReversarEntregaUbicacion.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/BitacoraEspSPVCliente.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ModificadorFechaAgenda.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ModificarDatosCliente.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/EncuestaSPVRUBA.js",
                 "~/Scripts/modulos/scv/Pages/postventa/ruba/ViewDiagnosticateCAT.js",
                 "~/Scripts/modulos/scv/pages/TipoCliente.js",
                "~/Scripts/modulos/scv/pages/TipoCliente-Editar.js",
                 "~/Scripts/modulos/scv/pages/Reasignacion.js",
                "~/Scripts/modulos/scv/Pages/ReporteConsultaProspectos.js",

                "~/Scripts/modulos/scv/pages/Interface.js",

                "~/Scripts/modulos/scv/Pages/postventa/Prototipos-UbicacionesFallas.js",
                "~/Scripts/modulos/scv/Pages/ChecklistsControl-Componente.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ReporteEncuestaSatisfaccion.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ReporteSeguimientoVivProg.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/reportesfallas-correodiario.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/EncuestaEntregaViviendaModal.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ReporteEncuestaEntregaVivienda.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/DashBoardMensajeria.js",
                #region +++++++++++++++++ AREAS COMUNES ++++++++++++++++++++++++++
                "~/Scripts/modulos/scv/pages/postventa/RUBA/BitacoraClienteAreasComunesSPV.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/CancelarReporteFallaAreasComunes.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/AgendaContratistaAreasComunesSPV.js",
                 "~/Scripts/modulos/scv/pages/postventa/ruba/AgendaDictamenAreasComunesSPV.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/DashboardReporteFallasAreasComunes.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ReporteFallasAreasComunes-Componentes.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ReporteFallasAreasComunes-Editar.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/AgendaModoReporteFallasAreasComunes.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ReporteFallasAreasComunes-Consulta.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ReporteFallasAreasComunes-Actualizador.js",
                "~/Scripts/modulos/scv/pages/postventa/RUBA/ComentariosOTActivador.js",


	#endregion
                
                #region ClasificacionViviendaPendienteEntrega
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ClasificacionViviendaPendiente.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ClasificacionViviendaPendienteCheck.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ConsultaClasificacionDetalle.js",
                "~/Scripts/modulos/scv/pages/postventa/ruba/ConsultaClasificacionPromedioDias.js",

            
	#endregion
                
                #region CONSULTA DE REINCIDENCIAS 
                "~/Scripts/modulos/scv/pages/postventa/ruba/ConsultaReincidencias.js",
	            #endregion
                
                #region ReportePredictivo
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ReportePredictivo.js",
	            #endregion
                
                #region ComparativaIncidencias
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ComparativaIncidencias.js",
	            #endregion

                #region ConsultaDiasPromedioAtencion
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ConsultaDiasPromedioAtencion.js",
	            #endregion

                #region ReporteApp
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ReporteApp.js",
	            #endregion

                #region Catalogos
                "~/Scripts/modulos/scv/Pages/postventa/ruba/CatFallasAreasComunes.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/CatFallas.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/CatCoordinadores.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/CatComponentes.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/CatConfiguracionDocumentos.js",
	            #endregion
                #region Utilerias
                //Configuracion correo equipamiento.
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ConfigCorreosEquipamiento.js",

                #endregion

                #region DESARROLLO COMUNITARIO
                #region PROCESO
                "~/Scripts/modulos/scv/Pages/postventa/ruba/EncuestaPoblacional.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ConsultaEncuestaPoblacional.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/EventosActividades.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/EventosActividadesCaptura.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/EnventosActividadesPPC.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ComiteAreaGeografica.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ComiteInformacionComite.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ComiteReuniones.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ComiteReunionesAgenda.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ComiteReunionesGraficas.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/AsociacionCivil.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/MesaDirectiva.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ReconocimientosRuba.js",
                #endregion
                #region Consultas
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ConsultaEventosActAlta.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ConsultaEventosActAltaCaptura.js",
                "~/Scripts/modulos/scv/Pages/postventa/ruba/ConsultaEventosActAltaPPC.js",

	            #endregion
	            
                #endregion

                "~/Scripts/modulos/scv/Index.js"
            };
            return new ScriptBundle($"~/b/{version}/modulo-scv").Include(scripts);
        }
    }
}