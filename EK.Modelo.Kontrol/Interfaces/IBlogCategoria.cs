using System;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("BlogPostCategorias")]
    public interface IBlogPostCategorias
        : IBaseKontrol
    {

        [Column()]
        int IdTipoEntidad { get; set; }

        m.Kontrol.Interfaces.ITipoEntidad TipoEntidad { get; set; }
    }
}
