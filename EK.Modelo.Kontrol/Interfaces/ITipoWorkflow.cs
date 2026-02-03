using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("TipoFlujoTrabajo")]
    public interface ITipoWorkflow : IBaseKontrol
    {
        List<IWorkflow> flujoAutorizacion { get; set; }
    }
}