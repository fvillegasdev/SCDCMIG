using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("SPVSupervisoresCoordinadores")]

    public interface ISPVSupervisoresCoordinadores
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.ISPVCoordinadores>
    {
        Task<List<m.SCV.Interfaces.ISPVCoordinadores>> getCoordinadores(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISPVCoordinadoresSupervisores>> getAsignado(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISmFraccionamiento>> getFraccAsignados(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISPVCoordinadoresSupervisores>> getNoAsignado(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISmFraccionamiento>> getFraccNoAsignados(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISPVCoordinadores>> getResponsablesConstruccion(Dictionary<string, object> parametros);

    }
}