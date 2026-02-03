using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class ResponsablesConstruccion
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IResponsableConstruccion>, d.SCV.Interfaces.IResponsablesConstruccion
    {
        private const string USP_USUARIOS_SELECT = "usp_usuarios_select";
        public ResponsablesConstruccion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_USUARIOS_SELECT, null, "UsuariosEK")
        { }
    }
}