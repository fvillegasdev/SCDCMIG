using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.Kontrol.MSSQL
{
    public class BlogPostCategorias :
        d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IBlogPostCategorias>, d.Kontrol.Interfaces.IBlogPostCategorias
    {
        private const string USP_SCV_BLOG_POST_SELECT = "usp_BlogPostCategorias_select";

        public BlogPostCategorias(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_BLOG_POST_SELECT, null, "BlogPostCategorias")
        { }
    }
}
