using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    public interface ISeguimientoCampaniaPublicidadEvento : m.Kontrol.Interfaces.IBaseKontrol
    {
        string Origen { get; set; }
        string Email { get; set; }

        DateTime? PrimerIngreso { get; set; }
        DateTime? UltimoIngreso { get; set; }
        int Clics { get; set; }
        
       
    }
}
