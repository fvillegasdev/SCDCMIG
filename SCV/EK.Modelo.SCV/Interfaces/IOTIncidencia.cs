
using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_Incidencia_OT")]
    public interface IOTIncidencia
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        

        [m.Kontrol.Column("IdOT")]
        int IdOT { get; set; }

        [m.Kontrol.Column("IdIncidencia")]
        int IdIncidencia { get; set; }

        
        m.SCV.Interfaces.IIncidencia Incidencia { get; set; }
        m.SCV.Interfaces.IOrdenTrabajo OrdenTrabajo { get; set; }



        /*Propiedades Anuladas*/
        [Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [Kontrol.Column("IdEstatus", true)]
        new string IdEstatus { get; set; }

        [Kontrol.Column("CreadoPor", true)]
        new int CreadoPor { get; set; }


    }
}
