using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_coordinadores")]
    public interface ISPVCoordinadores
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("id_identificador_cc")]
        string IdPlaza { get; set; }
        
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        List<ISPVCoordinadoresSupervisores> Supervisores { get; set; }

        [m.Kontrol.Column("Cantidad", true)]
        int Cantidad { get; set; }
    }
}