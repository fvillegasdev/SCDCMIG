using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class Entidades
        : DAOBaseGeneric<m.Kontrol.Interfaces.IEntidad>, d.Kontrol.Interfaces.IEntidades
    {
        private const string USP_ENTIDADES_SELECT = "usp_entidades_select";
        private const string USP_ENTIDADES_CAMPOS_SELECT = "usp_entidades_campos_select";

        public Entidades(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
              factory,
              helper,
              USP_ENTIDADES_SELECT,
              string.Empty,
              "entidades")
        { }

        public async Task<List<m.Kontrol.Interfaces.IEntidadCampo>> GetCamposEntidad(string clave)
        {
            List<m.Kontrol.Interfaces.IEntidadCampo> retValue;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "Clave", clave}
                };

                retValue = await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IEntidadCampo>(USP_ENTIDADES_CAMPOS_SELECT, CommandType.StoredProcedure, parameters);

                return retValue;
            }
            catch (Exception e)
            {
                throw new ApplicationException("BP Application Exception", e);
            }
        }
    }
}
