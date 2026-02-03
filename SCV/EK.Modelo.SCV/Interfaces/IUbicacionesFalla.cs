#if BASE
using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_Ubicaciones_Falla")]
    public interface IUbicacionesFalla
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        m.Kontrol.Interfaces.IItemGeneral UsoFalla { get; set; }

        [m.Kontrol.Column()]
        int IdUsoFalla { get; set; }

        int IdUbicacionComponente { get; set; }


        int? IdUbicacionFalla { get; set; }



        [m.Kontrol.Column("Descripcion")]
        new string Descripcion { get; set; }


    }
}
#endif