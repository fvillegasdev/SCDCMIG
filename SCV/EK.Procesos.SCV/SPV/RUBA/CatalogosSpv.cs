using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class CatalogosSpv : p.Kontrol.BPBase<m.SCV.Interfaces.ICatalogosSpv, d.SCV.Interfaces.ICatalogosSpv>, p.SCV.Interfaces.ICatalogosSpv
    {
        public CatalogosSpv(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ICatalogosSpv dao)
           : base(factory, dao, "CatalogosSpv")
        {
        }

        public async Task<object[]> GetCatalogoFallasNuevoCatalogo(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetCatalogoFallasNuevoCatalogo(parametros);
            return Result;
        }
        public async Task<object[]> GetUsuariosByPlaza(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetUsuariosByPlaza(parametros);
            return Result;
        }
        public async Task<object[]> CrudCatalogoFallasNuevoCatalogo(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            var Result = await this.dao.CrudCatalogoFallasNuevoCatalogo(parametros);
            return Result;
        }
        public async Task<object[]> GetCatalogoOrigenFalla(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetCatalogoOrigenFalla(parametros);
            return Result;
        }
        public async Task<object[]> IsCoordinador(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.IsCoordinador(parametros);
            return Result;
        }
        public async Task<object[]> GetComponentes(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetComponentes(parametros);
            return Result;
        }
        public async Task<object[]> GetComponentesGarantia(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetComponentesGarantia(parametros);
            return Result;
        }
        public async Task<object[]> CrudComponentes(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.CrudComponentes(parametros);
            return Result;
        }
        public async Task<object[]> GetConfiguracionDocumentos(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetConfiguracionDocumentos(parametros);
            return Result;
        }
        public async Task<object[]> CrudConfiguracionDocumentos(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.CrudConfiguracionDocumentos(parametros);
            return Result;
        }
        public async Task<object[]> GetConfigDoctos(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetConfigDoctos(parametros);
            return Result;
        }
        public async Task<object[]> GetTiposVivienda(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetTiposVivienda(parametros);
            return Result;
        }

        public async Task<object[]> GetSegmentos(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetSegmentos(parametros);
            return Result;
        }
        public async Task<object[]> GetUsers(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetUsers(parametros);
            return Result;
        }
        public async Task<object[]> GetUsersAsignados(Dictionary<string, object> parametros)
        {
            var Result = await this.dao.GetUsersAsignados(parametros);
            return Result;
        }
        public async Task<object[]> ProcessConfigCorreoEquipamientoAssign(List<IConfigCorreosEquipamientoParam> parametros)
        {
            dynamic response = null;
            var data = parametros[0];
            string Plaza = data.Plaza;
            string Empleado = data.Empleado;
            string Operacion = data.Operacion;
            Dictionary<string, object> param = new Dictionary<string, object>();
            foreach (var x in data.Segmentos)
            {
                param.Clear();
                param.Add("OPERACION", Operacion);
                param.Add("PLAZA", Plaza);
                param.Add("VOCACION", x.Segmento);
                param.Add("EMPLEADO", Empleado);
                response = await this.dao.ProcessConfigCorreoEquipamiento(param);

            }
            return response;
        }
        public async Task<object[]> ProcessConfigCorreoEquipamiento(List<IConfigCorreosEquipamientoParam> parametros)
        {
            dynamic response = null;
            Dictionary<string, object> param = new Dictionary<string, object>();
            foreach(var x in parametros)
            {
                param.Clear();
                param.Add("OPERACION", x.Operacion);
                param.Add("PLAZA", x.Plaza);
                param.Add("VOCACION", x.Vocacion);
                param.Add("EMPLEADO", x.Empleado);
                response = await this.dao.ProcessConfigCorreoEquipamiento(param);
                
            }
            return response;
        }
    }
}
