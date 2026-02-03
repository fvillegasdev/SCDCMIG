using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface ILocalidades
        : IDAOBaseGeneric<m.Kontrol.Interfaces.ILocalidad>
    {
        Task<m.Kontrol.Interfaces.ILocalidad> obtenerLocalidadPorId(int id);

    }
}