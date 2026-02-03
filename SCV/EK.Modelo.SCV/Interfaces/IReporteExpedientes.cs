using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    //[m.Kontrol.Table("uvw_SCV_ExpedientesReporte")]
    public interface IReporteExpedientes
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        List<m.SCV.Interfaces.IDesarrollos> Desarrollo { get; set; }

        List<m.SCV.Interfaces.ICliente> Cliente { get; set; }
        List<m.SCV.Interfaces.ITipoComercializacion> TipoComercializacion { get; set; }
        List<m.Kontrol.Interfaces.IItemGeneral> ExpedientesSeguimiento { get; set; }
        List<m.SCV.Interfaces.IEsquema> Esquemas { get; set; }
        List<m.SCV.Interfaces.IFaseExpediente> FaseExpediente { get; set; }

    }
}
