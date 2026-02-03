using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IInterface
        :dki.IDAOBaseGeneric<m.SCV.Interfaces.IInterface>
    {
        Task<object> GetAllInterface(Dictionary<string, object> parametros);
        Task<object> GetAllISFDetalles(Dictionary<string, object> parametros);
        Task<object> GetSaveUpdateInterface(Dictionary<string,object> parametros);
    }
}
