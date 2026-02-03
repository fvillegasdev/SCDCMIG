using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("Agenda")]
    public interface IAgendaSPV
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        int IdAgenda { get; set; }
        m.Kontrol.Interfaces.IAgenda Agenda { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoAgenda { get; set; }
        [m.Kontrol.Column()]
        int IdAgendaDetalle { get; set; }

       // List<m.SCV.Interfaces.IContratistaUbicacion> Contratistas { get; set; }
        //List<m.SCV.Interfaces.IClienteContactos> Contactos { get; set; }
        ///List<m.SCV.Interfaces.IReporteFallaDetalle> Partidas { get; set; }
        List<m.SCV.Interfaces.IOrdenTrabajoRUBA> OrdenesTrabajo { get; set; }



    }
}