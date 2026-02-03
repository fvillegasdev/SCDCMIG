using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d=EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;
using mscvi = EK.Modelo.SCV.Interfaces;
namespace EK.Procesos.SCV
{
    public class ComisionesSeguimiento:
        p.Kontrol.BPBase<m.SCV.Interfaces.IComisionesSeguimiento,d.SCV.Interfaces.IComisionesSeguimiento>,
        p.SCV.Interfaces.IComisionesSeguimiento,p.SCV.Interfaces.IComisionesAutorizacion

    {

        public ComisionesSeguimiento(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IComisionesSeguimiento dao)
            :base(factory,dao, "comisionesSeguimiento")
        {
        }


        public async Task<object> CalculoComisiones(Dictionary<string, object> parametros)
        {
            BeginTransaction(true);

            /*Acceso a datos*/
            var daoComisiones = Get<d.SCV.Interfaces.IComisionesSeguimiento>();
            var daoComisionesDetalle = Get<d.SCV.Interfaces.IComisionesSeguimientoDetalle>();
            var daoComisionesCalculo = Get<d.SCV.Interfaces.IComisionesSeguimiento>();
            var daoInstantaneas = Get<d.SCV.Interfaces.IExpedientesInstantaneas>();

            var daoComisionConfiguracion = Get<d.SCV.Interfaces.IComisionConfiguracion>();
            var daoComisionConfiguracionEsquema = Get<d.SCV.Interfaces.IComisionPlanEsquemaPeriodo>();
            var daoComisionConfiguracionEsquemaDetalle = Get<d.SCV.Interfaces.IComisionPlanEsquemaPeriodoDetalle>();
            var daoComisionesPeriodos = Get<d.SCV.Interfaces.IComisionAniosPeriodos>();

            /*Procesos de negocio*/
            var bpTipoCambio = Get<EK.Procesos.SCV.Interfaces.ITiposCambio>();


            /*Periodo a calcular*/
            var periodoCalculo = await ObtenerPeriodoCalculo(parametros);

            /*periodo de calculo*/
            int idPeriodoCalculo = periodoCalculo.ID.Value;


            try
            {
                var ejecucionProceso = await this.GuardarProceso(periodoCalculo);


                /*Obtener politicas de pago configuradas en base al rango de fecha proporcionado, fase*/

                var param = new Dictionary<string, object>
                {
                    {"fechaInicio", periodoCalculo.FechaInicio},
                    {"fechaFin", periodoCalculo.FechaFin},
                    {"idFase", periodoCalculo.IdFase},
                    {"OperacionEspecifica", "OBTENERPERIODOS"}

                };

                /*Politicas configuradas en base a rango de fecha, fase*/
                dynamic configuracionPorEsquema = await daoComisionConfiguracionEsquema.GetAllPlanEsquema(param);

                foreach (var item in configuracionPorEsquema)
                {
                    /*En este punto tenemos tres parametros importantes que son
                     Fechas,Fase y esquema*/

                    int idEsquema = item.IdEsquema;
                    int idConfiguracion = item.ID;

                    /*Consultar configuracion por categoria, es decir, las diferentes 
                      categorias  configuradas para un esquema*/
                    param.Clear();
                    param.Add("IdPlanEsquemaPeriodo", idConfiguracion);
                    param.Add("operacionEspecifica", "CATEGORIASDISTINTAS");

                    dynamic categoriasPorConfiguracion = await daoComisionConfiguracionEsquemaDetalle.GetAllPlanEsquemaDetalle(param);


                    /*Preparando parametros el detalle de la configuracion del esquema*/
                    param.Clear();
                    param.Add("IdPlanEsquemaPeriodo", idConfiguracion);

                    var categoriasConfiguradasPorEsquemaDetalle = await daoComisionConfiguracionEsquemaDetalle.GetAll(param);

                    foreach (var categoria in categoriasPorConfiguracion)
                    {
                        int idCategoria = categoria.IdCategoriaAgente;
                        decimal porcentajeConfigurado = categoria.Porcentaje;
                        if (porcentajeConfigurado == 100)
                        {

                            var etapasPorConfigurar = categoriasConfiguradasPorEsquemaDetalle.Where(
                                x => x.IdCategoriaAgente == idCategoria).ToList();

                            /*Expedientes en curso por categoria*/
                            param.Clear();
                            param.Add("operacionEspecifica", "EXPEDIENTESDISTINTOS");
                            param.Add("idCategoria", idCategoria);
                            param.Add("idPeriodoPlanEsquema", idConfiguracion);
                            param.Add("idPeriodoCalculo",idPeriodoCalculo);


                            /*Este arrego nos va a mostrar los expedientes diferentes por cada */
                            dynamic coleccionExpedientes = await daoComisionesCalculo.GetEtapasEnCurso(param);

                            foreach (var expediente in coleccionExpedientes)
                            {

                                int idExpediente = expediente.IdExpediente;
                                int idUsuario = expediente.IdUsuario;


                                param.Clear();
                                param.Add("idExpediente", idExpediente);
                                dynamic datosCalculo = await daoComisionesCalculo.GetEtapasEnCurso(param);

                                foreach (var ubicacionExp in datosCalculo)
                                {
                                    /*Datos Expediente para calculo*/

                                    int idDesarrollo = ubicacionExp.IdDesarrollo;
                                    int idVenta = ubicacionExp.IdVenta;
                                    int IdExpediente = ubicacionExp.Id;

                                    int idMonedaBase = ubicacionExp.IdMonedaBase;
                                    int idMonedaDestino = ubicacionExp.IdMonedaDestino;

                                    string estatusCierreVenta = ubicacionExp.EstatusProceso;
                                    int? idPrototipo = ubicacionExp.IdPrototipo;
                                    int? idUbicacion = ubicacionExp.IdUbicacion;

                                    int? idVentaUbicacion = ubicacionExp.IdVentaUbicacion;
                                    decimal? valorComisionable = ubicacionExp.ImporteComisionable;


                                    /*Obteniendo Tipo de cambio*/
                                    decimal? tipoCambio = await bpTipoCambio.GetTipoCambioAlDia(idMonedaBase, idMonedaDestino);

                                    /*validar si ya esta guardada la configuracion
                                     por expediente,categoria,IdVentaUbicacion,IdPeriodoCalculo si es asi marcar
                                     la fecha de ejecucion de lo contrario
                                     calcular*/
                                    param.Clear();
                                    param.Add("idExpediente", idExpediente);
                                    param.Add("idCategoria", idCategoria);
                                    param.Add("idVentaUbicacion", idVentaUbicacion);
                                    param.Add("idFase", periodoCalculo.IdFase);
                                    param.Add("idUsuario", idUsuario);


                                    var calculoExistente = await daoComisiones.GetAll(param);

                                    if (calculoExistente.Count() > 0)
                                    {
                                        /*Ya esxiste configuracion*/
                                        foreach (var calculo in calculoExistente)
                                        {
                                            param.Clear();
                                            param.Add("IdComision", calculo.ID);
                                            param.Add("fechaEjecucion", 1);

                                            var detalleCalculo = await daoComisionesDetalle.GetAll(param);

                                            foreach (var detalleC in detalleCalculo)
                                            {
                                                /*Validar si esta en el registro actual a calcular antes
                                                 de marcar la fecha como ejecucion*/

                                                var etapa = etapasPorConfigurar.Where(x => x.IdEtapa == detalleC.IdEtapa).ToList();

                                                if (etapa != null && etapa.Count() > 0)
                                                {
                                                    param.Clear();
                                                    param.Add("idEtapa", detalleC.IdEtapa);
                                                    param.Add("idExpediente", idExpediente);
                                                    param.Add("idCategoria", idCategoria);
                                                    param.Add("idUsuario", idUsuario);
                                                    param.Add("proceso", etapa[0].FechaComision.Clave);
                                                    param.Add("idPeriodoPlanEsquema", item.ID);
                                                    param.Add("operacionEspecifica", "VERIFICACIONETAPAEXISTE");

                                                    /*Esta consulta valida que la etapa este en curso en base a los parametros proporcionados
                                                     , y que el agente asignado sea comisionable y sea agente*/
                                                    var etapaExiste = await daoComisionesCalculo.GetEtapaExiste(param);

                                                    if (etapaExiste != null)
                                                    {
                                                        detalleC.FechaEjecucion = DateTime.UtcNow;
                                                        detalleC.IdProceso = (int)ejecucionProceso.ID.Value;
                                                        await daoComisionesDetalle.Save(detalleC);
                                                    }
                                                }

                                            }
                                        }

                                    }
                                    else
                                    {

                                        /*Validar que la comision a calcular no exista con  un
                                         una ubicacion nula, de ser asi ya no calcular, puesto que se pago
                                         en etapas donde no habia una ubicacion*/

                                        param.Remove("idVentaUbicacion");
                                        var calculoUbicacionNula = await daoComisiones.GetAll(param);

                                        /*Validar que este expediente no tenga calculos de ubicacion en 0*/
                                        var exists = calculoUbicacionNula.Where(x => x.IdVentaUbicacion == 0 || x.IdVentaUbicacion == null).FirstOrDefault();

                                        if (exists == null)
                                        {
                                            int idConfiguracionGuardarda = 0;
                                            decimal importeComision = 0;

                                            /*Calcular comisiones por etapas*/
                                            int[] etapas = new int[etapasPorConfigurar.Count()];
                                            int contadorEtapas = 0;

                                            /*Validar si una etapa existe en el seguimiento actual*/
                                            foreach (var etapa in etapasPorConfigurar)
                                            {
                                                bool etapaGuardada = false;
                                                int idEtapa = etapa.IdEtapa;
                                                int idCategoriaAgente = etapa.IdCategoriaAgente;
                                                string fechaPago = etapa.FechaComision.Clave;

                                                param.Clear();
                                                param.Add("idEtapa", idEtapa);
                                                param.Add("idExpediente", idExpediente);
                                                param.Add("idCategoria", idCategoriaAgente);
                                                param.Add("idUsuario", idUsuario);
                                                param.Add("proceso", fechaPago);
                                                param.Add("idPeriodoPlanEsquema", item.ID);
                                                param.Add("idPeriodoCalculo", idPeriodoCalculo);
                                                param.Add("operacionEspecifica", "VERIFICACIONETAPA");

                                                /*Esta consulta valida que la etapa este en curso en base a los parametros proporcionados
                                                 , y que el agente asignado sea comisionable y sea agente*/
                                                var etapaExiste = await daoComisionesCalculo.GetEtapaExiste(param);


                                                bool existeEtapa = etapaExiste != null && etapaExiste.Usuario.ID > 0 ? true : false;

                                                if (idConfiguracionGuardarda == 0 && existeEtapa == true)
                                                {
                                                    /*Buscar configuracion de comisiones en base a categoria (cuanto se va a pagar)*/
                                                    var configuracion = await this.ObtenerConfiguracion(periodoCalculo.IdFase, idCategoria, idDesarrollo, idEsquema, idPrototipo, idUbicacion);

                                                    /*Si existe configuracion en base a la fase, categoria, si no continuamos*/
                                                    if (configuracion.ID > 0)
                                                    {

                                                        /*Guardar Objeto con detalle*/
                                                        var guardarConfiguracion = await this.SaveConfiguracion(idPeriodoCalculo, IdExpediente, idCategoria, (decimal)configuracion.Importe, (int)configuracion.Porcentaje, etapaExiste.Usuario.ID.Value, idVentaUbicacion, (int)ejecucionProceso.ID);

                                                        try
                                                        {

                                                            /*Calcular Comision*/
                                                            var calculoComision = await this.CalcularComision((int)guardarConfiguracion.ID, valorComisionable, (decimal)tipoCambio, idMonedaDestino, estatusCierreVenta);

                                                            /*Asignar Valor */
                                                            idConfiguracionGuardarda = (int)calculoComision.ID;
                                                            importeComision = (decimal)calculoComision.ComisionMoneda;
                                                        }
                                                        catch (Exception ex)
                                                        {
                                                            Rollback();
                                                            throw new ApplicationException("CalculoComisiones::" + ex.Message, ex);
                                                        }


                                                        /*Guardar configuracion por etapa*/
                                                        etapaGuardada = await SaveConfiguracionDetalle(idConfiguracionGuardarda, idCategoria, importeComision, idMonedaDestino, (decimal)tipoCambio, ejecucionProceso.ID.Value, etapa, existeEtapa);
                                                    }

                                                }
                                                else if (idConfiguracionGuardarda > 0)
                                                {
                                                    /*Guardar configuracion por etapa*/

                                                    etapaGuardada = await SaveConfiguracionDetalle(
                                                        idConfiguracionGuardarda,
                                                        idCategoria, 
                                                        importeComision, 
                                                        idMonedaDestino, 
                                                        (decimal)tipoCambio,
                                                        ejecucionProceso.ID.Value, etapa, existeEtapa);
                                                }

                                                if (!etapaGuardada)
                                                {
                                                    etapas[contadorEtapas] = idEtapa;
                                                    contadorEtapas = contadorEtapas++;
                                                }


                                            }

                                            /*Si existe configuracion guardada quiere decir que almenos 1 etapa
                                             cumple con los parametros en el seguimiento, se procede a guardar el resto
                                             de las etapas marcando la fecha de ejecucion como falsa*/
                                            if (idConfiguracionGuardarda > 0)
                                            {
                                                foreach (var etapasPendientes in etapas)
                                                {
                                                    if (etapasPendientes > 0)
                                                    {
                                                        var eta = etapasPorConfigurar.Where(x => x.IdEtapa == etapasPendientes).First();

                                                        param.Clear();
                                                        param.Add("idEtapa", eta.IdEtapa);
                                                        param.Add("idExpediente", idExpediente);
                                                        param.Add("idCategoria", eta.IdCategoriaAgente);
                                                        param.Add("idUsuario", idUsuario);
                                                        param.Add("proceso", eta.FechaComision.Clave);
                                                        param.Add("idPeriodoPlanEsquema", item.ID);
                                                        param.Add("operacionEspecifica", "VERIFICACIONETAPAEXISTE");

                                                        /*Esta consulta valida que la etapa este concluida sin importar fecha puesto que una etapa
                                                         del mismo seguimiento ya se encuentra dentro del rango y el resto
                                                         debe ser calculada en base a la configuracion*/
                                                        var etapaExiste = await daoComisionesCalculo.GetEtapaExiste(param);

                                                        bool etapaExistente = etapaExiste != null && etapaExiste.ID > 0 ? true : false;

                                                        await SaveConfiguracionDetalle(idConfiguracionGuardarda, idCategoria, importeComision, idMonedaDestino, (decimal)tipoCambio, ejecucionProceso.ID.Value, eta, etapaExistente);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
                /*Guardando Fin del proceso*/

                var bpTabuladores = Get<p.SCV.Interfaces.IComisionesTabuladores>();
                await bpTabuladores.GeneracionComplementos(ejecucionProceso.ID.Value);

                await MarcarEjecucionFinalProceso(ejecucionProceso);
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("CalculoComisiones::" + ex.Message, ex);
            }
            Commit();
            var parame = new Dictionary<string, object> {
                { "idPeriodoDetalle", periodoCalculo.ID.Value },
                { "consultaEspecial", 1 }
            };
            return await daoComisiones.GetComisiones(parame);
        }

        public async Task<object> ConsultarComisiones(Dictionary<string,object> parametros)
        {
            var daoComisiones = Get<d.SCV.Interfaces.IComisionesSeguimiento>();
            return await daoComisiones.GetComisiones(parametros);
        }

        private async Task<m.SCV.Interfaces.IComisionesProceso> GuardarProceso(m.SCV.Interfaces.IComisionAniosPeriodos periodoCalculo)
        {
            //BeginTransaction(true);
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
            comisionProceso.IdPeriodoDetalle = (int)periodoCalculo.ID;
            comisionProceso.FechaInicioProceso = DateTime.UtcNow;

            comisionProceso.FechaInicioPeriodo = periodoCalculo.FechaInicio;
            comisionProceso.FechaFinPeriodo = periodoCalculo.FechaFin;

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


        private async Task<m.SCV.Interfaces.IComisionConfiguracion> ObtenerConfiguracion(int idFase,int idCategoria,int idDesarrollo,int idEsquema,int? idPrototipo, int? IdUbicacion)
        {
            try
            {
                var daoComisionConfiguracion = Get<d.SCV.Interfaces.IComisionConfiguracion>();
                var configuracionComisiones = Get<m.SCV.Interfaces.IComisionConfiguracion>();

                /*Obtenemos configuracion existente en base a Desarrollo,Categoria y fase*/
                var p = new Dictionary<string, object> {
                        { "idDesarrollo", idDesarrollo},
                        { "idCategoria", idCategoria},
                        { "idFase", idFase}
                    };
                var configuracion = await daoComisionConfiguracion.GetAll(p);

                /*Buscamos configuracion especifica por ubicacion*/

                var configuracionPorUbicacion = configuracion.Where(con => 
                    con.IdUbicacion == IdUbicacion &&
                    con.IdPrototipo == idPrototipo &&
                    con.IdEsquema == idEsquema &&
                    con.IdDesarrollo == idDesarrollo).ToList();

                /*Si existe configuracion especifica por ubicacion la asignamos*/
                if (configuracionPorUbicacion.Count() == 1)
                {
                    configuracionComisiones = configuracionPorUbicacion.First();
                }
                else
                {

                    /*Buscamos configuracion especifica por por desarrollo,prototipo y ubicacion*/
                    var configuracionPorPrototipoUbicacion = configuracion.Where(con =>
                        con.IdDesarrollo == idDesarrollo &&
                        con.IdPrototipo == idPrototipo &&
                        con.IdUbicacion==IdUbicacion &&
                        con.IdEsquema==0).ToList();

                    if (configuracionPorPrototipoUbicacion.Count() == 1)
                    {
                        configuracionComisiones = configuracionPorPrototipoUbicacion.First();
                    }
                    else
                    {
                       
                        var configuracionPorPrototipoEsquema = configuracion.Where(con => 
                            con.IdPrototipo == idPrototipo &&
                            con.IdEsquema == idEsquema &&
                            con.IdDesarrollo == idDesarrollo &&
                            con.IdUbicacion == 0).ToList();


                        if (configuracionPorPrototipoEsquema.Count() == 1)
                        {
                            configuracionComisiones = configuracionPorPrototipoEsquema.First();
                        }
                        else
                        {
                            /**Buscamos configuracion especifica por desarrollo prototipo*/
                            var configuracionPorPrototipo = configuracion.Where(con =>
                                con.IdDesarrollo == idDesarrollo &&
                                con.IdPrototipo == idPrototipo &&
                                con.IdEsquema==0 &&
                                con.IdUbicacion==0).ToList();

                            /*Si existe un unico elemento lo asignamos*/
                            if (configuracionPorPrototipo.Count() == 1)
                            {
                                configuracionComisiones = configuracionPorPrototipo.First();
                            }
                            else
                            {
                                /*Buscamos configuracion especifica por esquema*/
                                var configuracionPorEsquema = configuracion.Where(con => 
                                                              con.IdEsquema == idEsquema &&
                                                              con.IdDesarrollo == idDesarrollo &&
                                                              con.IdPrototipo == 0 &&
                                                              con.IdUbicacion == 0);


                                if (configuracionPorEsquema.Count() == 1)
                                {
                                    configuracionComisiones = configuracionPorEsquema.First();
                                }
                                else
                                {
                                    var configuracionPorDesarrollo = configuracion.Where(con =>
                                     con.IdDesarrollo == idDesarrollo &&
                                     con.IdEsquema == 0 &&
                                     con.IdPrototipo == 0 &&
                                     con.IdUbicacion == 0);

                                    if (configuracionPorDesarrollo.Count() == 1)
                                    {
                                        configuracionComisiones = configuracionPorDesarrollo.First();
                                    }
                                    else
                                    {

                                        if (configuracion.Count() == 1)
                                        {
                                            /*Sila configuracion es unicamente por desarrollo asignar*/
                                            if (configuracion[0].IdDesarrollo == idDesarrollo && configuracion[0].IdEsquema == 0
                                                && configuracion[0].IdPrototipo == 0
                                                && configuracion[0].IdUbicacion == 0)
                                                configuracionComisiones = configuracion.First();
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
                /*En caso de que no exista ninguna para el desarrollo buscamos solamente por fase y categoria*/
                if (configuracionComisiones.ID < 0)
                {
                    p.Clear();
                    p.Add("idCategoria", idCategoria);
                    p.Add("idFase", idFase);
                    configuracion = await daoComisionConfiguracion.GetAll(p);
                    if(configuracion.Count()==1)
                    {
                        configuracionComisiones = configuracion.First();
                    }
                }
                return configuracionComisiones;
            }
            catch
            {
                throw;
            }
        }

        public async Task<m.SCV.Interfaces.IComisionesSeguimiento> SaveConfiguracion(
            int idPeriodo,
            int idExpediente,
            int idCategoria,
            decimal? monto,
            int?porcentaje,
            int idUsuario,
            int?idVentaUbicacion, 
            int idProceso)
        {
                BeginTransaction(true);
                var comisiones = Get<m.SCV.Interfaces.IComisionesSeguimiento>();
                var daocomisiones = Get<d.SCV.Interfaces.IComisionesSeguimiento>();

                var bpCatalogoGeneral = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpCatalogoGeneral.Get("ESTATUSCOMISIONES", "PA");
                var tipoProceso = await bpCatalogoGeneral.Get("TIPOSPROCESOCOMISIONES", "SE");

                comisiones.IdTipo = tipoProceso.ID.Value;
                comisiones.IdProceso = idProceso;
                comisiones.IdPeriodoDetalle = idPeriodo;
                comisiones.IdExpediente = idExpediente;
                comisiones.IdCategoria = idCategoria;
                comisiones.IdVentaUbicacion = idVentaUbicacion;

                comisiones.Monto = monto;
                comisiones.Porcentaje = porcentaje;
                comisiones.IdUsuario = idUsuario;

                comisiones.IdCreadoPor = base.getUserId();
                comisiones.IdModificadoPor = base.getUserId();
                comisiones.Creado = DateTime.UtcNow;
                comisiones.FechaCalculo = DateTime.UtcNow;
                comisiones.Modificado = DateTime.UtcNow;
                comisiones.IdEstatus = estatus.ID;
                comisiones.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                comisiones = await daocomisiones.SaveEntity(comisiones);
                Commit();
                return comisiones;
        }

        public async Task<m.SCV.Interfaces.IComisionesSeguimiento> GuardarComisionComplementaria(
            m.SCV.Interfaces.IComisionesSeguimiento item,
            m.SCV.Interfaces.IComisionesComplementarias comisionComplementaria,
            int idProceso)
        {
            BeginTransaction(true);
            var comisionSeguimiento = Get<m.SCV.Interfaces.IComisionesSeguimiento>();
            var daocomisiones = Get<d.SCV.Interfaces.IComisionesSeguimiento>();

            var bpCatalogoGeneral = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpCatalogoGeneral.Get("ESTATUSCOMISIONES", "PA");
            var tipoProceso = await bpCatalogoGeneral.Get("TIPOSPROCESOCOMISIONES", "TABCOM");

            comisionSeguimiento.IdComisionPadre = item.ID.Value;
            comisionSeguimiento.IdTipo = tipoProceso.ID.Value;
            comisionSeguimiento.IdProceso = idProceso;
            comisionSeguimiento.IdPeriodoDetalle = item.IdPeriodoDetalle;
            comisionSeguimiento.IdExpediente = item.IdExpediente;
            comisionSeguimiento.IdCategoria = item.IdCategoria;
            comisionSeguimiento.IdVentaUbicacion = item.IdVentaUbicacion;

            comisionSeguimiento.Porcentaje = item.Porcentaje;
            comisionSeguimiento.IdUsuario = item.IdUsuario;

            comisionSeguimiento.IdCreadoPor = base.getUserId();
            comisionSeguimiento.IdModificadoPor = base.getUserId();
            comisionSeguimiento.Creado = DateTime.UtcNow;
            comisionSeguimiento.FechaCalculo = DateTime.UtcNow;
            comisionSeguimiento.Modificado = DateTime.UtcNow;
            comisionSeguimiento.IdEstatus = estatus.ID;
            comisionSeguimiento.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

            comisionSeguimiento.IdMoneda = item.IdMoneda;
            comisionSeguimiento.TipoCambio = item.TipoCambio;

            comisionSeguimiento.ValorComisionable = item.ValorComisionable;
            comisionSeguimiento.ValorComisionableMoneda = item.ValorComisionableMoneda;
            /*Si es un importe pasar tal cual de lo contrario calcular*/
            if (comisionComplementaria.Monto > 0)
            {

                /*Se asume que el monto del tabulador aplicara conforme a la moneda de operacion del desarrollo*/
                decimal montoComisionTabulador = comisionComplementaria.Monto;

                /*Comision moneda monto d eoperacion*/
                decimal? montoComisionReal = item.ComisionMoneda;

                decimal? montoComisionAplicar = montoComisionTabulador - montoComisionReal;

                /*Si el monto por aplicar es menor a 0  no guardar*/
                if (montoComisionAplicar <= 0)
                {
                    return null;
                }

                /*Monto Comision real a aplicar*/
                comisionSeguimiento.Monto = montoComisionAplicar;

                /*El campo comision es llenado con la conversion de la moneda base de la compañia*/
                comisionSeguimiento.Comision = (decimal)item.TipoCambio * (decimal)montoComisionAplicar;

                /*Moneda en la que opera el desarrollo*/
                comisionSeguimiento.ComisionMoneda = montoComisionAplicar;


            }
            else if (comisionComplementaria.Porcentaje > 0)
            {
                /*Comision que calcula el tabulador*/

                /*Cuanto fue de la comision*/

                decimal diferenciaPorcentaje = (decimal)comisionComplementaria.Porcentaje - (decimal)item.Porcentaje;

                if (diferenciaPorcentaje < 0)
                {
                    return null;
                }


                comisionSeguimiento.Porcentaje = diferenciaPorcentaje;

                /*Comisin moneda base de la compania*/

                /*To mando moneda base*/
                //comisionSeguimiento.Comision = (decimal)item.ValorComisionable * (decimal)diferenciaPorcentaje / 100M;

                /*Tomando moneda de operacion*/
                comisionSeguimiento.Comision = ((decimal)item.TipoCambio * ((decimal)item.ValorComisionableMoneda) * (decimal)diferenciaPorcentaje / 100M);

                /*Moneda de operacion*/
                comisionSeguimiento.ComisionMoneda = ((decimal)item.ValorComisionableMoneda * diferenciaPorcentaje) / 100M;
            }

            comisionSeguimiento.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
            comisionSeguimiento.ID = -1;

            comisionSeguimiento = await daocomisiones.SaveEntity(comisionSeguimiento);

            Commit();
            return comisionSeguimiento;
        }

        private async Task<m.SCV.Interfaces.IVentaUbicacion> obtenerValorUbicacion(int idVenta, int idUbicacion)
        {
            var daoVentaUbicacion = Get<d.SCV.Interfaces.IVentas>();
            return await daoVentaUbicacion.GetUbicacionPorVenta(idVenta, idUbicacion);
        }

        public async Task<m.SCV.Interfaces.IComisionesProceso> MarcarEjecucionFinalProceso(m.SCV.Interfaces.IComisionesProceso ejecucionProceso)
        {
            /*Acceso a datos*/
            var daoComisionProceso = Get<d.SCV.Interfaces.IComisionesProceso>();

            /*Guardando Fin del proceso*/
            ejecucionProceso.FechaFinProceso = DateTime.UtcNow;
            ejecucionProceso.IdModificadoPor = ejecucionProceso.IdCreadoPor; ;
            ejecucionProceso.Modificado = DateTime.UtcNow;
            ejecucionProceso.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
            return await daoComisionProceso.SaveEntity(ejecucionProceso);
        }

        private async Task<m.SCV.Interfaces.IComisionesSeguimiento> CalcularComision(
            int idConfiguracion, 
            decimal? valorComisionable, 
            decimal tipoCambio,
            int idMonedaDestino,
            string estatusCierreVenta)
        {
            try
            {
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

                var daoComision = Get<EK.Datos.SCV.Interfaces.IComisionesSeguimiento>();
                var item = await daoComision.GetById(idConfiguracion);



                /*El valor comisionable viene de la lista de precios
                 el cual se encuentra en la moneda de operacion del desarrollo
                 por lo cual es el valor comisionable moneda y vamos a calcula la moneda de origen*/

                if (valorComisionable != null)
                {
                    item.ValorComisionableMoneda = (decimal)valorComisionable;

                    /*Calcular moneda base*/
                    item.ValorComisionable = (decimal)valorComisionable * (decimal)tipoCambio;
                    item.IdMoneda = idMonedaDestino;
                    item.TipoCambio = tipoCambio;
                }
               

                /*
                 
                 *Prioridad 1 Porcentaje
                 *Prioridad 2 Importe

                    *Si el expediente tiene una ubicación tomar porcentaje, si no hay porcentaje tomar importe
                    *Si el expediente no tiene ubicación tomar valor del importe, si no hay importe tomar
                     porcentaje (lo cual generara una comisión de 0)

                */

                /*Si el proceso de cierre de venta esta completado valor comisionable tal cual de lo contrario 0*/
                valorComisionable = estatusCierreVenta == "E" ? valorComisionable : 0;


                /*Si ya existe una ubicacion*/
                if (estatusCierreVenta == "E" && item.IdVentaUbicacion>0)
                {
                    if (item.Porcentaje > 0)
                    {
                        item.Comision = CalcularPorcentaje((decimal)valorComisionable, (decimal)item.Porcentaje, tipoCambio);
                        item.ComisionMoneda = CalcularPorcentaje((decimal)valorComisionable, (decimal)item.Porcentaje, null); 
                    }
                    else if (item.Monto>0)
                    {

                        item.Comision =(decimal)tipoCambio * (decimal)item.Monto;
                        item.ComisionMoneda = item.Monto;
                    }

                }
                else
                {
                    if (item.Monto > 0)
                    {
                        item.Comision = (decimal)tipoCambio * (decimal)item.Monto;
                        item.ComisionMoneda = item.Monto;
                    }
                    else if (item.Porcentaje > 0)
                    {
                        item.Comision = CalcularPorcentaje((decimal)valorComisionable, (decimal)item.Porcentaje, tipoCambio);
                        item.ComisionMoneda = CalcularPorcentaje((decimal)valorComisionable, (decimal)item.Porcentaje, null);
                        
                    }
                }


                item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                item= await daoComision.SaveEntity(item);
                return item;
            }
            catch(Exception ex)
            {
                Rollback();

                throw new ApplicationException("CalcularComision::" + ex.Message, ex);
            }
        }

        private decimal CalcularPorcentaje(decimal total, decimal porcentaje, decimal?  tipoCambio)
        {
            decimal valorPorcentaje = 0;

            if (tipoCambio == null)
            {
                valorPorcentaje = (total * porcentaje) / 100M;
            }
            else
            {
                valorPorcentaje = ( ((decimal)tipoCambio*total) * porcentaje) / 100M;

            }
            return valorPorcentaje;
        }
        public async Task<bool> SaveConfiguracionDetalle(
            int idComision,
            int idCategoria,
            decimal montoComision, 
            int idMonedaDestino, 
            decimal tipoCambio, 
            int idProceso,
            dynamic item, 
            bool existe)
        {
            /*Monto comision equivale a la moneda de operacion*/
            BeginTransaction(true);
            bool result = true;
            try
            {
                var daocomisiones = Get<d.SCV.Interfaces.IComisionesSeguimientoDetalle>();

                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusProceso = await bpEstatus.Get("ESTATUSCOMISIONES", "PA");


                var comisionDetalle = Get<m.SCV.Interfaces.IComisionesSeguimientoDetalle>();


                /*Columas de kontrol*/
                comisionDetalle.IdCreadoPor = base.getUserId();
                comisionDetalle.IdModificadoPor = base.getUserId();
                comisionDetalle.Creado = DateTime.UtcNow;


                comisionDetalle.Modificado = DateTime.UtcNow;
                comisionDetalle.IdEstatus = estatusProceso.ID;
                comisionDetalle.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

                comisionDetalle.FechaCalculo = DateTime.UtcNow;

                if (existe)
                {
                    comisionDetalle.FechaEjecucion = DateTime.UtcNow;
                }



                /*Columnas adicionales*/
                comisionDetalle.IdComision = idComision;
                comisionDetalle.IdEtapa = (int)item.IdEtapa;
                comisionDetalle.IdTipoComision= (int)item.IdTmComision;


                /*Columnas Calculadas*/
                comisionDetalle.Porcentaje = (decimal)item.Porcentaje;

                /*Calculo de la comision*/
                comisionDetalle.Comision = CalcularPorcentaje(montoComision, (decimal)item.Porcentaje, tipoCambio);
                comisionDetalle.ComisionMoneda = CalcularPorcentaje(montoComision, (decimal)item.Porcentaje,null);  

                /*Importes por pagar*/
                comisionDetalle.ImporteAplicado = 0;
                comisionDetalle.ImportePorAplicar = comisionDetalle.ComisionMoneda;

                comisionDetalle.IdMoneda = idMonedaDestino;
                comisionDetalle.TipoCambio = (decimal)tipoCambio;

                /*Columnas de kontrol del proceso*/
                comisionDetalle.IdProceso = idProceso;
                comisionDetalle.IdEstatusProceso = estatusProceso.ID.Value;
                comisionDetalle = await daocomisiones.SaveEntity(comisionDetalle);

                Commit();
            }
            catch
            {
                result = false;
                throw;

            }

            return result;
        }
        public async Task<m.SCV.Interfaces.IComisionAniosPeriodos> ObtenerPeriodoCalculo(Dictionary<string,object> parametros)
        {
            var daoComisionesPeriodos = Get<d.SCV.Interfaces.IComisionAniosPeriodos>();

            object periodoDetalle = 0;
            parametros.TryGetValue("idPeriodoDetalle", out periodoDetalle);
            return await daoComisionesPeriodos.GetById(Convert.ToInt32(periodoDetalle));
        }

        public async Task<bool> ActualizarImportes(m.SCV.Interfaces.IComisionesAprobacion item, m.Kontrol.Interfaces.IItemGeneral estatus)
        {
            bool result = false;

            try
            {
                BeginTransaction(true);

                var daoComisionesSeguimientoDetalle = Get<d.SCV.Interfaces.IComisionesSeguimientoDetalle>();
                var comision = await daoComisionesSeguimientoDetalle.GetById(item.Referencia.ID.Value);


                comision.IdEstatus = estatus.ID.Value;
                comision.ImporteAplicado = item.ImporteAplicado;
                comision.ImportePorAplicar = item.ImportePorAplicar;
                comision.IdModificadoPor = base.getUserId();
                comision.Modificado = DateTime.UtcNow;
                await daoComisionesSeguimientoDetalle.SaveEntity(comision, false);
                result = true;
                Commit();
            }
            catch
            {
                throw;
            }

            return result;
        }


        public async Task<List<m.SCV.Interfaces.IComisionesSeguimientoDetalle>> ObtenerComisionesPorExpediente(int IdExpediente)
        {
            return await this.dao.ComisionesPorExpediente(IdExpediente);
        }
    }
}
