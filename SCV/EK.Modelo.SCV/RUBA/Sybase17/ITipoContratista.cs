#if RUBA
using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_Tipo_Contratista")]
    public interface ITipoContratista
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("desc_tipo_contratista")]
        string Descripcion { get; set; }

        [m.Kontrol.Column("clave_tipo_contratista")]
        new string Clave { get; set; }

    }
}
#endif