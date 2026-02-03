using miKontrol = EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;
using System.Collections.Generic;

namespace EK.Modelo.SCP.Interfaces
{
    [m.Kontrol.Table("Proveedores")]
    public interface IProveedor 
        : miKontrol.IBaseKontrol
    {
        //string NombreCorto { get; set; }
        [m.Kontrol.Column()]
        int? IdTipoProveedor { get; set; }
        [m.Kontrol.Column()]
        int? IdTipoMovimientoProveedor { get; set; }
        [m.Kontrol.Column()]
        int? IdAsentamiento { get; set; }
        [m.Kontrol.Column()]
        int? IdEstadoOrigen { get; set; }
        [m.Kontrol.Column()]
        int? IdTipoPersona { get; set; }
        [m.Kontrol.Column("APaterno")]
        string ApellidoPaterno { get; set; }
        [m.Kontrol.Column("AMaterno")]
        string ApellidoMaterno { get; set; }
        [m.Kontrol.Column()]
        string NombreCorto { get; set; }
        [m.Kontrol.Column()]
        string Domicilio { get; set; }
        [m.Kontrol.Column()]
        string NumInterior { get; set; }
        [m.Kontrol.Column()]
        string NumExterior { get; set; }
        [m.Kontrol.Column()]
        string CURP { get; set; }
        [m.Kontrol.Column()]
        string RFC { get; set; }
        string EmailPrincipal { get; set; }
        string TelefonoPrincipal { get; set; }
        string CelularPrincipal { get; set; }
        [m.Kontrol.Column()]
        string NombreContacto { get; set; }
        [m.Kontrol.Column()]
        decimal? LimiteCredito { get; set; }
        [m.Kontrol.Column()]
        int? CondicionesPago { get; set; }
        [m.Kontrol.Column()]
        int? IdSociedad { get; set; }
        [m.Kontrol.Column()]
        int? IdTercero { get; set; }
        [m.Kontrol.Column()]
        int? IdOperacion { get; set; }

        [m.Kontrol.Column()]
        string Pyme { get; set; }
        [m.Kontrol.Column()]
        string IdentificacionFiscal { get; set; }
        [m.Kontrol.Column()]
        int? IdRegimen { get; set; }
        [m.Kontrol.Column()]
        int? IdNacionalidad { get; set; }
        [m.Kontrol.Column()]
        string Geolocalizacion { get; set; }

        m.Kontrol.Interfaces.IAsentamiento Asentamiento { get; set; }
        m.Kontrol.Interfaces.ILocalidad EstadoOrigen { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoPersona { get; set; }
        m.SCP.Interfaces.ITipoMovimientoProveedor TipoMovimientoProveedor { get; set; }
        m.SCP.Interfaces.ITipoProveedor TipoProveedor { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Sociedad { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Tercero { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Operacion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Regimen { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Nacionalidad { get; set; }

        List<m.SCP.Interfaces.IProveedorContactos> Telefonos { get; set; }
        List<m.SCP.Interfaces.IProveedorContactos> Correos { get; set; }
        List<m.SCP.Interfaces.IProveedorActaConstitutiva> ActasConstitutivas { get; set; }
        List<m.SCP.Interfaces.IProveedorRegistroPublicoPropiedad> RegistrosPublicosPropiedad { get; set; }
    }
}