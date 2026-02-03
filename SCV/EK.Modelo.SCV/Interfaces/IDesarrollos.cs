using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SBO.Interfaces;
using EK.Modelo.SCO.Interfaces;
using System.Collections.Generic;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Desarrollos")]
    public interface IDesarrollos
        : m.Kontrol.Interfaces.IBaseKontrolCompania
    {
        [m.Kontrol.Column()]
        int? IdCentroCosto { get; set; }


        [m.Kontrol.Column()]
        string Direccion { get; set; }

        [m.Kontrol.Column()]
        int? IdLocalidad { get; set; }


        [m.Kontrol.Column()]
        string Descripcion { get; set; }

        [m.Kontrol.Column()]
        int? IdNotario { get; set; }

        INotario Notario { get; set; }
        [m.Kontrol.Column()]
        int? IdMoneda { get; set; }
        [m.Kontrol.Column()]
        string NombreRep { get; set; }

        [m.Kontrol.Column()]

        string TelefonoRep { get; set; }
        [m.Kontrol.Column()]

        string ExtensionRep { get; set; }
        [m.Kontrol.Column()]
        string Sector { get; set; }
        [m.Kontrol.Column()]
        bool SegmentaPrecios { get; set; }
        [m.Kontrol.Column()]

        string ClaveConjunto { get; set; }
        [m.Kontrol.Column()]
        string NombreAcreedor { get; set; }
        [m.Kontrol.Column()]
        string RFCAcreedor { get; set; }
        [m.Kontrol.Column()]
        string ClabeAcreedor { get; set; }

        [m.Kontrol.Column()]
        string Geolocalizacion { get; set; }


        [m.Kontrol.Column()]
        decimal PrecioExcedenteM2 { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        bool? Mapa2D { get; set; }


        [m.Kontrol.Column()]
        int IdPosicion { get; set; }

        [m.Kontrol.Column()]
        int IdPlaza { get; set; }

        [m.Kontrol.Column()]
        int? IdGrupoEntrega { get; set; }

        List<IDesarrolloConceptosPago> ConceptosPago { get; set; }
        List<IDesarrolloMotivoCancelacion> MotivosCancelacion { get; set; }

        List<IDesarrolloPrototipo> Prototipos { get; set; }
        List<IDesarrolloCuentas> Cuentas { get; set; }
        List<IDesarrolloEsquema> Esquemas { get; set; }
        List<IDesarrollosFinanciamiento> Financiamientos { get; set; }
        List<IDesarrolloCentrosCosto> DesarrollosCCIngresos { get; set; }
        List<IDesarrolloCentrosCosto> DesarrollosCCConstruccion { get; set; }
        List<IDesarrolloTiposComercializacion> TiposComercializacion { get; set; }
        List<IEntidadCaracteristica> Caracteristicas { get; set; }

        List<IDesarrolloFormatoClave> FormatoClave { get; set; }

        List<IDesarrolloFaseGrupo> RelacionFaseGrupo { get; set; }


        m.Kontrol.Interfaces.IAsentamiento Localidad { get; set; }
        m.Kontrol.Interfaces.IMoneda Moneda { get; set; }
        IPlaza Plaza { get; set; }
        IPosicion Posicion { get; set; }
        IItemGeneralValores  GrupoEntrega { get; set; }
}
}