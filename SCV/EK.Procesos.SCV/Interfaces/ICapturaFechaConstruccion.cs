using System.Threading.Tasks;
using miSCV = EK.Modelo.SCV.Interfaces;
using mKontrol = EK.Modelo.Kontrol;
using System.Collections.Generic;
using System.Data;
using System;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("CapturaFechaConstruccion")]

    public interface ICapturaFechaConstruccion
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.ICapturaFechaConstruccion>
    {
        //Result
        //Task<List<m.SCV.Interfaces.ICapturaFechaConstruccion>> GetFechaConstruccion(string Plaza, string Segmentos, string Fraccionamiento, DateTime FechaInicial, DateTime FechaFinal);
        Task<List<m.SCV.Interfaces.ICapturaFechaConstruccion>> GetFechaConstruccion(Dictionary<string, object> parametros);

        Task<List<m.SCV.Interfaces.ICapturaFechaConstruccionExcel>> GetFechaConstruccionExcel(Dictionary<string, object> parametros);

        Task<m.SCV.Interfaces.ICapturaFechaConstruccion> SaveProgramados(m.SCV.Interfaces.ICapturaFechaConstruccion item);

        Task<List<m.SCV.Interfaces.IMotivosReprogramacion>> GetMotivosReprogramacion(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IMotivosReprogramacion>> GetMotivosRezago(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IMotivosReprogramacion>> GetMotivosRecepcionDetalle(Dictionary<string, object> parametros);

        Task<List<m.Kontrol.Interfaces.IProgramados>> GetProgramados(Dictionary<string, object> parametros);

        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePersonalEntregaViv>> GetPersonaEntregaVxFracc(Dictionary<string, object> parametros);
    }
}