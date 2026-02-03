using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IParticipantes : IBaseKontrol
    {
      //  string Nombre { get; set; }
        string ApellidoPaterno { get; set; }
        string ApellidoMaterno { get; set; }
        string Calle { get; set; }
        string Numero { get; set; }
        string Telefono { get; set; }
        string Celular { get; set; }
        string Email { get; set; }
        string hombre { get; set; }
        string mujer { get; set; }
        string ninos { get; set; }
        string amayores { get; set; }
        string total { get; set; }
    }
}
