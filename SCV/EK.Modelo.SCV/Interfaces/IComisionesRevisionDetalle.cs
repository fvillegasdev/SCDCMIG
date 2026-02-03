using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ComisionRevisionDetalle")]

    public interface IComisionesRevisionDetalle
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }



        [m.Kontrol.Column()]
        int IdRevision { get; set; }

        [m.Kontrol.Column()]
        int NRevision { get; set; }


        m.SCV.Interfaces.IComisionesRevision Revision { get; set; }


    }
}
