using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{  
    public interface IWorkflowReference:IBaseKontrol
    {
        string Referencia { get; set; }
        TipoReferenciaEnum IdTipo { get; set; }

        string Descripcion { get; set; }
        string Tipo { get; set; }
        string CC { get; set; }
        string Cliente { get; set; }
    }
}
