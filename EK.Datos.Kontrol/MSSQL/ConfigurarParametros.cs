using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using dao = EK.Datos.Kontrol.Interfaces;
using im = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.Kontrol.MSSQL
{
    public class ConfigurarParametros :  
        DAOBaseGeneric<im.IConfigurarParametros>,dao.IConfigurarParametros
    {
        private const string USP_CONFIGURARPARAMETROS_SELECT = "usp_configurarparametros_select";
        private const string USP_CONFIGURARPARAMETROS_ALLSELECT = "usp_configurarparametros_allselect";
        private const string USP_PARAMETROS_MAIL = "usp_parametros_mail";
        #region Constructor

        public ConfigurarParametros(im.IContainerFactory factory, dao.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_CONFIGURARPARAMETROS_SELECT,
                  string.Empty,
                  "ConfigurarParametros")
        { }

        //public ConfigurarParametros(dao.IDBHelper helper)
        //{
        //    this.helper = helper;
        //}

        #endregion Constructor

        #region Public Functions

        public object[] GetAll(int idmodulo, int idcompania, string ambito = null)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("idcompania", idcompania);
                parameters.Add("idmodulo", idmodulo);
                parameters.Add("ambito", ambito);

                object[] retvalue = helper.CreateEntities<im.IConfigurarParametros>(USP_CONFIGURARPARAMETROS_ALLSELECT, CommandType.StoredProcedure, parameters).ToArray();
                return retvalue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public object[] Get(int idmodulo, int idcompania)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("idcompania", idcompania);
                parameters.Add("idmodulo", idmodulo);
                object[] retvalue = helper.CreateEntities<im.IConfigurarParametros>(USP_CONFIGURARPARAMETROS_SELECT, CommandType.StoredProcedure, parameters).ToArray();
                return retvalue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public im.IConfigurarParametros Get(int ID)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("id", ID);
                return helper.CreateSingleEntity<im.IConfigurarParametros>(USP_CONFIGURARPARAMETROS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public im.IConfigurarParametros[] Get(string nombre)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("nombre", nombre);
                return helper.CreateEntities<im.IConfigurarParametros>(USP_CONFIGURARPARAMETROS_SELECT, CommandType.StoredProcedure, parameters).ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<im.IConfigurarParametros>> GetAllConfiguracionParametros(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<im.IConfigurarParametros>(USP_CONFIGURARPARAMETROS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }

        //public int Save(im.IConfigurarParametros model)
        //{
        //    try
        //    {
        //        Dictionary<string, object> parameters = new Dictionary<string, object>();
        //        parameters.Add("id", model.ID);
        //        parameters.Add("Idparametro", model.IdParametro);
        //        parameters.Add("Idcliente", (model.IdCliente == null) ? Convert.DBNull : model.IdCliente);
        //        parameters.Add("IdCompania", (model.IdCompania == null) ? Convert.DBNull : model.IdCompania);
        //        parameters.Add("Valor", model.Valor);
        //        parameters.Add("IdEstatus", model.IdEstatus);
        //        parameters.Add("CreadoPor", model.IdCreadoPor);
        //        parameters.Add("ModificadoPor", model.IdModificadoPor);
        //        return helper.GetResult(USP_CONFIGURARPARAMETROS_INS_UPD, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

        public List<im.IConfigurarParametros> GetMailParameters(int idcliente)
        {
            try
            {
                
                Dictionary<string, object> parameters = new Dictionary<string, object>()
                {
                    { "IdCliente", idcliente }

                };

                return helper.CreateEntities<im.IConfigurarParametros>(USP_PARAMETROS_MAIL, CommandType.StoredProcedure, parameters);
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion Public Functions
    }
}