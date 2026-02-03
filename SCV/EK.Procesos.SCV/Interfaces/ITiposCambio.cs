using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using miSCV = EK.Modelo.SCV.Interfaces;
using mKontrol = EK.Modelo.Kontrol.Interfaces;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("TiposCambio")]

    public interface ITiposCambio
        : p.Kontrol.Interfaces.IBaseProceso
    {
        Task<decimal?> GetTipoCambioAlDia(int idMonedaOrigen, int idMonedaDestino);
    }
}
//    [EK.Modelo.Kontrol.KontrolName("TiposCambio")]
//    public interface ITiposCambio : Kontrol.Interfaces.IBaseProceso
//    {
//        Task<List<mKontrol.ITipoCambio>> GetAll( int activos);

//        Task<mKontrol.ITipoCambio> GetById(int id);

//        Task<mKontrol.ITipoCambio> Save(mKontrol.ITipoCambio item);

//        Task<decimal?> GetTipoCambioAlDia(int idMonedaOrigen, int idMonedaDestino);
//    }
//}