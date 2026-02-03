using System;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("Citas")]
    public interface ICitas 
        : IBaseKontrol
    {
        [Column()]
        int IdTipoCitas { get; set; }
        mo.ITipoCitas TipoCitas { get; set; }

        [Column()]
        int IdAsignadoA { get; set; }
        mo.IUsuario AsignadoA { get; set; }


        [Column()]
        int? IdCliente { get; set; }
        IItemGeneral Cliente { get; set; }

        [Column()]
        int? IdExpediente { get; set; }
        IItemGeneral Expediente { get; set; }

        [Column()]
        string Descripcion { get; set; }

        [Column()]
        int? IdLocalidad { get; set; }
        m.Kontrol.Interfaces.IAsentamiento Localidad { get; set; }


        [Column()]
        DateTime? FechaInicio { get; set; }

        [Column()]
        DateTime? FechaFin { get; set; }


        [Column()]
        bool? Asistio { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [Column()]
        string Geolocalizacion { get; set; }
    }
}
