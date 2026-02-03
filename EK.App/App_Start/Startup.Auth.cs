//using Microsoft.AspNet.Identity;
//using Microsoft.Owin;
//using Microsoft.Owin.Security.Cookies;
//using Owin;
//using System;
//using System.Collections.Generic;
//using System.Diagnostics.CodeAnalysis;
//using System.Linq;
//using System.Web;

//namespace AspMvcAuth
//{
//    [ExcludeFromCodeCoverage]
//    public partial class Startup
//    {
//        public void ConfigureAuth(IAppBuilder app)
//        {
//            app.UseCookieAuthentication(new CookieAuthenticationOptions
//            {
//                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
//                LoginPath = new PathString("/Kontrol/Login")
//            });
//        }
//    }
//}

////----------------------------------------------------------------------------------------------
////    Copyright 2014 Microsoft Corporation
////
////    Licensed under the Apache License, Version 2.0 (the "License");
////    you may not use this file except in compliance with the License.
////    You may obtain a copy of the License at
////
////      http://www.apache.org/licenses/LICENSE-2.0
////
////    Unless required by applicable law or agreed to in writing, software
////    distributed under the License is distributed on an "AS IS" BASIS,
////    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
////    See the License for the specific language governing permissions and
////    limitations under the License.
////----------------------------------------------------------------------------------------------

//using System;
//using System.Configuration;
//using System.Threading.Tasks;
//using System.Security.Claims;

//using Owin;

//using Microsoft.Owin;
//using Microsoft.AspNet.Identity;
//using Microsoft.Owin.Security;
//using Microsoft.Owin.Security.Cookies;
//using Microsoft.Owin.Security.OpenIdConnect;

//using EK.Common.Utils;

//namespace EK.App
//{
//    public partial class Startup
//    {
//        private static string clientId = ConfigurationManager.AppSettings["sso:ClientId"];
//        private static string aadInstance = ConfigurationManager.AppSettings["sso:AADInstance"];
//        private static string redirectUri = ConfigurationManager.AppSettings["sso:RedirectUri"];

//        public static readonly string Authority = aadInstance; // string.Format(CultureInfo.InvariantCulture, aadInstance, tenant);

//        public void ConfigureAuth(IAppBuilder app)
//        {
//            app.UseCookieAuthentication(new CookieAuthenticationOptions
//            {
//                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
//                CookieName = "EK-Auth",
//                ExpireTimeSpan = TimeSpan.FromHours(1),
//                SlidingExpiration = true,
//                CookieHttpOnly = true,
//                Provider = new CookieAuthenticationProvider
//                {
//                    OnValidateIdentity = ctx =>
//                    {
//                        return Task.FromResult(0);
//                    }
//                }
//            });

//            app.UseOpenIdConnectAuthentication(
//                new OpenIdConnectAuthenticationOptions
//                {
//                    ClientId = clientId,
//                    Authority = Authority,
//                    PostLogoutRedirectUri = redirectUri,
//                    RedirectUri = redirectUri,
//                    SignInAsAuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
//                    Scope = "openid profile enkontrol kontrolapi",
//                    ResponseType = "id_token token",
//                    Notifications = new OpenIdConnectAuthenticationNotifications()
//                    {
//                        SecurityTokenValidated = context => {
//                            var nid = new ClaimsIdentity(context.AuthenticationTicket.Identity);
//                            var uid = nid.FindFirstValue("http://schemas.enkontrol.com/identity/claims/uuid");
//                            var claveCliente = nid.FindFirstValue("http://schemas.enkontrol.com/identity/claims/client");
//                            var client = APIClient.Create("kontrolapi", context.ProtocolMessage.IdToken, nid);

//                            // get client info
//                            dynamic usuario = client.Invoke("/Usuarios/GetMyProfile");
//                            if (usuario != null && usuario.Cliente != null) {
//                                nid.AddClaim(new Claim("http://schemas.enkontrol.com/identity/claims/clientId", Convert.ToString(usuario.Cliente.ID)));
//                                nid.AddClaim(new Claim("http://schemas.enkontrol.com/identity/claims/clientName", Convert.ToString(usuario.Cliente.Nombre)));
//                            }

//                            // get modules with access
//                            dynamic modulos = client.Invoke("/Usuarios/GetModulos");
//                            if (modulos != null) {
//                                foreach (var m in modulos) {
//                                    nid.AddClaim(new Claim(string.Format("http://schemas.enkontrol.com/modules/claims/{0}", m.ToString().ToLower()), "true"));
//                                }
//                            }

//                            // set the current instance user's ID
//                            //nid.RemoveClaim(nid.FindFirst("http://schemas.enkontrol.com/identity/claims/user"));
//                            nid.AddClaim(new Claim("http://schemas.enkontrol.com/identity/claims/user", Convert.ToString(usuario.ID)));

//                            // set access token  claims
//                            nid.AddClaim(new Claim("id_token", context.ProtocolMessage.IdToken));
//                            nid.AddClaim(new Claim("access_token", context.ProtocolMessage.AccessToken));
//                            nid.AddClaim(new Claim("expires_at", DateTimeOffset.Now.AddSeconds(int.Parse(context.ProtocolMessage.ExpiresIn)).ToString()));

//                            context.AuthenticationTicket.Properties.ExpiresUtc = new DateTimeOffset(DateTime.UtcNow.AddHours(12));
//                            context.OwinContext.Authentication.SignIn(context.AuthenticationTicket.Properties, nid);
//                            context.AuthenticationTicket = new AuthenticationTicket(nid, context.AuthenticationTicket.Properties);

//                            return Task.FromResult(0);
//                        }
//                    }
//                });
//        }
//    }
//}