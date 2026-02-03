using System;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;

using m = EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos.Kontrol.Interfaces;
using p = EK.Procesos.Kontrol.Interfaces;

using EK.Drivers.Log;

namespace EK.Procesos.Kontrol
{
    public class BPBase<T, V> 
        : ProcesoBase, m.IBPBase<T> 
        where T : class, m.IBaseKontrol 
        where V: class, d.IDAOBaseGeneric<T>
    {
        protected V dao;

        protected BPBase(m.IContainerFactory factory, V dao, string entityName)
            : base(factory, dao, entityName)
        {
            this.dao = dao;
        }

        protected virtual async Task<T> afterGetItem(T item) {
            return await Task.FromResult(item);
        }

        public virtual async Task<T> GetById(int id)
        {
            var retValue = await this.dao.GetById(id);

            retValue = await this.afterGetItem(retValue);

            return retValue;
        }
        public virtual async Task<T> GetAndSaveById(int id)
        {
            var retValue = await this.dao.GetById(id);

            retValue = await this.afterGetItem(retValue);
            retValue =  await this.Save(retValue);
            return retValue;
        }

        public virtual async Task<T> GetByClave(string clave)
        {
            var retValue = await this.dao.GetByClave(clave);

            retValue = await this.afterGetItem(retValue);

            return retValue;
        }

        public virtual async Task<bool> IsValidToken(Dictionary<string, object> parameters)
        {
            bool retValue = false;
            string token = null;

            if (parameters != null && parameters.ContainsKey("token"))
            {
                token = parameters["token"].ToString();

                var daoTokens = Get<d.IUsuariosToken>();
                var daoParameters = new Dictionary<string, object>() {
                    { "token", token}
                };
                var tokens = await daoTokens.GetAll(daoParameters);
                //
                if (tokens != null && tokens.Count > 0)
                {
                    var t = tokens[0];
                    retValue = true;

                    //
                    if (parameters.ContainsKey("userID"))
                    {
                        var idUser = Convert.ToInt32(parameters["userID"]);

                        if (idUser == t.IdUsuario)
                        {
                            this.IdUser = t.IdUsuario;
                            //
                        }
                        else
                        {
                            base.SetReturnInfo(501, "Invalid User/Token combination");
                        }
                    }
                    else
                    {
                        this.IdUser = t.IdUsuario;
                    }
                  
                }
                else {
                    base.SetReturnInfo(501, "Invalid Token");
                }
            }
            //
            return retValue;
        }

        protected virtual async Task deleteItem(int id, string entityName)
        {
            if (string.IsNullOrEmpty(entityName))
            {
                await this.dao.Delete(id);
            }
            else {
                await this.dao.Delete(id, entityName);
            }
        }

        public virtual async Task<T> Delete(int id)
        {
            T retValue = null;

            try
            {
                BeginTransaction();

                retValue = await this.dao.GetById(id);

                await this.deleteItem(id, null);

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

                //await Log(retValue);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<T> GetNewEntity() {
            var retValue = await Assign(this.factory.GetInstance<T>());
            retValue.ID = -1;
            retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;

            return retValue;
        }

        public virtual async Task<List<T>> GetAll(Dictionary<string, object> parametros)
        {
            return await this.dao.GetAll(parametros);
        }

        public virtual async Task<object[]> Export(Dictionary<string, object> parametros) {
            //if (parametros != null) {
            //    parametros.Add("export", true);
            //}

            return await this.dao.Export(parametros);
        }

        public virtual async Task<object[]> Search(string criteria)
        {
            return await this.dao.Search(criteria);
        }

        public virtual async Task<bool> Exists(Dictionary<string, object> parametros)
        {
            var retValue = false;
            int? idItem = 0;
            if (parametros != null) {
                if (parametros.ContainsKey("ID")) {
                    idItem = Convert.ToInt32(parametros["ID"]);
                    //
                    parametros.Remove("ID");
                    //
                }
            }

            List<T> items = await this.dao.GetAll(parametros);

            if (items != null) {
                if (items.Count > 0) {
                    foreach (var item in items) {
                        if (item.ID != idItem) {
                            retValue = true;
                            //
                            break;
                        }
                    }
                }
            }

            return retValue;
        }

        protected virtual async Task afterSaveItem(T item)
        {
            await Task.FromResult(0);
        }

        protected virtual async Task afterSaveItem(T item, T pItem)
        {
            await Task.FromResult(0);
        }

        protected virtual async Task<T> SaveEntity(T item)
        {

            if (this.dao.Helper != null &&  !this.dao.Helper.HasConnection)
            {
                if (this.Helper != null && this.Helper.HasConnection)
                {
                    this.dao.Helper = this.Helper;
                }
            }
          return  await this.dao.SaveEntity(item);
        }
        protected virtual async Task<T> saveModel(T item)
        {
            T retValue = null;

            if (this.dao.Helper!=null && !this.dao.Helper.HasConnection)
            {
                if (this.Helper!=null && this.Helper.HasConnection)
                {
                    this.dao.Helper = this.Helper;
                }
            }

            item.Estado = item.ID == null || item.ID <= 0 ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo : Modelo.Kontrol.KontrolEstadosEnum.Modificado;
            if (item != null) {
                item.Modificado = DateTime.UtcNow;
                item.IdModificadoPor = base.getUserId();
            }

            if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Nuevo) {
                item.Creado = DateTime.UtcNow;
                item.IdCreadoPor = base.getUserId();
            }

            retValue = await this.dao.Save(item);

            if (retValue != null)
            {
                retValue.Estado = item.ID == null || item.ID <= 0 ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo : Modelo.Kontrol.KontrolEstadosEnum.Modificado;

                await this.afterSaveItem(retValue);
                await this.afterSaveItem(retValue, item);
                //await Log(retValue);
            }
            else {
                //await Log(item);
            };

            return retValue;
        }

        public virtual async Task<T> Save(T item)
        {
            T retValue = null;

            try
            {
                BeginTransaction(true);
                //
                retValue = await saveModel(item);
                //
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
