using EK.Drivers.Log;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using diSCV = EK.Datos.SCV.Interfaces;
using miKontrol = EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class RangosIngresos
         : p.Kontrol.BPBase<m.SCV.Interfaces.IRangoIngresos, d.SCV.Interfaces.IRangosIngresos>, p.SCV.Interfaces.IRangosIngresos
    {

        public RangosIngresos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IRangosIngresos dao)
               : base(factory, dao, "rangosIngresos")
        {
        }
        
    }
}