using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using datKontrol = EK.Datos.Kontrol.Interfaces;
using datSCV = EK.Datos.SCV.Interfaces;
using modelKontrol = EK.Modelo.Kontrol.Interfaces;
using modelSCV = EK.Modelo.SCV.Interfaces;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class RangosIngresos 
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IRangoIngresos>, d.SCV.Interfaces.IRangosIngresos
    {
        private const string ENTITY_NAME = "scv_rangosIngresos";
        private const string USP_RANGOSINGRESOS_SELECT = "usp_rangosingresos_select";

        public RangosIngresos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_RANGOSINGRESOS_SELECT, null, ENTITY_NAME)
        { }
        
    }
}