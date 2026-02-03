using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Segmentos
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ISegmento>, d.SCV.Interfaces.ISegmentos
    {
        private const string USP_SEGMENTOS_SELECT = "usp_segmentos_select";
        public Segmentos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SEGMENTOS_SELECT, null, "SCV_Segmentos") { }
    }
}