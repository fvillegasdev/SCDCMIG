using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_programacion_entrega")]
    public interface ICapturaFechaConstruccionExcel : IBaseKontrol

    {
        [m.Kontrol.Column()]
        int numcte { get; set; }

        [m.Kontrol.Column()]
        string Cliente { get; set; }

        [m.Kontrol.Column()]
        string Fraccionamiento { get; set; }

        [m.Kontrol.Column("id_num_smza")]
        //string id_num_smza { get; set; }
        string Etapa { get; set; }

        [m.Kontrol.Column("id_num_mza")]
        //string id_num_mza { get; set; }
        string Manzana { get; set; }

        [m.Kontrol.Column("id_num_lote")]
        //string id_num_lote { get; set; }
        string Lote { get; set; }

        [m.Kontrol.Column("id_num_interior")]
        //string id_num_interior { get; set; }
        string NumeroInterior { get; set; }

        [m.Kontrol.Column("id_num_exterior")]
        //string id_num_exterior { get; set; }
        string NumeroExterior { get; set; }

        [m.Kontrol.Column("Calle")]
        string Calle { get; set; }

        [m.Kontrol.Column("Contratista")]
        string Contratista { get; set; }

        [m.Kontrol.Column("desc_segm")]
        //string desc_segm { get; set; }
        string SegmentoVivienda { get; set; }

        [m.Kontrol.Column("firma_escritura")]
        //DateTime firma_escritura { get; set; }
        DateTime FechaEscrituracion { get; set; }
        DateTime HoraEscrituracion { get; set; }

        [m.Kontrol.Column("fec_liberacion")]
        //DateTime? fec_liberacion { get; set; }
        DateTime? FechaLiberacion { get; set; }

        [m.Kontrol.Column("DiasSinFecha")]
        //int DiasSinFecha { get; set; }
        int DesdeLiberacion { get; set; }

        [m.Kontrol.Column("fecha_construccion")]
        //DateTime? fecha_construccion { get; set; }
        DateTime? FechaConstruccion { get; set; }

        [m.Kontrol.Column("Detalles_construccion")]
        //string Detalles_construccion { get; set; }
        string DetallesConstruccion { get; set; }

        [m.Kontrol.Column("fecha_entrega")]
        //DateTime? fecha_entrega { get; set; }
        DateTime? FechaEntrega { get; set; }
        DateTime? HoraEntrega { get; set; }

        [m.Kontrol.Column("indicador_detalle")]
        //string indicador_detalle { get; set; }
        string MotivoReprogramacion { get; set; }

        [m.Kontrol.Column("fecha_reprogramacion")]
        //DateTime? fecha_reprogramacion { get; set; }
        DateTime? FechaReprogramacion { get; set; }

        [m.Kontrol.Column("Personaentregavivienda")]
        //string Personaentregavivienda { get; set; }
        string PersonaEntregaVivienda { get; set; }

        [m.Kontrol.Column("pendiente_pago")]
        //bool pendiente_pago { get; set; }
        bool PendienteDePago { get; set; }

        [m.Kontrol.Column("fec_pendiente_pago")]
        //DateTime fec_pendiente_pago { get; set; }
        DateTime FPendienteDePago { get; set; }

        [m.Kontrol.Column("pago")]
        //bool pago { get; set; }
        bool Pagado { get; set; }

        [m.Kontrol.Column("fec_pago")]
        //DateTime? fec_pago { get; set; }
        DateTime? FDePago { get; set; }

        [m.Kontrol.Column("dir_email")]
        //string dir_email { get; set; }
        string Email { get; set; }

        [m.Kontrol.Column("CURP")]
        string CURP { get; set; }

        [m.Kontrol.Column("RFC")]
        string RFC { get; set; }

        [m.Kontrol.Column("Celular")]
        string Celular { get; set; }

        [m.Kontrol.Column("tel_casa")]
        //string tel_casa { get; set; }
        string Telefono { get; set; }

        [m.Kontrol.Column("tel_oficina")]
        //string tel_oficina { get; set; }
        string TelOficina { get; set; }





        /*
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
        string nom_fracc { get; set; }

        [m.Kontrol.Column("id_num_mza")]
        //string id_num_mza { get; set; }
        string Manzana { get; set; }

        [m.Kontrol.Column("id_num_lote")]
        //string id_num_lote { get; set; }
        string Lote { get; set; }

        [m.Kontrol.Column()]
        string clave_tipo_vivienda { get; set; }

        [m.Kontrol.Column("desc_segm")]
        //string desc_segm { get; set; }
        string SegmentoVivienda { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_programacion { get; set; }

        

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
        int IdAgenda { get; set; }

        

        [m.Kontrol.Column()]
        int DiasDesdeEntrega { get; set; }
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

        */

    }
}
