namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IItemGeneralValores : IBaseKontrol
    {
        ItemGeneralValores Seccion { get; set; }
        int? IdSeccion { get; set; }
        ItemGeneral Catalogo { get; set; }
        int? IdCatalogo { get; set; }
        string Valor { get; set; }

        string ClaveCatalogo { get; set; }



            [Column]
        string Icono { get; set; }
        //[Column]
        //string Color { get; set; }
        //[Column]
        //string BGColor { get; set; }
    }
}