using System.IO;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("PlantillasMails")]
    public interface IPlantillasMails
        : IBaseKontrol
    {
        [Column()]
        string Plantilla { get; set; }
        [Column()]
        int IdCategoria { get; set; }
        IItemGeneral Categoria {get;set;}
        [Column()]
        int IdTipoPlantilla { get; set; }
        IItemGeneral TipoPlantilla { get; set; }
        [Column()]
        int IdIdioma { get; set; }
        IItemGeneral Idioma { get; set; }
        Stream Contenido { get; set; }
        [Column()]
        bool Privado { get; set; }
       new bool Sistema { get; set; }
    }
}