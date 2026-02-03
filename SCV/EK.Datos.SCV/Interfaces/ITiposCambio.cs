using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using miSCV = EK.Modelo.SCV.Interfaces;
using miKontrol = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.Interfaces
{
    public interface ITiposCambio
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ITiposCambio>
    {
        //Task<List<miKontrol.ITipoCambio>> Get(int idMonedaOrigen, int idMonedaDestino, DateTime? fecha);
        //    Task<List<miKontrol.ITipoCambio>> GetAll( int activos);
        //    Task<miKontrol.ITipoCambio> GetById(int id);
        //    Task<int> Save(miKontrol.ITipoCambio model);
        //    Task<miKontrol.ITipoCambio> GetByMonedaId(int idMoneda);
        Task<List<miKontrol.ITipoCambio>> Get(int idMonedaOrigen, int idMonedaDestino, DateTime date);
    }
}
