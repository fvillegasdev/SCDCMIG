using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.MSSQL
{
    public class CatalogosSpv : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ICatalogosSpv>, d.SCV.Interfaces.ICatalogosSpv
    {
        private const string USP_CAT_FALLA_NUEVO_CATALOGO_SELECT = "usp_spv_falla_nuevo_catalogo_select";
        private const string USP_CAT_FALLA_NUEVO_CATALOGO_CRUD = "usp_spv_falla_nuevo_catalogo_crud";
        private const string USP_CAT_ORIGEN_FALLA = "usp_spv_origen_falla";
        private const string USP_USUARIOS_PLAZA = "usp_usuarios_plaza";
        private const string USP_ISCOORDINADOR = "usp_isCoordinador";
        private const string USP_COMPONENTES_SELECT= "usp_componentes_select";
        private const string USP_COMPONENTES_GARANTIA_SELECT= "usp_componentes_garantias";
        private const string USP_COMPONENTES_CRUD= "usp_componentes_crud";
        private const string USP_CONFIGURACION_DOC_SELECT= "usp_configuracion_docs_select";
        private const string USP_CONFIGURACION_DOC_CRUD= "usp_configuracion_docs_crud";
        private const string USP_CONFIGURACION_DOCTOS= "usp_configuracion_doctos";
        private const string USP_TIPOS_VIVIENDA= "usp_tipo_vivienda_select";
        private const string USP_SEL_SEGMENTOS= "usp_sel_segmentos";
        private const string USP_SEL_USERS= "usp_sel_users";
        private const string USP_SEL_USERS_ASIGNADOS= "usp_sel_users_asignados";
        private const string USP_PR_USERS_ASIGNATOR = "usp_pr_users_asignator";
        public CatalogosSpv(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, null, null, "catalogos")
        { }

        public async Task<object[]> GetCatalogoFallasNuevoCatalogo(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_CAT_FALLA_NUEVO_CATALOGO_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> CrudCatalogoFallasNuevoCatalogo(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_CAT_FALLA_NUEVO_CATALOGO_CRUD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetCatalogoOrigenFalla(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_CAT_ORIGEN_FALLA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetUsuariosByPlaza(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_USUARIOS_PLAZA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> IsCoordinador(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_ISCOORDINADOR, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetComponentes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMPONENTES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> CrudComponentes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMPONENTES_CRUD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetComponentesGarantia(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMPONENTES_GARANTIA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetConfiguracionDocumentos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_CONFIGURACION_DOC_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> CrudConfiguracionDocumentos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_CONFIGURACION_DOC_CRUD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetConfigDoctos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_CONFIGURACION_DOCTOS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetTiposVivienda(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_TIPOS_VIVIENDA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetSegmentos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SEL_SEGMENTOS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetUsers(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SEL_USERS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetUsersAsignados(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SEL_USERS_ASIGNADOS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> ProcessConfigCorreoEquipamiento(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_PR_USERS_ASIGNATOR, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
