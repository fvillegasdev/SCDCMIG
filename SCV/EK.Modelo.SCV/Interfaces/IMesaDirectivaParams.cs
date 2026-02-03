using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IMesaDirectivaParams: IBaseKontrol
    {
        string NombreComiteVecinal{ get; set; }
        DateTime? FechaConstitucion { get; set; }
        bool Administradora { get; set; }
        string NombreAdmin { get; set; }
        int IdComite{ get; set; }
        int IdPlaza { get; set; }
        string IdFraccionamiento { get; set; }
        int IdSegmento { get; set; }
        string CuotaMantenimiento { get; set; }
        double FondoConvive { get; set; }
        double FondoEconomicoInicial { get; set; }
        double PorcentajeEntregado { get; set; }
        bool HipotecaServicios { get; set; }
        List<IIntegrantesAsociacionCivil> Integrantes { get; set; }
    }
}
