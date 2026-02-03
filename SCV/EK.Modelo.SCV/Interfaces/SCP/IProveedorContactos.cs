using m = EK.Modelo;
namespace EK.Modelo.SCP.Interfaces
{
    [m.Kontrol.Table("Proveedores_Contactos")]
    public interface IProveedorContactos
        :m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdProveedor { get; set; }

        [m.Kontrol.Column()]
        int IdTipoContacto { get; set; }


        [m.Kontrol.Column()]
        int? IdTipoTelefono { get; set; }

        [m.Kontrol.Column()]
        string Contacto { get; set; }

        [m.Kontrol.Column()]
        string Cargo { get; set; }

        [m.Kontrol.Column()]
        string Extension { get; set; }

        [m.Kontrol.Column()]
        bool Titular { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }


        m.SCP.Interfaces.IProveedor Proveedor { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoTelefono { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoContacto { get; set; }
    }
}
