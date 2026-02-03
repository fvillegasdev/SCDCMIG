#if BASE
using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_Tipo_Contratista")]
    public interface ITipoContratista
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        string Descripcion { get; set; }

        [m.Kontrol.Column()]
        new string Clave { get; set; }


    }
}
#endif