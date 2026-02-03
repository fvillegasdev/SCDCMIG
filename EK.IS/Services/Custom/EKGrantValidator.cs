using IdentityServer3.Core.Logging;
using IdentityServer3.Core.Services;
using IdentityServer3.Core.Validation;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens;
using IdentityServer3.Core;
using System.Security.Claims;
using IdentityServer3.Core.Models;
using System.Security.Cryptography.X509Certificates;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace EK.IS.Services.Custom
{
    public class EKGrantValidator
        : ICustomGrantValidator
    {
        private IUserService users;
        private static readonly ILog Logger = LogProvider.For<EKGrantValidator>();

        public EKGrantValidator(IUserService users)
        {
            this.users = users;
        }

        public string GrantType
        {
            get
            {
                return "kontrolapi";
            }
        }

        public async Task<CustomGrantValidationResult> ValidateAsync(ValidatedTokenRequest request)
        {
            var authInfoProvided = true;
            var claims = new List<Claim>();
            var token = request.Raw.Get("token");            
            var userData = request.Raw.Get("user_data"); // principal.Claims.FirstOrDefault(x => x.Type == EK.IS.Helpers.Claims.ObjectId);
            var userId = request.Raw.Get("user_id");
            var userPassword = request.Raw.Get("user_password"); // principal.Claims.FirstOrDefault(x => x.Type == EK.IS.Helpers.Claims.ObjectId);

            if (!string.IsNullOrWhiteSpace(token))
            {
                var principal = TryValidateToken(token);
                userId = principal.Claims.FirstOrDefault(c => c.Type == EK.Modelo.Kontrol.Claims.ObjectId).Value;
                claims.Add(new Claim(EK.Modelo.Kontrol.Claims.ObjectId, userId));

                if (!string.IsNullOrWhiteSpace(userData))
                {
                    var claimsText = UTF8Encoding.UTF8.GetString(Convert.FromBase64String(userData));
                    var claimsData = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, string>>(claimsText);

                    foreach (var kv in claimsData)
                    {
                        claims.Add(new Claim(kv.Key, kv.Value));
                    }
                }
            }
            else {
                if (!string.IsNullOrWhiteSpace(userId) && !string.IsNullOrWhiteSpace(userPassword))
                {
                    claims.Add(new Claim(EK.Modelo.Kontrol.Claims.ObjectId, userId));
                    claims.Add(new Claim(ClaimTypes.UserData, userPassword));
                }
                else {
                    authInfoProvided = false;
                }
            }

            if (!authInfoProvided) {
                return await Task.FromResult(new CustomGrantValidationResult("Missing authentication info."));
            }

            var authenticationResult = await AuthenticateUserAsync(userId, claims);
            var customGrantResult = new CustomGrantValidationResult()
            {
                IsError = authenticationResult.IsError,
                Error = authenticationResult.ErrorMessage,
                ErrorDescription = authenticationResult.ErrorMessage,
                Principal = authenticationResult.User
            };

            return await Task.FromResult(customGrantResult);
        }

        private JwtSecurityToken TryValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);

            return jwtToken;
        }

        //private async Task<AuthenticateResult> AuthenticateUserAsync(string providerId, IEnumerable<Claim> claimsFromExternalProvider)
        private async Task<AuthenticateResult> AuthenticateUserAsync(string providerId, IEnumerable<Claim> claimsFromExternalProvider)
        {
            var nameClaim = claimsFromExternalProvider.FirstOrDefault(x => x.Type == EK.Modelo.Kontrol.Claims.ObjectId);
            var name = "Unknown";

            var claims = new List<Claim>();
            if (nameClaim != null)
            {
                name = nameClaim.Value;
            }

            var context = new ExternalAuthenticationContext()
            {
                ExternalIdentity = new ExternalIdentity()
                {
                    Provider = "enkontrol",
                    ProviderId = name,
                    Claims = claimsFromExternalProvider
                },
                SignInMessage = new SignInMessage()
            };
            
            //var context = new ExternalAuthenticationContext();
            //context.AuthenticateResult = new AuthenticateResult(providerId, name, claimsFromExternalProvider, identityProvider: "enkontrol");
            await this.users.AuthenticateExternalAsync(context);

            return context.AuthenticateResult;
        }
    }
}