using System;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class DocumentoCategorias
        : DAOBaseGeneric<m.Kontrol.Interfaces.IDocumentoCategorias>, d.Kontrol.Interfaces.IDocumentoCategorias
    {
        private const string USP_DOCUMENTOS_CATEGORIA_SELECT = "usp_DocumentosCategorias_select";

        public DocumentoCategorias(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_DOCUMENTOS_CATEGORIA_SELECT,
                  string.Empty,
                  "DocumentosCategoria")
        { }
    }
}
