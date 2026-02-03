using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface ICommandQuery
    {
        string ID { get; set; }

        Dictionary<string, object> Parametros { get; set; }
    }
}
