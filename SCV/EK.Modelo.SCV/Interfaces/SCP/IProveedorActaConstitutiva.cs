using System;
using m = EK.Modelo;

namespace EK.Modelo.SCP.Interfaces
{
    [m.Kontrol.Table("Proveedores_ActasConstitutivas")]
    public interface IProveedorActaConstitutiva
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdProveedor { get; set; }
        [m.Kontrol.Column()]
        int? VolumenActa { get; set; }
        [m.Kontrol.Column()]
        string NombreNotario { get; set; }
        [m.Kontrol.Column()]
        int? NumNotario { get; set; }
        [m.Kontrol.Column()]
        DateTime? FechaActa { get; set; }
    }
}
