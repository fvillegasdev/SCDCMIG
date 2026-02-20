using System;


/*Base*/

using mKontrol = EK.Modelo.Kontrol;
using dKontrol = EK.Datos.Kontrol;
using pKontrol = EK.Procesos.Kontrol;

/*Banco*/
using mSBO = EK.Modelo.SBO;
//using dSBO = EK.Datos.SBO;
//using pSBO = EK.Procesos.SBO;


/*Construccion*/
using mSCCO = EK.Modelo.SCCO;
using dSCCO = EK.Datos.SCCO;
using pSCCO = EK.Procesos.SCCO;

using mSCO = EK.Modelo.SCO;
using dSCO = EK.Datos.SCO;
using pSCO = EK.Procesos.SCO;


using mSCP = EK.Modelo.SCP;
using dSCP = EK.Datos.SCP;
using pSCP = EK.Procesos.SCP;

/*Desarrollo comunitario*/

using mSDC = EK.Modelo.SDC;
using dSDC = EK.Datos.SDC;
using pSDC = EK.Procesos.SDC;

/*Vivienda*/
using mSCV = EK.Modelo.SCV;
using dSCV = EK.Datos.SCV;
using pSCV = EK.Procesos.SCV;

/*Gestión de Proyectos SGP*/
using mSGP = EK.Modelo.SGP;
using dSGP = EK.Datos.SGP;
using pSGP = EK.Procesos.SGP;


using EK.Common.Managers;

using SimpleInjector;
using System.Configuration;

namespace EK.Utils
{
//    public static class BootstrapperKontrolWeb
//    {
//        private static object thisLock = new object();
//        private static Container container;
//        private static readonly Lazy<Container> singleton = new Lazy<Container>(() =>
//        {
//            container = new Container();
//            container.Options.AllowOverridingRegistrations = true;

//            #region LocalOrRemote
//#if LOCAL
//            container.Register<EK.Utils.ServiceCommandLocal>();
//            container.Register<IAPIClient, APIClientLocal>();
//#else
//            container.Register<IAPIClient, APIClientRemote>();

//            container.Register<EK.Utils.ServiceCommandRemote>();
//#endif
//            #endregion

//            return container;
//        }, System.Threading.LazyThreadSafetyMode.PublicationOnly);

//        //        public static void Bootstrap()
//        //        {
//        //            container = new Container();

//        //            container.Options.AllowOverridingRegistrations = true;

//        //            #region LocalOrRemote
//        //#if LOCAL
//        //            container.Register<EK.Utils.ServiceCommandLocal>();
//        //            container.Register<IAPIClient, APIClientLocal>();
//        //#else
//        //            container.Register<IAPIClient, APIClientRemote>();
//        //            container.Register<EK.Utils.ServiceCommandRemote>();
//        //#endif
//        //            #endregion
//        //        }

//        public static Container Container
//        {
//            get
//            {
//                return singleton.Value;
//                //lock (thisLock)
//                //{
//                //    if (container == null)
//                //    {
//                //        Bootstrap();
//                //    }
//                //}

//                //return container;
//            }
//        }
//    }

    //public class KontrolBaseInterceptor : IInterceptor
    //{
    //    public KontrolBaseInterceptor()
    //    {
    //    }

    //    public void Intercept(IInvocation invocation)
    //    {
    //        // Calls the decorated instance.
    //        invocation.Proceed();
    //    }
    //}

    public static class BootstrapperKontrolAPI
    {
        //private static Container container;
        //private static EK.Utils.CommandManager commandManager;
        private static object thisLock = new object();
        private static string storageTarget = ConfigurationManager.AppSettings["drivers:storage:target"];

        public static Container Bootstrap()
        {
            Container container = new Container();

            container.Options.AllowOverridingRegistrations = true;
#if LOCAL
            container.Register<EK.Utils.IServiceCommand, EK.Utils.ServiceCommandLocal>();
            container.Register<IAPIClient, APIClientLocal>();
#else
            container.Register<IAPIClient, APIClientRemote>();
            container.Register<EK.Utils.IServiceCommand, EK.Utils.ServiceCommandRemote>();
#endif
            container.Register<EK.Utils.CommandManager>();
            //container.InterceptWith<KontrolBaseInterceptor>(serviceType => serviceType.GetInterface("IBaseKontrol") != null);
            //container.RegisterSingleton<KontrolBaseInterceptor>();
            //System.Type t = EntityBuilderProxy.Build<mKontrol.Interfaces.IMoneda>();
            //EntityBuilderProxy.Build<mKontrol.Interfaces.IWorkflowInstance>();

            //var nt = (mKontrol.Interfaces.IMoneda) System.Activator.CreateInstance(t);

            #region "Registro de tipos de Modelo"

            //container.Register<mKontrol.Interfaces.IUsuario, mKontrol.Usuario>();
            //container.Register<mKontrol.Interfaces.IWorkflowInstance, mKontrol.Interfaces.IWorkflowInstance>();
            //container.Register<mKontrol.Interfaces.ITareaInstancia, mKontrol.TareaInstancia>();
            //container.Register<mKontrol.Interfaces.ITareaInstanciaDocumentos, mKontrol.DocumentosTareaInstancia>();
            //container.Register<mKontrol.Interfaces.IWorkflowReference, mKontrol.WorkflowReference>();
            //container.Register<mKontrol.Interfaces.IPlantillasMails, mKontrol.PlantillasMails>();
            //container.Register<mKontrol.Interfaces.IMessageNotification, mKontrol.MessageNotification>();
            //container.Register<mKontrol.Interfaces.ICompania, mKontrol.Compania>();
            //container.Register<mKontrol.Interfaces.ILocalidad, mKontrol.Localidades>();
            //container.Register<mKontrol.Interfaces.IAsentamiento, mKontrol.Asentamientos>();
            //container.Register<mKontrol.Interfaces.IMoneda, mKontrol.Moneda>();
            //container.Register<mKontrol.Interfaces.INivel, mKontrol.Niveles>();

            container.Register(typeof(mKontrol.Interfaces.IBitacora), EntityBuilderProxy.Build<mKontrol.Interfaces.IBitacora>());
            container.Register(typeof(mKontrol.Interfaces.IBitacoraEventos), EntityBuilderProxy.Build<mKontrol.Interfaces.IBitacoraEventos>());

            container.Register<mKontrol.Interfaces.ICommandQuery, mKontrol.CommandQuery>();
            container.Register<mKontrol.Interfaces.ICommandResult, mKontrol.CommandResult>();
            //container.Register<mKontrol.Interfaces.IDominios, mKontrol.Interfaces.ICliente>();
            container.Register<mKontrol.Interfaces.IBaseUsuario, mKontrol.BaseUsuario>();
            container.Register(typeof(mKontrol.Interfaces.IUnidadMedida), EntityBuilderProxy.Build<mKontrol.Interfaces.IUnidadMedida>());
            container.Register(typeof(mKontrol.Interfaces.ICompania), EntityBuilderProxy.Build<mKontrol.Interfaces.ICompania>());
            container.Register(typeof(mKontrol.Interfaces.IModulo), EntityBuilderProxy.Build<mKontrol.Interfaces.IModulo>());
            container.Register(typeof(mKontrol.Interfaces.IOpcion), EntityBuilderProxy.Build<mKontrol.Interfaces.IOpcion>());
            container.Register(typeof(mKontrol.Interfaces.IUsuario), EntityBuilderProxy.Build<mKontrol.Interfaces.IUsuario>());
            container.Register(typeof(mKontrol.Interfaces.IUsuarioKontrol), EntityBuilderProxy.Build<mKontrol.Interfaces.IUsuarioKontrol>());
            container.Register(typeof(mKontrol.Interfaces.IUsuarioToken), EntityBuilderProxy.Build<mKontrol.Interfaces.IUsuarioToken>());
            container.Register(typeof(mKontrol.Interfaces.ICalendarEvent), EntityBuilderProxy.Build<mKontrol.Interfaces.ICalendarEvent>());
            container.Register(typeof(mKontrol.Interfaces.ICalendar), EntityBuilderProxy.Build<mKontrol.Interfaces.ICalendar>());
            container.Register(typeof(mKontrol.Interfaces.IGantt), EntityBuilderProxy.Build<mKontrol.Interfaces.IGantt>());
            container.Register(typeof(mKontrol.Interfaces.IGanttTask), EntityBuilderProxy.Build<mKontrol.Interfaces.IGanttTask>());
            container.Register(typeof(mKontrol.Interfaces.IOpcionAbrirOT), EntityBuilderProxy.Build<mKontrol.Interfaces.IOpcionAbrirOT>());
            container.Register<mKontrol.Interfaces.IParametro, mKontrol.Parametro>();
            container.Register<mKontrol.Interfaces.IParametros, mKontrol.Parametros>();
            container.Register(typeof(mKontrol.Interfaces.ICatalogoGeneral), EntityBuilderProxy.Build<mKontrol.Interfaces.ICatalogoGeneral>());
            //container.Register(typeof(mKontrol.Interfaces.IChatConversacion), EntityBuilderProxy.Build<mKontrol.Interfaces.IChatConversacion>());
            //container.Register(typeof(mKontrol.Interfaces.IChatTema), EntityBuilderProxy.Build<mKontrol.Interfaces.IChatTema>());

            //container.Register<mKontrol.Interfaces.IParametro, mKontrol.Parametros>();

            container.Register<mKontrol.Interfaces.INotification, mKontrol.Notification>();
            container.Register(typeof(mKontrol.Interfaces.INotificacionMarcadores), EntityBuilderProxy.Build<mKontrol.Interfaces.INotificacionMarcadores>());
            container.Register(typeof(mKontrol.Interfaces.INotificacionUsuario), EntityBuilderProxy.Build<mKontrol.Interfaces.INotificacionUsuario>());
            container.Register(typeof(mKontrol.Interfaces.IAgendaFechaBloqueo), EntityBuilderProxy.Build<mKontrol.Interfaces.IAgendaFechaBloqueo>());

            container.Register<mKontrol.Interfaces.INotificationItem, mKontrol.NotificationItem>();
            container.Register<mKontrol.Interfaces.IItemGeneral, mKontrol.ItemGeneral>();
            container.Register(typeof(mKontrol.Interfaces.IMoneda), EntityBuilderProxy.Build<mKontrol.Interfaces.IMoneda>());

            container.Register(typeof(mKontrol.Interfaces.IAnios), EntityBuilderProxy.Build<mKontrol.Interfaces.IAnios>());
            container.Register(typeof(mKontrol.Interfaces.IPeriodicidad), EntityBuilderProxy.Build<mKontrol.Interfaces.IPeriodicidad>());
            container.Register(typeof(mKontrol.Interfaces.IPeriodicidadDetalle), EntityBuilderProxy.Build<mKontrol.Interfaces.IPeriodicidadDetalle>());

            //container.Register<mKontrol.Interfaces.ITipoWorkflow, mKontrol.Interfaces.ITipoWorkflow>();

            container.Register(typeof(mKontrol.Interfaces.ITipoWorkflow), EntityBuilderProxy.Build<mKontrol.Interfaces.ITipoWorkflow>());
            container.Register(typeof(mKontrol.Interfaces.IKontrolDocument), EntityBuilderProxy.Build<mKontrol.Interfaces.IKontrolDocument>());
            //container.Register<mKontrol.Interfaces.IWorkflow, mKontrol.Workflow>();
            //container.Register<mKontrol.Interfaces.INotificador, mKontrol.Notificador>();
            container.Register(typeof(mKontrol.Interfaces.ITarea), EntityBuilderProxy.Build<mKontrol.Interfaces.ITarea>());
            container.Register(typeof(mKontrol.Interfaces.IDominios), EntityBuilderProxy.Build<mKontrol.Interfaces.IDominios>());
            container.Register(typeof(mKontrol.Interfaces.ILicencia), EntityBuilderProxy.Build<mKontrol.Interfaces.ILicencia>());
            //container.Register<mKontrol.Interfaces.IReglaTarea, mKontrol.ReglaTarea>();
            container.Register(typeof(mKontrol.Interfaces.INivel), EntityBuilderProxy.Build<mKontrol.Interfaces.INivel>());
            container.Register(typeof(mKontrol.Interfaces.ILocalidad), EntityBuilderProxy.Build<mKontrol.Interfaces.ILocalidad>());
            container.Register(typeof(mKontrol.Interfaces.IWorkflowInstance), EntityBuilderProxy.Build<mKontrol.Interfaces.IWorkflowInstance>());
            container.Register(typeof(mKontrol.Interfaces.ITareaInstancia), EntityBuilderProxy.Build<mKontrol.Interfaces.ITareaInstancia>());
            container.Register<mKontrol.Interfaces.IOpcionModulo, mKontrol.OpcionModulo>();
            //container.Register<mKontrol.Interfaces.IModulo, mKontrol.Modulo>();
            container.Register<mKontrol.Interfaces.IUsuarioNivelCompania, mKontrol.UsuarioNivelCompania>();
            container.Register<mKontrol.Interfaces.IConfigurarParametros, mKontrol.ConfigurarParametros>();
            container.Register(typeof(mKontrol.Interfaces.IAsentamiento), EntityBuilderProxy.Build<mKontrol.Interfaces.IAsentamiento>());
            container.Register<mKontrol.Interfaces.IItemGeneralValores, mKontrol.ItemGeneralValores>();
            container.Register(typeof(mKontrol.Interfaces.IPlantillasMails), EntityBuilderProxy.Build<mKontrol.Interfaces.IPlantillasMails>());
            container.Register(typeof(mKontrol.Interfaces.IPlantillasLeads), EntityBuilderProxy.Build<mKontrol.Interfaces.IPlantillasLeads>());
            container.Register<mKontrol.Interfaces.IStorageTarea, mKontrol.StorageTarea>();
            container.Register<mKontrol.Interfaces.ITareaAsignado, mKontrol.TareaAsignado>();
            container.Register(typeof(mKontrol.Interfaces.ITipoClasificador), EntityBuilderProxy.Build<mKontrol.Interfaces.ITipoClasificador>());
            container.Register(typeof(mKontrol.Interfaces.IClasificador), EntityBuilderProxy.Build<mKontrol.Interfaces.IClasificador>());
            container.Register(typeof(mKontrol.Interfaces.ICatalogoClasificador), EntityBuilderProxy.Build<mKontrol.Interfaces.ICatalogoClasificador>());
            container.Register(typeof(mKontrol.Interfaces.IMessageNotification), EntityBuilderProxy.Build<mKontrol.Interfaces.IMessageNotification>());
            container.Register<mKontrol.Interfaces.IFavorito, mKontrol.Favorito>();
            container.Register(typeof(mKontrol.Interfaces.IPosicion), EntityBuilderProxy.Build<mKontrol.Interfaces.IPosicion>());
            container.Register(typeof(mKontrol.Interfaces.ICategoria), EntityBuilderProxy.Build<mKontrol.Interfaces.ICategoria>());
            container.Register<mKontrol.Interfaces.IDocumentoPago, mKontrol.DocumentoPago>();
            container.Register<mKontrol.Interfaces.ITipoCambio, mKontrol.TipoCambio>();
            container.Register(typeof(mKontrol.Interfaces.IAbono), EntityBuilderProxy.Build<mKontrol.Interfaces.IAbono>());

            container.Register(typeof(mKontrol.Interfaces.IKontrolFile), EntityBuilderProxy.Build<mKontrol.Interfaces.IKontrolFile>());
            container.Register(typeof(mKontrol.Interfaces.IKontrolFilesVersiones), EntityBuilderProxy.Build<mKontrol.Interfaces.IKontrolFilesVersiones>());

            container.Register(typeof(mKontrol.Interfaces.ICentrosCosto), EntityBuilderProxy.Build<mKontrol.Interfaces.ICentrosCosto>());
            container.Register(typeof(mKontrol.Interfaces.IPuesto), EntityBuilderProxy.Build<mKontrol.Interfaces.IPuesto>());
            container.Register(typeof(mKontrol.Interfaces.IReporte), EntityBuilderProxy.Build<mKontrol.Interfaces.IReporte>());
            container.Register(typeof(mKontrol.Interfaces.IReporteCampo), EntityBuilderProxy.Build<mKontrol.Interfaces.IReporteCampo>());
            container.Register(typeof(mKontrol.Interfaces.IReporteFiltro), EntityBuilderProxy.Build<mKontrol.Interfaces.IReporteFiltro>());
            container.Register(typeof(mKontrol.Interfaces.ITipoCambio), EntityBuilderProxy.Build<mKontrol.Interfaces.ITipoCambio>());
            container.Register(typeof(mKontrol.Interfaces.ICitas), EntityBuilderProxy.Build<mKontrol.Interfaces.ICitas>());
            container.Register(typeof(mKontrol.Interfaces.IEvento), EntityBuilderProxy.Build<mKontrol.Interfaces.IEvento>());
            container.Register(typeof(mKontrol.Interfaces.ITipoEvento), EntityBuilderProxy.Build<mKontrol.Interfaces.ITipoEvento>());
            container.Register(typeof(mKontrol.Interfaces.ITipoEntidad), EntityBuilderProxy.Build<mKontrol.Interfaces.ITipoEntidad>());
            container.Register(typeof(mKontrol.Interfaces.ITareaManual), EntityBuilderProxy.Build<mKontrol.Interfaces.ITareaManual>());
            container.Register(typeof(mKontrol.Interfaces.ITipoCitas), EntityBuilderProxy.Build<mKontrol.Interfaces.ITipoCitas>());
            container.Register(typeof(mKontrol.Interfaces.IGruposUsuario), EntityBuilderProxy.Build<mKontrol.Interfaces.IGruposUsuario>());
            container.Register(typeof(mKontrol.Interfaces.IBlogPost), EntityBuilderProxy.Build<mKontrol.Interfaces.IBlogPost>());
            container.Register(typeof(mKontrol.Interfaces.IBlogPostCategorias), EntityBuilderProxy.Build<mKontrol.Interfaces.IBlogPostCategorias>());

            container.Register(typeof(mKontrol.Interfaces.IConfiguracionFormulario), EntityBuilderProxy.Build<mKontrol.Interfaces.IConfiguracionFormulario>());
            container.Register(typeof(mKontrol.Interfaces.IIConfiguracionFormularioEntidad), EntityBuilderProxy.Build<mKontrol.Interfaces.IIConfiguracionFormularioEntidad>());
            container.Register(typeof(mKontrol.Interfaces.IPersonalizarCamposSecciones), EntityBuilderProxy.Build<mKontrol.Interfaces.IPersonalizarCamposSecciones>());

            container.Register(typeof(mKontrol.Interfaces.IUsuariosGrupoDetalle), EntityBuilderProxy.Build<mKontrol.Interfaces.IUsuariosGrupoDetalle>());
            container.Register(typeof(mKontrol.Interfaces.IGruposUsuarioDetalle), EntityBuilderProxy.Build<mKontrol.Interfaces.IGruposUsuarioDetalle>());
            container.Register(typeof(mKontrol.Interfaces.INotificadores), EntityBuilderProxy.Build<mKontrol.Interfaces.INotificadores>());
            container.Register(typeof(mKontrol.Interfaces.INotificadoresInstancia), EntityBuilderProxy.Build<mKontrol.Interfaces.INotificadoresInstancia>());
            container.Register(typeof(mKontrol.Interfaces.IVistas), EntityBuilderProxy.Build<mKontrol.Interfaces.IVistas>());
            container.Register(typeof(mKontrol.Interfaces.IVistaElemento), EntityBuilderProxy.Build<mKontrol.Interfaces.IVistaElemento>());
            container.Register(typeof(mKontrol.Interfaces.IEntidad), EntityBuilderProxy.Build<mKontrol.Interfaces.IEntidad>());
            container.Register(typeof(mKontrol.Interfaces.IEntidadCampo), EntityBuilderProxy.Build<mKontrol.Interfaces.IEntidadCampo>());
            container.Register(typeof(mKontrol.Interfaces.ITable), EntityBuilderProxy.Build<mKontrol.Interfaces.ITable>());
            container.Register(typeof(mKontrol.Interfaces.ITableField), EntityBuilderProxy.Build<mKontrol.Interfaces.ITableField>());
            container.Register(typeof(mKontrol.Interfaces.ITableJoin), EntityBuilderProxy.Build<mKontrol.Interfaces.ITableJoin>());
            container.Register(typeof(mKontrol.Interfaces.ITableCondition), EntityBuilderProxy.Build<mKontrol.Interfaces.ITableCondition>());
            container.Register(typeof(mKontrol.Interfaces.IQuery), EntityBuilderProxy.Build<mKontrol.Interfaces.IQuery>());
            container.Register(typeof(mKontrol.Interfaces.IWorkflow), EntityBuilderProxy.Build<mKontrol.Interfaces.IWorkflow>());
            container.Register(typeof(mKontrol.Interfaces.INivelesOpciones), EntityBuilderProxy.Build<mKontrol.Interfaces.INivelesOpciones>());
            container.Register(typeof(mKontrol.Interfaces.INivelesEtapas), EntityBuilderProxy.Build<mKontrol.Interfaces.INivelesEtapas>());
            container.Register(typeof(mKontrol.Interfaces.INivelesReportes), EntityBuilderProxy.Build<mKontrol.Interfaces.INivelesReportes>());
            container.Register(typeof(mKontrol.Interfaces.IPersonalizarCampo), EntityBuilderProxy.Build<mKontrol.Interfaces.IPersonalizarCampo>());
            container.Register(typeof(mKontrol.Interfaces.IPersonalizarCampoOpcion), EntityBuilderProxy.Build<mKontrol.Interfaces.IPersonalizarCampoOpcion>());
            container.Register(typeof(mKontrol.Interfaces.IPersonalizarCampo_Valor), EntityBuilderProxy.Build<mKontrol.Interfaces.IPersonalizarCampo_Valor>());
            container.Register(typeof(mKontrol.Interfaces.IPersonalizarCampoConfiguracion), EntityBuilderProxy.Build<mKontrol.Interfaces.IPersonalizarCampoConfiguracion>());
            container.Register(typeof(mKontrol.Interfaces.IAgenda), EntityBuilderProxy.Build<mKontrol.Interfaces.IAgenda>());
            container.Register(typeof(mKontrol.Interfaces.IAgendaEntVivienda), EntityBuilderProxy.Build<mKontrol.Interfaces.IAgendaEntVivienda>());
            container.Register(typeof(mKontrol.Interfaces.IClienteComentarios), EntityBuilderProxy.Build<mKontrol.Interfaces.IClienteComentarios>());
            container.Register(typeof(mKontrol.Interfaces.IAgendaIndicadores), EntityBuilderProxy.Build<mKontrol.Interfaces.IAgendaIndicadores>());
            container.Register(typeof(mKontrol.Interfaces.IModificarAgenda), EntityBuilderProxy.Build<mKontrol.Interfaces.IModificarAgenda>());
            container.Register(typeof(mKontrol.Interfaces.IHistorialCambioAgenda), EntityBuilderProxy.Build<mKontrol.Interfaces.IHistorialCambioAgenda>());
            container.Register(typeof(mKontrol.Interfaces.IProgramados), EntityBuilderProxy.Build<mKontrol.Interfaces.IProgramados>());
            container.Register(typeof(mKontrol.Interfaces.IPreparacionVivienda), EntityBuilderProxy.Build<mKontrol.Interfaces.IPreparacionVivienda>());
            container.Register(typeof(mKontrol.Interfaces.IPullNotifications), EntityBuilderProxy.Build<mKontrol.Interfaces.IPullNotifications>());
            container.Register(typeof(mKontrol.Interfaces.IPullNotificationsActions), EntityBuilderProxy.Build<mKontrol.Interfaces.IPullNotificationsActions>());
            container.Register(typeof(mKontrol.Interfaces.IPullNotificationsEntities), EntityBuilderProxy.Build<mKontrol.Interfaces.IPullNotificationsEntities>());
            container.Register(typeof(mKontrol.Interfaces.IPullNotificationsFiles), EntityBuilderProxy.Build<mKontrol.Interfaces.IPullNotificationsFiles>());



            container.Register(typeof(mKontrol.Interfaces.IDocumentoCategorias), EntityBuilderProxy.Build<mKontrol.Interfaces.IDocumentoCategorias>());


            #region SBO

            //container.Register<mSBO.Interfaces.ITipoMovimiento, mSBO.TipoMovimiento>();
            container.Register(typeof(mSBO.Interfaces.IBancos), EntityBuilderProxy.Build<mSBO.Interfaces.IBancos>);
            ////container.Register<mSBO.Interfaces.ISubTipoMovimiento, mSBO.SubTipoMovimiento>();
            container.Register(typeof(mSBO.Interfaces.ICuentaBancaria), EntityBuilderProxy.Build<mSBO.Interfaces.ICuentaBancaria>);
            //container.Register<mSBO.Interfaces.ICheque, mSBO.Cheque>();

            #endregion

            #region SCCO
            container.Register<mSCO.Interfaces.IPoliza, mSCO.Poliza>();
            container.Register<mSCO.Interfaces.IMovimientosPoliza, mSCO.MovimientosPoliza>();
            container.Register(typeof(mSCO.Interfaces.ICentroCosto), EntityBuilderProxy.Build<mSCO.Interfaces.ICentroCosto>());
            container.Register(typeof(mSCCO.Interfaces.ITipoInsumo), EntityBuilderProxy.Build<mSCCO.Interfaces.ITipoInsumo>());
            container.Register(typeof(mSCCO.Interfaces.ITipoObra), EntityBuilderProxy.Build<mSCCO.Interfaces.ITipoObra>());
            container.Register(typeof(mSCCO.Interfaces.IObra), EntityBuilderProxy.Build<mSCCO.Interfaces.IObra>());
            container.Register(typeof(mSCCO.Interfaces.IInsumoMaterial), EntityBuilderProxy.Build<mSCCO.Interfaces.IInsumoMaterial>());
            container.Register(typeof(mSCCO.Interfaces.IInsumo), EntityBuilderProxy.Build<mSCCO.Interfaces.IInsumo>());
            container.Register(typeof(mSCCO.Interfaces.IGrupoInsumo), EntityBuilderProxy.Build<mSCCO.Interfaces.IGrupoInsumo>());
            container.Register(typeof(mSCCO.Interfaces.ITipoNivelesPresupuesto), EntityBuilderProxy.Build<mSCCO.Interfaces.ITipoNivelesPresupuesto>());
            container.Register(typeof(mSCCO.Interfaces.IResidentes), EntityBuilderProxy.Build<mSCCO.Interfaces.IResidentes>());
            container.Register(typeof(mSCCO.Interfaces.IMotivosOrdenesCambio), EntityBuilderProxy.Build<mSCCO.Interfaces.IMotivosOrdenesCambio>());
            container.Register(typeof(mSCCO.Interfaces.INivelPresupuesto), EntityBuilderProxy.Build<mSCCO.Interfaces.INivelPresupuesto>());
            container.Register(typeof(mSCCO.Interfaces.IAnticiposDeducciones), EntityBuilderProxy.Build<mSCCO.Interfaces.IAnticiposDeducciones>());
            container.Register(typeof(mSCCO.Interfaces.IDesarrolloSCCO), EntityBuilderProxy.Build<mSCCO.Interfaces.IDesarrolloSCCO>());
            container.Register(typeof(mSCCO.Interfaces.IInsumoTarjeta), EntityBuilderProxy.Build<mSCCO.Interfaces.IInsumoTarjeta>());
            container.Register(typeof(mSCCO.Interfaces.IInsumoTarjetaDetalle), EntityBuilderProxy.Build<mSCCO.Interfaces.IInsumoTarjetaDetalle>());
            container.Register(typeof(mSCCO.Interfaces.ITabulador), EntityBuilderProxy.Build<mSCCO.Interfaces.ITabulador>());
            container.Register(typeof(mSCCO.Interfaces.ITabuladorInsumo), EntityBuilderProxy.Build<mSCCO.Interfaces.ITabuladorInsumo>());
            container.Register(typeof(mSCCO.Interfaces.IObraIndirecto), EntityBuilderProxy.Build<mSCCO.Interfaces.IObraIndirecto>());
            container.Register(typeof(mSCCO.Interfaces.IObraValidacion), EntityBuilderProxy.Build<mSCCO.Interfaces.IObraValidacion>());
            container.Register(typeof(mSCCO.Interfaces.IResidenteObra), EntityBuilderProxy.Build<mSCCO.Interfaces.IResidenteObra>());
            container.Register(typeof(mSCCO.Interfaces.IObraIndirectoTarjeta), EntityBuilderProxy.Build<mSCCO.Interfaces.IObraIndirectoTarjeta>());
            container.Register(typeof(mSCCO.Interfaces.IObraCompania), EntityBuilderProxy.Build<mSCCO.Interfaces.IObraCompania>());
            container.Register(typeof(mSCCO.Interfaces.IContrato), EntityBuilderProxy.Build<mSCCO.Interfaces.IContrato>());
            container.Register(typeof(mSCCO.Interfaces.IConvenio), EntityBuilderProxy.Build<mSCCO.Interfaces.IConvenio>());
            container.Register(typeof(mSCCO.Interfaces.IBitacoraAD), EntityBuilderProxy.Build<mSCCO.Interfaces.IBitacoraAD>());
            container.Register(typeof(mSCCO.Interfaces.ITestigoContrato), EntityBuilderProxy.Build<mSCCO.Interfaces.ITestigoContrato>());
            container.Register(typeof(mSCCO.Interfaces.IRegistroAnticipoRetencion), EntityBuilderProxy.Build<mSCCO.Interfaces.IRegistroAnticipoRetencion>());
            //container.Register(typeof(mSCCO.Interfaces.IRegistroAnticipoConfiguracion), EntityBuilderProxy.Build<mSCCO.Interfaces.IRegistroAnticipoConfiguracion>());

            container.Register(typeof(mSCCO.Interfaces.IInsumoMaterialToleranciaProceso), EntityBuilderProxy.Build<mSCCO.Interfaces.IInsumoMaterialToleranciaProceso>());
            container.Register(typeof(mSCCO.Interfaces.IWBSNodo), EntityBuilderProxy.Build<mSCCO.Interfaces.IWBSNodo>());
            container.Register(typeof(mSCCO.Interfaces.IWBSInsumo), EntityBuilderProxy.Build<mSCCO.Interfaces.IWBSInsumo>());
            container.Register(typeof(mSCCO.Interfaces.IWBSTarjeta), EntityBuilderProxy.Build<mSCCO.Interfaces.IWBSTarjeta>());
            container.Register(typeof(mSCCO.Interfaces.IWBSNivel), EntityBuilderProxy.Build<mSCCO.Interfaces.IWBSNivel>());
            container.Register(typeof(mSCCO.Interfaces.IWBSObra), EntityBuilderProxy.Build<mSCCO.Interfaces.IWBSObra>());
            container.Register(typeof(mSCCO.Interfaces.IPresupuesto), EntityBuilderProxy.Build<mSCCO.Interfaces.IPresupuesto>());
            container.Register(typeof(mSCCO.Interfaces.IObraNivel), EntityBuilderProxy.Build<mSCCO.Interfaces.IObraNivel>());

            #endregion SCO

            #region SCP
            container.Register(typeof(mSCP.Interfaces.IProveedor), EntityBuilderProxy.Build<mSCP.Interfaces.IProveedor>());
            container.Register(typeof(mSCP.Interfaces.IProveedorContactos), EntityBuilderProxy.Build<mSCP.Interfaces.IProveedorContactos>());
            container.Register(typeof(mSCP.Interfaces.IProveedorActaConstitutiva), EntityBuilderProxy.Build<mSCP.Interfaces.IProveedorActaConstitutiva>());
            container.Register(typeof(mSCP.Interfaces.IProveedorRegistroPublicoPropiedad), EntityBuilderProxy.Build<mSCP.Interfaces.IProveedorRegistroPublicoPropiedad>());
            container.Register(typeof(mSCP.Interfaces.ITipoMovimientoProveedor), EntityBuilderProxy.Build<mSCP.Interfaces.ITipoMovimientoProveedor>());
            container.Register(typeof(mSCP.Interfaces.ITipoProveedor), EntityBuilderProxy.Build<mSCP.Interfaces.ITipoProveedor>());
            //container.Register<mSCP.Interfaces.IPagosProgramados, mSCP.PagosProgramados>();
            #endregion SCP



            #region SDC
            container.Register(typeof(mSDC.Interfaces.IEstadoCuenta), EntityBuilderProxy.Build<mSDC.Interfaces.IEstadoCuenta>());
            container.Register(typeof(mSDC.Interfaces.IConceptosCuota), EntityBuilderProxy.Build<mSDC.Interfaces.IConceptosCuota>());
            container.Register(typeof(mSDC.Interfaces.ITicketCliente), EntityBuilderProxy.Build<mSDC.Interfaces.ITicketCliente>());
            #endregion SDC


            #region SCV
            //container.Register<mSCV.Interfaces.IAgente, mSCV.Agente>();
            // container.Register<mSCV.Interfaces.ISegmentoVigencia, mSCV.SegmentoVigencia>(); 
            //container.Register<mSCV.Interfaces.ISegmento, mSCV.Segmento>();
            //container.Register<mSCV.Interfaces.IRangoIngresos, mSCV.RangosIngresos>();
            //container.Register<mSCV.Interfaces.IPrototipo, mSCV.Prototipos>();
            // container.Register<mSCV.Interfaces.IUbicaciones, mSCV.Ubicaciones>();
            // container.Register<mSCV.Interfaces.IDesarrolloPrototipo, mSCV.DesarrolloPrototipos>();
            // container.Register(typeof(mSCV.Interfaces.IPrototipo), EntityBuilderProxy.Build<mSCV.Interfaces.IPrototipo>());
            //container.Register<mSCV.Interfaces.ICentralObrera, mSCV.CentralObrera>();
            //container.Register<mSCV.Interfaces.ISindicato, mSCV.Sindicato>();
            //container.Register<mSCV.Interfaces.ICliente, mSCV.Cliente>();
            //container.Register<mSCV.Interfaces.IClienteAdicional, mSCV.ClienteAdicionales>();
            //container.Register<mSCV.Interfaces.IClienteReferencia, mSCV.ClienteReferencia>();
            //container.Register<mSCV.Interfaces.IClienteRefLaboral, mSCV.ClienteRefLaboral>();
            //container.Register<mSCV.Interfaces.IMotivosCancelacion, mSCV.MotivosCancelacion>();
            container.Register(typeof(mSCV.Interfaces.IAgente), EntityBuilderProxy.Build<mSCV.Interfaces.IAgente>());
            container.Register(typeof(mSCV.Interfaces.IEtapa), EntityBuilderProxy.Build<mSCV.Interfaces.IEtapa>());
            container.Register(typeof(mSCV.Interfaces.ICampaniaPublicidad), EntityBuilderProxy.Build<mSCV.Interfaces.ICampaniaPublicidad>());
            container.Register(typeof(mSCV.Interfaces.ISCVNotification), EntityBuilderProxy.Build<mSCV.Interfaces.ISCVNotification>());
            container.Register(typeof(mSCV.Interfaces.ISegmento), EntityBuilderProxy.Build<mSCV.Interfaces.ISegmento>());
            container.Register(typeof(mSCV.Interfaces.ISegmentosVigencia), EntityBuilderProxy.Build<mSCV.Interfaces.ISegmentosVigencia>());
            container.Register(typeof(mSCV.Interfaces.IRangoIngresos), EntityBuilderProxy.Build<mSCV.Interfaces.IRangoIngresos>());
            container.Register<mSCV.Interfaces.IInstitucion, mSCV.Institucion>();
            container.Register(typeof(mSCV.Interfaces.IBoletasProspecccion), EntityBuilderProxy.Build<mSCV.Interfaces.IBoletasProspecccion>());
            container.Register(typeof(mSCV.Interfaces.IListaCatsCorreo), EntityBuilderProxy.Build<mSCV.Interfaces.IListaCatsCorreo>());

            container.Register(typeof(mSCV.Interfaces.IForecast), EntityBuilderProxy.Build<mSCV.Interfaces.IForecast>());

            container.Register(typeof(mSCO.Interfaces.IOrdenesCompra), EntityBuilderProxy.Build<mSCO.Interfaces.IOrdenesCompra>());
            container.Register(typeof(mSCO.Interfaces.IOrdenesCompraDetalle), EntityBuilderProxy.Build<mSCO.Interfaces.IOrdenesCompraDetalle>());
            container.Register(typeof(mSCO.Interfaces.IOrdenesCompraImpuesto), EntityBuilderProxy.Build<mSCO.Interfaces.IOrdenesCompraImpuesto>());


            container.Register(typeof(mSCV.Interfaces.IComisionesSeguimiento), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesSeguimiento>());
            container.Register(typeof(mSCV.Interfaces.IComisionesTabuladores), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesTabuladores>());

            container.Register(typeof(mSCV.Interfaces.IComisionesTabuladoresExpedientes), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesTabuladoresExpedientes>());


            container.Register(typeof(mSCV.Interfaces.IComisionesComplementarias), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesComplementarias>());

            container.Register(typeof(mSCV.Interfaces.IComisionesAjustes), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesAjustes>());
            container.Register(typeof(mSCV.Interfaces.IComisionesAjustesDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesAjustesDetalle>());

            container.Register(typeof(mSCV.Interfaces.IComisionesCalculoIndicador), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesCalculoIndicador>());
            container.Register(typeof(mSCV.Interfaces.IComisionesCalculoIndicadorComplementario), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesCalculoIndicadorComplementario>());


            container.Register(typeof(mSCV.Interfaces.IDocumentosCategoriaFase), EntityBuilderProxy.Build<mSCV.Interfaces.IDocumentosCategoriaFase>());


            container.Register(typeof(mSCV.Interfaces.IComisionesSeguimientoDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesSeguimientoDetalle>());
            container.Register(typeof(mSCV.Interfaces.IComisionesProceso), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesProceso>());
            container.Register(typeof(mSCV.Interfaces.IComisionesProcesoPeriodos), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesProcesoPeriodos>());

            container.Register(typeof(mSCV.Interfaces.IComisionCompania), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionCompania>());
            container.Register(typeof(mSCV.Interfaces.IRegimenCompania), EntityBuilderProxy.Build<mSCV.Interfaces.IRegimenCompania>());

            container.Register(typeof(mSCV.Interfaces.IPaquete), EntityBuilderProxy.Build<mSCV.Interfaces.IPaquete>());
            container.Register(typeof(mSCV.Interfaces.IPaqueteUbicaciones), EntityBuilderProxy.Build<mSCV.Interfaces.IPaqueteUbicaciones>());

            container.Register(typeof(mSCV.Interfaces.IUbicacionEstatus), EntityBuilderProxy.Build<mSCV.Interfaces.IUbicacionEstatus>());


            container.Register(typeof(mSCV.Interfaces.IEmpresa), EntityBuilderProxy.Build<mSCV.Interfaces.IEmpresa>());
            container.Register(typeof(mSCV.Interfaces.IListaPrecios), EntityBuilderProxy.Build<mSCV.Interfaces.IListaPrecios>());
            container.Register(typeof(mSCV.Interfaces.IListaPreciosVersiones), EntityBuilderProxy.Build<mSCV.Interfaces.IListaPreciosVersiones>());
            container.Register(typeof(mSCV.Interfaces.ILPExtensionVigencia), EntityBuilderProxy.Build<mSCV.Interfaces.ILPExtensionVigencia>());
            container.Register(typeof(mSCV.Interfaces.IListaPreciosAvaluo), EntityBuilderProxy.Build<mSCV.Interfaces.IListaPreciosAvaluo>());
            container.Register(typeof(mSCV.Interfaces.IPrototipo), EntityBuilderProxy.Build<mSCV.Interfaces.IPrototipo>());
            container.Register(typeof(mSCV.Interfaces.IUbicacionFallaPrototipo), EntityBuilderProxy.Build<mSCV.Interfaces.IUbicacionFallaPrototipo>());
            container.Register(typeof(mSCV.Interfaces.IFaseExpediente), EntityBuilderProxy.Build<mSCV.Interfaces.IFaseExpediente>());
            container.Register(typeof(mSCV.Interfaces.ITmComisiones), EntityBuilderProxy.Build<mSCV.Interfaces.ITmComisiones>());
            container.Register(typeof(mSCV.Interfaces.ITiposUbicacion), EntityBuilderProxy.Build<mSCV.Interfaces.ITiposUbicacion>());
            container.Register(typeof(mSCV.Interfaces.IComisionesAprobacion), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesAprobacion>());
            container.Register(typeof(mSCV.Interfaces.IComisionesRevision), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesRevision>());
            container.Register(typeof(mSCV.Interfaces.IComisionesRevisionDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionesRevisionDetalle>());

            container.Register(typeof(mSCV.Interfaces.IRegimen), EntityBuilderProxy.Build<mSCV.Interfaces.IRegimen>());
            container.Register(typeof(mSCV.Interfaces.ITipoFinanciamiento), EntityBuilderProxy.Build<mSCV.Interfaces.ITipoFinanciamiento>());
            container.Register(typeof(mSCV.Interfaces.ITipoFinanciamientoInstitucion), EntityBuilderProxy.Build<mSCV.Interfaces.ITipoFinanciamientoInstitucion>());
            container.Register(typeof(mSCV.Interfaces.IInstitucionDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.IInstitucionDetalle>());
            container.Register(typeof(mSCV.Interfaces.IMotivoSuspension), EntityBuilderProxy.Build<mSCV.Interfaces.IMotivoSuspension>());
            container.Register(typeof(mSCV.Interfaces.IMotivoSuspensionNotificaciones), EntityBuilderProxy.Build<mSCV.Interfaces.IMotivoSuspensionNotificaciones>());
            container.Register(typeof(mSCV.Interfaces.ITiposCambio), EntityBuilderProxy.Build<mSCV.Interfaces.ITiposCambio>());
            //container.Register(typeof(mSCV.Interfaces.ITiposCambio), EntityBuilderProxy.Build<mSCV.Interfaces.ITiposCambio>()); 
            container.Register(typeof(mSCV.Interfaces.IMacroEtapa), EntityBuilderProxy.Build<mSCV.Interfaces.IMacroEtapa>());
            container.Register(typeof(mSCV.Interfaces.ICliente), EntityBuilderProxy.Build<mSCV.Interfaces.ICliente>());
            container.Register(typeof(mSCV.Interfaces.IClienteAdicional), EntityBuilderProxy.Build<mSCV.Interfaces.IClienteAdicional>());
            container.Register(typeof(mSCV.Interfaces.IClienteReferencia), EntityBuilderProxy.Build<mSCV.Interfaces.IClienteReferencia>());
            container.Register(typeof(mSCV.Interfaces.IClienteRefLaboral), EntityBuilderProxy.Build<mSCV.Interfaces.IClienteRefLaboral>());
            container.Register(typeof(mSCV.Interfaces.IClienteAsesores), EntityBuilderProxy.Build<mSCV.Interfaces.IClienteAsesores>());
            container.Register(typeof(mSCV.Interfaces.IClienteDesarrollos), EntityBuilderProxy.Build<mSCV.Interfaces.IClienteDesarrollos>());
            container.Register(typeof(mSCV.Interfaces.IClienteContactos), EntityBuilderProxy.Build<mSCV.Interfaces.IClienteContactos>());
            container.Register(typeof(mSCV.Interfaces.IMotivosCancelacion), EntityBuilderProxy.Build<mSCV.Interfaces.IMotivosCancelacion>());
            container.Register(typeof(mSCV.Interfaces.IPuntoVenta), EntityBuilderProxy.Build<mSCV.Interfaces.IPuntoVenta>());

            container.Register(typeof(mSCV.Interfaces.IUbicaciones), EntityBuilderProxy.Build<mSCV.Interfaces.IUbicaciones>());

            container.Register(typeof(mSCV.Interfaces.ITiposExpediente), EntityBuilderProxy.Build<mSCV.Interfaces.ITiposExpediente>());
            container.Register(typeof(mSCV.Interfaces.IExpedienteTags), EntityBuilderProxy.Build<mSCV.Interfaces.IExpedienteTags>());

            container.Register(typeof(mSCV.Interfaces.IExpedienteUbicacion), EntityBuilderProxy.Build<mSCV.Interfaces.IExpedienteUbicacion>());


            container.Register(typeof(mSCV.Interfaces.IVerificacion), EntityBuilderProxy.Build<mSCV.Interfaces.IVerificacion>());


            container.Register(typeof(mSCV.Interfaces.ICaracteristicaAdicional), EntityBuilderProxy.Build<mSCV.Interfaces.ICaracteristicaAdicional>());
            container.Register(typeof(mSCV.Interfaces.IDesarrollos), EntityBuilderProxy.Build<mSCV.Interfaces.IDesarrollos>());
            container.Register(typeof(mSCV.Interfaces.IDesarrolloPrototipo), EntityBuilderProxy.Build<mSCV.Interfaces.IDesarrolloPrototipo>());
            container.Register(typeof(mSCV.Interfaces.IDesarrolloEsquema), EntityBuilderProxy.Build<mSCV.Interfaces.IDesarrolloEsquema>());
            container.Register(typeof(mSCV.Interfaces.IDesarrollosFinanciamiento), EntityBuilderProxy.Build<mSCV.Interfaces.IDesarrollosFinanciamiento>());
            container.Register(typeof(mSCV.Interfaces.IDesarrolloCuentas), EntityBuilderProxy.Build<mSCV.Interfaces.IDesarrolloCuentas>());
            container.Register(typeof(mSCV.Interfaces.IDesarrolloCentrosCosto), EntityBuilderProxy.Build<mSCV.Interfaces.IDesarrolloCentrosCosto>());
            container.Register(typeof(mSCV.Interfaces.IDesarrolloTiposComercializacion), EntityBuilderProxy.Build<mSCV.Interfaces.IDesarrolloTiposComercializacion>());

            container.Register(typeof(mSCV.Interfaces.IDesarrolloMotivoCancelacion), EntityBuilderProxy.Build<mSCV.Interfaces.IDesarrolloMotivoCancelacion>());
            container.Register(typeof(mSCV.Interfaces.IDesarrolloConceptosPago), EntityBuilderProxy.Build<mSCV.Interfaces.IDesarrolloConceptosPago>());

            container.Register(typeof(mSCV.Interfaces.IDesarrolloFormatoClave), EntityBuilderProxy.Build<mSCV.Interfaces.IDesarrolloFormatoClave>());

            container.Register(typeof(mSCV.Interfaces.IDesarrolloFaseGrupo), EntityBuilderProxy.Build<mSCV.Interfaces.IDesarrolloFaseGrupo>());

            container.Register(typeof(mSCV.Interfaces.IPlanPagos), EntityBuilderProxy.Build<mSCV.Interfaces.IPlanPagos>());
            container.Register(typeof(mSCV.Interfaces.IPlanPagosConceptoPago), EntityBuilderProxy.Build<mSCV.Interfaces.IPlanPagosConceptoPago>());
            container.Register(typeof(mSCV.Interfaces.IPlanPagosConfiguracion), EntityBuilderProxy.Build<mSCV.Interfaces.IPlanPagosConfiguracion>());

            //container.Register<mSCV.Interfaces.IDesarrolloEsquema, mSCV.DesarrolloEsquema>();
            container.Register(typeof(mSCV.Interfaces.ISindicato), EntityBuilderProxy.Build<mSCV.Interfaces.ISindicato>());
            container.Register(typeof(mSCV.Interfaces.ICentralObrera), EntityBuilderProxy.Build<mSCV.Interfaces.ICentralObrera>());
            container.Register(typeof(mSCV.Interfaces.INotario), EntityBuilderProxy.Build<mSCV.Interfaces.INotario>());
            //container.Register<mSCV.Interfaces.IPlanPagos, mSCV.PlanPagos>();
            container.Register(typeof(mSCV.Interfaces.IConceptoPago), EntityBuilderProxy.Build<mSCV.Interfaces.IConceptoPago>());
            //container.Register<mSCV.Interfaces.IPlanPagosConceptoPago, mSCV.PlanPagosConceptoPago>();
            container.Register(typeof(mSCV.Interfaces.IVenta), EntityBuilderProxy.Build<mSCV.Interfaces.IVenta>());
            container.Register(typeof(mSCV.Interfaces.IVentaUbicacion), EntityBuilderProxy.Build<mSCV.Interfaces.IVentaUbicacion>());
            container.Register(typeof(mSCV.Interfaces.IVentaCaracteristica), EntityBuilderProxy.Build<mSCV.Interfaces.IVentaCaracteristica>());
            container.Register(typeof(mSCV.Interfaces.IVentaFinanciamiento), EntityBuilderProxy.Build<mSCV.Interfaces.IVentaFinanciamiento>());
            container.Register(typeof(mSCV.Interfaces.IVentaFinanciamientoInstitucion), EntityBuilderProxy.Build<mSCV.Interfaces.IVentaFinanciamientoInstitucion>());
            container.Register(typeof(mSCV.Interfaces.IVentaFInstitucionDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.IVentaFInstitucionDetalle>());
            container.Register(typeof(mSCV.Interfaces.IConceptosCredito), EntityBuilderProxy.Build<mSCV.Interfaces.IConceptosCredito>());
            container.Register(typeof(mSCV.Interfaces.ITipoComercializacion), EntityBuilderProxy.Build<mSCV.Interfaces.ITipoComercializacion>());
            container.Register(typeof(mSCV.Interfaces.IVentaPP), EntityBuilderProxy.Build<mSCV.Interfaces.IVentaPP>());
            container.Register(typeof(mSCV.Interfaces.IVentaPPConcepto), EntityBuilderProxy.Build<mSCV.Interfaces.IVentaPPConcepto>());
            container.Register(typeof(mSCV.Interfaces.IVentaVersion), EntityBuilderProxy.Build<mSCV.Interfaces.IVentaVersion>());
            container.Register(typeof(mSCV.Interfaces.IVentaProceso), EntityBuilderProxy.Build<mSCV.Interfaces.IVentaProceso>());
            container.Register<mSCV.Interfaces.IReestructuraVenta, mSCV.ReestructuraVenta>();
            container.Register<mSCV.Interfaces.IReestructuraPPConcepto, mSCV.ReestructuraPPConcepto>();
            container.Register<mSCV.Interfaces.IReestructuraPPDocumento, mSCV.ReestructuraPPDocumento>();
            container.Register(typeof(mSCV.Interfaces.IRequisito), EntityBuilderProxy.Build<mSCV.Interfaces.IRequisito>());
            container.Register(typeof(mSCV.Interfaces.IRequisitoCaracteristica), EntityBuilderProxy.Build<mSCV.Interfaces.IRequisitoCaracteristica>());
            container.Register(typeof(mSCV.Interfaces.IDocumentoExpediente), EntityBuilderProxy.Build<mSCV.Interfaces.IDocumentoExpediente>());
            container.Register(typeof(mSCV.Interfaces.IEsquema), EntityBuilderProxy.Build<mSCV.Interfaces.IEsquema>());
            container.Register<mSCV.Interfaces.IEsquemaEtapa, mSCV.EsquemaEtapa>();
            //container.Register<mSCV.Interfaces.IEsquemaEtapaRequisito, mSCV.EsquemaEtapaRequisito>();
            container.Register(typeof(mSCV.Interfaces.IEsquemaEtapaRequisito), EntityBuilderProxy.Build<mSCV.Interfaces.IEsquemaEtapaRequisito>());
            container.Register(typeof(mSCV.Interfaces.IEsquemaEtapaDocumento), EntityBuilderProxy.Build<mSCV.Interfaces.IEsquemaEtapaDocumento>());
            container.Register<mSCV.Interfaces.IInstitucionEsquema, mSCV.InstitucionEsquema>();
            container.Register<mSCV.Interfaces.IEntidadCaracteristica, mSCV.EntidadCaracteristica>();
            container.Register(typeof(mSCV.Interfaces.IProceso), EntityBuilderProxy.Build<mSCV.Interfaces.IProceso>());
            container.Register<mSCV.Interfaces.IEsquemaNivel, mSCV.EsquemaNivel>();
            container.Register<mSCV.Interfaces.IEsquemaEtapaProceso, mSCV.EsquemaEtapaProceso>();
            //container.Register<mSCV.Interfaces.IVentaCredito, mSCV.VentaCredito>();
            container.Register(typeof(mSCV.Interfaces.IExpediente), EntityBuilderProxy.Build<mSCV.Interfaces.IExpediente>());
            container.Register(typeof(mSCV.Interfaces.IDashBoardExpedienteIndicador), EntityBuilderProxy.Build<mSCV.Interfaces.IDashBoardExpedienteIndicador>());
            container.Register(typeof(mSCV.Interfaces.IDashBoardConfiguracion), EntityBuilderProxy.Build<mSCV.Interfaces.IDashBoardConfiguracion>());
            container.Register(typeof(mSCV.Interfaces.ISeguimiento), EntityBuilderProxy.Build<mSCV.Interfaces.ISeguimiento>());
            container.Register(typeof(mSCV.Interfaces.ISeguimientoEstados), EntityBuilderProxy.Build<mSCV.Interfaces.ISeguimientoEstados>());
            container.Register(typeof(mSCV.Interfaces.ISeguimientoDocumento), EntityBuilderProxy.Build<mSCV.Interfaces.ISeguimientoDocumento>());
            container.Register(typeof(mSCV.Interfaces.ISeguimientoProceso), EntityBuilderProxy.Build<mSCV.Interfaces.ISeguimientoProceso>());
            container.Register(typeof(mSCV.Interfaces.ISeguimientoEtapa), EntityBuilderProxy.Build<mSCV.Interfaces.ISeguimientoEtapa>());
            container.Register(typeof(mSCV.Interfaces.ISeguimientoRequisito), EntityBuilderProxy.Build<mSCV.Interfaces.ISeguimientoRequisito>());
            container.Register(typeof(mSCV.Interfaces.ISeguimientoAutorizado), EntityBuilderProxy.Build<mSCV.Interfaces.ISeguimientoAutorizado>());

            container.Register(typeof(mSCV.Interfaces.IDocumentoExpediente), EntityBuilderProxy.Build<mSCV.Interfaces.IDocumentoExpediente>());


            container.Register(typeof(mSCV.Interfaces.IComisionAniosPeriodos), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionAniosPeriodos>());
            container.Register(typeof(mSCV.Interfaces.IComisionPlanEsquemaPeriodo), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionPlanEsquemaPeriodo>());

            container.Register(typeof(mSCV.Interfaces.IComisionPlanEsquemaPeriodoDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionPlanEsquemaPeriodoDetalle>());


            container.Register(typeof(mSCV.Interfaces.IComisionConfiguracion), EntityBuilderProxy.Build<mSCV.Interfaces.IComisionConfiguracion>());



            container.Register(typeof(mSCV.Interfaces.IExpedienteInstantanea), EntityBuilderProxy.Build<mSCV.Interfaces.IExpedienteInstantanea>());
            container.Register(typeof(mSCV.Interfaces.IExpedienteOwner), EntityBuilderProxy.Build<mSCV.Interfaces.IExpedienteOwner>());
            container.Register(typeof(mSCV.Interfaces.IExpedienteRelacionado), EntityBuilderProxy.Build<mSCV.Interfaces.IExpedienteRelacionado>());
            container.Register(typeof(mSCV.Interfaces.IFechaComision), EntityBuilderProxy.Build<mSCV.Interfaces.IFechaComision>());
            container.Register(typeof(mSCV.Interfaces.IUbicacionCoordenadas), EntityBuilderProxy.Build<mSCV.Interfaces.IUbicacionCoordenadas>());
            container.Register(typeof(mSCV.Interfaces.ICotizacion), EntityBuilderProxy.Build<mSCV.Interfaces.ICotizacion>());

            container.Register(typeof(mSCV.Interfaces.IPlaza), EntityBuilderProxy.Build<mSCV.Interfaces.IPlaza>());
            //container.Register(typeof(mSCV.Interfaces.ITipoCliente), EntityBuilderProxy.Build<mSCV.Interfaces.ITipoCliente>());

            container.Register(typeof(mSCV.Interfaces.IListasMkt), EntityBuilderProxy.Build<mSCV.Interfaces.IListasMkt>());
            container.Register(typeof(mSCV.Interfaces.IListasMktDet), EntityBuilderProxy.Build<mSCV.Interfaces.IListasMktDet>());
            container.Register(typeof(mSCV.Interfaces.IListaMarketingCliente), EntityBuilderProxy.Build<mSCV.Interfaces.IListaMarketingCliente>());
            container.Register(typeof(mSCV.Interfaces.IOrigen), EntityBuilderProxy.Build<mSCV.Interfaces.IOrigen>());
            container.Register(typeof(mSCV.Interfaces.ICriterios), EntityBuilderProxy.Build<mSCV.Interfaces.ICriterios>());
            container.Register(typeof(mSCV.Interfaces.ICampaniaPublicidadListaMkt), EntityBuilderProxy.Build<mSCV.Interfaces.ICampaniaPublicidadListaMkt>());
            container.Register(typeof(mSCV.Interfaces.ITiposDeProceso), EntityBuilderProxy.Build<mSCV.Interfaces.ITiposDeProceso>());
            container.Register(typeof(mSCV.Interfaces.ISeguimientoCampaniaPublicidad), EntityBuilderProxy.Build<mSCV.Interfaces.ISeguimientoCampaniaPublicidad>());
            container.Register(typeof(mSCV.Interfaces.ISeguimientoCampaniaPublicidadEvento), EntityBuilderProxy.Build<mSCV.Interfaces.ISeguimientoCampaniaPublicidadEvento>());
            container.Register(typeof(mSCV.Interfaces.ITramiteAsignado), EntityBuilderProxy.Build<mSCV.Interfaces.ITramiteAsignado>());
            container.Register(typeof(mSCV.Interfaces.ITramiteAsignadoConfiguracion), EntityBuilderProxy.Build<mSCV.Interfaces.ITramiteAsignadoConfiguracion>());

            container.Register(typeof(mSCV.Interfaces.ISeguimientoTecnico), EntityBuilderProxy.Build<mSCV.Interfaces.ISeguimientoTecnico>());

            container.Register(typeof(mSCV.Interfaces.ITabuladores), EntityBuilderProxy.Build<mSCV.Interfaces.ITabuladores>());
            container.Register(typeof(mSCV.Interfaces.ITabuladoresConfiguracion), EntityBuilderProxy.Build<mSCV.Interfaces.ITabuladoresConfiguracion>());
            container.Register(typeof(mSCV.Interfaces.IIndicadores), EntityBuilderProxy.Build<mSCV.Interfaces.IIndicadores>());
            container.Register(typeof(mSCV.Interfaces.IPolizaFiniquito), EntityBuilderProxy.Build<mSCV.Interfaces.IPolizaFiniquito>());
            container.Register(typeof(mSCV.Interfaces.IFiniquito), EntityBuilderProxy.Build<mSCV.Interfaces.IFiniquito>());
            container.Register(typeof(mSCV.Interfaces.ITipoMovimiento), EntityBuilderProxy.Build<mSCV.Interfaces.ITipoMovimiento>());
            container.Register(typeof(mSCV.Interfaces.IImpuestos), EntityBuilderProxy.Build<mSCV.Interfaces.IImpuestos>());
            container.Register(typeof(mSCV.Interfaces.IReporteBoletasProspeccion), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteBoletasProspeccion>());
            container.Register(typeof(mSCV.Interfaces.IReporteProspectosClientes), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteProspectosClientes>());
            container.Register(typeof(mSCV.Interfaces.IReporteAnaliticoProspectos), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteAnaliticoProspectos>());
            container.Register(typeof(mSCV.Interfaces.IReporteConsultaProspectos), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteConsultaProspectos>());


            container.Register(typeof(mSCV.Interfaces.IReporteExpedientes), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteExpedientes>());


            //PostVenta Sybase17
            container.Register(typeof(mSCV.Interfaces.IConsultaPreparacionVivienda), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaPreparacionVivienda>());
            container.Register(typeof(mSCV.Interfaces.IConfigViviendaEntregable), EntityBuilderProxy.Build<mSCV.Interfaces.IConfigViviendaEntregable>());
            container.Register(typeof(mSCV.Interfaces.IClasificacionViviendaPendienteEntrega), EntityBuilderProxy.Build<mSCV.Interfaces.IClasificacionViviendaPendienteEntrega>());

            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaEntregable), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaEntregable>());
            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaEntregableHipotecaVerde), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaEntregableHipotecaVerde>());
            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaEntregablePlazas), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaEntregablePlazas>());
            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaEntregableEquipamiento), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaEntregableEquipamiento>());
            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaEntregableFracc), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaEntregableFracc>());
            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaEntregableFinanciamiento), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaEntregableFinanciamiento>());
            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaEntregableVivEntregadas), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaEntregableVivEntregadas>());
            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaEntregableTipoVivienda), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaEntregableTipoVivienda>());
            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaEntregableResult), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaEntregableResult>());
            container.Register(typeof(mSCV.Interfaces.IConsultaPreparacionViviendaResult), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaPreparacionViviendaResult>());
            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaEntregableDetallesReprog), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaEntregableDetallesReprog>());
            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaAgendaEntregableResult), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaAgendaEntregableResult>());
            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaDetallesCitaAgendaResult), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaDetallesCitaAgendaResult>());
            container.Register(typeof(mSCV.Interfaces.IEntregaPaquetes), EntityBuilderProxy.Build<mSCV.Interfaces.IEntregaPaquetes>());
            container.Register(typeof(mSCV.Interfaces.ICapturaFechaConstruccion), EntityBuilderProxy.Build<mSCV.Interfaces.ICapturaFechaConstruccion>());
            container.Register(typeof(mSCV.Interfaces.ICapturaFechaConstruccionExcel), EntityBuilderProxy.Build<mSCV.Interfaces.ICapturaFechaConstruccionExcel>());
            container.Register(typeof(mSCV.Interfaces.IOrigenFalla), EntityBuilderProxy.Build<mSCV.Interfaces.IOrigenFalla>());
            container.Register(typeof(mSCV.Interfaces.IDocumentosImpresion), EntityBuilderProxy.Build<mSCV.Interfaces.IDocumentosImpresion>());
            container.Register(typeof(mSCV.Interfaces.IUbicacionesFalla), EntityBuilderProxy.Build<mSCV.Interfaces.IUbicacionesFalla>());
            container.Register(typeof(mSCV.Interfaces.IUbicacionComponente), EntityBuilderProxy.Build<mSCV.Interfaces.IUbicacionComponente>());
            container.Register(typeof(mSCV.Interfaces.IUbicacionComun), EntityBuilderProxy.Build<mSCV.Interfaces.IUbicacionComun>());
            container.Register(typeof(mSCV.Interfaces.ITipoContratista), EntityBuilderProxy.Build<mSCV.Interfaces.ITipoContratista>());
            container.Register(typeof(mSCV.Interfaces.IRezagosEntrega), EntityBuilderProxy.Build<mSCV.Interfaces.IRezagosEntrega>());
            container.Register(typeof(mSCV.Interfaces.IMotivosCancelacionPV), EntityBuilderProxy.Build<mSCV.Interfaces.IMotivosCancelacionPV>());
            container.Register(typeof(mSCV.Interfaces.ICausasReprogramacion), EntityBuilderProxy.Build<mSCV.Interfaces.ICausasReprogramacion>());
            container.Register(typeof(mSCV.Interfaces.IMotivosReprogramacion), EntityBuilderProxy.Build<mSCV.Interfaces.IMotivosReprogramacion>());
            container.Register(typeof(mSCV.Interfaces.ITipoComponente), EntityBuilderProxy.Build<mSCV.Interfaces.ITipoComponente>());

            //container.Register(typeof(mSCV.Interfaces.IFalla), EntityBuilderProxy.Build<mSCV.Interfaces.IFalla>());
            container.Register(typeof(mSCV.Interfaces.IComponenteIncidencia), EntityBuilderProxy.Build<mSCV.Interfaces.IComponenteIncidencia>());

            container.Register(typeof(mSCV.Interfaces.ICausaIncidencia), EntityBuilderProxy.Build<mSCV.Interfaces.ICausaIncidencia>());
            container.Register(typeof(mSCV.Interfaces.ITicketIncidenciaDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.ITicketIncidenciaDetalle>());
            container.Register(typeof(mSCV.Interfaces.IIncidencia), EntityBuilderProxy.Build<mSCV.Interfaces.IIncidencia>());

            #region +++++ AREAS COMUNES +++++++++++++++
            container.Register(typeof(mSCV.Interfaces.IFallaAreaComun), EntityBuilderProxy.Build<mSCV.Interfaces.IFallaAreaComun>());
            container.Register(typeof(mSCV.Interfaces.ICausaFallaAreaComun), EntityBuilderProxy.Build<mSCV.Interfaces.ICausaFallaAreaComun>());
            container.Register(typeof(mSCV.Interfaces.IAgendaContratistaAreasComunes), EntityBuilderProxy.Build<mSCV.Interfaces.IAgendaContratistaAreasComunes>());
            container.Register(typeof(mSCV.Interfaces.IAgendaContratistaDetalleAreasComunes), EntityBuilderProxy.Build<mSCV.Interfaces.IAgendaContratistaDetalleAreasComunes>());
            container.Register(typeof(mSCV.Interfaces.IAgendaDictamenAreasComunes), EntityBuilderProxy.Build<mSCV.Interfaces.IAgendaDictamenAreasComunes>());
            container.Register(typeof(mSCV.Interfaces.IAgendaDictamenDetalleAreasComunes), EntityBuilderProxy.Build<mSCV.Interfaces.IAgendaDictamenDetalleAreasComunes>());
            container.Register(typeof(mSCV.Interfaces.IOrdenTrabajoRUBAAreasComunes), EntityBuilderProxy.Build<mSCV.Interfaces.IOrdenTrabajoRUBAAreasComunes>());
            container.Register(typeof(mSCV.Interfaces.IOrdenTrabajoDetalleRUBAAreasComunes), EntityBuilderProxy.Build<mSCV.Interfaces.IOrdenTrabajoDetalleRUBAAreasComunes>());
            container.Register(typeof(mSCV.Interfaces.IBitacoraClienteSPVAreasComunes), EntityBuilderProxy.Build<mSCV.Interfaces.IBitacoraClienteSPVAreasComunes>());
            container.Register(typeof(mSCV.Interfaces.IReporteFallasAreasComunes), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteFallasAreasComunes>());
            container.Register(typeof(mSCV.Interfaces.IReporteFallasAreasComunesPartida), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteFallasAreasComunesPartida>());
            container.Register(typeof(mSCV.Interfaces.IReporteAreasComunesDictamen), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteAreasComunesDictamen>());


            #endregion

            container.Register(typeof(mSCV.Interfaces.ITipoFallaAreaComun), EntityBuilderProxy.Build<mSCV.Interfaces.ITipoFallaAreaComun>());
            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaEntregablePersonalEntregaViv), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaEntregablePersonalEntregaViv>());
            container.Register(typeof(mSCV.Interfaces.IConsultaViviendaEntregableRezagosEntrega), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaViviendaEntregableRezagosEntrega>());

            container.Register(typeof(mSCV.Interfaces.IPrereporte), EntityBuilderProxy.Build<mSCV.Interfaces.IPrereporte>());
            container.Register(typeof(mSCV.Interfaces.IPrereporteDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.IPrereporteDetalle>());

            container.Register(typeof(mSCV.Interfaces.IReporteFalla), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteFalla>());
            container.Register(typeof(mSCV.Interfaces.IReporteAnalisisComunidades), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteAnalisisComunidades>());
            container.Register(typeof(mSCV.Interfaces.IReporteFallaDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteFallaDetalle>());
            container.Register(typeof(mSCV.Interfaces.IBitacoraAutorizacionIncidencia), EntityBuilderProxy.Build<mSCV.Interfaces.IBitacoraAutorizacionIncidencia>());
            container.Register(typeof(mSCV.Interfaces.IReporteFallaIndicador), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteFallaIndicador>());
            container.Register(typeof(mSCV.Interfaces.IReporteFallaConsulta), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteFallaConsulta>());
            container.Register(typeof(mSCV.Interfaces.IReporteFallasAreasComunesConsulta), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteFallasAreasComunesConsulta>());

            container.Register(typeof(mSCV.Interfaces.IContribucionPorPlaza), EntityBuilderProxy.Build<mSCV.Interfaces.IContribucionPorPlaza>());
            container.Register(typeof(mSCV.Interfaces.IConsultaFallasTopIncidencia), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaFallasTopIncidencia>());
            container.Register(typeof(mSCV.Interfaces.ITicketDictamen), EntityBuilderProxy.Build<mSCV.Interfaces.ITicketDictamen>());
            container.Register(typeof(mSCV.Interfaces.IReporteDictamen), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteDictamen>());
            container.Register(typeof(mSCV.Interfaces.IDiagnosticosImagenesCAT), EntityBuilderProxy.Build<mSCV.Interfaces.IDiagnosticosImagenesCAT>());
            container.Register(typeof(mSCV.Interfaces.IDiagnosticosNotaCAT), EntityBuilderProxy.Build<mSCV.Interfaces.IDiagnosticosNotaCAT>());
            container.Register(typeof(mSCV.Interfaces.ITopReport), EntityBuilderProxy.Build<mSCV.Interfaces.ITopReport>());
            container.Register(typeof(mSCV.Interfaces.IAgendaSPV), EntityBuilderProxy.Build<mSCV.Interfaces.IAgendaSPV>());
            container.Register(typeof(mSCV.Interfaces.IAgendaContratista), EntityBuilderProxy.Build<mSCV.Interfaces.IAgendaContratista>());
            container.Register(typeof(mSCV.Interfaces.IAgendaContratistaDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.IAgendaContratistaDetalle>());
            container.Register(typeof(mSCV.Interfaces.IAgendaDictamen), EntityBuilderProxy.Build<mSCV.Interfaces.IAgendaDictamen>());
            container.Register(typeof(mSCV.Interfaces.IAgendaDictamenDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.IAgendaDictamenDetalle>());
            container.Register(typeof(mSCV.Interfaces.IBitacoraClienteSPV), EntityBuilderProxy.Build<mSCV.Interfaces.IBitacoraClienteSPV>());
            container.Register(typeof(mSCV.Interfaces.IBienesAdicionales), EntityBuilderProxy.Build<mSCV.Interfaces.IBienesAdicionales>());
            container.Register(typeof(mSCV.Interfaces.IRadarCliente), EntityBuilderProxy.Build<mSCV.Interfaces.IRadarCliente>());

            container.Register(typeof(mSCV.Interfaces.ITipoContrato), EntityBuilderProxy.Build<mSCV.Interfaces.ITipoContrato>());
            container.Register(typeof(mSCV.Interfaces.IContratista), EntityBuilderProxy.Build<mSCV.Interfaces.IContratista>());
            container.Register(typeof(mSCV.Interfaces.IEvidenciaDiagnostico), EntityBuilderProxy.Build<mSCV.Interfaces.IEvidenciaDiagnostico>());
            container.Register(typeof(mSCV.Interfaces.IContratistaUbicacion), EntityBuilderProxy.Build<mSCV.Interfaces.IContratistaUbicacion>());
            container.Register(typeof(mSCV.Interfaces.IResponsableConstruccion), EntityBuilderProxy.Build<mSCV.Interfaces.IResponsableConstruccion>());
            container.Register(typeof(mSCV.Interfaces.IPreparacionViviendaDocs), EntityBuilderProxy.Build<mSCV.Interfaces.IPreparacionViviendaDocs>());

            container.Register(typeof(mSCV.Interfaces.ICausaFalla), EntityBuilderProxy.Build<mSCV.Interfaces.ICausaFalla>());
            container.Register(typeof(mSCV.Interfaces.IFalla), EntityBuilderProxy.Build<mSCV.Interfaces.IFalla>());

            container.Register(typeof(mSCV.Interfaces.IFallaTipoFalla), EntityBuilderProxy.Build<mSCV.Interfaces.IFallaTipoFalla>());
            container.Register(typeof(mSCV.Interfaces.IFallaTipoInmueble), EntityBuilderProxy.Build<mSCV.Interfaces.IFallaTipoInmueble>());
            container.Register(typeof(mSCV.Interfaces.IClasificacionViviendaPendienteEntregaParam), EntityBuilderProxy.Build<mSCV.Interfaces.IClasificacionViviendaPendienteEntregaParam>());


            container.Register(typeof(mSCV.Interfaces.IInformacionComite), EntityBuilderProxy.Build<mSCV.Interfaces.IInformacionComite>());
            container.Register(typeof(mSCV.Interfaces.IInformacionComiteParams), EntityBuilderProxy.Build<mSCV.Interfaces.IInformacionComiteParams>());
            container.Register(typeof(mSCV.Interfaces.IComiteReunionesParam), EntityBuilderProxy.Build<mSCV.Interfaces.IComiteReunionesParam>());
            container.Register(typeof(mSCV.Interfaces.IAgendaReuniones), EntityBuilderProxy.Build<mSCV.Interfaces.IAgendaReuniones>());
            container.Register(typeof(mSCV.Interfaces.IAsociacionCivil), EntityBuilderProxy.Build<mSCV.Interfaces.IAsociacionCivil>());
            container.Register(typeof(mSCV.Interfaces.IMesaDirectiva), EntityBuilderProxy.Build<mSCV.Interfaces.IMesaDirectiva>());
            container.Register(typeof(mSCV.Interfaces.IReconocimientosRuba), EntityBuilderProxy.Build<mSCV.Interfaces.IReconocimientosRuba>());
            container.Register(typeof(mSCV.Interfaces.IAsociacionCivilParams), EntityBuilderProxy.Build<mSCV.Interfaces.IAsociacionCivilParams>());
            container.Register(typeof(mSCV.Interfaces.IMesaDirectivaParams), EntityBuilderProxy.Build<mSCV.Interfaces.IMesaDirectivaParams>());
            container.Register(typeof(mSCV.Interfaces.IIntegrantesAsociacionCivil), EntityBuilderProxy.Build<mSCV.Interfaces.IIntegrantesAsociacionCivil>());

            container.Register(typeof(mSCV.Interfaces.IMaterialesReunion), EntityBuilderProxy.Build<mSCV.Interfaces.IMaterialesReunion>());
            container.Register(typeof(mSCV.Interfaces.IIntegrantesInformacionComite), EntityBuilderProxy.Build<mSCV.Interfaces.IIntegrantesInformacionComite>());
            container.Register(typeof(mSCV.Interfaces.IEventosActividadesParam), EntityBuilderProxy.Build<mSCV.Interfaces.IEventosActividadesParam>());
            container.Register(typeof(mSCV.Interfaces.IPosiblesAlianzas), EntityBuilderProxy.Build<mSCV.Interfaces.IPosiblesAlianzas>());
            container.Register(typeof(mSCV.Interfaces.IObservacionesRequerimientos), EntityBuilderProxy.Build<mSCV.Interfaces.IObservacionesRequerimientos>());
            container.Register(typeof(mSCV.Interfaces.IPermisos), EntityBuilderProxy.Build<mSCV.Interfaces.IPermisos>());
            container.Register(typeof(mSCV.Interfaces.IInvitadosEspeciales), EntityBuilderProxy.Build<mSCV.Interfaces.IInvitadosEspeciales>());
            container.Register(typeof(mSCV.Interfaces.IEventosActividades), EntityBuilderProxy.Build<mSCV.Interfaces.IEventosActividades>());
            container.Register(typeof(mSCV.Interfaces.IEventosActividadesCaptura), EntityBuilderProxy.Build<mSCV.Interfaces.IEventosActividadesCaptura>());
            container.Register(typeof(mSCV.Interfaces.IPatrocinadoresPorcentaje), EntityBuilderProxy.Build<mSCV.Interfaces.IPatrocinadoresPorcentaje>());
            container.Register(typeof(mSCV.Interfaces.IParticipantes), EntityBuilderProxy.Build<mSCV.Interfaces.IParticipantes>());
            container.Register(typeof(mSCV.Interfaces.IPatrocinadores), EntityBuilderProxy.Build<mSCV.Interfaces.IPatrocinadores>());
            container.Register(typeof(mSCV.Interfaces.IColaboradoresPPC), EntityBuilderProxy.Build<mSCV.Interfaces.IColaboradoresPPC>());
            container.Register(typeof(mSCV.Interfaces.IEventosActividadesPPC), EntityBuilderProxy.Build<mSCV.Interfaces.IEventosActividadesPPC>());
            container.Register(typeof(mSCV.Interfaces.IEventosActividadesReportPPC), EntityBuilderProxy.Build<mSCV.Interfaces.IEventosActividadesReportPPC>());
            container.Register(typeof(mSCV.Interfaces.IParticipantesConsulta), EntityBuilderProxy.Build<mSCV.Interfaces.IParticipantesConsulta>());
            container.Register(typeof(mSCV.Interfaces.IPatrocinadoresConsulta), EntityBuilderProxy.Build<mSCV.Interfaces.IPatrocinadoresConsulta>());
            container.Register(typeof(mSCV.Interfaces.IColaboradoresConsulta), EntityBuilderProxy.Build<mSCV.Interfaces.IColaboradoresConsulta>());
            container.Register(typeof(mSCV.Interfaces.IConsultaPPC), EntityBuilderProxy.Build<mSCV.Interfaces.IConsultaPPC>());
            container.Register(typeof(mSCV.Interfaces.IConfigCorreosEquipamientoParam), EntityBuilderProxy.Build<mSCV.Interfaces.IConfigCorreosEquipamientoParam>());
            container.Register(typeof(mSCV.Interfaces.ISegmentosConfig), EntityBuilderProxy.Build<mSCV.Interfaces.ISegmentosConfig>());


            //
            //container.Register(typeof(mSCV.Interfaces.IFallaTipoFalla), EntityBuilderProxy.Build<mSCV.Interfaces.IFallaTipoFalla>());
            //container.Register(typeof(mSCV.Interfaces.IFallaTipoInmueble), EntityBuilderProxy.Build<mSCV.Interfaces.IFallaTipoInmueble>());


            container.Register(typeof(mSCV.Interfaces.IComponente), EntityBuilderProxy.Build<mSCV.Interfaces.IComponente>());
            container.Register(typeof(mSCV.Interfaces.ITipoVivienda), EntityBuilderProxy.Build<mSCV.Interfaces.ITipoVivienda>());
            container.Register(typeof(mSCV.Interfaces.IFileToDownload), EntityBuilderProxy.Build<mSCV.Interfaces.IFileToDownload>());
            container.Register(typeof(mSCV.Interfaces.IImpresionMasiva), EntityBuilderProxy.Build<mSCV.Interfaces.IImpresionMasiva>());
            container.Register(typeof(mSCV.Interfaces.IOrdenTrabajoRUBA), EntityBuilderProxy.Build<mSCV.Interfaces.IOrdenTrabajoRUBA>());
            container.Register(typeof(mSCV.Interfaces.IOrdenTrabajoDetalleRUBA), EntityBuilderProxy.Build<mSCV.Interfaces.IOrdenTrabajoDetalleRUBA>());
            container.Register(typeof(mSCV.Interfaces.IHorarioAtencion), EntityBuilderProxy.Build<mSCV.Interfaces.IHorarioAtencion>());
            container.Register(typeof(mSCV.Interfaces.IVocacionSPV), EntityBuilderProxy.Build<mSCV.Interfaces.IVocacionSPV>());

            container.Register(typeof(mSCV.Interfaces.IGestionDocumentos), EntityBuilderProxy.Build<mSCV.Interfaces.IGestionDocumentos>());
            container.Register(typeof(mSCV.Interfaces.IPlanificacionSPV), EntityBuilderProxy.Build<mSCV.Interfaces.IPlanificacionSPV>());
            container.Register(typeof(mSCV.Interfaces.IPlanificacionSPVDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.IPlanificacionSPVDetalle>());
            container.Register(typeof(mSCV.Interfaces.IPlanificacionSPVDetalleTime), EntityBuilderProxy.Build<mSCV.Interfaces.IPlanificacionSPVDetalleTime>());
            container.Register(typeof(mSCV.Interfaces.IPlanificacionSPVDashboard), EntityBuilderProxy.Build<mSCV.Interfaces.IPlanificacionSPVDashboard>());

            container.Register(typeof(mSCV.Interfaces.IReasignacion), EntityBuilderProxy.Build<mSCV.Interfaces.IReasignacion>());

            container.Register(typeof(mSCV.Interfaces.IInterface), EntityBuilderProxy.Build<mSCV.Interfaces.IInterface>());
            container.Register(typeof(mSCV.Interfaces.IInterfaceDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.IInterfaceDetalle>());
            container.Register(typeof(mSCV.Interfaces.IInterfaceSaldoFacturaDetalle),EntityBuilderProxy.Build<mSCV.Interfaces.IInterfaceSaldoFacturaDetalle>());

            container.Register(typeof(mSCV.Interfaces.IPuntosVentaDesarrollos), EntityBuilderProxy.Build<mSCV.Interfaces.IPuntosVentaDesarrollos>());

            container.Register(typeof(mSCV.Interfaces.IAnalisisProspecto), EntityBuilderProxy.Build<mSCV.Interfaces.IAnalisisProspecto>());

            container.Register(typeof(mSCV.Interfaces.IChecklistControl), EntityBuilderProxy.Build<mSCV.Interfaces.IChecklistControl>());
            container.Register(typeof(mSCV.Interfaces.IFallasAreasComunes), EntityBuilderProxy.Build<mSCV.Interfaces.IFallasAreasComunes>());
            container.Register(typeof(mSCV.Interfaces.ICatalogosSpv), EntityBuilderProxy.Build<mSCV.Interfaces.ICatalogosSpv>());
            container.Register(typeof(mSCV.Interfaces.IEncuestaPoblacional), EntityBuilderProxy.Build<mSCV.Interfaces.IEncuestaPoblacional>());
            container.Register(typeof(mSCV.Interfaces.IEventos), EntityBuilderProxy.Build<mSCV.Interfaces.IEventos>());
            container.Register(typeof(mSCV.Interfaces.IComites), EntityBuilderProxy.Build<mSCV.Interfaces.IComites>());
            container.Register(typeof(mSCV.Interfaces.EKCONNECT.IEKCChats), EntityBuilderProxy.Build<mSCV.Interfaces.EKCONNECT.IEKCChats>());
            container.Register(typeof(mSCV.Interfaces.EKCONNECT.IEKCMensajes), EntityBuilderProxy.Build<mSCV.Interfaces.EKCONNECT.IEKCMensajes>());
            container.Register(typeof(mSCV.Interfaces.EKCONNECT.IEKCUsuariosRedesSociales), EntityBuilderProxy.Build<mSCV.Interfaces.EKCONNECT.IEKCUsuariosRedesSociales>());
            container.Register(typeof(mSCV.Interfaces.PlantillasMeta.IPlantillaMeta), EntityBuilderProxy.Build<mSCV.Interfaces.PlantillasMeta.IPlantillaMeta>());
            #endregion SCV

            #region SGP

            container.Register(typeof(mSGP.Interfaces.ITipoProyecto), EntityBuilderProxy.Build<mSGP.Interfaces.ITipoProyecto>());
            container.Register(typeof(mSGP.Interfaces.IProyectos), EntityBuilderProxy.Build<mSGP.Interfaces.IProyectos>());
            container.Register(typeof(mSGP.Interfaces.IReservaTerritorial), EntityBuilderProxy.Build<mSGP.Interfaces.IReservaTerritorial>());
            container.Register(typeof(mSGP.Interfaces.IColaboradores), EntityBuilderProxy.Build<mSGP.Interfaces.IColaboradores>());
            container.Register(typeof(mSGP.Interfaces.ITareas), EntityBuilderProxy.Build<mSGP.Interfaces.ITareas>());
            container.Register(typeof(mSGP.Interfaces.IWBS), EntityBuilderProxy.Build<mSGP.Interfaces.IWBS>());
            container.Register(typeof(mSGP.Interfaces.ITareasDependencias), EntityBuilderProxy.Build<mSGP.Interfaces.ITareasDependencias>());


            #endregion SGP

            #endregion
            #region SPV
            container.Register(typeof(mSCV.Interfaces.IFraccionamientos), EntityBuilderProxy.Build<mSCV.Interfaces.IFraccionamientos>());
            container.Register(typeof(mKontrol.Interfaces.IDateDifference), EntityBuilderProxy.Build<mKontrol.Interfaces.IDateDifference>());
            container.Register(typeof(mSCV.Interfaces.IEntregaUbicacion), EntityBuilderProxy.Build<mSCV.Interfaces.IEntregaUbicacion>());
            container.Register(typeof(mSCV.Interfaces.IEntregaUbicacionResponsable), EntityBuilderProxy.Build<mSCV.Interfaces.IEntregaUbicacionResponsable>());
            container.Register(typeof(mSCV.Interfaces.ISupervisorUbicacion), EntityBuilderProxy.Build<mSCV.Interfaces.ISupervisorUbicacion>());
            container.Register(typeof(mSCV.Interfaces.IEntregaUbicacionResponsableFraccionamiento), EntityBuilderProxy.Build<mSCV.Interfaces.IEntregaUbicacionResponsableFraccionamiento>());
            container.Register(typeof(mSCV.Interfaces.IEntregaUbicacionSeguimientoEtapa), EntityBuilderProxy.Build<mSCV.Interfaces.IEntregaUbicacionSeguimientoEtapa>());
            container.Register(typeof(mSCV.Interfaces.ICheckList), EntityBuilderProxy.Build<mSCV.Interfaces.ICheckList>());
            container.Register(typeof(mSCV.Interfaces.ICheckListPlanAccion), EntityBuilderProxy.Build<mSCV.Interfaces.ICheckListPlanAccion>());

            container.Register(typeof(mSCV.Interfaces.IClientesSPV), EntityBuilderProxy.Build<mSCV.Interfaces.IClientesSPV>());
            container.Register(typeof(mSCV.Interfaces.IClienteSPVEtapa), EntityBuilderProxy.Build<mSCV.Interfaces.IClienteSPVEtapa>());
            container.Register(typeof(mSCV.Interfaces.ITicket), EntityBuilderProxy.Build<mSCV.Interfaces.ITicket>());

            container.Register(typeof(mSCV.Interfaces.IPlanCompromisosConstruccion), EntityBuilderProxy.Build<mSCV.Interfaces.IPlanCompromisosConstruccion>());
            container.Register(typeof(mSCV.Interfaces.IPlanCompromisoIndicador), EntityBuilderProxy.Build<mSCV.Interfaces.IPlanCompromisoIndicador>());


            container.Register(typeof(mSCV.Interfaces.IPlanCompromisosEntrega), EntityBuilderProxy.Build<mSCV.Interfaces.IPlanCompromisosEntrega>());






            container.Register(typeof(mSCV.Interfaces.IOrdenTrabajo), EntityBuilderProxy.Build<mSCV.Interfaces.IOrdenTrabajo>());
            container.Register(typeof(mSCV.Interfaces.IOrdenTrabajoDetalle), EntityBuilderProxy.Build<mSCV.Interfaces.IOrdenTrabajoDetalle>());
            container.Register(typeof(mSCV.Interfaces.IBitacoraProcesoSPV), EntityBuilderProxy.Build<mSCV.Interfaces.IBitacoraProcesoSPV>());
            container.Register(typeof(mSCV.Interfaces.IBitacoraCliente), EntityBuilderProxy.Build<mSCV.Interfaces.IBitacoraCliente>());
            container.Register(typeof(mSCV.Interfaces.IResponsableEntregaDesarrollo), EntityBuilderProxy.Build<mSCV.Interfaces.IResponsableEntregaDesarrollo>());
            container.Register(typeof(mSCV.Interfaces.ISPVCoordinadores), EntityBuilderProxy.Build<mSCV.Interfaces.ISPVCoordinadores>());
            container.Register(typeof(mSCV.Interfaces.ISPVCoordinadoresSupervisores), EntityBuilderProxy.Build<mSCV.Interfaces.ISPVCoordinadoresSupervisores>());
            container.Register(typeof(mSCV.Interfaces.ISmFraccionamiento), EntityBuilderProxy.Build<mSCV.Interfaces.ISmFraccionamiento>());
            container.Register(typeof(mSCV.Interfaces.ISmFraccionamientoCat), EntityBuilderProxy.Build<mSCV.Interfaces.ISmFraccionamientoCat>());
            container.Register(typeof(mSCV.Interfaces.ISVPSupervisoresCAT), EntityBuilderProxy.Build<mSCV.Interfaces.ISVPSupervisoresCAT>());
            container.Register(typeof(mSCV.Interfaces.ISPVEncuestaSatisfaccionFija), EntityBuilderProxy.Build<mSCV.Interfaces.ISPVEncuestaSatisfaccionFija>());
            container.Register(typeof(mSCV.Interfaces.IReporteEncuestaSatisfaccion), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteEncuestaSatisfaccion>());
            container.Register(typeof(mSCV.Interfaces.IReporteSeguimientoVivProg), EntityBuilderProxy.Build<mSCV.Interfaces.IReporteSeguimientoVivProg>());


            #endregion

            #region "Registro de tipos de Datos"

#if SYBASE
            container.Register<dKontrol.Interfaces.IDBHelper, dKontrol.Sybase.DBHelper>();
            
            container.Register<dKontrol.Interfaces.ICliente, dKontrol.Sybase.Cliente>(); // OK
            container.Register<dKontrol.Interfaces.ICompania, dKontrol.Sybase.Companias>(); // OK
            container.Register<dKontrol.Interfaces.INotification, dKontrol.Sybase.Notification>();
            container.Register<dKontrol.Interfaces.ICatalogosGenerales, dKontrol.Sybase.CatalogosGenerales>();
            container.Register<dKontrol.Interfaces.IUsuarios, dKontrol.Sybase.Usuarios>(); // OK
            container.Register<dKontrol.Interfaces.ITipoWorkflow, dKontrol.Sybase.TipoWorkflow>();
            container.Register<dKontrol.Interfaces.IWorkflow, dKontrol.Sybase.Workflow>();
            container.Register<dKontrol.Interfaces.INiveles, dKontrol.Sybase.Niveles>(); // OK
            container.Register<dKontrol.Interfaces.IWorkflowInstance, dKontrol.Sybase.WorkflowInstance>();
            container.Register<dKontrol.Interfaces.ILocalidades, dKontrol.Sybase.Localidades>();
            container.Register<dKontrol.Interfaces.ITarea, dKontrol.Sybase.Tarea>();
            container.Register<dKontrol.Interfaces.ITareaInstance, dKontrol.Sybase.TareaInstance>();
            //container.Register<dKontrol.Interfaces.IOpciones, dKontrol.MSSQL.Opciones>();
            container.Register<dKontrol.Interfaces.IModulos, dKontrol.Sybase.Modulos>(); // OK
            container.Register<dKontrol.Interfaces.IParametros, dKontrol.Sybase.Parametros>();
            container.Register<dKontrol.Interfaces.IConfigurarParametros, dKontrol.Sybase.ConfigurarParametros>();
            container.Register<dKontrol.Interfaces.IWorkflowManager, dKontrol.Sybase.WorkflowManager>();
            container.Register<dKontrol.Interfaces.ICatalogosGeneralesValores, dKontrol.Sybase.CatalogosGeneralesValores>(); // OK
            container.Register<dKontrol.Interfaces.ICatalogosClasificadores, dKontrol.Sybase.CatalogosClasificadores>();
            //container.Register<dKontrol.Interfaces.IClientesModulos, dKontrol.Sybase.ClientesModulos>(); // OK
            container.Register<dKontrol.Interfaces.IPlantillasMails, dKontrol.Sybase.PlantillasMails>();
            container.Register<dKontrol.Interfaces.ITiposClasificador, dKontrol.Sybase.TiposClasificador>();

            //container.Register<dSBO.Interfaces.ITipoMovimiento, dSBO.Sybase.TipoMovimiento>();
            container.Register<dSBO.Interfaces.IBancos, dSBO.Sybase.Bancos>();
            //container.Register<dSBO.Interfaces.ISubTipoMovimiento, dSBO.Sybase.SubTipoMovimiento>();
            container.Register<dSBO.Interfaces.ICuentaBancaria, dSBO.Sybase.CuentaBancaria>();
            container.Register<dSBO.Interfaces.ICheques, dSBO.Sybase.Cheques>();


            #region SCO
            container.Register<dSCO.Interfaces.ICentroCosto, dSCO.Sybase.CentroCosto>();
            container.Register<dSCO.Interfaces.IPolizas, dSCO.Sybase.Polizas>();
            #endregion SCO

            #region SCP
            container.Register<dSCP.Interfaces.IProveedor, dSCP.Sybase.Proveedor>();
            container.Register<dSCP.Interfaces.IPagosProgramados, dSCP.Sybase.PagosProgramados>();
            #endregion SCP

            #region SCV
            container.Register<dSCV.Interfaces.IEtapas, dSCV.Sybase.Etapas>();
            container.Register<dSCV.Interfaces.ICampaniaPublicidad, dSCV.Sybase.CampaniaPublicidad>();
            container.Register<dSCV.Interfaces.ISegmentos, dSCV.Sybase.Segmentos>();
            container.Register<dSCV.Interfaces.ISegmentosVigencias, dSCV.Sybase.SegmentosVigencias>();
            container.Register<dSCV.Interfaces.IRangosIngresos, dSCV.Sybase.RangosIngresos>();
            container.Register<dSCV.Interfaces.ITiposCambio, dSCV.Sybase.TiposCambio>();
            container.Register<dSCV.Interfaces.IInstituciones, dSCV.Sybase.Instituciones>();
            container.Register<dSCV.Interfaces.IEmpresas, dSCV.Sybase.Empresas>();
            container.Register<dSCV.Interfaces.IClientes, dSCV.Sybase.Clientes>();
            container.Register<dSCV.Interfaces.IMotivosCancelacion, dSCV.Sybase.MotivosCancelacion>();
            container.Register<dSCV.Interfaces.IPrototipos, dSCV.Sybase.Prototipos>();
            container.Register<dSCV.Interfaces.INotarios, dSCV.Sybase.Notarios>();
            #endregion SCV

#endif

#if SYBASE17
           // container.Register<dKontrol.Interfaces.IDBHelper, dKontrol.SYBASE17.DBHelper>();
            container.Register<dKontrol.Interfaces.IDominios, dKontrol.SYBASE17.Dominios>();
            container.Register<dKontrol.Interfaces.ICategorias, dKontrol.SYBASE17.Categorias>();
            container.Register<dKontrol.Interfaces.ICompania, dKontrol.SYBASE17.Companias>();
            container.Register<dKontrol.Interfaces.INotification, dKontrol.SYBASE17.Notification>();
            container.Register<dKontrol.Interfaces.INotificacionMarcadores, dKontrol.SYBASE17.NotificacionMarcadores>();
            container.Register<dKontrol.Interfaces.INotificacionUsuario, dKontrol.SYBASE17.NotificacionUsuario>();
            container.Register<dKontrol.Interfaces.ICatalogosGenerales, dKontrol.SYBASE17.CatalogosGenerales>();
            container.Register<dKontrol.Interfaces.IUsuarios, dKontrol.SYBASE17.Usuarios>();
            container.Register<dKontrol.Interfaces.ITipoWorkflow, dKontrol.SYBASE17.TipoWorkflow>();
            container.Register<dKontrol.Interfaces.IWorkflow, dKontrol.SYBASE17.Workflow>();
            container.Register<dKontrol.Interfaces.INiveles, dKontrol.SYBASE17.Niveles>();
            container.Register<dKontrol.Interfaces.IWorkflowInstance, dKontrol.SYBASE17.WorkflowInstance>();
            container.Register<dKontrol.Interfaces.IAsentamientos, dKontrol.SYBASE17.Asentamientos>();
            container.Register<dKontrol.Interfaces.INivelesEtapas, dKontrol.SYBASE17.NivelesEtapas>();
            //container.Register<dKontrol.Interfaces.IFraccionamientos, dKontrol.SYBASE17.Fraccionamientos>();
            container.Register<dKontrol.Interfaces.IPuestos, dKontrol.SYBASE17.Puestos>();
            container.Register<dKontrol.Interfaces.ICitas, dKontrol.SYBASE17.Citas>();
            container.Register<dKontrol.Interfaces.ICG, dKontrol.SYBASE17.CG>();
            container.Register<dKontrol.Interfaces.INivelesOpciones, dKontrol.SYBASE17.NivelesOpciones>();
            container.Register<dKontrol.Interfaces.ITareasManuales, dKontrol.SYBASE17.TareasManuales>();
            container.Register<dKontrol.Interfaces.ITipoCitas, dKontrol.SYBASE17.TipoCitas>();
            container.Register<dKontrol.Interfaces.IGruposUsuario, dKontrol.SYBASE17.GruposUsuario>();
            container.Register<dKontrol.Interfaces.IGruposUsuarioDetalle, dKontrol.SYBASE17.GruposUsuarioDetalle>();
            container.Register<dKontrol.Interfaces.INotificadores, dKontrol.SYBASE17.Notificadores>();
            container.Register<dKontrol.Interfaces.INotificadoresInstancia, dKontrol.SYBASE17.NotificadoresInstancia>();
            container.Register<dKontrol.Interfaces.ILocalidades, dKontrol.SYBASE17.Localidades>();
            container.Register<dKontrol.Interfaces.ITarea, dKontrol.SYBASE17.Tarea>();
            container.Register<dKontrol.Interfaces.ITareaInstance, dKontrol.SYBASE17.TareaInstance>();
            container.Register<dKontrol.Interfaces.IOpciones, dKontrol.SYBASE17.Opciones>();
            container.Register<dKontrol.Interfaces.IModulos, dKontrol.SYBASE17.Modulos>();
            container.Register<dKontrol.Interfaces.IParametros, dKontrol.SYBASE17.Parametros>();
            container.Register<dKontrol.Interfaces.IConfigurarParametros, dKontrol.SYBASE17.ConfigurarParametros>();
            container.Register<dKontrol.Interfaces.IWorkflowManager, dKontrol.SYBASE17.WorkflowManager>();
            container.Register<dKontrol.Interfaces.ICatalogosGeneralesValores, dKontrol.SYBASE17.CatalogosGeneralesValores>();
            container.Register<dKontrol.Interfaces.ICGValores, dKontrol.SYBASE17.CGValores>();
            //container.Register<dKontrol.Interfaces.IClientesModulos, dKontrol.MSSQL.ClientesModulos>();
            container.Register<dKontrol.Interfaces.IPlantillasMails, dKontrol.SYBASE17.PlantillasMails>();
            container.Register<dKontrol.Interfaces.ICatalogosClasificadores, dKontrol.SYBASE17.CatalogosClasificadores>();
            container.Register<dKontrol.Interfaces.IClasificadores, dKontrol.SYBASE17.Clasificadores>();
            container.Register<dKontrol.Interfaces.ITiposClasificador, dKontrol.SYBASE17.TiposClasificador>();
            container.Register<dKontrol.Interfaces.IPosiciones, dKontrol.SYBASE17.Posicion>();
            container.Register<dKontrol.Interfaces.IMonedas, dKontrol.SYBASE17.Monedas>();
            container.Register<dKontrol.Interfaces.IKontrolFiles, dKontrol.SYBASE17.KontrolFiles>();
            container.Register<dKontrol.Interfaces.ICentroCosto, dKontrol.SYBASE17.CentroCosto>();
            container.Register<dKontrol.Interfaces.ICatalogosClasificadores, dKontrol.SYBASE17.CatalogosClasificadores>();
            container.Register<dKontrol.Interfaces.IUsuarioNivelesCompania, dKontrol.SYBASE17.UsuarioNivelesCompania>();
            container.Register<dKontrol.Interfaces.IVistas, dKontrol.SYBASE17.Vistas>();
            container.Register<dKontrol.Interfaces.IVistaElemento, dKontrol.SYBASE17.VistaElemento>();
            container.Register<dKontrol.Interfaces.IReportes, dKontrol.SYBASE17.Reportes>();
            container.Register<dKontrol.Interfaces.IEntidades, dKontrol.SYBASE17.Entidades>();
            container.Register<dKontrol.Interfaces.IPersonalizarCampos, dKontrol.SYBASE17.PersonalizarCampos>();
            container.Register<dKontrol.Interfaces.IPersonalizarCamposOpciones, dKontrol.SYBASE17.PersonalizarCamposOpciones>();
            container.Register<dKontrol.Interfaces.INivelesReportes, dKontrol.SYBASE17.NivelesReportes>();
            //Agenda
            container.Register<dKontrol.Interfaces.IAgenda, dKontrol.SYBASE17.Agenda>();
            container.Register<dKontrol.Interfaces.IAgendaEntVivienda, dKontrol.SYBASE17.AgendasEntregasViviendas>();
            container.Register<dKontrol.Interfaces.IDateDifference, dKontrol.SYBASE17.DateDifference>();
            container.Register<dSCV.Interfaces.ICheckLists, dSCV.Sybase17.CheckLists>();
            container.Register<dSCV.Interfaces.ICheckListsPlanAccion, dSCV.Sybase17.CheckListsPlanAccion>();
            container.Register<dSCV.Interfaces.ISPVEncuestasSatisfaccionFija, dSCV.Sybase17.SPVEncuestasSatisfaccionFija>();
            container.Register<dSCV.Interfaces.IReporteEncuestaSatisfaccion, dSCV.Sybase17.ReporteEncuestaSatisfaccion>();
            container.Register<dSCV.Interfaces.IReporteSeguimientoVivProg, dSCV.Sybase17.ReporteSeguimientoVivProg>();
            container.Register<dSCV.Interfaces.IBienesAdicionales, dSCV.Sybase17.BienesAdicionales>();
            container.Register<dSCV.Interfaces.IRadarClientes, dSCV.Sybase17.RadarCliente>();
            container.Register<dSCV.Interfaces.EKCONNECT.IEKCChats, dSCV.Sybase17.EKCONNECT.EKCChats>();
            container.Register<dSCV.Interfaces.EKCONNECT.IEKCMensajes, dSCV.Sybase17.EKCONNECT.EKCMensajes>();
            container.Register<dSCV.Interfaces.EKCONNECT.IEKCUsuariosRedesSociales, dSCV.Sybase17.EKCONNECT.EKCUsuariosRedesSociales>();
            container.Register<dSCV.Interfaces.PlantillasMeta.IPlantillaMeta, dSCV.Sybase17.PlantillasMeta.PlantillaMeta>();
            #region +++++++++++++++++++ AREAS COMUNES +++++++++++++++++++++

            container.Register<dSCV.Interfaces.IReporteFallasAreasComunes, dSCV.Sybase17.ReporteFallasAreasComunes>();
            container.Register<dSCV.Interfaces.IReportesDictamenesAreasComunes, dSCV.Sybase17.ReportesDictamenesAreasComunes>();
            container.Register<dSCV.Interfaces.IReporteFallasAreasComunesPartidas, dSCV.Sybase17.ReporteFallasAreasComunesPartidas>();
            container.Register<dSCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes, dSCV.Sybase17.OrdenesTrabajoRUBAAreasComunes>();
            container.Register<dSCV.Interfaces.IOrdenesTrabajoDetallesRUBAAreasComunes, dSCV.Sybase17.OrdenesTrabajoDetallesRUBAAreasComunes>();
            container.Register<dSCV.Interfaces.IAgendasContratistasAreasComunes, dSCV.Sybase17.AgendasContratistasAreasComunes>();
            container.Register<dSCV.Interfaces.IAgendasDictamenesAreasComunes, dSCV.Sybase17.AgendasDictamenesAreasComunes>();
            container.Register<dSCV.Interfaces.IBitacorasClienteSPVAreasComunes, dSCV.Sybase17.BitacorasClienteSPVAreasComunes>();

            #endregion



#endif


#if MSSQL
            container.Register<dKontrol.Interfaces.IDBHelper, dKontrol.MSSQL.DBHelper>();

            container.Register<dKontrol.Interfaces.IDominios, dKontrol.MSSQL.Dominios>();
            container.Register<dKontrol.Interfaces.ILicencias, dKontrol.MSSQL.Licencias>();
            container.Register<dKontrol.Interfaces.ICategorias, dKontrol.MSSQL.Categorias>();
            container.Register<dKontrol.Interfaces.IUnidadMedida, dKontrol.MSSQL.UnidadMedida>();
            container.Register<dKontrol.Interfaces.ICompania, dKontrol.MSSQL.Companias>();

            container.Register<dKontrol.Interfaces.IDateDifference, dKontrol.MSSQL.DateDifference>();


            container.Register<dKontrol.Interfaces.INotification, dKontrol.MSSQL.Notification>();
            container.Register<dKontrol.Interfaces.ICatalogosGenerales, dKontrol.MSSQL.CatalogosGenerales>();
            container.Register<dKontrol.Interfaces.IUsuarios, dKontrol.MSSQL.Usuarios>();
            container.Register<dKontrol.Interfaces.IUsuariosToken, dKontrol.MSSQL.UsuariosToken>();
            container.Register<dKontrol.Interfaces.ITipoWorkflow, dKontrol.MSSQL.TipoWorkflow>();
            container.Register<dKontrol.Interfaces.IWorkflow, dKontrol.MSSQL.Workflow>();
            container.Register<dKontrol.Interfaces.INiveles, dKontrol.MSSQL.Niveles>();

            container.Register<dKontrol.Interfaces.IBitacora, dKontrol.MSSQL.Bitacora>();

            container.Register<dKontrol.Interfaces.IBitacoraEventos, dKontrol.MSSQL.BitacoraEventos>();





            container.Register<dKontrol.Interfaces.IWorkflowInstance, dKontrol.MSSQL.WorkflowInstance>();
            container.Register<dKontrol.Interfaces.IAsentamientos, dKontrol.MSSQL.Asentamientos>();
            container.Register<dKontrol.Interfaces.IPuestos, dKontrol.MSSQL.Puestos>();

            container.Register<dKontrol.Interfaces.ICitas, dKontrol.MSSQL.Citas>();
            container.Register<dKontrol.Interfaces.IConfiguracionFormulario, dKontrol.MSSQL.ConfiguracionFormulario>();
            container.Register<dKontrol.Interfaces.IConfiguracionFormularioEntidad, dKontrol.MSSQL.ConfiguracionFormularioEntidad>();
            container.Register<dKontrol.Interfaces.IPersonalizarCamposSecciones, dKontrol.MSSQL.PersonalizarCamposSecciones>();
            container.Register<dKontrol.Interfaces.IPersonalizarCamposValores, dKontrol.MSSQL.PersonalizarCamposValores>();

            container.Register<dKontrol.Interfaces.IBlogPost, dKontrol.MSSQL.BlogPost>();
            container.Register<dKontrol.Interfaces.IBlogPostCategorias, dKontrol.MSSQL.BlogPostCategorias>();
            container.Register<dKontrol.Interfaces.ITiposEvento, dKontrol.MSSQL.TiposEvento>();
            container.Register<dKontrol.Interfaces.ITiposEntidad, dKontrol.MSSQL.TiposEntidad>();
            container.Register<dKontrol.Interfaces.IEventos, dKontrol.MSSQL.Eventos>();
            container.Register<dKontrol.Interfaces.ICG, dKontrol.MSSQL.CG>();
            container.Register<dKontrol.Interfaces.INivelesOpciones, dKontrol.MSSQL.NivelesOpciones>();
            container.Register<dKontrol.Interfaces.INivelesEtapas, dKontrol.MSSQL.NivelesEtapas>();
            container.Register<dKontrol.Interfaces.INivelesReportes, dKontrol.MSSQL.NivelesReportes>();
            container.Register<dKontrol.Interfaces.ITareasManuales, dKontrol.MSSQL.TareasManuales>();
            container.Register<dKontrol.Interfaces.ITipoCitas, dKontrol.MSSQL.TipoCitas>();
            container.Register<dKontrol.Interfaces.IGruposUsuario, dKontrol.MSSQL.GruposUsuario>();

            container.Register<dKontrol.Interfaces.IGruposUsuarioDetalle, dKontrol.MSSQL.GruposUsuarioDetalle>();
            container.Register<dKontrol.Interfaces.INotificadores, dKontrol.MSSQL.Notificadores>();
            container.Register<dKontrol.Interfaces.INotificadoresInstancia, dKontrol.MSSQL.NotificadoresInstancia>();
            container.Register<dKontrol.Interfaces.ILocalidades, dKontrol.MSSQL.Localidades>();
            container.Register<dKontrol.Interfaces.ITarea, dKontrol.MSSQL.Tarea>();
            container.Register<dKontrol.Interfaces.ITareaInstance, dKontrol.MSSQL.TareaInstance>();
            container.Register<dKontrol.Interfaces.IOpciones, dKontrol.MSSQL.Opciones>();
            container.Register<dKontrol.Interfaces.IOpcionSistema, dKontrol.MSSQL.OpcionSistema>();
            container.Register<dKontrol.Interfaces.IModulos, dKontrol.MSSQL.Modulos>();
            container.Register<dKontrol.Interfaces.IParametros, dKontrol.MSSQL.Parametros>();
            container.Register<dKontrol.Interfaces.IConfigurarParametros, dKontrol.MSSQL.ConfigurarParametros>();
            container.Register<dKontrol.Interfaces.IWorkflowManager, dKontrol.MSSQL.WorkflowManager>();
            container.Register<dKontrol.Interfaces.ICatalogosGeneralesValores, dKontrol.MSSQL.CatalogosGeneralesValores>();
            container.Register<dKontrol.Interfaces.ICGValores, dKontrol.MSSQL.CGValores>();
            //container.Register<dKontrol.Interfaces.IClientesModulos, dKontrol.MSSQL.ClientesModulos>();
            container.Register<dKontrol.Interfaces.IPlantillasMails, dKontrol.MSSQL.PlantillasMails>();
            container.Register<dKontrol.Interfaces.IPlantillasLeads, dKontrol.MSSQL.PlantillasLeads>();
            container.Register<dKontrol.Interfaces.ICatalogosClasificadores, dKontrol.MSSQL.CatalogosClasificadores>();
            container.Register<dKontrol.Interfaces.IClasificadores, dKontrol.MSSQL.Clasificadores>();
            container.Register<dKontrol.Interfaces.ITiposClasificador, dKontrol.MSSQL.TiposClasificador>();
            container.Register<dKontrol.Interfaces.IPosiciones, dKontrol.MSSQL.Posicion>();
            container.Register<dKontrol.Interfaces.IMonedas, dKontrol.MSSQL.Monedas>();
            container.Register<dKontrol.Interfaces.IKontrolFiles, dKontrol.MSSQL.KontrolFiles>();
            container.Register<dKontrol.Interfaces.IKontrolFilesVersiones, dKontrol.MSSQL.KontrolFilesVersiones>();

            container.Register<dKontrol.Interfaces.IDocumentoCategorias, dKontrol.MSSQL.DocumentoCategorias>();


            container.Register<dKontrol.Interfaces.ICentroCosto, dKontrol.MSSQL.CentroCosto>();
            container.Register<dKontrol.Interfaces.ICatalogosClasificadores, dKontrol.MSSQL.CatalogosClasificadores>();
            container.Register<dKontrol.Interfaces.IUsuarioNivelesCompania, dKontrol.MSSQL.UsuarioNivelesCompania>();
            container.Register<dKontrol.Interfaces.IVistas, dKontrol.MSSQL.Vistas>();
            container.Register<dKontrol.Interfaces.IVistaElemento, dKontrol.MSSQL.VistaElemento>();
            container.Register<dKontrol.Interfaces.IReportes, dKontrol.MSSQL.Reportes>();
            container.Register<dKontrol.Interfaces.IEntidades, dKontrol.MSSQL.Entidades>();
            container.Register<dKontrol.Interfaces.IPersonalizarCampos, dKontrol.MSSQL.PersonalizarCampos>();
            container.Register<dKontrol.Interfaces.IPersonalizarCamposOpciones, dKontrol.MSSQL.PersonalizarCamposOpciones>();
            container.Register<dKontrol.Interfaces.IPersonalizarCamposConfiguracion, dKontrol.MSSQL.PersonalizarCamposConfiguracion>();
            container.Register<dKontrol.Interfaces.IPullNotifications, dKontrol.MSSQL.PullNotifications>();
            container.Register<dKontrol.Interfaces.IPullNotificationsActions, dKontrol.MSSQL.PullNotificationsActions>();
            container.Register<dKontrol.Interfaces.IPullNotificationsEntities, dKontrol.MSSQL.PullNotificationsEntities>();
            container.Register<dKontrol.Interfaces.IPullNotificationsFiles, dKontrol.MSSQL.PullNotificationsFiles>();
            container.Register<dKontrol.Interfaces.IAgenda, dKontrol.MSSQL.Agenda>();
            container.Register<dKontrol.Interfaces.IAgendaEntVivienda, dKontrol.MSSQL.AgendasEntregasViviendas>();

            //container.Register<dKontrol.Interfaces.IChatConversacion, dKontrol.MSSQL.ChatConversacion>();
            //container.Register<dKontrol.Interfaces.IChatTema, dKontrol.MSSQL.ChatTema>();

            //Ohss 2019-03-26
            container.Register<dSCV.Interfaces.IConsultaViviendaEntregables, dSCV.MSSQL.ConsultaViviendaEntregable>();
            //Ohss 2019-04-12
            container.Register<dSCV.Interfaces.IContratistas, dSCV.MSSQL.Contratistas>();

            #region SBO

            //container.Register<dSBO.Interfaces.ITipoMovimiento, dSBO.MSSQL.TipoMovimiento>();
            //container.Register<dSBO.Interfaces.IBancos, dSBO.MSSQL.Bancos>();
            ////container.Register<dSBO.Interfaces.ISubTipoMovimiento, dSBO.MSSQL.SubTipoMovimiento>();
            //container.Register<dSBO.Interfaces.ICuentaBancaria, dSBO.MSSQL.CuentaBancaria>();
            //container.Register<dSBO.Interfaces.ICheques, dSBO.MSSQL.Cheques>();

            #endregion

            #region SCCO
            container.Register<dSCO.Interfaces.ICentroCosto, dSCO.MSSQL.CentroCosto>();
            container.Register<dSCCO.Interfaces.ITipoInsumo, EK.Datos.SCCO.MSSQL.TipoInsumo>();
            container.Register<dSCCO.Interfaces.ITipoObra, EK.Datos.SCCO.MSSQL.TipoObra>();
            container.Register<dSCCO.Interfaces.IObra, EK.Datos.SCCO.MSSQL.Obra>();
            container.Register<dSCCO.Interfaces.IInsumos, EK.Datos.SCCO.MSSQL.Insumos>();
            container.Register<dSCCO.Interfaces.IInsumosMateriales, EK.Datos.SCCO.MSSQL.InsumosMateriales>();
            container.Register<dSCCO.Interfaces.IGrupoInsumo, EK.Datos.SCCO.MSSQL.GrupoInsumo>();
            container.Register<dSCCO.Interfaces.ITipoNivelesPresupuesto, EK.Datos.SCCO.MSSQL.TipoNivelesPresupuesto>();
            container.Register<dSCCO.Interfaces.IResidentes, EK.Datos.SCCO.MSSQL.Residentes>();
            container.Register<dSCCO.Interfaces.IMotivosOrdenesCambio, EK.Datos.SCCO.MSSQL.MotivosOrdenesCambio>();
            container.Register<dSCCO.Interfaces.INivelesPresupuesto, EK.Datos.SCCO.MSSQL.NivelesPresupuesto>();
            container.Register<dSCCO.Interfaces.IAnticiposDeducciones, EK.Datos.SCCO.MSSQL.AnticiposDeducciones>();
            container.Register<dSCCO.Interfaces.IInsumosTarjetas, EK.Datos.SCCO.MSSQL.InsumosTarjetas>();
            container.Register<dSCCO.Interfaces.IDesarrollosSCCO, EK.Datos.SCCO.MSSQL.DesarrollosSCCO>();
            container.Register<dSCCO.Interfaces.ITabuladores, EK.Datos.SCCO.MSSQL.Tabuladores>();
            container.Register<dSCCO.Interfaces.IInsumosTarjetasDetalle, EK.Datos.SCCO.MSSQL.InsumosTarjetasDetalle>();
            container.Register<dSCCO.Interfaces.IWBSNodos, EK.Datos.SCCO.MSSQL.WBSNodos>();
            container.Register<dSCCO.Interfaces.IWBSInsumos, EK.Datos.SCCO.MSSQL.WBSInsumos>();
            container.Register<dSCCO.Interfaces.IWBSTarjetas, EK.Datos.SCCO.MSSQL.WBSTarjetas>();
            container.Register<dSCCO.Interfaces.IWBSNiveles, EK.Datos.SCCO.MSSQL.WBSNiveles>();
            container.Register<dSCCO.Interfaces.IWBSObras, EK.Datos.SCCO.MSSQL.WBSObras>();
            container.Register<dSCCO.Interfaces.IPresupuestos, EK.Datos.SCCO.MSSQL.Presupuestos>();
            container.Register<dSCCO.Interfaces.ITabuladoresInsumos, EK.Datos.SCCO.MSSQL.TabuladoresInsumos>();
            container.Register<dSCCO.Interfaces.IObraIndirecto, EK.Datos.SCCO.MSSQL.ObraIndirecto>();
            container.Register<dSCCO.Interfaces.IObraValidacion, EK.Datos.SCCO.MSSQL.ObraValidaciones>();
            container.Register<dSCCO.Interfaces.IResidenteObra, EK.Datos.SCCO.MSSQL.ResidenteObra>();
            container.Register<dSCCO.Interfaces.IObraIndirectoTarjeta, EK.Datos.SCCO.MSSQL.ObraIndirectoTarjeta>();
            container.Register<dSCCO.Interfaces.IObraCompania, EK.Datos.SCCO.MSSQL.ObraCompania>();
            container.Register<dSCCO.Interfaces.IContratos, EK.Datos.SCCO.MSSQL.Contratos>();
            container.Register<dSCCO.Interfaces.IConvenios, EK.Datos.SCCO.MSSQL.Convenios>();
            container.Register<dSCCO.Interfaces.IBitacoraAD, EK.Datos.SCCO.MSSQL.BitacoraAD>();
            container.Register<dSCCO.Interfaces.ITestigosContratos, EK.Datos.SCCO.MSSQL.TestigosContratos>();
            container.Register<dSCCO.Interfaces.IRegistroAnticiposRetenciones, EK.Datos.SCCO.MSSQL.RegistroAnticiposRetenciones>();
            //container.Register<dSCCO.Interfaces.IRegistroAnticiposConfiguracion, EK.Datos.SCCO.MSSQL.RegistroAnticiposConfiguracion>();
            container.Register<dSCCO.Interfaces.IInsumosMaterialesToleranciaProcesos, EK.Datos.SCCO.MSSQL.InsumoMaterialToleranciaProceso>();
            container.Register<dSCCO.Interfaces.IObraNivel, EK.Datos.SCCO.MSSQL.IObraNivel>();

            #endregion SCCO

            #region SCP
            container.Register<dSCP.Interfaces.IProveedores, dSCP.MSSQL.Proveedores>();
            container.Register<dSCP.Interfaces.IProveedorContacto, dSCP.MSSQL.ProveedoresContactos>();
            container.Register<dSCP.Interfaces.IProveedoresActasConstitutivas, dSCP.MSSQL.ProveedoresActasConstitutivas>();
            container.Register<dSCP.Interfaces.IProveedoresRegistroPublicoPropiedad, dSCP.MSSQL.ProveedoresRegistroPublicoPropiedad>();
            container.Register<dSCP.Interfaces.ITipoMovimientoProveedores, dSCP.MSSQL.TipoMovimientoProveedores>();
            container.Register<dSCP.Interfaces.ITipoProveedores, dSCP.MSSQL.TipoProveedores>();
            //container.Register<dSCP.Interfaces.IPagosProgramados, dSCP.MSSQL.PagosProgramados>();
            #endregion SCP



            #region SDC
            container.Register<dSDC.Interfaces.IEstadoCuenta, dSDC.MSSQL.EstadoCuenta>();
            container.Register<dSDC.Interfaces.IConceptosCuota, dSDC.MSSQL.ConceptosCuota>();
            container.Register<dSDC.Interfaces.ITicketsClientes, dSDC.MSSQL.TicketsClientes>();
            #endregion SDC


            #region SCV
            container.Register<dSCV.Interfaces.IDocumentoCategoriaFase, dSCV.MSSQL.DocumentoCategoriaFase>();

            container.Register<dSCV.Interfaces.IEtapas, dSCV.MSSQL.Etapas>();
            container.Register<dSCV.Interfaces.ICampaniaPublicidad, dSCV.MSSQL.CampaniaPublicidad>();
            container.Register<dSCV.Interfaces.ISCVNotificacion, dSCV.MSSQL.SCVNotificacion>();
            container.Register<dSCV.Interfaces.ISegmentos, dSCV.MSSQL.Segmentos>();
            container.Register<dSCV.Interfaces.ISegmentosVigencia, dSCV.MSSQL.SegmentosVigencia>();
            container.Register<dSCV.Interfaces.IRangosIngresos, dSCV.MSSQL.RangosIngresos>();
            container.Register<dSCV.Interfaces.ITiposCambio, dSCV.MSSQL.TiposCambio>();
            container.Register<dSCV.Interfaces.IInstituciones, dSCV.MSSQL.Instituciones>();
            container.Register<dSCV.Interfaces.IEmpresas, dSCV.MSSQL.Empresas>();

            container.Register<dSCV.Interfaces.IComisionAniosPeriodos, dSCV.MSSQL.ComisionAniosPeriodos>();
            container.Register<dSCV.Interfaces.IComisionPlanEsquemaPeriodo, dSCV.MSSQL.ComisionPlanEsquemaPeriodo>();
            container.Register<dSCV.Interfaces.IComisionPlanEsquemaPeriodoDetalle, dSCV.MSSQL.ComisionPlanEsquemaPeriodoDetalle>();
            container.Register<dSCV.Interfaces.IComisionConfiguracion, dSCV.MSSQL.ComisionConfiguracion>();
            container.Register<dSCV.Interfaces.IComisionesSeguimiento, dSCV.MSSQL.ComisionesSeguimiento>();
            container.Register<dSCV.Interfaces.IComisionesTabuladores, dSCV.MSSQL.ComisionesTabuladores>();
            container.Register<dSCV.Interfaces.IComisionesTabuladoresExpedientes, dSCV.MSSQL.ComisionesTabuladoresExpedientes>();

            container.Register<dSCV.Interfaces.IComisionesAjustes, dSCV.MSSQL.ComisionesAjustes>();

            container.Register<dSCV.Interfaces.IComisionesAjustesDetalle, dSCV.MSSQL.ComisionesAjustesDetalle>();

            container.Register<dSCV.Interfaces.IComisionesComplementarias, dSCV.MSSQL.ComisionesComplementarias>();


            container.Register<dSCV.Interfaces.IExpedientesReportes, dSCV.MSSQL.ExpedientesReportes>();


            container.Register<dSCV.Interfaces.IVentaPPConceptosPago, dSCV.MSSQL.VentaPPConceptosPago>();


            container.Register<dKontrol.Interfaces.IAnios, dKontrol.MSSQL.Anios>();
            container.Register<dKontrol.Interfaces.IPeriodicidad, dKontrol.MSSQL.Periodicidad>();
            container.Register<dKontrol.Interfaces.IPeriodicidadDetalle, dKontrol.MSSQL.PeriodicidadDetalle>();

            container.Register<dSCV.Interfaces.IComisionesSeguimientoDetalle, dSCV.MSSQL.ComisionesSeguimientoDetalle>();
            container.Register<dSCV.Interfaces.IComisionesProceso, dSCV.MSSQL.ComisionesProcesos>();
            container.Register<dSCV.Interfaces.IComisionesProcesoPeriodos, dSCV.MSSQL.ComisionesProcesosPeriodos>();

            container.Register<dSCV.Interfaces.IComisionCompania, dSCV.MSSQL.ComisionCompania>();


            container.Register<dSCV.Interfaces.IRegimenCompania, dSCV.MSSQL.RegimenCompania>();
            container.Register<dSCV.Interfaces.IListaPrecios, dSCV.MSSQL.ListaPrecios>();
            container.Register<dSCV.Interfaces.ILPExtensionVigencia, dSCV.MSSQL.LPExtensionVigencia>();
            container.Register<dSCV.Interfaces.IClientes, dSCV.MSSQL.Clientes>();
            container.Register<dSCV.Interfaces.IClienteReferencia, dSCV.MSSQL.ClienteReferencia>();
            container.Register<dSCV.Interfaces.IClienteRefLaboral, dSCV.MSSQL.ClienteRefLaboral>();
            container.Register<dSCV.Interfaces.IClienteAsesores, dSCV.MSSQL.ClienteAsesores>();
            container.Register<dSCV.Interfaces.IClienteDesarrollo, dSCV.MSSQL.ClientesDesarrollo>();
            container.Register<dSCV.Interfaces.IClienteContacto, dSCV.MSSQL.ClientesContactos>();

            container.Register<dSCV.Interfaces.IContratistasUbicaciones, dSCV.MSSQL.ContratistasUbicaciones>();

            container.Register<dSCV.Interfaces.IUbicacionesEstatus, dSCV.MSSQL.UbicacionesEstatus>();



            container.Register<dSCV.Interfaces.IExpedientesTags, dSCV.MSSQL.ExpedientesTags>();

            container.Register<dSCV.Interfaces.IBoletasProspeccion, dSCV.MSSQL.BoletasProspeccion>();

            container.Register<dSCV.Interfaces.IForecast, dSCV.MSSQL.Forecast>();

            container.Register<dSCO.Interfaces.IOrdenesCompra, dSCO.MSSQL.OrdenesCompra>();
            container.Register<dSCO.Interfaces.IOrdenesCompraDetalle, dSCO.MSSQL.OrdenesCompraDetalle>();
            container.Register<dSCO.Interfaces.IOrdenesCompraImpuesto, dSCO.MSSQL.OrdenesCompraImpuesto>();



            container.Register<dSCV.Interfaces.IPaquetes, dSCV.MSSQL.Paquetes>();
            container.Register<dSCV.Interfaces.IPaqueteUbicaciones, dSCV.MSSQL.PaquetesUbicaciones>();

            container.Register<dSCV.Interfaces.IMotivosCancelacion, dSCV.MSSQL.MotivosCancelacion>();
            container.Register<dSCV.Interfaces.IPuntosVentas, dSCV.MSSQL.PuntosVenta>();
            container.Register<dSCV.Interfaces.IPrototipos, dSCV.MSSQL.Prototipos>();
            container.Register < dSCV.Interfaces.IUbicacionesFallaPrototipos, dSCV.MSSQL.UbicacionesFallaPrototipos>();
            container.Register<dSCV.Interfaces.ICaracteristicaAdicional, dSCV.MSSQL.CaracteristicaAdicional>();
            container.Register<dSCV.Interfaces.IDesarrollos, dSCV.MSSQL.Desarrollos>();
            container.Register<dSCV.Interfaces.IDesarrolloCuentas, dSCV.MSSQL.DesarrollosCuentas>();
            container.Register<dSCV.Interfaces.IDesarrollosPrototipo, dSCV.MSSQL.DesarrollosPrototipos>();

            container.Register<dSCV.Interfaces.IDesarrolloFaseGrupo, dSCV.MSSQL.DesarrollosFaseGrupo>();

            container.Register<dSCV.Interfaces.IDesarrollosEsquemas, dSCV.MSSQL.DesarrollosEsquemas>();
            container.Register<dSCV.Interfaces.IDesarrollosFinanciamiento, dSCV.MSSQL.DesarrollosFinanciamiento>();
            container.Register<dSCV.Interfaces.IDesarrollosCentrosCosto, dSCV.MSSQL.DesarrollosCentrosCosto>();
            container.Register<dSCV.Interfaces.IDesarrollosTiposComercializacion, dSCV.MSSQL.DesarrollosTiposComercializacion>();
            container.Register<dSCV.Interfaces.IDesarrollosFormatoClave, dSCV.MSSQL.DesarrollosFormatoClave>();

            container.Register<dSCV.Interfaces.IDesarrolloMotivosCancelacion, dSCV.MSSQL.DesarrolloMotivosCancelacion>();
            container.Register<dSCV.Interfaces.IDesarrolloConceptosPago, dSCV.MSSQL.DesarrolloConceptosPago>();

            container.Register<dSCV.Interfaces.INotarios, dSCV.MSSQL.Notarios>();
            container.Register<dSCV.Interfaces.ISindicatos, dSCV.MSSQL.Sindicatos>();

            container.Register<dSCV.Interfaces.ITipoFinanciamiento, dSCV.MSSQL.TipoFinanciamiento>();
            container.Register<dSCV.Interfaces.ITipoFinanciamientoInstitucion, dSCV.MSSQL.TipoFinanciamientoInstitucion>();
            container.Register<dSCV.Interfaces.ITF_Institucion_Detalle, dSCV.MSSQL.TF_Institucion_Detalle>();
            container.Register<dSCV.Interfaces.IConceptosCredito, dSCV.MSSQL.ConceptosCredito>();
            container.Register<dSCV.Interfaces.ITipoComercializacion, dSCV.MSSQL.TipoComercializacion>();

            container.Register<dSCV.Interfaces.IMotivoSuspension, dSCV.MSSQL.MotivoSuspension>();
            container.Register<dSCV.Interfaces.IMotivoSuspensionNotificaciones, dSCV.MSSQL.MotivoSuspensionNotificaciones>();
            container.Register<dSCV.Interfaces.IUbicaciones, dSCV.MSSQL.Ubicaciones>();
            container.Register<dSCV.Interfaces.ICentralesObreras, dSCV.MSSQL.CentralesObreras>();
            container.Register<dSCV.Interfaces.IPlanesPagos, dSCV.MSSQL.PlanesPagos>();
            container.Register<dSCV.Interfaces.IPlanesPagosConfiguracion, dSCV.MSSQL.PlanesPagosConfiguracion>();

            container.Register<dSCV.Interfaces.IPlaza, dSCV.MSSQL.Plaza>();
            //container.Register<dSCV.Interfaces.ITipoCliente, dSCV.MSSQL.TipoCliente>();
            container.Register<dSCV.Interfaces.IPlanPagosConceptosPago, dSCV.MSSQL.PlanesPagoConceptosPago>();

            container.Register<dSCV.Interfaces.IConceptosPago, dSCV.MSSQL.ConceptosPago>();
            container.Register<dSCV.Interfaces.IVentas, dSCV.MSSQL.Ventas>();
            container.Register<dSCV.Interfaces.ICotizaciones, dSCV.MSSQL.Cotizaciones>();

            container.Register<dSCV.Interfaces.IListaPrecios, dSCV.MSSQL.ListaPrecios>();
            container.Register<dSCV.Interfaces.IListaPreciosAvaluo, dSCV.MSSQL.ListaPreciosAvaluo>();
            container.Register<dSCV.Interfaces.IListaPreciosVersiones, dSCV.MSSQL.ListaPreciosVersiones>();

            container.Register<dSCV.Interfaces.IUsuarios, dSCV.MSSQL.Usuarios>();
            container.Register<dSCV.Interfaces.IRequisitos, dSCV.MSSQL.Requisito>();
            container.Register<dSCV.Interfaces.IDocumentosExpediente, dSCV.MSSQL.DocumentosExpediente>();
            container.Register<dSCV.Interfaces.IEsquemas, dSCV.MSSQL.Esquemas>();
            container.Register<dSCV.Interfaces.IProcesos, dSCV.MSSQL.Procesos>();
            container.Register<dSCV.Interfaces.ISeguimientos, dSCV.MSSQL.Seguimientos>();
            container.Register<dSCV.Interfaces.ISeguimientosAutorizados, dSCV.MSSQL.SeguimientosAutorizados>();
            container.Register<dSCV.Interfaces.IFasesExpediente, dSCV.MSSQL.FasesExpediente>();
            container.Register<dSCV.Interfaces.IMacroEtapas, dSCV.MSSQL.MacroEtapas>();
            container.Register<dSCV.Interfaces.IExpedientes, dSCV.MSSQL.Expedientes>();
            container.Register<dSCV.Interfaces.ITmComisiones, dSCV.MSSQL.TmComisiones>();
            container.Register<dSCV.Interfaces.ITiposUbicacion, dSCV.MSSQL.TiposUbicacion>();
            container.Register<dSCV.Interfaces.IComisionesAprobacion, dSCV.MSSQL.ComisionesAprobacion>();
            container.Register<dSCV.Interfaces.IComisionesRevision, dSCV.MSSQL.ComisionesRevision>();
            container.Register<dSCV.Interfaces.IComisionesRevisionDetalle, dSCV.MSSQL.ComisionesRevisionDetalle>();

            container.Register<dSCV.Interfaces.IRegimen, dSCV.MSSQL.Regimen>();
            container.Register<dSCV.Interfaces.IExpedientesInstantaneas, dSCV.MSSQL.ExpedientesInstantaneas>();
            container.Register<dSCV.Interfaces.IDashBoardExpedientes, dSCV.MSSQL.DashBoardExpedientes>();
            container.Register<dSCV.Interfaces.IDashBoardConfiguraciones, dSCV.MSSQL.DashBoardConfiguraciones>();
            container.Register<dSCV.Interfaces.IExpedientesOwners, dSCV.MSSQL.ExpedientesOwners>();
            container.Register<dSCV.Interfaces.IExpedientesRelacionados, dSCV.MSSQL.ExpedientesRelacionados>();
            container.Register<dSCV.Interfaces.IUbicacionCoordenadas, dSCV.MSSQL.UbicacionCoordenadas>();
            container.Register<dSCV.Interfaces.IUbicacionesFalla, dSCV.MSSQL.UbicacionesFalla>();
            container.Register<dSCV.Interfaces.IUbicacionComun, dSCV.MSSQL.UbicacionComun>();
            container.Register<dSCV.Interfaces.ITipoContratista, dSCV.MSSQL.TipoContratista>();
            container.Register<dSCV.Interfaces.IOrigenFalla, dSCV.MSSQL.OrigenFalla>();
            //container.Register<dSCV.Interfaces.IDocumentosImpresion, dSCV.MSSQL.DocumentosImpresion>();
            container.Register<dSCV.Interfaces.IRezagosEntrega, dSCV.MSSQL.RezagosEntrega>();
            container.Register<dSCV.Interfaces.IMotivosCancelacionPV, dSCV.MSSQL.MotivosCancelacionPV>();
            container.Register<dSCV.Interfaces.ICausasReprogramacion, dSCV.MSSQL.CausasReprogramacion>();
            container.Register<dSCV.Interfaces.ITiposComponentes, dSCV.MSSQL.TiposComponentes>();
            container.Register<dSCV.Interfaces.IIncidencias, dSCV.MSSQL.Incidencias>();


            container.Register<dSCV.Interfaces.ITicketsDictamenes, dSCV.MSSQL.TicketsDictamenes>();
            container.Register<dSCV.Interfaces.IOrdenesTrabajo, dSCV.MSSQL.OrdenesTrabajo>();
            container.Register<dSCV.Interfaces.IOrdenesTrabajoDetalles, dSCV.MSSQL.OrdenesTrabajoDetalle>();



            container.Register<dSCV.Interfaces.IFallas, dSCV.MSSQL.Falla>();





            container.Register<dSCV.Interfaces.IComponentesIncidencias, dSCV.MSSQL.ComponentesIncidencias>();

            container.Register<dSCV.Interfaces.IFallaTipoFalla, dSCV.MSSQL.FallaTipoFalla>();
            container.Register<dSCV.Interfaces.IFallaTipoInmueble, dSCV.MSSQL.FallaTipoInmueble>();

            container.Register<dSCV.Interfaces.ITickets, dSCV.MSSQL.Tickets>();

            container.Register<dSCV.Interfaces.IPlanCompromisosConstruccion, dSCV.MSSQL.PlanCompromisosConstruccion>();
            container.Register<dSCV.Interfaces.IPlanCompromisosEntrega, dSCV.MSSQL.PlanCompromisosEntrega>();



            container.Register<dSCV.Interfaces.ICausasFallas, dSCV.MSSQL.CausasFallas>();

            container.Register<dSCV.Interfaces.IClientesSPV, dSCV.MSSQL.ClientesSPV>();
            container.Register<dSCV.Interfaces.ITipoFallaAreaComun, dSCV.MSSQL.TipoFallaAreaComun>();
            container.Register<dSCV.Interfaces.ITipoMovimiento, dSCV.MSSQL.TipoMovimiento>();
            container.Register<dSCV.Interfaces.IImpuestos, dSCV.MSSQL.Impuestos>();
            container.Register<dSCV.Interfaces.IListasMkt, dSCV.MSSQL.ListasMkt>();
            container.Register<dSCV.Interfaces.IListasMktDet, dSCV.MSSQL.ListasMktDet>();
            container.Register<dSCV.Interfaces.IListaMarketingCliente, dSCV.MSSQL.ListaMarketingCliente>();
            container.Register<dSCV.Interfaces.IOrigen, dSCV.MSSQL.Origen>();
            container.Register<dSCV.Interfaces.ICriterios, dSCV.MSSQL.Criterios>();
            container.Register<dSCV.Interfaces.ICampaniaPublicidadListaMkt, dSCV.MSSQL.CampaniasPublicidadListasMkt>();
            container.Register<dSCV.Interfaces.ISeguimientoCampaniaPublicidad, dSCV.MSSQL.SeguimientoCampaniaPublicidad>();
            container.Register<dSCV.Interfaces.ITiposDeProcesos, dSCV.MSSQL.TiposDeProcesos>();
            container.Register<dSCV.Interfaces.IPolizaFiniquito, dSCV.MSSQL.PolizaFiniquito>();
            container.Register<dSCV.Interfaces.IFiniquito, dSCV.MSSQL.Finiquito>();
          
            container.Register<dSCV.Interfaces.IAgendaSPV, dSCV.MSSQL.AgendaSPV>();
            container.Register<dSCV.Interfaces.IHorarioAtencion, dSCV.MSSQL.HorarioAtencion>();
            container.Register<dSCV.Interfaces.IVocacionesSPV, dSCV.MSSQL.VocacionesSPV>();
            container.Register<dSCV.Interfaces.ITramiteAsignado, dSCV.MSSQL.TramiteAsignado>();
            container.Register<dSCV.Interfaces.ITramiteAsignadoConfiguracion, dSCV.MSSQL.TramiteAsignadoConfiguracion>();
            container.Register<dSCV.Interfaces.ISeguimientoTecnico, dSCV.MSSQL.SeguimientoTecnico>();
            container.Register<dSCV.Interfaces.IEntregaUbicaciones, dSCV.MSSQL.EntregaUbicaciones>();
            container.Register<dSCV.Interfaces.IEntregaUbicacionesResponsables, dSCV.MSSQL.EntregaUbicacionesResponsables>();
            container.Register<dSCV.Interfaces.ISupervisoresUbicaciones, dSCV.MSSQL.SupervisoresUbicaciones>();
            container.Register<dSCV.Interfaces.ITabuladores, dSCV.MSSQL.Tabuladores>();
            container.Register<dSCV.Interfaces.ITabuladoresConfiguracion, dSCV.MSSQL.TabuladoresConfiguracion>();
            container.Register<dSCV.Interfaces.IIndicadores, dSCV.MSSQL.Indicadores>();

            container.Register<dSCV.Interfaces.IVerificacion, dSCV.MSSQL.Verificacion>();

            container.Register<dSCV.Interfaces.ICheckLists, dSCV.MSSQL.CheckLists>();
            container.Register<dSCV.Interfaces.ICheckListsPlanAccion, dSCV.MSSQL.CheckListsPlanAccion>();
            container.Register<dSCV.Interfaces.ICausasIncidencias, dSCV.MSSQL.CausasIncidencias>();
            container.Register<dSCV.Interfaces.IResponsableEntregaDesarrollos, dSCV.MSSQL.ResponsableEntregaDesarrollos>();

            container.Register<dSCV.Interfaces.IGestionDocumentos, dSCV.MSSQL.GestionDocumentos>();

            container.Register<dSCV.Interfaces.ITiposExpediente, dSCV.MSSQL.TiposExpediente>();
            container.Register<dSCV.Interfaces.IResponsableEntregaDesarrollos, dSCV.MSSQL.ResponsableEntregaDesarrollos>();
            //container.Register<dSCV.Interfaces.ITiposCambio, dSCV.MSSQL.TiposCambio>();
            container.Register<dSCV.Interfaces.IReporteBoletasProspeccion, dSCV.MSSQL.ReporteBoletasProspeccion>();
            container.Register<dSCV.Interfaces.IReporteProspectosClientes, dSCV.MSSQL.ReporteProspectosClientes>();
            container.Register<dSCV.Interfaces.IReporteAnaliticoProspectos, dSCV.MSSQL.ReporteAnaliticoProspectos>();
            container.Register<dSCV.Interfaces.IReporteConsultaProspectos, dSCV.MSSQL.ReporteConsultaProspectos>();
            container.Register<dSCV.Interfaces.IReporteExpedientes, dSCV.MSSQL.ReporteExpedientes>();
            container.Register<dSCV.Interfaces.IReasignacion, dSCV.MSSQL.Reasignacion>();

            container.Register<dSCV.Interfaces.IInterface, dSCV.MSSQL.Interface>();
            container.Register<dSCV.Interfaces.IInterfaceDetalle, dSCV.MSSQL.InterfaceDetalle>();
            container.Register<dSCV.Interfaces.IInterfaceSaldoFacturaDetalle,dSCV.MSSQL.InterfaceSaldoFacturaDetalle>();

            container.Register<dSCV.Interfaces.IPlanificacionSPV, dSCV.MSSQL.PlanificacionSPV>();
            container.Register<dSCV.Interfaces.IPlanificacionSPVDetalle, dSCV.MSSQL.PlanificacionSPVDetalle>();
            container.Register<dSCV.Interfaces.IPlanificacionSPVDetalleTime, dSCV.MSSQL.PlanificacionSPVDetalleTime>();
            container.Register<dSCV.Interfaces.IPlanificacionSPVDashboard, dSCV.MSSQL.PlanificacionSPVDashboard>();
            container.Register<dSCV.Interfaces.IPuntosVentaDesarrollos, dSCV.MSSQL.PuntosVentaDesarrollos>();

            container.Register<dSCV.Interfaces.IAnalisisProspecto, dSCV.MSSQL.AnalisisProspecto>();

            container.Register<dSCV.Interfaces.IChecklistsControl, dSCV.MSSQL.ChecklistsControl>();
            container.Register<dSCV.Interfaces.IFraccionamientos, dSCV.MSSQL.Fraccionamientos>();
            container.Register<dSCV.Interfaces.ISPVCoordinadores, dSCV.MSSQL.SPVSupervisoresCoordinadores>();
            container.Register<dSCV.Interfaces.ISmFraccionamiento, dSCV.MSSQL.SPVFraccionamientosCAT>();
            container.Register<dSCV.Interfaces.ISPVSupervisoresCAT, dSCV.MSSQL.SPVSupervisoresCat>();
            container.Register<dSCV.Interfaces.IConfigViviendaEntregable, dSCV.MSSQL.ConfigViviendaEntregable>();
            container.Register<dSCV.Interfaces.ICapturaFechaConstruccion, dSCV.MSSQL.CapturaFechaConstruccion>();
            container.Register<dSCV.Interfaces.IReportesFallas, dSCV.MSSQL.ReportesFallas>();
            container.Register<dSCV.Interfaces.IReportesFallasDetalles, dSCV.MSSQL.ReportesFallasDetalles>();
            container.Register<dSCV.Interfaces.IOrdenesTrabajoRUBA, dSCV.MSSQL.OrdenesTrabajoRUBA>();
            container.Register<dSCV.Interfaces.IOrdenesTrabajoDetallesRUBA, dSCV.MSSQL.OrdenesTrabajoDetallesRUBA>();
            container.Register<dSCV.Interfaces.IReportesDictamenes, dSCV.MSSQL.ReportesDictamenes>();
            container.Register<dSCV.Interfaces.IPrereportes, dSCV.MSSQL.Prereportes>();
            container.Register<dSCV.Interfaces.IPrereportesDetalles, dSCV.MSSQL.PrereporteDetalle>();
            container.Register<dSCV.Interfaces.IBitacorasClienteSPV, dSCV.MSSQL.BitacorasClienteSPV>();

            #endregion SCV

            #region SGP

            container.Register<dSGP.Interfaces.ITipoProyecto, dSGP.MSSQL.TipoProyecto>();
            container.Register<dSGP.Interfaces.IProyectos, dSGP.MSSQL.Proyectos>();
            container.Register<dSGP.Interfaces.IReservaTerritorial, dSGP.MSSQL.ReservaTerritorial>();
            container.Register<dSGP.Interfaces.IColaboradores, dSGP.MSSQL.Colaboradores>();
            container.Register<dSGP.Interfaces.ITareas, dSGP.MSSQL.Tareas>();
            container.Register<dSGP.Interfaces.IWBS, dSGP.MSSQL.WBS>();
            container.Register<dSGP.Interfaces.ITareasDependencias, dSGP.MSSQL.TareasDependencias>();
            #endregion SGP
#endif


#if SYBASE17


            #region scv
            container.Register<dSCV.Interfaces.ICatalogosSpv, dSCV.Sybase17.CatalogosSpv>();
            container.Register<dSCV.Interfaces.IFallasAreasComunes, dSCV.Sybase17.FallasAreasComunes>();
            container.Register<dSCV.Interfaces.IEncuestaPoblacional, dSCV.Sybase17.EncuestaPoblacional>();
            container.Register<dSCV.Interfaces.IEventos, dSCV.Sybase17.Eventos>();
            container.Register<dSCV.Interfaces.IComites, dSCV.Sybase17.Comites>();
            container.Register<dSCV.Interfaces.IAsociacionCivil, dSCV.Sybase17.AsociacionCivil>();
            container.Register<dSCV.Interfaces.IReconocimientosRuba, dSCV.Sybase17.ReconocimientosRuba>();
            container.Register<dSCV.Interfaces.IMesaDirectiva, dSCV.Sybase17.MesaDirectiva>();

            container.Register<dSCV.Interfaces.IConsultaViviendaEntregables, dSCV.Sybase17.ConsultaViviendaEntregable>();
            container.Register<dSCV.Interfaces.IConfigViviendaEntregable, dSCV.Sybase17.ConfigViviendaEntregable>();
            container.Register<dSCV.Interfaces.IClasificacionViviendaPendienteEntrega, dSCV.Sybase17.ClasificacionViviendaPendienteEntrega>();
            container.Register<dSCV.Interfaces.IConsultaPreparacionVivienda, dSCV.Sybase17.ConsultaPreparacionVivienda>();
            container.Register<dSCV.Interfaces.IOrigenFalla, dSCV.Sybase17.OrigenFalla>();
            container.Register<dSCV.Interfaces.IDocumentosImpresion, dSCV.Sybase17.DocumentosImpresion>();
            container.Register<dSCV.Interfaces.IUbicacionesFalla, dSCV.Sybase17.UbicacionesFalla>();
            container.Register<dSCV.Interfaces.IUbicacionComun, dSCV.Sybase17.UbicacionComun>();
            container.Register<dSCV.Interfaces.ITipoContratista, dSCV.Sybase17.TipoContratista>();
            container.Register<dSCV.Interfaces.IRezagosEntrega, dSCV.Sybase17.RezagosEntrega>();
            container.Register<dSCV.Interfaces.IMotivosCancelacionPV, dSCV.Sybase17.MotivosCancelacionPV>();
            container.Register<dSCV.Interfaces.ICausasReprogramacion, dSCV.Sybase17.CausasReprogramacion>();
            container.Register<dSCV.Interfaces.ITiposComponentes, dSCV.Sybase17.TiposComponentes>();
            container.Register<dSCV.Interfaces.ITipoFallaAreaComun, dSCV.Sybase17.TipoFallaAreaComun>();
            container.Register<dSCV.Interfaces.IEntregaPaquetes, dSCV.Sybase17.EntregaPaquetes>();
            container.Register<dSCV.Interfaces.ICapturaFechaConstruccion, dSCV.Sybase17.CapturaFechaConstruccion>();
            container.Register<dSCV.Interfaces.IReportesFallas, dSCV.Sybase17.ReportesFallas>();
            container.Register<dSCV.Interfaces.IReporteAnalisisComunidades, dSCV.Sybase17.ReporteAnalisisComunidades>();
            container.Register<dSCV.Interfaces.IReportesFallasDetalles, dSCV.Sybase17.ReportesFallasDetalles>();
            container.Register<dSCV.Interfaces.IBitacoraAutorizacionIncidencia, dSCV.Sybase17.BitacoraAutorizacionIncidencia>();
            container.Register<dSCV.Interfaces.IReportesFallasConsulta, dSCV.Sybase17.ReportesFallasConsulta>();
            container.Register<dSCV.Interfaces.IReporteFallasAreasComunesConsulta, dSCV.Sybase17.ConsultaReporteAreasComunes>();
            container.Register<dSCV.Interfaces.IReportesDictamenes, dSCV.Sybase17.ReportesDictamenes>();
            container.Register<dSCV.Interfaces.IContribucionPorPlaza, dSCV.Sybase17.ContribucionPorPlaza>();
            container.Register<dSCV.Interfaces.IClientesSPV, dSCV.Sybase17.ClientesSPV>();
            container.Register<dSCV.Interfaces.IPrereportes, dSCV.Sybase17.Prereportes>();
            container.Register<dSCV.Interfaces.IPrereportesDetalles, dSCV.Sybase17.PrereporteDetalle>();
            container.Register<dSCV.Interfaces.IUbicaciones, dSCV.Sybase17.Ubicaciones>();
            container.Register<dSCV.Interfaces.IContratistasUbicaciones, dSCV.Sybase17.ContratistasUbicaciones>();
            container.Register<dSCV.Interfaces.IContratistas, dSCV.Sybase17.Contratistas>();
            container.Register<dSCV.Interfaces.IResponsablesConstruccion, dSCV.Sybase17.ResponsablesConstruccion>();
            container.Register<dSCV.Interfaces.IClienteContacto, dSCV.Sybase17.ClientesContactos>();
            container.Register<dSCV.Interfaces.IClientes, dSCV.Sybase17.Clientes>();
            container.Register<dSCV.Interfaces.ICausasFallas, dSCV.Sybase17.CausasFallas>();
            container.Register<dSCV.Interfaces.IFallas, dSCV.Sybase17.Fallas>();
            container.Register<dSCV.Interfaces.IComponentes, dSCV.Sybase17.Componentes>();
            container.Register<dSCV.Interfaces.IOrdenesTrabajoRUBA, dSCV.Sybase17.OrdenesTrabajoRUBA>();
            container.Register<dSCV.Interfaces.IOrdenesTrabajoDetallesRUBA, dSCV.Sybase17.OrdenesTrabajoDetallesRUBA>();
            container.Register<dSCV.Interfaces.IAgendaSPV, dSCV.Sybase17.AgendaSPV>();
            container.Register<dSCV.Interfaces.IAgendasContratistas, dSCV.Sybase17.AgendasContratistas>();
            container.Register<dSCV.Interfaces.IAgendasDictamenes, dSCV.Sybase17.AgendasDictamenes>();
            container.Register<dSCV.Interfaces.IBitacorasClienteSPV, dSCV.Sybase17.BitacorasClienteSPV>();
            container.Register<dSCV.Interfaces.IHorarioAtencion, dSCV.Sybase17.HorarioAtencion>();
            container.Register<dSCV.Interfaces.IPlaza, dSCV.Sybase17.Plazas>();
            container.Register<dSCV.Interfaces.IVocacionesSPV, dSCV.Sybase17.VocacionesSPV>();
            container.Register<dSCV.Interfaces.ISegmentos, dSCV.Sybase17.SegmentosSPV>();
            container.Register<dSCV.Interfaces.ICampaniaPublicidad, dSCV.Sybase17.CampaniaPublicidad>();
            container.Register<dSCV.Interfaces.IEntregaUbicaciones, dSCV.Sybase17.EntregaUbicaciones>();
            container.Register<dSCV.Interfaces.IEntregaUbicacionesResponsables, dSCV.Sybase17.EntregaUbicacionesResponsables>();
            container.Register<dSCV.Interfaces.ISupervisoresUbicaciones, dSCV.Sybase17.SupervisoresUbicaciones>();
            container.Register<dSCV.Interfaces.IFraccionamientos, dSCV.Sybase17.Fraccionamientos>();
            container.Register<dSCV.Interfaces.IBitacorasProcesoSPV, dSCV.Sybase17.BitacorasProcesoSPV>();
            container.Register<dSCV.Interfaces.ISPVCoordinadores, dSCV.Sybase17.SPVSupervisoresCoordinadores>();
            container.Register<dSCV.Interfaces.ISmFraccionamiento, dSCV.Sybase17.SPVFraccionamientosCAT>();
            container.Register<dSCV.Interfaces.ISPVSupervisoresCAT, dSCV.Sybase17.SPVSupervisoresCat>();
            //container.Register<dSCV.Interfaces.ISmFraccionamientoCAT, dSCV.Sybase17.SPVFraccionamientosCAT>();
            #endregion

#endif

            //#if MSSQL
            //#elif SYBASE
            //            container.Register<dKontrol.Interfaces.ICliente, dKontrol.MSSQL.Cliente>();
            //#endif
            #endregion

            #region "Registro de tipos de Procesos"            
            container.Register<mKontrol.Interfaces.IContainerFactory, mKontrol.ContainerFactory>();
            container.Register<pKontrol.Interfaces.IDominios, pKontrol.Dominios>();
            container.Register<pKontrol.Interfaces.IUnidadMedida, pKontrol.UnidadMedida>();
            container.Register<pKontrol.Interfaces.ICompania, pKontrol.Compania>();
            container.Register<pKontrol.Interfaces.IUsuario, pKontrol.Usuario>();
            container.Register<pKontrol.Interfaces.INotification, pKontrol.Notification>();
            container.Register<pKontrol.Interfaces.INotificacionMarcador, pKontrol.NotificacionMarcadores>();
            container.Register<pKontrol.Interfaces.INotificacionUsuario, pKontrol.NotificacionUsuario>();
            container.Register<pKontrol.Interfaces.ICatalogosGenerales, pKontrol.CatalogosGenerales>();
            container.Register<pKontrol.Interfaces.ITipoWorkflow, pKontrol.TipoWorkflow>();
            container.Register<pKontrol.Interfaces.IWorkflow, pKontrol.Workflow>();
            container.Register<pKontrol.Interfaces.ICategorias, pKontrol.Categorias>();
            container.Register<pKontrol.Interfaces.INiveles, pKontrol.Niveles>();

            container.Register<pKontrol.Interfaces.IBitacora, pKontrol.Bitacora>();

            //container.Register<pKontrol.Interfaces.IHistory, pKontrol.History>();
            container.Register<pKontrol.Interfaces.IFlujoTrabajoInstancia, pKontrol.FlujoTrabajoInstancia>();
            //container.Register<pKontrol.Interfaces.IWorkflowInstance, pKontrol.WorkflowInstance>();
            container.Register<pKontrol.Interfaces.IAsentamientos, pKontrol.Asentamientos>();
            //container.Register<pKontrol.Interfaces.IFraccionamientos, pKontrol.Fraccionamientos>();
            container.Register<pKontrol.Interfaces.IPuesto, pKontrol.Puestos>();
            container.Register<pKontrol.Interfaces.ICitas, pKontrol.Citas>();
            container.Register<pKontrol.Interfaces.IConfiguracionFormulario, pKontrol.ConfiguracionFormulario>();
            container.Register<pKontrol.Interfaces.IBlogPost, pKontrol.BlogPost>();
            container.Register<pKontrol.Interfaces.IBlogPostCategorias, pKontrol.BlogPostCategorias>();

            container.Register<pKontrol.Interfaces.ITiposEvento, pKontrol.TiposEvento>();
            container.Register<pKontrol.Interfaces.ITiposEntidad, pKontrol.TiposEntidad>();
            container.Register<pKontrol.Interfaces.IEventos, pKontrol.Eventos>();
            container.Register<pKontrol.Interfaces.ITareasManuales, pKontrol.TareasManuales>();
            container.Register<pKontrol.Interfaces.ITipoCitas, pKontrol.TipoCitas>();
            container.Register<pKontrol.Interfaces.IGruposUsuario, pKontrol.GruposUsuario>();
            container.Register<pKontrol.Interfaces.INotificadores, pKontrol.Notificadores>();
            container.Register<pKontrol.Interfaces.ILocalidades, pKontrol.Localidades>();
            container.Register<pKontrol.Interfaces.ITarea, pKontrol.Tarea>();
            container.Register<pKontrol.Interfaces.ITareaInstance, pKontrol.TareaInstance>();
            container.Register<pKontrol.Interfaces.IOpciones, pKontrol.Opciones>();
            container.Register<pKontrol.Interfaces.IOpcionSistema, pKontrol.OpcionSistema>();
            container.Register<pKontrol.Interfaces.IModulos, pKontrol.Modulos>();
            //container.Register<pKontrol.Interfaces.IUsuarioNivelCompania, pKontrol.UsuarioNivelCompania>();
            container.Register<pKontrol.Interfaces.IParametros, pKontrol.Parametros>();
            container.Register<pKontrol.Interfaces.IConfigurarParametros, pKontrol.ConfigurarParametros>();
            container.Register<pKontrol.Interfaces.IWorkflowManager, pKontrol.WorkflowManager>();
            container.Register<pKontrol.Interfaces.ICatalogosGeneralesValores, pKontrol.CatalogosGeneralesValores>();
            container.Register<pKontrol.Interfaces.ICGValores, pKontrol.CGValores>();
            //container.Register<pKontrol.Interfaces.IClientesModulos, pKontrol.ClientesModulos>();
            container.Register<pKontrol.Interfaces.IEnvioCorreo, pKontrol.EnvioCorreo>();
            container.Register<pKontrol.Interfaces.IPlantillasMails, pKontrol.PlantillasMails>();
            container.Register<pKontrol.Interfaces.IPlantillasLeads, pKontrol.PlantillasLeads>();
            container.Register<pKontrol.Interfaces.IClasificadores, pKontrol.Clasificadores>();
            container.Register<pKontrol.Interfaces.IHistory, pKontrol.History>();
            container.Register<pKontrol.Interfaces.IPosicion, pKontrol.Posicion>();
            container.Register<pKontrol.Interfaces.IMonedas, pKontrol.Monedas>();
            container.Register<pKontrol.Interfaces.IKontrolFiles, pKontrol.KontrolFiles>();
            container.Register<pKontrol.Interfaces.ICentroCosto, pKontrol.CentroCosto>();
            container.Register<pKontrol.Interfaces.ICalendar, pKontrol.Calendar>();
            container.Register<pKontrol.Interfaces.ICatalogoClasificadores, pKontrol.CatalogoClasificadores>();
            container.Register<pKontrol.Interfaces.ITiposClasificador, pKontrol.TiposClasificador>();
            //container.Register<pKontrol.Interfaces.ICitas, pKontrol.Citas>();
            //container.Register<pKontrol.Interfaces.ITipoCitas, pKontrol.TipoCitas>();
            //container.Register<pKontrol.Interfaces.IGruposUsuario, pKontrol.GruposUsuario>();
            
            //container.Register<pKontrol.Interfaces.INotificadores, pKontrol.Notificadores>();
            container.Register<pKontrol.Interfaces.IVistas, pKontrol.Vistas>();
            container.Register<pKontrol.Interfaces.IVistaElemento, pKontrol.VistaElemento>();
            container.Register<pKontrol.Interfaces.IReportes, pKontrol.Reportes>();
            container.Register<pKontrol.Interfaces.IEntidades, pKontrol.Entidades>();
            container.Register<pKontrol.Interfaces.IPersonalizarCampos, pKontrol.PersonalizarCampos>();
            container.Register<pKontrol.Interfaces.IPersonalizarCamposOpciones, pKontrol.PersonalizarCamposOpciones>();
            container.Register<pKontrol.Interfaces.IPullNotifications, pKontrol.PullNotifications>();
            container.Register<pKontrol.Interfaces.IPullNotificationsActions, pKontrol.PullNotificationsActions>();
            container.Register<pKontrol.Interfaces.IPullNotificationsEntities, pKontrol.PullNotificationsEntities>();
            container.Register<pKontrol.Interfaces.IPullNotificationsFiles, pKontrol.PullNotificationsFiles>();

            //container.Register<pKontrol.Interfaces.IAgenda, pKontrol.Agenda>();
            //container.Register<pKontrol.Interfaces.IChatConversacion, pKontrol.Chat>();
            //container.Register<pKontrol.Interfaces.IChatTema, pKontrol.Chat>();

            #region SBO
            //container.Register<pSBO.Interfaces.ITipoMovimiento, pSBO.TipoMovimiento>();
            //container.Register<pSBO.Interfaces.IBancos, pSBO.Bancos>();
            ////container.Register<pSBO.Interfaces.ISubTipoMovimiento, pSBO.SubTipoMovimiento>();
            //container.Register<pSBO.Interfaces.ICuentaBancaria, pSBO.CuentaBancaria>();
            //container.Register<pSBO.Interfaces.ICheques, pSBO.Cheques>();
            #endregion

            #region SCCO
            container.Register<pSCO.Interfaces.ICentrosCosto, pSCO.CentrosCosto>();
            container.Register<pSCO.Interfaces.IPolizas, pSCO.Polizas>();
            container.Register<pSCCO.Interfaces.ITipoObra, pSCCO.TipoObra>();
            container.Register<pSCCO.Interfaces.ITipoInsumo, pSCCO.TipoInsumo>();
            container.Register<pSCCO.Interfaces.IObra, pSCCO.Obra>();
            container.Register<pSCCO.Interfaces.IInsumos, pSCCO.Insumos>();
            container.Register<pSCCO.Interfaces.IInsumosMateriales, pSCCO.InsumosMateriales>();
            container.Register<pSCCO.Interfaces.IGrupoInsumo, pSCCO.GrupoInsumo>();
            container.Register<pSCCO.Interfaces.ITipoNivelesPresupuesto, pSCCO.TipoNivelesPresupuesto>();
            container.Register<pSCCO.Interfaces.IResidentes, pSCCO.Residentes>();
            container.Register<pSCCO.Interfaces.IMotivosOrdenesCambio, pSCCO.MotivosOrdenesCambio>();
            container.Register<pSCCO.Interfaces.INivelesPresupuesto, pSCCO.NivelesPresupuesto>();
            container.Register<pSCCO.Interfaces.IAnticiposDeducciones, pSCCO.AnticiposDeducciones>();
            container.Register<pSCCO.Interfaces.IDesarrollosSCCO, pSCCO.DesarrollosSCCO>();
            container.Register<pSCCO.Interfaces.IInsumosTarjetas, pSCCO.InsumosTarjetas>();
            container.Register<pSCCO.Interfaces.IPresupuestos, pSCCO.Presupuestos>();
            container.Register<pSCCO.Interfaces.ITabuladores, pSCCO.Tabuladores>();
            container.Register<pSCCO.Interfaces.ICalculoWBS, pSCCO.Calculos.CalculoWBS>();

            container.Register<pSCCO.Interfaces.IContratos, pSCCO.Contratos>();
            container.Register<pSCCO.Interfaces.IConvenios, pSCCO.Convenios>();
            #endregion SCO

            #region SCP
            container.Register<pSCP.Interfaces.IProveedores, pSCP.Proveedores>();
            container.Register<pSCP.Interfaces.IProveedoresActasConstitutivas, pSCP.ProveedoresActasConstitutivas>();
            container.Register<pSCP.Interfaces.IProveedoresRegistroPublicoPropiedad, pSCP.ProveedoresRegistroPublicoPropiedad>();
            container.Register<pSCP.Interfaces.ITipoMovimientoProveedores, pSCP.TipoMovimientoProveedores>();
            container.Register<pSCP.Interfaces.ITipoProveedores, pSCP.TipoProveedores>();
            //container.Register<pSCP.Interfaces.IPagosProgramados, pSCP.PagosProgramados>();
            #endregion SCP

            #region SDC
            container.Register<pSDC.Interfaces.IEstadoCuenta, pSDC.EstadoCuenta>();
            container.Register<pSDC.Interfaces.ITicketsClientes, pSDC.TicketsClientes>();
            #endregion SDC


            #region DRIVERS
#if SYBASE17
            container.Register<EK.Drivers.Log.ILogger, EK.Drivers.Log.Sybase.Logger>();
#else
            container.Register<EK.Drivers.Log.ILogger, EK.Drivers.Log.MSSQL.Logger>();
#endif
            container.Register(typeof(EK.Drivers.Storage.IStorage), Type.GetType(storageTarget));

            //if ("file".Equals(storageTarget))
            //{

            //  container.Register<EK.Drivers.Storage.IStorage, EK.Drivers.Storage.FileSystemStorage>();
            //}
            //else if ("blob".Equals(storageTarget))
            //{
            //    container.Register<EK.Drivers.Storage.IStorage, EK.Drivers.Storage.BlobStorage>();
            //}

            container.Register<EK.Drivers.Documents.IDocument, EK.Drivers.Documents.Xc.Document>();
            container.Register<EK.Drivers.Emailing.Plantilla, EK.Drivers.Emailing.Plantilla>();
            container.Register<EK.Drivers.Notifications.IClientEmail, EK.Drivers.Notifications.Email.SMTP.ClientEmail>();
            container.Register<EK.Drivers.Notifications.IClientSMS, EK.Drivers.Notifications.SMS.AWS.ClientSMS>();
            container.Register<EK.Drivers.Notifications.IClientNotification, EK.Drivers.Notifications.ClientNotification>();
            container.Register(typeof(EK.Drivers.Common.IKontrolFiles), EntityBuilderProxy.Build<EK.Drivers.Common.IKontrolFiles>());



            #endregion

            #region SCV
            container.Register<pSCV.Interfaces.IExpedienteSeguimiento, pSCV.ExpedienteSeguimiento>();


            container.Register<pSCV.Interfaces.IEtapas, pSCV.Etapas>();
            container.Register<pSCV.Interfaces.ICampaniaPublicidad, pSCV.CampaniaPublicidad>();
            container.Register<pSCV.Interfaces.ISegmentos, pSCV.Segmentos>();
            container.Register<pSCV.Interfaces.ISegmentosVigencia, pSCV.SegmentosVigencia>();
            container.Register<pSCV.Interfaces.IRangosIngresos, pSCV.RangosIngresos>();
            container.Register<pSCV.Interfaces.ITiposCambio, pSCV.TiposCambio>();
            container.Register<pSCV.Interfaces.IInstituciones, pSCV.Instituciones>();
            container.Register<pSCV.Interfaces.IEmpresas, pSCV.Empresas>();
            container.Register<pSCV.Interfaces.IPuntosVenta, pSCV.PuntosVenta>();
            container.Register<pSCV.Interfaces.IListaPrecios, pSCV.ListaPrecios>();
            container.Register<pSCV.Interfaces.IUbicaciones, pSCV.Ubicaciones>();
            container.Register<pSCV.Interfaces.IClientes, pSCV.Clientes>();
            container.Register<pSCV.Interfaces.IMotivosCancelacion, pSCV.MotivosCancelacion>();
            //container.Register<pSCV.Interfaces.IPuntosVenta, pSCV.PuntosVenta>();
            container.Register<pSCV.Interfaces.IPrototipo, pSCV.Prototipos>();
            container.Register<pSCV.Interfaces.IUbicacionesFallaPrototipos, pSCV.UbicacionesFallaPrototipos>();
            container.Register<pSCV.Interfaces.ICaracteristicaAdicional, pSCV.CaracteristicaAdicional>();
            container.Register<pSCV.Interfaces.IDesarrollos, pSCV.Desarrollos>();
            container.Register<pSCV.Interfaces.IBienesAdicionales, pSCV.BienesAdicionales>();
            container.Register<pSCV.Interfaces.IRadarClientes, pSCV.RadarClientes>();

            container.Register<pSCV.Interfaces.IUbicacionesEstatus, pSCV.UbicacionesEstatus>();

            container.Register<pSCV.Interfaces.ISindicatos, pSCV.Sindicatos>();

            container.Register<pSCV.Interfaces.IBoletasProspeccion, pSCV.BoletasProspeccion>();

            container.Register<pSCO.Interfaces.IOrdenesCompra, pSCO.OrdenesCompra>();

            container.Register<pSCV.Interfaces.IComisionesSeguimiento, pSCV.ComisionesSeguimiento>();
            container.Register<pSCV.Interfaces.IComisionesTabuladores, pSCV.ComisionesTabuladores>();
            container.Register<pSCV.Interfaces.IComisionesAjustes, pSCV.ComisionesAjustes>();


            //container.Register<pSCV.Interfaces.IComisionCompania, pSCV.TMComisiones>();
            container.Register<pSCV.Interfaces.IComisionesConfiguracion, pSCV.ComisionesConfiguracion>();



            container.Register<pSCV.Interfaces.ISCVNotificacion, pSCV.SCVNotificacion>();
            container.Register<pSCV.Interfaces.IPaquetes, pSCV.Paquetes>();
            container.Register<pSCV.Interfaces.ITipoFinanciamiento, pSCV.TipoFinanciamiento>();
            container.Register<pSCV.Interfaces.IMotivoSuspension, pSCV.MotivoSuspension>();
            container.Register<pSCV.Interfaces.ICentralesObreras, pSCV.CentralesObreras>();
            container.Register<pSCV.Interfaces.IPlanesPagos, pSCV.PlanesPagos>();
            container.Register<pSCV.Interfaces.IPlaza, pSCV.Plaza>();
            //container.Register<pSCV.Interfaces.ITipoCliente, pSCV.TipoCliente>();
            container.Register<pSCV.Interfaces.IPlanesPagoConceptosPagos, pSCV.PlanesPagoConceptoPago>();
            container.Register<pSCV.Interfaces.INotarios, pSCV.Notarios>();
            container.Register<pSCV.Interfaces.IConceptosPago, pSCV.ConceptosPago>();
            container.Register<pSCV.Interfaces.IVentas, pSCV.Ventas>();
            container.Register<pSCV.Interfaces.IUsuarios, pSCV.Usuarios>();
            container.Register<pSCV.Interfaces.IRequisitos, pSCV.Requisitos>();
            container.Register<pSCV.Interfaces.IDocumentosExpediente, pSCV.DocumentosExpediente>();
            container.Register<pSCV.Interfaces.IEsquemas, pSCV.Esquemas>();
            container.Register<pSCV.Interfaces.IProcesos, pSCV.Procesos>();
            container.Register<pSCV.Interfaces.ISeguimientos, pSCV.Seguimientos>();
            container.Register<pSCV.Interfaces.ISeguimientosRequisitos, pSCV.SeguimientosRequisitos>();
            container.Register<pSCV.Interfaces.IFasesExpediente, pSCV.FasesExpediente>();
            container.Register<pSCV.Interfaces.IMacroEtapas, pSCV.MacroEtapas>();
            container.Register<pSCV.Interfaces.IExpedientes, pSCV.Expedientes>();
            container.Register<pSCV.Interfaces.IExpedientesReportes, pSCV.ExpedientesReportes>();

            container.Register<pSCV.Interfaces.ITmComisiones, pSCV.TMComisiones>();
            container.Register<pSCV.Interfaces.ITiposUbicacion, pSCV.TiposUbicacion>();
            container.Register<pSCV.Interfaces.IComisionesAprobacion, pSCV.ComisionesAprobacion>();
            
            container.Register<pSCV.Interfaces.IRegimen, pSCV.Regimen>();
            //container.Register<pSCV.Interfaces.IExpedientes, pSCV.Expedientes>();
            container.Register<pSCV.Interfaces.IExpedientesInstantaneas, pSCV.ExpedientesInstantaneas>();
            container.Register<pSCV.Interfaces.IDashBoardExpedientes, pSCV.DashBoardExpedientes>();
            container.Register<pSCV.Interfaces.IDashBoardConfiguraciones, pSCV.DashBoardConfiguraciones>();
            container.Register<pSCV.Interfaces.IExpedientesOwners, pSCV.ExpedientesOwners>();
            container.Register<pSCV.Interfaces.IUbicacionCoordenadas, pSCV.UbicacionCoordenadas>();

            container.Register<pSCV.Interfaces.IFallasAreasComunes, pSCV.FallasAreasComunes>();
            container.Register<pSCV.Interfaces.ICatalogosSpv, pSCV.CatalogosSpv>();
            container.Register<pSCV.Interfaces.IEncuestaPoblacional, pSCV.EncuestaPoblacional>();
            container.Register<pSCV.Interfaces.IComites, pSCV.Comites>();
            container.Register<pSCV.Interfaces.IEventos, pSCV.Eventos>();
            container.Register<pSCV.Interfaces.IAsociacionCivil, pSCV.AsociacionCivil>();
            container.Register<pSCV.Interfaces.IReconocimientosRuba, pSCV.ReconocimientosRuba>();
            container.Register<pSCV.Interfaces.IMesaDirectiva, pSCV.MesaDIrectiva>();

            container.Register<pSCV.Interfaces.IUbicacionesFalla, pSCV.UbicacionesFalla>();
            container.Register<pSCV.Interfaces.IUbicacionComun, pSCV.UbicacionComun>();
            container.Register<pSCV.Interfaces.ITipoContratista, pSCV.TipoContratista>();
            container.Register<pSCV.Interfaces.IOrigenFalla, pSCV.OrigenFalla>();
            container.Register<pSCV.Interfaces.IDocumentosImpresion, pSCV.DocumentosImpresion>();
            container.Register<pSCV.Interfaces.IRezagosEntrega, pSCV.RezagosEntrega>();
            container.Register<pSCV.Interfaces.IMotivosCancelacionPV, pSCV.MotivosCancelacionPV>();
            container.Register<pSCV.Interfaces.ICausasReprogramacion, pSCV.CausasReprogramacion>();
            container.Register<pSCV.Interfaces.ITiposComponentes, pSCV.TiposComponentes>();
            container.Register<pSCV.Interfaces.ITipoFallaAreaComun, pSCV.TipoFallaAreaComun>();
            container.Register<pSCV.Interfaces.IConceptosCredito, pSCV.ConceptosCredito>();
            container.Register<pSCV.Interfaces.ITipoComercializacion, pSCV.TipoComercializacion>();
            container.Register<pSCV.Interfaces.IReportesFallas, pSCV.ReportesFallas>();
            container.Register<pSCV.Interfaces.IReporteAnalisisComunidades, pSCV.ReporteAnalisisComunidades>();
            container.Register<pSCV.Interfaces.IReportesFallasActualizador, pSCV.ReportesFallasActualizador>();
            container.Register<pSCV.Interfaces.IReporteFallasAreasComunesActualizador, pSCV.ReporteFallasAreasComunesActivador>();
            container.Register<pSCV.Interfaces.IReportesFallasConsulta, pSCV.ReportesFallasConsulta>();
            container.Register<pSCV.Interfaces.IReporteFallasAreasComunesConsulta, pSCV.ConsultaReporteAreasComunes>();
            container.Register<pSCV.Interfaces.IContribucionPorPlaza, pSCV.ContribucionPorPlaza>();
            container.Register<pSCV.Interfaces.IPrereportes, pSCV.Prereportes>();
            container.Register<pSCV.Interfaces.IPrereportesDET, pSCV.PrereporteDetalle>();
            container.Register<pSCV.Interfaces.IConsultaPreparacionVivienda, pSCV.ConsultaPreparacionVivienda>();
            container.Register<pSCV.Interfaces.IContratistasUbicaciones, pSCV.ContratistasUbicaciones>();
            container.Register<pSCV.Interfaces.IContratistas, pSCV.Contratistas>();

            container.Register<pSCV.Interfaces.IVerificacion, pSCV.Verificacion>();

            container.Register<pSCV.Interfaces.ICausasFallas, pSCV.CausasFallas>();
            container.Register<pSCV.Interfaces.ICausasIncidencias, pSCV.CausasIncidencias>();
            
            //container.Register<dSCV.Interfaces.IContratistasUbicaciones, dSCV.MSSQL.ContratistasUbicaciones>(); 

            container.Register<pSCV.Interfaces.IComponentesIncidencias, pSCV.ComponentesIncidencias>();
            container.Register<pSCV.Interfaces.IFallas, pSCV.Fallas>();
            container.Register<pSCV.Interfaces.ICheckLists, pSCV.CheckLists>();
            container.Register<pSCV.Interfaces.ITickets, pSCV.Tickets>();

            container.Register<pSCV.Interfaces.IPlanCompromisosConstruccion, pSCV.PlanCompromisosConstruccion>();
            container.Register<pSCV.Interfaces.IPlanCompromisosEntrega, pSCV.PlanCompromisosEntrega>();


            //container.Register<pSCV.Interfaces.IFalla, pSCV.Falla>();
            //container.Register<pSCV.Interfaces.IFalla, pSCV.Falla>();

            container.Register<pSCV.Interfaces.IComponentes, pSCV.Componentes>();
            container.Register<pSCV.Interfaces.IAgendaSPV, pSCV.AgendaSPV>();
            container.Register<pSCV.Interfaces.IHorarioAtencion, pSCV.HorarioAtencion>();
            container.Register<pSCV.Interfaces.IVocacionesSPV, pSCV.VocacionesSPV>();

            container.Register<pSCV.Interfaces.ITipoMovimiento, pSCV.TipoMovimiento>();
            container.Register<pSCV.Interfaces.IImpuestos, pSCV.Impuestos>();
            container.Register<pSCV.Interfaces.IListasMkt, pSCV.ListasMkt>();
            container.Register<pSCV.Interfaces.IListasMktDet, pSCV.ListasMktDet>();
            container.Register<pSCV.Interfaces.IListaMarketingCliente, pSCV.ListaMarketingCliente>();
            container.Register<pSCV.Interfaces.IOrigen, pSCV.Origen>();
            container.Register<pSCV.Interfaces.ICriterios, pSCV.Criterios>();
            container.Register<pSCV.Interfaces.ISeguimientoCampaniaPublicidad, pSCV.SeguimientoCampaniaPublicidad>();
            container.Register<pSCV.Interfaces.ITiposDeProcesos, pSCV.TiposDeProcesos>();
            container.Register<pSCV.Interfaces.ITramiteAsignado, pSCV.TramiteAsignado>();
            container.Register<pSCV.Interfaces.ITramiteAsignadoConfiguracion, pSCV.TramiteAsignadoConfiguracion>();
            container.Register<pSCV.Interfaces.ISeguimientoTecnico, pSCV.SeguimientoTecnico>();
            container.Register<pSCV.Interfaces.ITabuladores, pSCV.Tabuladores>();
            container.Register<pSCV.Interfaces.IIndicadores, pSCV.Indicadores>();
            container.Register<pSCV.Interfaces.IPolizaFiniquito, pSCV.PolizaFiniquito>();
            container.Register<pSCV.Interfaces.IFiniquito, pSCV.Finiquito>();
            container.Register<pSCV.Interfaces.IReporteBoletasProspeccion, pSCV.ReporteBoletasProspeccion>();
            container.Register<pSCV.Interfaces.IReporteProspectosClientes, pSCV.ReporteProspectosClientes>();
            container.Register<pSCV.Interfaces.ITiposExpediente, pSCV.TiposExpediente>();
            container.Register<pSCV.Interfaces.IReporteAnaliticoProspectos, pSCV.ReporteAnaliticoProspectos>();
            container.Register<pSCV.Interfaces.IReporteConsultaProspectos, pSCV.ReporteConsultaProspectos>();
            container.Register<pSCV.Interfaces.IGestionDocumentos, pSCV.GestionDocumentos>();         
            container.Register<pSCV.Interfaces.IReporteExpedientes, pSCV.ReporteExpedientes>();
            container.Register<pSCV.Interfaces.IReasignacion, pSCV.Reasignacion>();

            container.Register<pSCV.Interfaces.IInterface, pSCV.Interface>();


            container.Register<pSCV.Interfaces.IPlanificacionSPV, pSCV.PlanificacionSPV>();
            container.Register<pSCV.Interfaces.ISPVEncuestasSatisfaccionFija, pSCV.SPVEncuestasSatisfaccionFija>();
            container.Register<pSCV.Interfaces.IReporteEncuestaSatisfaccion, pSCV.ReporteEncuestaSatisfaccion>();
            container.Register<pSCV.Interfaces.IReporteSeguimientoVivProg, pSCV.ReporteSeguimientoVivProg>();

            #region +++++++++++++++++++++ AREAS COMUNES ++++++++++++++++++++++++++++++
            container.Register<pSCV.Interfaces.IReporteFallasAreasComunes, pSCV.ReporteFallasAreasComunes>();
            container.Register<pSCV.Interfaces.IOrdenesTrabajoRUBAAreasComunes, pSCV.OrdenesTrabajoRUBAAreasComunes>();
            container.Register<pSCV.Interfaces.IBitacorasClienteSPVAreasComunes, pSCV.BitacoraClienteSPVAreasComunes>();

            #endregion
            container.Register<pSCV.Interfaces.IAnalisisProspecto, pSCV.AnalisisProspecto>();

            //container.Register<pSCV.Interfaces.ITiposCambio, pSCV.TiposCambio>();

            container.Register<pSCV.Interfaces.IChecklistsControl, pSCV.ChecklistControl>();
            container.Register<pSCV.Interfaces.EKCONNECT.IEKCChats, pSCV.SPV.EKCONNECT.EKCChats>();
            container.Register<pSCV.Interfaces.EKCONNECT.IEKCMensajes, pSCV.SPV.EKCONNECT.EKCMensajes>();
            container.Register<pSCV.Interfaces.EKCONNECT.IEKCUsuariosRedesSociales, pSCV.SPV.EKCONNECT.EKCUsuariosRedesSociales>();
            container.Register<pSCV.Interfaces.PlantillaMeta.IPlantillaMeta, pSCV.SPV.PlantillasMeta.PlantillasMeta>();

            #region SCV

            container.Register<pSCV.Interfaces.IConsultaViviendaEntregable, pSCV.ConsultaViviendaEntregable>();
            container.Register<pSCV.Interfaces.IConfigViviendaEntregable, pSCV.ConfigViviendaEntregable>();
            container.Register<pSCV.Interfaces.IClasificacionViviendaPendienteEntrega, pSCV.ClasificacionViviendaPendienteEntrega>();
            container.Register<pSCV.Interfaces.ICapturaFechaConstruccion, pSCV.CapturaFechaConstruccion>();
            container.Register<pSCV.Interfaces.IEntregaPaquetes, pSCV.EntregaPaquetes>();
            container.Register<pSCV.Interfaces.IPersonalEntregaUbicaciones, pSCV.PersonalEntregaUbicaciones>();
            container.Register<pSCV.Interfaces.ISPVSupervisoresCoordinadores, pSCV.SPVSupervisoresCoordinadores>();
            container.Register<pSCV.Interfaces.ISPVFraccionamientosCAT, pSCV.SPVFraccionamientosCAT>();
            container.Register<pSCV.Interfaces.ISPVSupervisoresCat, pSCV.SPVSupervisoresCat>();
            //container.Register<pSCV.Interfaces.ISPVFraccionamientosCAT, pSCV.SPVFraccionamientosCAT>();
            container.Register<pSCV.Interfaces.IEntregaUbicaciones, pSCV.EntregaUbicaciones>();
            container.Register<pSCV.Interfaces.ISupervisoresUbicaciones, pSCV.SupervisoresUbicaciones>();
            container.Register<pSCV.Interfaces.IFraccionamientos, pSCV.Fraccionamientos>();
            container.Register<pSCV.Interfaces.IClientesSPV, pSCV.ClientesSPV>();
            container.Register<pSCV.Interfaces.IResponsableEntregaDesarrollos, pSCV.ResponsableEntregaDesarrollos>();
            container.Register<pSCV.Interfaces.IOrdenesTrabajoRUBA, pSCV.OrdenesTrabajoRUBA>();
            container.Register<pSCV.Interfaces.IBitacorasClienteSPV, pSCV.BitacoraClienteSPV>();
            #endregion


            #region Calculos
            container.Register<pSCV.Interfaces.ICalculoConceptoPV, pSCV.Calculos.CalculoInteresValorFuturo>();
            container.Register<pSCV.Interfaces.ICalculoPlanVenta, pSCV.Calculos.CalculoPlanVentaVF>();
            container.Register<pSCV.Interfaces.ICalculoProcesos, pSCV.Calculos.CalculoProcesos>();
            container.Register<pSCV.Interfaces.ICalculoProcesosMetodos, pSCV.Calculos.CalculoProcesosMetodos>();

            #endregion

            #endregion

            #region SGP

            container.Register<pSGP.Interfaces.ITipoProyecto, pSGP.TipoProyecto>();
            container.Register<pSGP.Interfaces.IProyectos, pSGP.Proyectos>();
            container.Register<pSGP.Interfaces.IReservaTerritorial, pSGP.ReservaTerritorial>();
            container.Register<pSGP.Interfaces.ITareas, pSGP.Tareas>();
            container.Register<pSGP.Interfaces.IWBS, pSGP.WBS>();

            #endregion SGP

            #endregion
            //
            return container;
        }

        public static Container GetContainer()
        {
            return Bootstrap();
            //get
            //{
            //    //lock (thisLock)
            //    //{
            //    //if (container == null)
            //    //{
            //    //    Bootstrap();
            //    //}
            //    //}

                
            //}
        }
        //public static EK.Utils.CommandManager CommandManager
        //{
        //    get
        //    {
        //        if (commandManager == null)
        //        {
        //            commandManager = BootstrapperKontrolAPI.Container.GetInstance<EK.Utils.CommandManager>();
        //            commandManager.AddAssembly("EK.Procesos.Kontrol");
        //            commandManager.AddAssembly("EK.Procesos.SBO");
        //            //commandManager.AddAssembly("EK.Procesos.SCO");
        //            commandManager.AddAssembly("EK.Procesos.SCP");
        //            commandManager.AddAssembly("EK.Procesos.SCV");
        //            commandManager.AddAssembly("EK.Procesos.SCCO");
        //            commandManager.Topic = "kontrolapi";
        //        }

        //        return commandManager;
        //    }
        //}
    }
}