using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IParticipantesConsulta: IBaseKontrol, IConsultaPPC 
    {
        string NombreParticipante { get; set; }
        string ApellidoPaternoParticipante { get; set; }
        string ApellidoMaternoParticipante { get; set; }
        int mujer { get; set; }
        int hombre { get; set; }
        int ninos { get; set; }
        int amayores { get; set; }
        int total { get; set; }
    }
}
