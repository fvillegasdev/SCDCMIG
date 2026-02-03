using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Datos.Kontrol.Interfaces;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IUsuarios
        : IDAOBaseGeneric<m.SCV.Interfaces.IAgente>
    {
    }
}