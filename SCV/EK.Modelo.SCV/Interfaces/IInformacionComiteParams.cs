using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IInformacionComiteParams : IBaseKontrol
    {
        int? IdInformacionComite { get; set; }
        DateTime? FechaConformacion { get; set; }
        bool Administradora { get; set; }
        string NombreAdministradora { get; set; }
        int Plaza { get; set; }
        string Fraccionamiento { get; set; }
        string Etapas { get; set; }
        int Segmento { get; set; }
        string Norte { get; set; }
        string Sur { get; set; }
        string Este { get; set; }
        string Oeste { get; set; }
        List<IIntegrantesInformacionComite> Integrantes { get; set; }
    }
}
