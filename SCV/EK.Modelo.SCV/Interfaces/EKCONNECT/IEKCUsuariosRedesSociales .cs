using System;
using m = EK.Modelo;



namespace EK.Modelo.SCV.Interfaces.EKCONNECT
{
    [m.Kontrol.Table("usuariosRedesSociales")]
    public interface IEKCUsuariosRedesSociales : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Apellidos", true)]
        string Apellidos { get; set; }

        [m.Kontrol.Column("Foto", true)]
        string Foto { get; set; }

        [m.Kontrol.Column("InformacionAdicional", true)]
        string InformacionAdicional { get; set; }

        [m.Kontrol.Column("FechaNacimiento", true)]
        DateTime FechaNacimiento {get;set;}

        [m.Kontrol.Column("RFC", true)]
        string RFC { get; set; }

        [m.Kontrol.Column("CURP", true)]
        string CURP { get; set; }

        [m.Kontrol.Column("NSS", true)]
        string NSS { get; set; }

        [m.Kontrol.Column("IdAsentamiento", true)]
        int IdAsentamiento { get; set; }

        [m.Kontrol.Column("Domicilio", true)]
        string Domicilio { get; set; }

        [m.Kontrol.Column("IdRangoIngresos", true)]
        int IdRangoIngresos { get; set; }

        [m.Kontrol.Column("IdDesarrollo", true)]
        string IdDesarrollo {get;set;}

        [m.Kontrol.Column("IdPrototipo", true)]
        int IdPrototipo { get; set; }

        [m.Kontrol.Column("IdCampania", true)]
        int IdCampania { get; set; }

        [m.Kontrol.Column("IdMedio", true)]
        int IdMedio { get; set; }

        [m.Kontrol.Column("IdOrigen", true)]
        int IdOrigen { get; set; }

        [m.Kontrol.Column("FechaConvertido", true)]
        DateTime FechaConvertido { get; set; }

        [m.Kontrol.Column("IdBoletaProspeccion", true)]
        int IdBoletaProspeccion { get; set; }

        [m.Kontrol.Column("IdEstatusUsuario", true)]
        int IdEstatusUsuario { get; set; }

        [m.Kontrol.Column("FechaCalificado", true)]
        DateTime FechaCalificado { get; set; }

        [m.Kontrol.Column("VolverContactarCliente", true)]
        DateTime VolverContactarCliente { get; set; }

        [m.Kontrol.Column("AtiendeChatbot", true)]
        bool AtiendeChatbot { get; set; }

    }
}
