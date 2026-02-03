using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IIntegrantesInformacionComite : IBaseKontrol
    {
        int? No { get; set; }
        string Puesto { get; set; }
        string ApellidoPaterno { get; set; }
        string ApellidoMaterno { get; set; }
        string Calle { get; set; }
        string Numero { get; set; }
        string Telefono { get; set; }
        int IdInformacionComite { get; set; }
    }
}
