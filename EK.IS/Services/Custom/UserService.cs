using IdentityServer3.Core.Services.Default;
using IdentityServer3.Core.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IdentityServer3.Core.Models;
using System.Security.Claims;
using IdentityServer3.Core.Services;
using Microsoft.Owin;
using IdentityServer3.Core;

using System.Security.Cryptography.X509Certificates;

namespace EK.IS.Services.Custom
{
    public class UserService : UserServiceBase
    {
#if ENK
        OwinContext ctx;
        private const string CUSTOM_PROVIDER = "enkontrol";
        public class CustomUser
        {
            public string Subject { get; set; }
            public string Provider { get; set; }
            public string ProviderID { get; set; }
            public List<Claim> Claims { get; set; }
        }

        public static Dictionary<string, CustomUser> Users = new Dictionary<string, CustomUser>();

        public UserService(OwinEnvironmentService owinEnv)
        {
            ctx = new OwinContext(owinEnv.Environment);
        }
        //
        // Summary:
        //     This method gets called when the user uses an external identity provider to authenticate.
        //     The user's identity from the external provider is passed via the `externalUser`
        //     parameter which contains the provider identifier, the provider's identifier for
        //     the user, and the claims from the provider for the external user.
        //
        // Parameters:
        //   context:
        //     The context.
        public override Task AuthenticateExternalAsync(ExternalAuthenticationContext context)
        {
            var proceso = EK.Utils.BootstrapperKontrolAPI.Container.GetInstance<EK.Procesos.Kontrol.Interfaces.IUsuario>();
            var userName = context.ExternalIdentity.Claims.FirstOrDefault(c => c.Type == EK.Modelo.Kontrol.Claims.ObjectId);
            var userData = context.ExternalIdentity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.UserData);
            var errorMessage = string.Empty;
            EK.Modelo.Kontrol.Interfaces.IUsuario user = null;

            if (userName == null)
            {
                userName = context.ExternalIdentity.Claims.FirstOrDefault(c => c.Type == "name");
            }

            if (userName != null && userData != null)
            {
                var loginResult = proceso.SignIn(userName.Value, userData.Value);
                if (loginResult.Codigo == 200) // || loginResult.Codigo == 203
                {
                    user = (EK.Modelo.Kontrol.Interfaces.IUsuario)loginResult.Resultado;
                }
                else
                {
                    errorMessage = loginResult.Mensaje;
                }
            }
            else
            {
                user = proceso.GetByUUID(userName.Value);
            }

            CustomUser customUser = null;

            if (user != null)
            {
                customUser = new CustomUser
                {
                    Subject = Guid.NewGuid().ToString(),
                    Provider = CUSTOM_PROVIDER,
                    ProviderID = user.UUID,
                    Claims = new List<Claim>()
                    {
                        new Claim(Constants.ClaimTypes.GivenName, user.Nombre),
                        new Claim(Constants.ClaimTypes.FamilyName, user.Nombre),
                        new Claim(Constants.ClaimTypes.Email, user.Email),
                        new Claim(System.Security.Claims.ClaimTypes.NameIdentifier, user.Email),
                        new Claim(EK.Modelo.Kontrol.Claims.ObjectId, user.UUID),
                        //new Claim(EK.Modelo.Kontrol.Claims.UserId, user.ID.ToString()),
                        new Claim(EK.Modelo.Kontrol.Claims.Client, user.Cliente.Clave),
                        new Claim(System.Security.Claims.ClaimTypes.Name, user.Nombre)
                    }
                };

                foreach (var c in context.ExternalIdentity.Claims)
                {
                    if (customUser.Claims.FirstOrDefault(cu => cu.Type == c.Type) != null)
                    {
                        customUser.Claims.Remove(c);
                    }
                    customUser.Claims.Add(new Claim(c.Type, c.Value));
                }

                if (Users.ContainsKey(user.UUID))
                {
                    Users[user.UUID] = customUser;
                }
                else
                {
                    Users.Add(user.UUID, customUser);
                }

                context.AuthenticateResult = new AuthenticateResult(user.UUID, user.UUID, identityProvider: CUSTOM_PROVIDER);
            }
            else
            {
                context.AuthenticateResult = new AuthenticateResult(errorMessage);
            }

            return Task.FromResult(0);
        }

        //
        // Summary:
        //     This method gets called for local authentication (whenever the user uses the
        //     username and password dialog).
        //
        // Parameters:
        //   context:
        //     The context.
        public override Task AuthenticateLocalAsync(LocalAuthenticationContext context)
        {
            //X509Certificate2 cert = null;
            //X509Store store = new X509Store(StoreName.My, StoreLocation.LocalMachine);
            //try
            //{
            //    store.Open(OpenFlags.ReadOnly);
            //    foreach (var certificado in store.Certificates)
            //    {
            //        if (certificado.SerialNumber == "5A000641B8CCA3FFF02B2F0E280001000641B8")
            //        {
            //            cert = certificado;

            //            break;
            //        }
            //    }
            //    //X509Certificate2Collection col = store.Certificates.Find(X509FindType.FindBySerialNumber, "‎3506FE4F69DC22B340E9C2AF500D4659", false);
            //    //cert = store.Certificates[0];
            //}
            //finally
            //{
            //    store.Close();
            //}

            var proceso = EK.Utils.BootstrapperKontrolAPI.Container.GetInstance<EK.Procesos.Kontrol.Interfaces.IUsuario>();
            var loginResult = proceso.SignIn(context.UserName, context.Password);

            if (loginResult != null && loginResult.Codigo == 200)
            {
                EK.Modelo.Kontrol.Interfaces.IUsuario user = (EK.Modelo.Kontrol.Interfaces.IUsuario)loginResult.Resultado;
                CustomUser customUser = null;

                if (user != null)
                {
                    customUser = new CustomUser
                    {
                        Subject = Guid.NewGuid().ToString(),
                        Provider = CUSTOM_PROVIDER,
                        ProviderID = user.UUID,
                        Claims = new List<Claim>()
                    {
                        new Claim(Constants.ClaimTypes.GivenName, user.Nombre),
                        new Claim(Constants.ClaimTypes.FamilyName, user.Nombre),
                        new Claim(Constants.ClaimTypes.Email, user.Email),
                        new Claim(System.Security.Claims.ClaimTypes.NameIdentifier, user.Email),
                        new Claim(EK.Modelo.Kontrol.Claims.ObjectId, user.UUID),
                        //new Claim(EK.Modelo.Kontrol.Claims.UserId, user.ID.ToString()),
                        new Claim(EK.Modelo.Kontrol.Claims.Client, user.Cliente.Clave),
                        new Claim(System.Security.Claims.ClaimTypes.Name, user.Nombre)
                    }
                    };
                    if (Users.ContainsKey(user.UUID))
                    {
                        Users[user.UUID] = customUser;
                    }
                    else
                    {
                        Users.Add(user.UUID, customUser);
                    }
                }
                context.AuthenticateResult = new AuthenticateResult(user.UUID, user.UUID, identityProvider: CUSTOM_PROVIDER);
            }
            else
            {
                context.AuthenticateResult = new AuthenticateResult(loginResult.Mensaje);
            }

            return Task.FromResult(0);
        }

        //
        // Summary:
        //     This method is called whenever claims about the user are requested (e.g. during
        //     token creation or via the userinfo endpoint)
        //
        // Parameters:
        //   context:
        //     The context.
        public override Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            // issue the claims for the user
            string id = context.Subject.GetSubjectId();

            if (Users.ContainsKey(id))
            {
                context.IssuedClaims = Users[id].Claims;
            }
            else
            {
                var providerName = context.Subject.FindFirst("idp").Value;
                var userContext = new ExternalAuthenticationContext()
                {
                    ExternalIdentity = new ExternalIdentity()
                    {
                        Provider = providerName,
                        ProviderId = id,
                        Claims = context.Subject.Claims
                    },
                    SignInMessage = new SignInMessage()
                };

                AuthenticateExternalAsync(userContext);
            }

            return Task.FromResult(0);
        }

        //
        // Summary:
        //     This method gets called whenever identity server needs to determine if the user
        //     is valid or active (e.g. if the user's account has been deactivated since they
        //     logged in). (e.g. during token issuance or validation).
        //
        // Parameters:
        //   context:
        //     The context.
        public override Task IsActiveAsync(IsActiveContext context)
        {
            return base.IsActiveAsync(context);
        }

        //
        // Summary:
        //     This method is called prior to the user being issued a login cookie for IdentityServer.
        //
        // Parameters:
        //   context:
        //     The context.
        public override Task PostAuthenticateAsync(PostAuthenticationContext context)
        {
            return base.PostAuthenticateAsync(context);
        }

        //
        // Summary:
        //     This method gets called before the login page is shown. This allows you to determine
        //     if the user should be authenticated by some out of band mechanism (e.g. client
        //     certificates or trusted headers).
        //
        // Parameters:
        //   context:
        //     The context.
        public override Task PreAuthenticateAsync(PreAuthenticationContext context)
        {
            var id = ctx.Request.Query.Get("signin");
            //context.SignInMessage.IdP = "enkontrol";

            //context.AuthenticateResult = new AuthenticateResult("/login?id=" + id, (IEnumerable<Claim>)null);
            return Task.FromResult(0);
        }

        //
        // Summary:
        //     This method gets called when the user signs out.
        //
        // Parameters:
        //   context:
        //     The context.
        public override Task SignOutAsync(SignOutContext context)
        {
            return base.SignOutAsync(context);
        }
#endif
    }
}