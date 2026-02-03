namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("ConfigurarParametros")]
    public interface IConfigurarParametros 
        : IBaseKontrolCompania
    {
        [Column()]
        int? IdParametro { get; set; }
        [Column()]
        string Valor { get; set; }
        IParametro Parametro { get; set; }
        [Column("Clave", true)]
        new string Clave { get; set; }

        [Column("Nombre", true)]
        new string Nombre { get; set; }
    }
}