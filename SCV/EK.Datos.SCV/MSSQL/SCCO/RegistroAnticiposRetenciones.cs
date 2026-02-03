using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCCO.MSSQL
{
    public class RegistroAnticiposRetenciones : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IRegistroAnticipoRetencion>, d.SCCO.Interfaces.IRegistroAnticiposRetenciones
    { 
        private const string USP_SCCO_RegistroAnticipoRetencion_SELECT = "usp_scco_Registro_AnticiposRetenciones_select";
        public RegistroAnticiposRetenciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCCO_RegistroAnticipoRetencion_SELECT, null, "scco_Registro_AnticiposRetenciones")
        { }
    }
}