using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;
using miSCV = EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class Desarrollos
        : p.Kontrol.BPBase<m.SCV.Interfaces.IDesarrollos, d.SCV.Interfaces.IDesarrollos>, p.SCV.Interfaces.IDesarrollos
    {
        public new async Task<object> GetById(int id)
        {
            var parametros = new Dictionary<string, object>
            {
                { "Id",id},
                {"idUsuario",base.getUserId()}
            };
            return await this.dao.GetByDesarrolloId(parametros);
        }

        public Desarrollos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IDesarrollos dao)
               : base(factory, dao, "scv_Desarrollos")
        {
        }

        public async Task<object> GetByDesarrolloId(Dictionary<string, object> parametros)
        {
            parametros.Add("idUsuario", base.getUserId());
            return await dao.GetByDesarrolloId(parametros);
        }
        public async override Task<List<miSCV.IDesarrollos>> GetAll(Dictionary<string, object> parametros)
        {
            //se agregó usuario actual a los parametros para filtrado por clasificadores
            parametros.Add("IdUsuario", base.getUserId());
            return await base.GetAll(parametros);
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.ID = obj.ID;
            entity.Clave = obj.Clave;
            entity.Descripcion = obj.Descripcion;
            //entity.ClaveCentroCosto = obj.CentroCosto.ID;
            entity.Direccion = obj.Direccion;
            entity.IdLocalidad = obj.Localidad.ID;
            entity.IdNotario = obj.IdNotario;
            entity.IdMoneda = obj.Moneda.ID;
            entity.NombreRep = obj.NombreRep;
            entity.TelefonoRep = obj.TelefonoRep;
            entity.ExtensionRep = obj.ExtensionRep;
            entity.Sector = obj.Sector;
            entity.SegmentaPrecios = obj.SegmentaPrecios;
            entity.IdCompania = obj.Compania.ID;
            entity.ClaveConjunto = obj.ClaveConjunto;
            entity.NombreAcreedor = obj.NombreAcreedor;
            entity.RFCAcreedor = obj.RFCAcreedor;
            entity.ClabeAcreedor = obj.ClabeAcreedor;
        }
        public new async Task<object> Save(m.SCV.Interfaces.IDesarrollos item)
        {
            dynamic DesarrolloActual = null;
            if (item.ID >= 1) {
                DesarrolloActual = await this.GetById((Int32)item.ID);
                item.IdGrupoEntrega = DesarrolloActual.IdGrupoEntrega >= 1 ? DesarrolloActual.IdGrupoEntrega : 0;
            }
            BeginTransaction(true);
            /*Valores de secciones*/
            object retValue = null;
            var Prototipos = item.Prototipos;
            var Cuentas = item.Cuentas;
            var Esquemas = item.Esquemas;
            var Financiamientos = item.Financiamientos;
            var CentrosCostoIngresos = item.DesarrollosCCIngresos;
            var CentrosCostoContruccion = item.DesarrollosCCConstruccion;
            var Caracteristicas = item.Caracteristicas;
            var TiposComercializacion = item.TiposComercializacion;
            var formatoClave = item.FormatoClave;

            var motivosCancelacion = item.MotivosCancelacion;
            var conceptosPago = item.ConceptosPago;

            var relacionFaseGrupo = item.RelacionFaseGrupo;

            try
            {
                /*Asignado Valor a variables de kontrol*/
                if (item.ID < 1)
                {
                    item.Creado = DateTime.UtcNow;
                    item.IdCreadoPor = base.getUserId();
                }
                item.Modificado = DateTime.UtcNow;
                item.IdModificadoPor = base.getUserId();
                
                var result = await this.dao.SaveEntity(item, false, true);
                
              
            /*Obteniendo IdDesarrollo*/
            int idDesarrollo = result.ID >= 1 ? Convert.ToInt32(result.ID) : 0;
            /*Intancia de modelos*/

            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            /*Guardar Valor entidades adicionales*/

                var daoCuentas = Get<d.SCV.Interfaces.IDesarrolloCuentas>();
                var daoEsquemas = Get<d.SCV.Interfaces.IDesarrollosEsquemas>();
                var daoFinanciamientos = Get<d.SCV.Interfaces.IDesarrollosFinanciamiento>();
                var daoPrototipos = Get<d.SCV.Interfaces.IDesarrollosPrototipo>();
                var daoCentrosCostoIngresos = Get<d.SCV.Interfaces.IDesarrollosCentrosCosto>();
                var daoCentrosCostoContruccion = Get<d.SCV.Interfaces.IDesarrollosCentrosCosto>();
                var daoCaracteristica = Get<d.SCV.Interfaces.ICaracteristicaAdicional>();
                var daoTiposComercializacion = Get<d.SCV.Interfaces.IDesarrollosTiposComercializacion>();
                var daoFormatoClave = Get<d.SCV.Interfaces.IDesarrollosFormatoClave>();

                /*Guardando informacion adicional*/
                await this.guardarConceptosPago(conceptosPago, idDesarrollo);
                await this.guardarMotivosCancelacion(motivosCancelacion, idDesarrollo);
                await this.SaveRelacionFaseGrupo(relacionFaseGrupo, idDesarrollo);

                //Guardar Informacion Adicional
                if (Prototipos != null && Prototipos.Count > 0)
                {
                    m.SCV.Interfaces.IDesarrolloPrototipo DesarrolloPrototipo;
                    int IdDesarrolloPrototipo = 0;
                    bool refrescar = false;
                    foreach (var prototipoDesarrollo in Prototipos)
                    {
                        //Operaciones por prototipo
                        if (prototipoDesarrollo.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            prototipoDesarrollo.IdDesarrollo = idDesarrollo;
                            prototipoDesarrollo.Estatus = estatus;
                            prototipoDesarrollo.IdEstatus = estatus.ID;
                            prototipoDesarrollo.Modificado = DateTime.UtcNow;
                            prototipoDesarrollo.IdModificadoPor = base.getUserId();
                            if (prototipoDesarrollo.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                prototipoDesarrollo.Creado = DateTime.UtcNow;
                                prototipoDesarrollo.IdCreadoPor = base.getUserId();
                            }
                            if (prototipoDesarrollo.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                IdDesarrolloPrototipo = await daoPrototipos.Delete(prototipoDesarrollo.ID.Value);
                            }
                            else
                            {
                                refrescar = prototipoDesarrollo.ID == -1 ? true : false;
                                DesarrolloPrototipo = await daoPrototipos.SaveEntity(prototipoDesarrollo, true, true);
                                IdDesarrolloPrototipo = DesarrolloPrototipo == null ? Convert.ToInt32(prototipoDesarrollo.ID) : Convert.ToInt32(DesarrolloPrototipo.ID);
                            }
                        }
                        //Guardar Caracteristicas Adicionales Prototipos
                        var CaracteristicasPrototipos = prototipoDesarrollo.CaracteristicasPrototipos;
                        var tipoEntidad = await bpTipoEntidad.Get("SCVTIPOSENTIDADES", "P");
                        if (CaracteristicasPrototipos != null && CaracteristicasPrototipos.Count > 0)
                        {
                            foreach (var c in CaracteristicasPrototipos)
                            {
                                if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                                {
                                    c.IdEntidad = IdDesarrolloPrototipo;
                                    c.Estatus = estatus;
                                    c.IdEstatus = estatus.ID;
                                    c.IdTipoEntidad = tipoEntidad.ID.Value;
                                    c.Modificado = DateTime.UtcNow;
                                    c.IdModificadoPor = base.getUserId();

                                    if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                    {
                                        c.Creado = DateTime.UtcNow;
                                        c.IdCreadoPor = base.getUserId();
                                    }

                                    if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                                    {
                                        await daoCaracteristica.DeleteCaracteristica(c.ID.Value);
                                    }
                                    else
                                    {
                                        await daoCaracteristica.SaveCaracteristica(c);
                                    }
                                }

                            }
                        }
                    }
                }
                if (Financiamientos != null && Financiamientos.Count > 0)
                {
                    m.SCV.Interfaces.IDesarrollosFinanciamiento DesarrolloFinanciamiento;
                    int IdDesarrolloFinanciamiento = 0;
                    bool refrescar = false;
                    foreach (var financiamientosDesarrollo in Financiamientos)
                    {
                        if (financiamientosDesarrollo.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            financiamientosDesarrollo.IdDesarrollo = idDesarrollo;
                            financiamientosDesarrollo.Estatus = estatus;
                            financiamientosDesarrollo.IdEstatus = estatus.ID;
                            financiamientosDesarrollo.Modificado = DateTime.UtcNow;
                            financiamientosDesarrollo.IdModificadoPor = base.getUserId();
                            if (financiamientosDesarrollo.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                financiamientosDesarrollo.Creado = DateTime.UtcNow;
                                financiamientosDesarrollo.IdCreadoPor = base.getUserId();
                            }
                            if (financiamientosDesarrollo.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                IdDesarrolloFinanciamiento = await daoEsquemas.Delete(financiamientosDesarrollo.ID.Value);
                            }
                            else
                            {
                                refrescar = financiamientosDesarrollo.ID == -1 ? true : false;
                                DesarrolloFinanciamiento = await daoEsquemas.SaveEntity(financiamientosDesarrollo, refrescar, true);
                                IdDesarrolloFinanciamiento = DesarrolloFinanciamiento == null ? Convert.ToInt32(financiamientosDesarrollo.ID) : Convert.ToInt32(DesarrolloFinanciamiento.ID);
                            }
                        }
                        //Guardar Caracteristicas Adicionales Esquemas
                        var CaracteristicasFinanciamientos = financiamientosDesarrollo.CaracteristicasFinanciamiento;
                        var tipoEntidad = await bpTipoEntidad.Get("SCVTIPOSENTIDADES", "E");
                        if (CaracteristicasFinanciamientos != null && CaracteristicasFinanciamientos.Count > 0)
                        {
                            foreach (var c in CaracteristicasFinanciamientos)
                            {
                                if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                                {
                                    c.IdEntidad = IdDesarrolloFinanciamiento;
                                    c.Estatus = estatus;
                                    c.IdEstatus = estatus.ID;
                                    c.IdTipoEntidad = tipoEntidad.ID.Value;
                                    c.Modificado = DateTime.UtcNow;
                                    c.IdModificadoPor = base.getUserId();

                                    if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                    {
                                        c.Creado = DateTime.UtcNow;
                                        c.IdCreadoPor = base.getUserId();
                                    }

                                    if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                                    {
                                        await daoCaracteristica.DeleteCaracteristica(c.ID.Value);
                                    }
                                    else
                                    {
                                        await daoCaracteristica.SaveCaracteristica(c);
                                    }
                                }

                            }
                        }
                    }
                }
                if ((CentrosCostoIngresos != null && CentrosCostoIngresos.Count > 0) || (CentrosCostoContruccion != null && CentrosCostoContruccion.Count > 0))
                {
                    foreach (var c in CentrosCostoIngresos)
                    {
                        if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {

                            c.Estatus = estatus;
                            c.IdEstatus = estatus.ID;
                            c.IdDesarrollo = idDesarrollo;
                            c.Modificado = DateTime.UtcNow;
                            c.IdModificadoPor = base.getUserId(); 
                            var CentroCosto_Id = c.CentroCosto.ID == null ? 0 : Convert.ToInt32(c.CentroCosto.ID) ; 
                            c.IdCentroCosto = c.IdCentroCosto == 0 ? CentroCosto_Id  : c.IdCentroCosto;

                            if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo || (c.ID < 0 && c.Version == null))
                            {
                                var tipoCentro = await bpEstatus.Get("TIPOCENTROCOSTO", "CCINGRESO");
                                c.IdTipoCentroCosto = Convert.ToInt32(tipoCentro.ID);
                                c.Creado = DateTime.UtcNow;
                                c.IdCreadoPor = base.getUserId();
                                if (c.Estado == m.Kontrol.KontrolEstadosEnum.Modificado) 
                                {
                                    c.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                }
                            }

                            if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoCentrosCostoIngresos.Delete(c.ID.Value);
                            }
                            else
                            {
                                await daoCentrosCostoIngresos.SaveEntity(c, false, true);
                            }
                        }
                    }
                    foreach (var c in CentrosCostoContruccion)
                    {
                        if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {

                            c.Estatus = estatus;
                            c.IdEstatus = estatus.ID;
                            c.IdDesarrollo = idDesarrollo;
                            c.Modificado = DateTime.UtcNow;
                            c.IdModificadoPor = base.getUserId();

                            if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                var tipoCentro = await bpEstatus.Get("TIPOCENTROCOSTO", "CCCONSTRUCCION");
                                c.IdTipoCentroCosto = Convert.ToInt32(tipoCentro.ID);
                                c.Creado = DateTime.UtcNow;
                                c.IdCreadoPor = base.getUserId();
                            }

                            if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoCentrosCostoContruccion.Delete(c.ID.Value);
                            }
                            else
                            {
                                await daoCentrosCostoContruccion.SaveEntity(c, false, true);
                            }
                        }
                    }

                }
                if ((TiposComercializacion != null && TiposComercializacion.Count > 0))
                {
                    m.SCV.Interfaces.IDesarrolloTiposComercializacion DesarrolloTipoComercializacion;
                    int IdDesarrolloTipoComercializacion = 0;
                    foreach (var c in TiposComercializacion)
                    {
                        if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {

                            c.Estatus = estatus;
                            c.IdEstatus = estatus.ID;
                            c.IdDesarrollo = idDesarrollo;
                            c.Modificado = DateTime.UtcNow;
                            c.IdModificadoPor = base.getUserId();

                            if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {

                                c.IdTipoComercializacion = Convert.ToInt32(c.TiposComercializacion.ID);
                                c.Creado = DateTime.UtcNow;
                                c.IdCreadoPor = base.getUserId();
                            }

                            if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoTiposComercializacion.Delete(c.ID.Value);

                            }
                            else
                            {
                               DesarrolloTipoComercializacion= await daoTiposComercializacion.SaveEntity(c, false, true);
                                IdDesarrolloTipoComercializacion = DesarrolloTipoComercializacion == null ? Convert.ToInt32(c.ID) : Convert.ToInt32(DesarrolloTipoComercializacion.ID);
                            }
                        }
                        //Guardar Caracteristicas Adicionales de Tipo Comercializacion
                        var CaracteristicasTipoComercializacion = c.CaracteristicasTiposComercializacion;
                        var tipoEntidad = await bpTipoEntidad.Get("SCVTIPOSENTIDADES","TC");
                        if (CaracteristicasTipoComercializacion !=null && CaracteristicasTipoComercializacion.Count>0)
                        {
                            foreach (var ctc in CaracteristicasTipoComercializacion)
                            {
                                if (ctc.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                                {
                                    ctc.IdEntidad = IdDesarrolloTipoComercializacion;
                                    ctc.Estatus = estatus;
                                    ctc.IdEstatus = estatus.ID;
                                    ctc.IdTipoEntidad = tipoEntidad.ID.Value;
                                    ctc.Modificado = DateTime.UtcNow;
                                    ctc.IdModificadoPor = base.getUserId();

                                    if (ctc.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                    {
                                        ctc.Creado = DateTime.UtcNow;
                                        ctc.IdCreadoPor = base.getUserId();
                                    }
                                    if (ctc.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                    {
                                        await daoCaracteristica.DeleteCaracteristica(ctc.ID.Value);
                                    }
                                    else {
                                        await daoCaracteristica.SaveCaracteristica(ctc);
                                    }
                                }
                            }
                        }
                    }

                }
                if (formatoClave != null && formatoClave.Count > 0)
                {
                    // validar si cambio
                    foreach (var c in formatoClave)
                    {
                        if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            c.Estatus = estatus;
                            c.IdEstatus = estatus.ID;
                            c.IdDesarrollo = idDesarrollo;
                            c.Modificado = DateTime.UtcNow;
                            c.IdModificadoPor = base.getUserId();

                            if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                c.Creado = DateTime.UtcNow;
                                c.IdCreadoPor = base.getUserId();
                            }

                            if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoFormatoClave.Delete(c.ID.Value);
                            }
                            else
                            {
                                await daoFormatoClave.SaveEntity(c, false, true);
                            }
                        }
                    }
                    //
                    await Get<p.SCV.Interfaces.IUbicaciones>().ActualizaClaves(idDesarrollo);
                }
                if (Caracteristicas != null && Caracteristicas.Count > 0)
                {
                    var tipoEntidad = await bpTipoEntidad.Get("SCVTIPOSENTIDADES", "D");

                    foreach (var c in Caracteristicas)
                    {
                        if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            c.IdEntidad = idDesarrollo;
                            c.Estatus = estatus;
                            c.IdEstatus = estatus.ID;
                            c.IdTipoEntidad = tipoEntidad.ID.Value;
                            c.Modificado = DateTime.UtcNow;
                            c.IdModificadoPor = base.getUserId();

                            if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo || c.ID == -1)
                            {
                                c.Creado = DateTime.UtcNow;
                                c.IdCreadoPor = base.getUserId();
                            }

                            if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoCaracteristica.DeleteCaracteristica(c.ID.Value);
                            }
                            else
                            {
                                await daoCaracteristica.SaveCaracteristica(c);
                            }
                        }
                    }
                }
                Commit();
                 var parametros = new Dictionary<string, object>() { { "Id", result.ID } };
                  retValue = await this.GetByDesarrolloId(parametros);
               
                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw;
            }
        }


        #region "Relacion desarrollo Fase grupo"
        /*Guardar relacion desarrollo Fase Grupo*/
        public async Task<bool> SaveRelacionFaseGrupo(List<m.SCV.Interfaces.IDesarrolloFaseGrupo> items, int idDesarrollo)
        {
            try
            {
                var daoDesarrolloFaseGrupo = Get<d.SCV.Interfaces.IDesarrolloFaseGrupo>();

                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                if (items != null && items.Count > 0)
                {
                    foreach (var item in items)
                    {
                        if (item.ID < 0 || item.Estado == EK.Modelo.Kontrol.KontrolEstadosEnum.Modificado)
                        {
                            if (item.Grupo != null && item.Grupo.ID > 0)
                            {
                                if (item.ID < 0)
                                {
                                    item.Creado = DateTime.UtcNow;
                                    item.IdCreadoPor = base.getUserId();
                                    item.IdEstatus = estatus.ID.Value;
                                    item.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                                }
                                else
                                {
                                    item.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                                }
                                item.IdModificadoPor = base.getUserId();
                                item.Modificado = DateTime.UtcNow;
                                item.IdDesarrollo = idDesarrollo;
                                item.IdFase = item.Fase.ID.Value;
                                item.IdGrupo = item.Grupo.ID.Value;

                                await daoDesarrolloFaseGrupo.SaveEntity(item, false);

                            }

                        }

                    }

                }

                return true;
            }
            catch
            {
                throw;
            }
          
        }

        public async Task<object> GetRelacionFaseGrupo(Dictionary<string, object> parametros)
        {
            var daoRelacionFaseGrupo = Get<d.SCV.Interfaces.IDesarrolloFaseGrupo>();
            return await daoRelacionFaseGrupo.GetAll(parametros);
        }

        public async Task<object> GetIntegrantesGrupoByFase(Dictionary<string, object> parametros)
        {
            var daoRelacionFaseGrupo = Get<d.SCV.Interfaces.IDesarrolloFaseGrupo>();


            object fase = "";
            parametros.TryGetValue("idFase", out fase);
            parametros.Remove("idFase");

            int idFase = Convert.ToInt32(fase);

            var configuracionByDesarrollo = await daoRelacionFaseGrupo.GetAll(parametros);
            var searchByFase = configuracionByDesarrollo.Find(x => x.IdFase == idFase);

            if (searchByFase != null)
            {

                var bpGrupoUsuario = Get<p.Kontrol.Interfaces.IGruposUsuario>();

                var param = new Dictionary<string, object> { { "idGrupo", searchByFase.IdGrupo } };
                var result = await bpGrupoUsuario.GetUsersGroupWithPositions(param);
                return result;

            }

            return null;
        }
        #endregion 

        public async Task<object> GetAllDesarrollosEsquemas(Dictionary<string, object> parametros)
        {
            var daoDE = Get<d.SCV.Interfaces.IDesarrollosEsquemas>();
            var caracteristicasDAO = Get<d.SCV.Interfaces.ICaracteristicaAdicional>();

            object[] desarrolloEsquema = await daoDE.GetAllDesarrollosEsquemas(parametros);
            foreach (dynamic c in desarrolloEsquema)
            {
                var parameters = new Dictionary<string, object>() { { "IdEntidad", c.ID }, { "ClaveEntidad", "E" } };
                c.CaracteristicasEsquema = await caracteristicasDAO.GetCaracteristicas(parameters);
            }
            return desarrolloEsquema;
        }

        public async Task<object> GetAllDesarrollosPrototipos(Dictionary<string, object> parametros)
        {
            var daoDP = Get<d.SCV.Interfaces.IDesarrollosPrototipo>();
            var caracteristicasDAO = Get<d.SCV.Interfaces.ICaracteristicaAdicional>();

            object[] desarrolloPrototipo = await daoDP.GetAllDesarrollosPrototipos(parametros);
            foreach (dynamic c in desarrolloPrototipo)
            {
                var parameters = new Dictionary<string, object>() { { "IdEntidad", c.ID }, { "ClaveEntidad", "P" } };
                c.CaracteristicasPrototipos = await caracteristicasDAO.GetCaracteristicas(parameters);
            }
            return desarrolloPrototipo;
        }

        public async Task<List<m.SCV.Interfaces.IDesarrolloCentrosCosto>> GetAllDesarrolloCentroCosto(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IDesarrollosCentrosCosto>();
            return await daoRL.GetAll(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IDesarrolloCuentas>> GetAllDesarrollosCuentas(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IDesarrolloCuentas>();
            return await daoRL.GetAll(parametros);
        }

        public async Task<miSCV.IDesarrolloEsquema> GetDesarrolloEsquema(int? idDesarrollo, int? idEsquema)
        {
            var retValue = Get<m.SCV.Interfaces.IDesarrolloEsquema>();
            var daoED = Get<d.SCV.Interfaces.IDesarrollosEsquemas>();
            try
            {
                retValue = await daoED.GetDesarrolloEsquema(idDesarrollo, idEsquema);
                if (retValue == null)
                {
                    retValue = Get<m.SCV.Interfaces.IDesarrolloEsquema>();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }
        public async Task<object> GetDesarrolloTiposComercializacion(Dictionary<string, object> parametros)
        {
            var daoDP = Get<d.SCV.Interfaces.IDesarrollosTiposComercializacion>();
            var caracteristicasDAO = Get<d.SCV.Interfaces.ICaracteristicaAdicional>();

            object[] desarrolloTipoComercializacion = await daoDP.GetDesarrollosTiposComercializacion(parametros);
            foreach (dynamic c in desarrolloTipoComercializacion)
            {
                var parameters = new Dictionary<string, object>() { { "IdEntidad", c.ID }, { "ClaveEntidad", "TC" } };
                c.CaracteristicasTiposComercializacion = await caracteristicasDAO.GetCaracteristicas(parameters);
            }
            return desarrolloTipoComercializacion;
        }

        public async Task<object> GetDesarrolloFormatoClave(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IDesarrollosFormatoClave>();

            return await daoRL.GetAll(parametros);
        }

        public async Task<m.SCV.Interfaces.IDesarrollos> GetByIdDesarrolloFormatoClave(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IDesarrollosFormatoClave>();
            int idDesarrollo = Convert.ToInt32(parametros["id"]);

            var param = new Dictionary<string, object>
            {
                { "Id",idDesarrollo},
                {"idUsuario",base.getUserId()}
            };

            var desarrollo = await this.dao.GetByIdDesarrollo(param);

            desarrollo.FormatoClave = new List<m.SCV.Interfaces.IDesarrolloFormatoClave>();
            var parameters = new Dictionary<string, object>();
            parameters.Add("idDesarrollo", idDesarrollo);
            desarrollo.FormatoClave = await daoRL.GetAll(parameters);
            return desarrollo;
        }

        public async Task<miSCV.IDesarrollosFinanciamiento> GetDesarrolloFinanciamiento(int? idDesarrollo, int? idTipoFinanciamiento)
        {
            var retValue = Get<m.SCV.Interfaces.IDesarrollosFinanciamiento>();
            var daoED = Get<d.SCV.Interfaces.IDesarrollosFinanciamiento>();
            try
            {
                retValue = await daoED.GetDesarrolloFinanciamiento(idDesarrollo, idTipoFinanciamiento);
                if (retValue == null)
                {
                    retValue = Get<m.SCV.Interfaces.IDesarrollosFinanciamiento>();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<List<miSCV.IDesarrollosFinanciamiento>> GetAllDesarrollosFinanciamientos(Dictionary<string, object> parametros)
        {
            var daoDE = Get<d.SCV.Interfaces.IDesarrollosFinanciamiento>();
            var caracteristicasDAO = Get<d.SCV.Interfaces.ICaracteristicaAdicional>();
            //
            var desarrolloFinanciamiento = await daoDE.GetAllDesarrollosFinanciamientos(parametros);
            foreach (var c in desarrolloFinanciamiento)
            {
                var parameters = new Dictionary<string, object>() { { "IdEntidad", c.ID }, { "ClaveEntidad", "E" } };
                c.CaracteristicasFinanciamiento = await caracteristicasDAO.GetCaracteristicas(parameters);
            }
            //
            return desarrolloFinanciamiento;
        }

        public async Task<List<miSCV.IDesarrollos>> GetSPVDesarrollosClasificadores(Dictionary<string, object> parametros)
        {
            //se agregó usuario actual a los parametros para filtrado por clasificadores
            parametros.Add("IdUsuario", base.getUserId());
            parametros.Add("OperacionEspecificaSP", "DesarrollosClasificadores");
            return await base.GetAll(parametros);
        }


        public async Task<m.SCV.Interfaces.IResponsableEntregaDesarrollo> SetGrupoResponsable(m.SCV.Interfaces.IResponsableEntregaDesarrollo item)
        {
            try
            {
                BeginTransaction(true);
                foreach (var d in item.Desarrollos)
                {
                    if (d.GrupoEntrega != null)
                    {
                        d.IdGrupoEntrega = d.GrupoEntrega.ID;
                        await this.dao.SaveEntity(d, true, false);
                    }
                }
                Commit();
                return item;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }


        #region "Secciones requeridas para Cancelacion Expediente"

        private async Task<bool> guardarMotivosCancelacion(List<m.SCV.Interfaces.IDesarrolloMotivoCancelacion> items, int idDesarrollo)
        {
            try
            {
                if (items != null && items.Count > 0)
                {
                    var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var estatus = await bpEstatus.Get("ESTATUS", "A");
                    var daoMotivoCancelacion = Get<d.SCV.Interfaces.IMotivosCancelacion>();
                    foreach (var c in items)
                    {
                        if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {

                            c.IdEstatus = estatus.ID;
                            c.IdDesarrollo = idDesarrollo;
                            c.Modificado = DateTime.UtcNow;
                            c.IdModificadoPor = base.getUserId();

                            if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                c.Creado = DateTime.UtcNow;
                                c.IdCreadoPor = base.getUserId();
                            }

                            if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoMotivoCancelacion.Delete(c.ID.Value);
                            }
                            else
                            {
                                await daoMotivoCancelacion.SaveEntity(c, false, true);
                            }
                        }
                    }

                }
                return true;
            }
            catch
            {
                throw;
            }
        }

        private async Task<bool> guardarConceptosPago(List<m.SCV.Interfaces.IDesarrolloConceptosPago> items, int idDesarrollo)
        {
            try
            {
                if (items != null && items.Count > 0)
                {
                    var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var estatus = await bpEstatus.Get("ESTATUS", "A");
                    var daoConceptosPago = Get<d.SCV.Interfaces.IDesarrolloConceptosPago>();

                    foreach (var c in items)
                    {
                        if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {

                            c.IdEstatus = estatus.ID;
                            c.IdDesarrollo = idDesarrollo;
                            c.Modificado = DateTime.UtcNow;
                            c.IdModificadoPor = base.getUserId();

                            if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                c.Creado = DateTime.UtcNow;
                                c.IdCreadoPor = base.getUserId();
                            }

                            if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoConceptosPago.Delete(c.ID.Value);
                            }
                            else
                            {
                                await daoConceptosPago.SaveEntity(c, false, true);
                            }
                        }
                    }

                }
                return true;
            }
            catch
            {
                throw;
            }
        }


        public async Task<List<m.SCV.Interfaces.IDesarrolloMotivoCancelacion>> GetMotivosCancelacion(Dictionary<string, object> parametros)
        {
            var daoMotivosCancelacion = Get<d.SCV.Interfaces.IDesarrolloMotivosCancelacion>();
            return await daoMotivosCancelacion.GetAll(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IDesarrolloConceptosPago>> GetConceptosPago(Dictionary<string, object> parametros)
        {
            var daoDesarrolloConceptoPago = Get<d.SCV.Interfaces.IDesarrolloConceptosPago>();
            return await daoDesarrolloConceptoPago.GetAll(parametros);
        }


        public async Task<List<m.SCV.Interfaces.IMotivosCancelacion>> GetMotivosCancelacionList(Dictionary<string, object> parametros)
        {
            var daoMotivosCancelacion = Get<d.SCV.Interfaces.IDesarrolloMotivosCancelacion>();
            var motivosCancelacion= await daoMotivosCancelacion.GetAll(parametros);

            List<m.SCV.Interfaces.IMotivosCancelacion> motivosCancelacionList = new List<m.SCV.Interfaces.IMotivosCancelacion>();

            foreach (var item in motivosCancelacion)
            {
                var motivoCancelacion = Get<m.SCV.Interfaces.IMotivosCancelacion>();
                motivoCancelacion.ID = item.MotivoCancelacion.ID;
                motivoCancelacion.Nombre = item.MotivoCancelacion.Nombre;
                motivoCancelacion.Clave = item.MotivoCancelacion.Clave;
                motivosCancelacionList.Add(motivoCancelacion);

            }

            return motivosCancelacionList;
        }


        #endregion


    }
}