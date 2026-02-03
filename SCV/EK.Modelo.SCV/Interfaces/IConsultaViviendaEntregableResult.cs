using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{


    public interface IConsultaViviendaEntregableResult : IBaseKontrol
    {
        [m.Kontrol.Column()]
        string numcte { get; set; }

        [m.Kontrol.Column()]
        string ap_paterno_cte { get; set; }

        [m.Kontrol.Column()]
        string ap_materno_cte { get; set; }

        [m.Kontrol.Column()]
        string nom_cte { get; set; }

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
        string id_num_exterior { get; set; }

        [m.Kontrol.Column()]
        string dir_casa { get; set; }

        [m.Kontrol.Column()]
        string hipoteca_verde { get; set; }

        [m.Kontrol.Column()]
        string Ecocasa { get; set; }

        [m.Kontrol.Column()]
        string vale_mueble { get; set; }

        [m.Kontrol.Column()]
        string vale_mueble_desc { get; set; }

        [m.Kontrol.Column()]
        string desc_tipo_vivienda { get; set; }

        [m.Kontrol.Column()]
        string Financiamiento { get; set; }

        [m.Kontrol.Column()]
        string subsidio { get; set; }

        [m.Kontrol.Column()]
        DateTime fec_escritura_fisica { get; set; }

        [m.Kontrol.Column()]
        DateTime fec_liberacion { get; set; }

        [m.Kontrol.Column()]
        string dias_firma_liberacion { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_construccion { get; set; }

        [m.Kontrol.Column()]
        string dias_firma_contruccion { get; set; }

        [m.Kontrol.Column()]
        string Detalles { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_programacion { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_entrega { get; set; }

        [m.Kontrol.Column()]
        string dias_liberacion_entrega { get; set; }

        [m.Kontrol.Column()]
        string rezago_entrega { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_reprogramacion { get; set; }

        [m.Kontrol.Column()]
        DateTime fecha_escrituracion { get; set; }

        [m.Kontrol.Column()]
        string Obs_Cliente { get; set; }

        [m.Kontrol.Column()]
        string pendiente_pago { get; set; }

        [m.Kontrol.Column()]
        DateTime fec_pendiente_pago { get; set; }

        [m.Kontrol.Column()]
        string pago { get; set; }

        [m.Kontrol.Column()]
        DateTime fec_pago { get; set; }

        [m.Kontrol.Column()]
        string tel_casa { get; set; }


        [m.Kontrol.Column()]
        string tel_oficina { get; set; }


        [m.Kontrol.Column()]
        string tel_otros { get; set; }


        [m.Kontrol.Column()]
        string dir_email { get; set; }


        [m.Kontrol.Column()]
        string CURP { get; set; }


        [m.Kontrol.Column()]
        string descripcion { get; set; }


        [m.Kontrol.Column()]
        string id_num_tipocasa { get; set; }


        [m.Kontrol.Column()]
        string nom_tipocasa { get; set; }


        [m.Kontrol.Column()]
        string dscontratista { get; set; }

        [m.Kontrol.Column()]
        string nom_entrega_viv { get; set; }

        [m.Kontrol.Column()]
        string nom_gerente_ventas { get; set; }

        [m.Kontrol.Column()]
        string num_credito { get; set; }

        [m.Kontrol.Column()]
        string num_credito_cony { get; set; }

        [m.Kontrol.Column()]
        string diferencia_dias { get; set; }

        [m.Kontrol.Column()]
        string monto_seguro { get; set; }


        string IdPlaza { get; set; }
        m.SCV.Interfaces.IPlaza Plaza { get; set; }


        [m.Kontrol.Column()]
        string RFC { get; set; }

        [m.Kontrol.Column()]
        string UsuarioAgendoConstruccion { get; set; }

        [m.Kontrol.Column()]
        string UsuarioEntregoConstruccion { get; set; }
        
        [m.Kontrol.Column()]
        string ObservacionesConstruccion { get; set; }

        [m.Kontrol.Column()]
        string ObservacionesVivienda { get; set; }

        [m.Kontrol.Column()]
        int repsConst { get; set; }

        [m.Kontrol.Column()]
        int repsEnt { get; set; }

        [m.Kontrol.Column()]
        string EtapaProceso { get; set; }
        
        [m.Kontrol.Column()]
        string MotivosRezagoEntrega { get; set; }

        [m.Kontrol.Column()]
        string MotivosReprogramacionEntrega { get; set; }
        
        [m.Kontrol.Column()]
        string FechasReprogramacionEntrega { get; set; }

        [m.Kontrol.Column()]
        int CantidadRezagoEntrega { get; set; }
        string edificio { get; set; }
        string nivel { get; set; }
        string mtvs_cambio_const { get; set; }
        string fechas_cambio_const { get; set; }
        string mtvs_cambio_ent { get; set; }
        string fechas_cambio_ent { get; set; }
        string hora_entrega { get; set; }
    }
}
