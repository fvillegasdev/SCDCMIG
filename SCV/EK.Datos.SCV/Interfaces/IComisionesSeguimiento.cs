using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
   public interface IComisionesSeguimiento
        :d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IComisionesSeguimiento>
    {
        Task<object> GetComisiones(Dictionary<string, object> parametros);
        Task<object> GetEtapasEnCurso(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IExpediente> GetEtapaExiste(Dictionary<string, object> parametros);

        Task<m.SCV.Interfaces.IComisionesSeguimiento> ExisteComision(int idExpediente, int idVentaUbicacion, int idUsuario, int idFase);
        Task<List<m.SCV.Interfaces.IComisionesSeguimientoDetalle>> ComisionesPorExpediente(int idExpediente);
    }
}
