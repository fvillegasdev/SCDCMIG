using System;
using System.Collections.Generic;
using System.Data;
using miSCP = EK.Modelo.SCP.Interfaces;

namespace EK.Datos.SCP.MSSQL
{
    public partial class PagosProgramados
    {
        public List<miSCP.IPagosProgramados> Get(int idcompania, int proveedorini, int proveedorfin, string ccInicial, string ccFinal, DateTime fechaCorte)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idcompania",idcompania},
                    { "fechacorte",fechaCorte},
                    { "ccinicial",ccInicial},
                    { "ccfinal",ccFinal },
                    { "proveedorini",proveedorini},
                    { "proveedorfin",proveedorfin}
                };

                return helper.CreateEntities<miSCP.IPagosProgramados>(SP_PAGOS_PROGRAMADOS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }
    }
}