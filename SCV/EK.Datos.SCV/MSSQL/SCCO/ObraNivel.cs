using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCCO.MSSQL {
    public class IObraNivel
        : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IObraNivel>, d.SCCO.Interfaces.IObraNivel {
            private const string USP_SCCO_OBRA_NIVELES_SELECT = "usp_scco_Obra_Niveles_select";
            public IObraNivel (m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper) : base (
                factory,
                helper,
                USP_SCCO_OBRA_NIVELES_SELECT,
                string.Empty,
                "scco_Obra_Niveles") { }
        }
}