//using System;

//using mKontrol = EK.Modelo.Kontrol;
//using dKontrol = EK.Datos.Kontrol;
//using pKontrol = EK.Procesos.Kontrol;

//using EK.Common.Managers;

//using SimpleInjector;
//using SimpleInjector.Extensions;

//namespace EK.IS.Helpers
//{
//    public static class Bootstrapper
//    {
//        private static Container container;
//        private static CommandManager commandManager;

//        public static void Bootstrap()
//        {
//            container = new Container();
//            container.Register<CommandManager>();
//            #region "Registro de tipos de Modelo"
//            container.Register<mKontrol.Interfaces.ICommandQuery, mKontrol.CommandQuery>();
//            container.Register<mKontrol.Interfaces.ICommandResult, mKontrol.CommandResult>();
//            container.Register<mKontrol.Interfaces.ICliente, mKontrol.Cliente>();
//            container.Register<mKontrol.Interfaces.ICompania, mKontrol.Compania>();
//            container.Register<mKontrol.Interfaces.IBaseUsuario, mKontrol.BaseUsuario>();
//            container.Register<mKontrol.Interfaces.IUsuario, mKontrol.Usuario>();
//            container.Register<mKontrol.Interfaces.IParametro, mKontrol.Parametro>();
//            container.Register<mKontrol.Interfaces.INotification, mKontrol.Notification>();
//            container.Register<mKontrol.Interfaces.INotificationItem, mKontrol.NotificationItem>();
//            container.Register<mKontrol.Interfaces.IItemGeneral, mKontrol.ItemGeneral>();
//            container.Register<mKontrol.Interfaces.IWorkflow, mKontrol.Workflow>();
//            container.Register<mKontrol.Interfaces.INotificador, mKontrol.Notificador>();
//            container.Register<mKontrol.Interfaces.ITarea, mKontrol.Tarea>();
//            container.Register<mKontrol.Interfaces.INiveles, mKontrol.Niveles>();
//            container.Register<mKontrol.Interfaces.ILocalidades, mKontrol.Localidades>();
//            container.Register<mKontrol.Interfaces.IWorkflowInstance, mKontrol.WorkflowInstance>();
//            container.Register<mKontrol.Interfaces.ITareaInstancia, mKontrol.TareaInstancia>();
//            container.Register<mKontrol.Interfaces.ITareaInstanciaDocumentos, mKontrol.DocumentosTareaInstancia>();
//            container.Register<mKontrol.Interfaces.IWorkflowReference, mKontrol.WorkflowReference>();
//            container.Register<mKontrol.Interfaces.IOpcionModulo, mKontrol.OpcionModulo>();
//            container.Register<mKontrol.Interfaces.IModulo, mKontrol.Modulo>();
//            container.Register<mKontrol.Interfaces.IUsuarioNivelCompania, mKontrol.UsuarioNivelCompania>();
//            container.Register<mKontrol.Interfaces.IConfigurarParametros, mKontrol.ConfigurarParametros>();
//            container.Register<mKontrol.Interfaces.IAsentamientos, mKontrol.Asentamientos>();
//            container.Register<mKontrol.Interfaces.IItemGeneralValores, mKontrol.ItemGeneralValores>();

//            #endregion

//            #region "Registro de tipos de Datos"
//            container.Register<dKontrol.Interfaces.IDBHelper, dKontrol.MSSQL.DBHelper>();
//            container.Register<dKontrol.Interfaces.ICliente, dKontrol.MSSQL.Cliente>();
//            container.Register<dKontrol.Interfaces.ICompania, dKontrol.MSSQL.Companias>();
//            container.Register<dKontrol.Interfaces.INotification, dKontrol.MSSQL.Notification>();
//            container.Register<dKontrol.Interfaces.ICatalogosGenerales, dKontrol.MSSQL.CatalogosGenerales>();
//            container.Register<dKontrol.Interfaces.IUsuarios, dKontrol.MSSQL.Usuarios>();
//            container.Register<dKontrol.Interfaces.IWorkflow, dKontrol.MSSQL.Workflow>();
//            container.Register<dKontrol.Interfaces.INiveles, dKontrol.MSSQL.Niveles>();
//            container.Register<dKontrol.Interfaces.IWorkflowInstance, dKontrol.MSSQL.WorkflowInstance>();
//            container.Register<dKontrol.Interfaces.ILocalidades, dKontrol.MSSQL.Localidades>();
//            container.Register<dKontrol.Interfaces.ITarea, dKontrol.MSSQL.Tarea>();
//            container.Register<dKontrol.Interfaces.ITareaInstance, dKontrol.MSSQL.TareaInstance>();
//            container.Register<dKontrol.Interfaces.IOpciones, dKontrol.MSSQL.Opciones>();
//            container.Register<dKontrol.Interfaces.IModulos, dKontrol.MSSQL.Modulos>();
//            container.Register<dKontrol.Interfaces.IUsuarioNivelCompania, dKontrol.MSSQL.UsuarioNivelCompania>();
//            container.Register<dKontrol.Interfaces.IParametros, dKontrol.MSSQL.Parametros>();
//            container.Register<dKontrol.Interfaces.IConfigurarParametros, dKontrol.MSSQL.ConfigurarParametros>();
//            container.Register<dKontrol.Interfaces.IWorkflowManager, dKontrol.MSSQL.WorkflowManager>();
//            container.Register<dKontrol.Interfaces.ICatalogosGeneralesValores, dKontrol.MSSQL.CatalogosGeneralesValores>();
//            #endregion

//            #region "Registro de tipos de Procesos"            
//            container.Register<mKontrol.Interfaces.IContainerFactory, mKontrol.ContainerFactory>();
//            container.Register<pKontrol.Interfaces.ICliente, pKontrol.Cliente>();
//            container.Register<pKontrol.Interfaces.ICompania, pKontrol.Compania>();
//            container.Register<pKontrol.Interfaces.IUsuario, pKontrol.Usuario>();
//            container.Register<pKontrol.Interfaces.INotification, pKontrol.Notification>();
//            container.Register<pKontrol.Interfaces.ICatalogosGenerales, pKontrol.CatalogosGenerales>();
//            container.Register<pKontrol.Interfaces.IWorkflow, pKontrol.Workflow>();
//            container.Register<pKontrol.Interfaces.INiveles, pKontrol.Niveles>();
//            container.Register<pKontrol.Interfaces.IHistory, pKontrol.History>();
//            container.Register<pKontrol.Interfaces.IWorkflowInstance, pKontrol.WorkflowInstance>();
//            container.Register<pKontrol.Interfaces.ILocalidades, pKontrol.Localidades>();
//            container.Register<pKontrol.Interfaces.ITarea, pKontrol.Tarea>();
//            container.Register<pKontrol.Interfaces.ITareaInstance, pKontrol.TareaInstance>();
//            container.Register<pKontrol.Interfaces.IOpciones, pKontrol.Opciones>();
//            container.Register<pKontrol.Interfaces.IModulos, pKontrol.Modulos>();
//            container.Register<pKontrol.Interfaces.IUsuarioNivelCompania, pKontrol.UsuarioNivelCompania>();
//            container.Register<pKontrol.Interfaces.IParametros, pKontrol.Parametros>();
//            container.Register<pKontrol.Interfaces.IConfigurarParametros, pKontrol.ConfigurarParametros>();
//            container.Register<pKontrol.Interfaces.IWorkflowManager, pKontrol.WorkflowManager>();
//            container.Register<pKontrol.Interfaces.ICatalogosGeneralesValores, pKontrol.CatalogosGeneralesValores>();
//            #endregion
//        }

//        public static Container Container
//        {
//            get
//            {
//                if (container == null)
//                {
//                    Bootstrap();
//                }

//                return container;
//            }
//        }

//        public static CommandManager CommandManager
//        {
//            get
//            {
//                if (commandManager == null)
//                {
//                    commandManager = Bootstrapper.Container.GetInstance<CommandManager>();
//                    commandManager.AddAssembly("EK.Procesos.Kontrol");
//                    commandManager.Topic = "kontrolapi";
//                }

//                return commandManager;
//            }
//        }
//    }
//}