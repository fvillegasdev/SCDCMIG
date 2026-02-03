//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Data;
//using System.Data.SqlClient;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using idata = EK.Datos.Kontrol.Interfaces;
//using imodel = EK.Modelo.Kontrol.Interfaces;
//using model = EK.Modelo.Kontrol;
//using Newtonsoft.Json;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class TipoWorkflow : idata.ITipoWorkflow
//    {
//        private const string USP_TIPOFLUJOTRABAJO_SELECT = "{call usp_tipoflujotrabajo_select(?,?)}";
//        private const string USP_TIPOFLUJOTRABAJO_INSERT_UPDATE = "{call usp_tipoflujotrabajo_insert_update(?,?,?,?,?,?,?)}";

//        private idata.IDBHelper helper;
//        public TipoWorkflow(imodel.IContainerFactory factory, idata.IDBHelper helper)
//        {
//            //this.helper = helper;
//            this.helper = new EK.Datos.Kontrol.Sybase.DBHelper(factory);
//        }

//        public List<imodel.ITipoWorkflow> GetAll(int ShowAvailables)
//        {
//            List<imodel.ITipoWorkflow> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "IdTipoFlujo",DBNull.Value },
//                    { "MostrarDisponibles",ShowAvailables }
//            };

//                result = helper.CreateEntities<imodel.ITipoWorkflow>(USP_TIPOFLUJOTRABAJO_SELECT, CommandType.StoredProcedure,parameters);

//                return result;
//            }
//            catch (Exception)
//            {

//                throw;
//            }
//        }

//        public imodel.ITipoWorkflow GetById(int Id)
//        {
//            imodel.ITipoWorkflow result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "IdTipoFlujo",Id },
//                    { "MostrarDisponibles",0 }
//            };

//                result = helper.CreateSingleEntity<imodel.ITipoWorkflow>(USP_TIPOFLUJOTRABAJO_SELECT, CommandType.StoredProcedure, parameters);

//                return result;
//            }
//            catch (Exception)
//            {

//                throw;
//            }
//        }

//        public imodel.ITipoWorkflow Save(imodel.ITipoWorkflow modelTipo)
//        {
//            imodel.ITipoWorkflow result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id",modelTipo.ID },
//                    { "clave",modelTipo.Clave },
//                    { "nombre",modelTipo.Nombre },
//                    { "idEstatus",modelTipo.IdEstatus },
//                    { "creadoPor",modelTipo.IdCreadoPor },
//                    { "modificadoPor",modelTipo.IdModificadoPor },
//                    { "idAmbito",modelTipo.IdAmbito }
//            };

//                result = helper.CreateSingleEntity<imodel.ITipoWorkflow>(USP_TIPOFLUJOTRABAJO_INSERT_UPDATE, CommandType.StoredProcedure, parameters);

//                return result;
//            }
//            catch (Exception)
//            {

//                throw;
//            }
//        }
//    }
//}
