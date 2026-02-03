//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Linq;
//using System.Security.Claims;
//using System.Web;
//using System.Web.Mvc;
//using System.Text;
//using System.Threading.Tasks;

//using IdentityModel;
//using IdentityModel.Client;

//using Microsoft.Owin;
//using Microsoft.Owin.Security;
//using Microsoft.Owin.Security.OpenIdConnect;

//using EK.Common.Managers;
//using EK.Common.Utils;

//using Newtonsoft.Json.Linq;

//namespace EK.Common.Utils
//{
//    public class LoginFilterAttribute
//        : ActionFilterAttribute
//    {
//        private const string userKey = "APP_USER_INFO";
//        private const string userIdKey = "APP_USER_ID";
//        private const string bearerTokenKey = "API_TOKEN";
//        private const string bearerTokenExpirationKey = "API_TOKEN_EXPIRATION";
//        const string API_CLIENT = "APP_API_CLIENT";

//        public override void OnActionExecuting(ActionExecutingContext filterContext)
//        {
//            var session = filterContext.HttpContext.Session;
//            var context = filterContext.HttpContext;
//            var isAuthorized = true;

//            if (context.Session[API_CLIENT] == null)
//            {
//                isAuthorized = false;
//            }
//            else
//            {
//                if (!context.User.Identity.IsAuthenticated)
//                {
//                    isAuthorized = false;
//                }
//                else
//                {
//                    var userClaim = ClaimsPrincipal.Current.FindFirst(EK.Modelo.Kontrol.Claims.ObjectId);
//                    if (userClaim == null)
//                    {
//                        isAuthorized = false;
//                    }
//                    else
//                    {
//                        //var userId = ClaimsPrincipal.Current.FindFirst(EK.Modelo.Kontrol.Claims.ObjectId).Value;
//                        //var accessToken = ClaimsPrincipal.Current.FindFirst("access_token").Value;

//                        //if (session[bearerTokenKey] == null)
//                        //{
//                        //    var tokenManager = TokenManager.Create("kontrolapi");
//                        //    var token = tokenManager.CreateToken(accessToken, context.User.Identity);
//                        //    //var token = this.getToken(accessToken, userId);
//                        //    session[bearerTokenKey] = token.AccessToken;
//                        //    session[bearerTokenExpirationKey] = DateTime.UtcNow.AddSeconds(token.ExpiresIn);
//                        //}

//                        //var tokenExpiration = (DateTime)context.Session[bearerTokenExpirationKey];
//                        //if (tokenExpiration == null)
//                        //{
//                        //    isAuthorized = false;
//                        //}
//                        //else
//                        //{
//                        //    if (tokenExpiration <= DateTime.UtcNow)
//                        //    {
//                        //        var tokenManager = TokenManager.Create("kontrolapi");
//                        //        var token = tokenManager.CreateToken(accessToken, context.User.Identity);
//                        //        //var token = this.getToken(accessToken, userId);
//                        //        session[bearerTokenKey] = token.AccessToken;
//                        //        session[bearerTokenExpirationKey] = DateTime.UtcNow.AddSeconds(token.ExpiresIn);
//                        //    }
//                        //}

//                        //// user info
//                        //if (session[userKey] == null)
//                        //{
//                        //    var command = ServiceCommand.Create("kontrolapi", "/Usuarios/GetMyProfile");
//                        //    dynamic userJson = command.Execute<JToken>();

//                        //    session[userIdKey] = userId;

//                        //    if (userJson != null && userJson.SelectToken("Resultado") != null)
//                        //    {
//                        //        session[userKey] = userJson.Resultado;
//                        //    }
//                        //}
//                    }
//                }
//            }

//            if (!isAuthorized)
//            {
//                filterContext.Result = new EmptyResult();
//                if (context.Request.IsAjaxRequest())
//                {
//                    filterContext.HttpContext.Response.StatusCode = 401;
//                }
//                else
//                {
//                    context.GetOwinContext().Authentication.Challenge(new AuthenticationProperties { RedirectUri = context.Request.Url.PathAndQuery }, OpenIdConnectAuthenticationDefaults.AuthenticationType);
//                }
//            }
//        }

//        public override void OnActionExecuted(ActionExecutedContext filterContext)
//        {
//            // The action filter logic.
//        }
//    }
//}
