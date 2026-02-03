using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IColaboradoresPPC : IBaseKontrol
    {
        string NoEmpleado { get; set; }
       // string Nombre { get; set; }
        string ApellidoPaterno { get; set; }
        string ApellidoMaterno { get; set; }
        string Email { get; set; }
        string Puesto { get; set; }
        bool Staff { get; set; }
        bool Participante { get; set; }
    }
}
