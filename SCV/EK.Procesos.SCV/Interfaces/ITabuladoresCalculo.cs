using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mo = EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV.Interfaces
{
    public interface ITabuladoresCalculo
    {
        Task<object> CalculoPorMetas(string clave,  mo.ITabuladores tabulador, int idEjecucionProceso, int idPeriodicidadDetalle);

    }
}
