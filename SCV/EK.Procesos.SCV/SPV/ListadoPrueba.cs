using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class ListadoPrueba
        : p.Kontrol.BPBase<m.SCV.Interfaces.IListadoPrueba, d.SCV.Interfaces.IListadoPrueba>, p.SCV.Interfaces.IListadoPrueba

    {
        public ListadoPrueba(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IListadoPrueba dao)
            : base(factory, dao, "ListadoPrueba")
        { }

        /*public async Task<List<m.SCV.Interfaces.IListadoPrueba>> GetPruebas(Dictionary<string, object> parametros)
        {
            // var ResultFechaConstruccion = await this.dao.GetFechaConstruccion(Plaza, Segmentos, Fraccionamiento, FechaInicial, FechaFinal);
            parametros.Add("Usuario", base.getUserId());

            var Pruebas = await this.dao.GetPruebas(parametros);

            return Pruebas;
        }*/
    }
}