using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Plaza")]
    public interface IPlaza
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        int ValidarResponsablePlaza { get; set; }
    }
}