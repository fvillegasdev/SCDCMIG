using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;

using IdentityServer3.Core;
using IdentityServer3.Core.Services.InMemory;

namespace EK.IS.Services
{
    public static class Users
    {
        public static List<InMemoryUser> Get()
        {
            return new List<InMemoryUser> {
                new InMemoryUser
                {
                    Username = "atorres@enkontrol.com",
                    Password = "secret",
                    Subject = "5a3e0b9f-4274-4261-9ce6-5a24fb145fc7",

                    Claims = new[]
                    {
                        new Claim(Constants.ClaimTypes.GivenName, "Josue"),
                        new Claim(Constants.ClaimTypes.FamilyName, "Torres"),
                        new Claim(Constants.ClaimTypes.Email, "atorres@enkontrol.com"),
                        new Claim(System.Security.Claims.ClaimTypes.NameIdentifier, "atorres@enkontrol.com"),
                        new Claim(EK.IS.Helpers.Claims.ObjectId, "5a3e0b9f-4274-4261-9ce6-5a24fb145fc7"),
                        new Claim(System.Security.Claims.ClaimTypes.Name, "Josue A Torres")
                    }
                },
                new InMemoryUser
                {
                    Username = "alemantj1984@hotmail.com",
                    Password = "secret",
                    Subject = "90e1e4bb-bf05-42cb-81e5-8078ceb524fb",

                    Claims = new[]
                    {
                        new Claim(Constants.ClaimTypes.GivenName, "Juan"),
                        new Claim(Constants.ClaimTypes.FamilyName, "Alemán"),
                        new Claim(Constants.ClaimTypes.Email, "alemantj1984@hotmail.com"),
                        new Claim(System.Security.Claims.ClaimTypes.NameIdentifier, "alemantj1984@hotmail.com"),
                        new Claim(EK.IS.Helpers.Claims.ObjectId, "90e1e4bb-bf05-42cb-81e5-8078ceb524fb"),
                        new Claim(System.Security.Claims.ClaimTypes.Name, "Juan Aleman")
                    }
                },
                new InMemoryUser
                {
                    Username = "jehernandez@enkontrol.com",
                    Password = "secret",
                    Subject = "78df79a1-8afe-47f1-90bf-9fc03bc00f14",

                    Claims = new[]
                    {
                        new Claim(Constants.ClaimTypes.GivenName, "Aglaé"),
                        new Claim(Constants.ClaimTypes.FamilyName, "Hernandez"),
                        new Claim(Constants.ClaimTypes.Email, "jehernandez@enkontrol.com"),
                        new Claim(System.Security.Claims.ClaimTypes.NameIdentifier, "jehernandez@enkontrol.com"),
                        new Claim(EK.IS.Helpers.Claims.ObjectId, "78df79a1-8afe-47f1-90bf-9fc03bc00f14"),
                        new Claim(System.Security.Claims.ClaimTypes.Name, "Aglaé Hernandez")
                    }
                },
                new InMemoryUser
                {
                    Username = "jael_ejt@hotmail.com",
                    Password = "secret",
                    Subject = "b54ccba6-edb6-46b1-9071-48133ce307ca",

                    Claims = new[]
                    {
                        new Claim(Constants.ClaimTypes.GivenName, "Jael Nayeli"),
                        new Claim(Constants.ClaimTypes.FamilyName, "Hernandez"),
                        new Claim(Constants.ClaimTypes.Email, "jael_ejt@hotmail.com"),
                        new Claim(System.Security.Claims.ClaimTypes.NameIdentifier, "jael_ejt@hotmail.com"),
                        new Claim(EK.IS.Helpers.Claims.ObjectId, "b54ccba6-edb6-46b1-9071-48133ce307ca"),
                        new Claim(System.Security.Claims.ClaimTypes.Name, "Jael Nayeli Hernandez")
                    }
                }
            };
        }
    }
}