using System;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("TiposEvento")]
    public interface ITipoEvento
        : IBaseKontrol
    {
        string Color { get; set; }
        string ColorText { get; set; }
    }
}