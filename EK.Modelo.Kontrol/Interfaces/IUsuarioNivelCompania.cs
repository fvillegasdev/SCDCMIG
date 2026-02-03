namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("usuarioNivelCompania")]
    public interface IUsuarioNivelCompania 
        : IBaseKontrolCompania
    {
        [Column("Clave", true)]
        new string Clave { get; set; }
        [Column("Nombre", true)]
        new string Nombre { get; set; }
        [Column()]
        int IdUsuario { get; set; }
        IUsuario Usuario { get; set; }
        [Column()]
        int IdNivel { get; set; }
        INivel Nivel { get; set; }
    }
}