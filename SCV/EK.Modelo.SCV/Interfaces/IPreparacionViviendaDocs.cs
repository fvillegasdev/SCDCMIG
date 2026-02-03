using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{

    public interface IPreparacionViviendaDocs : IBaseKontrol
    {

        //m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }

        //m.SCV.Interfaces.IEtapa Etapa { get; set; }

        //m.SCV.Interfaces.IPrototipo Prototipo { get; set; }

        //m.Kontrol.Interfaces.IClientesSPV Cliente { get; set; } //cliente SPV

        [m.Kontrol.Column()]
        string AreaConstruccion { get; set; }
        [m.Kontrol.Column()]
        string Superficie { get; set; }
        [m.Kontrol.Column()]
        string AreaHabitable { get; set; }
        [m.Kontrol.Column()]
        string Ciudad { get; set; }
        [m.Kontrol.Column()]
        //string Coordinador { get; set; }
        //[m.Kontrol.Column()]
        string DireccionOficial { get; set; }
        [m.Kontrol.Column()]
        string Estado { get; set; }
        [m.Kontrol.Column()]
        string Etapa { get; set; }
        [m.Kontrol.Column()]
        string NumeroExterior { get; set; }
        [m.Kontrol.Column()]
        DateTime FechaActual { get; set; }
        [m.Kontrol.Column()]
        DateTime FechaEntrega { get; set; }
        [m.Kontrol.Column()]
        DateTime FechaLiberacion { get; set; }
        [m.Kontrol.Column()]
        DateTime FechaProgramacion { get; set; }
        [m.Kontrol.Column()]
        string Lote { get; set; }
        [m.Kontrol.Column()]
        string Manzana { get; set; }
        [m.Kontrol.Column()]
        string NombreFraccionamiento { get; set; }
        [m.Kontrol.Column()]
        string NombreCliente { get; set; }
        [m.Kontrol.Column()]
        string NombreComercial { get; set; }
        [m.Kontrol.Column()]
        string NumeroInterior { get; set; }
        [m.Kontrol.Column()]
        string NumeroCliente { get; set; }
        [m.Kontrol.Column()]
        string Responsable { get; set; }
        [m.Kontrol.Column()]
        string TelefonoCasa { get; set; }
        [m.Kontrol.Column()]
        string TelefonoOficina { get; set; }
        [m.Kontrol.Column()]
        string TelefonoOtros { get; set; }
        [m.Kontrol.Column()]
        string GerentePostVenta { get; set; }
        [m.Kontrol.Column()]
        string NombreCompania { get; set; }
        [m.Kontrol.Column()]
        string LugarHoraEntrega { get; set; }
        string CveFracc { get; set; }
        bool EsCoacreditado { get; set; }
        string NombreCoacreditado { get; set; }
    }
}
