using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface ITable
        : IBaseKontrol
    {
        ITableJoin LeftTable { get; set; }
        List<ITableField> Fields { get; set; }
    }
}