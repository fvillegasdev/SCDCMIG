using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface ICommandResult
    {
        int Codigo { get; set; }

        object Resultado { get; set; }

        string Mensaje { get; set; }
    }
}
