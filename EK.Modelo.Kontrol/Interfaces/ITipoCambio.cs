using EK.Modelo.Kontrol.Interfaces;
using System;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface ITipoCambio 
        : IBaseKontrol
    {
        int IdMonedaOrigen { get; set; }
        int IdMonedaDestino { get; set; }
        //IMoneda Moneda { get; set; }
        IMoneda MonedaDestino { get; set; }
        DateTime Fecha { get; set; }
        DateTime FechaHasta { get; set; }
        decimal Valor { get; set; }
    }
}
