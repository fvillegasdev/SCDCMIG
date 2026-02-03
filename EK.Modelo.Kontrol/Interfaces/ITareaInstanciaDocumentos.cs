using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface ITareaInstanciaDocumentos 
    {
        int? FlujoTrabajoInstanciaId { get; set; }
        int TareaInstanciaId { get; set; }
        int ID { get; set; }
        int ArchivoId { get; set; }
        int DocumentoId { get; set; }
        string text { get; set; }
        string title { get; set; }
        string Obligatorio { get; set; }
        string ShowDeleteButton { get; set; }
        string Referencia { get; set; }

    }
}
