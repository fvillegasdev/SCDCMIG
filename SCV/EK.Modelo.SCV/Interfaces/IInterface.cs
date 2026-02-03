using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IInterface
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        string IdInterface { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Accion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Interface { get; set; }
        int IdAccion { get; set; }
        //[m.Kontrol.Column()]
        //new string Estatus { get; set; }

        //[m.Kontrol.Column()]
        //int numcte_ek { get; set; }
        List<m.SCV.Interfaces.IInterfaceDetalle> Detalles { get; set; }

    }
}
