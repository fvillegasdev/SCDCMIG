using m = EK.Modelo;
using p = EK.Procesos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("BitacoraClienteSPV")]
    public interface IBitacorasClienteSPV
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IBitacoraClienteSPV>
    {
        Task<string> printLogBook(int idCliente, string operacionEspecificaSP);
        Task<string> printHistorialIncidencias(int idCliente);

        Task<List<m.SCV.Interfaces.IBitacoraClienteSPV>> saveLogBook(m.SCV.Interfaces.IBitacoraClienteSPV item);
        Task<int> MarcarComentarioValidado(int idComentario);
    }
}
