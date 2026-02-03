using System.Collections.Generic;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("tiposClasificador")]
    public interface ITipoClasificador 
        : IBaseKontrol
    {

        [Column()]
        int? IdCatalogosClasificadores { get; set; }
        [Column()]
        string Descripcion { get; set; }

        [Column()]
        int? IdTipoClasificador { get; set; }

        IItemGeneral TipoClasificador { get; set; }

        List<IItemGeneral> Clasificadores { get; set; }

        List<IItemGeneral> Tags { get; set; }
        IItemGeneral CatalogosClasificadores { get; set; }

    }
}