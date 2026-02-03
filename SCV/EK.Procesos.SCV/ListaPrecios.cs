using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Text;

namespace EK.Procesos.SCV
{
    public class ListaPrecios
        : p.Kontrol.BPBase<m.SCV.Interfaces.IListaPrecios, d.SCV.Interfaces.IListaPrecios>,
        p.SCV.Interfaces.IListaPrecios,p.Kontrol.Interfaces.IWorkflowBP
    {
        public ListaPrecios(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IListaPrecios dao)
            : base(factory, dao, "ListaPrecios")
        {
        }

        /*Validar lista de precios existente por Desarrollo y tipo de comercialiacion*/
        public async Task<string> ValidarExistenciaLP(int idDesarrollo, int idTipoComercializacion)
        {
            var daoListaPreciosVersio = Get<d.SCV.Interfaces.IListaPreciosVersiones>();
            var modeloListaPrecios = Get<m.SCV.Interfaces.IListaPrecios>();

            string estatusLP = "";

            var parametros = new Dictionary<string, object> {
                { "IdTipoOperacion", idTipoComercializacion},
                { "IdDesarrollo", idDesarrollo },
                { "LPVigente", true }
            };
            var ultimaVersionPorDesarrolloyComercializacion = await daoListaPreciosVersio.GetAll(parametros);

            /*SI NO EXISTEN LISTA DE PRECIOS VIGENTES PARA ESTE DESARROLLO Y TIPO DE COMERCIALZACION*/
            if (ultimaVersionPorDesarrolloyComercializacion.Count == 0)
            {
                /*REVISAMOS SI EXISTEN NO VIGENTES*/
                parametros.Remove("LPVigente");
                var existsLP = await daoListaPreciosVersio.GetAll(parametros);


                if (existsLP.Count == 0)
                {
                    /*NO HAY NINGUNA LISTA DE PRECIOS CREADA*/
                    estatusLP = "SLP";
                }
                else
                {
                    /*SI HAY LISTA DE PRECIOS PERO NO HAY VIGENTE */
                    estatusLP = "LPNV";
                }
            }
            else
            {
                estatusLP = "LPV";
            }

            return estatusLP;
        }


        /*metodo que consulta el proceso de ventas para obtener el precio de una ubicacion*/
        public async Task<m.SCV.Interfaces.IListaPrecios> GetByUbicacion(int idUbicacion, int idEsquema, List<m.SCV.Interfaces.IVentaCaracteristica> caracteristicas, int idExpediente)
        {
            var caracteristicasDAO = Get<d.SCV.Interfaces.ICaracteristicaAdicional>();
            var daoListaPreciosVersio = Get<d.SCV.Interfaces.IListaPreciosVersiones>();
            var caracteristica = Get<m.SCV.Interfaces.IEntidadCaracteristica>();
            var modeloListaPrecios = Get<m.SCV.Interfaces.IListaPrecios>();

            var daoExpediente = Get<d.SCV.Interfaces.IExpedientes>();
            //Consultando Expediente
            var expediente = await daoExpediente.GetById(idExpediente);

            var parametros = new Dictionary<string, object> {
                { "IdTipoOperacion", expediente.IdTipoComercializacion },
                { "IdDesarrollo", expediente.IdDesarrollo },
                { "LPVigente", true }
            };
            var ultimaVersionPorComercializacion = await daoListaPreciosVersio.GetAll(parametros);

            if (ultimaVersionPorComercializacion.Count != 0 && ultimaVersionPorComercializacion != null)
            {
                //Obteniendo Ubicacion por ID
                parametros = new Dictionary<string, object> { { "IdUbicacion", idUbicacion }, { "IdVersion", ultimaVersionPorComercializacion[0].ID } };
                modeloListaPrecios = await this.dao.GetByUbicacionId(parametros);

                //Si el resultado es diferente a nulo
                if (modeloListaPrecios != null)
                {
                    //Inicializamos lista de caracteristicas
                    modeloListaPrecios.Caracteristicas = new List<m.SCV.Interfaces.IEntidadCaracteristica>();
                    //Inicializar el valor ubicación 
                    modeloListaPrecios.ValorUbicacion = 0;

                    //Asignando caracteristicas Obligatorias de  Ubicacion,Prototipos,Desarrollo
                    parametros = new Dictionary<string, object>() { { "IdEntidad", idUbicacion }, { "ClaveEntidad", "U" }, { "VentaOpcional", true }, { "TodasEntidades", true } };
                    modeloListaPrecios.Caracteristicas = await caracteristicasDAO.GetCaracteristicas(parametros);
                   
                    //Obtenemos el valor calculado de la ubicacion
                    this.Calcular(ref modeloListaPrecios, ultimaVersionPorComercializacion[0]);//Devuelve valor Calculado en Propiedad Valor Actual

                    //Si el Valor Autorizado es 0 o nulo lo igualamos al valor Calculado
                    // Valor Calculado= Valor Actual
                    if (modeloListaPrecios.ValorAutorizado == 0 || modeloListaPrecios.ValorAutorizado == null)
                    {
                        modeloListaPrecios.ValorAutorizado = modeloListaPrecios.ValorCalculado;//Igualamos el Valor Autorizado al Sugerido
                    }

                    //Asignar el valor de la ubicación de acuerdo a las caracteristicas requeridas y prototipo
                    modeloListaPrecios.ValorUbicacion = modeloListaPrecios.ValorAutorizado;

                    //{Agregar las caracteristicas obligatorias por desarrollo-esquema al valor autorizado de la ubicación}
                    if (idEsquema != 0)
                    {
                        parametros = new Dictionary<string, object>() { { "IdEntidad", idEsquema }, { "ClaveEntidad", "E" }, { "VentaOpcional", true } };
                        var caracteristicasEsquemas = await caracteristicasDAO.GetCaracteristicas(parametros);
                        if (caracteristicasEsquemas != null)
                        {
                            foreach (var c in caracteristicasEsquemas)
                            {
                                //c.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                modeloListaPrecios.Caracteristicas.Add(c);
                                modeloListaPrecios.ValorAutorizado = modeloListaPrecios.ValorAutorizado + c.Importe;
                                modeloListaPrecios.ValorUbicacion = modeloListaPrecios.ValorUbicacion + c.Importe;
                            }
                        }
                    }

                    //Agregar al último las caracteristicas adicionales seleccionadas en el React
                    if (caracteristicas != null)
                    {
                        foreach (var c in caracteristicas)
                        {
                            //GetCaracteristicas
                            caracteristica = await caracteristicasDAO.GetCaracteristicasById((int)c.IdEntidadCaracteristica);

                            if (caracteristica != null)
                            {
                                if (caracteristica.VentaOpcional == false)
                                {
                                    //Validar que la caracteristica adicional esté activa en el React
                                    //caracteristica.Estado = c.Estado;
                                    modeloListaPrecios.Caracteristicas.Add(caracteristica);

                                    if (caracteristica.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado)
                                    {
                                        modeloListaPrecios.TotalCAdicionales = modeloListaPrecios.TotalCAdicionales ?? 0;
                                        // modeloListaPrecios.ValorAutorizado = modeloListaPrecios.ValorAutorizado + caracteristica.Importe;
                                        modeloListaPrecios.TotalCAdicionales = modeloListaPrecios.TotalCAdicionales + caracteristica.Importe;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return modeloListaPrecios;
        }
       
        /*Calcula el valor autorizado de una ubicacion*/
        private void Calcular(ref m.SCV.Interfaces.IListaPrecios item, m.SCV.Interfaces.IListaPreciosVersiones versionLP)
        {
            //Valor Actual es el valor Calculado
            if (item != null)
            {
                item.ValorCalculado = item.ValorBase
                    + item.TotalCaracteristicas +
                    (item.Ubicacion.Excedente * versionLP.PrecioExcedenteM2Version );
            }
        }

        public new async  Task<List<m.SCV.Interfaces.IListaPreciosVersiones>> GetAll(Dictionary<string, object> parametros)
        {
            var daoListaPreciosVersion = this.factory.GetInstance<d.SCV.Interfaces.IListaPreciosVersiones>();
            List<m.SCV.Interfaces.IListaPreciosVersiones> listaDePrecios = await daoListaPreciosVersion.GetAll(parametros);
            //foreach (var item in listaDePrecios)
            //{
            //}
            return listaDePrecios;
        }

        /*Se genera una nueva version de la lista de precios*/
        public async Task<m.SCV.Interfaces.IListaPreciosVersiones> SaveVersion(m.SCV.Interfaces.IListaPreciosVersiones item)
        {
            try
            {

                int idInicial = item.ID.Value;
                var ubicacionesModificadas = item.listaPreciosUbicaciones;

                /*Acceso a datos*/
                var daoListaPreciosVersion = this.factory.GetInstance<d.SCV.Interfaces.IListaPreciosVersiones>();
                var daoListaPreciosAvaluo = this.factory.GetInstance<d.SCV.Interfaces.IListaPreciosAvaluo>();
                var daoListaPrecios = this.factory.GetInstance<d.SCV.Interfaces.IListaPrecios>();
                var bpDesarrollo = this.factory.GetInstance<d.SCV.Interfaces.IDesarrollos>();
                var modeloListaPrecios = this.factory.GetInstance<m.SCV.Interfaces.IListaPrecios>();


                bool validaciones = true;

                Dictionary<string, object> parametros = new Dictionary<string, object>();


                if (validaciones && item.ID<0)
                {
                    /*Validacion una sola lista con estatus Drap por Desarrollo y tipo de operacion*/
                    parametros.Add("IdTipoOperacion", item.IdTipoOperacion);
                    parametros.Add("IdDesarrollo", item.IdDesarrollo);
                    parametros.Add("claveEstatus", "D");
                    parametros.Add("idNotIn", item.ID);
                 
                    var validacionEstatus = await this.GetAllVersiones(parametros);
                    validaciones = validacionEstatus.Count==0 ? true : false;
                }

                if (validaciones && item.ID<0)
                {
                    /*Mas de una ubicacion por Desarollo Seleccionado*/
                    parametros.Clear();
                    parametros.Add("id", item.IdDesarrollo);
                    parametros.Add("idUsuario", base.getUserId());

                    dynamic validacionUbicaciones = await bpDesarrollo.GetByDesarrolloId(parametros);
                    int cantidadUbicaciones = validacionUbicaciones.cantidadUbicaciones;
                    validaciones = cantidadUbicaciones >0 ? true : false;
                }


            if (validaciones)
            {
                    /*Obtenemos Estatus*/
                    var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var estatus = await bpEstatus.Get("ESTATUS", "A");

                    int idVersionVigente = 0;

                    BeginTransaction(true);
                    /*Si es una nueva versión de la lista de precios*/

                    if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Nuevo)
                    {
                        /*Estatus de lista de precios*/
                        var estatusLP = await bpEstatus.Get("ESTATUSLISTAPRECIOS", "D");

                        /*ObtenerVersionExistente*/

                        parametros.Clear();
                        parametros.Add("IdTipoOperacion", item.IdTipoOperacion);
                        parametros.Add("IdDesarrollo", item.IdDesarrollo);
                        parametros.Add("version", true);

                        var ultimaVersionPorComercializacion = await daoListaPreciosVersion.GetAll(parametros);

                        /*Si no hay Ninguna Version*/
                        if (ultimaVersionPorComercializacion == null || ultimaVersionPorComercializacion.Count == 0)
                        {
                            item.NVersion = 1;
                        }
                        else
                        {
                            /*Asignar version existente*/
                            item.NVersion = ultimaVersionPorComercializacion[0].NVersion + 1;
                            idVersionVigente = ultimaVersionPorComercializacion[0].ID.Value;
                        }

                        item.IdCreadoPor = base.getUserId();
                        item.Creado = DateTime.UtcNow;
                        item.IdEstatus = estatusLP.ID;

                        item.PrecioExcedenteM2 = item.Desarrollo.PrecioExcedenteM2;
                        item.PrecioExcedenteM2Version = item.Desarrollo.PrecioExcedenteM2;
                    }
                    item.IdModificadoPor = this.getUserId();
                    item.Modificado = DateTime.UtcNow;
                    item = await daoListaPreciosVersion.Save(item);

                    if (idInicial < 0)
                    {
                        /*Guardar Vigencia en tabla de extension Hasta de la lista  de precios*/
                        await GuardarExtensionLP(item.ID.Value, item.VigenteHasta, "D");

                        /*Si es nueva version de ejecuta sp para guardar todas la subicaciones dado un desarrollo*/
                        modeloListaPrecios.IdCreadoPor = base.getUserId();
                        modeloListaPrecios.IdModificadoPor = this.getUserId();
                        int ID = await daoListaPrecios.Save(item, idVersionVigente);

                    }
                    else
                    {
                        //si no es nueva version actualizar unicamente ubicaicones modificadas
                        if (ubicacionesModificadas != null && ubicacionesModificadas.Count > 0)
                        {
                            foreach (var elemento in ubicacionesModificadas)
                            {
                                elemento.IdVersion = (Int32)item.ID;
                                //Operaciones por prototipo
                                if (elemento.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                                {
                                   
                                    elemento.Modificado = DateTime.UtcNow;
                                    elemento.IdModificadoPor = base.getUserId();
                                    if (elemento.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                    {
                                        elemento.Estatus = estatus;
                                        elemento.IdEstatus = estatus.ID;
                                        elemento.Creado = DateTime.UtcNow;
                                        elemento.IdCreadoPor = base.getUserId();
                                    }

                                    await daoListaPrecios.Save(elemento);
                                   
                                }
                             
                            }
                        }
                    }
                    Commit();
            }
            else
            {
                base.SetReturnInfo(1, "La vigencia de la lista de precios debe ser mayor a la ultima versión aprobada", 1);
            }

            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }
            return item;
        }
       
        /*Obtener una version de la lista de precios por Id desde el catalogo*/
        public new async Task<m.SCV.Interfaces.IListaPreciosVersiones> GetById(int id)
        {
            var daoListaPreciosV = Get<d.SCV.Interfaces.IListaPreciosVersiones>();
            var mListaPreciosV = await daoListaPreciosV.GetById(id);
            return mListaPreciosV;

        }
        /*Obtener listado de versiones de la lista de precios*/
        public async Task<List<m.SCV.Interfaces.IListaPreciosVersiones>> GetAllVersiones(Dictionary<string, object> parametros)
        {
            var daoListaPreciosVersion = this.factory.GetInstance<d.SCV.Interfaces.IListaPreciosVersiones>();
            List<m.SCV.Interfaces.IListaPreciosVersiones> listaDePrecios = await daoListaPreciosVersion.GetAll(parametros);
            return listaDePrecios;
        }
        
        /*Implementacion del metodo Eliminar*/
        public new async Task<m.SCV.Interfaces.IListaPreciosVersiones> Delete(int id)
        {
            var daoLPExtensionVigencia = Get<d.SCV.Interfaces.ILPExtensionVigencia>();

            m.SCV.Interfaces.IListaPreciosVersiones retValue = null;
            var daoListaPreciosV = Get<d.SCV.Interfaces.IListaPreciosVersiones>();

            BeginTransaction();
            try
            {
                /*Obteniendo elemento a eliminar*/
                retValue = await daoListaPreciosV.GetById(id);
                /*Obteniendo vigencia extendida a eliminar*/
                Dictionary<string, object> pa = new Dictionary<string, object> { { "IdVersion", id }, { "claveEstatus", "D" } };
                var elementoVigenciaExtendida = await this.ObtenerExtensionVigenciaLP(pa);
                if(elementoVigenciaExtendida!=null)
                {
                    await daoLPExtensionVigencia.Delete(elementoVigenciaExtendida.ID.Value);
                }

                /*Eliminando ubicaciones*/
                await daoListaPreciosV.Delete(id);
                var deletedItem = await daoListaPreciosV.GetById(id);
                if (deletedItem == null)
                {
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    retValue = deletedItem;
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                }

                await Log(retValue);
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            return retValue;
        }

        //public async Task<bool> ValidarVigenciaLP(m.SCV.Interfaces.IListaPreciosVersiones item, string tipoValidacion,DateTime? vigenteHastaExtendida)
        //{
        //    string parametro = tipoValidacion == "extensionLP" ? "VigenteValidacionExtension" : "VigenteValidacion";
        //    DateTime? valorParametro = tipoValidacion == "extensionLP" ? vigenteHastaExtendida : item.VigenteDesde;

        //    /*Validacion Fecha mayor que la ultima version registrada por Desarrollo y tipo de operacion*/
        //    Dictionary<string, object> p = new Dictionary<string, object> {
        //        { "IdTipoOperacion", item.IdTipoOperacion },
        //        { "IdDesarrollo", item.IdDesarrollo },
        //        { "idNotIn", item.ID},
        //        { parametro, valorParametro }
        //        //{ "VigenteValidacion", item.VigenteDesde }

        //    };
        //    var validacionVigencia = await this.GetAllVersiones(p);

        //    return validacionVigencia.Count == 0 ? true : false;
        //}


        #region "Incremento Valores Lista de Precios"
        /*Incremento del valor Base d eun Prototipo*/
        private async Task<m.SCV.Interfaces.IDesarrolloPrototipo> IncrementoValorBase(m.SCV.Interfaces.IDesarrolloPrototipo desarrolloPrototipo, decimal valorIncremento, string tipoIncremento)
        {
            var daoDesarrolloPrototipo = this.factory.GetInstance<d.SCV.Interfaces.IDesarrollosPrototipo>();
            
            /*Obtenemos el valor guardado en la base de datos*/
            decimal valorBaseOriginal = desarrolloPrototipo.PrecioBase;

            /*Calculamos el valor del prototipo enviando cuanto se va a incrementar, sobre que campo se va a efectuar el incremento
             y si este incremento va a hacer por importe o porcentaje*/
            desarrolloPrototipo.PrecioBase = CalculoIncremento(valorIncremento, desarrolloPrototipo.PrecioBase, tipoIncremento);

            /*Modificamos la entidad*/
            desarrolloPrototipo.Modificado = DateTime.UtcNow;
            desarrolloPrototipo.IdModificadoPor = base.getUserId();

            /*Guardamos el cambio de precio en el prototipo*/
            await daoDesarrolloPrototipo.Save(desarrolloPrototipo);

            /*Estableciendo mensaje del Log*/
            string mensajeEvento = tipoIncremento == "Importe" ? "El valor base del prototipo " + desarrolloPrototipo.Prototipo.Nombre +
                " se incremento " + Convert.ToString(valorIncremento) + "( de " + Convert.ToString(valorBaseOriginal) + " a " + Convert.ToString(desarrolloPrototipo.PrecioBase) + ")"
                :
              "El valor base del prototipo " + desarrolloPrototipo.Prototipo.Nombre +
                " se incremento en un " + Convert.ToString(valorIncremento) + "% (de " + Convert.ToString(valorBaseOriginal) + " a " + Convert.ToString(desarrolloPrototipo.PrecioBase) + ")";

            /*Añadiendo eventos al catalogo de desarrollos y lista de precios*/
            await LogEvent(desarrolloPrototipo.IdDesarrollo, "Desarrollos", 1053, mensajeEvento);

            return desarrolloPrototipo;
        }

       /*Incremento valores lista de precios*/
       public async Task<m.SCV.Interfaces.IListaPreciosVersiones> AplicarIncremento(Dictionary<string, object> parametros)
        {
            var daoListaPrecios = this.factory.GetInstance<d.SCV.Interfaces.IListaPrecios>();
            var daoDesarrolloPrototipo = this.factory.GetInstance<d.SCV.Interfaces.IDesarrollosPrototipo>();

            object clavePrototipo = string.Empty;
            object idVersion = string.Empty;
            object opcionesDeIncremento = string.Empty;
            object tipoDeIncremento = string.Empty;
            object valorDeIncremento = string.Empty;


            /*Obteniendo parametros Id de  version de lista de precios y  nueva vigencia hasta*/
            parametros.TryGetValue("clavePrototipo", out clavePrototipo);
            parametros.TryGetValue("idVersion", out idVersion);
            parametros.TryGetValue("opcionesIncremento", out opcionesDeIncremento);
            parametros.TryGetValue("tipoIncremento", out tipoDeIncremento);
            parametros.TryGetValue("valorIncremento", out valorDeIncremento);

            /*Obteniendo opcion de Incremento (valor base, valor comisionable, valor operativo)*/
            string opcionesIncremento = Convert.ToString(opcionesDeIncremento);

            /*Obteniendo tipo de Incremento ya sea  Importe o Porcentaje*/
            string tipoIncremento = Convert.ToString(tipoDeIncremento);

            /*Obteniendo variable a incrementar*/
            decimal valorIncremento = Convert.ToDecimal(valorDeIncremento);

            /*Obteniendo version de la lista de precios*/
            var daoLPV = this.factory.GetInstance<d.SCV.Interfaces.IListaPreciosVersiones>();
            var listaPreciosVersion = await daoLPV.GetById(Convert.ToInt32(idVersion));

            /*Obtenemos el prototipo*/
            var daoPrototipo = this.factory.GetInstance<d.SCV.Interfaces.IPrototipos>();
            var prototipoEntidad = await daoPrototipo.GetByClave(Convert.ToString(clavePrototipo));

            /*Identificando si existen algun prototipo*/
            int idPrototipo = prototipoEntidad != null ? prototipoEntidad.ID.Value : 0;

            /*Preparando parametros para la consulta de ubicaciones*/
            Dictionary<string, object> pa = new Dictionary<string, object> { { "IdVersion", idVersion }, { "idPrototipo", idPrototipo} };

            /*Obteniendo ubicaciones a las cuales  se les va a aplicar el incremento*/
            var ubicaciones = await this.ObtenerUbicacionesLP(pa);

            /*Si la opcion a incrementar es el valor Base del prototipo*/
            if (opcionesIncremento == "VB")
            {
                if (idPrototipo == 0)
                {
                    /*Si se van a actualizar todos los prototipos obtenemos listado de prototipos a actualizar*/
                    Dictionary<string, object> param = new Dictionary<string, object> { { "IdDesarrollo", listaPreciosVersion.IdDesarrollo } };
                    var desarrollosPrototipos = await daoDesarrolloPrototipo.GetAll(param);
                    foreach (var item in desarrollosPrototipos)
                    {
                        await this.IncrementoValorBase(item, valorIncremento, tipoIncremento);
                    }

                  
                }
                else
                {
                    /*Si se van a actualizar solo un prototipo*/
                    var desarrolloPrototipo = await daoDesarrolloPrototipo.ObtenerPrototipoPorDesarrollo(listaPreciosVersion.IdDesarrollo, prototipoEntidad.ID.Value);
                    decimal valorBaseOriginal = desarrolloPrototipo.PrecioBase;

                    await this.IncrementoValorBase(desarrolloPrototipo, valorIncremento, tipoIncremento);

                }


                foreach (var ubi in ubicaciones)
                {
                    ubi.ValorBase = this.CalculoIncremento(valorIncremento, (decimal)ubi.ValorBase, tipoIncremento);
                    ubi.Modificado = DateTime.UtcNow;
                    ubi.IdModificadoPor = base.getUserId();
                    await daoListaPrecios.Save(ubi);
                }

                string mensajePrototipo = prototipoEntidad != null ? " del prototipo " + prototipoEntidad.Nombre : "";

                string mensajeEvento = tipoIncremento == "Importe" ? "El valor base "+mensajePrototipo+" se incremento " + Convert.ToString(valorIncremento)
                  : "El valor base "+mensajePrototipo+" se incremento en un " + Convert.ToString(valorIncremento) + "%";

                await LogEvent(listaPreciosVersion.ID.Value, "listaPrecios", 1053, mensajeEvento);

                /*Enviando Mensaje a la aplicación*/
                base.SetReturnInfo(1, "La lista de precios ha sido actualizada", 0);
            }
            else
            {


                /*Si la opcion de incremento es el valor comisionable*/
                if (opcionesIncremento == "VC")
                {
                    foreach (var item in ubicaciones)
                    {
                        item.ValorComisionable = CalculoIncremento(valorIncremento, Convert.ToDecimal(item.ValorComisionable), tipoIncremento);
                        item.Modificado = DateTime.UtcNow;
                        item.IdModificadoPor = base.getUserId();
                        await daoListaPrecios.Save(item);
                    }
                }
                else if (opcionesIncremento == "VO")
                {
                    /*Si la opcion de incremento es el valor operativo*/
                    /*Recorremos el arreglo de ubicacion incrementado su valor segun el tip de incremento*/
                    foreach (var item in ubicaciones)
                    {
                        item.ValorAutorizado = CalculoIncremento(valorIncremento,Convert.ToDecimal(item.ValorAutorizado), tipoIncremento);
                        item.Modificado = DateTime.UtcNow;
                        item.IdModificadoPor = base.getUserId();
                        await daoListaPrecios.Save(item);
                    }
                }

                /*Obtenemos el registro del campo al cual se le aplico el incremento*/
                var bpCatalogoGeneral = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var opcionIncrementoNombre = await bpCatalogoGeneral.Get("INCREMENTOVALORESLP", opcionesIncremento);

                /*Creamos mensaje del log*/
                string mensajePrototipo=prototipoEntidad!=null ? " del prototipo " + prototipoEntidad.Nombre:"";

                string mensajeEvento = tipoIncremento == "Porcentaje" ?
                    "El " + opcionIncrementoNombre.Nombre + mensajePrototipo + " se incremento en un " + Convert.ToString(valorIncremento)+ " %" :
                    "El " + opcionIncrementoNombre.Nombre + mensajePrototipo + " tuvo un aumento de " + Convert.ToString(valorIncremento);

                /*Agregamos mensaje al log*/
                await LogEvent(listaPreciosVersion.ID.Value, "listaPrecios", 1053, mensajeEvento);
                base.SetReturnInfo(1, "La lista de precios ha sido actualizada", 0);

            }
            return listaPreciosVersion;
        }

        private decimal CalculoIncremento(decimal valorIncrementar,decimal opcionIncremento,string tipoIncremento)
        {
            decimal result= 0;
            switch(tipoIncremento)
            {
                case "Importe":
                    result = opcionIncremento + valorIncrementar;
                    break;

                case "Porcentaje":
                    decimal cantidadPorcentaje = (opcionIncremento * valorIncrementar) / 100;
                    result = opcionIncremento + cantidadPorcentaje;
                    break;
            }
            return result;
        }

        #endregion

        #region "Obtener listado de ubicaciones de lista de precios"
        private async Task<List<m.SCV.Interfaces.IListaPrecios>> ObtenerUbicacionesLP(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IListaPrecios>();
            var daoC = Get<d.SCV.Interfaces.ICaracteristicaAdicional>();
            List<m.SCV.Interfaces.IListaPrecios> listaDePrecios = await daoRL.GetAll(parametros);
            return listaDePrecios;
        }
        public async Task<List<m.SCV.Interfaces.IListaPrecios>> ObtenerUbicaciones(Dictionary<string, object> parametros)
        {
            /*Ontenemos Listado de ubicaciones*/
            List<m.SCV.Interfaces.IListaPrecios> listaDePrecios = await ObtenerUbicacionesLP(parametros);

            try {

                object version = null;
                parametros.TryGetValue("IdVersion", out version);
                int idVersion = Convert.ToInt32(version);

                var versionLP = await this.GetById(idVersion);

                /*Recorremos cada elemento*/
                for (int cont = 0; cont < listaDePrecios.Count; cont++)
                {

                    /*Variable para determinar si guardamos cambios en la bd*/
                    bool guardarEntidad = false;

                    /*variable para asignar el elemento en curso*/
                    var item = listaDePrecios[cont];

                    /*Calculamos el valor calculado*/
                    this.Calcular(ref item, versionLP);

                    /*Validamos si el valor comisionable no es nulo le asignamos valor*/
                    if (item.ValorComisionable == null)
                    {
                        item.ValorComisionable = item.ValorCalculado;
                        guardarEntidad = true;

                    }

                    /*Validamos si el valor autorizado no es nulo le asignamos valo*/
                    if (item.ValorAutorizado == null)
                    {
                        item.ValorAutorizado = item.ValorCalculado;
                        guardarEntidad = true;
                    }

                    /*Guardamos la entidad si alguno de los anteriores tiene un valor
                     (Valor comisionable, Valor Autorizado)*/
                    if (guardarEntidad)
                    {

                        /*Rescatamos el valor calculado*/
                        decimal? valorCalculado = item.ValorCalculado;

                        /*Guardamos la entidad*/
                        listaDePrecios[cont] = await this.dao.SaveEntity(item, true);

                        /*Asignamos valor al elemento en curso.*/
                        listaDePrecios[cont].ValorCalculado = valorCalculado;
                    }
                }
            }
            catch(Exception ex)
            {
                throw new ApplicationException("ObtenerUbicaciones::" + ex.Message, ex);
            }
            return listaDePrecios;
        }
        public async Task<List<m.SCV.Interfaces.IListaPrecios>> ObtenerUbicacionesRecalcularValorAutorizado(Dictionary<string, object> parametros)
        {
            List<m.SCV.Interfaces.IListaPrecios> listaDePrecios = await ObtenerUbicacionesLP(parametros);


            object version = null;
            parametros.TryGetValue("IdVersion", out version);
            int idVersion = Convert.ToInt32(version);
            var versionLP = await this.GetById(idVersion);

            foreach (var item in listaDePrecios)
            {
                var retValue = item;
                this.Calcular(ref retValue,versionLP);
                if (item.ValorAutorizado == null)
                {
                    item.ValorAutorizado = item.ValorCalculado;
                    await this.dao.SaveEntity(item);
                }
            }
            return listaDePrecios;
        }
        public async Task<List<m.SCV.Interfaces.IListaPrecios>> ObtenerUbicacionesRecalcularValorCalculado(Dictionary<string, object> parametros)
        {
            object version = null;
            parametros.TryGetValue("IdVersion", out version);
            int idVersion = Convert.ToInt32(version);
            var versionLP = await this.GetById(idVersion);

            List<m.SCV.Interfaces.IListaPrecios> listaDePrecios = await ObtenerUbicacionesLP(parametros);
            foreach (var item in listaDePrecios)
            {
                var retValue = item;
                this.Calcular(ref retValue, versionLP);
                item.ValorAutorizado = item.ValorCalculado;
                await this.dao.SaveEntity(item);
            }
            return listaDePrecios;
        }
        #endregion

        #region "ExtensionVigencia"
        private async Task<m.SCV.Interfaces.ILPExtensionVigencia> GuardarExtensionLP(int IdVersion, DateTime Vigencia, string claveEstatus)
        {
            m.SCV.Interfaces.ILPExtensionVigencia retvalue=null;
            try
            {
                var daoLPVExtensionVigencia = this.factory.GetInstance<d.SCV.Interfaces.ILPExtensionVigencia>();
                var moLPVExtensionVigencia = this.factory.GetInstance<m.SCV.Interfaces.ILPExtensionVigencia>();
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

                var estatus = await bpEstatus.Get("ESTATUSLISTAPRECIOS", claveEstatus);
                moLPVExtensionVigencia.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                moLPVExtensionVigencia.IdVersion = IdVersion;
                moLPVExtensionVigencia.VigenteHasta = Vigencia;
                moLPVExtensionVigencia.IdEstatus = estatus.ID.Value;
                moLPVExtensionVigencia.Creado = DateTime.UtcNow;
                moLPVExtensionVigencia.Modificado = DateTime.UtcNow;
                moLPVExtensionVigencia.IdCreadoPor = base.getUserId();
                moLPVExtensionVigencia.IdModificadoPor = base.getUserId();
               retvalue= await daoLPVExtensionVigencia.SaveEntity(moLPVExtensionVigencia);
            }
            catch (Exception ex)
            {
                Rollback();

                throw new ApplicationException("GuardarExtensionLP::" + ex.Message, ex); 
            }

            return retvalue;
        }
        public async Task<m.SCV.Interfaces.IListaPreciosVersiones> ExtenderVigenciaLP(Dictionary<string, object> parametros)
        {
            var daoListaPreciosVersion = this.factory.GetInstance<d.SCV.Interfaces.IListaPreciosVersiones>();

            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            object id = string.Empty;
            object vigenteHastaExtendida = string.Empty;
            /*Obteniendo parametros Id de  version de lista de precios y  nueva vigencia hasta*/
            parametros.TryGetValue("id", out id);
            parametros.TryGetValue("vigenteHastaExtendida", out vigenteHastaExtendida);
            /*Obtenemos elementos por Id*/
            var item = await daoListaPreciosVersion.GetById(Convert.ToInt32(id));
            try
            {
                /*Validamos vigencia*/
                //bool validarFecha = await this.ValidarVigenciaLP(item, "extensionLP", Convert.ToDateTime(vigenteHastaExtendida));

                /*Guardamos la extension d ela vigencia en la tabla correspondiente*/

                var extensionVigencia = await GuardarExtensionLP(Convert.ToInt32(item.ID), Convert.ToDateTime(vigenteHastaExtendida), "PA");

                /*Guardamos el evento en el Log*/
                string mensajeEvento = "Solicitud de extensión de vigencia de lista de precios de " + item.VigenteHasta.ToShortDateString() + " a " + Convert.ToDateTime(vigenteHastaExtendida).ToShortDateString();
                await LogEvent(item.ID.Value, "listaPrecios", 1053, mensajeEvento);

                /*Obtenemos el estatus*/
                //var estatusLP = await bpEstatus.Get("ESTATUSLISTAPRECIOS", "PA");
                /* Guardamos el estatus*/
                //item.IdEstatusExtensionVigencia = estatusLP.ID.Value;

                /*Guardamos la columna actualiza de extension de vigencia*/
                item.IdExtensionVigencia = extensionVigencia.ID.Value;
                item.IdModificadoPor = base.getUserId();
                item.Modificado = DateTime.UtcNow;
                item = await daoListaPreciosVersion.Save(item);

                /* Solicitamos Autorización*/
                await StartWorkflow("AUTORIZACION-LP", item, base.getUserId());
                base.SetReturnInfo(1, "Solicitud enviada", 0);

                return item;

            } 
            catch (Exception)
            {
                Rollback();
                return null;
            }
        }
       
        public async Task<m.SCV.Interfaces.ILPExtensionVigencia> ObtenerExtensionVigenciaLP(Dictionary<string, object> parametros)
        {
            var daoLPVExtensionVigencia = this.factory.GetInstance<d.SCV.Interfaces.ILPExtensionVigencia>();
            return await daoLPVExtensionVigencia.getExtensionVigencia(parametros);
        }
        #endregion

        #region "Workflow"
        public override async Task<string> GetDescripcion(dynamic obj)
        {
            // AUT-VENTA
            var plantilla = await GetPlantilla("AUT-LP", obj, null);
            return plantilla.ToString();

            //var retValue = new StringBuilder();
            //if (obj != null)
            //{
            //    string desarrollo = "(" + obj.Desarrollo.Clave + ") " + obj.Desarrollo.Nombre;
            //    retValue.AppendLine($"{"<div style='margin-bottom :1%' ><span>Desarrollo:</span>"} {"<span class='bold'>"+ desarrollo}"+"</span></div>");
            //    retValue.AppendLine($"{"<div style='margin-bottom :1%'><span>Tipo Comercialización:</span>"} {"<span class='bold'>" + obj.TipoOperacion.Nombre}" + "</span></div>");
            //    retValue.AppendLine($"{"<div style='margin-bottom :1%'><span>Version:</span>"} {"<span class='bold'>" + obj.NVersion}" + "</span></div>");
            //    retValue.AppendLine($"{"<div style='margin-bottom :1%'><span>Vigente desde:</span>"} {"<span class='bold'>" + obj.VigenteDesde}" + "</span></div>");
            //}

            //return await Task.Run(() => { return retValue.ToString(); });
        }
        public async Task<p.Kontrol.WorkflowResult> Authorize(int id, m.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var daoListaPreciosVersion = this.factory.GetInstance<d.SCV.Interfaces.IListaPreciosVersiones>();
            var daoLPVExtensionVigencia = this.factory.GetInstance<d.SCV.Interfaces.ILPExtensionVigencia>();
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var retValue = new p.Kontrol.WorkflowResult();
            try
            {
                BeginTransaction(true);
                /*Obtenemos estatus de aprobado para la lista de precios*/
                var estatus = await bpEstatus.Get("ESTATUSLISTAPRECIOS", "AP");
                /*Obtenemos elemento de la lista de precios*/
                var listaPreciosVersion = await daoListaPreciosVersion.GetById(id);

                /*Actualizamos el estatus de la vigencia */
                if(listaPreciosVersion.IdExtensionVigencia !=null)
                {
                    //listaPreciosVersion.IdEstatusExtensionVigencia = estatus.ID.Value;
                    /*Obtenemos el elemento que esta por autorizar*/
                    Dictionary<string, object> pa = new Dictionary<string, object> { { "ID", listaPreciosVersion.IdExtensionVigencia } };
                    //Dictionary<string, object> pa = new Dictionary<string, object> { { "IdVersion", id }, { "claveEstatus", "PA" } };
                    var elementoVigenciaExtendida = await this.ObtenerExtensionVigenciaLP(pa);

                    if (listaPreciosVersion.ExtensionVigencia.ID > 0)
                    {
                        elementoVigenciaExtendida.IdEstatus = estatus.ID;
                        elementoVigenciaExtendida.Modificado = DateTime.UtcNow;
                        elementoVigenciaExtendida.IdModificadoPor = base.getUserId();
                        await daoLPVExtensionVigencia.SaveEntity(elementoVigenciaExtendida);

                        /*Antes de guardar el elemento rescatamos vigencia original*/
                        DateTime vigenciaHasta = listaPreciosVersion.VigenteHasta;

                        /*Actualizamos la vigencia de la lista de precios original a la nueva aprobada*/
                        listaPreciosVersion.VigenteHasta = elementoVigenciaExtendida.VigenteHasta;

                        /*Evento de aprobación de extension de lista de precios*/
                        string mensajeEvento = "Aprobación de solicitud de extensión de vigencia de lista de precios de " + vigenciaHasta.ToShortDateString() + " a " + elementoVigenciaExtendida.VigenteHasta.ToShortDateString();
                        await LogEvent(listaPreciosVersion.ID.Value, "listaPrecios", 1053, mensajeEvento);
                    }
                }

                listaPreciosVersion.IdEstatus = estatus.ID;
                listaPreciosVersion.IdModificadoPor = base.getUserId();
                var result = await daoListaPreciosVersion.Save(listaPreciosVersion);

                retValue.Success = true;
                retValue.Message = $"Se autorizó la lista de precios #{id}";

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            return retValue;
        }
        public async Task<p.Kontrol.WorkflowResult> Reject(int id, m.Kontrol.Interfaces.IWorkflowInstance instance)
        {
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoListaPreciosVersion = this.factory.GetInstance<d.SCV.Interfaces.IListaPreciosVersiones>();
            var daoLPVExtensionVigencia = this.factory.GetInstance<d.SCV.Interfaces.ILPExtensionVigencia>();
            var retValue = new p.Kontrol.WorkflowResult();

            try
            {
                BeginTransaction();
                /*Obtenemos el valor del estatus de rechazado*/
                var estatus = await bpEstatus.Get("ESTATUSLISTAPRECIOS", "RE");

                /*Obtenemos el id del elemento a actualizar*/
                var listaPreciosVersion = await daoListaPreciosVersion.GetById(id);

                /*Actualizamos campos*/
                listaPreciosVersion.Modificado = DateTime.UtcNow;
                listaPreciosVersion.IdModificadoPor = base.getUserId();

                ///*Solo Actualizar a rechazada si no esta aprobado*/
                if (listaPreciosVersion.Estatus.Clave != "AP")
                {
                    listaPreciosVersion.IdEstatus = estatus.ID;
                }

                /*Guardar cambio*/
                var result = await daoListaPreciosVersion.Save(listaPreciosVersion);

                /*Solo Actualizar el estatus de extension si no es nulo*/
                if (listaPreciosVersion.ExtensionVigencia.ID>0)
                {
                    //listaPreciosVersion.IdEstatusExtensionVigencia = estatus.ID;

                    /*Extension  de vigencia actualizamos a estatus rechazado*/
                    Dictionary<string, object> pa = new Dictionary<string, object> { { "id", listaPreciosVersion.ExtensionVigencia.ID } };
                    var elementoVigenciaExtendida = await this.ObtenerExtensionVigenciaLP(pa);
                    if (elementoVigenciaExtendida != null)
                    {
                        elementoVigenciaExtendida.IdEstatus = estatus.ID;
                        elementoVigenciaExtendida.Modificado = DateTime.UtcNow;
                        elementoVigenciaExtendida.IdModificadoPor = base.getUserId();
                        await daoLPVExtensionVigencia.SaveEntity(elementoVigenciaExtendida);
                    }
                }
                retValue.Success = true;
                retValue.Message = $"Se Rechazo la lista de precios #{id}";
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }
        public async Task<m.SCV.Interfaces.IListaPreciosVersiones> RequestAuthorize(int idVersionLP)
        {
            var retValue = Get<m.SCV.Interfaces.IListaPreciosVersiones>();
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoListaPreciosVersion = this.factory.GetInstance<d.SCV.Interfaces.IListaPreciosVersiones>();
            var daoLPVExtensionVigencia = this.factory.GetInstance<d.SCV.Interfaces.ILPExtensionVigencia>();
            var estatusLP = await bpEstatus.Get("ESTATUSLISTAPRECIOS", "PA");

            try
            {
                BeginTransaction();
                /*Obtenemos la ubicacion que vamos a autorizar*/
                retValue = await daoListaPreciosVersion.GetById(idVersionLP);
                string estatusListaPrecios = retValue.Estatus.Clave;

                /*Obtenemos las ubicaciones de la lista de precios y si el valor autorizado es nulo lo recalculamos*/
                Dictionary<string, object> parametros = new Dictionary<string, object> { { "IdVersion", idVersionLP} };
                await this.ObtenerUbicacionesRecalcularValorAutorizado(parametros);
                
                /*Actualizamos el estatus de autorizada*/
                retValue.IdModificadoPor = base.getUserId();
                retValue.IdEstatus = estatusLP.ID;
                retValue = await daoListaPreciosVersion.Save(retValue);

                /*Actualizamos la vigencia Hasta en la tabla*/
                Dictionary<string, object> pa = new Dictionary<string, object> { { "IdVersion", retValue.ID }, { "claveEstatus", estatusListaPrecios } };
                var elementoVigenciaExtendida = await this.ObtenerExtensionVigenciaLP(pa);
                if(elementoVigenciaExtendida !=null)
                {
                    elementoVigenciaExtendida.IdEstatus = estatusLP.ID;
                    elementoVigenciaExtendida.Modificado = DateTime.UtcNow;
                    elementoVigenciaExtendida.IdModificadoPor = base.getUserId();
                    await daoLPVExtensionVigencia.SaveEntity(elementoVigenciaExtendida);
                }
                /*Iniciamos flujo de autorizacion*/
                await StartWorkflow("AUTORIZACION-LP", retValue, base.getUserId());
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }
        #endregion
    }
    
}
//ObtenerUbicacion 
//public async task<m.scv.interfaces.ilistaprecios> getbyubicacionid(int id)
//{
//    var daoc = get<d.scv.interfaces.icaracteristicaadicional>();

//    var parameters = new dictionary<string, object> { { "idubicacion", id } };
//    var retvalue = await this.dao.getbyubicacionid(parameters);
//    this.calcular(ref retvalue);
//    var parametros = new dictionary<string, object>
//            {
//                { "identidad", retvalue.idubicacion },
//                { "claveentidad", "u" },
//                { "ventaopcional", true },
//                { "todasentidades", 1 }
//            };

//    var caracteristicas = await daoc.getcaracteristicas(parametros);
//    retvalue.caracteristicas = caracteristicas;
//    return retvalue;
//}
//public async Task<object> GetListaPrecios(int id)
//{

//    var daoRL = Get<d.SCV.Interfaces.IListaPrecios>();
//    object Entidad = await daoRL.GetListaPrecios(id);
//    dynamic obj = Entidad;
//    var PrecioExcedenteM2 = obj.Ubicacion.Desarrollo.PrecioExcedenteM2;
//    var PrecioBase = obj.Ubicacion.Desarrollos_Prototipos.PrecioBase;
//    var Excedente = obj.Ubicacion.Excedente;
//    obj.ValorAutorizado = PrecioBase + (Excedente * PrecioExcedenteM2);
//    // this.Calcular(ref Entidad);
//    return Entidad;
//}

//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using pKontrol = EK.Procesos.Kontrol;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using diSCV = EK.Datos.SCV.Interfaces;
//using miSCV = EK.Modelo.SCV.Interfaces;
//using EK.Drivers.Log;
//using EK.Procesos.SCV.Interfaces;
//using Newtonsoft.Json;

//namespace EK.Procesos.SCV
//{
//    public class ListaPrecios : pKontrol.ProcesoBase, Interfaces.IListaPrecios
//    {
//        protected const string catalogo = "listaPrecios";
//        protected diSCV.IListaPrecios dao;

//        public ListaPrecios(miKontrol.IContainerFactory factory, diSCV.IListaPrecios dao)
//            : base(factory)
//        {
//            base.factory = factory;
//            this.dao = dao;
//        }

//        private void Calcular(ref miSCV.IListaPrecios item)
//        {
//            if (item != null) { item.ValorActual = item.PrecioBase + item.TotalCaracteristicas; }
//        }

//        public async Task<object[]> GetAll(int activos)
//        {
//            var retValue = await this.dao.GetAll(activos);

//            if (retValue != null)
//            {
//                retValue.ForEach(item =>
//                {
//                    this.Calcular(ref item);
//                });
//            }

//            return retValue.Cast<object>().ToArray();
//        }

//        public async Task<miSCV.IListaPrecios> GetById(int id)
//        {
//            var retValue = await this.dao.GetById(id);

//            this.Calcular(ref retValue);

//            return retValue;
//        }

//        public async Task<miSCV.IListaPrecios> GetByUbicacionId(int id)
//        {
//            var retValue = await this.dao.GetByUbicacionId(id);

//            this.Calcular(ref retValue);

//            return retValue;
//        }

//        public async Task<miSCV.IListaPrecios> GetByUbicacion(int id, List<miSCV.IVentaCaracteristica> caracteristicas)
//        {
//            var retValue = await this.dao.GetByUbicacionId(id);
//            if (retValue != null)
//            {
//                var caracteristica = Get<miSCV.IEntidadCaracteristica>();
//                var caracteristicasDAO = Get<diSCV.ICaracteristicaAdicional>();

//                this.Calcular(ref retValue);

//                foreach (var c in caracteristicas)
//                {
//                    if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.Eliminado) {
//                        caracteristica = await caracteristicasDAO.GetCaracteristicasById((int)c.IdEntidadCaracteristica);
//                        retValue.ValorAutorizado = retValue.ValorAutorizado + caracteristica.Importe;
//                    }
//                }
//            }
//            return retValue;
//        }

//        public async Task<miSCV.IListaPrecios> Save(miSCV.IListaPrecios item)
//        {
//            var retValue = this.factory.GetInstance<miSCV.IListaPrecios>();
//            try
//            {
//                BeginTransaction();

//                var listaPreciosDAO = Get<diSCV.IListaPrecios>();

//                item.IdCreadoPor = base.getUserId();
//                item.IdModificadoPor = this.getUserId();

//                int id = await listaPreciosDAO.Save(item);

//                retValue = await this.GetById((item.ID == null) || (item.ID == 0) ? id : item.ID.Value);

//                Commit();
//            }
//            catch (Exception ex)
//            {
//                Rollback();
//                throw ex;
//            }

//            await this.Log(retValue);

//            return retValue;
//        }

//        public async Task<List<miSCV.IListaPrecios>> Search(int? idDesarrollo, int? idPrototipo,
//            int? idEstatusUbicacion, int? idEstatusExpediente)
//        {
//            var retValue = await this.dao.Search(idDesarrollo, idPrototipo, idEstatusUbicacion, idEstatusExpediente);
//            if (retValue != null)
//            {
//                retValue.ForEach(item =>
//                {
//                    this.Calcular(ref item);
//                });
//            }

//            return retValue;
//        }

//        public async Task<List<object>> SaveListaPrecios(string value)
//        {
//            List<dynamic> obj = JsonConvert.DeserializeObject<List<dynamic>>(value);

//            try
//            {
//                BeginTransaction();
//                var listaPreciosDAO = Get<diSCV.IListaPrecios>();

//                foreach (var item in obj)
//                {
//                    var retValue = this.factory.GetInstance<miSCV.IListaPrecios>();
//                    var entity = this.factory.GetInstance<miSCV.IListaPrecios>();
//                    entity.ID = item.ID;
//                    entity.Ubicacion = this.factory.GetInstance<miSCV.IUbicaciones>();
//                    entity.Ubicacion.ID = item.Ubicacion.ID;
//                    entity.Vigencia = item.Vigencia;
//                    entity.ValorAutorizado = item.ValorAutorizado;
//                    entity.ValorActual = item.ValorActual;
//                    entity.TotalCaracteristicas = item.TotalCaracteristicas;
//                    entity.PrecioBase = item.PrecioBase;
//                    entity.HasCaracteristicas = item.HasCaracteristicas;
//                    entity.IdCreadoPor = base.getUserId();
//                    entity.IdModificadoPor = base.getUserId();

//                    int id = await listaPreciosDAO.Save(entity);
//                }

//                Commit();
//            }
//            catch (Exception ex)
//            {
//                Rollback();
//                throw ex;
//            }

//            return obj;
//        }

//        public async Task Log(miSCV.IListaPrecios obj)
//        {
//            dynamic entity = new ElasticEntity();

//            entity.ID = obj.ID;

//            entity.UbicacionId = obj.Ubicacion.ID;
//            entity.UbicacionClave = obj.Ubicacion.Clave;
//            entity.UbicacionNombre = obj.Ubicacion.Nombre;

//            entity.Vigencia = obj.Vigencia;
//            entity.ValorAutorizado = obj.ValorAutorizado;
//            entity.ValorActual = obj.ValorActual;

//            entity.RecordType = Convert.ToInt32(obj.Estado);
//            entity.RecordTypeName = obj.Estado.ToString();

//            entity.IdEstatus = obj.Estatus.ID;
//            entity.IdEstatusClave = obj.Estatus.Clave;
//            entity.IdEstatusNombre = obj.Estatus.Nombre;

//            entity.Creado = obj.Creado;
//            entity.IdCreadoPor = obj.CreadoPor.ID;
//            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

//            entity.Modificado = obj.Modificado;
//            entity.IdModificadoPor = obj.ModificadoPor.ID;
//            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

//            await this.factory.GetInstance<ILogger>().AddAsync(catalogo, entity);
//        }
//    }
//}