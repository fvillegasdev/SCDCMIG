
using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_Falla_TipoFalla")]
    public interface IFallaTipoFalla
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        

        [m.Kontrol.Column("IdFalla")]
        int IdFalla { get; set; }

        [m.Kontrol.Column("IdTipoFalla")]
        int IdTipoFalla { get; set; }

        
        m.SCV.Interfaces.ITipoComponente TipoFalla { get; set; }



        /*Propiedades Anuladas*/
        [Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [Kontrol.Column("IdEstatus", true)]
        new string IdEstatus { get; set; }

        [Kontrol.Column("CreadoPor", true)]
        new int CreadoPor { get; set; }


    }
}
