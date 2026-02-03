using System.Collections.Generic;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("catalogosClasificadores")]
    public interface ICatalogoClasificador 
        : IBaseKontrol
    {
        [Column("Clave", true)]
        new string Clave { get; set; }
        [Column("Nombre", true)]
        new string Nombre { get; set; }
        [Column()]
        int IdEntidad { get; set; }
        [Column()]
        string ClaveEntidad { get; set; }
        [Column()]
        int? IdClasificador { get; set; }
        IClasificador Clasificador { get; set; }
        ITipoClasificador TipoClasificador { get; set; }
        [Column()]
        int? IdTipoClasificador { get; set; }
    }
}