using System;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_RegistroAnticipos_configuracion")]
    public interface IRegistroAnticipoConfiguracion
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
        int IdRegistro_AnticiposRetenciones { get; set; }

        m.SCCO.Interfaces.IRegistroAnticipoRetencion RegistroAnticipoRetencion { get; set; }

        m.SCCO.Interfaces.IContrato Contrato { get; set; }



    }
}