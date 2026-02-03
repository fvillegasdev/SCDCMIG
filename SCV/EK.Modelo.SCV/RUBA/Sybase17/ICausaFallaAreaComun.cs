using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_causas_falla")]
    public interface ICausaFallaAreaComun
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("desc_causa")]
        string Descripcion { get; set; }

        [m.Kontrol.Column("Id")]
        string Clave { get; set; }



    }
}
