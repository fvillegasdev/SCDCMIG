using System.Threading.Tasks;
using miSCV = EK.Modelo.SCV.Interfaces;
using mKontrol = EK.Modelo.Kontrol;
using System.Collections.Generic;
using System.Data;
using System;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("EntregaPaquetes")]

    public interface IEntregaPaquetes
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IEntregaPaquetes>
    {
        //Result
        Task<List<m.SCV.Interfaces.IEntregaPaquetes>> GetEntregaPaquetes(string Plaza, string Segmentos, string Fraccionamiento, DateTime FechaInicial, DateTime FechaFinal);

    }
}