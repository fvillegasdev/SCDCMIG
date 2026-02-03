using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{

    public interface IEntregaPaquetes
          : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        string seleccionar { get; set; }
      
        [m.Kontrol.Column()]
        string id_identificador { get; set; }

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
        string id_num_exterior { get; set; }

        [m.Kontrol.Column()]
        string clave_tipo_vivienda { get; set; }

        [m.Kontrol.Column()]
        string desc_segm { get; set; }

        [m.Kontrol.Column()]
        string fec_liberacion { get; set; }
      
        [m.Kontrol.Column()]
        string fecha_construccion { get; set; }

        [m.Kontrol.Column()]
        string Detalles_construccion { get; set; }

        [m.Kontrol.Column()]
        string fecha_programacion { get; set; }

        [m.Kontrol.Column()]
        string fecha_entrega { get; set; }

        [m.Kontrol.Column()]
        string indicador_detalle { get; set; }

        [m.Kontrol.Column()]
        string fecha_reprogramacion { get; set; }

        [m.Kontrol.Column()]
        string num_entrega_viv { get; set; }

        [m.Kontrol.Column()]
        string nom_ent_viv { get; set; }

        [m.Kontrol.Column()]
        string hipoteca_verde { get; set; }

        [m.Kontrol.Column()]
        string num_gerente_ventas { get; set; }

        [m.Kontrol.Column()]
        string nom_gerente { get; set; }

        [m.Kontrol.Column()]
        string folio { get; set; }

        [m.Kontrol.Column()]
        string nom_tipocasa_smc { get; set; }

    }
}
