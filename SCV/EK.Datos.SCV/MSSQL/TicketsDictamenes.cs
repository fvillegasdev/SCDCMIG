using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class TicketsDictamenes
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITicketDictamen>, d.SCV.Interfaces.ITicketsDictamenes
    {
        private const string USP_SPV_REPORTE_DICTAMEN_SELECT = "usp_spv_Dictamen_select";
        public TicketsDictamenes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_REPORTE_DICTAMEN_SELECT, null, "spv_Dictamen")
        { }
    }
}