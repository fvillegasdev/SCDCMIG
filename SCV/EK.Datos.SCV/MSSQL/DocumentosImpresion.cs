using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class DocumentosImpresion
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IDocumentosImpresion>, d.SCV.Interfaces.IDocumentosImpresion
    {
        private const string USP_SPV_DOCUMENTO_IMPRESION_SELECT = "usp_spv_Documento_Impresion_select";
        public DocumentosImpresion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_DOCUMENTO_IMPRESION_SELECT, null, "sv_dcto_impresion")
        { }
    }
}