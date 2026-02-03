using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("Tareas")]
    public interface ITarea : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int DiasVigencia { get; set; }
        [m.Kontrol.Column()]
        int IdFlujo { get; set; }

        [m.Kontrol.Column()]
        int? Orden { get; set; }
        [m.Kontrol.Column()]
        string Expresion { get; set; }
        [m.Kontrol.Column()]
        string ExpresionMensaje { get; set; }
        List<INotificadores> Notificadores { get; set; }
        List<INotificadores> Autorizadores { get; set; }

        //bool JefeDirecto { get; set; }
        //int? IdPuesto { get; set; }
        //bool PuestoJerarquia { get; set; }
        //bool PuestoTodos { get; set; }
        //int? IdPosicion { get; set; }

    }

    //public interface IReglaTarea : IBaseKontrol
    //{
    //    string Campo { get; set; }
    //    string Operador { get; set; }
    //    string Valor { get; set; }
    //}
}
