using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IDBHelper
        : IDisposable
    {
        T GetDAO<T>() where T : class, EK.Datos.Kontrol.Interfaces.IDAOBase;
        void BeginTransaction();
        void Commit();
        void Rollback();
        bool IsInTransaction { get; }

        bool HasConnection { get; }


        Dictionary<string, object> CreateParameters();
        Dictionary<string, object> CreateParameters(int idCompany);
        long TimeStamp { get; }
        T CreateSingleEntity<T>(string sql) where T : class;
        Task<T> CreateSingleEntityAsync<T>(string sql) where T : class;
        T CreateSingleEntity<T>(string sql, CommandType commandType) where T : class;
        Task<T> CreateSingleEntityAsync<T>(string sql, CommandType commandType) where T : class;
        T CreateSingleEntity<T>(string sql, CommandType commandType, Dictionary<string, object> parameters) where T : class;
        Task<T> CreateSingleEntityAsync<T>(string sql, CommandType commandType, Dictionary<string, object> parameters) where T : class;
        List<T> CreateEntities<T>(string sql) where T : class;
        Task<List<T>> CreateEntitiesAsync<T>(string sql) where T : class;
        List<T> CreateEntities<T>(string sql, CommandType commandType) where T : class;
        Task<List<T>> CreateEntitiesAsync<T>(string sql, CommandType commandType) where T : class;
        List<T> CreateEntities<T>(string sql, CommandType commandType, Dictionary<string, object> parameters) where T : class;
        Task<List<T>> CreateEntitiesAsync<T>(string sql, CommandType commandType, Dictionary<string, object> parameters) where T : class;
        //List<T> CreateEntities<T>(IDataReader reader) where T : class;
        //Task<List<T>> CreateEntitiesAsync<T>(IDataReader reader) where T : class;
        object CreateSingleEntity(string sql);
        Task<object> CreateSingleEntityAsync(string sql);
        object CreateSingleEntity(string sql, CommandType commandType);
        Task<object> CreateSingleEntityAsync(string sql, CommandType commandType);
        object CreateSingleEntity(string sql, CommandType commandType, Dictionary<string, object> parameters);
        Task<object> CreateSingleEntityAsync(string sql, CommandType commandType, Dictionary<string, object> parameters);
        object[] CreateEntities(string sql, CommandType commandType, Dictionary<string, object> parameters);
        Task<object[]> CreateEntitiesAsync(string sql, CommandType commandType, Dictionary<string, object> parameters);
        //object[] CreateEntities(System.Data.IDataReader reader);
        //Task<object[]> CreateEntitiesAsync(System.Data.IDataReader reader);
        int GetResult(string sql, CommandType commandType, Dictionary<string, object> parameters);
        Task<int> GetResultAsync(string sql, CommandType commandType, Dictionary<string, object> parameters);
        Task<string> GetResultStringAsync(string sql, CommandType commandType);
        Task<string> GetResultStringAsync(string sql, CommandType commandType, Dictionary<string, object> parameters);
    }
}