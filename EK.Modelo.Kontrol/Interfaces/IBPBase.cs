using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using m = EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IBPBase<T> where T: m.IBaseKontrol
    {
        Task<object[]> Search(string criteria);
        Task<object[]> Export(Dictionary<string, object> parametros);
        Task<List<T>> GetAll(Dictionary<string, object> parametros);
        Task<bool> Exists(Dictionary<string, object> parametros);
        Task<T> GetByClave(string clave);
        Task<T> GetById(int id);
        Task<T> Delete(int id);
        Task<T> Save(T item);
        Task<T> GetNewEntity();
    }
}