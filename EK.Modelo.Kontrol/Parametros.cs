using System;
using System.Collections.Generic;
using System.Linq;

using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol
{
    public class Parametros
        : Dictionary<string, IParametro>, IParametros
    {
        public Parametros() {            
        }

        public T Value<T>(string key) 
        {
            T retValue = default(T);
            if (base.ContainsKey(key))
            {
                retValue = base[key].GetValor<T>();
            }

            return retValue;
        }
    }
}
