using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using d = EK.Datos;
//using m = EK.Modelo/*;*/
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class VistaElemento : DAOBaseGeneric<m.Kontrol.Interfaces.IVistaElemento>, d.Kontrol.Interfaces.IVistaElemento
    {
        private const string usp_vistasElemento_Id = "usp_vistasElemento_Id";
        private const string usp_vistaelementos_insupd = "usp_vistaelementos_insupd";
        public VistaElemento(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
    : base(
          factory,
          helper,
          usp_vistasElemento_Id,
          usp_vistaelementos_insupd,
          "vistasElemento")
        { }

        public override async Task<List<m.Kontrol.Interfaces.IVistaElemento>> GetAll(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IVistaElemento>(usp_vistasElemento_Id, CommandType.StoredProcedure, parametros);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public override async Task<m.Kontrol.Interfaces.IVistaElemento> Save(m.Kontrol.Interfaces.IVistaElemento elemento)
        {
            var parametros = new Dictionary<string, object>()
                    {
                        { "ID", elemento.ID },
                        { "Clave", elemento.Clave },
                        { "Nombre", elemento.Nombre },
                        { "CreadoPor", elemento.IdCreadoPor },
                        { "ModificadoPor" ,elemento.IdModificadoPor },
                        { "IdVista " , elemento.IdVista },
                        { "IdElemento ", elemento.IdElemento },
                        { "Color", elemento.Color }
                    };
            //await helper.CreateSingleEntityAsync(usp_vistaelementos_insupd, CommandType.StoredProcedure, parametros);
            return await helper.CreateSingleEntityAsync<m.Kontrol.Interfaces.IVistaElemento>(usp_vistaelementos_insupd, CommandType.StoredProcedure, parametros);
            //return elemento;
        }

        //public async Task<object[]> GetUbicacionColores(int Id, int IdFilter)
        //{
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //                    {
        //                        { "IdFilter", IdFilter },
        //                        { "Id", Id }
        //                };
        //        return await helper.CreateEntitiesAsync(usp_vistasElemento_Id, CommandType.StoredProcedure, parameters);
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        public async Task<object[]> GetUbicacionColores(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(usp_vistasElemento_Id, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }

    }
}
