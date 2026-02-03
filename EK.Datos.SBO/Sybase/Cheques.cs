using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.SBO.Interfaces;
using dao = EK.Datos.SBO.Interfaces;
using db = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo.SBO;
using im = EK.Modelo.Kontrol.Interfaces;
using System.Data;

namespace EK.Datos.SBO.Sybase
{
    public partial class Cheques
        : dao.ICheques
    {
        private const string USP_CHEQUES_REPORT = "{call rm.usp_cheques_reporte(?)}";
        private const string USP_MONTOCANTIDAD_REPORT = "{call usp_CantidadLetras(?,?)}";

        private db.IDBHelper helper = null;

        public Cheques(im.IContainerFactory factory, db.IDBHelper helper)
        {
            this.helper = helper;
        }

        public object[] CantidadLetra(decimal monto, String tipoMoneda)
        {
            object[] retValue = null;
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "Numero",monto},
                    { "tipoMoneda", tipoMoneda }
                };


                retValue = helper.CreateEntities(USP_MONTOCANTIDAD_REPORT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
            return retValue;
        }

        public object[] GetReporteCheques(int idCompania)
        {
            object[] retValue = null;

            try
            {
                var parameters = this.helper.CreateParameters(idCompania);

                retValue = helper.CreateEntities(USP_CHEQUES_REPORT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue;
        }



    }
}
