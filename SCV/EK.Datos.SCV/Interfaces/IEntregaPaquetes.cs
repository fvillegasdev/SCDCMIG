using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IEntregaPaquetes
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IEntregaPaquetes>
    {

        Task<List<m.SCV.Interfaces.IEntregaPaquetes>> GetEntregaPaquetes(string Plaza, string Segmentos, string Fraccionamiento, DateTime FechaInicial, DateTime FechaFinal);

    }
}
