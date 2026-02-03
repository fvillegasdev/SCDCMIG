#if BASE

using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_contratistasUbicaciones")]
    public interface IContratistaUbicacion : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        int IdContratista { get; set; }
        m.SCV.Interfaces.IContratista Contratista { get; set; }

        int IdUbicacion { get; set; }
        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }

        //[m.Kontrol.Column("default_rep_fallas")]
        string ContratistaPrincipal { get; set; }

        
        //List<m.SCV.Interfaces.IUbicaciones> Ubicaciones { get; set; }
        //List<m.SCV.Interfaces.IContratistaUbicacion> Contratistas { get; set; }
    }
}
#endif