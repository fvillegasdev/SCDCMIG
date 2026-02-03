using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IAbono
        : IBaseKontrolMM
    {
        DateTime Fecha { get; set; }
        IItemGeneral TipoAbono { get; set; }
        DateTime Vencimiento { get; set; }
    }
}
