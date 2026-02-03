using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class AnticiposDeducciones : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IAnticiposDeducciones>, d.SCCO.Interfaces.IAnticiposDeducciones
    {
        private const string USP_SCCO_AnticiposDeducciones_SELECT = "usp_scco_AnticiposDeducciones_select";
        public AnticiposDeducciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_AnticiposDeducciones_SELECT, null, "scco_AnticiposDeducciones")
        { }
    }
}