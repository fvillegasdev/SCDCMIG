using System;
using System.IO;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("PlantillasLeads")]
    public interface IPlantillasLeads
        : IBaseKontrol
    {
        [Column()]
        string Plantilla { get; set; }
        [Column()]
        int IdTipoPlantilla { get; set; }
        [Column()]
        string UUID { get; set; }

        IItemGeneral TipoPlantilla { get; set; }
        Stream Contenido { get; set; }

    }
}