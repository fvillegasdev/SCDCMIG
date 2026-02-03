using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Globalization;
using System.Dynamic;

namespace EK.Procesos.SDC
{
    public class TicketsClientes
        : p.Kontrol.BPBase<m.SDC.Interfaces.ITicketCliente, d.SDC.Interfaces.ITicketsClientes>, p.SDC.Interfaces.ITicketsClientes
    {
        public TicketsClientes(m.Kontrol.Interfaces.IContainerFactory factory, d.SDC.Interfaces.ITicketsClientes dao)
            : base(factory, dao, "TicketsClientes")
        {
        }


        //public async override Task<List<m.SDC.Interfaces.IEstadoCuenta>> GetAll(Dictionary<string, object> parametros)
        //{
        //    var usuario = await this.GetUsuario();

        //    if (usuario.IdCliente>0)
        //    {
        //        parametros.Add("idCliente", usuario.IdCliente);
        //        var estadoCuenta =  await this.dao.GetAll(parametros);

        //        foreach (var item in estadoCuenta)
        //        {

        //            if (item.PeriodicidadDetalle.Periodicidad.Clave == "M")
        //            {
        //                DateTimeFormatInfo dtinfo = new CultureInfo("es-ES", false).DateTimeFormat;
        //                item.PeriodicidadDetalle.Periodicidad.Nombre = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(dtinfo.GetMonthName(item.PeriodicidadDetalle.N));
        //            }
        //        }

        //        return estadoCuenta;
        //    }
        //    return null;
    
        //}


        //private async Task<m.Kontrol.Interfaces.IUsuario> GetUsuario()
        //{
        //    var daoUsuario = Get<d.Kontrol.Interfaces.IUsuarios>();
        //    return await daoUsuario.GetById(base.getUserId());
        //}

    }
}