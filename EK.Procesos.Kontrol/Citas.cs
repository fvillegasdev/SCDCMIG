using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Citas
        : BPBase<m.Kontrol.Interfaces.ICitas, d.Kontrol.Interfaces.ICitas>, p.Kontrol.Interfaces.ICitas
    {
        public Citas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ICitas dao)
               : base(factory, dao, "Citas")
        {
        }

        public  async override Task<List<m.Kontrol.Interfaces.ICitas>> GetAll(Dictionary<string, object> parametros)
        {
            parametros.Add("IdOwner", base.getUserId());
            parametros.Add("todas", true);
            return await this.dao.GetAll(parametros);
        }
        protected override async Task afterSaveItem(ICitas item)
        {
            var bpOption = Get<p.Kontrol.Interfaces.IOpciones>();
            var bpUsuario = Get<p.Kontrol.Interfaces.IUsuario>();
            var optionAut = await bpOption.GetByClave("citas");
            var pm = await GetGlobalParameters("INSTALACION");
            string optionPath = optionAut.Ruta;
            string linkTarea;

            if (optionPath.Contains(":id"))
            {
                linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}".Replace(":id", "");
            }
            else
            {
                if (!optionPath.EndsWith("/"))
                {
                    linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}/";
                }
                else
                {
                    linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}";
                }
            }

            var parametros = new Dictionary<string, object>()
            {
                { "Link", linkTarea + item.ID.Value.ToString() }
            };
            await SendNotification(await bpUsuario.GetById(item.AsignadoA.ID.Value), "US-CITA", linkTarea, item, parametros);
        }

        public new async Task<m.Kontrol.Interfaces.ICitas> Delete(int id)
        {
            m.Kontrol.Interfaces.ICitas retValue = null;
            BeginTransaction();
            try
            {
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "B");
                retValue = await this.GetById(id);
                retValue.IdEstatus = estatus.ID;
                retValue.Changed("IdEstatus", true);
                await this.Save(retValue);
                await Log(retValue);
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            return retValue;
        }

    }
}