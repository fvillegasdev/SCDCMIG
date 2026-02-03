using System.Data;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace EK.Datos.SCV.MSSQL
{
    public class UbicacionesEstatus
        : dk.DAOBaseGeneric<m.IUbicacionEstatus>, d.IUbicacionesEstatus
    {

        private const string ENTITY_NAME = "scv_ubicacionesEstatus";
        private const string USP_SCV_UBICACIONES_SELECT = "usp_scv_ubicacionesEstatus";

        public UbicacionesEstatus(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_UBICACIONES_SELECT, null, ENTITY_NAME)
        {

        }


    }
}
