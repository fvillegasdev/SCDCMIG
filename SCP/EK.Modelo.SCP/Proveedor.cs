using mKontrol = EK.Modelo.Kontrol;

namespace EK.Modelo.SCP
{
    public class Proveedor 
        : mKontrol.BaseKontrol, Interfaces.IProveedor
    {
        private string nombreCorto;

        public string NombreCorto
        {
            get { return this.nombreCorto; }
            set { this.nombreCorto = value; }
        }
    }
}