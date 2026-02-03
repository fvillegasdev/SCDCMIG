using System;
using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("sm_cliente_cometarios")]
    public interface IClienteComentarios : IBaseKontrol
    {
        int numcte { get; set; }
        int empleado { get; set; }
        DateTime fec_llamada { get; set; }
        string observaciones { get; set; }
    }
}
