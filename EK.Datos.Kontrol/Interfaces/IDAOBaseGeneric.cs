using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IDAOBaseGeneric<T>
        : d.Kontrol.Interfaces.IDAOBase where T : m.Kontrol.Interfaces.IBaseKontrol
    {
        Task<int> Delete(int id);
        Task<int> Delete(int id, string entityName);
        Task<int> Delete(int id, string idName, string entityName);
        Task<int> Delete(int id, string idName, string entityName, bool updateIfNoDelete);
        Task<object[]> Select(m.Kontrol.Interfaces.IQuery query);
        Task<T> Save(T model);
        Task<R> SaveEntity<R>(R model) where R : class;
        Task<R> SaveEntity<R>(R model, bool refresh) where R : class;
        Task<R> SaveEntity<R>(R model, bool refresh, bool allProps) where R : class;
        Task<R> SaveEntity<R>(R model, bool refresh, bool allProps,List<string> excluded = null) where R : class;
        Task<T> GetById(int id);
        Task<T> GetByClave(string clave);
        Task<List<T>> GetAll(Dictionary<string, object> parametros);
        Task<object[]> Export(Dictionary<string, object> parametros);
        Task<object[]> Search(string criteria);
        Task<object[]> Search(Dictionary<string, object> parametros);
    }
}