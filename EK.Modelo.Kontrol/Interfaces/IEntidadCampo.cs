using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IEntidadCampo
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        string SourceName { get; set; }
        m.Kontrol.Interfaces.IItemGeneral DataType { get; set; }
        string SourceDataType { get; set; }
        int? Length { get; set; }
    }
}