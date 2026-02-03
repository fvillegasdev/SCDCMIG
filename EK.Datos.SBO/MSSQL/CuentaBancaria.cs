using System;
using System.Threading.Tasks;
using EK.Modelo.SBO.Interfaces;
using dao = EK.Datos.SBO.Interfaces;
using db = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo.SBO;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace EK.Datos.SBO.MSSQL
{
    public class CuentaBancaria : dao.ICuentaBancaria
    {
        private const string USP_CUENTABANCARIA_SELECT = "usp_cuentabancaria_select";
        //private const string USP_CUENTABANCARIA_INS_UPD = "dbo.usp_cuentabancaria_ins_upd";

        private db.IDBHelper helper;

        #region Public Functions

        public CuentaBancaria(db.IDBHelper helper)
        {
            this.helper = helper;
        }
       // public async Task<int> Save(ICuentaBancaria model)
       // {
       ////     int result = 0;
       //     try
       //     {
       //         var parameters = new Dictionary<string, object>
       //         {
       //             { "ID",model.ID},
       //             { "IdBanco", model.Banco.ID },
       //             { "Clave", model.Clave },
       //             { "Descripcion", model.Descripcion},
       //             { "Contrato", model.Contrato },
       //             { "Referencia", model.Referencia },
       //             { "IdMoneda", model.Moneda.ID},
       //             { "IdTipoPoliza", model.TipoPoliza.ID },
       //             { "IdCentroCosto", model.IdCentroCosto },
       //             { "IdCuentaContable", model.IdCuentaContable },
       //             { "FechaInicio", model.FechaInicio },
       //             { "IdTipoCuenta", model.IdTipoCuenta},
       //             { "ChequeFisico", model.ChequeFisico},
       //             { "ChequeElectronico", model.ChequeElectronico},
       //             { "SucursalOrigen", model.SucursalOrigen },
       //             { "CuentaBanco", model.CuentaBanco},
       //             { "BancaElectronica", model.BancaElectronica },
       //             { "Clabe", model.Clabe},
       //             { "Plaza", model.Plaza },
       //             { "Clasificacion", model.Clasificacion },
       //             { "Telefono1", model.Telefono1 },
       //             { "ExtTel", model.ExtTel},
       //             { "Responsable", model.Responsable },
       //             { "CuentaTercero", model.CuentaTercero},
       //             { "IdEstatus", model.IdEstatus },
       //             { "CreadoPor", model.IdCreadoPor },
       //             { "ModificadoPor", model.IdModificadoPor }
       //         };

       //         return await helper.GetResultAsync(USP_CUENTABANCARIA_INS_UPD, CommandType.StoredProcedure, parameters);
       //         //result = this.InsCuentaBancaria(parameters);
       //     }
       //     catch
       //     {

       //         throw;
       //     }
       //  //   return result;
       // }
        
        public async Task<object[]> GetAll()
        {
         //  object[] retValue = null;
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "kv", true }
                };
                return await helper.CreateEntitiesAsync(USP_CUENTABANCARIA_SELECT, CommandType.StoredProcedure, parameters);
                //  retValue = this.SelectCuentasBancarias(parameters);
            }
            catch
            {
                throw;
            }

        //   return retValue;
        }

        public async Task<ICuentaBancaria> GetById(int id)
        {
           // m.Interfaces.ICuentaBancaria retValue = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id }

                };
                return await helper.CreateSingleEntityAsync<m.Interfaces.ICuentaBancaria>(USP_CUENTABANCARIA_SELECT, CommandType.StoredProcedure, parameters);
                //retValue = this.SelectCuentaBancaria(parameters);
            }
            catch
            {
                throw;
            }

           // return retValue;
        }

        public async Task<List<ICuentaBancaria>> GetByBank(int idBanco, int idCompania)
        {
        //   List<m.Interfaces.ICuentaBancaria> retValue = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {                   
                    { "idBanco", idBanco },
                    { "idCompania",idCompania}

                };
                return await helper.CreateEntitiesAsync<m.Interfaces.ICuentaBancaria>(USP_CUENTABANCARIA_SELECT, CommandType.StoredProcedure, parameters);

            }
            catch
            {
                throw;
            }

          //  return retValue;
        }

        //public object[] GetCuentasClasificador(int idTipoClasificador, int idClasificador, int idUsuario, int todos, int idBanco)
        //{
        //    throw new NotImplementedException();
        //}


        #endregion

        #region Private Functions
        //private m.Interfaces.ICuentaBancaria SelectCuentaBancaria(Dictionary<string, object> parameters)
        //{
        //    m.Interfaces.ICuentaBancaria retValue = null;

        //    try
        //    {
        //        retValue = helper.CreateSingleEntity<m.Interfaces.ICuentaBancaria>(USP_CUENTABANCARIA_SELECT, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }

        //    return retValue;
        //}

        //private object[] SelectCuentasBancarias(Dictionary<string, object> parameters)
        //{
        //    object[] retValue = null;

        //    try
        //    {
        //        retValue = helper.CreateEntities(USP_CUENTABANCARIA_SELECT, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }

        //    return retValue != null ? retValue.ToArray() : null;
        //}

        //private int InsCuentaBancaria(Dictionary<string, object> parameters)
        //{
        //    int retValue = 0;

        //    try
        //    {
        //        retValue = helper.GetResult(USP_CUENTABANCARIA_INS_UPD, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }

        //    return retValue;
        //}

       
        #endregion
    }
}
