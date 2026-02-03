using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class NivelesEtapas
        : DAOBaseGeneric<m.Kontrol.Interfaces.INivelesEtapas>, d.Kontrol.Interfaces.INivelesEtapas
    {
        private const string USP_NIVELESETAPAS_SELECT = "usp_niveles_etapas";
        public NivelesEtapas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_NIVELESETAPAS_SELECT,
                  string.Empty,
                  "NivelesEtapas")
        { }

        public async Task<object> obetnerEtapasNiveles(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_NIVELESETAPAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}