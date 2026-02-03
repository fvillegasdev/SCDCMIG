using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using mscvi = EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("comisionesTabuladores")]

    public interface IComisionesTabuladores
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IComisionesTabuladores>

    {
        Task<m.SCV.Interfaces.IComisionesTabuladores> GuardarComisionTabulador(
            int idProceso,
            mscvi.ITabuladores tabulador, 
            mscvi.ITabuladoresConfiguracion tabuladorConfig, 
            mscvi.IComisionesCalculoIndicador indicador,
            int cantidadTotal);

        Task<object> ConsultarComisiones(Dictionary<string, object> parametros);

        Task<m.SCV.Interfaces.IComisionesProcesoPeriodos> GuardarProcesoDetale(
            int IdPeriodicidad,
            int IdComisionProceso, 
            DateTime fechaInicio,
            mscvi.ITabuladores tabulador);

        Task<mscvi.ITabuladoresConfiguracion> BuscarConfiguracionPorTabulador(int idTabulador, int Cantidad);

        Task<m.SCV.Interfaces.IComisionesProcesoPeriodos> MarcarEjecucionFinalProceso(int idPeriodicidadDetalle);


        Task<m.SCV.Interfaces.IComisionesComplementarias> GeneracionComplementos(int idProceso);

        Task<m.SCV.Interfaces.IComisionesComplementarias> GuardarComisionComplementaria(
            m.SCV.Interfaces.IComisionesCalculoIndicadorComplementario comision,
            m.SCV.Interfaces.ITabuladores tabulador,
            m.SCV.Interfaces.ITabuladoresConfiguracion configuracionTabulador );


        Task<bool> GuardarTabuladorExpediente(List<m.SCV.Interfaces.IExpediente> items, int idComisionTabulador);
    }
}
