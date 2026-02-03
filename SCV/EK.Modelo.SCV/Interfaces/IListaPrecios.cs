using System;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;
using System.Collections.Generic;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ListaPrecios")]
    public interface IListaPrecios : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdVersion { get; set; }

        [m.Kontrol.Column()]
        decimal? ValorAutorizado { get; set; }

        [m.Kontrol.Column()]
        decimal? ValorComisionable { get; set; }

        [m.Kontrol.Column()]
        decimal? ValorBase { get; set; }

        [m.Kontrol.Column()]
        int IdUbicacion { get; set; }


        [m.Kontrol.Column()]
        decimal? ValorAvaluo { get; set; }

        [m.Kontrol.Column()]
        DateTime? ValorAvaluoVigencia { get; set; }


        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        //Propiedades Adiconales
        decimal? ValorCalculado { get; set; }
        bool HasCaracteristicas { get; set; }
        decimal TotalCaracteristicas { get; set; }
        decimal? ValorUbicacion { get; set; }


        decimal? TotalCAdicionales { get; set; }

        List<IEntidadCaracteristica> Caracteristicas { get; set; }
        IDesarrolloPrototipo DesarrollosPrototipos { get; set; }
        IUbicaciones Ubicacion { get; set; }

        IListaPreciosVersiones ListaPreciosVersion { get; set; }
    }
}