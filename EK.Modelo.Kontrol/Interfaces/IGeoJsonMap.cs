using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IGeoJsonMap
    {
        int IdUbicacion { get; set; }
        string Clave { get; set; }
        int Order { get; set; }
        string FileId { get; set; }
        string FileName { get; set; }
        string Md { get; set; }
        string Repo { get; set; }
    }
}
