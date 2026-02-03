using System.Configuration;
using System.Security.Claims;

namespace EK.Procesos.Kontrol
{
    public class InternalUser
    {
        public string UID {
            get {
                return ClaimsPrincipal.Current.FindFirst(EK.Modelo.Kontrol.Claims.ObjectId).Value;
            }
        }

        //public EK.Modelo.Kontrol.Interfaces.IUsuario Current {
        //    get {
        //        return new EK.Modelo.Kontrol.Usuario() {
        //            ID = 1,
        //            Nombre = "Josue A Torres"
        //        };
        //    }
        //}
    }
}
