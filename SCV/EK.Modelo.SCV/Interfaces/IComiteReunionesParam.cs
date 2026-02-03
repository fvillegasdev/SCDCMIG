using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IComiteReunionesParam : IBaseKontrol
    {
        int IdTipoReunion { get; set; }
        int IdComite { get; set; }
        DateTime? FechaReunion { get; set; }
        string HoraReunion { get; set; }
        string IdPlaza { get; set; }
        string IdFraccionamiento { get; set; }
        int IdSegmento { get; set; }
        List<IMaterialesReunion> Materiales { get; set; }
    }
}
