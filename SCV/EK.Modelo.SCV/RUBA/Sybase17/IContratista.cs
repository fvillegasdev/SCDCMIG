#if RUBA
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("SU_CONTRATISTAS")]
    public interface IContratista : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("NUMPRO")]
        new int? ID { get; set; }


        [m.Kontrol.Column("Clave",true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("REPRESENTANTE")]
        new string Nombre { get; set; }

        [m.Kontrol.Column("DSCONTRATISTA")]
        string Descripcion { get; set; }

        [m.Kontrol.Column("calificacion",true)]
        decimal? Calificacion { get; set; }

        [m.Kontrol.Column("ESTADO")]
        string EstadoProvincia { get; set; }

        [m.Kontrol.Column("CIUDAD")]
        string Ciudad { get; set; }

        [m.Kontrol.Column("DIRECCION")]
        string Direccion { get; set; }

        [m.Kontrol.Column("REG_IMSS")]
        string RegistroIMSS { get; set; }

        [m.Kontrol.Column("folio",true)]
        decimal? Folio { get; set; }

        [m.Kontrol.Column("correo_electronico")]
        string CorreoElectronico { get; set; }

        [m.Kontrol.Column("ISR")]
        int ISR { get; set; }

        [m.Kontrol.Column("ISR_RETENIDO")]
        int ISR_RETENIDO { get; set; }

        [m.Kontrol.Column("IVA")]
        int IVA { get; set; }

        [m.Kontrol.Column("IVA_RETENIDO")]
        int IVA_RETENIDO { get; set; }

        [m.Kontrol.Column("RFC")]
        string RFC { get; set; }

        //[m.Kontrol.Column("tipo_contrato")]
        //decimal TipoContrato { get; set; }

        m.SCV.Interfaces.ITipoContrato TipoContrato { get; set; }


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