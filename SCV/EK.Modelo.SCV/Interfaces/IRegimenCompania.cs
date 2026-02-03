using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_RegimenCompania")]
    public interface IRegimenCompania :
        m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdCompania { get; set; }
        m.Kontrol.Interfaces.ICompania Compania {get;set;}

        [m.Kontrol.Column()]
        int IdRegimen { get; set; }
        m.SCV.Interfaces.IRegimen Regimen { get; set; }

        [m.Kontrol.Column()]
        string IdImpuesto { get; set; }
        m.SCV.Interfaces.IImpuestos Impuesto { get; set; }
        [m.Kontrol.Column("Porcentaje",true)]
        decimal Porcentaje { get; set; }

    }
}
