using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [m.Kontrol.KontrolName("entidades")]
    public interface IEntidades
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IEntidad>
    {
        Task<List<m.Kontrol.Interfaces.IEntidadCampo>> GetEntidadCampos(Dictionary<string, object> parametros);
    }
}