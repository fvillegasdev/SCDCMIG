using System;
using System.Collections.Generic;

namespace EK.Modelo.Kontrol.Interfaces
{
#if MSSQL
    [Table("usuariosEK")]
#endif
#if SYBASE17
     [Table("usuariosEK")]
#endif
    public interface IUsuario
        : IBaseKontrol
    {
        [Column()]
        string Apellidos { get; set; }


        [Column()]
        string Telefono { get; set; }


        [Column()]
        string Email { get; set; }


        [Column()]
        DateTime? VigenciaFin { get; set; }


        [Column()]
        DateTime? VigenciaInicio { get; set; }


        [Column()]
        DateTime? InicioOperaciones { get; set; }
        
        [Column()]
        string UUID { get; set; }


                [Column()]
        int? IdAreaOrganizacion { get; set; }

        [Column()]
        bool Bloqueado { get; set; }

        [Column()]
        int IdTimeZone { get; set; }

        [Column()]
        int IdIdioma { get; set; }


        [Column()]
        int Intentos { get; set; }


        [Column()]
        int? IdDashBoard { get; set; }


        [Column()]
        string Password { get; set; }

        [Column("RutaDashBoard", true)]
        string RutaDashBoard { get; set; }


        string Foto { get; set; }
        bool Interno { get; set; }
        int? IdPosicion { get; set; }
        int? IdCliente { get; set; }
        string LinkReferencia { get; set; }

        int? IdAgente { get; set; }


        IPosicion Posicion { get; set; }
        IItemGeneral TimeZone { get; set; }
        IItemGeneral Idioma { get; set; }
        IItemGeneral AreaOrganizacion { get; set; }
        IItemGeneral DashBoard { get; set; }
        List<ICatalogoClasificador> Clasificadores { get; set; }
        List<IUsuarioNivelCompania> Niveles { get; set; }
        int NivelUsuario { get; set; }

    }
}