using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    public interface IWBSComposite : m.SCCO.Interfaces.IWBSBase
    {
        List<m.SCCO.Interfaces.IWBSBase> Children { get; set; }
    }
}