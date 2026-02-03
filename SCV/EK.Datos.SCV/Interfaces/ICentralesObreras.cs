using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface ICentralesObreras
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ICentralObrera>
    { 
        //Task<object[]> GetAll(int activos);

        //Task<miSCV.ICentralObrera> GetById(int id);

        //Task<int> Save(miSCV.ICentralObrera model);
    }
}
