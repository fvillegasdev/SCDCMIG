using diSCP = EK.Datos.SCP.Interfaces;
using miKontrol = EK.Modelo.Kontrol.Interfaces;
using pKontrol = EK.Procesos.Kontrol;

namespace EK.Procesos.SCP
{
    public partial class Proveedores : pKontrol.ProcesoBase, Interfaces.IProveedores
    {
        private diSCP.IProveedor dao;

        public Proveedores(miKontrol.IContainerFactory factory, diSCP.IProveedor dao)
             : base(factory)
        {
            this.factory = factory;
            this.dao = dao;
        }
    }
}