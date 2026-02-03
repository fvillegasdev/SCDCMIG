using System.Collections.Generic;
using m = EK.Modelo.SCV;
using mk = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IVentaUbicacion : mk.Interfaces.IBaseKontrolMM
    {
        IUbicaciones Ubicacion { get; set; }
        IPaquete Paquete { get; set; }
        List<IVentaCaracteristica> Caracteristicas { get; set; }
        decimal ImporteComisionable { get; set; }
        decimal? ImporteUbicacion { get; set; }
        int? IdVentaVersion { get; set; }
        IVentaVersion VentaVersion { get; set; }
        List<mk.Interfaces.IKontrolFile> Archivos { get; set; }
        int? IdListaPreciosVersion { get; set; }
        decimal? ValorAvaluo { get; set; }
        decimal? TotalCaracteristicas { get; set; }
        decimal? Diferencia { get; set; }
        mk.Interfaces.IItemGeneral PrecioVenta { get; set; }
        bool Topar { get; set; }
        decimal? ValorExcedente { get; set; }
        decimal? PrecioExcedente { get; set; }
        decimal? ValorOperativo { get; set; }


        decimal? ImporteOriginal { get; set; }
        decimal? ImporteOriginalMoneda { get; set; }

        decimal? ImporteNuevo { get; set; }

    }
}