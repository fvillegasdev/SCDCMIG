using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Localidades
        : DAOBaseGeneric<m.Kontrol.Interfaces.ILocalidad>, d.Kontrol.Interfaces.ILocalidades
    {
        private const string USP_LOCALIDADES_SELECT = "usp_localidades_select";

        public Localidades(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory, 
                  helper,
                  USP_LOCALIDADES_SELECT,
                  string.Empty,
                  "localidades")
        { }

        public async Task<m.Kontrol.Interfaces.ILocalidad> obtenerLocalidadPorId(int Id) {
            try
            {
                var par = new Dictionary<string, object>
                {
                    {"id",Id }
                };
                return await helper.CreateSingleEntityAsync<m.Kontrol.Interfaces.ILocalidad>(USP_LOCALIDADES_SELECT, CommandType.StoredProcedure,par);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}