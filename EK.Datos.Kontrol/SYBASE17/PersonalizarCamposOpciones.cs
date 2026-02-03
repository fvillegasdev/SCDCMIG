using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class PersonalizarCamposOpciones
        : DAOBaseGeneric<m.Kontrol.Interfaces.IPersonalizarCampoOpcion>, d.Kontrol.Interfaces.IPersonalizarCamposOpciones
    {
        private const string USP_PERSONALIZAR_CAMPOS_OPCIONES_SELECT = "usp_PersonalizarCampos_Opciones_select";
        
        public PersonalizarCamposOpciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_PERSONALIZAR_CAMPOS_OPCIONES_SELECT,
                  string.Empty,
                  "PersonalizarCamposOpciones")
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

    }
}
