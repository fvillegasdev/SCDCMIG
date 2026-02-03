using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using dao = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IDAOBase
    {
        dao.IDBHelper Helper { get; set; }
    }
}
