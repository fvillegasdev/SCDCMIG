using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IConfigCorreosEquipamientoParam : IBaseKontrol
    {
        string Plaza { get; set; }
        string Vocacion { get; set; }
        string Empleado { get; set; }
        string Operacion { get; set; }
        List<ISegmentosConfig> Segmentos { get; set; }
    }
    public interface ISegmentosConfig : IBaseKontrol
    {
        string Segmento { get; set; }
    }
}
