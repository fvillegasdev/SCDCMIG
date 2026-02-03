using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace EK.Common.Utils
{
    public class EKSession
    {
        const string JSON_CONTENT_TYPE = "application/json";
        const string SESSION_ID = "APP_TOKEN_AD";
        const string CHALLENGED_ID = "APP_HAS_CHALLENGED";
        const string CURRENT_USER = "CURRENT_USER_APP";
        const string CURRENT_CLIENT = "CURRENT_CLIENT_APP";

        public static string UserId {
            get {
                return Convert.ToString(HttpContext.Current.Session[CURRENT_USER]);
            }
        }

        public static bool ExistsLoginInfo() {
            return HttpContext.Current.Session[CURRENT_USER] != null;
        }
    }
}
