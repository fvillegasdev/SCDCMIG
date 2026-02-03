#if RUBA
using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_causas_reprog")]
    public interface ICausasReprogramacion
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("desc_causa")]
        string Descripcion { get; set; }

        [m.Kontrol.Column("id_causa")]
        int Clave { get; set; }


    }
}
#endif