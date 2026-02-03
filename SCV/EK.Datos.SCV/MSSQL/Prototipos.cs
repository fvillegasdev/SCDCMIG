using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class Prototipos: dk.DAOBaseGeneric<m.IPrototipo>, d.IPrototipos
    {
        private const string ENTITY_NAME = "scv_prototipos";
        private const string USP_SCV_PROTOTIPOS_SELECT = "usp_scv_prototipos_select";

        public Prototipos(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_PROTOTIPOS_SELECT, null, ENTITY_NAME)
        {


        }
        public async Task<object> GetByPrototipoId(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                    {{ "id", id }};
                return await helper.CreateSingleEntityAsync(USP_SCV_PROTOTIPOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

    }
}
//public Prototipos(miKontrol.IContainerFactory factory, diKontrol.IDBHelper helper)
//{
//    base.factory = factory;
//    base.helper = helper;
//}

//public async Task<object[]> GetAll(int activos, bool kv)
//{
//    try
//    {
//        var parameters = new Dictionary<string, object>
//        {
//            { "id", DBNull.Value },
//            { "activos", activos },
//            { "kv", kv}
//        };
//        return await helper.CreateEntitiesAsync(USP_SCV_PROTOTIPOS_SELECT, 
//            CommandType.StoredProcedure, parameters);
//    }
//    catch
//    {
//        throw;
//    }
//}

//public async Task<miSCV.IPrototipo> GetById(int id)
//{
//    try
//    {
//        var parameters = new Dictionary<string, object>
//        {
//            { "id", id },
//            { "activos", DBNull.Value }
//        };
//        return await helper.CreateSingleEntityAsync<miSCV.IPrototipo>(
//            USP_SCV_PROTOTIPOS_SELECT, CommandType.StoredProcedure, parameters);
//    }
//    catch
//    {
//        throw;
//    }
//}

//public async Task<int> Save(miSCV.IPrototipo model)
//{
//    try
//    {
//        Dictionary<string, object> parameters = new Dictionary<string, object>();
//        parameters.Add("ID", model.ID);
//        parameters.Add("Clave", model.Clave);
//        parameters.Add("Nombre", model.Nombre);
//        parameters.Add("Descripcion", model.Descripcion);
//        parameters.Add("FrenteMinimo", model.FrenteMinimo);
//        parameters.Add("Construccion", model.Construccion);
//        parameters.Add("Recamaras", model.Recamaras);
//        parameters.Add("IdRecamara", model.Recamara.ID);
//        parameters.Add("IdSalaTV", model.IdSalaTV);
//        parameters.Add("IdCuartoServicio", model.IdCuartoServicio);
//        parameters.Add("Banios", model.Banios);
//        parameters.Add("IdTipoInmueble", model.Inmueble.ID);
//        parameters.Add("IdEstatus", model.IdEstatus);
//        parameters.Add("CreadoPor", model.IdCreadoPor);
//        parameters.Add("ModificadoPor", model.IdModificadoPor);

//        return await helper.GetResultAsync(
//            USP_SCV_PROTOTIPOS_INS_UPD, CommandType.StoredProcedure, parameters);
//    }
//    catch
//    {
//        throw;
//    }
//}
