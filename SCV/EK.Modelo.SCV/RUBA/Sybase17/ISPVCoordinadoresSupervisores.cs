using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_supervisores")]
    public interface ISPVCoordinadoresSupervisores
        : m.Kontrol.Interfaces.IBaseKontrol
    {
     
        [m.Kontrol.Column("id_identificador_cc")]
        string IdPlaza { get; set; }

        [m.Kontrol.Column("clave_coordinador")]
        int IdCoordinador { get; set; }

        [m.Kontrol.Column("clave_supervisor")]
        int IdSupervisor { get; set; }

    }

}