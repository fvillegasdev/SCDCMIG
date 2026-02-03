using miSCV = EK.Modelo.SCV.Interfaces;
using m = EK.Datos.Kontrol.Interfaces;

namespace EK.Datos.SCV.Interfaces
{
    public interface ISegmentosVigencia:
        m.IDAOBaseGeneric<miSCV.ISegmentosVigencia>
    {
        
        //object[] GetAll(int id, int activos);

        //miSCV.ISegmentoVigencia GetById(int id);

        //int Save(miSCV.ISegmentoVigencia model);
    }
}
