using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo.Kontrol.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.Kontrol.MSSQL
{
    public class BitacoraEventos
        : dk.DAOBaseGeneric<m.IBitacoraEventos>, d.IBitacoraEventos
    {
        private const string ENTITY_NAME = "BitacoraEventos";
        private const string USP_SCV_BITACORA_SELECT = "usp_Bitacora_Eventos";

        public BitacoraEventos(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_BITACORA_SELECT, null, ENTITY_NAME)
        { }
    }
}