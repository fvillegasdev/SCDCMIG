using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IUsuarios
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IUsuario>
    {
        //Task<object[]> GetAll(int? activos);
        //Task<m.Kontrol.Interfaces.IUsuario> GetByID(int ID);
        //Task<object[]> GetKV();
        Task<object> GetUserById(int id);
        Task<int> AgregarFavorito(m.Kontrol.Interfaces.IFavorito favorito);
        Task<int> RemoverFavorito(m.Kontrol.Interfaces.IFavorito favorito);
        Task<m.Kontrol.Interfaces.IFavorito[]> GetFavoritos(int idUsuario);
        Task<int> SaveExcepcion(int idUser, int idNivel, int idOpcion, int permisos);
        //Task<object[]> GetNivelesAsignados(int idUsuario);
        Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetExcepciones(int idNivel, int idUsuario);
        Task<m.Kontrol.Interfaces.IUsuario> GetByUID(string ID);
        Task<m.Kontrol.Interfaces.IUsuario> GetByEmail(string email);
        Task<object> Login(string userName);
        //Task<model.IUsuario[]> Get(string nombre);        
        Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetOpcionesMenuAdmin(int idUser);
        Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetOpcionesMenu(int idUser);
        Task<object[]> GetPermisos(int idUser);
        Task<object[]> GetModulosUsuario(string idUser);
        Task<object[]> GetUsuarioNivelCompania(int idusuario, int idcompania, int idnivel);
        Task<List<m.Kontrol.Interfaces.IUsuarioNivelCompania>> GetConfiguracionNiveles(int id, int todos);
        Task<m.Kontrol.Interfaces.IUsuarioNivelCompania> GetByIDUsuarioNivelCompania(int id);
        Task<List<m.Kontrol.Interfaces.IUsuario>> GetListaCatByPlaza(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IAgendaFechaBloqueo>> GetFechasUsuariobloqueo(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IAgendaFechaBloqueo>> saveFechasBloqueadasCat(Dictionary<string, object> parametros);
        Task<List<m.Kontrol.Interfaces.IAgendaFechaBloqueo>> deleteFechasBloqueadasCat(Dictionary<string, object> parametros);
        Task<int> SaveUsuarioNivelCompania(m.Kontrol.Interfaces.IUsuarioNivelCompania model);
        Task<int> DeleteUsuarioNivelCompania(int Id);
        Task<int> UpdateIntentosBloqueo(int id, int bloqueo, int intentos);

        Task<object> GetUsuarios(Dictionary<string, object> parametros);
        Task<object> GetUsuariosDescendientes(Dictionary<string, object> parametros);

    }
}