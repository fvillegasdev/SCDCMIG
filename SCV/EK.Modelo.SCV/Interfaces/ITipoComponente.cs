#if BASE
using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_Tipos_Componentes")]
    public interface ITipoComponente
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("DuracionGarantia")]
        int DuracionGarantia { get; set; }
        [m.Kontrol.Column("IdUsoFalla")]
        int IdUsoFalla { get; set; }
        m.Kontrol.Interfaces.IItemGeneral UsoFalla { get; set; }
    }
}
#endif