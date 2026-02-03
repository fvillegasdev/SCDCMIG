using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.MSSQL
{
    public class Verificacion:d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IVerificacion>,d.SCV.Interfaces.IVerificacion
    {
        private const string ENTITY_NAME = "scv_Verificacion";
        private const string USP_SCV_VERIFICACION_SELECT = "usp_scv_Verificacion";

        public Verificacion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper) :
            base(factory, helper, USP_SCV_VERIFICACION_SELECT, null, ENTITY_NAME)
        { }
    }
}
