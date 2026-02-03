using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EK.Drivers.Log;
using Newtonsoft.Json;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class ListasMktDet
     : p.Kontrol.BPBase<m.SCV.Interfaces.IListasMktDet, d.SCV.Interfaces.IListasMktDet>, p.SCV.Interfaces.IListasMktDet            
    {
        //private d.SCV.Interfaces.IListasMktDet dao;
        //private const string entityName = "configurarcriterios";

        #region Constructor

        public ListasMktDet(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IListasMktDet dao)
           : base(factory, dao, "scv_ListasMktDet")
        {
        }

        #endregion Constructor

        public async Task<object[]> Get(int idmodulo, int idcompania)
        {
            return await this.dao.Get(idmodulo, idcompania);
        }

        //public m.SCV.Interfaces.IListasMktDet GetById(int id)
        //{
        //    return this.dao.Get(id);
        //}

        public override async Task<object[]> Search(string nombre)
        {
            return await this.dao.Get(nombre);
        }
        

        public async Task<List<m.SCV.Interfaces.IListasMktDet>> getConfiguracionCriterio(Dictionary<string, object> parametros)
        {
            var daoC = Get<Datos.SCV.Interfaces.IListasMktDet>();
            return await daoC.GetAllConfiguracionCriterios(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IListasMktDet>> ConfiguracionCriterios(Dictionary<string, object> parametros)
        {
            var daoC = Get<Datos.SCV.Interfaces.IListasMktDet>();
            return await daoC.ConfiguracionCriterios(parametros);
        }

    }
}