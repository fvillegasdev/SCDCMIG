using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Procesos.SCV
{
    public class Prototipos
    : p.Kontrol.BPBase
        <m.SCV.Interfaces.IPrototipo, 
        d.SCV.Interfaces.IPrototipos>, 
        p.SCV.Interfaces.IPrototipo
    {
        public Prototipos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IPrototipos dao)
            : base(factory, dao, "prototipos")
        {
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.ID = obj.ID;
            entity.Clave = obj.Clave;
            entity.Nombre = obj.Nombre;
            entity.Descripcion = obj.Descripcion;
            entity.FrenteMinimo = obj.FrenteMinimo;
            entity.Construccion = obj.Construccion;
            entity.Recamaras = obj.Recamaras;
           // entity.IdRecamara = obj.Recamara.ID;
            //entity.IdRecamaraClave = obj.Recamara.Clave;
            //entity.IdRecamaraNombre = obj.Recamara.Nombre;
            //entity.IdSalaTV = obj.IdSalaTV;
            //entity.IdCuartoServicio = obj.IdCuartoServicio;
            entity.Banios = obj.Banios;
            entity.IdTipoInmueble = obj.Inmueble.ID;
            entity.IdTipoInmuebleClave = obj.Inmueble.Clave;
            entity.IdTipoInmuebleNombre = obj.Inmueble.Nombre;
            entity.IdEstatus = obj.Estatus.ID;
            entity.IdEstatusClave = obj.Estatus.Clave;
            entity.IdEstatusNombre = obj.Estatus.Nombre;
            entity.RecordType = Convert.ToInt32(obj.Estado);
            entity.RecordTypeName = obj.Estado.ToString();
            entity.Creado = obj.Creado;
            entity.IdCreadoPor = obj.CreadoPor.ID;
            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;
            entity.Modificado = obj.Modificado;
            entity.IdModificadoPor = obj.ModificadoPor.ID;
            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;
        }

        public async Task<object> GetByPrototipoId(int id)
        {
            var daoRL = Get<d.SCV.Interfaces.IPrototipos>();

            return await daoRL.GetByPrototipoId(id);
        }
        public async Task<List<m.SCV.Interfaces.IPrototipo>> GetSPVPrototiposClasificadores(Dictionary<string, object> parametros)
        {
            //se agregó usuario actual a los parametros para filtrado por clasificadores
            parametros.Add("IdUsuario", base.getUserId());
            parametros.Add("OperacionEspecificaSP", "PrototiposClasificadores");
            return await base.GetAll(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IUbicacionesFalla>> GetUbicacionesFalla(Dictionary<string, object> parametros)
        {
            var daoPA = Get<d.SCV.Interfaces.IUbicacionesFalla>();

            var paramtetrosPA = new Dictionary<string, object>();
            paramtetrosPA.Add("idPrototipo", parametros["idPrototipo"]);

            return await daoPA.GetAll(paramtetrosPA);
        }

        public override async Task<m.SCV.Interfaces.IPrototipo> Save(m.SCV.Interfaces.IPrototipo item)
        {
            try
            {
                BeginTransaction();

                var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpCG.Get("ESTATUS", "A");

                var daoUbicacionesFallaPrototipos = Get<d.SCV.Interfaces.IUbicacionesFallaPrototipos>();

                if (item.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                {
                    item = await base.saveModel(item);
                }

                //
                var listaUbicacionesFallas = item.UbicacionesFallasPrototipo;
                if (listaUbicacionesFallas != null && listaUbicacionesFallas.Count > 0)
                {
                    foreach (var ubicacionFalla in listaUbicacionesFallas)
                    {
                        if (ubicacionFalla.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            ubicacionFalla.Estatus = estatus;
                            ubicacionFalla.IdEstatus = estatus.ID;
                            ubicacionFalla.Modificado = DateTime.UtcNow;
                            ubicacionFalla.IdModificadoPor = base.getUserId();
                            ubicacionFalla.Estado = ubicacionFalla.ID == null || ubicacionFalla.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : ubicacionFalla.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado ? m.Kontrol.KontrolEstadosEnum.Eliminado : m.Kontrol.KontrolEstadosEnum.Modificado;

                            if (ubicacionFalla.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                ubicacionFalla.Creado = DateTime.UtcNow;
                                ubicacionFalla.IdCreadoPor = base.getUserId();
                            }

                            if (ubicacionFalla.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await this.dao.Delete(ubicacionFalla.ID.Value);
                            }
                            else
                            {
                                await this.dao.SaveEntity(ubicacionFalla, false, true);
                            }
                        }
                    }
                }

                //item = await this.afterGetItem(item);
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            return item;
        }

    }


    //public class Prototipos : pKontrol.ProcesoBase, Interfaces.IPrototipos
    //{
    //    private diSCV.IPrototipos dao;
    //    private const string catalogo = "prototipos";

    //    public Prototipos(miKontrol.IContainerFactory factory, diSCV.IPrototipos dao)
    //           : base(factory)
    //    {
    //        this.factory = factory;
    //        this.dao = dao;
    //    }

    //public async Task<object[]> GetAll(int activos, bool kv)
    //{
    //    return await this.dao.GetAll(activos, kv);
    //}

    //    public async Task<miSCV.IPrototipo> GetById(int id)
    //    {
    //        return await this.dao.GetById(id);
    //    }

    //    public async Task<miSCV.IPrototipo> Save(miSCV.IPrototipo item)
    //    {
    //        var retValue = this.factory.GetInstance<miSCV.IPrototipo>();
    //        try
    //        {
    //            BeginTransaction();

    //            var prototiposDAO = Get<diSCV.IPrototipos>();

    //            item.IdCreadoPor = base.getUserId();
    //            item.IdModificadoPor = this.getUserId();

    //            int id = await prototiposDAO.Save(item);

    //            retValue = await prototiposDAO.GetById(
    //                (item.ID == null) || (item.ID == 0) ? id : (int)item.ID);

    //            Commit();
    //        }
    //        catch (Exception ex)
    //        {
    //            Rollback();
    //            throw ex;
    //        }
    //        await this.Log(retValue);

    //        return retValue;
    //    }

    //    public async Task Log(miSCV.IPrototipo obj)
    //    {
    //        dynamic entity = new Drivers.Log.ElasticEntity();

    //        try
    //        {
    //            entity.ID = obj.ID;

    //            entity.Clave = obj.Clave;
    //            entity.Nombre = obj.Nombre;
    //            entity.Descripcion = obj.Descripcion;
    //            entity.FrenteMinimo = obj.FrenteMinimo;
    //            entity.Construccion = obj.Construccion;
    //            entity.Recamaras = obj.Recamaras;
    //            entity.IdRecamara = obj.Recamara.ID;
    //            entity.IdRecamaraClave = obj.Recamara.Clave;
    //            entity.IdRecamaraNombre = obj.Recamara.Nombre;
    //            entity.IdSalaTV = obj.IdSalaTV;
    //            entity.IdCuartoServicio = obj.IdCuartoServicio;
    //            entity.Banios = obj.Banios;
    //            entity.IdTipoInmueble = obj.Inmueble.ID;
    //            entity.IdTipoInmuebleClave = obj.Inmueble.Clave;
    //            entity.IdTipoInmuebleNombre = obj.Inmueble.Nombre;

    //            entity.IdEstatus = obj.Estatus.ID;
    //            entity.IdEstatusClave = obj.Estatus.Clave;
    //            entity.IdEstatusNombre = obj.Estatus.Nombre;

    //            entity.RecordType = Convert.ToInt32(obj.Estado);
    //            entity.RecordTypeName = obj.Estado.ToString();

    //            entity.Creado = obj.Creado;
    //            entity.IdCreadoPor = obj.CreadoPor.ID;
    //            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

    //            entity.Modificado = obj.Modificado;
    //            entity.IdModificadoPor = obj.ModificadoPor.ID;
    //            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

    //            await this.factory.GetInstance<ILogger>().AddAsync(catalogo, entity);
    //        }
    //        catch
    //        {
    //            throw;
    //        }
    //    }
    //}
}