using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using m = EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos.Kontrol.Interfaces;
using p = EK.Procesos.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol.Interfaces
{
    public interface IBaseProceso
    {
        EK.Datos.Kontrol.Interfaces.IDAOBase DaoBase { get; set; }
        EK.Datos.Kontrol.Interfaces.IDBHelper Helper { get; set; }
        bool IsRoot { get; set; }
        int? IdUser { get; set; }
        int ReturnCode { get; set; }
        string ReturnMessage { get; set; }
        int ReturnSeverity { get; set; }
        int getUserId();
    }
}
