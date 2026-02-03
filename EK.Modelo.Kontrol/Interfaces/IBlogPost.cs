using System;
using System.Collections.Generic;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("BlogPost")]
    public interface IBlogPost
        : IBaseKontrol
    {

        [Column()]
        string Descripcion { get; set; }

        [Column()]
        int IdTipoEntidad { get; set; }

        [Column()]
        int IdEntidad { get; set; }


        [Column()]
        int? IdBlogPost { get; set; }

        [Column()]
        int IdCategoria { get; set; }

        
    

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }



        List<m.Kontrol.Interfaces.IBlogPost> ListBlogPost { get; set; }

        //m.Kontrol.Interfaces.IBlogPost BlogPost { get; set; }
        m.Kontrol.Interfaces.IBlogPostCategorias Categoria { get; set; }
        m.Kontrol.Interfaces.ITipoEntidad TipoEntidad { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Entidad { get; set; }

        m.Kontrol.Interfaces.IUsuario Usuario { get; set; }

        int TotalArchivos { get; set; }

    }
}
