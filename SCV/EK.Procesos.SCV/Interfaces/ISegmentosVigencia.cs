using System.Threading.Tasks;
using miSCV = EK.Modelo.SCV.Interfaces;
using mKontrol = EK.Modelo.Kontrol;

namespace EK.Procesos.SCV.Interfaces
{
    [mKontrol.KontrolName("SegmentosVigencia")]
    public interface ISegmentosVigencia
        : Kontrol.Interfaces.IBaseProceso
    {
        //object[] GetAll(int id, int activos);

        //miSCV.ISegmentoVigencia GetById(int id);

        //Task<miSCV.ISegmentoVigencia> Save(string item);

        //Task<object[]> GetHistory(int ID, int top);

        //Task<object[]> GetHistory(int top);
    }
}