using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IStorageTarea: IBaseKontrol
    {
        int TareaInstanciaId {get; set;}
        string DescripcionTareaInstancia {get; set;}
        int TareaId { get; set; }
        string DescripcionTarea {get; set;}
        int IdStatus {get; set;}
        string NombreStatus {get; set;}
        string Comentarios {get; set;}       
        DateTime? FechaAprobacion {get; set;}
        DateTime? FechaAsignacion {get; set;}
        DateTime? FechaVigencia {get; set;}
        int? AprobadoPor { get; set;}
        int Orden { get; set;}
        string Tipo { get; set;}
        string EstadoStr { get; set; }
    }
}
