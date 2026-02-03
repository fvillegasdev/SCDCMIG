using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCCO.Interfaces
{
    [m.Kontrol.KontrolName("InsumosTarjetas")]
    public interface IInsumosTarjetas
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCCO.Interfaces.IInsumoTarjeta>
    {
        Task<m.SCCO.Interfaces.IInsumoTarjeta> GetByIdInsumo(int id);
        Task<m.SCCO.Interfaces.IInsumoTarjeta> Calcular(m.SCCO.Interfaces.IInsumoTarjeta tarjeta, m.SCCO.Interfaces.ITabulador tabulador);
        Task<List<m.SCCO.Interfaces.IInsumoTarjetaDetalle>> CalcularInsumos(List<m.SCCO.Interfaces.IInsumoTarjetaDetalle> insumos, int IdTabulador, int IdObra, int IdTipoPresupuesto);

        //Task<List<m.SCCO.Interfaces.IInsumoTarjetaDetalle>> CalcularInsumos(List<m.SCCO.Interfaces.IInsumoTarjetaDetalle> insumos, int idTabulador, int idObra, int idTipoPresupuesto);
    }
}