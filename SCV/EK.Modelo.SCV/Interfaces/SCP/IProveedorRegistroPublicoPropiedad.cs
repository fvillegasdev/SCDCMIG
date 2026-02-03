using m = EK.Modelo;

namespace EK.Modelo.SCP.Interfaces
{
    [m.Kontrol.Table("Proveedores_RegistroPublicoPropiedad")]
    public interface IProveedorRegistroPublicoPropiedad
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdProveedor { get; set; }
        [m.Kontrol.Column()]
        int? IdCiudad { get; set; }
        [m.Kontrol.Column()]
        int? Partida { get; set; }
        [m.Kontrol.Column()]
        int? Folio { get; set; }
        [m.Kontrol.Column()]
        int? Libro { get; set; }
        [m.Kontrol.Column()]
        int? Seccion { get; set; }
        [m.Kontrol.Column()]
        System.DateTime? FechaInscripcion { get; set; }
        
        m.Kontrol.Interfaces.ILocalidad Ciudad { get; set; }
    }
}
