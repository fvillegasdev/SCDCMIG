#if BASE

using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scco_Contratistas")]
    public interface IContratista : m.Kontrol.Interfaces.IBaseKontrol
    {


        [m.Kontrol.Column("RFC")]
        string RFC { get; set; }


        [m.Kontrol.Column("IdTipoConvenio")]
        int IdTipoConvenio { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoConvenio { get; set; }
        

        [m.Kontrol.Column("Representante")]
        string Representante { get; set; }


        [m.Kontrol.Column("NSS")]
        string NSS { get; set; }

        [m.Kontrol.Column("Direccion")]
        string Direccion { get; set; }

        [m.Kontrol.Column("IdAsentamiento")]
        int? IdAsentamiento { get; set; }
        m.Kontrol.Interfaces.IAsentamiento Asentamiento { get; set; }

        [m.Kontrol.Column("IdProveedor")]
        int IdProveedor { get; set; }

        m.SCP.Interfaces.IProveedor Proveedor { get; set; }

        [m.Kontrol.Column()]
        int? IdRegimen { get; set; }
        m.SCV.Interfaces.IRegimen Regimen { get; set; }
    }
}
#endif