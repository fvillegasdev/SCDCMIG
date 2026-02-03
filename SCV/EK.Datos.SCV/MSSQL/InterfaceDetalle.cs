using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;
using System.Data;

namespace EK.Datos.SCV.MSSQL
{
    public class InterfaceDetalle
        :dk.DAOBaseGeneric<m.IInterfaceDetalle>,d.IInterfaceDetalle
    {
        private const string ENTITY_NAME = "Interface";
        private const string USP_INTERFACE_SELECT = "usp_Interface_select";
        private const string USP_INTERFACE_UPD = "usp_Interface_upd";

        public InterfaceDetalle(mki.IContainerFactory factory,dki.IDBHelper helper)
            :base(factory,helper,USP_INTERFACE_SELECT,null,ENTITY_NAME)
        {

        }

    }
}
