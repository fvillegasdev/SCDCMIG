namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("CatalogosGeneralesValores")]
    public interface IItemGeneral : IBaseKontrol
    {
        IItemGeneral Catalogo { get; set; }
        [Column()]
        int? IdCatalogo { get; set; }
        [Column]
        string Icono { get; set; }
        [Column]
        string Color { get; set; }
        [Column]
        string BGColor { get; set; }

    }
}