using System;
using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("Eventos")]
    public interface IEvento
        : IBaseKontrol
    {
        int IdEntidad { get; set; }
        int IdTipoEntidad { get; set; }
        ITipoEntidad TipoEntidad { get; set; }
        IItemGeneral Entidad { get; set; }
        DateTime? FechaInicio { get; set; }
        DateTime? FechaFin { get; set; }
        DateTime? FechaCierre { get; set; }
    }
}
