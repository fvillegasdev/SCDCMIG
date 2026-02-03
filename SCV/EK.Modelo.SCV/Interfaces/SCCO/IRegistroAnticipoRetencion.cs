using System;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Registro_AnticiposRetenciones")]
    public interface IRegistroAnticipoRetencion
      : m.Kontrol.Interfaces.IBaseKontrol
    {
        /** base excluded **/
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        /** base excluded **/

        [m.Kontrol.Column()]
        int IdContrato { get; set; }

        [m.Kontrol.Column()]
        int IdAnticiposDeducciones { get; set; }

        [m.Kontrol.Column()]
        int IdTipoAnticipo { get; set; }

        [m.Kontrol.Column()]
        decimal Importe { get; set; }

        [m.Kontrol.Column()]
        decimal Porcentaje { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaMovimiento { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoAnticipo { get; set; }

        m.SCCO.Interfaces.IAnticiposDeducciones AnticiposDeducciones { get; set; }



    }
}