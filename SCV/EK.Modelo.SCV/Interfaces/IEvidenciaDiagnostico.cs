using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_evidencias")]
    public interface IEvidenciaDiagnostico : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Id")]
        int? Id { get; set; }

        [m.Kontrol.Column("Folio")]
        int Folio { get; set; }

        [m.Kontrol.Column("Diagnostico")]
        int Diagnostico { get; set; }

        [m.Kontrol.Column("OrdenTrabajo")]
        int OrdenTrabajo { get; set; }

        [m.Kontrol.Column("IdPartida")]
        int IdPartida { get; set; }

        [m.Kontrol.Column("NoPartida")]
        int NoPartida { get; set; }

        [m.Kontrol.Column("Comentarios")]
        string Comentarios { get; set; }

        [m.Kontrol.Column("Imagen")]
        string Imagen { get; set; }

        [m.Kontrol.Column("Prefijo")]
        string Prefijo { get; set; }

        [m.Kontrol.Column("TipoEvidencia")]
        string TipoEvidencia { get; set; }

        string b64Img { get; set; }

        [m.Kontrol.Column("ind_archivo")]
        bool ind_archivo { get; set; }
    }
}
