using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IAsociacionCivilParams : IBaseKontrol
    {
        string NombreRazonSocial { get; set; }
        DateTime? FechaConstitucion { get; set; }
        string Notaria { get; set; }
        bool Administradora { get; set; }
        string NombreAdmin { get; set; }
        int IdComite { get; set; }
        string IdPlaza { get; set; }
        string IdFraccionamiento { get; set; }
        int IdSegmento { get; set; }
        string CuentaBancaria { get; set; }
        string CuotaMantenimiento { get; set; }
        double PorcentajeEntregado { get; set; }
        double FondoConvive { get; set; }
        string AltaHacienda { get; set; }
        bool HipotecaServicios { get; set; }
        List<IIntegrantesAsociacionCivil> Integrantes { get; set; }
    }
}
