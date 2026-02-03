using diSCP = EK.Datos.SCP.Interfaces;
using dKontrol = EK.Datos.Kontrol;
using mKontrol = EK.Modelo.Kontrol;

namespace EK.Datos.SCP.MSSQL
{
    public partial class Proveedor 
        : diSCP.IProveedor
    {
        private const string USP_PROVEEDORES_SELECT = "usp_proveedores_select";
        private dKontrol.Interfaces.IDBHelper helper;

        public Proveedor(mKontrol.Interfaces.IContainerFactory factory, dKontrol.Interfaces.IDBHelper helper)
        {
            this.helper = new dKontrol.MSSQL.DBHelper(factory);
        }
    }
}