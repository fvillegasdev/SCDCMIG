using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Indicador")]
    public interface IIndicadores
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string BPType { get; set; }
        
    }
}
