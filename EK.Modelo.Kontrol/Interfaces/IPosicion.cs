using System;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("posiciones")]
    public interface IPosicion
        : IBaseKontrol
    {
        [Column()]
        int? IdPadre { get; set; }
        [Column()]
        int IdCategoria { get; set; }
        [Column()]
        int? IdUsuario { get; set; }
        
        IPosicion Padre { get; set; }
        ICategoria Categoria { get; set; }
        IUsuario Usuario { get; set; }
    }
}
