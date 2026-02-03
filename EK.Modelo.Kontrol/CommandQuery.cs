using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol
{
    public class CommandQuery 
        : ICommandQuery        
    {
        public string ID {
            get; set;
        }

        public Dictionary<string, object> Parametros{
            get; set;
        }
    }
}
