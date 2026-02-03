using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace EK.Web.SCO.Controllers
{
    public class TarjetasController : EK.Common.BaseKontroller
    {
        [Route("scco/Tarjetas/calcularInsumos/")]
        [HttpPost]
        public async Task<ActionResult> CalcularInsumos()
        {
            dynamic obj = base.GetInputObject();
            string idObra = JsonConvert.SerializeObject(obj.idObra);
            string idTabulador = JsonConvert.SerializeObject(obj.idTabulador);
            string idTipoPresupuesto = JsonConvert.SerializeObject(obj.idTipoPresupuesto);
            dynamic insumos = JsonConvert.SerializeObject(obj.insumos);

            try
            {
                return await Get("/InsumosTarjetas/CalcularInsumos")
                    .Add("idObra", idObra)
                    .Add("idTabulador", idTabulador)
                    .Add("idTipoPresupuesto", idTipoPresupuesto)
                    .Add("insumos", insumos)
                    .ExecuteAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}