using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface ITableJoin
        : IBaseKontrol
    {
        ITable Table { get; set; }
        ITableField Field { get; set; }
        TableJoinTypeEnum JoinType { get; set; }
    }
}
