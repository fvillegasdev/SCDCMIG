using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCO.Interfaces
{
    public interface IPoliza 
        : IBaseKontrolCompania
    {
        int NumeroPoliza { get; set; }
        IItemGeneralValores TipoPoliza { get; set; }
        DateTime FechaPoliza { get; set; }
        decimal Cargos { get; set; }
        decimal Abonos { get; set; }
        int Anio { get; set; }
        int Mes { get; set; }
        string GeneradoPor { get; set; }

        string Concepto { get; set; }


    }
}
