using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using IdentityServer3.Core;
using IdentityServer3.Core.Models;

namespace EK.IS.Services
{
    public static class Clients
    {
        public static IEnumerable<Client> Get()
        {
            return new[]
            {
                new Client
                {
                    Enabled = true,
                    ClientName = "Directorio de Usuarios",
                    ClientId = "7E7FBBA2-2149-4E65-AAFD-757EA9B0E598",
                    Flow = Flows.Implicit,
                    RequireConsent = false,
                    RedirectUris = new List<string>
                    {
                        "https://localhost:44374"
                    },
                    RequireSignOutPrompt = false,
                    PostLogoutRedirectUris = new List<string>
                    {
                        "https://localhost:44374/usuario/signout"
                    },
                    AllowedScopes = new List<string>() {
                        Constants.StandardScopes.OpenId,
                        Constants.StandardScopes.Profile,
                        "enkontrol",
                        "kontrolapi"
                    }
                },
                new Client
                {
                    Enabled = true,
                    ClientName = "Kontrol API",
                    ClientId = "84A11C7F-EF2C-46D3-808A-4B1DA3EE1175",
                    Flow = Flows.Custom,
                    AccessTokenType = AccessTokenType.Jwt,
                    ClientSecrets = new List<Secret>() {
                        new Secret("01645225-AE2A-4EDE-8B08-A56198721E8A".Sha256()), // EK
                        new Secret("35699BA2-6206-4F56-B34F-4006ADA1577A".Sha256())  // Email Service
                    },
                    AllowedCustomGrantTypes = new List<string>
                    {
                        "kontrolapi"
                    },
                    AllowedScopes = new List<string>() {
                        Constants.StandardScopes.OpenId,
                        Constants.StandardScopes.Profile,
                        "kontrolapi"
                    },
                    AlwaysSendClientClaims = true
                }
            };
        }
    }
}