using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_Incidencias")]
    public interface IIncidencia
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdTicket { get; set; }

        [m.Kontrol.Column()]
        int IdComponente { get; set; }

        IComponenteIncidencia Componente { get; set; }


        [m.Kontrol.Column()]
        string ObservacionesCliente { get; set; }

        [m.Kontrol.Column()]
        string ObservacionesContratista { get; set; }



        [m.Kontrol.Column()]
        int IdContratista { get; set; }

        IContratista Contratista { get; set; }


        [m.Kontrol.Column()]
        int? IdUbicacionComponente { get; set; }

        IUbicacionComponente UbicacionComponente { get; set; }





        [m.Kontrol.Column()]
        DateTime FechaTerminoGarantia { get; set; }
        [m.Kontrol.Column()]
        DateTime FechaCierre { get; set; }

        [m.Kontrol.Column("IdFalla", true)]
        int IdFalla { get; set; }

        [m.Kontrol.Column()]
        int IdCausa { get; set; }
        m.SCV.Interfaces.ICausaIncidencia CausaIncidencia { get; set; }




        [m.Kontrol.Column()]
        int IdIncidenciaPadre { get; set; }

        [m.Kontrol.Column("Reincidencias", true)]
        int Reincidencias { get; set; }



        [m.Kontrol.Column()]
        int? DiasGarantia { get; set; }



        List<m.SCV.Interfaces.ITicketDictamen> Dictamenes { get; set; }



        [m.Kontrol.Column("IdEstatusIncidencia")]
        int IdEstatusIncidencia { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusIncidencia { get; set; }


        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }




    }
}