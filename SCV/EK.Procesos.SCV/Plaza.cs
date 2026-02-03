using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class Plaza
        : p.Kontrol.BPBase<m.SCV.Interfaces.IPlaza, d.SCV.Interfaces.IPlaza>, p.SCV.Interfaces.IPlaza

    {
        public Plaza(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IPlaza dao)
            : base(factory, dao, "scv_Plaza")
        {
        }

        public async Task<List<m.Kontrol.Interfaces.IUsuario>> getGerentes(Dictionary<string, object> parametros)
        {
            return await this.dao.getGerentes(parametros);
        }

        public async Task<List<m.Kontrol.Interfaces.IUsuario>> getCatByClaveUbicacion(Dictionary<string, object> parametros)
        {
            return await this.dao.getGerentes(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePlazas>> GetSPVPlazas(Dictionary<string,object> parametros)
        {
            var daoCE = Get<d.SCV.Interfaces.IConsultaViviendaEntregables>();
            return await daoCE.GetPlazas(base.getUserId());
        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePlazas>> GetSPVPlazasFraccionamientoCat(Dictionary<string, object> parametros)
        {
            var daoCE = Get<d.SCV.Interfaces.IConsultaViviendaEntregables>();
            var UserID = base.getUserId();
            return await daoCE.GetPlazasFracCats(UserID);
        }
        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePlazas>> GetSPVPlazasSupervisoresCat(Dictionary<string, object> parametros)
        {
            var daoCE = Get<d.SCV.Interfaces.IConsultaViviendaEntregables>();
            var UserID = base.getUserId();
            return await daoCE.GetSPVPlazasSupervisoresCat(UserID);
        }

        public async Task<List<m.SCV.Interfaces.IPlaza>> GetSPVPlazasClasificadores(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "PlazasClasificadores");
            parametros.Add("IdUsuario", base.getUserId());

            return await dao.getPlazasClasificadores(parametros);
        }
    }
}