using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_InsumosMateriales")]
    public interface IInsumoMaterial : m.SCCO.Interfaces.IBaseInsumo
    {
        /** base excluded **/
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        /** base excluded **/

        [m.Kontrol.Column()]
        DateTime? FechaInicio { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaFin { get; set; }

        [m.Kontrol.Column()]
        string Descripcion { get; set; }

        [m.Kontrol.Column()]
        string Foto { get; set; }

        [m.Kontrol.Column()]
        bool? ProductoTerminado { get; set; }

        [m.Kontrol.Column()]
        bool? MateriaPrima { get; set; }

        [m.Kontrol.Column()]
        int? DiasPromedioE { get; set; }

        [m.Kontrol.Column()]
        string Archivo { get; set; }

        [m.Kontrol.Column()]
        bool? Facturable { get; set; }

        [m.Kontrol.Column()]
        string NumeroEconomico { get; set; }

        [m.Kontrol.Column()]
        int IdInsumo { get; set; }

        [m.Kontrol.Column()]
        int IdTipoInsumo { get; set; }

        [m.Kontrol.Column()]
        int IdGrupoInsumo { get; set; }

        m.SCCO.Interfaces.ITipoInsumo TipoInsumo { get; set; }

        m.SCCO.Interfaces.IGrupoInsumo GrupoInsumo { get; set; }

        List<m.SCCO.Interfaces.IInsumoMaterialToleranciaProceso> ToleranciaProcesos { get; set; }
    }
}