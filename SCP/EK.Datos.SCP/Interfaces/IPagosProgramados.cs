using System;
using System.Collections.Generic;
using miSCP = EK.Modelo.SCP.Interfaces;

namespace EK.Datos.SCP.Interfaces
{
    public interface IPagosProgramados
    {
        List<miSCP.IPagosProgramados> Get(int idcompania, int proveedorini, int proveedorfin, string ccInicial, string ccFinal, DateTime fechaCorte);
    }
}