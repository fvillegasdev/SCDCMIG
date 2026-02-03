//using System;
//using System.Collections.Generic;
//using System.Dynamic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using m = EK.Modelo;
//using d = EK.Datos;
//using p = EK.Procesos;
//using EK.Modelo.SCV.Interfaces;

//namespace EK.Procesos.SCV
//{
//    public class ExpedientesDashBoard
//        : p.Kontrol.BPBase<m.SCV.Interfaces.IDashBoardExpedienteIndicador, d.SCV.Interfaces.IDashBoardExpedientes>,
//        p.SCV.Interfaces.IDashBoardExpedientes
//    {
//        public ExpedientesDashBoard(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IDashBoardExpedientes dao)
//            : base(factory, dao, "expedientesDashBoard")
//        {
//        }


//        public async Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetEstados(Dictionary<string, object> parametros)
//        {
//            //var parametros = new Dictionary<string, object>() {
//            //    { "IdEntidad", "" },
//            //    { "ClaveEntidad", "P" }
//            //};


//            return await this.dao.GetAll(parametros);
//        }

//        public Task<List<IDashBoardExpedienteIndicador>> GetEtapasDashBoard(Dictionary<string, object> parametros)
//        {
//            throw new NotImplementedException();
//        }

//        public async Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetFases(Dictionary<string, object> parametros)
//        {
//            //var parametros = new Dictionary<string, object>() {
//            //    { "IdEntidad", "" },
//            //    { "ClaveEntidad", "P" }
//            //};


//            return await this.dao.GetAll(parametros);
//        }

//        public async Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetTopGraficaEtapas(Dictionary<string, object> parametros)
//        {
//            //var parametros = new Dictionary<string, object>() {
//            //    { "IdEntidad", "" },
//            //    { "ClaveEntidad", "P" }
//            //};


//            return await this.dao.GetAll(parametros);
//        }
//        public async Task<List<m.SCV.Interfaces.IDashBoardExpedienteIndicador>> GetTopGraficaDesarrollos(Dictionary<string, object> parametros)
//        {
//            //var parametros = new Dictionary<string, object>() {
//            //    { "IdEntidad", "" },
//            //    { "ClaveEntidad", "P" }
//            //};


//            return await this.dao.GetAll(parametros);
//        }
//    }
//}