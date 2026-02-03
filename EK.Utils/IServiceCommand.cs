using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EK.Utils
{
    public interface IServiceCommand
    {
        IServiceCommand Add(Dictionary<string, object> parameters);
        IServiceCommand Add(string parameter, object value);
        IServiceCommand AddKey(object value);
        string Command { get; set; }

        ContentResult Execute();
        Task<ContentResult> ExecuteAsync();

        T Execute<T>() where T : class;
        Task<T> ExecuteAsync<T>() where T : class;
    }
}
