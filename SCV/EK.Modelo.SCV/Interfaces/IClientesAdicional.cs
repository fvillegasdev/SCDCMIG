using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public  interface IClienteAdicional 
        : IBaseKontrol
    {       
        decimal DescuentoPension { get; set; }
        int DependientesEconomicos { get; set; }
        IItemGeneral Estudios { get; set; }
        IItemGeneral TipoCasa { get; set; }
        IItemGeneral TipoPercepcion { get; set; }
        int AutosPropios { get; set; }        
        ICentralObrera CentralObrera { get; set; }

        int? IdCentralObrera { get; set; }
        int? IdEstudios { get; set; }
        int? IdTipoCasa { get; set; }
        int? IdTipoPercepcion { get; set; }
    }
}
