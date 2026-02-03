using System;
using mdl = EK.Modelo.SBO.Interfaces;

namespace EK.Procesos.SBO.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("Cheques")]
    public interface ICheques
        : Kontrol.Interfaces.IBaseProceso
    {
        object[] GetReporteCheques();
        object[] GetCheques(string FormJson);
        mdl.ICheque GetById(int idCheque);
        mdl.ICheque Save(string cheque);
        mdl.ICheque CancelarCheque(int idCheque);

        mdl.ICheque RetenerCheque(int idCheque);

        mdl.ICheque GenerarBatch();

        int GenerarChequesAutomaticos(string pagos);

        int GetConsecutivoCheque(int idCuentaBancaria, string tipoCheque);
        string CantidadLetra(decimal monto, string  tipoMoneda);

    }
}
