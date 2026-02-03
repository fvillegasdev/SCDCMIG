using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Criterios")]

    public interface ICriterios : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdOrigen { get; set; }

        IOrigen Origen { get; set; }

        IListasMktDet Valor { get; set; }


    }
}
