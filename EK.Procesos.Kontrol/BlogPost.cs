using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class BlogPost
        : BPBase<m.Kontrol.Interfaces.IBlogPost, d.Kontrol.Interfaces.IBlogPost>, p.Kontrol.Interfaces.IBlogPost
    {
        public BlogPost(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IBlogPost dao)
               : base(factory, dao, "blogPost")
        {
        }


        public async Task<List<m.Kontrol.Interfaces.IBlogPostCategorias>> GetBlogPostCategorias(Dictionary<string, object> parametros)
        {
            var daoBlogCatagoria = Get<d.Kontrol.Interfaces.IBlogPostCategorias>();
            return await daoBlogCatagoria.GetAll(parametros);

        }



        public async override Task<List<m.Kontrol.Interfaces.IBlogPost>> GetAll(Dictionary<string, object> parametros)
        {
            parametros.Add("blogPrincipal", true);

            var data = await this.dao.GetAll(parametros);
            foreach (var item in data)
            {
                item.ListBlogPost = new List<IBlogPost>();
                parametros.Clear();
                parametros.Add("IdBlogPost", item.ID.Value);
                item.ListBlogPost = await this.dao.GetAll(parametros);
            }
            return data;

        }


        public new async Task<List<m.Kontrol.Interfaces.IBlogPost>> Save(m.Kontrol.Interfaces.IBlogPost item)
        {
            var bpCatalogoG = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ITiposEntidad>();

            var tipoEntidad = await bpTipoEntidad.GetByClave(item.TipoEntidad.Clave);
            var estatus = await bpCatalogoG.Get("ESTATUS", "A");

            item.IdTipoEntidad = tipoEntidad.ID.Value;
            item.IdEntidad = (int)item.Entidad.ID;

            item.IdEstatus = estatus.ID.Value;

            if (item.IdBlogPost > 0)
            {
                var postOriginal = await this.GetById((int)item.IdBlogPost);
                item.Nombre = postOriginal.Nombre;
                item.IdCategoria = postOriginal.IdCategoria;
            }

            item = await base.saveModel(item);

            var parametros = new Dictionary<string, object>
            {
                {"idEntidad",item.IdEntidad },
                {"claveTipoEntidad",tipoEntidad.Clave }
            };
            return await this.GetAll(parametros);
        }

    }
}