using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class Convenios : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IConvenio>, d.SCCO.Interfaces.IConvenios
    {
        private const string USP_SCCO_CONVENIO_SELECT = "usp_scco_Convenios_select";
        public Convenios(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_CONVENIO_SELECT, null, "scco_Convenios")
        { }
    }
}