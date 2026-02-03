using System;

using Newtonsoft.Json;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("Licencias")]
    public interface ILicencia
        : Interfaces.IBaseKontrol
    {
        [Column()]
        string InternalID { get; set; }
        [Column("Nombre", true)]
        new string Nombre { get; set; }
        [Column()]
        int? IdEntidad { get; set; }
        [Column()]
        IItemGeneral Entidad { get; set; }
        [Column()]
        int IdTipo { get; set; }
        [Column()]
        IItemGeneral Tipo { get; set; }
        [Column()]
        [JsonIgnore()]
        string ClaveLicencia { get; set; }
        [Column()]
        string HashLicencia { get; set; }
        string[] Mensajes { get; set; }
    }
}