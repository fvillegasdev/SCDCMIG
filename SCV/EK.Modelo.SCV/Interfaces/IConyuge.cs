using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IConyuge : IBaseKontrol
    {

        int IdCliente { get; set; }
        string APaterno { get; set; }
        string AMaterno { get; set; }
        System.DateTime FechaNacimiento { get; set; }
        string RFC { get; set; }
        string NSS { get; set; }
        string CURP { get; set; }
        string Email { get; set; }
        string Telefono { get; set; }
        string Celular { get; set; }
    }
}
