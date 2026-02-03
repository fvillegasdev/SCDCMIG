using System;
using System.Collections.Generic;
using System.Data;

using System.Threading.Tasks;


using d = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo.Kontrol.Interfaces;


namespace EK.Datos.Kontrol.MSSQL
{
    public class KontrolFilesVersiones
      : DAOBaseGeneric<m.IKontrolFilesVersiones>, d.IKontrolFilesVersiones
    {
        private const string USP_KONTROL_FILE_SELECT = "usp_KontrolFilesVersiones_select";
        public KontrolFilesVersiones(m.IContainerFactory factory, d.IDBHelper helper)
            : base(factory, helper, USP_KONTROL_FILE_SELECT, null, "KontrolFilesVersiones") { }

    }
}
