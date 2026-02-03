using System.Threading.Tasks;
using System.Collections.Generic;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.Kontrol.Interfaces
{
    public interface IPersonalizarCamposValores :
       d.Kontrol.Interfaces.IDAOBaseGeneric<m.Kontrol.Interfaces.IPersonalizarCampo_Valor>
    {

    }
}
