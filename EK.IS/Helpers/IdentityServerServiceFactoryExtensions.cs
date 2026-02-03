using IdentityServer3.Core.Configuration;
using IdentityServer3.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using IdentityServer3.Core.Services.Default;

using EK.IS.Services;
using EK.IS.Services.Custom;

namespace EK.IS.Helpers
{
    public static class IdentityServerServiceFactoryExtensions
    {
        public static IdentityServerServiceFactory Configure(this IdentityServerServiceFactory factory)
        {
            factory.CustomGrantValidators.Add(new Registration<ICustomGrantValidator>(typeof(EKGrantValidator)));
            factory.UserService = new Registration<IUserService, UserService>(); // new Registration<IUserService>(new ExternalRegistrationUserService());
            factory.ViewService = new DefaultViewServiceRegistration<EKViewService>();
            factory.UseInMemoryClients(Clients.Get());
            factory.UseInMemoryScopes(Scopes.Get());

            return factory;
        }
    }
}