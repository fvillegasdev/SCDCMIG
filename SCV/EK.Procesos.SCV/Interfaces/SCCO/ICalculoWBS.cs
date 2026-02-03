using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Procesos.SCCO.Interfaces
{
    public interface ICalculoWBS
    {
        #region CREATE_WBS
        Task<m.SCCO.Interfaces.IWBSBase> Create(dynamic data);
        Task<m.SCCO.Interfaces.IWBSObra> CreateObra(dynamic data);
        Task<m.SCCO.Interfaces.IWBSNivel> CreateNivel(dynamic data);
        Task<m.SCCO.Interfaces.IWBSTarjeta> CreateTarjeta(dynamic data);
        Task<m.SCCO.Interfaces.IWBSInsumo> CreateInsumo(dynamic data);
        Task<T> CreateComposite<T>(dynamic data) where T : class, m.SCCO.Interfaces.IWBSComposite;
        Task<T> CreateNodo<T>(dynamic data) where T : class, m.SCCO.Interfaces.IWBSBase;
        #endregion

        #region SAVE_WBS
        Task<m.SCCO.Interfaces.IWBSBase> Save(m.SCCO.Interfaces.IWBSBase model);
        Task<m.SCCO.Interfaces.IWBSBase> SaveBase<T>(T model) where T : class, m.SCCO.Interfaces.IWBSBase;
        Task<T> SaveNodo<T, S>(T model)
            where T : class, m.SCCO.Interfaces.IWBSBase
            where S : class, d.Kontrol.Interfaces.IDAOBaseGeneric<T>;
        Task<T> SaveComposite<T, S>(T model)
            where T : class, m.SCCO.Interfaces.IWBSComposite
            where S : class, d.Kontrol.Interfaces.IDAOBaseGeneric<T>;
        #endregion

        #region GET_WBS
        Task<m.SCCO.Interfaces.IWBSBase> GetWBS(int idEntidad);
        Task<m.SCCO.Interfaces.IWBSBase> BuildNode(m.SCCO.Interfaces.IWBSNodo item, List<m.SCCO.Interfaces.IWBSNodo> items);
        Task<T> GetNode<T, S>(int idNodo)
            where T : class, m.SCCO.Interfaces.IWBSBase
            where S : class, d.Kontrol.Interfaces.IDAOBaseGeneric<T>;
        #endregion

        #region DELETE_WBS
        Task<m.SCCO.Interfaces.IWBSBase> Delete(m.SCCO.Interfaces.IWBSBase model);
        Task<T> DeleteComposite<T, S>(T model)
            where T : class, m.SCCO.Interfaces.IWBSComposite
            where S : class, d.Kontrol.Interfaces.IDAOBaseGeneric<T>;
        Task<T> DeleteNodo<T, S>(int id)
            where T : class, m.SCCO.Interfaces.IWBSBase
            where S : class, d.Kontrol.Interfaces.IDAOBaseGeneric<T>;
        Task<m.SCCO.Interfaces.IWBSNodo> DeleteBase(int id);
        #endregion
    }
}