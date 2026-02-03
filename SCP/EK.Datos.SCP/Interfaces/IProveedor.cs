using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using miSCP = EK.Modelo.SCP.Interfaces;

namespace EK.Datos.SCP.Interfaces
{
    public interface IProveedor
    {
        Task<List<miSCP.IProveedor>> Get();
        Task<List<miSCP.IProveedor>> Search(string parametro);
    }
}