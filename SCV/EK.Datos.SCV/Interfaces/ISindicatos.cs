//using System.Threading.Tasks;
//using miSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.Interfaces
//{
//    public interface ISindicatos : EK.Datos.Kontrol.Interfaces.IDAOBase
//    {
//        //Task<object[]> GetAll(int activos);

//        //Task<miSCV.ISindicato> GetById(int id);

//        //Task<int> Save(miSCV.ISindicato model);
//    }
//}
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface ISindicatos
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ISindicato>
    {
    }
}