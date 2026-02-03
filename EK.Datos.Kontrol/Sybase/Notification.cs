//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Data.SqlClient;
//using System.Linq;
//using System.Data;
//using interfacedatos = EK.Datos.Kontrol.Interfaces;
//using idata = EK.Datos.Kontrol.Interfaces;
//using imodel = EK.Modelo.Kontrol.Interfaces;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class Notification
//        : DAOBase, interfacedatos.INotification
//    {
//        private const string USP_NOTIFICACIONES_SELECT = "{call usp_notificaciones_select(?)}";
//        private const string USP_NOTIFICACIONES_SINGLE_SELECT = "{call usp_notificaciones_single_select(?,?,?)}";
//        private const string USP_NOTIFICACIONES_INS_UPD = "{call usp_notificaciones_ins_upd(?,?,?,?,?,?,?,?,?,?)}";

//        public Notification(imodel.IContainerFactory factory, idata.IDBHelper helper)
//        {
//            this.factory = factory;
//            this.helper = helper;
//        }

//        public List<imodel.INotificationItem> GetAllNotifications(int IdUser)
//        {
//            List<imodel.INotificationItem> result = new List<imodel.INotificationItem>();
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "IdUser",IdUser }
//                };
//                result = helper.CreateEntities<imodel.INotificationItem>(USP_NOTIFICACIONES_SELECT, CommandType.StoredProcedure,parameters);

//                return result;
//            }
//            catch (System.Exception)
//            {
//                throw;
//            }
//        }

//        public imodel.ISingleNotification GetSingleNotification(int id)
//        {
//            imodel.ISingleNotification result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id },
//                    { "idUsuario", null },
//                    { "leidos", null }
//                };

//                result = helper.CreateSingleEntity<imodel.ISingleNotification>(USP_NOTIFICACIONES_SINGLE_SELECT, CommandType.StoredProcedure, parameters);

//                return result;
//            }
//            catch (System.Exception)
//            {
//                throw;
//            }
//        }

//        public List<imodel.ISingleNotification> GetSingleNotifications(int idUser, bool? leidos)
//        {
//            List<imodel.ISingleNotification> result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", null },
//                    { "idUsuario", idUser },
//                    { "leidos", leidos }
//                };

//                result = helper.CreateEntities<imodel.ISingleNotification>(USP_NOTIFICACIONES_SINGLE_SELECT, CommandType.StoredProcedure, parameters);

//                return result;
//            }
//            catch (System.Exception)
//            {
//                throw;
//            }
//        }

//        public int SaveNotificacion(imodel.ISingleNotification notificacion)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    {"id", notificacion.ID },
//                    {"idUser", notificacion.IdUser },
//                    {"idNivel", notificacion.IdNivel },
//                    {"titulo", notificacion.Asunto },
//                    {"contenido", notificacion.Contenido },
//                    {"link", notificacion.Link },
//                    {"leido", notificacion.Leido },
//                    {"leidoEn", notificacion.LeidoEn },
//                    {"idReferencia", notificacion.IdReferencia },
//                    {"idUserCreador", notificacion.IdModificadoPor }
//                };
//                return helper.GetResult(USP_NOTIFICACIONES_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        //public object[] GetAllNotifications(string typeElement)
//        //{
//        //    IList<object> lst = new List<object>();
//        //    var ekConn = ConfigurationManager.ConnectionStrings["mssql:cs"].ConnectionString;
//        //    using (var conn = new SqlConnection(ekConn))
//        //    {
//        //        try
//        //        {
//        //            var cmdText = "";
//        //            switch (typeElement)
//        //            {
//        //                case "notification":
//        //                    cmdText = @"SELECT ST.StorageId,ST.Creado,ST.DescripcionTareaInstancia,ST.Comentarios,
//        //                                    ST.IdSTatus,ST.IdEstatus,ST.Tipo 
//        //                                FROM StorageTarea ST
//        //                                JOIN dbo.CatalogosGeneralesValores CE ON(ST.IdEstatus = CE.Id)
//        //                                Where CE.Clave='A' and ST.Tipo='N' ORDER BY ST.Creado DESC";
//        //                    break;

//        //                case "task":
//        //                    cmdText = @" SELECT T.TareaInstanciaId,T.Creado,T.Descripcion,T.Comentarios 
//        //                                  FROM dbo.TareaInstancias T
//        //                         JOIN dbo.FlujoTrabajoInstancia FTI ON(T.FlujoTrabajoInstanciaId=FTI.FlujoTrabajoInstanciaId)
//        //                                  JOIN dbo.CatalogosGeneralesValores CE ON(T.IdEstatus = CE.Id)
//        //                                  JOIN dbo.CatalogosGeneralesValores CS ON(T.IdStatus = CS.Id)
//        //                         JOIN dbo.CatalogosGeneralesValores CSF ON(FTI.IdStatus = CSF.Id)
//        //                                  WHERE CE.Clave = 'A' and CS.Clave='SD' and T.Estado='Autorizando' and CSF.Clave<>'CA'
//        //                         ORDER BY T.Creado DESC";
//        //                    break;

//        //                case "message":
//        //                    cmdText = @"SELECT ST.StorageId,ST.Creado,ST.DescripcionTareaInstancia,ST.Comentarios,
//        //                                    ST.IdSTatus,ST.IdEstatus,ST.Tipo 
//        //                                FROM StorageTarea ST
//        //                                JOIN dbo.CatalogosGeneralesValores CE ON(ST.IdEstatus = CE.Id)
//        //                                Where CE.Clave='A' and ST.Tipo='M' ORDER BY ST.Creado DESC";
//        //                    break;
//        //            }

//        //            var cmd = new SqlCommand(cmdText, conn);
//        //            conn.Open();
//        //            SqlDataReader dr = cmd.ExecuteReader();

//        //            while (dr.Read())
//        //            {
//        //                switch (typeElement)
//        //                {
//        //                    case "notification":
//        //                    case "message":
//        //                        object objNot = new
//        //                        {
//        //                            id = dr.GetInt32(0),
//        //                            time = dr.GetDateTime(1).ToShortTimeString(),
//        //                            title = dr.GetString(2),
//        //                            image = "fa fa-plus",
//        //                            text = dr.GetString(3),
//        //                            typeElement = typeElement,
//        //                            valueNow = 0
//        //                        };
//        //                        lst.Add(objNot);
//        //                        break;

//        //                    case "task":
//        //                        object objtask = new
//        //                        {
//        //                            id = dr.GetInt32(0),
//        //                            time = dr.GetDateTime(1).ToShortTimeString(),
//        //                            title = dr.GetString(2),
//        //                            image = "fa fa-plus",
//        //                            text = dr.GetString(3),
//        //                            typeElement = typeElement,
//        //                            valueNow = 0
//        //                        };
//        //                        lst.Add(objtask);
//        //                        break;
//        //                }
//        //            }

//        //        }
//        //        catch (System.Exception)
//        //        {

//        //            throw;
//        //        }

//        //    }
//        //        return lst.ToArray();

//        //}
//    }
//}
