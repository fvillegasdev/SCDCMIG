using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Regimen")]
    public interface IRegimen:
        m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdCompania { get; set; }
        m.Kontrol.Interfaces.ICompania Compania { get; set; }

        List<IRegimenCompania> RegimenCCompania { get; set; }
    }
}
