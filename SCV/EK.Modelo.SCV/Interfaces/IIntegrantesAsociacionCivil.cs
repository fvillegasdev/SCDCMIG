using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IIntegrantesAsociacionCivil : IBaseKontrol
    {
        int IdAsociacionCivil { get; set; }
        int? No { get; set; }
        string NoCliente { get; set; }
        int IdPuesto { get; set; }
        string ApePaterno { get; set; }
        string ApeMaterno { get; set; }
        string NombreIntegrante { get; set; }
        string Calle { get; set; }
        string Numero { get; set; }
        string Telefono { get; set; }
    }
}
