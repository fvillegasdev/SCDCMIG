using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace EK.Procesos.SCP
{
    public class Proveedores
        : p.Kontrol.BPBase<m.SCP.Interfaces.IProveedor, d.SCP.Interfaces.IProveedores>, p.SCP.Interfaces.IProveedores
    {
        public Proveedores(m.Kontrol.Interfaces.IContainerFactory factory, d.SCP.Interfaces.IProveedores dao)
            : base(factory, dao, "Proveedores")
        {
        }

        public async Task<List<m.SCP.Interfaces.IProveedorContactos>> GetProveedorContactos(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCP.Interfaces.IProveedorContacto>();

            return await daoRL.GetAll(parametros);
        }

        public async Task<m.SCP.Interfaces.IProveedorContactos> GetProveedorContactoById(int id)
        {
            var daoProveedorContacto = Get<d.SCP.Interfaces.IProveedorContacto>();
            return await daoProveedorContacto.GetById(id);

        }

        public async Task<List<m.SCP.Interfaces.IProveedorActaConstitutiva>> GetProveedorActasConstitutivas(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCP.Interfaces.IProveedoresActasConstitutivas>();

            return await daoRL.GetAll(parametros);
        }
        public async Task<m.SCP.Interfaces.IProveedorActaConstitutiva> GetProveedorActaConstitutivaById(int id)
        {
            var daoProveedorActa = Get<d.SCP.Interfaces.IProveedoresActasConstitutivas>();
            return await daoProveedorActa.GetById(id);

        }
        public async Task<List<m.SCP.Interfaces.IProveedorRegistroPublicoPropiedad>> GetProveedorRegistroPublicos(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCP.Interfaces.IProveedoresRegistroPublicoPropiedad>();

            return await daoRL.GetAll(parametros);
        }
        public async Task<m.SCP.Interfaces.IProveedorRegistroPublicoPropiedad> GetProveedorPublicoPropiedadById(int id)
        {
            var daoProveedorPublico = Get<d.SCP.Interfaces.IProveedoresRegistroPublicoPropiedad>();
            return await daoProveedorPublico.GetById(id);

        }
        public async Task<bool> ExistsContacto(Dictionary<string, object> parametros)
        {
            var daoProveedorContacto = Get<d.SCP.Interfaces.IProveedorContacto>();

            var retValue = false;
            int? idItem = 0;
            if (parametros != null)
            {
                if (parametros.ContainsKey("ID"))
                {
                    idItem = Convert.ToInt32(parametros["ID"]);
                    //
                    parametros.Remove("ID");
                    //
                }
            }


            List<m.SCP.Interfaces.IProveedorContactos> items = await daoProveedorContacto.GetAll(parametros);

            if (items != null)
            {
                if (items.Count > 0)
                {
                    foreach (var item in items)
                    {
                        if (item.ID != idItem)
                        {
                            retValue = true;
                            break;
                        }
                    }
                }
            }

            return retValue;
        }

        public override async Task<m.SCP.Interfaces.IProveedor> GetById(int id)
        {
            var retValue = await this.dao.GetById(id);
            
            var daoAC = Get<d.SCP.Interfaces.IProveedoresActasConstitutivas>();
            var daoRP = Get<d.SCP.Interfaces.IProveedoresRegistroPublicoPropiedad>();

            retValue.ActasConstitutivas = await daoAC.GetAll(new Dictionary<string, object> { { "idProveedor", id } });
            retValue.RegistrosPublicosPropiedad = await daoRP.GetAll(new Dictionary<string, object> { { "idProveedor", id } });

            retValue = await this.afterGetItem(retValue);
            return retValue;
        }

        public override async Task<m.SCP.Interfaces.IProveedor> Save(m.SCP.Interfaces.IProveedor item)
        {
            try
            {
                BeginTransaction(true);

                var telefonos = item.Telefonos;
                var correos = item.Correos;
                var actaConstitutiva = item.ActasConstitutivas;
                var publicoPropiedad = item.RegistrosPublicosPropiedad;
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

                var daoT = Get<d.SCP.Interfaces.IProveedorContacto>();
                var daoC = Get<d.SCP.Interfaces.IProveedorContacto>();
                var daoAC = Get<d.SCP.Interfaces.IProveedoresActasConstitutivas>();
                var daoPP = Get<d.SCP.Interfaces.IProveedoresRegistroPublicoPropiedad>();

                int idProveedor = -1;

                item = await base.saveModel(item);
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                idProveedor = item.ID ?? 0;

                //Se Guardan TELEFONOS
                if (telefonos != null && telefonos.Count > 0)
                {
                    foreach (var r in telefonos)
                    {
                        if (r.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            r.IdProveedor = idProveedor;
                            r.Estatus = estatus;
                            r.IdEstatus = estatus.ID;
                            r.Modificado = DateTime.UtcNow;
                            r.IdModificadoPor = base.getUserId();

                            if (r.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                var tipoContacto = await bpEstatus.Get("TIPOCONTACTO", "TELEFONO");
                                r.IdTipoContacto = Convert.ToInt32(tipoContacto.ID);
                                r.Creado = DateTime.UtcNow;
                                r.IdCreadoPor = base.getUserId();
                            }

                            if (r.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoT.Delete(r.ID.Value);
                            }
                            else
                            {
                                await daoT.SaveEntity(r, false, true);
                            }
                        }
                    }
                }

                //Se guardan Correos
                if (correos != null && correos.Count > 0)
                {
                    foreach (var r in correos)
                    {
                        if (r.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            r.IdProveedor = idProveedor;
                            r.Estatus = estatus;
                            r.IdEstatus = estatus.ID;
                            r.Modificado = DateTime.UtcNow;
                            r.IdModificadoPor = base.getUserId();

                            if (r.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                var tipoContacto = await bpEstatus.Get("TIPOCONTACTO", "CORREO");
                                r.IdTipoContacto = Convert.ToInt32(tipoContacto.ID);
                                r.Creado = DateTime.UtcNow;
                                r.IdCreadoPor = base.getUserId();
                            }

                            if (r.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoC.Delete(r.ID.Value);
                            }
                            else
                            {
                                await daoC.SaveEntity(r, false, true);
                            }
                        }
                    }
                }
                //ActaConstitutiva
                if (actaConstitutiva != null)
                {
                    foreach (var r in actaConstitutiva)
                    {
                        if (r.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            r.IdProveedor = idProveedor;
                            r.Estatus = estatus;
                            r.IdEstatus = estatus.ID;
                            r.Modificado = DateTime.UtcNow;
                            r.IdModificadoPor = base.getUserId();

                            if (r.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                r.Creado = DateTime.UtcNow;
                                r.IdCreadoPor = base.getUserId();
                            }

                            if (r.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoAC.Delete(r.ID.Value);
                            }
                            else
                            {
                                await daoC.SaveEntity(r, false, true);
                            }
                        }
                    }
                }
                //publicoPropiedad
                if (publicoPropiedad != null)
                {
                    foreach (var r in publicoPropiedad)
                    {
                        if (r.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            r.IdProveedor = idProveedor;
                            r.Estatus = estatus;
                            r.IdEstatus = estatus.ID;
                            r.Modificado = DateTime.UtcNow;
                            r.IdModificadoPor = base.getUserId();

                            if (r.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                r.Creado = DateTime.UtcNow;
                                r.IdCreadoPor = base.getUserId();
                            }

                            if (r.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoAC.Delete(r.ID.Value);
                            }
                            else
                            {
                                await daoC.SaveEntity(r, false, true);
                            }
                        }
                    }
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }
            item = await GetById(item.ID.Value);
            return item;
        }
    }
}