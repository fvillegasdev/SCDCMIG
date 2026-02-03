//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Linq;
//using idata = EK.Datos.Kontrol.Interfaces;
//using imodel = EK.Modelo.Kontrol.Interfaces;
//using model = EK.Modelo.Kontrol;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class PlantillasMails : idata.IPlantillasMails
//    {
//        private const string USP_PLANTILLASMAILS_SELECT = "{call usp_plantillasmails_select(?, ?)}";
//        private const string USP_PLANTILLASMAILS_INS_UPD = "{call usp_plantillasmails_ins_upd(?,?,?,?,?,?,?,?)}";
//        private idata.IDBHelper helper;

//        public PlantillasMails(imodel.IContainerFactory factory, idata.IDBHelper helper)
//        {
//            //this.helper = helper;
//            this.helper = new EK.Datos.Kontrol.Sybase.DBHelper(factory);
//        }

//        public imodel.IPlantillasMails GetPlantillaMailsByKey(string Clave)
//        {
//            List<imodel.IPlantillasMails> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                        { "Clave", Clave},
//                        { "id", DBNull.Value}
//                };

//                result = helper.CreateEntities<imodel.IPlantillasMails>(USP_PLANTILLASMAILS_SELECT, CommandType.StoredProcedure, parameters);

//                return result.Count == 0 ? null : result[0];
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public int Save(imodel.IPlantillasMails model)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>()
//                {
//                    {"ID",model.ID },
//                    {"Clave" ,  model.Clave},
//                    {"Nombre" ,  model.Nombre},
//                    {"Descripcion" , model.Descripcion},
//                    {"Plantilla" , model.Plantilla},
//                    {"IdEstatus" , model.IdEstatus},
//                    {"ModificadoPor" , model.IdModificadoPor},
//                    {"CreadoPor" , model.IdCreadoPor}
//                };
//                return helper.GetResult(USP_PLANTILLASMAILS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw new ApplicationException("Plantillas Mails DAO", ex);
//            }
//        }

//        public object[] Get()
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>()
//                {
//                    { "Clave", DBNull.Value},
//                    {"id", DBNull.Value }
//                };
//                return helper.CreateEntities(USP_PLANTILLASMAILS_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public imodel.IPlantillasMails Get(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>()
//                {
//                    { "Clave", DBNull.Value},
//                    { "id", id }
//                };
//                return helper.CreateSingleEntity<imodel.IPlantillasMails>(USP_PLANTILLASMAILS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}