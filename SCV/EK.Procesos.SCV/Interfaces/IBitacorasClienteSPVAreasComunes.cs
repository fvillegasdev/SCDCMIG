using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("BitacoraClienteSPVAreasComunes")]
    public interface IBitacorasClienteSPVAreasComunes : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IBitacoraClienteSPVAreasComunes>
    {
        Task<string> printLogBook(int idCliente, string operacionEspecificaSP, string Opcion);
        Task<List<m.SCV.Interfaces.IBitacoraClienteSPVAreasComunes>> saveLogBook(m.SCV.Interfaces.IBitacoraClienteSPVAreasComunes item);
    }
}
