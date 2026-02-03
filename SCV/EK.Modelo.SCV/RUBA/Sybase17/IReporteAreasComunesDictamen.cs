using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_reporte_areas_comunes_dictamen")]
    public interface IReporteAreasComunesDictamen
    : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("idDictamen")]
        int IdDictamen { get; set; }

        [m.Kontrol.Column("folio")]
        int IdReporte { get; set; }

        [m.Kontrol.Column("IdReporteDetalle")]
        int IdReporteDetalle { get; set; }
        m.SCV.Interfaces.IReporteFallasAreasComunesPartida Partida { get; set; }

        [m.Kontrol.Column("IdPartidas")]
        string IdPartidas { get; set; }

        [m.Kontrol.Column("rutaDocumento")]
        string RutaDocumento { get; set; }

        [m.Kontrol.Column("descripcionDictamen")]
        string Descripcion { get; set; }

        [m.Kontrol.Column("estatusDictamen")]
        string EstatusDictamenValue { get; set; }

        [m.Kontrol.Column("IdEstatusDictamen")]
        int IdEstatusDictamen { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusDictamen { get; set; }

        [m.Kontrol.Column("fechaDictamen")]
        DateTime? FechaDictamen { get; set; }

        [m.Kontrol.Column("usuarioCaptura")]
        int? IdUsuarioCaptura { get; set; }
        m.Kontrol.Interfaces.IUsuario UsuarioCaptura { get; set; }

        [m.Kontrol.Column("activo")]
        bool Activo { get; set; }


        [m.Kontrol.Column("IdResponsableDictamen")]
        int? IdResponsableDictamen { get; set; }
        m.Kontrol.Interfaces.IUsuario ResponsableDictamen { get; set; }

        [m.Kontrol.Column("IdAgenda")]
        int? IdAgenda { get; set; }

        [m.Kontrol.Column("IdPlaza", true)]
        string IdPlaza { get; set; }
        [m.Kontrol.Column("IdCliente", true)]
        int IdCliente { get; set; }

        bool? CerrarRegistro { get; set; }

        m.Kontrol.Interfaces.IAgenda Agenda { get; set; }

        m.Kontrol.Interfaces.IAgendaEntVivienda AgendaDetalle { get; set; }
    }
}
