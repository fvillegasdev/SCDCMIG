using System.Collections.Generic;
using System.Threading.Tasks;
using miSCV = EK.Modelo.SCV.Interfaces;
using mKontrol = EK.Modelo.Kontrol;

namespace EK.Procesos.SCV.Interfaces
{
    [mKontrol.KontrolName("Instituciones")]
    public interface IInstituciones : Kontrol.Interfaces.IBaseProceso
    {
        //Task<List<miSCV.IInstitucion>> GetInstitucionesEsquema();
        //Task<object[]> GetFinanciamientoInstituciones(Dictionary<string, object> parametros);
    }
}