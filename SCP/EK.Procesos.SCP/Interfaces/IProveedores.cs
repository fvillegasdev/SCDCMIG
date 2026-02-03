using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using miSCP = EK.Modelo.SCP.Interfaces;
using mKontrol = EK.Modelo.Kontrol;

namespace EK.Procesos.SCP.Interfaces
{
    [mKontrol.KontrolName("Proveedores")]
    public interface IProveedores 
        : Kontrol.Interfaces.IBaseProceso
    {
        Task<List<miSCP.IProveedor>> Get();
        Task<List<miSCP.IProveedor>> Search(string parametro);
    }
}