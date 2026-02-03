using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ConceptosCredito")]

    public interface IConceptosCredito : m.Kontrol.Interfaces.IBaseKontrol
    { 
        [m.Kontrol.Column()]
        int IdTipoConcepto { get; set; }

        [m.Kontrol.Column()]
        string Valores { get; set; }
     
        string Valor { get; set; }

        [m.Kontrol.Column()]
        int IdNaturaleza { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoConcepto { get; set; }

        m.Kontrol.Interfaces.IItemGeneral Naturaleza { get; set; }
    }
}
