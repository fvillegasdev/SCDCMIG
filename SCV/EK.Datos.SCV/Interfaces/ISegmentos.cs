//using miSCV = EK.Modelo.SCV.Interfaces;
//namespace EK.Datos.SCV.Interfaces
//{
//    public interface ISegmentos
//    {
//        object[] GetAll(int id, int activos);

//        miSCV.ISegmento GetById(int id);

//        int Save(miSCV.ISegmento model);
//    }
//}
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface ISegmentos
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ISegmento>
    {
    }
}