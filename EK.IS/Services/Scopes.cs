using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using IdentityServer3.Core.Models;

namespace EK.IS.Services
{
    public static class Scopes
    {
        public static IEnumerable<Scope> Get()
        {
            var scopes = new List<Scope>
            {
                new Scope
                {
                    Enabled = true,
                    Name = "enkontrol",
                    DisplayName = "Information required for EnKontrol Platform",
                    Type = ScopeType.Identity,
                    Claims = new List<ScopeClaim>
                    {
                        new ScopeClaim(EK.Modelo.Kontrol.Claims.ObjectId, true),
                        new ScopeClaim(System.Security.Claims.ClaimTypes.Name, alwaysInclude: true),
                        new ScopeClaim(System.Security.Claims.ClaimTypes.NameIdentifier, alwaysInclude: true)
                    }
                },
                new Scope
                {
                    Enabled = true,
                    Name = "kontrolapi",
                    DisplayName = "Módulo de Kontrol API (Restringido) (1.0.0.10)",
                    Description = "API para el consumo de los servicios del Módulo de Kontrol",
                    Type = ScopeType.Resource,
                    Claims = new List<ScopeClaim>
                    {
                        new ScopeClaim(EK.Modelo.Kontrol.Claims.ObjectId, alwaysInclude: true),
                        new ScopeClaim(System.Security.Claims.ClaimTypes.Name, alwaysInclude: true),
                        new ScopeClaim(System.Security.Claims.ClaimTypes.NameIdentifier, alwaysInclude: true)
                    },
                    IncludeAllClaimsForUser = true
                }
            };

            scopes.AddRange(StandardScopes.All);

            return scopes;
        }
    }
}