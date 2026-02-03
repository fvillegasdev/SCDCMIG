using System;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;
using System.Collections.Generic;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("PersonalizarCampos")]
    public interface IPersonalizarCampo 
        : IBaseKontrol
    {
        [Column()]
        string Descripcion { get; set; }
        [Column()]
        string Etiqueta { get; set; }

        [Column()]
        DateTime? VencimientoInicio { get; set; }

        [Column()]
        DateTime? VencimientoFin { get; set; }

        [Column()]
        bool TieneVencimiento { get; set; }
        [Column()]
        bool Obligatorio { get; set; }

        [Column()]
        string Valor { get; set; }
        [Column()]
        int IdTipoCampo { get; set; }
        [Column()]
        int IdTipoEntidad { get; set; }
        [Column()]
        int Ancho { get; set; }
        string Icono { get; set; }
        [Column()]
        string FijarValor { get; set; }
        string Size { get; set; }

        m.Kontrol.Interfaces.IPersonalizarCamposSecciones Seccion { get; set; }
        m.Kontrol.Interfaces.IPersonalizarCampoConfiguracion Configuracion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoCampo { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Campo { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoEntidad { get; set; }                
    }
}
