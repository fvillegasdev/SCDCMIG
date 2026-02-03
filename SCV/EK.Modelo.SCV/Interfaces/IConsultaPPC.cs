using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IConsultaPPC
    {
        int Clasificacion { get; set; }
        string ClasificacionNombre { get; set; }
        string ClaveClasificacion { get; set; }
        string Plaza { get; set; }
        int IdPlaza { get; set; }
        int IdTipoVivienda { get; set; }
        int IdFraccionamiento { get; set; }
        string Fraccionamiento { get; set; }
        string TipoVivienda { get; set; }
        DateTime? FechaProgramacion { get; set; }
        DateTime? FechaReprogramacion { get; set; }
        string MotivoReprogramacion { get; set; }
        string Calle { get; set; }
        string Numero { get; set; }
        string Telefono { get; set; }
        string Celular { get; set; }
        string Email { get; set; }

    }
}
