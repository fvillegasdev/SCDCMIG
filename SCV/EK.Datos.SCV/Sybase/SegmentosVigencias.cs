//using System;
//using System.Collections.Generic;
//using System.Data;

//using diKontrol = EK.Datos.Kontrol.Interfaces;
//using diSCV = EK.Datos.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using miSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.Sybase
//{
//    public class SegmentosVigencias : diSCV.ISegmentosVigencias
//    {
//        private diKontrol.IDBHelper helper;
//        private const string USP_SEGMENTOSVIGENCIAS_SELECT = "{call usp_segmentosvigencias_select(?,?)}";
//        private const string USP_SEGMENTOSVIGENCIAS_INS_UPD = "{call usp_segmentosvigencia_ins_upd(?,?,?,?,?,?,?,?)}";

//        public SegmentosVigencias(miKontrol.IContainerFactory factory, diKontrol.IDBHelper helper)
//        {
//            this.helper = new Kontrol.Sybase.DBHelper(factory);
//        }

//        public object[] GetAll(int id, int activos)
//        {

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "activos", activos}
//                 };

//                return helper.CreateEntities(USP_SEGMENTOSVIGENCIAS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public miSCV.ISegmentoVigencia GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "activos", DBNull.Value}
//                 };
//                return helper.CreateSingleEntity<miSCV.ISegmentoVigencia>(USP_SEGMENTOSVIGENCIAS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int Save(miSCV.ISegmentoVigencia model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("id", model.ID);
//                parameters.Add("idsegmento", model.IdSegmento);
//                parameters.Add("vigencia", model.Vigencia);
//                parameters.Add("precioinicial", model.PrecioInicial);
//                parameters.Add("preciofinal", model.PrecioFinal);
//                parameters.Add("idestatus", model.IdEstatus);
//                parameters.Add("creadopor", model.IdCreadoPor);
//                parameters.Add("modificadopor", model.IdModificadoPor);
//                return helper.GetResult(USP_SEGMENTOSVIGENCIAS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }
//    }
//}
