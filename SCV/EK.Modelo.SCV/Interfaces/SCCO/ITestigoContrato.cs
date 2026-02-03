using System.Collections.Generic;
using System;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_testigos_contratos")]
    public interface ITestigoContrato
      : m.Kontrol.Interfaces.IBaseKontrol
    {
        /** base excluded **/
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        /** base excluded **/

        [m.Kontrol.Column()]
        string Descripcion { get; set; }
    
        [m.Kontrol.Column()]
        int IdContrato { get; set; }

        [m.Kontrol.Column()]
        int IdUsuario { get; set; }


        m.Kontrol.Interfaces.IUsuario Usuario { get; set; }


    }
}