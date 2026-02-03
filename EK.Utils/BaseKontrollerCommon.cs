using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using SimpleInjector;

namespace EK.Utils
{
    public class BaseKontrollerCommon
    {
        private const string API_CLIENT = "APP_API_CLIENT";
        private const string API_CONTAINER = "APP_API_CONTAINER";
        protected const string JSON_CONTENT_TYPE = "application/json";

        public static IAPIClient getClient(HttpSessionStateBase session)
        {
            IAPIClient apiClient = null;
            if (session[API_CLIENT] == null)
            {
                Container container = BootstrapperKontrolAPI.GetContainer();
                if (session[API_CLIENT] == null)
                {
                    container = BootstrapperKontrolAPI.GetContainer();
                }
                else
                {
                    container = (Container)session[API_CLIENT];
                }
                apiClient = container.GetInstance<IAPIClient>();
                //
                session[API_CLIENT] = apiClient;
            }
            else
            {
                apiClient = (IAPIClient)session[API_CLIENT];
            }

            return apiClient;
        }

    }
}
