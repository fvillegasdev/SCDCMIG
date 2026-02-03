using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class KontrolFiles : DAOBase, d.IKontrolFiles
    {
        private const string USP_KONTROLFILES_SELECT = "usp_KontrolFiles_select";
        private const string USP_KONTROLFILES_INS_UPD = "usp_KontrolFiles_ins_upd";

        public KontrolFiles(m.IContainerFactory factory, d.IDBHelper helper)
        {
            base.factory = factory;
            base.helper = helper;
        }

        protected override string EntityName
        {
            get
            {
                return "KontrolFiles";
            }
        }

        public async Task<List<m.IKontrolFile>> GetAll(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.IKontrolFile>(
                    USP_KONTROLFILES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.IKontrolFile> GetItem(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.IKontrolFile>(
                    USP_KONTROLFILES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.IKontrolFile> GetById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id },
                    { "tipo", DBNull.Value },
                    { "entityType", DBNull.Value },
                    { "entityId", DBNull.Value },
                    { "activos", 0 }
                };

                return await helper.CreateSingleEntityAsync<m.IKontrolFile>(
                    USP_KONTROLFILES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> Save(m.IKontrolFile model)
        {
            try
            {
                var p = new Dictionary<string, object>();
                p.Add("Id", model.ID);
                p.Add("EntityId", model.EntityId);
                p.Add("EntityType", model.EntityType);
                p.Add("Modulo", model.Modulo);
                p.Add("Uid", model.Uid);
                p.Add("Tipo", model.Tipo);
                p.Add("FilePath", model.FilePath);
                p.Add("Nombre", model.Nombre);
                p.Add("FileSize", model.FileSize);
                p.Add("FileType", model.FileType);
                p.Add("FileExtension", model.FileExtension);
                p.Add("CreadoPor", model.IdCreadoPor);
                p.Add("ModificadoPor", model.IdModificadoPor);
                p.Add("FileVersion", model.FileVersion);
                if(model.Clave != null)
                {
                    p.Add("Clave", model.Clave);
                }
               
                return await helper.GetResultAsync(
                    USP_KONTROLFILES_INS_UPD, CommandType.StoredProcedure, p);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public override Task<int> Delete(int id)
        {
            return base.Delete(id);
        }

        public async Task<m.IKontrolFile> GetByUid(string uid)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "uid", uid }
                };

                return await helper.CreateSingleEntityAsync<m.IKontrolFile>(
                    USP_KONTROLFILES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<m.IKontrolFile> GetByClave(string clave)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "clave", clave }
                };

                return await helper.CreateSingleEntityAsync<m.IKontrolFile>(
                    USP_KONTROLFILES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}