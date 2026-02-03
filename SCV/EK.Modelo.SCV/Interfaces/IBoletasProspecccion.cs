using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mkontrol = EK.Modelo.Kontrol;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_BoletasProspeccion")]
    public interface IBoletasProspecccion
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column("APaterno")]
        string ApellidoPaterno { get; set; }

        [m.Kontrol.Column("AMaterno")]
        string ApellidoMaterno { get; set; }
        [m.Kontrol.Column("HNombre")]
        string HNombre { get; set; }

        [m.Kontrol.Column("NombreCompleto", true)]
        string NombreCompleto { get; set; }

        [m.Kontrol.Column()]
        string Domicilio { get; set; }

        [m.Kontrol.Column()]
        string NumeroExterior { get; set; }

        [m.Kontrol.Column()]
        string Correo { get; set; }

        [m.Kontrol.Column()]
        string Celular { get; set; }

        [m.Kontrol.Column()]
        string Telefono { get; set; }

        [m.Kontrol.Column()]
        int? IdGenero { get; set; }

        [m.Kontrol.Column()]
        int? IdAsentamiento { get; set; }

        [m.Kontrol.Column()]
        int? IdDesarrollo { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaNacimiento { get; set; }

        [m.Kontrol.Column()]
        string NSS { get; set; }

        [m.Kontrol.Column()]
        int? IdPaisOrigen { get; set; }

        [m.Kontrol.Column()]
        string RFC { get; set; }

        [m.Kontrol.Column()]
        string CURP { get; set; }


        [m.Kontrol.Column()]
        decimal? MontoPrecalificado { get; set; }

        [m.Kontrol.Column()]
        decimal? MontoCredito { get; set; }

        [m.Kontrol.Column()]
        int? IdGiro { get; set; }

        [m.Kontrol.Column()]
        int? IdLugarProspeccion { get; set; }

        [m.Kontrol.Column()]
        int? IdResidenciaActual { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoPersona { get; set; }

        [m.Kontrol.Column()]
        int? IdEstadoOrigen { get; set; }

        [m.Kontrol.Column()]
        int? IdCampaniaPublicidad { get; set; }

        [m.Kontrol.Column()]
        int? IdPuntoVenta { get; set; }

        [m.Kontrol.Column()]
        int? IdMedioPublicidad { get; set; }

        [m.Kontrol.Column()]
        int? IdMotivoRechazo { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaAccion { get; set; }


        [m.Kontrol.Column()]
        int? IdUsuarioAccion { get; set; }


        [m.Kontrol.Column()]
        int? IdCliente { get; set; }


        [m.Kontrol.Column()]
        int? IdOrigen { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoFinanciamiento { get; set; }

        [m.Kontrol.Column()]
        string IdSource { get; set; }


        [m.Kontrol.Column()]
        string Comentarios { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }


        m.Kontrol.Interfaces.IItemGeneral Origen { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Giro { get; set; }
        m.Kontrol.Interfaces.IItemGeneral MedioPublicidad { get; set; }
        m.SCV.Interfaces.ICampaniaPublicidad CampaniaPublicidad { get; set; }
        m.SCV.Interfaces.IPuntoVenta PuntoVenta { get; set; }
        m.Kontrol.Interfaces.IItemGeneral ResidenciaActual { get; set; }
        m.Kontrol.Interfaces.IItemGeneral MotivoRechazo { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoPersona { get; set; }
        m.SCV.Interfaces.ITipoFinanciamiento TipoFinanciamiento { get; set; }
        m.Kontrol.Interfaces.IAsentamiento Asentamiento { get; set; }
        m.Kontrol.Interfaces.IAsentamiento LugarProspeccion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Genero { get; set; }
        m.Kontrol.Interfaces.IItemGeneral PaisOrigen { get; set; }
        m.SCV.Interfaces.IDesarrollos Desarrollo { get; set; }

        m.Kontrol.Interfaces.ILocalidad EstadoOrigen { get; set; }

        m.SCV.Interfaces.ICliente Cliente { get; set; }
        List<m.Kontrol.Interfaces.IPersonalizarCampo_Valor> CUSTOMFORM { get; set; }

    }
}
