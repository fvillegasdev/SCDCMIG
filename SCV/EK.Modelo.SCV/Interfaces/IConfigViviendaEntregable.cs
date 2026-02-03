using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{

    public interface IConfigViviendaEntregable : IBaseKontrol
    {
        [m.Kontrol.Column()]
        bool seleccionar { get; set; }

        [m.Kontrol.Column()]
        string numcte { get; set; }
        [m.Kontrol.Column()]
        int IdUbicacionVenta { get; set; }

        //[m.Kontrol.Column()]
        //string Cliente { get; set; }

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

        string Fraccionamiento { get; set; }

        [m.Kontrol.Column()]
        string id_num_smza { get; set; }
         
        [m.Kontrol.Column()]
        string AgenteVentas { get; set; }

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
        string descripcion { get; set; }

        [m.Kontrol.Column()]
        string Financiamiento { get; set; }

        [m.Kontrol.Column()]
        string subsidio { get; set; }

        [m.Kontrol.Column()]
        string etapa { get; set; }

        [m.Kontrol.Column()]
        bool hipoteca_verde { get; set; }

        [m.Kontrol.Column()]
        bool Ecocasa { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_etapa { get; set; }

        [m.Kontrol.Column()]
        DateTime Firma_Escritura { get; set; }
        
        [m.Kontrol.Column()]
        DateTime FechaFirma { get; set; }

        [m.Kontrol.Column()]
        DateTime Libera_Titulacion { get; set; }

        [m.Kontrol.Column()]
        DateTime? fecha_construccion { get; set; }

        [m.Kontrol.Column()]
        DateTime? fecha_liberacion { get; set; }

        [m.Kontrol.Column()]
        string Detalles { get; set; }

        [m.Kontrol.Column()]
        string bit_revisado { get; set; }

        [m.Kontrol.Column()]
        DateTime? fecha_programacion { get; set; }

        [m.Kontrol.Column()]
        DateTime? fecha_entrega { get; set; }

        [m.Kontrol.Column()]
        string bit_detalles { get; set; }

        [m.Kontrol.Column()]
        bool pendiente_pago { get; set; }

        [m.Kontrol.Column()]
        DateTime fec_pendiente_pago { get; set; }

        [m.Kontrol.Column()]
        bool pago { get; set; }

        [m.Kontrol.Column()]
        DateTime? fec_pago { get; set; }

        [m.Kontrol.Column()]
        string clave_rezago { get; set; }

        [m.Kontrol.Column()]
        DateTime? fecha_reprogramacion { get; set; }

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
        DateTime? Fec_Entrega { get; set; }

        [m.Kontrol.Column()]
        string Estatus { get; set; }

        [m.Kontrol.Column()]
        string entregado { get; set; }

        [m.Kontrol.Column()]
        DateTime? Fec_Construccion { get; set; }

        [m.Kontrol.Column()]
        DateTime Fec_Programacion { get; set; }

        [m.Kontrol.Column()]
        string status_lote { get; set; }

        [m.Kontrol.Column()]
        bool monto_seguro { get; set; }

        [m.Kontrol.Column()]
        int IdAgendaFechaConst { get; set; }

        [m.Kontrol.Column()]
        int IdAgendaEntVivienda { get; set; }

        [m.Kontrol.Column()]
        string Personaentregavivienda { get; set; }

        [m.Kontrol.Column()]
        int IdAgenda { get; set; }

        [m.Kontrol.Column()]
        Boolean VisualizarCheckImpresion { get; set; }

        List<IPreparacionVivienda> ImpresionDocs { get; set; }
        [m.Kontrol.Column()]
        string ProcesoImpresion { get; set; }

        [m.Kontrol.Column()]
        int CantidadDocImpresos { get; set; }

        [m.Kontrol.Column()]
        int CantidadPendientesPorReparar { get; set; }


        [m.Kontrol.Column()]
        int IdEstatusAgendaConstruccion { get; set; }
        EK.Modelo.Kontrol.ItemGeneral EstatusAgendaConstruccion { get; set; }


        [m.Kontrol.Column()]
        int IdEstatusAgendaEntrega { get; set; }
        EK.Modelo.Kontrol.ItemGeneral EstatusAgendaEntrega { get; set; }

        EK.Modelo.Kontrol.ItemGeneral TipoAgenda { get; set; }
        [m.Kontrol.Column()]
        string Geolocalizacion { get; set; }
        m.Kontrol.Interfaces.IKontrolFile FileReference { get; set; }
        [m.Kontrol.Column()]
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
        string edificio { get; set; }
        string nivel { get; set; }
    }
}