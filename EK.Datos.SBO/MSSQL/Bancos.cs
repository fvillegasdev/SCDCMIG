using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.SBO.Interfaces;
using dao = EK.Datos.SBO.Interfaces;
using db = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo.SBO;
using System.Data;

namespace EK.Datos.SBO.MSSQL
{
    public class Bancos : dao.IBancos
    {
        private const string USP_BANCOS_SELECT = "usp_banco_select";

        private db.IDBHelper helper;

        #region Public Functions

        public Bancos(db.IDBHelper helper)
        {
            this.helper = helper;
        }

        public async Task<object[]> GetAll()
        {
           // object[] retValue = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "kv", true }
                };
                return await helper.CreateEntitiesAsync(USP_BANCOS_SELECT, CommandType.StoredProcedure, parameters);
                // retValue = this.SelectBancos(parameters);
            }
            catch
            {
                throw;
            }

            //return retValue;
        }

        public async Task<IBancos> GetById(int id)
        {
            //m.Interfaces.IBancos retValue = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id }
                };
                return await helper.CreateSingleEntityAsync<m.Interfaces.IBancos>(USP_BANCOS_SELECT, CommandType.StoredProcedure, parameters);
                //retValue = this.SelectBanco(parameters);
            }
            catch
            {
                throw;
            }

           // return retValue;
        }

        //public async Task<int> Insert(IBancos model)
        //{
        //   // int result = 0;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "ID",0 },
        //            { "Clave", model.Clave },
        //            { "Descripcion", model.Descripcion },
        //            { "Sucursal", model.Sucursal },
        //            { "Direccion", model.Direccion },
        //            { "IdLocalidad", model.IdLocalidad },
        //            { "Telefono1", model.Telefono1 },
        //            { "ExtTel", model.ExtTel },
        //            { "Responsable", model.Responsable },
        //            { "IdBancoSAT", model.IdBancoSAT },
        //            { "EsBancoExtranjero", model.BancoExtranjero },
        //            { "Swift", model.Swift },
        //            { "SPEUA", model.SPEUA },
        //            { "IdEstatus", model.IdEstatus },
        //            { "CreadoPor", model.IdCreadoPor },
        //            { "ModificadoPor", model.IdModificadoPor }
        //        };
        //        return await helper.GetResultAsync(USP_BANCOS_INS_UPD, CommandType.StoredProcedure, parameters);
        //        // result = this.InsBanco(parameters);
        //    }
        //    catch
        //    {

        //        throw;
        //    }
        // //   return result;
        //}

        //public async Task<int> Update(IBancos model)
        //{
        //   // int result = 0;
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "ID",model.ID },
        //            { "Clave", model.Clave },
        //            { "Descripcion", model.Descripcion },
        //            { "Sucursal", model.Sucursal },
        //            { "Direccion", model.Direccion },
        //            { "IdLocalidad", model.IdLocalidad },
        //            { "Telefono1", model.Telefono1 },
        //            { "ExtTel", model.ExtTel },
        //            { "Responsable", model.Responsable },
        //            { "IdBancoSAT", model.IdBancoSAT },
        //            { "EsBancoExtranjero", model.BancoExtranjero },
        //            { "Swift", model.Swift },
        //            { "SPEUA", model.SPEUA },
        //            { "IdEstatus", model.IdEstatus },
        //            { "CreadoPor", model.IdCreadoPor },
        //            { "ModificadoPor", model.IdModificadoPor }
                    
        //        };
        //        return await helper.GetResultAsync(USP_BANCOS_INS_UPD, CommandType.StoredProcedure, parameters);
        //        // result = this.InsBanco(parameters);
        //    }
        //    catch
        //    {

        //        throw;
        //    }
        //   // return result;
        //}
        #endregion
        #region Private Functions

        //private m.Interfaces.IBancos SelectBanco(Dictionary<string, object> parameters)
        //{
        //    m.Interfaces.IBancos retValue = null;

        //    try
        //    {
        //        retValue = helper.CreateSingleEntity<m.Interfaces.IBancos>(USP_BANCOS_SELECT, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }

        //    return retValue;
        //}

        //private object[] SelectBancos(Dictionary<string, object> parameters)
        //{
        //    object[] retValue = null;

        //    try
        //    {
        //        retValue = helper.CreateEntities(USP_BANCOS_SELECT, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }

        //    return retValue != null ? retValue.ToArray() : null;
        //}

        //private int InsBanco(Dictionary<string, object> parameters)
        //{
        //    int retValue = 0;

        //    try
        //    {
        //        retValue = helper.GetResult(USP_BANCOS_INS_UPD, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }

        //    return retValue;
        //}

        public async Task<object[]> compania(int idCompania)
        {
            //object[] retValue = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                   { "id", DBNull.Value },
                    { "idCompania",idCompania},
                    { "kv",false}
                };
                return await helper.CreateEntitiesAsync(USP_BANCOS_SELECT, CommandType.StoredProcedure, parameters);
                //retValue = this.SelectBancos(parameters);
            }
            catch
            {
                throw;
            }

           // return retValue;
        }

             #endregion
    }
}
