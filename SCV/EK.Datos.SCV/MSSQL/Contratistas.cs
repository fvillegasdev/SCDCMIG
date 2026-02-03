using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Contratistas
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IContratista>, d.SCV.Interfaces.IContratistas
    {
        private const string USP_SCCO_CONTRATISTAS_SELECT = "usp_scco_Contratistas_select";
     

        public Contratistas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_CONTRATISTAS_SELECT, null, "scco_Contratistas")
        { }

        public Task<List<IAgendaContratistaDetalle>> GetOrdenesTrabajo(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }

        public Task<List<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>> GetOrdenesTrabajoAreasComunes(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
    }
}