using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

using Newtonsoft.Json.Linq;

namespace EK.Procesos.Kontrol
{
    public class Vistas : BPBase<m.Kontrol.Interfaces.IVistas, d.Kontrol.Interfaces.IVistas>, p.Kontrol.Interfaces.IVistas
    {

        public Vistas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IVistas dao)
               : base(factory, dao, "vistas")
        {
        }

        public override async Task<List<m.Kontrol.Interfaces.IVistas>> GetAll(Dictionary<string, object> parametros)
        {
            return await dao.GetAll(parametros);
        }

        public async Task<object> GetVistas(int idDesarrollo)
        {
            var bpVistaElementos = Get<p.Kontrol.Interfaces.IVistaElemento>();
            JArray retValue = new JArray();

            var parametros = new Dictionary<string, object>
            {
                { "kv", 1}
            };

            object[] vistas = await dao.Export(parametros);

            //

            foreach(dynamic v in vistas)
            {
                var pElementos = new Dictionary<string, object>
                {
                    { "id", v.ID },
                    { "idFilter", idDesarrollo},
                    { "kv", 0},
                    { "elementos", 1}
                };
                var vElements = await bpVistaElementos.Export(pElementos);

                pElementos = new Dictionary<string, object>
                {
                    { "id", v.ID },
                    { "idFilter", idDesarrollo},
                    { "kv", 1},
                    { "elementos", 0}
                };
                var vColors = await bpVistaElementos.Export(pElementos);

                var vColorsObj = new Dictionary<string, object>();
                var vColorsCount = new Dictionary<int, int>();

                // count elements
                if (vColors != null && vColors.Length > 0) {
                    foreach (dynamic c in vColors) {
                        string clave = c.Clave;
                        int? cIdElement = c.IdElemento;
                        if (cIdElement != null)
                        {
                            int idElemento = c.IdElemento;
                            //
                            vColorsObj[clave] = c;
                            //
                            if (!vColorsCount.ContainsKey(idElemento))
                            {
                                vColorsCount.Add(idElemento, 0);
                            }
                            vColorsCount[idElemento] = vColorsCount[idElemento] + 1;
                        }
                    }
                }
                // assign to elements
                JArray vElementsArray = new JArray();
                int vCount = 0;
                foreach (dynamic e in vElements) {
                    dynamic nElement = JObject.FromObject(e);
                    int idElemento = e.IdElemento;
                    //
                    nElement.Count = !vColorsCount.ContainsKey(idElemento) ? 0 : vColorsCount[idElemento];
                    //
                    vCount = vCount + Convert.ToInt32(nElement.Count.Value);
                    //
                    vElementsArray.Add(nElement);
                }

                dynamic vjson = JObject.FromObject(v);
                vjson.Elements = vElementsArray;
                vjson.colors = JObject.FromObject(vColorsObj);
                vjson.Count = vCount;
                //
                retValue.Add(vjson);
            }

            return retValue;
        }

        public async Task<object[]> GetVistaColores(int idVista, int idDesarrollo)
        {
            object[] retValue = null;
            var bpVistaElementos = Get<p.Kontrol.Interfaces.IVistaElemento>();

            var pElementos = new Dictionary<string, object>
                {
                    { "id", idVista },
                    { "idFilter", idDesarrollo},
                    { "kv", 1}
                };

            retValue = await bpVistaElementos.Export(pElementos); ;

            return retValue;
        }

        public async Task<List<m.Kontrol.Interfaces.IVistas>> GetVistasContenido(Dictionary<string, object> parametros)
        {
            return await dao.GetAll(parametros);
        }

        protected override async Task<m.Kontrol.Interfaces.IVistas> afterGetItem(m.Kontrol.Interfaces.IVistas item)
        {
            if (item.IdVista > 0)
            {
                var dc = new Dictionary<string, object>() {
                    { "Id", item.IdVista }
                };
                var bpVistaelemento = Get<p.Kontrol.Interfaces.IVistaElemento>();
                item.Elementos = await bpVistaelemento.GetAll(dc);
            }

            return item;
        }

        public override async Task<m.Kontrol.Interfaces.IVistas> Save(m.Kontrol.Interfaces.IVistas item)
        {
            m.Kontrol.Interfaces.IVistas retValue = Get <m.Kontrol.Interfaces.IVistas>();

            try
            {
                BeginTransaction(true);
                //
                retValue = await saveModel(item);
                int IdUser = getUserId();
                
                var bpVElemento = Get<p.Kontrol.Interfaces.IVistaElemento>();
                foreach (var e in item.Elementos)
                {
                    e.IdCreadoPor = IdUser;
                    e.IdModificadoPor = IdUser;
                    if(e.Color != null && !string.IsNullOrEmpty(e.Color) && !string.IsNullOrWhiteSpace(e.Color))
                    {
                        if (e.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            await bpVElemento.Save(e);
                        }
                    }
                }
                var dc = new Dictionary<string, object>() { { "Id", item.IdVista } };
                retValue.Elementos = await bpVElemento.GetAll(dc);
                //
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }
    }
}
