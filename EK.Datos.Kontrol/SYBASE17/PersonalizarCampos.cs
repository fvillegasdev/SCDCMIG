using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class PersonalizarCampos
        : DAOBaseGeneric<m.Kontrol.Interfaces.IPersonalizarCampo>, d.Kontrol.Interfaces.IPersonalizarCampos
    {
        private const string USP_PERSONALIZAR_CAMPOS_SELECT = "usp_PersonalizarCampos_select";
        private const string USP_PERSONALIZAR_CAMPOS_OPCIONES_SELECT = "usp_PersonalizarCampos_Opciones_select";
        private const string USP_PERSONALIZAR_CAMPOS_VALORES_SELECT = "usp_PersonalizarCampos_Valores_select";
        
        public PersonalizarCampos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_PERSONALIZAR_CAMPOS_SELECT,
                  string.Empty,
                  "PersonalizarCampos")
        { }

        public async Task<List<IPersonalizarCampoOpcion>> GetCustomForm(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IPersonalizarCampoOpcion>(USP_PERSONALIZAR_CAMPOS_OPCIONES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IPersonalizarCampo_Valor>> GetCustomFormValue(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IPersonalizarCampo_Valor>(USP_PERSONALIZAR_CAMPOS_VALORES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Task<int> GetConfigCountValue(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
    }
}
