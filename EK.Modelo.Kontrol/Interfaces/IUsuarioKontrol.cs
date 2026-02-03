using System;

namespace EK.Modelo.Kontrol.Interfaces
{
#if MSSQL
    [Table("usuariosEK")]
#endif
#if SYBASE17
    [Table("usuariosEK")]
#endif
    public interface IUsuarioKontrol
        : IBaseKontrol
    {
        [Column]
        string Password { get; set; }
        [Column]
        bool Bloqueado { get; set; }
        [Column]
        int Intentos { get; set; }
    }
}
