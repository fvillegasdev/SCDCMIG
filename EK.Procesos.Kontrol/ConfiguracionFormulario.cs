using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Dynamic;

namespace EK.Procesos.Kontrol
{
    public class ConfiguracionFormulario :
        p.Kontrol.BPBase<m.Kontrol.Interfaces.IConfiguracionFormulario, d.Kontrol.Interfaces.IConfiguracionFormulario>,
        p.Kontrol.Interfaces.IConfiguracionFormulario
    {

        public ConfiguracionFormulario(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IConfiguracionFormulario dao)
            : base(factory, dao, "ConfiguracionFormularios")
        {
        }


        public async Task<List<m.Kontrol.Interfaces.IIConfiguracionFormularioEntidad>> GetAllEntidades(Dictionary<string, object> parametros)
        {
            var daoEntidades = Get<d.Kontrol.Interfaces.IConfiguracionFormularioEntidad>();
            return await daoEntidades.GetAll(parametros);
        }

        public new async Task<m.Kontrol.Interfaces.IConfiguracionFormulario> Save(m.Kontrol.Interfaces.IConfiguracionFormulario item)
        {
            
            BeginTransaction(true);

            var retvalue = Get<m.Kontrol.Interfaces.IConfiguracionFormulario>();

            var sizeBootstrap = new List<Tuple<int, decimal>>();
            sizeBootstrap = this.createListSizeBootstrap();

            try
            {
                int idUsuario = base.getUserId();

                foreach (var element in item.configuracion)
                {
                    if (element.Estado != EK.Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                    {
                        element.Changed("Visible", true);
                        element.Changed("Requerido", true);
                        element.Changed("xs", true);
                        element.Changed("sm", true);
                        element.Changed("md", true);
                        element.Changed("lg", true);
                        element.Changed("Orden", true);


                        element.Modificado = DateTime.UtcNow;
                        element.IdModificadoPor = idUsuario;

                        List<string> lista = new List<string>();

                        int xs = element.xs > 0 ? this.searchSize((int)element.xs, sizeBootstrap) : 12; 
                        int sm = element.sm > 0 ? this.searchSize((int)element.sm, sizeBootstrap) : 12;
                        int md = element.md > 0 ? this.searchSize((int)element.md, sizeBootstrap) : 12;
                        int lg = element.lg > 0 ? this.searchSize((int)element.lg, sizeBootstrap) : 12;


                        lista.Add(xs.ToString());
                        lista.Add(sm.ToString());
                        lista.Add(md.ToString());
                        lista.Add(lg.ToString());

                        element.Size= string.Join(",", lista.ToArray());

                        await this.dao.SaveEntity(element, false);
                    }
                }
            }
            catch(Exception ex)
            {
                string error = ex.ToString();
                throw;
            }
            retvalue.TipoEntidad = item.TipoEntidad;
            Commit();
            return retvalue;
        }


        public async  Task<object> GetFormConfiguration(Dictionary<string, object> parametros)
        {
            var listConfiguration= await this.dao.GetAll(parametros);

            List<object> formConfiguration = new List<object>();

            foreach (var item in listConfiguration)
            {
                dynamic element = new ExpandoObject();

                item.Size=item.Size == null ? "12, 12, 12, 12" : item.Size;

                element.ID = item.ID;
                element.Clave = item.Clave;
                element.Visible = item.Visible;
                element.Requerido = item.Requerido;
                element.Size = item.Size.Split(',');
                formConfiguration.Add(element);
            }
            return formConfiguration;
        }

        public async Task<Dictionary<string,object>> GetAllDictionary(Dictionary<string, object> parametros)
        {
            var data = await this.dao.GetAll(parametros);

            var dictionary = new Dictionary<string, object>();

            foreach (var item in data)
            {
                dynamic expando = new ExpandoObject();
                expando.ID = item.ID;
                expando.Visible = item.Visible;
                expando.Requerido = item.Requerido;

                expando.Size = item.Size.Split(',');

                dictionary.Add(item.Clave, expando);
            }

            return dictionary;
        }


        public int searchSize(int valor, List<Tuple<int, decimal>> sizeBootstrap)
        {
            int valorAsignado = 0;

            for (int i = 0; i < sizeBootstrap.Count(); i++)
            {
                if (sizeBootstrap[i].Item2 <= valor && sizeBootstrap[i + 1].Item2 >= valor)
                {
                    if (sizeBootstrap[i].Item2 == valor)
                    {
                        valorAsignado = sizeBootstrap[i].Item1;
                    }
                    else
                    {
                        valorAsignado = sizeBootstrap[i + 1].Item1;
                    }
                    break;
                }
            }
            return valorAsignado;
        }

        private List<Tuple<int, decimal>> createListSizeBootstrap()
        {
            var sizeBootstrap = new List<Tuple<int, decimal>>();

            for (int i = 1; i <= 12; i++)
            {
                decimal val = (i * 100M) / 12M;
                sizeBootstrap.Add(new Tuple<int, decimal>(i, Math.Round(val)));
            }
            return sizeBootstrap;
        }
    }
}
