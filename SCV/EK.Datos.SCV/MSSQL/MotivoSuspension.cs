using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class MotivoSuspension
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IMotivoSuspension>, d.SCV.Interfaces.IMotivoSuspension
    {
        private const string USP_SCV_MOTIVOSUSPENSION_SELECT = "usp_scv_MotivoSuspension_select";
        private const string USP_SCV_MOTIVOSUSPENSION_NOTIFICACIONES_SELECT = "usp_scv_motivosuspension_notificaciones_select";
       
        public MotivoSuspension(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_MOTIVOSUSPENSION_SELECT, null, "scv_MotivoSuspension")
        { }

        
    }
}