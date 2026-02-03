using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using miKontrol = EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;
using d = EK.Datos;


namespace EK.Datos.SCV.Interfaces
{
    public interface ICapturaFechaConstruccion
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ICapturaFechaConstruccion>
    {


        //Task<List<m.SCV.Interfaces.ICapturaFechaConstruccion>> GetFechaConstruccion(string Plaza, string Segmentos, string Fraccionamiento,  DateTime FechaInicial, DateTime FechaFinal);
        Task<List<m.SCV.Interfaces.ICapturaFechaConstruccion>> GetFechaConstruccion(Dictionary<string, object> parametros);

        Task<List<m.SCV.Interfaces.ICapturaFechaConstruccionExcel>> GetFechaConstruccionExcel(Dictionary<string, object> parametros);


        Task<int> SaveCompromisoCons(m.SCV.Interfaces.ICapturaFechaConstruccion item);

        Task<int> SaveProgramados(m.Kontrol.Interfaces.IProgramados item, int Usuario);

        Task<List<m.SCV.Interfaces.IMotivosReprogramacion>> GetMotivosReprogramacion(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IMotivosReprogramacion>> GetMotivosRezago(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IMotivosReprogramacion>> GetMotivosRecepcionDetalle(Dictionary<string, object> parametros);

        Task<List<m.Kontrol.Interfaces.IProgramados>> GetProgramados(Dictionary<string, object> parametros);

        Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePersonalEntregaViv>> GetPersonaEntregaVxFracc(Dictionary<string, object> parametros);

    }
}
