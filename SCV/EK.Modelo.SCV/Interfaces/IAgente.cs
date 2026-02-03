using System;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("usuariosAgentes")]
    public interface IAgente
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Apellidos", true)]
        string Apellidos { get; set; }

        [m.Kontrol.Column()]
        int IdUsuario { get; set; }


        [m.Kontrol.Column()]
        int? IdProveedor { get; set; }


        [m.Kontrol.Column()]
        int? IdRegimen { get; set; }

        m.SCP.Interfaces.IProveedor Proveedor { get; set; }
        [m.Kontrol.Column()]
        bool Comisionable { get; set; }
        [m.Kontrol.Column()]
        bool AsesorCredito { get; set; }
        [m.Kontrol.Column()]
        decimal LimitePagare { get; set; }
        m.Kontrol.Interfaces.IUsuario Usuario { get; set; }

        m.SCV.Interfaces.IRegimen Regimen { get; set; }
    }
}