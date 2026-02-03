using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("catalogosClasificadores")]
    public interface IClasificador
        : Interfaces.IBaseKontrol
    {
        ITipoClasificador TipoClasificador { get; set; }
        int? IdTipoClasificador { get; set; }
    }
}