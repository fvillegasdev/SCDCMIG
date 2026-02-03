using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol
{
    public class GeoJsonMap : EK.Modelo.Kontrol.Interfaces.IGeoJsonMap
    {
        public int IdUbicacion { get; set; }
        public string Clave { get; set; }
        public int Order { get; set; }
        public string FileId { get; set; }
        public string FileName { get; set; }
        public string Md { get; set; }
        public string Repo { get; set; }
    }
}
