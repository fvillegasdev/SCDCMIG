using System;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;

using Newtonsoft.Json;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("Dominios")]
    public interface IDominios
        : IBaseKontrol
    {
        [Column()]
        bool Bloqueado { get; set; }

        string Imagen { get; set; }
        [Column()]
        DateTime? VigenciaInicio { get; set; }

        [Column()]
        DateTime? VigenciaFinal { get; set; }

        [Column()]
        int IdTimeZone { get; set; }

        IItemGeneral TimeZone { get; set; }
        /*
        [Column()]
        [JsonIgnore()]
        string Licencia { get; set; }

        [Column()]
        [JsonIgnore()]
        string ClaveDominio { get; set; }

        [Column()]
        string HashDominio { get; set; }
        */
    }
}