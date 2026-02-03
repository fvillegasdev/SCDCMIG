using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class UbicacionComun
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IUbicacionComun>, d.SCV.Interfaces.IUbicacionComun
    {
        private const string USP_SPV_UBICACION_COMUN_SELECT = "usp_spv_ubicacion_comun_select";
        public UbicacionComun(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_UBICACION_COMUN_SELECT, null, "spv_ubicacion_comun")
        { }
    }
}