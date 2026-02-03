using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m= EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ComisionCompania")]
    public interface IComisionCompania
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }


        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        bool? Numeracion { get; set; }

        [m.Kontrol.Column()]
        int IdCompania { get; set; }


        [m.Kontrol.Column()]
        int IdComision { get; set; }

        m.Kontrol.Interfaces.ICompania Compania { get; set; }
        
        m.SCV.Interfaces.IComisionesSeguimiento Comision { get; set; }


    }
}
