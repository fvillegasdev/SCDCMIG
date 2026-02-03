using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_programacion_entrega")]
    public interface ICapturaFechaConstruccion : IBaseKontrol

    {
        [m.Kontrol.Column()]
        string seleccionar { get; set; }

        [m.Kontrol.Column()]
        string id_identificador { get; set; }

        [m.Kontrol.Column()]
        string descripcion { get; set; }

        [m.Kontrol.Column()]
        string numcte { get; set; }

        [m.Kontrol.Column()]
        string nom_cte { get; set; }

        [m.Kontrol.Column()]
        string ap_paterno_cte { get; set; }

        [m.Kontrol.Column()]
        string ap_materno_cte { get; set; }

        [m.Kontrol.Column()]
        string id_cve_fracc { get; set; }

        [m.Kontrol.Column()]
        int IdFraccionamiento { get; set; }

        [m.Kontrol.Column()]
        string Fraccionamiento { get; set; }

        [m.Kontrol.Column()]
        string nom_fracc { get; set; }

        [m.Kontrol.Column()]
        string id_num_smza { get; set; }

        [m.Kontrol.Column()]
        string id_num_mza { get; set; }

        [m.Kontrol.Column()]
        string id_num_lote { get; set; }

        [m.Kontrol.Column()]
        string id_num_interior { get; set; }

        [m.Kontrol.Column()]
        string id_num_exterior { get; set; }

        [m.Kontrol.Column()]
        string clave_tipo_vivienda { get; set; }

        [m.Kontrol.Column()]
        string desc_segm { get; set; }

        [m.Kontrol.Column()]
        DateTime firma_escritura { get; set; }

        [m.Kontrol.Column()]
        DateTime? fec_liberacion { get; set; }

        [m.Kontrol.Column()]
        DateTime? fecha_construccion { get; set; }

        [m.Kontrol.Column()]
        string Detalles_construccion { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_programacion { get; set; }

        [m.Kontrol.Column()]
        DateTime? fecha_entrega { get; set; }

        [m.Kontrol.Column()]
        string indicador_detalle { get; set; }

        [m.Kontrol.Column()]
        DateTime? fecha_reprogramacion { get; set; }

        [m.Kontrol.Column()]
        string num_entrega_viv { get; set; }

        [m.Kontrol.Column()]
        string folio { get; set; }

        [m.Kontrol.Column()]
        string lote_id { get; set; }

        [m.Kontrol.Column()]
        string observaciones { get; set; }

        [m.Kontrol.Column()]
        string Lugar_hora_entrega { get; set; }

        [m.Kontrol.Column()]
        string clave_rezago { get; set; }

        [m.Kontrol.Column()]
        string num_gerente_ventas { get; set; }

        [m.Kontrol.Column()]
        string varias_fechas { get; set; }

        List<IProgramados> Programados { get; set; }

        [m.Kontrol.Column()]
        int IdAgendaFechaConst { get; set; }

        [m.Kontrol.Column()]
        int IdAgendaEntVivienda { get; set; }

        [m.Kontrol.Column()]
        string Personaentregavivienda { get; set; }

        [m.Kontrol.Column()]
        int IdAgenda { get; set; }

        [m.Kontrol.Column()]
        int DiasSinFecha { get; set; }
        [m.Kontrol.Column()]
        int  DiasDesdeEntrega { get; set; }
        [m.Kontrol.Column()]
        int CantReportesFallas { get; set; }

        [m.Kontrol.Column()]
        int IdEstatusAgendaConstruccion { get; set; }
        EK.Modelo.Kontrol.ItemGeneral EstatusAgendaConstruccion { get; set; }
        [m.Kontrol.Column()]
        int IdEstatusAgendaEntrega { get; set; }
        EK.Modelo.Kontrol.ItemGeneral EstatusAgendaEntrega { get; set; }

        [m.Kontrol.Column()]
        string ColorMotivoReprogramacion { get; set; }

        [m.Kontrol.Column()]
        int CantidadPendientesPorReparar { get; set; }
        [m.Kontrol.Column()]
        string bit_revisado { get; set; }

        EK.Modelo.Kontrol.ItemGeneral TipoAgenda { get; set; }

        [m.Kontrol.Column()]
        string Geolocalizacion { get; set; }

        string dir_email { get; set; }
        [m.Kontrol.Column()]
        string CURP { get; set; }
        [m.Kontrol.Column()]
        string RFC { get; set; }
        [m.Kontrol.Column()]
        string tel_casa { get; set; }
        [m.Kontrol.Column()]
        string tel_oficina { get; set; }
        [m.Kontrol.Column()]
        string Celular { get; set; }
        [m.Kontrol.Column()]
        bool pendiente_pago { get; set; }

        [m.Kontrol.Column()]
        DateTime fec_pendiente_pago { get; set; }

        [m.Kontrol.Column()]
        bool pago { get; set; }

        [m.Kontrol.Column()]
        DateTime? fec_pago { get; set; }
        [m.Kontrol.Column()]
        string Calle { get; set; }

        [m.Kontrol.Column()]
        string Contratista { get; set; }
        string edificio { get; set; }
        string nivel { get; set; }
        [m.Kontrol.Column()]
        string ETMZLT { get; set; }
    }
}
