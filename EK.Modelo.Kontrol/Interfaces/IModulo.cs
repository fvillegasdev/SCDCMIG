namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("Modulos")]
    public interface IModulo : IBaseKontrol
    {
        [Column()]
        string Descripcion { get; set; }
    }
}