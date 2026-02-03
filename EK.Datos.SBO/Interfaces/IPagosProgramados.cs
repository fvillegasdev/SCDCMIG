using System;

namespace EK.Datos.SBO.Interfaces
{
    public interface IPagosProgramados
    {
        object[] Get(int proveedor, string ccInicial, string ccFinal, DateTime fechaCorte);
    }
}