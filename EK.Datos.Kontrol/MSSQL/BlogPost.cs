using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.Kontrol.MSSQL
{
    public class BlogPost :
        d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IBlogPost>, d.Kontrol.Interfaces.IBlogPost
    {
        private const string USP_SCV_BLOG_POST_SELECT = "usp_BlogPost_select";

        public BlogPost(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_BLOG_POST_SELECT, null, "BlogPost")
        { }
    }
}
