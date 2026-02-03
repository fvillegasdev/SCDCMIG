using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IInformacionComite : IBaseKontrol
    {
        DateTime? FechaConformacion { get; set; }
        bool Administradora { get; set; }
        string NombreAdministradora { get; set; }
        int? IdPlaza { get; set; }
        string Plaza { get; set; }
        string Fraccionamiento { get; set; }
        string IdFraccionamiento { get; set; }
        string Etapas { get; set; }
        string EtapasDesc { get; set; }
        int? IdSegmento { get; set; }
        string Segmento { get; set; }
        int? IdAreaGeografica { get; set; }
        string NombreAreaGeografica { get; set; }
        string Norte { get; set; }
        string Sur { get; set; }
        string Este { get; set; }
        string Oeste { get; set; }
        List<IIntegrantesInformacionComite> Integrantes { get; set; }
    }
}
