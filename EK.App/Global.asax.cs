using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

using SimpleInjector;
using SimpleInjector.Diagnostics;
using SimpleInjector.Integration.Web;
using SimpleInjector.Integration.Web.Mvc;

using GdPicture14;
using GdPicture14.WEB;

namespace EK.App
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            //
            ViewEngines.Engines.Add(new EK.Drivers.BI.PowerBI.Views.PBIViewEngine());
            ViewEngines.Engines.Add(new EK.Drivers.Emailing.MM.Views.EmailingViewEngine());
            //
            DocuViewareLicensing.RegisterKEY("027f7d9897fa4de8a8b79a8d297940af82d94393a4bd2b54Gx4ZcGz7zE8pzwYyLtCWhhqcW/TElpE8vdNooePcDI5/eFimqlbgw4626xZ5akP8"); // Please enter your license key. Claim your free DocuVieware Lite license key here: http://www.docuvieware.com/docuvieware-lite/
            DocuViewareManager.SetupConfiguration(); // true, DocuViewareSessionStateMode.InProc, GetCacheDirectory());
            //
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //
            GlobalFilters.Filters.Add(new EK.Common.Utils.CustomHeadersFilterAttribute());
            ////
            //// Configure Simple Injector to handle controllers
            ////
            //var container = new Container();
            //container.Options.DefaultScopedLifestyle = new WebRequestLifestyle();

            //// Define assemblies to use
            //var assemblies = new List<Assembly>();
            //assemblies.Add(Assembly.GetExecutingAssembly()); // default assembly
            //assemblies.Add(Assembly.Load("EK.Web.Kontrol")); // Kontrol assembly

            //var controllerTypes = SimpleInjectorMvcExtensions.GetControllerTypesToRegister(
            //    container, assemblies.ToArray());

            //var controllerProducers = controllerTypes
            //    .ToDictionary(type => type, type => CreateControllerProducer(container, type));

            //// Verify after creating the controller producers.
            //container.Verify();

            //ControllerBuilder.Current.SetControllerFactory(
            //    new SimpleInjectorControllerFactory { Producers = controllerProducers });

            //var activator = new SimpleInjectorHubActivator(container);
            //GlobalHost.DependencyResolver.Register(typeof(IHubActivator), () => activator);
        }

        private static InstanceProducer CreateControllerProducer(Container c, Type type)
        {
            var producer = Lifestyle.Transient.CreateProducer(typeof(IController), type, c);

            producer.Registration.SuppressDiagnosticWarning(
                DiagnosticType.DisposableTransientComponent,
                "MVC disposes the controller when the web request ends.");

            return producer;
        }
    }

    public class SimpleInjectorControllerFactory : DefaultControllerFactory
    {
        public IDictionary<Type, InstanceProducer> Producers { get; set; }
        protected override IController GetControllerInstance(RequestContext rc, Type type)
        {
            return (IController)this.Producers[type].GetInstance();
        }
    }

    //public class SimpleInjectorHubActivator : IHubActivator
    //{
    //    private readonly Container _container;

    //    public SimpleInjectorHubActivator(Container container)
    //    {
    //        _container = container;
    //    }

    //    public IHub Create(HubDescriptor descriptor)
    //    {
    //        return (IHub)_container.GetInstance(descriptor.HubType);
    //    }
    //}
}
