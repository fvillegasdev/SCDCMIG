using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IParametros 
        : IDictionary<string, IParametro>
    {
        T Value<T>(string key);
    }
}
