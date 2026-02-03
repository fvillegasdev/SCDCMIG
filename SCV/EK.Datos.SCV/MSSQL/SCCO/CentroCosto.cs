using diSCO = EK.Datos.SCO.Interfaces;
using dKontrol = EK.Datos.Kontrol;
using mKontrol = EK.Modelo.Kontrol;
using System.Collections.Generic;
using System.Data;
using System;

namespace EK.Datos.SCO.MSSQL
{
    public partial class CentroCosto : EK.Datos.Kontrol.DAOBase, diSCO.ICentroCosto
    {
        private const string USP_CENTROSCOSTO_SELECT = "usp_centrocosto_select";

        public CentroCosto(mKontrol.Interfaces.IContainerFactory factory, dKontrol.Interfaces.IDBHelper helper)
        {
            base.factory = factory;
            base.helper = helper;
        }

        public object[] GetAll(int activos, int idUser)
        {
            try
            {
                var parameters = new Dictionary<string, object>()
                {
                    { "id", DBNull.Value },
                    { "activos", activos },
                    { "idUser", idUser }
                };

                return helper.CreateEntities(USP_CENTROSCOSTO_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}