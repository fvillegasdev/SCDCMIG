using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using mscvi = EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class ComisionesTabuladores
        : p.Kontrol.BPBase<m.SCV.Interfaces.IComisionesTabuladores, d.SCV.Interfaces.IComisionesTabuladores>, 
        p.SCV.Interfaces.IComisionesTabuladores,p.SCV.Interfaces.IComisionesAutorizacion

    {
        public ComisionesTabuladores(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IComisionesTabuladores dao)
      : base(factory, dao, "comisionesTabuladores")
        {
        }

        public async Task<mscvi.ITabuladoresConfiguracion> BuscarConfiguracionPorTabulador(int idTabulador, int Cantidad)
        {
            var daoTabuladoresConfiguracion = Get<d.SCV.Interfaces.ITabuladoresConfiguracion>();

            /*Consultar Configuracion del Tabulador*/
            var parametros = new Dictionary<string, object> { { "idTabulador", idTabulador } };
            var configuracionTabulador = await daoTabuladoresConfiguracion.GetAll(parametros);

            /*Obteniendo registro del tabulador en base a la cantidad de ventas*/
            var rango = configuracionTabulador.Where(x => Cantidad >= x.Minimo
            && x.Maximo >= Cantidad).FirstOrDefault();
            
            if(rango==null && Cantidad>0)
            {
                /*Esta situacion se presenta cuando el maximo es hasta un numero infinito*/
               rango = configuracionTabulador.Where(x => x.Maximo > 999).FirstOrDefault();
            }

            return rango;
        }
        public async Task<List<m.SCV.Interfaces.ITabuladores>> GetAllTabuladores(bool complementario, int idFase)
        {
            var daoTabuladores = Get<d.SCV.Interfaces.ITabuladores>();

            /*Buscamos Tabuladores para calcular*/
            Dictionary<string, object> parametros = new Dictionary<string, object>
            {
                {"activos", 1 },
                {"complementario", complementario },

            };
            if (idFase > 0)
            {
                parametros.Add("idFase", idFase);
            }
            return  await daoTabuladores.GetAll(parametros);
        }
        public async Task<m.SCV.Interfaces.IComisionesTabuladores> GuardarComisionTabulador(
            int idProcesoDetalle,
            mscvi.ITabuladores tabulador,
            mscvi.ITabuladoresConfiguracion tabuladorConfig,
            mscvi.IComisionesCalculoIndicador indicador,
            int cantidadTotal)
        {
            var comision = Get<m.SCV.Interfaces.IComisionesTabuladores>();
            var daocomisiones = Get<d.SCV.Interfaces.IComisionesTabuladores>();

            var bpTipoCambio = Get<EK.Procesos.SCV.Interfaces.ITiposCambio>();

            var bpCatalogoGeneral = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpCatalogoGeneral.Get("ESTATUSCOMISIONES", "PA");


            /*Definiendo variables*/
            /*El monto base es la moneda de operacion*/
            decimal montoBase = tabulador.MontoBase;
            bool usoPorcentaje = tabulador.UsaPorcentaje;
            int idDesarrollo = tabulador.IdDesarrollo != null ? (int)tabulador.IdDesarrollo : 0;


            /*Determinar si se va a pagar por porcentaje o Importe*/
            decimal montoComision = usoPorcentaje ? 0 : tabuladorConfig.Importe;
            int porcentajeComision = usoPorcentaje ? tabuladorConfig.Porcentaje : 0;


            /*Obteniendo monedas*/

            /*La moneda base es en la cual opera la compañia que pertenece al desarrollo*/

            int idMonedaBase = idDesarrollo > 0 ? (int)tabulador.Desarrollo.Compania.IdMonedaBase : (int)tabulador.IdMoneda;

            /*Moneda destino es la moneda de operacion la indicada en el tabulador o bien la moneda
             del desarrollo*/

            int idMonedaDestino = tabulador.IdMoneda>0?(int)tabulador.IdMoneda: (int)tabulador.Desarrollo.IdMoneda ;

            /*Obtener Tipo de cambio*/
            decimal? tipoCambio = await bpTipoCambio.GetTipoCambioAlDia(idMonedaBase, idMonedaDestino);


            /*Cantidad base tiene el parametro de entrada que encaja con el tabulador
             se utilizar cuando se generan tabuladores sin desarrollo  es decir 15 ventas
             y en campo cantidad guarda que han sido solo 5 para un desarrollo especifico*/
            comision.CantidadBase = cantidadTotal;
            comision.IdDesarrollo = indicador.IdDesarrollo;
            comision.Maximo = tabuladorConfig.Maximo;
            comision.Minimo = tabuladorConfig.Minimo;
            comision.Cantidad = indicador.Cantidad;

            comision.IdProcesoDetalle = idProcesoDetalle;
            comision.IdTipoComision = tabulador.IdTipoComision;
            comision.IdCategoria = indicador.IdCategoria;

            comision.PorcentajeDesarrollo = 100; ;
            comision.Monto = montoComision;
            comision.Porcentaje = porcentajeComision;
            comision.IdUsuario = indicador.IdUsuario;

            comision.IdCreadoPor = base.getUserId();
            comision.IdModificadoPor = base.getUserId();
            comision.Creado = DateTime.UtcNow;
            comision.FechaCalculo = DateTime.UtcNow;
            comision.Modificado = DateTime.UtcNow;
            comision.IdEstatus = estatus.ID;
            comision.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

            comision.IdMoneda = idMonedaDestino;
            comision.TipoCambio = tipoCambio;


            /*Si es un importe pasar tal cual de lo contrario calcular*/
            if (comision.Monto > 0)
            {
                comision.Comision = (decimal)tipoCambio * (decimal)comision.Monto;
                comision.ComisionMoneda = comision.Monto;
            }
            else if (comision.Porcentaje > 0)
            {
                comision.ValorComisionableMoneda = tabulador.MontoBase;
                comision.ValorComisionable = (decimal)tabulador.MontoBase * (decimal)tipoCambio;

                comision.ComisionMoneda = ((decimal)tabulador.MontoBase * (decimal)comision.Porcentaje) / 100M;
                comision.Comision = ((
                    (decimal)tipoCambio * 
                    
                    (decimal)tabulador.MontoBase) * (decimal)comision.Porcentaje) / 100;

            }


            if (indicador.Cantidad != cantidadTotal)
            {
                /*Definir porcentaje corespondiente*/
                decimal porcentajeFraccion = (indicador.Cantidad * 100M) / (decimal)cantidadTotal;
                decimal comisionCorrespondiente = ((decimal)comision.ComisionMoneda *porcentajeFraccion) / 100M;

                comision.PorcentajeDesarrollo =porcentajeFraccion;

                comision.ComisionMoneda =comisionCorrespondiente;
                comision.Comision = (decimal)tipoCambio * comisionCorrespondiente;
            }

            /*Indicar importes*/
            comision.ImportePorAplicar = comision.ComisionMoneda; ;
            comision.ImporteAplicado = 0M;

            comision = await daocomisiones.SaveEntity(comision,false);
            return comision;
        }

        public async Task<object> ConsultarComisiones(Dictionary<string, object> parametros)
        {
            var daoComisionesTabuladores = Get<d.SCV.Interfaces.IComisionesTabuladores>();
            parametros.Add("consultaEspecial", true);
            return await daoComisionesTabuladores.GetComisiones(parametros);
        }

        public async Task<object> CalculoComisiones(Dictionary<string, object> parametros)
        {
            BeginTransaction(true);
            try
            {
                /*Obtencion de parametros*/
                object fechaInicio = DateTime.Today;
                object fechaFin = DateTime.Today;
                object idFase = 0;


                parametros.TryGetValue("fechaInicio", out fechaInicio);
                parametros.TryGetValue("fechaFin", out fechaFin);



                /*Acceso a datos*/
                var daoComisionesTabuladores = Get<d.SCV.Interfaces.IComisionesTabuladores>();
                var daoTabuladoresConfiguracion = Get<d.SCV.Interfaces.ITabuladoresConfiguracion>();
                var daoComisionesPeriodicidadDetalle = Get<d.Kontrol.Interfaces.IPeriodicidadDetalle>();


                /*Procesos de negocio*/
                var bpComisionesSeguimiento = Get<p.SCV.Interfaces.IComisionesSeguimiento>();


                /*Marcar inicio del proceso*/
                var ejecucionProceso = await this.GuardarProceso((DateTime)fechaInicio,(DateTime)fechaFin);

                /*Calculo tabuladores*/
                dynamic tabuladores = await this.GetAllTabuladores(false,Convert.ToInt32(idFase));
                await callCalculoBP((DateTime)fechaInicio, (DateTime)fechaFin, (int)ejecucionProceso.ID, tabuladores,string.Empty);


                /*Generacion de  tabuladores complementarios*/
                dynamic tabuladoresComplementarios = await this.GetAllTabuladores(true, Convert.ToInt32(idFase));
                await this.callCalculoBP((DateTime)fechaInicio, (DateTime)fechaFin, (int)ejecucionProceso.ID, tabuladoresComplementarios, "VENCOMPLE");

                /*Calculo de tabuladores complementarios*/
                await this.GeneracionComplementos((int)ejecucionProceso.ID);

                await bpComisionesSeguimiento.MarcarEjecucionFinalProceso(ejecucionProceso);



                /*Obtener tabuladores calculados*/
                parametros.Clear();
                parametros.Add("fechaInicio", fechaInicio);
                parametros.Add("fechaFin", fechaFin);

                var resultado = await this.ConsultarComisiones(parametros);
                Commit();

                return resultado;
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
                Rollback();
                throw;
            }
           
        }


        private async Task<bool> callCalculoBP(
            DateTime fechaInicio,
            DateTime fechaFin,
            int idProceso,
            dynamic tabuladores,
            string clave
            )
        {
            BeginTransaction(true);
            var daoComisionesPeriodicidadDetalle = Get<d.Kontrol.Interfaces.IPeriodicidadDetalle>();

            /*Recorremos cada tabulador*/
            foreach (var tabulador in tabuladores)
            {

                string claveIndicador = clave!=""?clave: tabulador.Indicador.Clave;

                string idType = tabulador.Indicador.BPType;
                int idPeriodicidad = tabulador.Periodicidad.ID;

                /*Buscar periodicidad  en la tabla en base a la periodicidad
                 que puede ser semanal,quincenal,mensual etc y las fechas de
                 inicio y fin*/

                var parametros = new Dictionary<string, object>();
                parametros.Add("idPeriodicidad", idPeriodicidad);
                parametros.Add("fechaInicio", (DateTime)fechaInicio);
                parametros.Add("fechaFin", (DateTime)fechaFin);

                var fechasCalculo = await daoComisionesPeriodicidadDetalle.GetAll(parametros);

                foreach (var item in fechasCalculo)
                {
                    DateTime fechaActual = DateTime.UtcNow;

                   if (fechaActual >= item.FechaFin)
                   {
                        int idPeriodicidadDetalle = item.ID.Value;

                        var bpInstance = (p.SCV.Interfaces.ITabuladoresCalculo)base.GetByTypeName(idType);
                        await bpInstance.CalculoPorMetas(claveIndicador, tabulador, idProceso, idPeriodicidadDetalle);
                    }

                  
                }
            }
            Commit();
            return true;
        }

        private async Task<m.SCV.Interfaces.IComisionesProceso> GuardarProceso(DateTime fechaInicio, DateTime fechaFin)
        {
            BeginTransaction(true);
            /*Instancias de modelos*/
            var comisionProceso = Get<m.SCV.Interfaces.IComisionesProceso>();

            /*Acceso a datos*/
            var daoComisionProceso = Get<d.SCV.Interfaces.IComisionesProceso>();

            /*Procesos de negocio*/
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            /*Obtener Estatus*/
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            int idUsuario = base.getUserId();

            /*Log de ejecucion*/
            comisionProceso.FechaInicioProceso = DateTime.UtcNow;

            comisionProceso.FechaInicioPeriodo = fechaInicio;
            comisionProceso.FechaFinPeriodo = fechaFin;

            comisionProceso.IdCreadoPor = idUsuario;
            comisionProceso.IdModificadoPor = idUsuario;
            comisionProceso.Creado = DateTime.UtcNow;
            comisionProceso.Modificado = DateTime.UtcNow;
            comisionProceso.IdEstatus = estatus.ID.Value;
            comisionProceso.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
            comisionProceso = await daoComisionProceso.SaveEntity(comisionProceso);
            Commit();
            return comisionProceso;
        }

        public async Task<m.SCV.Interfaces.IComisionesProcesoPeriodos> GuardarProcesoDetale(
            int IdPeriodicidad,
            int IdComisionProceso,
            DateTime fechainicio,
            mscvi.ITabuladores tabulador)
        {
            //BeginTransaction(true);
            /*Instancias de modelos*/
            var comisionProceso = Get<m.SCV.Interfaces.IComisionesProcesoPeriodos>();

            /*Acceso a datos*/
            var daoComisionProceso = Get<d.SCV.Interfaces.IComisionesProcesoPeriodos>();

            /*Procesos de negocio*/
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            /*Obtener Estatus*/
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            int idUsuario = base.getUserId();



            /*Log de ejecucion*/
            comisionProceso.IdTabulador = tabulador.ID.Value;
            comisionProceso.ClaveTabulador = tabulador.Clave;

            comisionProceso.IdDesarrollo = tabulador.IdDesarrollo; ;
            comisionProceso.IdPlaza = tabulador.Plaza.ID; ;

            comisionProceso.IdPeriodicidad = IdPeriodicidad;
            comisionProceso.IdComisionProceso = IdComisionProceso;
            comisionProceso.FechaInicioProceso = fechainicio;
            comisionProceso.IdCreadoPor = idUsuario;
            comisionProceso.IdModificadoPor = idUsuario;
            comisionProceso.Creado = DateTime.UtcNow;
            comisionProceso.Modificado = DateTime.UtcNow;
            comisionProceso.IdEstatus = estatus.ID.Value;
            comisionProceso.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
            comisionProceso = await daoComisionProceso.SaveEntity(comisionProceso);
            //Commit();
            return comisionProceso;
        }

        public async Task<m.SCV.Interfaces.IComisionesProcesoPeriodos> MarcarEjecucionFinalProceso(int idPeriodicidadDetalle)
        {
            /*Acceso a datos*/
            var daoComisionProcesoDetalle = Get<d.SCV.Interfaces.IComisionesProcesoPeriodos>();

            /*Modelo*/
            var procesoDetalle = await daoComisionProcesoDetalle.GetById(idPeriodicidadDetalle);


            /*Guardando Fin del proceso*/
            procesoDetalle.FechaFinProceso = DateTime.UtcNow;
            procesoDetalle.IdModificadoPor = procesoDetalle.IdCreadoPor; ;
            procesoDetalle.Modificado = DateTime.UtcNow;
            procesoDetalle.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
            return await daoComisionProcesoDetalle.SaveEntity(procesoDetalle);
        }
        public async Task<bool> ActualizarImportes(m.SCV.Interfaces.IComisionesAprobacion item, m.Kontrol.Interfaces.IItemGeneral estatus)
        {
            bool result = false;

            try
            {
                BeginTransaction(true);

                var comision = await this.GetById(item.Referencia.ID.Value);

                comision.IdEstatus = estatus.ID.Value;
                comision.ImporteAplicado = item.ImporteAplicado;
                comision.ImportePorAplicar = item.ImportePorAplicar;
                comision.IdModificadoPor = base.getUserId();
                comision.Modificado = DateTime.UtcNow;
                await this.dao.SaveEntity(comision, false);
                result = true;
                Commit();
            }
            catch
            {
                throw;
            }

            return result;
        }

        public async Task<m.SCV.Interfaces.IComisionesComplementarias> GuardarComisionComplementaria(
            m.SCV.Interfaces.IComisionesCalculoIndicadorComplementario comision,
            m.SCV.Interfaces.ITabuladores tabulador,
            m.SCV.Interfaces.ITabuladoresConfiguracion configuracionTabulador)
        {
            BeginTransaction(true);

            /*Instancias de modelos*/
            var comisionComplementaria = Get<m.SCV.Interfaces.IComisionesComplementarias>();
            var daoComisionComplementaria = Get<d.SCV.Interfaces.IComisionesProceso>();

            /*Procesos de negocio*/
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            /*Obtener Estatus*/
            var estatus = await bpEstatus.Get("ESTATUSCOMISIONES", "PA");

            int idUsuario = base.getUserId();

            comisionComplementaria.IdExpediente = comision.IdExpediente;
            comisionComplementaria.IdVentaUbicacion = comision.IdVentaUbicacion;
            comisionComplementaria.IdUsuario = comision.IdUsuario;

            comisionComplementaria.Monto = configuracionTabulador.Importe;
            comisionComplementaria.Porcentaje = configuracionTabulador.Porcentaje;
            comisionComplementaria.Indicador = comision.Cantidad;
            comisionComplementaria.ClaveTabulador = tabulador.Clave;
            comisionComplementaria.IdFase = tabulador.IdFase;


            comisionComplementaria.IdCreadoPor = idUsuario;
            comisionComplementaria.IdModificadoPor = idUsuario;
            comisionComplementaria.Creado = DateTime.UtcNow;
            comisionComplementaria.Modificado = DateTime.UtcNow;
            comisionComplementaria.IdEstatus = estatus.ID.Value;
            comisionComplementaria.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

            comisionComplementaria = await daoComisionComplementaria.SaveEntity(comisionComplementaria);
            Commit();
            return comisionComplementaria;
        }

        public async Task<m.SCV.Interfaces.IComisionesComplementarias> GeneracionComplementos(int idProceso)
        {
            try
            {
                BeginTransaction(true);

                /*Instancias de modelos*/
                var daoComisionComplementaria = Get<d.SCV.Interfaces.IComisionesComplementarias>();
                var daoComisionSeguimiento = Get<d.SCV.Interfaces.IComisionesSeguimiento>();
                var dacoComisionSeguimientoDetalle = Get<d.SCV.Interfaces.IComisionesSeguimientoDetalle>();

                var bpComisionSeguimiento = Get<p.SCV.Interfaces.IComisionesSeguimiento>();


                /*Procesos de negocio*/
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

                /*Obtener Estatus*/
                var estatus = await bpEstatus.Get("ESTATUSCOMISIONES", "PA");

                var estatusApli = await bpEstatus.Get("ESTATUSCOMISIONES", "APLI");

                var parametros = new Dictionary<string, object>();
                parametros.Add("idEstatus", estatus.ID);

                var comisionesGeneradas = await daoComisionComplementaria.GetAll(parametros);

                foreach (var item in comisionesGeneradas)
                {

                    int id = item.ID.Value;

                    var comisionSeguimiento = await daoComisionSeguimiento.ExisteComision(item.IdExpediente, item.IdVentaUbicacion, item.IdUsuario, item.IdFase);

                    /*Si ya se genero la comision por seguimiento del expediente, generamos complemento*/
                    if (comisionSeguimiento !=null &&comisionSeguimiento.ID > 0)
                    {

                        var comisionSeguimientoComplementario = await bpComisionSeguimiento.GuardarComisionComplementaria(
                            comisionSeguimiento, item, idProceso);

                        if(comisionSeguimientoComplementario !=null && comisionSeguimientoComplementario.ID>0)
                        {
                            /*Obtener detalle de comision*/

                            parametros.Clear();
                            parametros.Add("idComision", comisionSeguimiento.ID);
                            var detalles = await dacoComisionSeguimientoDetalle.GetAll(parametros);


                            foreach (var detalle in detalles)
                            {
                                await bpComisionSeguimiento.SaveConfiguracionDetalle(comisionSeguimientoComplementario.ID.Value,
                                    comisionSeguimientoComplementario.IdCategoria, (decimal)comisionSeguimientoComplementario.Comision,
                                    detalle.IdMoneda, detalle.TipoCambio, idProceso, detalle, true);
                            }
                            item.IdComisionComplemento = comisionSeguimientoComplementario.ID.Value;

                        }


                        /*Actualizar Estatus a aplicado*/
                        item.IdEstatus = estatusApli.ID.Value;
                        item.IdModificadoPor = base.getUserId();
                        item.Modificado = DateTime.UtcNow;
                        item.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                        item.IdComision = comisionSeguimiento.ID.Value;

                        await daoComisionComplementaria.SaveEntity(item, false);

                    }
                }
                Commit();
            }
            catch(Exception ex)
            {
                throw ex;
            }

           
            return null;
        }



        public async Task<bool> GuardarTabuladorExpediente(List<m.SCV.Interfaces.IExpediente> items, int idComisionTabulador)
        {
            try
            {
                if (items != null && items.Count > 0)
                {
                    var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var estatus = await bpEstatus.Get("ESTATUS", "A");

                    var daoComisionTabuladorExp = Get<d.SCV.Interfaces.IComisionesTabuladoresExpedientes>();

                    foreach (var c in items)
                    {
                        var comisionTbauladorEx = Get<m.SCV.Interfaces.IComisionesTabuladoresExpedientes>();


                        comisionTbauladorEx.ID = -1;
                        comisionTbauladorEx.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                        comisionTbauladorEx.IdComisionTabulador = idComisionTabulador;
                        comisionTbauladorEx.IdExpediente = c.ID.Value;
                        comisionTbauladorEx.IdEstatus = estatus.ID;
                        comisionTbauladorEx.Modificado = DateTime.UtcNow;
                        comisionTbauladorEx.IdModificadoPor = base.getUserId();
                        comisionTbauladorEx.Creado = DateTime.UtcNow;
                        comisionTbauladorEx.IdCreadoPor = base.getUserId();

                        await daoComisionTabuladorExp.SaveEntity(comisionTbauladorEx, false, true);
                    }

                }
                return true;
            }
            catch
            {
                throw;
            }
        }
    }
}
