using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("Vistas")]
    public interface IVistas : IBaseKontrol
    {
        [Column("Nombre",true)]
        new string Nombre { get; set; }
        [Column("Clave", true)]
        new string Clave { get; set; }
        int IdVista { get; set; }
        string Descripcion { get; set; }
        string SP { get; set; }

        List<IVistaElemento> Elementos { get; set; }
    }
}
