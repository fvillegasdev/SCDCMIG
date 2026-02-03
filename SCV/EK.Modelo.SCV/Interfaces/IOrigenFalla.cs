#if BASE
using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_Origen_Falla")]
    public interface IOrigenFalla
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        string Descripcion { get; set; }

        [m.Kontrol.Column()]
        new string Clave  { get; set; }

        // [m.Kontrol.Column("Clave", true)]
        //new string clave_origen { get; set; }

        //[m.Kontrol.Column("Abreviatura",true)]
        //string Abreviatura { get; set; }

        //[m.Kontrol.Column()]
        //bool Procede { get; set; }

    }
}
#endif