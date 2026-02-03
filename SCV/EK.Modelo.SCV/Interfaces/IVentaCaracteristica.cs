using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IVentaCaracteristica : IBaseKontrol
    {
        int? IdVenta { get; set; }
        int? IdVentaUbicacion { get; set; }
        int? IdEntidadCaracteristica { get; set; }
        int? IdEntidad { get; set; }
        int? IdTipoEntidad { get; set; }
        bool VentaOpcional { get; set; }
        decimal Importe { get; set; }
        int? IdCaracteristica { get; set; }
        IItemGeneral TipoEntidad { get; set; }
        ICaracteristicaAdicional Caracteristica { get; set; }
        int? IdVentaVersion { get; set; }

        string Tipo { get; set; }
        decimal? ImporteCaracteristica { get; set; }

        IVentaVersion VentaVersion { get; set; }
    }
}