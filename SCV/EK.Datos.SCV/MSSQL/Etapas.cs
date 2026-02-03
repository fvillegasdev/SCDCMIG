using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class Etapas 
        : dk.DAOBaseGeneric<m.IEtapa>, d.IEtapas
    {
        private const string ENTITY_NAME = "scv_etapas";
        private const string USP_ETAPAS_SELECT = "usp_scv_etapas_select";
        private const string USP_ETAPAS_INS_UPD = "usp_scv_etapas_ins_upd";

        public Etapas(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_ETAPAS_SELECT,
                  string.Empty,
                  ENTITY_NAME)
        { }

        
    }
}