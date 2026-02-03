using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_DocumentosCategoriaFase")]
    public interface IDocumentosCategoriaFase
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        [m.Kontrol.Column()]
        int  IdFase { get; set; }


        [m.Kontrol.Column()]
        int IdCategoria { get; set; }



        [m.Kontrol.Column()]
        int IdEsquema { get; set; }


        int IdResponsable { get; set; }
        DateTime? FechaFinalizacion { get; set; }


        m.Kontrol.Interfaces.IUsuario Responsable { get; set; }

        m.SCV.Interfaces.IFaseExpediente Fase { get; set; }
        m.SCV.Interfaces.IEsquema Esquema { get; set; }
        m.Kontrol.Interfaces.IDocumentoCategorias Categoria { get; set; }
    }
}