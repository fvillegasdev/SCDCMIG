using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Notificadores
      : DAOBaseGeneric<m.Kontrol.Interfaces.INotificadores>, d.Kontrol.Interfaces.INotificadores
    {
        private const string USP_NOTIFICADORES_SELECT = "usp_notificadores_select";
        public Notificadores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_NOTIFICADORES_SELECT, null, "Notificadores") { }



    }
}