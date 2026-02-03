using System;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IConsultaViviendaDetallesCitaAgendaResult : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdAgenda { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaInicio { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaFin { get; set; }

        [m.Kontrol.Column()]
        string Descripcion { get; set; }

        [m.Kontrol.Column()]
        string Geolocalizacion { get; set; }

        [m.Kontrol.Column()]
        int IdLocalidad { get; set; }

        [m.Kontrol.Column()]
        int IdEstatusAgenda { get; set; }
        EK.Modelo.Kontrol.ItemGeneral EstatusAgenda { get; set; }

        [m.Kontrol.Column()]
        int IdUsuarioAsignado { get; set; }

        [m.Kontrol.Column()]
        string seleccionar { get; set; }

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
        string num_ext { get; set; }

        [m.Kontrol.Column()]
        string prototipo { get; set; }

        [m.Kontrol.Column()]
        string desc_tipo_vivienda { get; set; }

        [m.Kontrol.Column()]
        string Financiamiento { get; set; }

        [m.Kontrol.Column()]
        string subsidio { get; set; }

        [m.Kontrol.Column()]
        string etapa { get; set; }

        [m.Kontrol.Column()]
        string hipoteca_verde { get; set; }

        [m.Kontrol.Column()]
        string Ecocasa { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_etapa { get; set; }

        [m.Kontrol.Column()]
        DateTime Firma_Escritura { get; set; }

        [m.Kontrol.Column()]
        DateTime Libera_Titulacion { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_construccion { get; set; }

        [m.Kontrol.Column()]
        string Detalles { get; set; }

        [m.Kontrol.Column()]
        string bit_revisado { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_programacion { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_entrega { get; set; }

        [m.Kontrol.Column()]
        string bit_detalles { get; set; }

        [m.Kontrol.Column()]
        string pendiente_pago { get; set; }

        [m.Kontrol.Column()]
        DateTime fec_pendiente_pago { get; set; }

        [m.Kontrol.Column()]
        string pago { get; set; }

        [m.Kontrol.Column()]
        DateTime fec_pago { get; set; }

        [m.Kontrol.Column()]
        string clave_rezago { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_reprogramacion { get; set; }

        [m.Kontrol.Column()]
        string observaciones { get; set; }

        [m.Kontrol.Column()]
        string Desde_Liberacion { get; set; }

        [m.Kontrol.Column()]
        string Desde_Construccion { get; set; }

        [m.Kontrol.Column()]
        DateTime fec_entrega_calidad { get; set; }

        [m.Kontrol.Column()]
        string id_identificador { get; set; }

        [m.Kontrol.Column()]
        string clave_tipo_vivienda { get; set; }

        [m.Kontrol.Column()]
        string lote_id { get; set; }

        [m.Kontrol.Column()]
        string doctos_impresos { get; set; }

        [m.Kontrol.Column()]
        string num_entrega_viv { get; set; }

        [m.Kontrol.Column()]
        string lugar_hora_entrega { get; set; }

        [m.Kontrol.Column()]
        string folio { get; set; }

        [m.Kontrol.Column()]
        DateTime Fec_Entrega { get; set; }

        [m.Kontrol.Column()]
        string Estatus { get; set; }

        [m.Kontrol.Column()]
        string entregado { get; set; }

        [m.Kontrol.Column()]
        DateTime Fec_Construccion { get; set; }

        [m.Kontrol.Column()]
        DateTime Fec_Programacion { get; set; }

        [m.Kontrol.Column()]
        string status_lote { get; set; }

        [m.Kontrol.Column()]
        string monto_seguro { get; set; }

        [m.Kontrol.Column()]
        string NombreContratista { get; set; }

        [m.Kontrol.Column()]
        string NomPersonaEntregaViv { get; set; }

        [m.Kontrol.Column()]
        string vale_mueble { get; set; }

        [m.Kontrol.Column()]
        Boolean ItemCalendario { get; set; }

        [m.Kontrol.Column()]
        string Localidad { get; set; }

        EK.Modelo.Kontrol.ItemGeneral TipoAgenda { get; set; }

        [m.Kontrol.Column()]
        int CantidadDocImpresos { get; set; }

        [m.Kontrol.Column()]
        int CantidadPendientesPorReparar { get; set; }

        int? IdMotivo { get; set; }
        m.SCV.Interfaces.IMotivosCancelacionPV Motivo { get; set; }
    }
}