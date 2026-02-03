using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface ITableCondition
        : IBaseKontrol
    {
        string Operador { get; set; }
        string OperadorLogico { get; set; }
        m.Kontrol.Interfaces.ITable Table { get; set; }
        object Value { get; set; }
    }
}