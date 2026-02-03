using System;
using System.Collections.Generic;
using System.Data;
//using System.Data.SqlClient;
using Sap.Data.SQLAnywhere;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Threading.Tasks;

using dao = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.Kontrol
{
    public abstract class DAOBase2
        : dao.IDAOBase
    {
        protected EK.Modelo.Kontrol.Interfaces.IContainerFactory factory;
        protected dao.IDBHelper helper;
        protected string entityName;
        protected string defaultSelect;
        protected string defaultSave;

        protected const string USP_ALL_DELETE = "usp_all_delete";

        public DAOBase2() {
        }

        public DAOBase2(EK.Modelo.Kontrol.Interfaces.IContainerFactory factory, dao.IDBHelper helper, string defaultSelect, string defaultSave)
            : base()
        {
            this.factory = factory;
            this.helper = helper;
            this.defaultSelect = defaultSelect;
            this.defaultSave = defaultSave;
        }

        public DAOBase2(m.IContainerFactory factory, dao.IDBHelper helper, string defaultSelect, string defaultSave, string entityName)
            : this(factory, helper, defaultSelect, defaultSave)
        {
            this.entityName = entityName;
        }

        public dao.IDBHelper Helper {
            get {
                return this.helper;
            }
            set {
                if (this.helper != null) {
                    this.helper.Dispose();
                    this.helper = null;
                }

                this.helper = value;
            }
        }

        protected virtual string IDName {
            get {
                return "ID";
            }
        }

        protected virtual string EntityName
        {
            get
            {
                return "";
            }
        }

        public virtual async Task<int> Delete(int id) {
            return await DeleteEntity(id, IDName, EntityName, true);
        }

        public virtual async Task<int> Delete(int id, string entityName)
        {
            return await DeleteEntity(id, IDName, entityName, true);
        }

        public virtual async Task<int> Delete(int id, string idName, string entityName)
        {
            return await DeleteEntity(id, idName, entityName, true);
        }

        public virtual async Task<int> Delete(int id, string idName, string entityName, bool updateIfNoDelete)
        {
            return await DeleteEntity(id, idName, entityName, updateIfNoDelete);
        }

        protected virtual async Task<int> DeleteEntity(int id, string idName, string entityName)
        {
            return await DeleteEntity(id, idName, entityName, true);
        }

        protected virtual async Task<int> DeleteEntity(int id, string idName, string entityName, bool updateIfNoDelete)
        {
            int retValue = -1;
            try
            {
                var parameters = new Dictionary<string, object> {
                    { "ID", id },
                    { "idName", idName},
                    { "entityName", entityName},
                    { "update", updateIfNoDelete}
                };

                retValue = await helper.GetResultAsync(USP_ALL_DELETE, CommandType.StoredProcedure, parameters);

                return retValue;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
