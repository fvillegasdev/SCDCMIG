using System;
using System.Collections.Generic;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("CompromisosConstruccion")]
    public interface ICompromisosConstruccion
        : IBaseKontrol
    {

        [m.Kontrol.Column()]
        DateTime fecha_construccion { get; set; }
        [m.Kontrol.Column()]
        DateTime fecha_reprogramacion { get; set; }
        [m.Kontrol.Column()]
        string indicador_detalle { get; set; }
        [m.Kontrol.Column()]
        int numcte { get; set; }



    }
}
