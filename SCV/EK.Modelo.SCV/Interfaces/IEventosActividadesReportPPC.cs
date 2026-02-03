using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IEventosActividadesReportPPC : IBaseKontrol
    {
        List<IParticipantesConsulta> Participantes { get; set; }
        List<IPatrocinadoresConsulta> Patrocinadores { get; set; }
        List<IColaboradoresConsulta> Colaboradores { get; set; }
    }
}
