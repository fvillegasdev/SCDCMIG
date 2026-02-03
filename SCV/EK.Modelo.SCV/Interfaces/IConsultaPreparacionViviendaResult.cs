using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{


    public interface IConsultaPreparacionViviendaResult : IBaseKontrol
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
        string dir_casa { get; set; }

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

        [m.Kontrol.Column()]
        string desc_tipo_vivienda { get; set; }

        [m.Kontrol.Column()]
        string id_cve_fracc { get; set; }

        [m.Kontrol.Column()]
        string nom_fracc { get; set; }

        [m.Kontrol.Column()]
        string Prototipo { get; set; }

        [m.Kontrol.Column()]
        string ET { get; set; }

        [m.Kontrol.Column()]
        string M { get; set; }

        [m.Kontrol.Column()]
        string L { get; set; }

        [m.Kontrol.Column()]
        string I { get; set; }

        [m.Kontrol.Column()]
        string No_Exterior { get; set; }

        [m.Kontrol.Column()]
        string nom_financinst { get; set; }

        [m.Kontrol.Column()]
        string subsidio { get; set; }
        
        [m.Kontrol.Column()]
        string Ecocasa { get; set; }

        [m.Kontrol.Column()]
        string Equipamiento { get; set; }

        [m.Kontrol.Column()]
        string cve_Equipamiento { get; set; }

        [m.Kontrol.Column()]
        string Desc_Equipamiento { get; set; }

        [m.Kontrol.Column()]
        DateTime Firma_Escritura { get; set; }

        [m.Kontrol.Column()]
        DateTime Firmo { get; set; }

        [m.Kontrol.Column()]
        string Etapa_Firma { get; set; }

        [m.Kontrol.Column()]
        string Pend_Pago { get; set; }

        [m.Kontrol.Column()]
        DateTime Fec_Pend_Pago { get; set; }

        [m.Kontrol.Column()]
        string pago { get; set; }

        [m.Kontrol.Column()]
        DateTime fec_pago { get; set; }

        [m.Kontrol.Column()]
        string Cve_Contra { get; set; }

        [m.Kontrol.Column()]
        string Nom_Contra { get; set; }

        [m.Kontrol.Column()]
        string dias_firma { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaEscrituracion { get; set; }

        [m.Kontrol.Column()]
        int DiasDesdeEscrituracion { get; set; }

        [m.Kontrol.Column()]
        string monto_seguro { get; set; }
        string edificio { get; set; }
        string nivel { get; set; }
    }
}
