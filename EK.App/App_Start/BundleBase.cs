using System;
using System.Configuration;
using System.Web.Optimization;

namespace EK.App.App_Start
{
    public class BundleBase
    {
        private static string contentURL;
        private static string scriptURL;
        private static string styleURL;

        public static Bundle CreateScriptBundleFromScripts(string bundleName) {
            setScriptUrl();
            //
            return scriptURL.StartsWith("~") ? new ScriptBundle(bundleName) : new ScriptBundle(bundleName, scriptURL);
        }

        public static Bundle CreateScriptBundleFromContent(string bundleName)
        {
            setContentUrl();
            //
            return contentURL.StartsWith("~") ? new ScriptBundle(bundleName) : new ScriptBundle(bundleName, contentURL);
        }

        private static void setScriptUrl() {
            if (scriptURL == null)
            {
                scriptURL = ConfigurationManager.AppSettings["drivers:cdn:scripts"];
            }
        }

        private static void setContentUrl()
        {
            if (contentURL == null)
            {
                contentURL = ConfigurationManager.AppSettings["drivers:cdn:content"];
            }
        }

        public static string AddContent(string path) {
            string retValue;
            //
            setContentUrl(); 
            //
            retValue = $"{contentURL}{path}";
            //
            return retValue;
        }

        public static string AddScript(string path)
        {
            string retValue;
            //
            setScriptUrl();
            //
            retValue = $"{scriptURL}{path}";
            //
            return retValue;
        }

        public static string AddStyle(string path)
        {
            string retValue;
            //
            if (styleURL == null)
            {
                styleURL = ConfigurationManager.AppSettings["drivers:cdn:styles"];
            }
            //
            retValue = $"{styleURL}{path}";
            //
            return retValue;
        }
    }
}