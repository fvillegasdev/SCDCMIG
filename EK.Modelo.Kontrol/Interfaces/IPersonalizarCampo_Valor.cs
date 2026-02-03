using System;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("PersonalizarCampos_Valores")]
    public interface IPersonalizarCampo_Valor
        : IBaseKontrol
    {
        [Kontrol.Column("IdCampo", true)]
        int IdCampo { get; set; }

        m.Kontrol.Interfaces.IPersonalizarCampo PersonalizarCampos { get; set; }

        [Kontrol.Column("IdOpcion", true)]
        int IdOpcion { get; set; }

        [Kontrol.Column("Posicion", true)]
        string Posicion { get; set; }


        [Kontrol.Column("Orden", true)]
        int Orden { get; set; }


        [Column()]
        int IdRegistro { get; set; }

        [Column()]
        int IdCampoOpcion { get; set; }
  
        [Kontrol.Column("ValorRegistro", true)]
        string ValorRegistro { get; set; }


        [Column()]
        string Valor { get; set; }

        [Kontrol.Column("IdTemporal", true)]
        int IdTemporal { get; set; }

        [Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        [Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

    }
}

