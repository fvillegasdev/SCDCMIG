using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class RadarClientes : p.Kontrol.BPBase<m.SCV.Interfaces.IRadarCliente, d.SCV.Interfaces.IRadarClientes>,
        p.SCV.Interfaces.IRadarClientes
    {
        public RadarClientes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IRadarClientes dao)
        : base(factory, dao, "RadarClientes")
        {
        }

        public async Task<m.SCV.Interfaces.IRadarCliente> GetDatosCliente(int idCliente)
        {
            var daoRC = Get<d.SCV.Interfaces.IRadarClientes>();
            var retValue = await daoRC.GetDatosCliente(idCliente);

            return retValue;
        }

        public async Task<List<m.SCV.Interfaces.IReporteFallaDetalle>> GetTopFallasCliente(int idCliente)
        {
            var daoRC = Get<d.SCV.Interfaces.IRadarClientes>();
            var retValue = await daoRC.GetTopIncidenciasCliente(idCliente);
            return retValue;
        }

        public async Task<int> SaveRadar(Dictionary<string, object> parametros)
        {
            parametros.Add("Usuario",base.getUserId());
            var daoRC = Get<d.SCV.Interfaces.IRadarClientes>();
            var retValue = await daoRC.SaveRadar(parametros);
            return retValue;
        }
        
        public async Task<List<m.SCV.Interfaces.IRadarCliente>> GetConsultaRadarClientes(Dictionary<string, object> parametros)
        {
            //parametros.Add("Usuario",base.getUserId());
            var daoRC = Get<d.SCV.Interfaces.IRadarClientes>();
            var retValue = await daoRC.GetConsultaRadarClientes(parametros);
            return retValue;
        }

        public async Task<object[]> GetConsultaRadarGeneral(Dictionary<string, object> parametros)
        {
            //parametros.Add("Usuario",base.getUserId());
            var daoRC = Get<d.SCV.Interfaces.IRadarClientes>();
            var retValue = await daoRC.GetConsultaRadarGeneral(parametros);
            return retValue;
        }
        //========================== COMUNIDAD ====================================
        //=========================================================================
        public async Task<object[]> GetDatosFraccionamiento(Dictionary<string, object> parametros)
        {
            //parametros.Add("Usuario",base.getUserId());
            var daoRC = Get<d.SCV.Interfaces.IRadarClientes>();
            var retValue = await daoRC.GetDatosFraccionamiento(parametros);
            return retValue;
        }

        public async Task<int> SaveRadarComunidad(Dictionary<string, object> parametros)
        {
            parametros.Add("Usuario", base.getUserId());
            var daoRC = Get<d.SCV.Interfaces.IRadarClientes>();
            var retValue = await daoRC.SaveRadarComunidad(parametros);
            return retValue;
        }

        public async Task<object[]> GetConsultaRadarComunidad(Dictionary<string, object> parametros)
        {
            //parametros.Add("Usuario",base.getUserId());
            var daoRC = Get<d.SCV.Interfaces.IRadarClientes>();
            var retValue = await daoRC.GetConsultaRadarComunidad(parametros);
            return retValue;
        }

        public async Task<object[]> GetConsultaRadarcomunidadGeneral(Dictionary<string, object> parametros)
        {
            //parametros.Add("Usuario",base.getUserId());
            var daoRC = Get<d.SCV.Interfaces.IRadarClientes>();
            var retValue = await daoRC.GetConsultaRadarComunidadGeneral(parametros);
            return retValue;
        }
    }
}
