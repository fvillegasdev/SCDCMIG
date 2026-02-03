using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class UbicacionCoordenadas : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IUbicacionCoordenadas>, d.SCV.Interfaces.IUbicacionCoordenadas
    {
        private const string usp_ubicacionCoordenadas_Select = "usp_UbicacionesCoordenadasSelect";
        private const string usp_ubicacionesCoordenadas_insupd = "usp_ubicacionesCoordenadas_insupd";
        public UbicacionCoordenadas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  usp_ubicacionCoordenadas_Select,
                  usp_ubicacionesCoordenadas_insupd,
                  "ubicacionCoordenadas")
        { }
        public async Task<object[]> GetById(Dictionary<string,object> parametros)
        {
            return await helper.CreateEntitiesAsync(usp_ubicacionCoordenadas_Select, CommandType.StoredProcedure, parametros);
        }

        new public async Task<object[]> Save(m.SCV.Interfaces.IUbicacionCoordenadas parametros)
        {
            var parameters = new Dictionary<string, object>(){
                //{"Id", parametros.ID }
                { "Clave", parametros.Clave }
                ,{ "Nombre", parametros.Nombre }
                ,{ "IdUser", parametros.IdUser }
                ,{ "IdUbicacion", parametros.IdUbicacion }
                ,{"Coordenadas", parametros.Coordenadas }
            };
            //
            return await helper.CreateEntitiesAsync(usp_ubicacionesCoordenadas_insupd, CommandType.StoredProcedure, parameters);
        }
    }
}
