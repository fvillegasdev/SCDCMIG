using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCO.Interfaces;
using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ubicaciones")]

    public interface IUbicaciones
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string ClaveCorta { get; set; }

        [m.Kontrol.Column()]
        string ClaveFormato { get; set; }

        [m.Kontrol.Column()]
        int IdSegmento { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoUbicacion { get; set; }

        [m.Kontrol.Column()]
        string NumeroExterior { get; set; }

        [m.Kontrol.Column()]
        string Calle { get; set; }


        [m.Kontrol.Column()]
        int IdDesarrollo { get; set; }


        [m.Kontrol.Column()]
        int IdPrototipo { get; set; }


        [m.Kontrol.Column()]
        int IdCentroCosto { get; set; }

        [m.Kontrol.Column()]
        decimal Superficie { get; set; }

        [m.Kontrol.Column()]
        decimal FrenteUbicacion { get; set; }


        [m.Kontrol.Column()]
        string RUC { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaHabitabilidad { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaProgramada { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaEntrega { get; set; }

        [m.Kontrol.Column()]
        int PorcentajeConstruccion { get; set; }

        [m.Kontrol.Column("FechaPorcentajeConstruccion", true)]
        DateTime? FechaPorcentajeConstruccion { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaDTU { get; set; }

        [m.Kontrol.Column()]
        string Descripcion { get; set; }


        [m.Kontrol.Column()]
        string ColindanciaGeneral { get; set; }


        [m.Kontrol.Column()]
        string ColindanciaComun { get; set; }


        [m.Kontrol.Column()]
        string Observaciones { get; set; }

        [m.Kontrol.Column()]
        bool IdEstatusUbicacion { get; set; }

        [m.Kontrol.Column()]
        bool IdDtu { get; set; }

        [m.Kontrol.Column()]
        bool? IdEstatusExpediente { get; set; }

        [m.Kontrol.Column()]
        decimal Excedente { get; set; }

        [m.Kontrol.Column()]
        decimal PuntajeDTU { get; set; }

        [m.Kontrol.Column()]
        string RUV { get; set; }

        [m.Kontrol.Column()]
        int IdCentroCostoConstruccion { get; set; }

        [m.Kontrol.Column()]
        string NumeroInterior { get; set; }


        [m.Kontrol.Column()]
        int? IdPaquete { get; set; }


        [m.Kontrol.Column()]
        DateTime? FechaCierre { get; set; }


        [m.Kontrol.Column()]
        int? IdEstatusDeUbicacion { get; set; }


        [m.Kontrol.Column()]
        bool? Cierre { get; set; }


        IUbicacionEstatus EstatusDeUbicacion { get; set; }
        IDesarrollos Desarrollo { get; set; }
        IPaquete Paquete { get; set; }
        IPrototipo Prototipo { get; set; }
        ISegmento Segmento { get; set; }
        ICentroCosto CentroCosto { get; set; }
        ICentroCosto CentroCostoConstruccion { get; set; }
        ITiposUbicacion TipoUbicacion { get; set; }
        List<IEntidadCaracteristica> Caracteristicas { get; set; }
        List<ISeguimientoTecnico> Seguimiento { get; set; }
        IUbicacionEstatus EsatatusDeUbicacion { get; set; }

        //#if RUBA
        string DesarrolloClave { get; set; }
        string IdPlaza { get; set; }
        m.SCV.Interfaces.IPlaza Plaza { get; set; }
        int? IdCoordinador { get; set; }
        int? IdSupervisor { get; set; }
        string SuperManzana { get; set; }
        string Manzana { get; set; }
        string Lote { get; set; }
        string Interior { get; set; }
        string Exterior { get; set; }
        string Geolocalizacion { get; set; }
        string Edificio { get; set; }
        string Nivel { get; set; }
        DateTime? FechaEntregaCalidad { get; set; }
        List<m.SCV.Interfaces.IContratistaUbicacion> Contratistas { get; set; }
        string TelefonoPlaza { get; set; }
    }
}

