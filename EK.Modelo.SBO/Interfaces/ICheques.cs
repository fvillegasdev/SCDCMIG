using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SBO.Interfaces
{
    public interface ICheques:IBaseKontrol
    {
        int Cuenta { get; set; }
        int Numero { get; set; }
        int TipoCheque { get; set; }
        int Descripcion { get; set; }
        int IdCentroCosto { get; set; }
        int CentroCosto { get; set; }
        int Monto { get; set; }
        int IdTipoMovimiento { get; set; }
        int ClaveStatusBanco { get; set; }
        IItemGeneral StatusBanco { get; set; }
        IItemGeneral TipoMovimiento { get; set; }

    }
}
