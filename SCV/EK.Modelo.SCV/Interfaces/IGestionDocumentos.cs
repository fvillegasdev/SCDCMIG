using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    //[m.Kontrol.Table("")]
    public interface IGestionDocumentos : IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdCategoria { get; set; }

        //[m.Kontrol.Column()]
        //string Nombre_Doc { get; set; }

        [m.Kontrol.Column()]
        string Responsable { get; set; }

        [m.Kontrol.Column()]
        int? IdEntidad { get; set; }
    
      //m.Kontrol.Interfaces.IKontrolFile KontrolFile { get; set; }

     m.Kontrol.Interfaces.IItemGeneral Entidad { get; set; }

     m.Kontrol.Interfaces.IKontrolFile KontrolFile { get; set; }

     m.Kontrol.Interfaces.ITipoEntidad TipoEntidad { get; set; }
     m.Kontrol.Interfaces.IDocumentoCategorias Categoria { get; set; }
     List<m.SCV.Interfaces.IDocumentosCategoriaFase> Seguimientos { get; set; }


       


    }
}
