using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IMap : IBaseKontrol
    {
        decimal Long { get; set; }
        decimal Lat { get; set; }
        string Ubicaciones { get; set; }

        string Geo { get; set; }
        bool? Sale { get; set; }
        List<string> geoJsonList { get; set; }
        bool? LocationsMap { get; set; }
    }
}
