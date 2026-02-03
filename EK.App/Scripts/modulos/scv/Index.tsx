let ___SCVBaseRouter: any[] = [
    //{ path: "/", component: EK.Modules.SCV.Pages.Expedientes.Vista },
    { path: "/scv/categorias", component: EK.Modules.SCV.Pages.Categorias.Vista },
    { path: "/scv/categorias/:id", component: EK.Modules.SCV.Pages.Categorias.Edicion },
    { path: "/scv/paquetes", component: EK.Modules.SCV.Pages.paquetes.Vista },
    { path: "/scv/paquetes/:id", component: EK.Modules.SCV.Pages.paquetes.Edicion },
    { path: "/scv/mediosPublicidad", component: EK.Modules.SCV.Pages.MediosPublicidad.Vista },
    { path: "/scv/mediosPublicidad/:id", component: EK.Modules.SCV.Pages.MediosPublicidad.Edicion },
    { path: "/scv/gradosInteres", component: EK.Modules.SCV.Pages.GradosInteres.Vista },
    { path: "/scv/gradosInteres/:id", component: EK.Modules.SCV.Pages.GradosInteres.Edicion },

    { path: "/scv/ubicacionEstatus", component: EK.Modules.SCV.Pages.UbicacionEstatus.Vista },
    { path: "/scv/ubicacionEstatus/:id", component: EK.Modules.SCV.Pages.UbicacionEstatus.Edicion },

    { path: "/scv/consultaUbicaciones", component: EK.Modules.SCV.Pages.Ubicaciones.Reportes.Vista },


    { path: "/scv/tiposUbicacion", component: EK.Modules.SCV.Pages.TiposUbicacion.Vista },
    { path: "/scv/tiposUbicacion/:id", component: EK.Modules.SCV.Pages.TiposUbicacion.Edicion },
    { path: "/scv/modelosPaquete", component: EK.Modules.SCV.Pages.ModelosPaquete.Vista },
    { path: "/scv/modelosPaquete/:id", component: EK.Modules.Kontrol.Pages.ModelosPaquete.Edicion },
    { path: "/scv/tipoinmueble", component: EK.Modules.SCV.Pages.TipoInmueble.Vista },
    { path: "/scv/tipoinmueble/:id", component: EK.Modules.SCV.Pages.TipoInmueble.Edicion },
    { path: "/scv/campaniaPublicidad", component: EK.Modules.SCV.Pages.CampaniaPublicidad.Vista },
    { path: "/scv/campaniaPublicidad/:id", component: EK.Modules.Kontrol.Pages.CampaniaPublicidad.Edicion },
    { path: "/scv/giros", component: EK.Modules.SCV.Pages.Giros.Vista },
    { path: "/scv/giros/:id", component: EK.Modules.SCV.Pages.Giros.Edicion },
    { path: "/scv/tipoElementoBitacora", component: EK.Modules.SCV.Pages.categoriasBitacora.Vista },
    { path: "/scv/tipoElementoBitacora/:id", component: EK.Modules.SCV.Pages.categoriasBitacora.Edicion },
    { path: "/scv/motivosDescartarBoleta", component: EK.Modules.SCV.Pages.MotivosDescartarBoleta.Vista },
    { path: "/scv/motivosDescartarBoleta/:id", component: EK.Modules.SCV.Pages.MotivosDescartarBoleta.Edicion },
    { path: "/scv/conceptosCredito", component: EK.Modules.SCV.Pages.ConceptosCredito.Vista },
    { path: "/scv/conceptosCredito/:id", component: EK.Modules.SCV.Pages.ConceptosCredito.Edicion },
    { path: "/scv/tipoComercializacion", component: EK.Modules.SCV.Pages.TipoComercializacion.Vista },
    { path: "/scv/tipoComercializacion/:id", component: EK.Modules.SCV.Pages.TipoComercializacion.Edicion },
    { path: "/scv/TipoMovimiento", component: EK.Modules.SCV.Pages.TipoMovimiento.Vista },
    { path: "/scv/TipoMovimiento/:id", component: EK.Modules.SCV.Pages.TipoMovimiento.Edicion },
    { path: "/scv/Impuestos", component: EK.Modules.SCV.Pages.Impuestos.Vista },
    { path: "/scv/Impuestos/:id", component: EK.Modules.SCV.Pages.Impuestos.Edicion },

    { path: "/scv/GestionDocumentos", component: EK.Modules.SCV.Pages.GestionDocumentos.Vista },
    { path: "/scv/GestionDocumentos/:id", component: EK.Modules.SCV.Pages.GestionDocumentos.Edicion },

    { path: "/scv/etapas", component: EK.Modules.SCV.Pages.Etapas.Vista },
    { path: "/scv/etapas/nuevo", component: EK.Modules.SCV.Pages.Etapas.Edicion },
    { path: "/scv/etapas/:id", component: EK.Modules.SCV.Pages.Etapas.Edicion },
    { path: "/scv/segmentos", component: EK.Modules.SCV.Pages.Segmentos.Vista },
    { path: "/scv/segmentos/:id", component: EK.Modules.SCV.Pages.Segmentos.Edicion },
    { path: "/scv/referenciasPersonales", component: EK.Modules.SCV.Pages.ReferenciasPersonales.Vista },
    { path: "/scv/referenciasPersonales/:id", component: EK.Modules.SCV.Pages.ReferenciasPersonales.Edicion },
    { path: "/scv/rangosIngresos", component: EK.Modules.SCV.Pages.RangosIngresos.Vista },
    { path: "/scv/rangosIngresos/:id", component: EK.Modules.SCV.Pages.RangosIngresos.Edicion },
    { path: "/scv/segmentosvigencia", component: EK.Modules.SCV.Pages.SegmentosVigencia.Vista },
    { path: "/scv/segmentosvigencia/:id", component: EK.Modules.SCV.Pages.SegmentosVigencia.Edicion },
    { path: "/scv/tramites", component: EK.Modules.SCV.Pages.Tramites.Vista },
    { path: "/scv/tramites/:id", component: EK.Modules.SCV.Pages.Tramites.Edicion },
    { path: "/scv/tramiteAsignado", component: EK.Modules.SCV.Pages.TramiteAsignado.Vista },
    { path: "/scv/tramiteAsignado/:id", component: EK.Modules.SCV.Pages.TramiteAsignado.Edicion },
    { path: "/scv/tabuladores", component: EK.Modules.SCV.Pages.Tabuladores.Vista },
    { path: "/scv/tabuladores/:id", component: EK.Modules.SCV.Pages.Tabuladores.Edicion },
    { path: "/scv/indicadores", component: EK.Modules.SCV.Pages.Indicador.Vista },
    { path: "/scv/indicadores/:id", component: EK.Modules.SCV.Pages.Indicador.Edicion },
    { path: "/scv/instituciones", component: EK.Modules.SCV.Pages.Instituciones.Vista },
    { path: "/scv/instituciones/nuevo", component: EK.Modules.SCV.Pages.Instituciones.Edicion },
    { path: "/scv/instituciones/:id", component: EK.Modules.SCV.Pages.Instituciones.Edicion },
    { path: "/scv/clientes", component: EK.Modules.SCV.Pages.Clientes.Vista },
    { path: "/scv/clientes/:id", component: EK.Modules.SCV.Pages.Clientes.Edicion },
    { path: "/scv/motivoscancelacion", component: EK.Modules.SCV.Pages.MotivosCancelacion.Vista },
    { path: "/scv/motivoscancelacion/:id", component: EK.Modules.SCV.Pages.MotivosCancelacion.Edicion },
    { path: "/scv/motivosuspension", component: EK.Modules.SCV.Pages.MotivoSuspension.Vista },
    { path: "/scv/motivosuspension/:id", component: EK.Modules.SCV.Pages.MotivoSuspension.Edicion },
    { path: "/scv/motivoreanudacion", component: EK.Modules.SCV.Pages.MotivoReanudacion.Vista },
    { path: "/scv/motivoreanudacion/:id", component: EK.Modules.SCV.Pages.MotivoReanudacion.Edicion },
    { path: "/scv/referenciaslaborales", component: EK.Modules.SCV.Pages.Empresas.Vista },
    { path: "/scv/referenciaslaborales/:id", component: EK.Modules.SCV.Pages.Empresas.Edicion },
    { path: "/scv/fasesExpediente", component: EK.Modules.SCV.Pages.SCVFasesExpediente.Vista },
    { path: "/scv/fasesExpediente/:id", component: EK.Modules.SCV.Pages.SCVFasesExpediente.Edicion },
    { path: "/scv/macroEtapas", component: EK.Modules.SCV.Pages.SCVMacroEtapas.Vista },
    { path: "/scv/macroEtapas/:id", component: EK.Modules.SCV.Pages.SCVMacroEtapas.Edicion },
    { path: "/scv/puntosventa", component: EK.Modules.SCV.Pages.PuntosVenta.Vista },
    { path: "/scv/puntosventa/:id", component: EK.Modules.SCV.Pages.PuntosVenta.Edicion },
    { path: "/scv/prototipos", component: EK.Modules.SCV.Pages.Prototipos.Vista },
    { path: "/scv/prototipos/nuevo", component: EK.Modules.SCV.Pages.Prototipos.Edicion },
    { path: "/scv/prototipos/:id", component: EK.Modules.SCV.Pages.Prototipos.Edicion },
    { path: "/scv/UbicacionesFallaPrototipos/:id", component: EK.Modules.SCV.Pages.PrototiposUbicacionesFallas.Edicion },
    { path: "/scv/tiposCaracteristica", component: EK.Modules.SCV.Pages.TiposCaracteristicaAdicional.Vista },
    { path: "/scv/tiposCaracteristica/:id", component: EK.Modules.SCV.Pages.TiposCaracteristicaAdicional.Edicion },
    { path: "/scv/caracteristicaAdicional", component: EK.Modules.SCV.Pages.CaracteristicaAdicional.Vista },
    { path: "/scv/caracteristicaAdicional/:id", component: EK.Modules.SCV.Pages.CaracteristicaAdicional.Edicion },
    { path: "/scv/desarrollos", component: EK.Modules.SCV.Pages.Desarrollos.Vista },
    { path: "/scv/desarrollos/:id", component: EK.Modules.SCV.Pages.Desarrollos.Edicion },
    { path: "/scv/ubicaciones", component: EK.Modules.SCV.Pages.Ubicaciones.Vista },
    { path: "/scv/ubicaciones/:id", component: EK.Modules.SCV.Pages.Ubicaciones.Edicion },
    { path: "/scv/estatusExpediente", component: EK.Modules.SCV.Pages.EstatusExpediente.Vista },
    { path: "/scv/estatusExpediente/:id", component: EK.Modules.SCV.Pages.EstatusExpediente.Edicion },
    { path: "/scv/sindicatos", component: EK.Modules.SCV.Pages.Sindicatos.Vista },
    { path: "/scv/sindicatos/:id", component: EK.Modules.SCV.Pages.Sindicatos.Edicion },
    { path: "/scv/centralesObreras", component: EK.Modules.SCV.Pages.CentralesObreras.Vista },
    { path: "/scv/centralesObreras/:id", component: EK.Modules.SCV.Pages.CentralesObreras.Edicion },
    { path: "/scv/tipoFinanciamiento", component: EK.Modules.SCV.Pages.TipoFinanciamiento.Vista },
    { path: "/scv/tipoFinanciamiento/:id", component: EK.Modules.SCV.Pages.TipoFinanciamiento.Edicion },
    { path: "/scv/motivosuspension", component: EK.Modules.SCV.Pages.MotivoSuspension.Vista },
    { path: "/scv/motivosuspension/:id", component: EK.Modules.SCV.Pages.MotivoSuspension.Edicion },
    { path: "/scv/notarios", component: EK.Modules.SCV.Pages.Notarios.Vista },
    { path: "/scv/notarios/:id", component: EK.Modules.SCV.Pages.Notarios.Edicion },
    { path: "/scv/planesPagos", component: EK.Modules.SCV.Pages.SCVPlanesPagos.Vista },
    { path: "/scv/planesPagos/:id", component: EK.Modules.SCV.Pages.SCVPlanesPagos.Edicion },
    { path: "/scv/conceptosPago", component: EK.Modules.SCV.Pages.SCVConceptosPago.Vista },
    { path: "/scv/conceptosPago/:id", component: EK.Modules.SCV.Pages.SCVConceptosPago.Edicion },
    //{ path: "/scv/ventas", component: EK.Modules.SCV.Pages.Ventas.Vista },
    //{ path: "/scv/ventas/nuevo", component: EK.Modules.SCV.Pages.Ventas.Nuevo },
    { path: "/scv/ventas/:id", component: EK.Modules.SCV.Pages.Ventas.Edicion },
    //{ path: "/scv/ventas/esquema/:id", component: EK.Modules.SCV.Pages.Ventas.Ventas$Esquema },
    { path: "/scv/listaPrecios", component: EK.Modules.SCV.Pages.ListaPrecios.Vista },
    { path: "/scv/listaPrecios/:id", component: EK.Modules.SCV.Pages.ListaPrecios.Edicion },
    { path: "/scv/boletasProspeccion", component: EK.Modules.SCV.Pages.BoletaProspeccion.Vista },
    { path: "/scv/boletasProspeccion/:id", component: EK.Modules.SCV.Pages.BoletaProspeccion.Edicion },
    { path: "/scv/requisitos", component: EK.Modules.SCV.Pages.SCVRequisitos.Vista },
    { path: "/scv/requisitos/:id", component: EK.Modules.SCV.Pages.SCVRequisitos.Edicion },
    { path: "/scv/documentosExpediente", component: EK.Modules.SCV.Pages.SCVDocumentosExpediente.Vista },
    { path: "/scv/documentosExpediente/:id", component: EK.Modules.SCV.Pages.SCVDocumentosExpediente.Edicion },
    { path: "/scv/esquemas", component: EK.Modules.SCV.Pages.SCVEsquemas.Vista },
    { path: "/scv/esquemas/nuevo", component: EK.Modules.SCV.Pages.SCVEsquemas.Nuevo },
    { path: "/scv/esquemas/:id", component: EK.Modules.SCV.Pages.SCVEsquemas.Edicion },
    //{ path: "/scv/procesos", component: EK.Modules.SCV.Pages.SCVProcesos.Consulta },
    { path: "/scv/procesos", component: EK.Modules.SCV.Pages.Procesos.Vista },
    { path: "/scv/procesos/:id", component: EK.Modules.SCV.Pages.Procesos.Edicion },


    { path: "/scv/OrigenLead", component: EK.Modules.SCV.Pages.OrigenLead.Vista },
    { path: "/scv/OrigenLead/:id", component: EK.Modules.SCV.Pages.OrigenLead.Edicion },


    { path: "/scv/expedientes/documentos", component: EK.Modules.SCV.Pages.ExpedientesDocumentos.Vista },


    { path: "/scv/expedientes", component: EK.Modules.SCV.Pages.Expedientes.Vista },
    { path: "/scv/expedientes/configuracion/:id", component: EK.Modules.SCV.Pages.Expedientes.Edicion },
    { path: "/scv/expedientes/:id", component: EK.Modules.SCV.Pages.SeguimientoExpedientes.Edicion },
    { path: "/scv/expedientes/v2/:id", component: EK.Modules.SCV.Pages.SeguimientoExpedientes.V2.Edicion },

    { path: "/scv/ExpedientesEnFiniquito", component: EK.Modules.SCV.Pages.ExpedientesEnFiniquito.Vista },
    { path: "/scv/ExpedientesGenerarPoliza", component: EK.Modules.SCV.Pages.ExpedientesGenerarPoliza.Vista },
    { path: "/scv/ExpedientesPorEscriturar", component: EK.Modules.SCV.Pages.ExpedientesEnEscrituracion.Vista },
    { path: "/scv/ExpedientesPorEscriturar/:id", component: EK.Modules.SCV.Pages.ExpedientesEnEscrituracion.Edicion },

    { path: "/scv/expedientesCanceladosSuspendidos", component: EK.Modules.SCV.Pages.Expedientes.Reportes.CanceladosSuspendidos.Vista },
    { path: "/scv/expedientesAnalisisPorEtapas", component: EK.Modules.SCV.Pages.Expedientes.Reportes.AnalisisPorEtapa.Vista },



    { path: "/scv/AprobacionComisiones", component: EK.Modules.SCV.Pages.Comisiones.AprobacionComisiones.Vista },
    //{ path: "/scv/AprobacionComisiones/:id", component: EK.Modules.SCV.Pages.Comisiones.AprobacionComisiones.Edicion },
    { path: "/scv/ComisionesAjustes/:id", component: EK.Modules.SCV.Pages.Comisiones.Ajustes.Edicion },

    //{ path: "/scv/AprobacionComisiones", component: EK.Modules.SCV.Pages.Comisiones.AprobacionComisiones.Vista },
    // { path: "/scv/AprobacionComisiones/:id", component: EK.Modules.SCV.Pages.Comisiones.AprobacionComisiones.Edicion },

    { path: "/scv/ComisionesAjustes", component: EK.Modules.SCV.Pages.Comisiones.Ajustes.Vista },
    { path: "/scv/ComisionesCalculo", component: EK.Modules.SCV.Pages.Comisiones.Vista },
    { path: "/scv/ComisionesConfiguracion", component: EK.Modules.SCV.Pages.Comisiones.ConfiguracionComisiones },

    { path: "/scv/TmComisiones", component: EK.Modules.SCV.Pages.TmComisiones.Vista },
    { path: "/scv/TmComisiones/:id", component: EK.Modules.SCV.Pages.TmComisiones.Edicion },

    { path: "/scv/Regimen", component: EK.Modules.SCV.Pages.Regimen.Vista },
    { path: "/scv/Regimen/:id", component: EK.Modules.SCV.Pages.Regimen.Edicion },
    { path: "/scv/TiposCambio", component: EK.Modules.SCV.Pages.TiposCambio.Vista },
    { path: "/scv/TiposCambio/:id", component: EK.Modules.SCV.Pages.TiposCambio.Edicion },


    
    { path: "/scv/pv/UbicacionesFalla", component: EK.Modules.SCV.Pages.postventa.UbicacionesFalla.Vista },
    { path: "/scv/pv/UbicacionesFalla/:id", component: EK.Modules.SCV.Pages.postventa.UbicacionesFalla.Edicion },
    { path: "/scv/pv/UbicacionComun", component: EK.Modules.SCV.Pages.postventa.RUBA.UbicacionComun.Vista },
    { path: "/scv/pv/UbicacionComun/:id", component: EK.Modules.SCV.Pages.postventa.RUBA.UbicacionComun.Edicion },
    { path: "/scv/pv/TipoContratista", component: EK.Modules.SCV.Pages.postventa.RUBA.TipoContratista.Vista },
    { path: "/scv/pv/TipoContratista/:id", component: EK.Modules.SCV.Pages.postventa.RUBA.TipoContratista.Edicion },
    { path: "/scv/pv/OrigenFalla", component: EK.Modules.SCV.Pages.postventa.OrigenFalla.Vista },
    { path: "/scv/pv/OrigenFalla/:id", component: EK.Modules.SCV.Pages.postventa.OrigenFalla.Edicion },
    { path: "/scv/pv/RezagosEntrega", component: EK.Modules.SCV.Pages.postventa.RUBA.RezagosEntrega.Vista },
    { path: "/scv/pv/RezagosEntrega/:id", component: EK.Modules.SCV.Pages.postventa.RUBA.RezagosEntrega.Edicion },
    { path: "/scv/pv/MotivosCancelacionPV", component: EK.Modules.SCV.Pages.postventa.MotivosCancelacionPV.Vista },
    { path: "/scv/pv/MotivosCancelacionPV/:id", component: EK.Modules.SCV.Pages.postventa.MotivosCancelacionPV.Edicion },
    { path: "/scv/pv/CausasReprogramacion", component: EK.Modules.SCV.Pages.postventa.RUBA.CausasReprogramacion.Vista },
    { path: "/scv/pv/CausasReprogramacion/:id", component: EK.Modules.SCV.Pages.postventa.RUBA.CausasReprogramacion.Edicion },

    { path: "/scv/pv/TiposComponentes", component: EK.Modules.SCV.Pages.postventa.TiposComponentes.Vista },
    { path: "/scv/pv/TiposComponentes/:id", component: EK.Modules.SCV.Pages.postventa.TiposComponentes.Edicion },

    { path: "/scv/pv/Falla", component: EK.Modules.SCV.Pages.postventa.Falla.Vista },
    { path: "/scv/pv/Falla/:id", component: EK.Modules.SCV.Pages.postventa.Falla.Edicion },

    { path: "/scv/pv/ComponentesIncidencias", component: EK.Modules.SCV.Pages.postventa.ComponentesIncidencias.Vista },
    { path: "/scv/pv/ComponentesIncidencias/:id", component: EK.Modules.SCV.Pages.postventa.ComponentesIncidencias.Edicion },


   
    { path: "/scv/pv/TipoFallaAreaComun", component: EK.Modules.SCV.Pages.postventa.RUBA.TipoFallaAreaComun.Vista },
    { path: "/scv/pv/TipoFallaAreaComun/:id", component: EK.Modules.SCV.Pages.postventa.RUBA.TipoFallaAreaComun.Edicion },
    { path: "/scv/Plaza", component: EK.Modules.SCV.Pages.Plaza.Vista },
    { path: "/scv/Plaza/:id", component: EK.Modules.SCV.Pages.Plaza.Edicion },
    { path: "/scv/pv/DocumentosImpresion/:id", component: EK.Modules.SCV.Pages.postventa.RUBA.DocumentosImpresion.Edicion },
    { path: "/scv/pv/DocumentosImpresion", component: EK.Modules.SCV.Pages.postventa.RUBA.DocumentosImpresion.Vista },
    { path: "/scv/pv/MediosComunicacion", component: EK.Modules.SCV.Pages.postventa.MediosComunicacion.Vista },
    { path: "/scv/pv/MediosComunicacion/:id", component: EK.Modules.SCV.Pages.postventa.MediosComunicacion.Edicion },
    { path: "/scv/pv/PersonalEntregaUbicaciones", component: EK.Modules.SCV.Pages.postventa.RUBA.PersonalEntregaUbicaciones.Edicion },
    { path: "/scv/pv/SPVSupervisoresCoordinadores", component: EK.Modules.SCV.Pages.postventa.RUBA.SPVSupervisoresCoordinadores.Edicion },
    { path: "/scv/pv/SPVFraccionamientosCAT", component: EK.Modules.SCV.Pages.postventa.RUBA.SPVFraccionamientoCAT.Edicion },
    { path: "/scv/pv/SPVSupervisoresCAT", component: EK.Modules.SCV.Pages.postventa.RUBA.SPVSupervisoresCAT.Edicion },
    { path: "/scv/pv/ConsultaPreparacionVivienda", component: EK.Modules.SCV.Pages.postventa.RUBA.ConsultaPreparacionVivienda.Vista },
    { path: "/scv/pv/ConfigViviendaEntregable", component: EK.Modules.SCV.Pages.postventa.RUBA.ConfigViviendaEntregable.Vista },
    { path: "/scv/pv/ConsultaViviendaEntregable", component: EK.Modules.SCV.Pages.postventa.RUBA.ConsultaViviendaEntregable.Vista },
    { path: "/scv/pv/CapturaFechaConstruccion", component: EK.Modules.SCV.Pages.postventa.RUBA.CapturaFechaConstruccion.Vista },
    { path: "/scv/pv/EntregaPaquetes", component: EK.Modules.SCV.Pages.postventa.RUBA.EntregaPaquetes.Vista },
   // { path: "/scv/pv/DashBoard", component: EK.Modules.SCV.Pages.postventa.RUBA.DashBoardFallas.Vista },
    { path: "/scv/pv/ContratistasUbicaciones", component: EK.Modules.SCV.Pages.postventa.RUBA.ContratistasUbicaciones.Edicion },
    { path: "/scv/pv/reportesFallas/:id", component: EK.Modules.SCV.Pages.postventa.RUBA.ReportesFallas.Edicion },
    { path: "/scv/pv/ReportesFallasActualizador", component: EK.Modules.SCV.Pages.postventa.RUBA.ReportesFallasActualizador.Edicion },
    { path: "/scv/pv/ReportesFallasConsulta", component: EK.Modules.SCV.Pages.postventa.RUBA.ReportesFallasConsulta.Vista },
    { path: "/scv/pv/ContribucionPorPlaza", component: EK.Modules.SCV.Pages.postventa.RUBA.ContribucionPorPlaza.Vista },
    { path: "/scv/pv/ConsultaFallasIncidencias", component: EK.Modules.SCV.Pages.postventa.RUBA.ConsultaFallasIncidencias.Vista },
    { path: "/scv/pv/ConsultaChecklistPendiente", component: EK.Modules.SCV.Pages.postventa.RUBA.ConsultaChecklistPendiente.Vista },
    { path: "/scv/pv/DashBoardFailureReport", component: EK.Modules.SCV.Pages.postventa.RUBA.DashBoardFailureReport.Vista },
    { path: "/scv/pv/DashBoardFailureReport/:id", component: EK.Modules.SCV.Pages.postventa.RUBA.ReportesFallas.Edicion },
    { path: "/scv/pv/ReporteEncuestaSatisfaccion", component: EK.Modules.SCV.Pages.postventa.RUBA.ReporteEncuestaSatisfaccion.Vista },
    { path: "/scv/pv/ReporteSeguimientoVivProg", component: EK.Modules.SCV.Pages.postventa.RUBA.ReporteSeguimientoVivProg.Vista },
    { path: "/scv/pv/ReporteBienesAdicionales", component: EK.Modules.SCV.Pages.Reportes.BienesAdicionales.Vista },
    { path: "/scv/pv/RadarClientes", component: EK.Modules.SCV.Pages.postventa.RUBA.RadarClientes.Edicion },
    { path: "/scv/pv/ReporteRadarClientes", component: EK.Modules.SCV.Pages.Reportes.ReporteRadarClientes.Vista },
    { path: "/scv/pv/RadarComunidades", component: EK.Modules.SCV.Pages.postventa.RUBA.RadarComunidades.Edicion },
    { path: "/scv/pv/ReporteRadarComunidades", component: EK.Modules.SCV.Pages.Reportes.ReporteRadarComunidades.Vista },
    { path: "/scv/pv/DescargaMasivaPDF", component: EK.Modules.SCV.Pages.postventa.RUBA.DescargaMasivaPDF.Vista },
    { path: "/scv/pv/ReporteFoliosVivienda", component: EK.Modules.SCV.Pages.Reportes.ReporteFoliosVivienda.Vista },


    { path: "/scv/pv/ActualizadorRelContLote", component: EK.Modules.SCV.Pages.postventa.RUBA.ReporteSeguimientoVivProg.Vista },

    { path: "/scv/pv/Tickets", component: EK.Modules.SCV.Pages.postventa.Tickets.Vista },
    { path: "/scv/pv/Tickets/:id", component: EK.Modules.SCV.Pages.postventa.Tickets.Edicion },

    { path: "/scv/pv/PlanCompromisosConstruccion", component: EK.Modules.SCV.Pages.postventa.PlanCompromisosConstruccion.Vista },
    { path: "/scv/pv/PlanCompromisosEntrega", component: EK.Modules.SCV.Pages.postventa.PlanCompromisosEntrega.Vista },
    { path: "scv/pv/DashboardPlanificacion", component: EK.Modules.SCV.Pages.postventa.SPVPlanificacionComponentDashboard.Vista },


    { path: "/scv/ListasMkt", component: EK.Modules.SCV.Pages.ListasMkt.Vista },
    { path: "/scv/ListasMkt/:id", component: EK.Modules.SCV.Pages.ListasMkt.Edicion },
    { path: "/scv/Origen", component: EK.Modules.SCV.Pages.Origen.Vista },
    { path: "/scv/Origen/:id", component: EK.Modules.SCV.Pages.Origen.Edicion },
    { path: "/scv/pv/DashBoardPostSaleCalendar", component: EK.Modules.SCV.Pages.postventa.RUBA.AgendaModoPostVenta.Vista },
    { path: "/scv/pv/DashBoardContractorCalendar", component: EK.Modules.SCV.Pages.postventa.RUBA.AgendaModoReporteFalla.Vista },
    { path: "/scv/SeguimientoCampaniaPublicidad", component: EK.Modules.SCV.Pages.SeguimientoCampaniaPublicidad.Vista },
    { path: "/scv/SeguimientoCampaniaPublicidad/:id", component: EK.Modules.Kontrol.Pages.SeguimientoCampaniaPublicidad.Edicion },
    { path: "/scv/tiposproceso", component: EK.Modules.SCV.Pages.TipodeProceso.Vista },
    { path: "/scv/tiposproceso/:id", component: EK.Modules.SCV.Pages.TipodeProceso.Edicion },
    { path: "/scv/reporteboletasprospeccion", component: EK.Modules.SCV.Pages.ReporteBoletasProspeccion.Vista },
    { path: "/scv/reporteexpedientes", component: EK.Modules.SCV.Pages.ReporteExpedientes.Vista },
    { path: "/scv/reporteprospectosclientes", component: EK.Modules.SCV.Pages.ReporteProspectosClientes.Vista },
    { path: "/scv/reporteanaliticoprospectos", component: EK.Modules.SCV.Pages.ReporteAnaliticoProspectos.Vista },
    { path: "/scv/reporteInformativoMacroEtapas", component: EK.Modules.SCV.Pages.Reportes.InformativoMacroEtapas.Vista },
    { path: "/scv/reporteFuerzaVentas", component: EK.Modules.SCV.Pages.Reportes.FuerzaVentas.Vista },
    { path: "/scv/reporteForecast", component: EK.Modules.SCV.Pages.Reportes.ReporteForecast.Vista },


    { path: "/scv/pv/prereportes", component: EK.Modules.SCV.Pages.postventa.RUBA.Prereporte.Vista },
    { path: "/scv/pv/prereportes/:id", component: EK.Modules.SCV.Pages.postventa.RUBA.Prereporte.Edicion },
    { path: "/scv/pv/SupervisoresUbicaciones", component: EK.Modules.SCV.Pages.postventa.RUBA.SupervisoresUbicaciones.Edicion },
    { path: "/scv/pv/ReversarEntregaUbicacion", component: EK.Modules.SCV.Pages.postventa.RUBA.ReversarEntregaUbicacion.Vista },
    { path: "/scv/pv/BitacoraEspSPVCliente", component: EK.Modules.SCV.Pages.postventa.RUBA.BitacoraEspSPVCliente.Edicion },
    { path: "/scv/pv/ModificadorFechaAgenda", component: EK.Modules.SCV.Pages.postventa.RUBA.ModificadorFechaAgenda.Edicion },
    { path: "/scv/pv/SPVCheckList", component: EK.Modules.SCV.Pages.postventa.SPVCheckList.Vista },
    { path: "/scv/pv/SPVCheckList/:id", component: EK.Modules.SCV.Pages.postventa.SPVCheckList.Edicion },
    { path: "/scv/pv/ResponsableEntregaDesarrollos", component: EK.Modules.SCV.Pages.postventa.ResponsableEntregaDesarrollos.Edicion },          
    { path: "/scv/pv/SPVCheckList/:id", component: EK.Modules.SCV.Pages.postventa.SPVCheckList.Edicion },
    { path: "/scv/pv/ModificarDatosCliente", component: EK.Modules.SCV.Pages.postventa.RUBA.ModificarDatosCliente.Edicion },
    { path: "/scv/Reasignacion", component: EK.Modules.SCV.Pages.Reasignacion.Vista },

    { path: "/scv/Interface", component: EK.Modules.SCV.Pages.Interface.Vista },


    { path: "/scv/reporteconsultaprospectos", component: EK.Modules.SCV.Pages.ReporteConsultaProspectos.Vista },

    { path: "/scv/AnalisisProspecto", component: EK.Modules.SCV.Pages.AnalisisProspecto.Vista },

    { path: "/scv/AnalisisProspecto/:id", component: EK.Modules.SCV.Pages.AnalisisProspecto.Edicion },
    //======================================
    //REPORTE DE FALLAS AREAS COMUNES
    //======================================
    { path: "/scv/pv/DashboardReporteFallasAreasComunes", component: EK.Modules.SCV.Pages.postventa.RUBA.DashboardReporteFallasAreasComunes.Vista },
    { path: "/scv/pv/DashboardReporteFallasAreasComunes/:id", component: EK.Modules.SCV.Pages.postventa.RUBA.ReporteFallasAreasComunes.Edicion },
    { path: "/scv/pv/reporteFallasAreasComunes/:id", component: EK.Modules.SCV.Pages.postventa.RUBA.ReporteFallasAreasComunes.Edicion },
    { path: "/scv/pv/AgendaAreasComunes", component: EK.Modules.SCV.Pages.postventa.RUBA.AgendaModoReporteFallaAreasComunes.Vista },
    { path: "/scv/pv/ConsultaReporteAreasComunes", component: EK.Modules.SCV.Pages.postventa.RUBA.ReporteFallasAreasComunesConsulta.Vista },
    { path: "/scv/pv/ActualizadorAreasComunes", component: EK.Modules.SCV.Pages.postventa.RUBA.ReporteFallasAreasComunesActualizador.Edicion },
    { path: "/scv/pv/CorreoDiario", component: EK.Modules.SCV.Pages.postventa.RUBA.EnviarCorreoResumenDiario.Edicion },
    { path: "/scv/pv/reporteAnalisisComunidades", component: EK.Modules.SCV.Pages.Reportes.AnalisisComunidades.Edicion },
    { path: "/scv/pv/ConsultaReporteAnalisisComunidades", component: EK.Modules.SCV.Pages.Reportes.ConsultaAnalisisComunidades.Vista },
    { path: "/scv/pv/ConsultaReporteIncidenciasNoVigentes", component: EK.Modules.SCV.Pages.Reportes.ConsultaIncidenciasNoVigentes.Vista },
    { path: "/scv/pv/ConsultaIncidenciasEntregaVivienda", component: EK.Modules.SCV.Pages.Reportes.ConsultaIncidenciasEntregaVivienda.Vista },

    //
     { path: "/scv/pv/reporteDatosSega", component: EK.Modules.SCV.Pages.Reportes.DatosSega.Vista },
    //=============================================
    //REPORTE VIVIENDAS PENDIENTES DE ENTREGA
    //=============================================
    { path: "/scv/pv/ClasificacionViviendaPendiente", component: EK.Modules.SCV.Pages.postventa.RUBA.ClasificacionViviendaPendienteEntrega.Vista },
    { path: "/scv/pv/ConsultaClasificacionVP", component: EK.Modules.SCV.Pages.postventa.RUBA.ConsultaClasificacionViviendaPendienteEntrega.Vista },
    { path: "/scv/pv/ConsultaPromedioDias", component: EK.Modules.SCV.Pages.postventa.RUBA.ConsultaClasificacionPromedioDiasEntrega.Vista },
    //=============================================
    //CONSULTA DE REINCIDENCIAS
    //=============================================
    { path: "/scv/pv/ConsultaReincidencias", component: EK.Modules.SCV.Pages.postventa.RUBA.ConsultaReincidencias.Vista },

    //=============================================
    //CONSULTA REPORTE PREDICTIVO
    //=============================================
    { path: "/scv/pv/ReportePredictivo", component: EK.Modules.SCV.Pages.postventa.RUBA.ReportePredictivo.Vista },
    //=============================================
    //COMPARATIVA DE INCIDENCIAS
    //=============================================
    { path: "/scv/pv/ComparativaIncidencias", component: EK.Modules.SCV.Pages.postventa.RUBA.ComparativaIncidencias.Vista },
    //=============================================
    // CONSULTA DE DIAS PROMEDIO DE ATENCION
    //=============================================
    { path: "/scv/pv/DiasPromedioAtencion", component: EK.Modules.SCV.Pages.postventa.RUBA.ConsultaDiasPromedioAtencion.Vista },
    //=============================================
    // REPORTEAPP
    //=============================================
    { path: "/scv/pv/ReporteApp", component: EK.Modules.SCV.Pages.postventa.RUBA.ReporteApp.Vista },
    //=============================================
    // CATALOGOS  
    //=============================================
    { path: "/scv/pv/catFallasAreasComunes", component: EK.Modules.SCV.Pages.postventa.RUBA.CatFallasAreasComunes.Vista },
    { path: "/scv/pv/catFallasNuevoCatalogo", component: EK.Modules.SCV.Pages.postventa.RUBA.CatFallasNuevoCatalogo.Vista },
    { path: "/scv/pv/catCoordinadores", component: EK.Modules.SCV.Pages.postventa.RUBA.CatCoordinadores.Vista },
    { path: "/scv/pv/CatComponentes", component: EK.Modules.SCV.Pages.postventa.RUBA.CatComponentes.Vista },
    { path: "/scv/pv/CatConfiguracionDocumentos", component: EK.Modules.SCV.Pages.postventa.RUBA.CatConfiguracionDocumentos.Vista },
    { path: "/scv/pv/ConfigCorreoEquipamiento", component: EK.Modules.SCV.Pages.postventa.RUBA.ConfigCorreoEquipamiento.Vista },
    //=============================================
    // REPORTEENCUESTAENTREGAVIVIENDA
    //=============================================
    { path: "/scv/pv/ReporteEnViEn", component: EK.Modules.SCV.Pages.postventa.RUBA.ReporteEncuestaVivienda.Vista },

    //=============================================
    // DESARROLLO COMUNITARIO  
    //=============================================
    { path: "/scv/pv/EncuestaPoblacional", component: EK.Modules.SCV.Pages.postventa.RUBA.EncuestaPoblacional.Vista },
    { path: "/scv/pv/ConsultaEncuestaPoblacional", component: EK.Modules.SCV.Pages.postventa.RUBA.ConsultaEncuestaPoblacional.Vista }, 
    { path: "/scv/pv/EventosActividades", component: EK.Modules.SCV.Pages.postventa.RUBA.EventosActividades.Vista }, 
    { path: "/scv/pv/ConsultaEventosActAlta", component: EK.Modules.SCV.Pages.postventa.RUBA.ConsultaEventosActAlta.Vista }, 
    { path: "/scv/pv/ConsultaEventosActCaptura", component: EK.Modules.SCV.Pages.postventa.RUBA.ConsultaEventosActCaptura.Vista }, 
    { path: "/scv/pv/ConsultaEventosActPPC", component: EK.Modules.SCV.Pages.postventa.RUBA.ConsultaEventosActPPC.Vista }, 
    { path: "/scv/pv/ComiteAreaGeografica", component: EK.Modules.SCV.Pages.postventa.RUBA.ComiteAreaGeografica.Vista }, 
    { path: "/scv/pv/ComiteInformacionComite", component: EK.Modules.SCV.Pages.postventa.RUBA.ComiteInformacionComite.Vista }, 
    { path: "/scv/pv/ComiteReuniones", component: EK.Modules.SCV.Pages.postventa.RUBA.ComiteReuniones.Vista }, 
    { path: "/scv/pv/ComiteReunionesAgenda", component: EK.Modules.SCV.Pages.postventa.RUBA.ComiteReunionesAgenda.Vista }, 
    { path: "/scv/pv/ComiteReunionesGraficas", component: EK.Modules.SCV.Pages.postventa.RUBA.ComiteReunionesGraficas.Vista }, 
    { path: "/scv/pv/AsociacionCivil", component: EK.Modules.SCV.Pages.postventa.RUBA.AsociacionCivil.Vista },
    { path: "/scv/pv/MesaDirectiva", component: EK.Modules.SCV.Pages.postventa.RUBA.MesaDirectiva.Vista }, 
    { path: "/scv/pv/ReconocimientosRuba", component: EK.Modules.SCV.Pages.postventa.RUBA.ReconocimientosRuba.Vista }, 

    { path: "/scv/pv/DashBoardMensajeria", component: EK.Modules.SCV.Pages.postventa.DashboardMensajeria.Vista },
];

EK.Store.BaseRouter = EK.Store.BaseRouter.concat(___SCVBaseRouter);