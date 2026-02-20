using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class SPVFraccionamientosCAT
                 : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ISmFraccionamiento>, d.SCV.Interfaces.ISmFraccionamiento

    {
        private const string USP_SPV_BASE_SELECT = "usp_spv_coordinadores_select";
        private const string USP_SPV_CAT_SELECT = "usp_spv_cats_select";
        private const string USP_SPV_SUPERV_COORD_SELECT = "usp_spv_superv_coord_select";
        private const string USP_SPV_CAT_FRACC_SELECT = "usp_spv_cat_fracc_select";
        private const string USP_SPV_RESPONSABLES_CONSTRUCCION_SELECT = "usp_spv_ResponsablesConstruccion_select";
    }
}
