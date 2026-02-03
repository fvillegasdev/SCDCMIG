using mkontrol = EK.Modelo.Kontrol;
using EK.Modelo.SCV.Interfaces;
using System.Collections.Generic;

namespace EK.Modelo.SCV
{
    public class Map :  mkontrol.BaseKontrol, IMap
    {
        public decimal Lat { get; set; }
        public decimal Long { get; set; }

        public string Geo { get; set; }
        public string Ubicaciones { get; set; }
        public bool? Sale { get; set; }
        public List<string> geoJsonList { get; set; }
        public bool? LocationsMap { get; set; }
        public int IdDesarrollo { get; set; }
    }
}
