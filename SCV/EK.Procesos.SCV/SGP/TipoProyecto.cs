using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;
using System;

namespace EK.Procesos.SGP
{
    public class TipoProyecto
        : p.Kontrol.BPBase<m.SGP.Interfaces.ITipoProyecto, d.SGP.Interfaces.ITipoProyecto>, p.SGP.Interfaces.ITipoProyecto
    {
        private const string ID_PAGE_PROYECTOS = "Proyectos$";

        public TipoProyecto(m.Kontrol.Interfaces.IContainerFactory factory, d.SGP.Interfaces.ITipoProyecto dao)
            : base(factory, dao, "TipoProyectoSGP")
        {
        }

        public override async Task<m.SGP.Interfaces.ITipoProyecto> Save(m.SGP.Interfaces.ITipoProyecto item)
        {
            var elementoRecibido = item;
            var elementoOriginal = await base.GetById((int)elementoRecibido.ID);

            item = await base.saveModel(item);
            int idUsuario = base.getUserId();

            //Objetos genericos
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            BeginTransaction(true);

            try
            {
                var daoTipoEntidad = Get<d.Kontrol.Interfaces.IConfiguracionFormularioEntidad>();
                var tipoEntidad = Get<m.Kontrol.Interfaces.IIConfiguracionFormularioEntidad>();
                

                if (elementoRecibido.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    string claveEntidad= ID_PAGE_PROYECTOS + elementoRecibido.Clave;
                    var entidad = await daoTipoEntidad.GetByClave(claveEntidad);
                    if (entidad == null)
                    {
                        tipoEntidad.Clave = claveEntidad;
                        tipoEntidad.Nombre = elementoRecibido.Nombre;
                        tipoEntidad.Estatus = estatus;
                        tipoEntidad.IdEstatus = estatus.ID;
                        tipoEntidad.Modificado = DateTime.UtcNow;
                        tipoEntidad.IdModificadoPor = idUsuario;
                        tipoEntidad.Creado = DateTime.UtcNow;
                        tipoEntidad.IdCreadoPor = base.getUserId();
                        tipoEntidad.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

                        tipoEntidad = await daoTipoEntidad.SaveEntity(tipoEntidad, false);
                    }
                }
                else if(elementoRecibido.Estado == m.Kontrol.KontrolEstadosEnum.Modificado)
                {
                    string claveEntidad = ID_PAGE_PROYECTOS + elementoOriginal.Clave;
                    var entidadOriginal= await daoTipoEntidad.GetByClave(claveEntidad);

                    if (entidadOriginal != null)
                    {
                        claveEntidad = ID_PAGE_PROYECTOS + elementoRecibido.Clave;

                        tipoEntidad.ID = entidadOriginal.ID;
                        tipoEntidad.Clave = claveEntidad;
                        tipoEntidad.Nombre = elementoRecibido.Nombre;
                        tipoEntidad.Modificado = DateTime.UtcNow;
                        tipoEntidad.IdModificadoPor = idUsuario;
                        tipoEntidad.Version = entidadOriginal.Version;
                        tipoEntidad.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;

                        await daoTipoEntidad.SaveEntity(tipoEntidad, false);
                    }
                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
                throw;
            }
            Commit();
            return item;
        }

        public override async Task<m.SGP.Interfaces.ITipoProyecto> Delete(int id)
        {
            m.SGP.Interfaces.ITipoProyecto retValue = null;
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "B");

            try
            {
                BeginTransaction();

                retValue = await this.dao.GetById(id);

                retValue.IdEstatus = estatus.ID;
                retValue.Estatus = estatus;
                retValue.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                var updatedItem = await this.dao.SaveEntity(retValue,true,false);

                if (updatedItem != null){
                    retValue = updatedItem;
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
    }
}