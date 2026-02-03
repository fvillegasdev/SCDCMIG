using EK.IS.Services;
using Microsoft.Owin;
using Owin;
using System;
using System.Security.Cryptography.X509Certificates;
using System.Linq;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.ViewModels;
using IdentityServer3.Core.Configuration;
using Serilog;
using EK.IS.Helpers;

[assembly: OwinStartup(typeof(EK.IS.Startup))]
namespace EK.IS
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.LiterateConsole(outputTemplate: "{Timestamp:HH:MM} [{Level}] ({Name:l}){NewLine} {Message}{NewLine}{Exception}")
                .WriteTo.TraceSource(traceSourceName: "IdentityServer3")
                .CreateLogger();

            app.Map("/identity", idsrvApp =>
            {
                var identityServerFactory = new IdentityServerServiceFactory().Configure();

                idsrvApp.UseIdentityServer(new IdentityServerOptions
                {
                    SiteName = "Directorio EnKontrol",
                    SigningCertificate = LoadCertificate(),
                    Factory = identityServerFactory,
                    AuthenticationOptions = new AuthenticationOptions
                    {
                        EnableLocalLogin = true
                    }
                });
            });

            //app.Map("/identity", idsrvApp =>
            //{
            //    var identityServerFactory = new IdentityServerServiceFactory().Configure();
            //    idsrvApp.UseIdentityServer(new IdentityServerOptions
            //    {
            //        SiteName = "EnKontrol Identity Server",
            //        SigningCertificate = LoadCertificate(),
            //        Factory = new IdentityServerServiceFactory()
            //        .UseInMemoryUsers(Users.Get())
            //        .UseInMemoryClients(Clients.Get())
            //        .UseInMemoryScopes(Scopes.Get())
            //    });
            //});
        }

        X509Certificate2 LoadCertificate()
        {
            X509Certificate2 cert = null;
            //X509Store store = new X509Store(StoreName.My, StoreLocation.LocalMachine);
            try
            {
                using (var stream = System.Reflection.Assembly.GetExecutingAssembly().GetManifestResourceStream("EK.IS.idsrv3test.pfx"))
                {
                    using (var bs = new System.IO.BinaryReader(stream))
                    {
                        cert = new X509Certificate2(bs.ReadBytes((int)stream.Length),
                            "idsrv3test",
                            X509KeyStorageFlags.MachineKeySet | X509KeyStorageFlags.PersistKeySet | X509KeyStorageFlags.Exportable);
                    }
                }

                //store.Open(OpenFlags.ReadOnly);
                //foreach (var certificado in store.Certificates) {
                //    if (certificado.SerialNumber == "3506FE4F69DC22B340E9C2AF500D4659") {
                //        cert = certificado;

                //        break;
                //    }
                //}
                //X509Certificate2Collection col = store.Certificates.Find(X509FindType.FindBySerialNumber, "‎3506FE4F69DC22B340E9C2AF500D4659", false);
                //cert = store.Certificates[0];
            }
            finally
            {
                //store.Close();
            }
            

            return cert;
        }
    }
}