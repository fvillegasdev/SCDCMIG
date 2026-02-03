using System;
using System.Collections.Generic;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("PersonalizarCamposOpciones")]
    public interface IPersonalizarCampoOpcion
        : IBaseKontrol
    {
        //[Column()]
        //int IdCampo { get; set; }

        //m.Kontrol.Interfaces.IPersonalizarCampo PersonalizarCampos { get; set; }

        //[Column()]
        //int IdOpcion { get; set; }

        //[Column()]
        //string Posicion { get; set; }

        //[Column()]
        //int Orden { get; set; }


        [Column()]
        int IdRegistro { get; set; }
        [Column()]
        string ValorRegistro { get; set; }

        List<m.Kontrol.Interfaces.IPersonalizarCamposSecciones> Secciones { get; set; }
        List<m.Kontrol.Interfaces.IPersonalizarCampoConfiguracion> Configuraciones { get; set; }

        //[Column()]
        //string Etiqueta { get; set; }

        //[Column()]
        //DateTime? VencimientoInicio { get; set; }

        //[Column()]
        //DateTime? VencimientoFin { get; set; }

        //[Column()]
        //bool TieneVencimiento { get; set; }
        //[Column()]
        //bool Obligatorio { get; set; }

        //[Column()]
        //string Valor { get; set; }
        //[Column()]
        //int IdTipoCampo { get; set; }
        //[Column()]
        //int IdTipoEntidad { get; set; }
        //[Column()]
        //int Ancho { get; set; }
        //string Icono { get; set; }
        //[Column()]
        //string FijarValor { get; set; }

        //m.Kontrol.Interfaces.IItemGeneral TipoCampo { get; set; }
        //m.Kontrol.Interfaces.IItemGeneral TipoEntidad { get; set; }
    }
}

