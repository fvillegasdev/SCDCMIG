using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface INotarios
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.INotario>
    {
        //Task<object[]> GetAll(int id, int activos);
        //Task<miSCV.INotario> GetById(int id);
        //Task<int> Save(miSCV.INotario model);


    }
}
