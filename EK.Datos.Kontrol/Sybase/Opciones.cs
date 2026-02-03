//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Data;
//using System.Data.SqlClient;
//using System.Linq;

//using dao = EK.Datos.Kontrol.Interfaces;
//using im = EK.Modelo.Kontrol.Interfaces;
//using m = EK.Modelo.Kontrol;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class Opciones : dao.IOpciones
//    {
//        private dao.IDBHelper helper;

//        public Opciones(dao.IDBHelper helper)
//        {
//            this.helper = helper;
//        }

//        public object[] GetAll(int idmodulo)
//        {
//            Dictionary<string, object> parameters = new Dictionary<string, object>();
//            object[] retValue;

//            try
//            {
//                string sqlQuery = @"SELECT	  o.ID
//		                , o.Opcion
//		                , o.Descripcion
//		                , o.Permisos
//		                , o.EsVisible
//		                , o.Icono
//		                , o.IdModulo as [Modulo.ID]
//		                , m.Clave as [Modulo.Clave]
//		                , m.Nombre as [Modulo.Nombre]
// 	 	                , o.IdEstatus as [Estatus.ID]
// 		                , e.Clave as [Estatus.Clave]
// 		                , o.Creado
// 		                , o.Creadopor as [CreadoPor.ID]
// 		                , o.Modificado
// 		                , o.Modificadopor as [ModificadoPor.ID]
// 		                , CAST(CAST(o.RV AS BIGINT) AS NVARCHAR) as Version
//                FROM opciones o
//		                LEFT JOIN modulos as m on m.id = o.IdModulo
//		                INNER JOIN catalogosgeneralesvalores as e on o.IdEstatus = e.Id
//		                INNER JOIN usuarios uc on  uc.Id = o.creadopor
//		                INNER JOIN usuarios um on um.Id = o.modificadopor
//                WHERE
//	                (o.IdEstatus = 13) and o.IdModulo =@idmodulo ";

//                parameters = new Dictionary<string, object>();
//                parameters.Add("idmodulo", idmodulo);

//                retValue = helper.CreateEntities(sqlQuery, CommandType.Text, parameters);
//                return retValue.ToArray();
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public im.IOpcionModulo Get(int ID)
//        {
//            Dictionary<string, object> parameters = new Dictionary<string, object>();
//            m.Interfaces.IOpcionModulo retValue;
//            try
//            {
//                string sqlQuery = @"SELECT o.ID
//		                , o.Opcion
//		                , o.Descripcion
//		                , o.Permisos
//		                , o.EsVisible
//		                , o.Icono
//		                , o.IdModulo as [Modulo.ID]
//		                , m.Clave as [Modulo.Clave]
//		                , m.Nombre as [Modulo.Nombre]
// 	 	                , o.IdEstatus as [Estatus.ID]
// 		                , e.Clave as [Estatus.Clave]
// 		                , o.Creado
// 		                , o.Creadopor as [CreadoPor.ID]
// 		                , o.Modificado
// 		                , o.Modificadopor as [ModificadoPor.ID]
// 		                , CAST(CAST(o.RV AS BIGINT) AS NVARCHAR) as Version
//                        , uc.Nombre as [CreadoPor.Nombre]
//                        , um.Nombre as [ModificadoPor.Nombre]
//                FROM opciones o
//                        LEFT JOIN modulos as m on m.id = o.IdModulo
//                        INNER JOIN catalogosgeneralesvalores as e on o.IdEstatus = e.Id
//                        INNER JOIN usuarios uc on uc.Id = o.creadopor
//                        INNER JOIN usuarios um on um.Id = o.modificadopor
//                WHERE
//                        o.ID = @ID";

//                parameters = new Dictionary<string, object>();
//                parameters.Add("ID", ID);

//                retValue = helper.CreateSingleEntity<m.Interfaces.IOpcionModulo>(sqlQuery, CommandType.Text, parameters);
//                return retValue;
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public im.IOpcionModulo[] Get(string nombre)
//        {
//            Dictionary<string, object> parameters = new Dictionary<string, object>();
//            List<m.Interfaces.IOpcionModulo> retValue;
//            try
//            {
//                string sqlQuery = @"SELECT o.ID
//		                , o.Opcion
//		                , o.Descripcion
//		                , o.Permisos
//		                , o.EsVisible
//		                , o.Icono
//		                , o.IdModulo as [Modulo.ID]
//		                , m.Clave as [Modulo.Clave]
//		                , m.Nombre as [Modulo.Nombre]
// 	 	                , o.IdEstatus as [Estatus.ID]
// 		                , e.Clave as [Estatus.Clave]
// 		                , o.Creado
// 		                , o.Creadopor as [CreadoPor.ID]
// 		                , o.Modificado
// 		                , o.Modificadopor as [ModificadoPor.ID]
// 		                , CAST(CAST(o.RV AS BIGINT) AS NVARCHAR) as Version
//                FROM opciones o
//                        LEFT JOIN modulos as m on m.id = o.IdModulo
//                        INNER JOIN catalogosgeneralesvalores as e on o.IdEstatus = e.Id
//                        INNER JOIN usuarios uc on uc.Id = o.creadopor
//                        INNER JOIN usuarios um on um.Id = o.modificadopor
//               WHERE o.nombre like '%' + @nombre + '%'";

//                parameters = new Dictionary<string, object>();
//                parameters.Add("nombre", nombre);

//                retValue = helper.CreateEntities<m.Interfaces.IOpcionModulo>(sqlQuery, CommandType.Text, parameters);
//                return retValue.ToArray();
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public int Insert(im.IOpcionModulo model)
//        {
//            int result = 0;
//            SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["EKConnection"].ConnectionString);
//            try
//            {
//                SqlCommand cmd;
//                var ekConnection = ConfigurationManager.ConnectionStrings["EKConnection"].ConnectionString;
//                string sqlQuery = @"
//                            INSERT INTO Opciones( Opcion, Descripcion, Permisos , EsVisible, Icono, IdModulo, IdEstatus, Creado, CreadoPor, Modificado, ModificadoPor )
//                            VALUES( @Opcion, @Descripcion, @Permisos , @EsVisible, @Icono, @IdModulo, @Estatus,  GETUTCDATE() , @CreadoPor ,  GETUTCDATE(), @ModificadoPor);
//                            SELECT Scope_Identity(); ";

//                cmd = new SqlCommand(sqlQuery, cn);
//                cmd.Parameters.Add("@Opcion", SqlDbType.NVarChar).Value = model.Opcion;
//                cmd.Parameters.Add("@Descripcion", SqlDbType.NVarChar).Value = model.Descripcion;
//                cmd.Parameters.Add("@Permisos", SqlDbType.Int).Value = model.Permisos;
//                cmd.Parameters.Add("@EsVisible", SqlDbType.Int).Value = model.EsVisible;
//                cmd.Parameters.Add("@Icono", SqlDbType.NVarChar).Value = (model.Icono == null) ? Convert.DBNull : model.Icono;
//                cmd.Parameters.Add("@IdModulo", SqlDbType.Int).Value = model.IdModulo;
//                cmd.Parameters.Add("@Estatus", SqlDbType.Int).Value = model.IdEstatus;
//                cmd.Parameters.Add("@CreadoPor", SqlDbType.Int).Value = model.IdCreadoPor;
//                cmd.Parameters.Add("@ModificadoPor", SqlDbType.Int).Value = model.IdModificadoPor;
//                cn.Open();
//                result = Convert.ToInt32(cmd.ExecuteScalar().ToString());
//                cn.Close();
//            }
//            catch
//            {
//                if (cn.State == ConnectionState.Open) { cn.Close(); }
//                throw;
//            }
//            return result;
//        }

//        public int Update(im.IOpcionModulo model)
//        {
//            int result = 0;
//            SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["EKConnection"].ConnectionString);
//            try
//            {
//                SqlCommand cmd;
//                string sqlQuery = @"UPDATE Opciones
//                        SET Opcion = @Opcion
//                        , Descripcion=  @Descripcion
//                        , Permisos = @Permisos
//                        , EsVisible = @EsVisible
//                        , Icono =  @Icono
//                        , IdModulo = @IdModulo
//                        , IdEstatus = @Estatus
//                        , Modificado = GETUTCDATE()
//                        , ModificadoPor= @ModificadoPor
//                        WHERE ID = @ID";
//                cmd = new SqlCommand(sqlQuery, cn);
//                cmd.Parameters.Add("@ID", SqlDbType.Int).Value = model.ID;
//                cmd.Parameters.Add("@Opcion", SqlDbType.NVarChar).Value = model.Opcion;
//                cmd.Parameters.Add("@Descripcion", SqlDbType.NVarChar).Value = model.Descripcion;
//                cmd.Parameters.Add("@Permisos", SqlDbType.Int).Value = model.Permisos;
//                cmd.Parameters.Add("@EsVisible", SqlDbType.Int).Value = model.EsVisible;
//                cmd.Parameters.Add("@Icono", SqlDbType.NVarChar).Value = (model.Icono == null) ? Convert.DBNull : model.Icono;
//                cmd.Parameters.Add("@IdModulo", SqlDbType.Int).Value = model.IdModulo;
//                cmd.Parameters.Add("@Estatus", SqlDbType.Int).Value = model.IdEstatus;
//                cmd.Parameters.Add("@ModificadoPor", SqlDbType.Int).Value = model.IdModificadoPor;
//                cn.Open();
//                result = cmd.ExecuteNonQuery();
//                cn.Close();
//            }
//            catch
//            {
//                if (cn.State == ConnectionState.Open) { cn.Close(); }
//                throw;
//            }
//            return result;
//        }
//    }
//}