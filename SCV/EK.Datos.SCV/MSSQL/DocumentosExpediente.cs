using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class DocumentosExpediente
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IDocumentoExpediente>,
        d.SCV.Interfaces.IDocumentosExpediente
    {
        private const string USP_SCV_DOCUMENTOSEXPEDIENTE_SELECT = "usp_scv_DocumentosExpediente_select";
        private const string USP_SCV_DOCUMENTOSEXPEDIENTE_INS_UPD = "usp_scv_DocumentosExpediente_ins_upd";

        public DocumentosExpediente(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_DOCUMENTOSEXPEDIENTE_SELECT, null, "scv_DocumentosExpediente")
        { }
    }
}
