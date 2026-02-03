using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCO.Interfaces
{
    public interface IMovimientosPoliza 
        : IBaseKontrolCompania
    {
        int Linea { get; set; }
        int Cta { get; set; }
        int Scta { get; set; }
        int Sscta { get; set; }
        int Digito { get; set; }
        int IdTipoMovimiento { get; set; }
        string Referencia { get; set; }
        string CveCC { get; set; }
        int Monto { get; set; }
        int OrdenCompra { get; set; }
        int IdProveedor { get; set; }

        IPoliza Poliza { get; set; }

        string Concepto { get; set; }
    }
}
