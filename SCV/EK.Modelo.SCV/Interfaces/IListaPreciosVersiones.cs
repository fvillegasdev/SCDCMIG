using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ListaPreciosVersiones")]
    public interface IListaPreciosVersiones
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }


        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        [m.Kontrol.Column()]
        int IdTipoOperacion { get; set; }

        [m.Kontrol.Column()]
        int IdDesarrollo { get; set; }


        [m.Kontrol.Column()]
        DateTime VigenteDesde { get; set; }

        [m.Kontrol.Column()]
        DateTime VigenteHasta { get; set; }


        [m.Kontrol.Column()]
        int? IdExtensionVigencia { get; set; }
        

        [m.Kontrol.Column()]
        int NVersion { get; set; }


        [m.Kontrol.Column()]
        decimal PrecioExcedenteM2 { get; set; }

        [m.Kontrol.Column()]
        decimal PrecioExcedenteM2Version { get; set; }

        bool Vigente {get;set;}

        m.SCV.Interfaces.ITipoComercializacion TipoOperacion { get; set; }
        m.SCV.Interfaces.IDesarrollos Desarrollo { get; set; }


        m.SCV.Interfaces.ILPExtensionVigencia ExtensionVigencia { get; set; }
        List<m.SCV.Interfaces.IListaPrecios> listaPreciosUbicaciones { get; set; }


        


    }
}