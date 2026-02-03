using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sm_bitacora_procesos")]
    public interface IBitacoraProcesoSPV
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("id_proceso")]
        int IdProceso { get; set; }

        [m.Kontrol.Column("folio")]
        string IdFolio { get; set; }

        [m.Kontrol.Column("ref_proceso")]
        int? IdReferencia { get; set; }

        [m.Kontrol.Column("numcte")]
        int? IdCliente { get; set; }

        [m.Kontrol.Column("observaciones")]
        string Observaciones { get; set; }

        [m.Kontrol.Column("empleado")]
        int? IdAgente { get; set; }

        [m.Kontrol.Column("usuario")]
        int? IdUsuario { get; set; }

        string FechaProceso { get; set; }

        string TagWin { get; set; }
    }
}