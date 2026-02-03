using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IBaseKontrolMM
        : IBaseKontrol
    {
        decimal? Capital { get; set; }        
        decimal? Interes { get; set; }        
        decimal? Importe { get; set; }
        decimal? CapitalMoneda { get; set; }
        decimal? InteresMoneda { get; set; }
        decimal? ImporteMoneda { get; set; }
        decimal? TipoCambio { get; set; }
        IMoneda Moneda { get; set; }
        int? IdMoneda { get; set; }
        decimal? Saldo { get; set; }
        decimal? Pagado { get; set; }
    }
}