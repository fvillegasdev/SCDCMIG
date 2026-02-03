using System.Collections.Generic;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("niveles")]
    public interface INivel 
        : IBaseKontrol
    {
        List<INivelesOpciones> Permisos { get; set; }

        List<INivelesEtapas> EtapasAsignadas { get; set; }


    }
}