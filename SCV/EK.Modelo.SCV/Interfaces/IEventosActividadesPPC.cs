using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IEventosActividadesPPC : IBaseKontrol
    {
        int? IdEvento { get; set; }
        List<IParticipantes> Participantes { get; set; }
        List<IPatrocinadores> Patrocinadores { get; set; }
        List<IColaboradoresPPC> Colaboradores { get; set; }
    }
}
