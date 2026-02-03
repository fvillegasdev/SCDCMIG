using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("usuariostokens")]
    public interface IUsuarioToken
        : IBaseKontrol
    {
        [Column()]
        int IdUsuario { get; set; }

        [Column()]
        string Token { get; set; }
    }
}