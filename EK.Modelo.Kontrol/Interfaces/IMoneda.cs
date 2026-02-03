using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("monedas")]
    public interface IMoneda
        : Interfaces.IBaseKontrolMM
    {
        [Column()]
        int DecimalDigits { get; set; }
        [Column()]
        string DecimalSeparator { get; set; }
        [Column()]
        string GroupSeparator { get; set; }
        [Column()]
        string MoneySymbol { get; set; }
    }
}
