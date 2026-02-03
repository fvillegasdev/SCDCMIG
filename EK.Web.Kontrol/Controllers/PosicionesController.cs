using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

using EK.Modelo.Kontrol;
using EK.Common.Exportacion;

using Newtonsoft.Json.Linq;

namespace EK.Web.Kontrol.Controllers
{
    public class PosicionesController
        : EK.Common.BaseKontroller
    {
        public PosicionesController()
            : base() {
        }

        [Route("posiciones/{tipo}/puesto({idPuesto})/{estatus}")]
        [Route("posiciones/{tipo}/puesto({idPuesto})")]
        [Route("posiciones/{tipo}/categoria({idCategoria})/{estatus}")]
        [Route("posiciones/{tipo}/categoria({idCategoria})")]
        [Route("posiciones/{tipo}/{estatus}")]
        [Route("posiciones/{tipo}")]
        [HttpGet]
        public async Task<ActionResult> GetPosiciones(string tipo, int? idPuesto, int? idCategoria, string estatus)
        {
            int tipoConsulta = 0;
            string consultarEstatus = string.Empty;

            if (estatus != null)
            {
                estatus = estatus.Trim().ToLowerInvariant();
                if (estatus == "disponibles")
                {
                    consultarEstatus = "D";
                }
                else if (estatus == "ocupadas")
                {
                    consultarEstatus = "O";
                }
            }

            tipo = tipo.Trim().ToLowerInvariant();
            if (tipo == "catalogo" || tipo == "kv")
            {
                if (tipo == "kv")
                {
                    tipoConsulta = 1;
                }

                if (idPuesto != null)
                {
                    return await Get("/Posiciones/GetPosicionesPorPuesto")
                    .Add("idPuesto", idPuesto.Value)
                    .Add("estatus", consultarEstatus)
                    .Add("kv", tipoConsulta)
                    .ExecuteAsync();
                }
                else if (idCategoria != null) {
                    return await Get("/Posiciones/GetPosicionesPorCategoria")
                    .Add("idCategoria", idCategoria.Value)
                    .Add("estatus", consultarEstatus)
                    .Add("kv", tipoConsulta)
                    .ExecuteAsync();
                }
                else
                {
                    return await Get("/Posiciones/GetPosiciones")
                    .Add("estatus", consultarEstatus)
                    .Add("kv", tipoConsulta)
                    .ExecuteAsync();
                }
            }
            else
            {
                return HttpNotFound();
            }
        }

        [Route("puestos/{tipo}")]
        [Route("puestos/{tipo}/{activos}")]
        [HttpGet]
        public async Task<ActionResult> GetPuestos(string tipo, string activos)
        {
            int tipoConsulta = 0; 
            var consultarActivos = activos == "activos";

            tipo = tipo.Trim().ToLowerInvariant();
            if (tipo == "catalogo" || tipo == "kv")
            {
                if (tipo == "kv")
                {
                    tipoConsulta = 1;
                }

                return await Get("/Posiciones/GetPuestos")
                    .Add("activos", consultarActivos)
                    .Add("kv", tipoConsulta)
                    .ExecuteAsync();
            }
            else
            {
                return HttpNotFound();
            }
        }

        [Route("posiciones/superior/{idUsuario}")]
        [HttpGet]
        public async Task<ActionResult> GetJefeInmediato(int idUsuario)
        {
            return await Get("/Posiciones/GetJefeInmediato")
                .Add("idUsuario", idUsuario)
                .ExecuteAsync();
        }

        [Route("posiciones/ascendientes/{idUsuario}")]
        [HttpGet]
        public async Task<ActionResult> GetAscendientes(int idUsuario)
        {
            return await Get("/Posiciones/GetAscendientes")
                .Add("idUsuario", idUsuario)
                .ExecuteAsync();
        }

        [Route("posiciones/descendientes/{idUsuario}")]
        [HttpGet]
        public async Task<ActionResult> GetDescendientes(int idUsuario)
        {
            return await Get("/Posiciones/GetDescendientes")
                .Add("idUsuario", idUsuario)
                .ExecuteAsync();
        }

        [Route("categorias/{tipo}/puesto({idPuesto})/{activos}")]
        [Route("categorias/{tipo}/puesto({idPuesto})")]
        [Route("categorias/{tipo}/{activos}")]
        [Route("categorias/{tipo}")]
        [HttpGet]
        public async Task<ActionResult> GetCategorias(string tipo, string activos, int? idPuesto)
        {
            int tipoConsulta = 0;
            var consultarActivos = activos == "activos";

            tipo = tipo.Trim().ToLowerInvariant();
            if (tipo == "catalogo" || tipo == "kv")
            {
                if (tipo == "kv")
                {
                    tipoConsulta = 1;
                }

                if (idPuesto != null)
                {
                    return await Get("/Posiciones/GetCategoriasPorPuesto")
                    .Add("idPuesto", idPuesto.Value)
                    .Add("activos", consultarActivos)
                    .Add("kv", tipoConsulta)
                    .ExecuteAsync();
                }
                else {
                    return await Get("/Posiciones/GetCategorias")
                    .Add("activos", consultarActivos)
                    .Add("kv", tipoConsulta)
                    .ExecuteAsync();
                }                
            }
            else
            {
                return HttpNotFound();
            }
        }



        [Route("kontrol/Puestos/all/{filtros}")]
        public async Task<ActionResult> GetAll(string filtros)
        {
            var obj = base.GetEncodedDictionary(filtros);
            return await Get("/puestos/GetAllPuestos")
                .Add("parametros", obj)
                .ExecuteAsync();
            //return await Get("/notificaciones/GetAllNotifications").ExecuteAsync();
        }
    }
}
