using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

using miSCV = EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using EK.Datos.SCV.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class TipoFinanciamientoInstitucion
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITipoFinanciamientoInstitucion>, d.SCV.Interfaces.ITipoFinanciamientoInstitucion
    {
        private const string USP_SCV_TF_INSTITUCIONES_SELECT = "usp_scv_TF_Instituciones_select";

        public TipoFinanciamientoInstitucion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
         : base(factory, helper, USP_SCV_TF_INSTITUCIONES_SELECT, null, "scv_TipoFinanciamiento_Instituciones") { }

    }

}