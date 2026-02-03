namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("Opciones")]
    public interface IOpcion
        : IBaseKontrol
    {
        [Column("Opcion", false)]
        new string Nombre { get; set; }
        [Column()]
        string Icono { get; set; }
        [Column()]
        string Descripcion { get; set; }
        [Column()]
        bool AsignableProceso { get; set; }
        [Column()]
        bool EsSeccion { get; set; }
        [Column()]
        string Ruta { get; set; }
        [Column("Posicion")]
        int? Orden { get; set; }
        [Column()]
        int? IdModulo { get; set; }
        [Column()]
        int? IdOpcionPadre { get; set; }
        IModulo Modulo { get; set; }
        IOpcion OpcionPadre { get; set; }
    }
}
