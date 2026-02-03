using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

using EK.Drivers.Log;
using Newtonsoft.Json;
using EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class Usuarios
        : p.Kontrol.BPBase<m.SCV.Interfaces.IAgente, d.SCV.Interfaces.IUsuarios>, p.SCV.Interfaces.IUsuarios
    {
        public Usuarios(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IUsuarios dao)
               : base(factory, dao, "usuarios")
        {
        }
        public virtual async Task<m.SCV.Interfaces.IAgente> GetByUserId(int id)
        {
            m.SCV.Interfaces.IAgente retValue = null;
            var bpUsuario = Get<p.Kontrol.Interfaces.IUsuario>();

            var parametros = new Dictionary<string, object>() { { "idUsuario", id } };
            var agentes = await this.dao.GetAll(parametros);

            if (agentes != null && agentes.Count > 0)
            {
                retValue = agentes[0];                
            }
            else {
                retValue = Get<m.SCV.Interfaces.IAgente>();
                retValue.ID = -1;
                retValue.IdUsuario = id;
            }
            retValue.Usuario = await bpUsuario.GetById(id);

            return retValue;
        }


        protected override async Task afterSaveItem(IAgente item)
        {
            try
            {
                BeginTransaction(true);

                var bpUsuario = Get<p.Kontrol.Interfaces.IUsuario>();

                item.Usuario = await bpUsuario.GetById(item.IdUsuario);

                Commit();
            }
            catch
            {
                Rollback();
                throw;
            }
        }

        //protected override Task deleteItem(int id, string entityName)
        //{
        //    return base.deleteItem(id, "usuariosAgentes");
        //}

        public override async Task<IAgente> Delete(int id)
        {
            IAgente retValue = null;

            try
            {
                BeginTransaction();

                retValue = await this.dao.GetById(id);

                await this.deleteItem(id, "usuariosAgentes");

                var deletedItem = await this.dao.GetById(id);
                if (deletedItem == null)
                {
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    retValue = deletedItem;
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                }
                await Log(retValue);

                retValue = await this.GetByUserId(retValue.IdUsuario);

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