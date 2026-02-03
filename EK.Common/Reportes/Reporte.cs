using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Common.Reportes
{
    public class Reporte
    {
        public string Titulo { get; set; }
        public string SubTitulo { get; set; }
        public string Logo { get; set; }
        public string FechaImpresion { get; set; }
        public string HoraImpresion { get; set; }
        public int Pagina { get; set; }
        public int TotalPaginas { get; set; }
        public string Encabezado { get; set; }
        public string PieDePagina {get;set;}
        public List<Columna> Columnas { get; set; }

        public class Columna {
            public string Titulo { get; set; }
            public int Longitud { get; set; }
            public string Campo { get; set; }
            public string Formato { get; set; }
            public string Alineacion { get; set; }
            public string FormatoDesborde { get; set; }
        }

        public class Grupo {
            public string Campo { get; set; }
            public string CampoDescripcion { get; set; }
            public string EtiquetaAntes { get; set; }
            public string EtiquetaDespues { get; set; }

            public Dictionary<string, Func<object, string>> Calculos { get; set; }
        }
    }
}
