using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IRequisitoCaracteristica : m.Kontrol.Interfaces.IBaseKontrol
    {
        int IdRequisito { get; set; }
        string Descripcion { get; set; }
    }
}