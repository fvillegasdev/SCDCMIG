using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IMotivoSuspensionNotificaciones
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IMotivoSuspensionNotificaciones>
    {
        Task<object>GetAllUsuario(Dictionary<string, object> parametros);
    }
}
