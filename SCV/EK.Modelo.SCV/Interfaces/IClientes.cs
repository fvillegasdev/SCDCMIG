using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_clientes")]
    public interface ICliente
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Apaterno")]
        string ApellidoPaterno { get; set; }


        [m.Kontrol.Column("Amaterno")]
        string ApellidoMaterno { get; set; }

        string NombreCompleto { get; set; }

        [m.Kontrol.Column()]
        string HNombre { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaNacimiento { get; set; }


        [m.Kontrol.Column()]
        string RFC { get; set; }

        [m.Kontrol.Column()]
        string NSS { get; set; }


        [m.Kontrol.Column()]
        string CURP { get; set; }


        [m.Kontrol.Column()]
        string Domicilio { get; set; }


        [m.Kontrol.Column()]
        string NumInterior { get; set; }

        [m.Kontrol.Column()]
        string NumExterior { get; set; }

        [m.Kontrol.Column()]
        int? IdGiro { get; set; }


        [m.Kontrol.Column()]
        int? AntiguedadDomicilio { get; set; }


        [m.Kontrol.Column()]
        int? IdAsentamiento { get; set; }

        [m.Kontrol.Column()]
        int? IdEstadoCivil { get; set; }

        [m.Kontrol.Column()]
        int? IdRegimenConyugal { get; set; }

        [m.Kontrol.Column()]
        int? IdEstadoOrigen { get; set; }

        [m.Kontrol.Column()]
        int? IdPaisOrigen { get; set; }

        [m.Kontrol.Column()]
        int? IdRangoIngresos { get; set; }


        [m.Kontrol.Column()]
        int? IdGenero { get; set; }


        [m.Kontrol.Column()]
        int? IdTipoPersona { get; set; }


        [m.Kontrol.Column()]
        string Geolocalizacion { get; set; }

        [m.Kontrol.Column()]
        bool? Prospecto { get; set; }

        [m.Kontrol.Column()]
        int? IdEstatusCliente { get; set; }


        [m.Kontrol.Column()]
        bool? Discapacidad { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaCliente { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaContacto { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaProspecto { get; set; }



        [m.Kontrol.Column()]
        int? IdRepresentanteLegal { get; set; }

        string EmailPrincipal { get; set; }
        string TelefonoPrincipal { get; set; }
        string CelularPrincipal { get; set; }

        m.Kontrol.Interfaces.IAsentamiento Asentamiento { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstadoCivil { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Giro { get; set; }
        m.Kontrol.Interfaces.IItemGeneral RegimenConyugal { get; set; }
        m.Kontrol.Interfaces.ILocalidad EstadoOrigen { get; set; }
        m.Kontrol.Interfaces.IItemGeneral PaisOrigen { get; set; }
        IRangoIngresos RangoIngresos { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Genero { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoPersona { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusCliente { get; set; }
        IClienteAdicional InformacionAdicional { get; set; }
        List<m.SCV.Interfaces.IClienteReferencia> Referencias { get; set; }
        List<m.SCV.Interfaces.IClienteRefLaboral> RefLaborales { get; set; }
        List<m.SCV.Interfaces.IClienteAsesores> Asesores { get; set; }
        List<m.SCV.Interfaces.IClienteContactos> Telefonos { get; set; }
        List<m.SCV.Interfaces.IClienteContactos> Correos { get; set; }
        List<m.Kontrol.Interfaces.IPersonalizarCampo_Valor> CUSTOMFORM { get; set; }
        List<m.Kontrol.Interfaces.IBitacora> Bitacora { get; set; }

        List<m.SCV.Interfaces.IBoletasProspecccion> Boletas { get; set; }


        m.SCV.Interfaces.IClienteReferencia Conyugue { get; set; }


        ICliente RepresentanteLegal { get; set; }
    }
}
