using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class BlogPostCategorias
        : BPBase<m.Kontrol.Interfaces.IBlogPostCategorias, d.Kontrol.Interfaces.IBlogPostCategorias>, p.Kontrol.Interfaces.IBlogPostCategorias
    {
        public BlogPostCategorias(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IBlogPostCategorias dao)
               : base(factory, dao, "BlogPostCategorias")
        {
        }
    }
}