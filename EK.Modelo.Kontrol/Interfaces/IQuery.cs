using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IQuery
        : IBaseKontrol
    {
        List<ITable> Select { get; set; }
        List<ITableCondition> Where { get; set; }
    }
}