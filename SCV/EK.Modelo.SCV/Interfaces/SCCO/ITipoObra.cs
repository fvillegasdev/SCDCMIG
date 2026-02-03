
using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_TipoObra")]
    public interface ITipoObra
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        m.Kontrol.Interfaces.IItemGeneral UsoObra { get; set; }
    
        
    }
}
