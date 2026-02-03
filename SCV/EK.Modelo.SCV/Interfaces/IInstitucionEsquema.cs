using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IInstitucionEsquema : IBaseKontrol
    {
        int IdInstitucion { get; set; }
        IInstitucion Institucion { get; set; }
        int IdEsquema { get; set; }
        IEsquema Esquema { get; set; }
    }
}
