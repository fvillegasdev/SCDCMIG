using EK.Modelo.Kontrol;
using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    [Table("sdc_dc_comite_reuniones")]
    public interface IAgendaReuniones: IBaseKontrol
    {
        int IdComite { get; set; }
        [Column("Comite", true)]
        string Comite { get; set; }
        int IdTipo { get; set; }
        [Column("IdPlaza", true)]
        string IdPlaza { get; set; }
        [Column("IdFraccionamiento", true)]
        string IdFraccionamiento { get; set; }
        [Column("IdSegmento", true)]
        int IdSegmento { get; set; }
        [Column("Plaza", true)]
        string Plaza { get; set; }
        [Column("SegmentoNombre", true)]
        string SegmentoNombre { get; set; }
        [Column("Fraccionamiento", true)]
        string Fraccionamiento { get; set; }
        [Column("Dias", true)]
        int Dias { get; set; }
        [Column("TipoReunion", true)]
        string TipoReunion { get; set; }
        DateTime? FechaReunion { get; set; }
        [Column("BackgroundStatus", true)]
        string BackgroundStatus { get; set; }
        [Column("Realizada", true)]
        bool Realizada { get; set; }
        [Column("Realizada", true)]
        string RealizadaName { get; set; }
    }
}
