using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Microsoft.Owin.Security;
using Owin;
using IdentityServer3.AccessTokenValidation;
using EK.Common.Utils;

namespace EK.KontrolService
{
    public partial class Startup
    {
        private static string tenant = ConfigurationManager.AppSettings["ida:Tenant"];
        private static string audience = ConfigurationManager.AppSettings["ida:Audience"];

        public void ConfigureAuth(IAppBuilder app)
        {
            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                Authority = "https://dev-eksso.azurewebsites.net/identity",
                RequiredScopes = new[] { "kontrolapi" }
            });
        }
    }
}