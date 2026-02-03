using System.Collections.Generic;
using miSCO = EK.Modelo.SCO.Interfaces;

namespace EK.Datos.SCO.Interfaces
{
    public interface ICentroCosto
    {
        object[] GetAll(int activos, int idUser);

        miSCO.ICentroCosto[] Search(string parametro);
    }
}