using System;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;
namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("TipoCitas")]
    public interface ITipoCitas
        : IBaseKontrol
    {
        [Column()]
        string Color { get; set; }

        [Column()]
        string ColorText { get; set; }
        
        
    }
}
