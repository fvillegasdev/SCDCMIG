using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Sindicatos")]

    public interface ISindicato
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string Domicilio { get; set; }
        [m.Kontrol.Column()]
        int IdLocalidad { get; set; }
        m.Kontrol.Interfaces.IAsentamiento Localidad { get; set; }
        [m.Kontrol.Column()]
        string Telefono { get; set; }
        [m.Kontrol.Column()]
        string Telefono2 { get; set; }
        [m.Kontrol.Column()]
        string Celular { get; set; }
        [m.Kontrol.Column()]
        string Fax { get; set; }
        [m.Kontrol.Column()]
        string Email { get; set; }
        [m.Kontrol.Column()]
        string Contacto { get; set; }
        [m.Kontrol.Column()]
        int IdAgente { get; set; }
        m.Kontrol.Interfaces.IUsuario Agente { get; set; }
        [m.Kontrol.Column()]
        int IdAgenteExterno { get; set; }
        m.Kontrol.Interfaces.IUsuario AgenteExterno { get; set; }

    }

}

//using EK.Modelo.Kontrol.Interfaces;
//using System;
//using System.Collections.Generic;
//using m = EK.Modelo;
//namespace EK.Modelo.SCV.Interfaces
//{
//    //public interface ISindicato : IBaseKontrol
//    //{
//    //    [m.Kontrol.Table("scv_Sindicatos")]

//    //    string Domicilio { get; set; }
//    //    ILocalidad Localidad { get; set; }
//    //    string Telefono { get; set; }
//    //    string Telefono2 { get; set; }
//    //    string Celular { get; set; }
//    //    string Fax { get; set; }
//    //    string Email { get; set; }
//    //    string Contacto { get; set; }
//    //    IUsuario Agente { get; set; }
//    //    IUsuario AgenteExterno { get; set; }
//    //}
//    public interface ISindicato
//    : m.Kontrol.Interfaces.IBaseKontrol
//    {
//    }
//}

