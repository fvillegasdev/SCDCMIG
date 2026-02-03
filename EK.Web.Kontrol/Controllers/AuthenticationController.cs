//using System.Web;
//using System.Web.Mvc;
//using EK.Modelo.Kontrol;
//using System.Collections.Generic;

//using Microsoft.Owin.Security;
//using Microsoft.Owin.Security.OpenIdConnect;
//using Microsoft.Owin.Security.Cookies;
//using Microsoft.IdentityModel.Clients.ActiveDirectory;
//using System.Security.Claims;

//namespace EK.Web.Kontrol.Controllers
//{
//    public class AuthenticationController
//        : EK.Common.BaseKontroller
//    {
//        public AuthenticationController() : base() { }

//        public void SignIn()
//        {
//            if (!Request.IsAuthenticated)
//            {
//                HttpContext.GetOwinContext().Authentication.Challenge(new AuthenticationProperties { RedirectUri = "/" }, OpenIdConnectAuthenticationDefaults.AuthenticationType);
//            }
//        }

//        public void SignOut()
//        {
//            // Remove all cache entries for this user and send an OpenID Connect sign-out request.
//            string userObjectID = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
//            AuthenticationContext authContext = new AuthenticationContext(Startup.Authority, new NaiveSessionCache(userObjectID));
//            authContext.TokenCache.Clear();

//            HttpContext.GetOwinContext().Authentication.SignOut(
//                OpenIdConnectAuthenticationDefaults.AuthenticationType, CookieAuthenticationDefaults.AuthenticationType);
//        }

//        public void EndSession()
//        {
//            if (HttpContext.Request.IsAuthenticated)
//            {
//                // Remove all cache entries for this user and send an OpenID Connect sign-out request.
//                string userObjectID = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
//                AuthenticationContext authContext = new AuthenticationContext(Startup.Authority, new NaiveSessionCache(userObjectID));
//                authContext.TokenCache.Clear();
//            }

//            // If AAD sends a single sign-out message to the app, end the user's session, but don't redirect to AAD for sign out.
//            HttpContext.GetOwinContext().Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
//        }
//    }
//}
