using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class VistaElemento : BPBase<m.Kontrol.Interfaces.IVistaElemento, d.Kontrol.Interfaces.IVistaElemento>, p.Kontrol.Interfaces.IVistaElemento
    {
        public VistaElemento(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IVistaElemento dao)
       : base(factory, dao, "vistaselemento")
        {
        }

        public override async Task<List<m.Kontrol.Interfaces.IVistaElemento>> GetAll(Dictionary<string, object> parametros)
        {
            return await dao.GetAll(parametros);
        }

        //public async Task<m.Kontrol.Interfaces.IVistas> Save(m.Kontrol.Interfaces.IVistas elementos)
        //{
        //    foreach (var e in elementos.Elementos)
        //    {
        //        if (e.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
        //        {
        //            await dao.Save(e);
        //        }
        //    }
        //    var dc = new Dictionary<string, object>() { { "Id", elementos.IdVista } };
        //    elementos.Elementos = await Get<p.Kontrol.Interfaces.IVistaElemento>().GetAll(dc); 
        //    return elementos;
        //}

        public override async Task<m.Kontrol.Interfaces.IVistaElemento> Save(m.Kontrol.Interfaces.IVistaElemento elemento)
        {
            return  await dao.Save(elemento);
        }

        //public async Task<object[]> GetUbicacionColores(int Id, int IdFilter)
        //{
        //    return await dao.GetUbicacionColores(Id, IdFilter);
        //}
        public async Task<object[]> GetUbicacionColores(Dictionary<string,object> parametros)
        {
            return await dao.GetUbicacionColores(parametros);
        }

    }
}
