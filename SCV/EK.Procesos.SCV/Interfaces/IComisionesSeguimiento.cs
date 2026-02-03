using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("comisionesSeguimiento")]
    public interface IComisionesSeguimiento:
        p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IComisionesSeguimiento>

    {
        Task<m.SCV.Interfaces.IComisionesProceso> MarcarEjecucionFinalProceso(m.SCV.Interfaces.IComisionesProceso ejecucionProceso);
        Task<m.SCV.Interfaces.IComisionAniosPeriodos> ObtenerPeriodoCalculo(Dictionary<string, object> parametros);

        Task<object> ConsultarComisiones(Dictionary<string, object> parametros);

       Task<m.SCV.Interfaces.IComisionesSeguimiento> SaveConfiguracion(int idPeriodo, int idExpediente, int idCategoria, decimal? monto, int? porcentaje, int idUsuario, int? idVentaUbicacion, int idProceso);

        Task<m.SCV.Interfaces.IComisionesSeguimiento> GuardarComisionComplementaria(
             m.SCV.Interfaces.IComisionesSeguimiento item,
             m.SCV.Interfaces.IComisionesComplementarias comisionComplementaria,
             int idProceso);

        Task<bool> SaveConfiguracionDetalle(int idComision, int idCategoria, decimal montoComision, int idMonedaDestino, decimal tipoCambio, int idProceso, dynamic item, bool existe);


        Task<List<m.SCV.Interfaces.IComisionesSeguimientoDetalle>> ObtenerComisionesPorExpediente(int IdExpediente);
    }
}
