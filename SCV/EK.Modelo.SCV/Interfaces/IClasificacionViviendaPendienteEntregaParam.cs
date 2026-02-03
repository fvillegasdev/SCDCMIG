using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IClasificacionViviendaPendienteEntregaParam : IBaseKontrol
    {
        string IdClasificador { get; set; }
        string Numcte { get; set; }
        string lote { get; set; }
        string ClaveClasificador { get; set; }
        int? Usuario { get; set; }
        string Comentarios { get; set; }
    }
}
