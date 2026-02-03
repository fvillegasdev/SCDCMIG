using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services;
using IdentityServer3.Core.Services.Default;
using IdentityServer3.Core.Validation;
using IdentityServer3.Core.ViewModels;

namespace EK.IS.Services.Custom
{
    public class EKViewService : DefaultViewService
    {
        static readonly Newtonsoft.Json.JsonSerializerSettings settings = new Newtonsoft.Json.JsonSerializerSettings()
        {
            ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver()
        };

        public EKViewService(DefaultViewServiceOptions config, IViewLoader viewLoader)
            : base(config, viewLoader)
        {
        }

        public override Task<Stream> Login(LoginViewModel model, SignInMessage message)
        {
            model.Custom = new
            {
                clientDescription = "Directorio para la identificación y validación del acceso a usuarios de EnKontrol"
            };

            var scripts = new List<string>() {
                "../Scripts/site.js"
            };

            return this.CustomRender(model, LoginView, new List<string>(), scripts);
            //return base.Login(model, message);
        }

        public override async Task<Stream> AuthorizeResponse(AuthorizeResponseViewModel model) {
            var newModel = new CommonViewModel
            {
                SiteName = model.SiteName,
                SiteUrl = model.SiteUrl,
                Custom = model.Custom
            };

            var scripts = new List<string>();
            scripts.AddRange(config.Scripts ?? Enumerable.Empty<string>());
            scripts.Add("~/assets/app.FormPostResponse.js");

            var data = BuildModelDictionary(newModel, AuthorizeResponseView, config.Stylesheets, scripts);
            data.Add("responseUri", model.ResponseFormUri);
            data.Add("responseFields", model.ResponseFormFields);

            string html = await LoadHtmlTemplate(AuthorizeResponseView);
            html = FormatHtmlTemplate(html, data);

            return StringToStream(html);
            //return base.AuthorizeResponse(model);
        }

        public override Task<Stream> Logout(LogoutViewModel model, SignOutMessage message)
        {
            return base.Logout(model, message);
        }

        public override Task<Stream> LoggedOut(LoggedOutViewModel model, SignOutMessage message)
        {
            return base.LoggedOut(model, message);
        }

        public override Task<Stream> Consent(ConsentViewModel model, ValidatedAuthorizeRequest authorizeRequest)
        {
            return base.Consent(model, authorizeRequest);
        }

        public override Task<System.IO.Stream> Error(ErrorViewModel model)
        {
            return base.Error(model);
        }


        /// <summary>
        /// Renders the specified page.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <param name="page">The page.</param>
        /// <returns></returns>
        protected virtual Task<Stream> CustomRender(CommonViewModel model, string page)
        {
            return CustomRender(model, page, config.Stylesheets, config.Scripts);
        }

        /// <summary>
        /// Renders the specified page.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <param name="page">The page.</param>
        /// <param name="stylesheets">The stylesheets.</param>
        /// <param name="scripts">The scripts.</param>
        /// <returns></returns>
        private async Task<Stream> CustomRender(CommonViewModel model, string page, IEnumerable<string> stylesheets, IEnumerable<string> scripts)
        {
            var data = BuildModelDictionary(model, page, stylesheets, scripts);

            string html = await LoadHtmlTemplate(page);
            if (html == null) return null;

            html = FormatHtmlTemplate(html, data);

            return StringToStream(html);
        }

        private string LoadHtml(string name)
        {
            var file = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"content\app");
            file = Path.Combine(file, name + ".html");
            return File.ReadAllText(file);
        }

        Dictionary<string, object> BuildModelDictionary(CommonViewModel model, string page, IEnumerable<string> stylesheets, IEnumerable<string> scripts)
        {
            if (model == null) throw new ArgumentNullException("model");
            if (stylesheets == null) throw new ArgumentNullException("stylesheets");
            if (scripts == null) throw new ArgumentNullException("scripts");

            var applicationPath = new Uri(model.SiteUrl).AbsolutePath;
            if (applicationPath.EndsWith("/")) applicationPath = applicationPath.Substring(0, applicationPath.Length - 1);

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(model, Newtonsoft.Json.Formatting.None, settings);

            var additionalStylesheets = BuildTags("<link href='{0}' rel='stylesheet'>", applicationPath, stylesheets);
            var additionalScripts = BuildTags("<script src='{0}'></script>", applicationPath, scripts);

            return new Dictionary<string, object>
            {
                { "siteName" , Microsoft.Security.Application.Encoder.HtmlEncode(model.SiteName) },
                { "applicationPath", applicationPath },
                { "model", Microsoft.Security.Application.Encoder.HtmlEncode(json) },
                { "page", page },
                { "stylesheets", additionalStylesheets },
                { "scripts", additionalScripts }
            };
        }

        string BuildTags(string tagFormat, string basePath, IEnumerable<string> values)
        {
            if (values == null || !values.Any()) return String.Empty;

            var sb = new StringBuilder();
            foreach (var value in values)
            {
                var path = value;
                if (path.StartsWith("~/"))
                {
                    path = basePath + path.Substring(1);
                }
                sb.AppendFormat(tagFormat, path);
                sb.AppendLine();
            }
            return sb.ToString();
        }

        Stream StringToStream(string s)
        {
            var ms = new MemoryStream();
            var sw = new StreamWriter(ms);
            sw.Write(s);
            sw.Flush();
            ms.Seek(0, SeekOrigin.Begin);
            return ms;
        }
    }
}