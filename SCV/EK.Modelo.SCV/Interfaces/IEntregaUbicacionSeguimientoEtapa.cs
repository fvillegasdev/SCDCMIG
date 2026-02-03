using System;
using System.Collections.Generic;

using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sm_cliente_etapa")]
    public interface IEntregaUbicacionSeguimientoEtapa
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        int IdCliente { get; set; }
        int IdRelacion { get; set; }
        int? Orden { get; set; }
        int IdEtapa { get; set; }
        int? IdAutorizador { get; set; }

    }
}