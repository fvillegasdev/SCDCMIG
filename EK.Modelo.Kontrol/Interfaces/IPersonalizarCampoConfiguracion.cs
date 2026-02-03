using System;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("PersonalizarCamposConfiguracion")]
    public interface IPersonalizarCampoConfiguracion 
        : IBaseKontrol
    {
        [Column()]
        string Etiqueta { get; set; }
        [Column()]
        int IdSeccion { get; set; }
        [Column()]
        int IdCampo { get; set; }
        [Column()]
        int Orden { get; set; }
        [Column()]
        bool Visible { get; set; }
        [Column()]
        bool Requerido { get; set; }
        [Column()]
        int? xs { get; set; }
        [Column()]
        int? sm { get; set; }
        [Column()]
        int? md { get; set; }
        [Column()]
        int? lg { get; set; }
        [Column()]
        string Size { get; set; }

        m.Kontrol.Interfaces.IPersonalizarCampo Campo { get; set; }
        m.Kontrol.Interfaces.IPersonalizarCamposSecciones Seccion { get; set; }


        /* Campos Excluidos*/
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
    }
}
