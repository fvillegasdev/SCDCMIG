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
    public class PaquetesUbicaciones
        : dk.DAOBaseGeneric<m.IPaqueteUbicaciones>, d.IPaqueteUbicaciones
    {
        private const string ENTITY_NAME = "scv_PaquetesUbicaciones";
        private const string USP_SCV_PAQUETESUBICACIONES_SELECT = "usp_scv_PaquetesUbicaciones_select";

        public PaquetesUbicaciones(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_PAQUETESUBICACIONES_SELECT, null, ENTITY_NAME)
        { }
    }
}