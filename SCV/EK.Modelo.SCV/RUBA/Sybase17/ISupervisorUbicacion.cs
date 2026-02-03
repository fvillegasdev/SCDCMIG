using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sm_fraccionamiento_lote")]
    public interface ISupervisorUbicacion : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Descripcion", true)]
        string Descripcion { get; set; }
   
        [m.Kontrol.Column("clave_coordinador")]
        int? IdCoordinador { get; set; }
        m.Kontrol.Interfaces.IUsuario Coordinador { get; set; }

        [m.Kontrol.Column("clave_supervisor")]
        int? IdSupervisor { get; set; }
        m.Kontrol.Interfaces.IUsuario Supervisor { get; set; }

        [m.Kontrol.Column("lote_id",true)]
        int? IdUbicacion { get; set; }
        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }
        List<m.SCV.Interfaces.IUbicaciones> Ubicaciones { get; set; }
    }
}