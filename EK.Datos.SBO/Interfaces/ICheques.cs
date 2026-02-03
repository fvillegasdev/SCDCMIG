using EK.Modelo.SBO.Interfaces;
using System;


namespace EK.Datos.SBO.Interfaces
{
    public interface ICheques
    {
        object[] GetReporteCheques(int compania);
        object[] GetCheques(int? idBanco, int? idCuentaBancaria, DateTime? fechaInicio, DateTime? fechaFin, int? chequeInicial, 
                                int? chequeFinal, int? idCompania,int? idCheque,int? TipoCheque, int? Estatus);
        object[] GetChequesMaxMin( int idCuentaBancaria);

        ICheque GetById(int idCheque);

        ICheque GetConsecutivoCheque(int idCuentaBancaria, string tipoCheque);

        int Save(ICheque cheque);

        object[] CantidadLetra(decimal monto, string tipoMoneda);
    }
}
