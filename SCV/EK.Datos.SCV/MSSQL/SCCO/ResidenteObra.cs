using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCCO.MSSQL
{
    public class ResidenteObra
        : d.Kontrol.DAOBaseGeneric<m.SCCO.Interfaces.IResidenteObra>, d.SCCO.Interfaces.IResidenteObra

    {
        private const string USP_SCCO_RESIDENTESOBRAS_SELECT = "usp_scco_ResidentesObras_select";

        public ResidenteObra(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCCO_RESIDENTESOBRAS_SELECT,
                  string.Empty,
                  "scco_ResidentesObras")
        {}
    }
}
