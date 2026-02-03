using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_supervisores_cat")]
    public interface ISVPSupervisoresCAT 
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("id_identificador_cc")]
        string IdPlaza { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("ClaveX", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("clave_supervisor")]
        string clave_supervisor { get; set; }

        [m.Kontrol.Column("clave_cat")]
        string clave_cat { get; set; }

        List<ISPVCoordinadoresSupervisores> Supervisores { get; set; }

        [m.Kontrol.Column("Cantidad", true)]
        int Cantidad { get; set; }
    }
}
