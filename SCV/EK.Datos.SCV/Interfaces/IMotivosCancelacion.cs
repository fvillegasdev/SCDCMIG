using System.Threading.Tasks;
using System.Collections.Generic;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IMotivosCancelacion
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IMotivosCancelacion>
    {
        //Task<object[]> GetAll(int id, int activos);

        //Task<miSCV.IMotivosCancelacion> GetById(int id);

        //Task<int> Save(miSCV.IMotivosCancelacion model);

        Task<object> GetAllMotivosCancelacion(Dictionary<string, object> parametros);

    }
}