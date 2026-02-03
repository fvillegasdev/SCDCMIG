using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("Usuarios")]
    public partial interface IUsuario
        : m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IUsuario>, p.Kontrol.Interfaces.IBaseProceso
    {
        Task<m.Kontrol.Interfaces.IUsuario> Current();
        Task<m.Kontrol.Interfaces.IUsuario> SavePassword(int id, string password, string passwordConfirm, string version);
        Task<m.Kontrol.Interfaces.IUsuario> SetUserLanguage(string claveIdioma);

        Task<object[]> RemoverFavorito(m.Kontrol.Interfaces.IFavorito favorito);
        Task<object[]> AgregarFavorito(m.Kontrol.Interfaces.IFavorito favorito);
        Task<object[]> GetFavoritos();
        Task<object[]> SaveExcepciones(string excepciones);
        //Task<object[]> GetNivelesAsignados(int idUsuario);
        Task<m.Kontrol.Interfaces.IUsuario> GetMyProfile();
        Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetExcepciones(int idNivel, int idUsuario);
        //Task<object[]> GetAll(int compania = 0, int usuario = 0, int puesto = 0);
        //Task<object[]> GetKV();
        Task<object[]> GetPermisos();
        Task<string[]> GetModulos();
        Task<m.Kontrol.Interfaces.IUsuario> GetInfoAgente(int ID);
        Task<m.Kontrol.Interfaces.IUsuario> GetByEmail(string email);
        Task<m.Kontrol.Interfaces.IUsuario> GetByUUID(string uuid);
        Task<List<m.Kontrol.Interfaces.IUsuarioNivelCompania>> GetConfiguracionNiveles(int idUsuario, int todos);
        Task<List<m.Kontrol.Interfaces.IUsuarioNivelCompania>> SaveUsuarioNivelCompania(string modelo);
        Task<List<m.Kontrol.Interfaces.IUsuario>> GetDescendientes(int? id, bool? me);
        Task<List<m.Kontrol.Interfaces.IUsuario>> GetUsersDescendientes(int? id, bool? me, bool? bloqueado);
        Task<List<m.Kontrol.Interfaces.ICatalogoClasificador>> GetClasificadores(int? idUser);
        Task<bool> CheckClasificador(int? idUser, string claveClasificador, int? idClasificador);
        Task<m.Kontrol.Interfaces.IUsuario> SetDashBoard(int idTablero);
        //Task<List<m.Kontrol.Interfaces.IUsuario>> GetUsuarios(Dictionary<string, object> parametros);

        Task<object> GetUsuario(Dictionary<string, object> parametros);
    }
}