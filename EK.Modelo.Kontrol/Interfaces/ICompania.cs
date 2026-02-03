namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("companias")]
    public interface ICompania
    : IBaseKontrol
    {
        int? IdDominio { get; set; }
        ItemGeneral Cliente { get; set; }

        [Column()]
        string Domicilio { get; set; }
        [Column()]
        int? IdMonedaBase { get; set; }
        [Column()]
        int? IdTimeZone { get; set; }
        [Column()]
        string Rfc { get; set; }
        [Column()]
        int? IdAsentamiento { get; set; }
        IAsentamiento Asentamiento { get; set; }
        IMoneda MonedaBase { get; set; }
        IItemGeneral TimeZone { get; set; }
        [Column()]
        bool Vivienda { get; set; }
    }
}