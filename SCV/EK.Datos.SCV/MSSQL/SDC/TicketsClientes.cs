using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SDC.Interfaces;
using m = EK.Modelo.SDC.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SDC.MSSQL
{
    public class TicketsClientes
        : dk.DAOBaseGeneric<m.ITicketCliente>, d.ITicketsClientes
    {
        private const string ENTITY_NAME = "TicketsClientes";
        private const string USP_SCV_BASE_SELECT = "usp_sdc_ticketsclientes_select";

        public TicketsClientes(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_BASE_SELECT, null, ENTITY_NAME)
        { }


     
    }
}