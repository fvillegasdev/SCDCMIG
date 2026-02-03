using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using datos = EK.Datos;
using modelo = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class SegmentosVigencia
      : datos.Kontrol.DAOBaseGeneric<modelo.SCV.Interfaces.ISegmentosVigencia>, datos.SCV.Interfaces.ISegmentosVigencia
    {
        private const string USP_SEGMENTOSVIGENCIAS_SELECT = "usp_segmentosvigencias_select";
        public SegmentosVigencia(modelo.Kontrol.Interfaces.IContainerFactory factory, datos.Kontrol.Interfaces.IDBHelper helper)
            : base(factory,
                  helper, 
                  USP_SEGMENTOSVIGENCIAS_SELECT,
                  null, 
                  "SCV_SegmentosVigencia") { }
    }
}