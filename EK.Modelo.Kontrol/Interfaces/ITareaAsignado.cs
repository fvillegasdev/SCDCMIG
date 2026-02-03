using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface ITareaAsignado : IBaseKontrol
    {
        int TareaId { get; set; }
        int? AsignadoId { get; set; }
        string NombreAsignado { get; set; }
        string Tipo { get; set; }

    }
}
