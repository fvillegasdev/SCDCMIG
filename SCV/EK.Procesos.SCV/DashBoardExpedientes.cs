using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class DashBoardExpedientes
        : p.Kontrol.BPBase<m.SCV.Interfaces.IDashBoardExpedienteIndicador, d.SCV.Interfaces.IDashBoardExpedientes>,
        p.SCV.Interfaces.IDashBoardExpedientes
    {
        public DashBoardExpedientes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IDashBoardExpedientes dao)
            : base(factory, dao, "dashBoardExpedientes")
        {
        }

        public async Task<object> GetDashboard(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }
            //
            object retValue = null;
            int idUser = 0;
            if (parametros.ContainsKey("IdAgente"))
            {
                idUser = Convert.ToInt32(parametros["IdAgente"]);
                parametros.Remove("IdAgente");
            }
            else
            {
                idUser = base.getUserId();
            }

            if (!parametros.ContainsKey("IdUsuario"))
            {
                parametros.Add("idUsuario", idUser);
            }
            //
            parametros.Add("operacion", "*");
            //parametros.Add("json", 1);
            //
            retValue = await this.dao.GetDashboardInfo(parametros);
            //
            return retValue;
        }

        public async Task<object> GetDashboardEtapas(Dictionary<string, object> parametros)
        {
            if (parametros == null) {
                parametros = new Dictionary<string, object>();
            }
            //
            object retValue = null;
            int idUser = 0;
            if (parametros.ContainsKey("IdAgente"))
            {
                idUser = Convert.ToInt32(parametros["IdAgente"]);
                parametros.Remove("IdAgente");
            }
            else
            {
                idUser = base.getUserId();
            }

            if(!parametros.ContainsKey("IdUsuario"))
            {
                parametros.Add("idUsuario", idUser);
            }

            parametros.Add("operacion", "etapas");
            //
            retValue = await this.dao.GetDashboardInfo(parametros);
            //
            return retValue;
        }
        public async Task<object> GetDashboardMap(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }
            //
            object retValue = null;
            int idUser = 0;
            if (parametros.ContainsKey("IdAgente"))
            {
                idUser = Convert.ToInt32(parametros["IdAgente"]);
                parametros.Remove("IdAgente");
            }
            else
            {
                idUser = base.getUserId();
            }
            parametros.Add("idUsuario", idUser);
            parametros.Add("operacion", "geolocalizacion");
            //
            retValue = await this.dao.GetDashboardInfo(parametros);
            //
            return retValue;
        }

        public async Task<object> GetDashboardFases(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }
            //
            object retValue = null;
            int idUser = 0;
            if (parametros.ContainsKey("IdAgente"))
            {
                idUser = Convert.ToInt32(parametros["IdAgente"]);
                parametros.Remove("IdAgente");
            }
            else
            {
                idUser = base.getUserId();
            }
            parametros.Add("idUsuario", idUser);
            parametros.Add("operacion", "fases");
            //
            retValue = await this.dao.GetDashboardInfo(parametros);
            //
            return retValue;
        }

        public async Task<object> GetDashboardExpedientes(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }
            //
            object retValue = null;
            int idUser = 0;
            if (parametros.ContainsKey("IdAgente"))
            {
                idUser = Convert.ToInt32(parametros["IdAgente"]);
                parametros.Remove("IdAgente");
            }
            else
            {
                idUser = base.getUserId();
            }
            parametros.Add("idUsuario", idUser);
            parametros.Add("operacion", "expedientes");
            //
            retValue = await this.dao.GetDashboardInfo(parametros);
            //
            return retValue;
        }

        public async Task<object> GetDashboardClientes(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }
            //
            object retValue = null;
            int idUser = 0;
            if (parametros.ContainsKey("IdAgente"))
            {
                idUser = Convert.ToInt32(parametros["IdAgente"]);
                parametros.Remove("IdAgente");
            }
            else
            {
                idUser = base.getUserId();
            }
            parametros.Add("idUsuario", idUser);
            parametros.Add("operacion", "clientes");
            //
            retValue = await this.dao.GetDashboardInfo(parametros);
            //
            return retValue;
        }

        public override Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetAll(Dictionary<string, object> parametros)
        {
            parametros.Add("operacion", "CONSULTA_FASES_EXPEDIENTE");
            parametros.Add("ModificadoPor", base.getUserId());
            return base.GetAll(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetEtapasDashBoard(Dictionary<string, object> parametros)
        {
            parametros.Add("operacion", "DASHBOARD-TOTAL-ETAPAS");
            parametros.Add("ModificadoPor", base.getUserId());
            return await this.dao.GetAll(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetEstados(Dictionary<string, object> parametros)
        {
            parametros.Add("operacion", "DASHBOARD-TOTAL-ESTADOS");
            parametros.Add("ModificadoPor", base.getUserId());
            return await this.dao.GetAll(parametros);
        }
        public async Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetFases(Dictionary<string, object> parametros)
        {
            parametros.Add("operacion", "DASHBOARD-TOTAL-FASES");
            parametros.Add("ModificadoPor", base.getUserId());
            return await this.dao.GetAll(parametros);
        }
        public async Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetTopGraficaEtapas(Dictionary<string, object> parametros)
        {
            parametros.Add("operacion", "DASHBOARD-GRAFICA-TOP-ETAPAS");
            parametros.Add("ModificadoPor", base.getUserId());
            return await this.dao.GetAll(parametros);
        }
        public async Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetTopGraficaDesarrollos(Dictionary<string, object> parametros)
        {
            parametros.Add("operacion", "DASHBOARD-GRAFICA-TOP-DESARROLLOS");
            parametros.Add("ModificadoPor", base.getUserId());
            return await this.dao.GetAll(parametros);
        }



        #region "EXPEDIENETES DOCUMENTOS"
        public async Task<object> GetDashboardDocumentosFases(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }
            //
            object retValue = null;
            int idUser = 0;
            if (parametros.ContainsKey("IdAgente"))
            {
                idUser = Convert.ToInt32(parametros["IdAgente"]);
                parametros.Remove("IdAgente");
            }
            else
            {
                idUser = base.getUserId();
            }
            if (!parametros.ContainsKey("IdUsuario"))
            {
                parametros.Add("idUsuario", idUser);
            }
            parametros.Add("operacion", "fases");
            //
            retValue = await this.dao.GetDasboardDocumentosIndicadores(parametros);
            //
            return retValue;
        }

        public async Task<object> GetDashboardDocumentosEtapas(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }
            //
            object retValue = null;
            int idUser = 0;
            if (parametros.ContainsKey("IdAgente"))
            {
                idUser = Convert.ToInt32(parametros["IdAgente"]);
                parametros.Remove("IdAgente");
            }
            else
            {
                idUser = base.getUserId();
            }
            if (!parametros.ContainsKey("IdUsuario"))
            {
                parametros.Add("idUsuario", idUser);
            }
            parametros.Add("operacion", "etapas");
            //
            retValue = await this.dao.GetDasboardDocumentosIndicadores(parametros);
            //
            return retValue;
        }


        public async Task<object> GetDashboardDocumentosExpedientes(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }
            //
            object retValue = null;
            int idUser = 0;
            if (parametros.ContainsKey("IdAgente"))
            {
                idUser = Convert.ToInt32(parametros["IdAgente"]);
                parametros.Remove("IdAgente");
            }
            else
            {
                idUser = base.getUserId();
            }
            if (!parametros.ContainsKey("IdUsuario"))
            {
                parametros.Add("IdUsuario", idUser);
            }
            parametros.Add("operacion", "expedientes");
            //
            retValue = await this.dao.GetDasboardDocumentosIndicadores(parametros);
            //
            return retValue;
        }
        #endregion


    }
}