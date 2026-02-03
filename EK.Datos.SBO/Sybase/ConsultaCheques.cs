using EK.Modelo.SBO.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using m = EK.Modelo.SBO;

namespace EK.Datos.SBO.Sybase
{
    public partial class Cheques
    {
        private const string USP_CHEQUES_SELECT = "{call usp_cheques_select(?,?,?,?,?,?,?,?)}";
        private const string USP_CHEQUES_SELECTMAX_MIN = "{call usp_cheques_selectMaxMin(?)}";
        private const string USP_CHEQUE_CONSECUTIVO = "{call usp_cheques_consecutivo(?,?)}";
        private const string USP_CHEQUE_INS_UPD = "{call usp_cheques_ins_upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";


        public object[] GetCheques(int? idBanco, int? idCuentaBancaria, DateTime? fechaInicio, DateTime? fechaFin,int? chequeInicial, 
                                int? chequeFinal, int? idCompania, int? idCheque, int? TipoCheque, int? Estatus)
        {
            object[] retValue = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdBanco", idBanco },
                    { "IdCuentaBancaria", idCuentaBancaria},
                    { "FechaInicio", fechaInicio},
                    { "FechaFin", fechaFin},
                    { "ChequeInicial", chequeInicial},
                    { "ChequeFinal", chequeFinal},
                    { "IdCompania", idCompania},
                    { "IdCheque", idCheque},
                    { "IdTipoCheque", TipoCheque},
                    { "Estatus", Estatus}
                };

                retValue = helper.CreateEntities(USP_CHEQUES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue;
        }

        public ICheque GetById(int idCheque)
        {
            m.Interfaces.ICheque retValue = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdBanco", DBNull.Value },
                    { "IdCuentaBancaria", DBNull.Value},
                    { "FechaInicio", DBNull.Value},
                    { "FechaFin", DBNull.Value},
                    { "ChequeInicial", DBNull.Value},
                    { "ChequeFinal", DBNull.Value},
                    { "IdCompania", DBNull.Value},
                    { "IdCheque", idCheque},
                          { "IdTipoCheque", DBNull.Value},
                    { "Estatus", DBNull.Value}
                };

                retValue = helper.CreateSingleEntity<m.Interfaces.ICheque>(USP_CHEQUES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue;
        }

        public object[] GetChequesMaxMin(int idCuentaBancaria)
        {
            object[] retValue = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdCuentaBancaria", idCuentaBancaria}
                };

                retValue = helper.CreateEntities(USP_CHEQUES_SELECTMAX_MIN, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue;
        }


        public int Save(ICheque model)
        {
            int result = 0;
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "Id",model.ID},
                    { "NumeroCheque", model.NumeroCheque },
                    { "Descripcion", model.Descripcion },
                    { "Monto", model.Monto},
                    { "FechaMovimiento", model.FechaMovimiento },
                    { "Concepto1", model.Concepto1},
                    { "IdCuentaBancaria", model.CuentaBancaria.ID },
                    //{ "IdTipoMovimiento", model.TipoMovimiento.ID },
                    { "IdCompania", model.IdCompania},
                    { "IdTipoCheque", model.TipoCheque },
                    { "IdPoliza", model.Poliza.NumeroPoliza},
                    { "IdTipoPoliza", model.Poliza.TipoPoliza.ID },
                    { "IdCC", model.CC.ID },
                    { "IdEstado", model.EstadoCheque },
                    { "IdEstatus", model.IdEstatus },
                    { "CreadoPor", model.IdCreadoPor },
                    { "ModificadoPor", model.IdModificadoPor },
                    { "IdProveedor", model.Proveedor.ID}
                };


                result = helper.GetResult(USP_CHEQUE_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch
            {

                throw;
            }
            return result;
        }
        public ICheque CancelarCheque(int idCheque)
        {
            throw new NotImplementedException();
        }
        public ICheque GetConsecutivoCheque(int idCuentaBancaria, string tipoCheque)
        {
            m.Interfaces.ICheque retValue = null;

            try
            {
                var parameters = new Dictionary<string, object>
                {

                    { "IdCuentaBancaria", idCuentaBancaria},
                    { "TipoCheque", tipoCheque}
                };

                retValue = helper.CreateSingleEntity<m.Interfaces.ICheque>(USP_CHEQUE_CONSECUTIVO, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue;
        }


    }
}
