#if BASE
using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_Motivos_Cancelacion")]
    public interface IMotivosCancelacionPV
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdUso { get; set; }
        [m.Kontrol.Column()]
        int IdMotivo { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Uso { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Motivo{ get; set; }
    }
}
#endif