using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Procesos.Kontrol
{
    public class Bitacora
        : p.Kontrol.BPBase<m.Kontrol.Interfaces.IBitacora, d.Kontrol.Interfaces.IBitacora>, p.Kontrol.Interfaces.IBitacora
    {
        public Bitacora(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IBitacora dao)
            : base(factory, dao, "bitacora")
        {
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.Comentarios = obj.Comentarios;
        }


        public async Task<m.Kontrol.Interfaces.IBitacora> SaveBitacora(
            string comentario,
            string claveEntidad, 
            string claveEvento, 
            int idEntidad,
            string claveEntidadPadre,
            int idEntidadPadre,
            int? idEntidadPosterior)
        {
            try
            {
                BeginTransaction(true);

                var moBitacora = Get<EK.Modelo.Kontrol.Interfaces.IBitacora>();
                var bpCatalogoG = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ITiposEntidad>();


                var evento = await this.GetEventoByClave(claveEvento);
                var entidadPadre = await bpTipoEntidad.GetByClave(claveEntidadPadre);
                var estatus = await bpCatalogoG.Get("ESTATUS", "A");


                moBitacora.ID = -1;
                moBitacora.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                moBitacora.Comentarios = comentario;
                moBitacora.IdEvento = evento.ID.Value;
                var entidad = await bpTipoEntidad.GetByClave(claveEntidad);
                moBitacora.IdEstatus = estatus.ID.Value;
                moBitacora.Modulo = entidadPadre.Clave;


                moBitacora.IdTipoEntidadPadre = entidadPadre.ID.Value;
                moBitacora.IdEntidadPadre = idEntidadPadre;


                moBitacora.IdTipoEntidad = entidad.ID.Value;
                moBitacora.IdEntidad = idEntidad;
                moBitacora.IdEntidadPosterior = idEntidadPosterior;


                moBitacora = await base.saveModel(moBitacora);
                Commit();
                return moBitacora;
            }

            catch
            {
                Rollback();
                throw;
            }
        }



        public override async Task<m.Kontrol.Interfaces.IBitacora> Save(m.Kontrol.Interfaces.IBitacora item)
        {
            try
            {
                int? idEvento = item.IdEvento;
                int? idEstatus = item.IdEstatus;

                var bpCatalogoG = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ITiposEntidad>();


                if (idEvento == null)
                {
                    var tipoEvento = await this.GetEventoByClave("G");
                    idEvento = tipoEvento.ID.Value;
                }

                if (idEstatus ==null || idEstatus==0)
                {
                    var estatus = await bpCatalogoG.Get("ESTATUS", "A");
                    idEstatus = estatus.ID.Value;
                }
               


                if (item.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                {
                    item.Modificado = DateTime.UtcNow;
                    item.IdModificadoPor = base.getUserId();

                    if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                    {
                        item.Creado = DateTime.UtcNow;
                        item.IdCreadoPor = base.getUserId();
                    }
                }

                var tipoEntidad = await bpTipoEntidad.GetByClave(item.Modulo);


                item.IdEvento =(int)idEvento;
                item.IdEstatus = idEstatus;

                item.IdTipoEntidad = tipoEntidad.ID.Value;
                item.IdTipoEntidadPadre = tipoEntidad.ID.Value;

                if (item.IdEntidadPadre == 0 || item.IdEntidadPadre==null)
                {
                    item.IdEntidadPadre = item.IdEntidad;
                }

                item = await base.saveModel(item);
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
                Rollback();
                throw;
            }
            return item;
        }


        public  async Task<List<m.Kontrol.Interfaces.IBitacora>>GuardarBitacora(m.Kontrol.Interfaces.IBitacora item)
        {
            List<m.Kontrol.Interfaces.IBitacora> list = new List<m.Kontrol.Interfaces.IBitacora>();
            try
            {
                item = await this.Save(item);
                var parameters = new Dictionary<string, object>
                {
                    { "IdEntidad", item.IdEntidad},
                    { "Modulo", item.Modulo}

                };

                list=(List<m.Kontrol.Interfaces.IBitacora>)await base.GetAll(parameters);
                
            }
            catch
            {
                Rollback();
                throw;
            }
            return list;
        }


        public async Task<List<m.Kontrol.Interfaces.IBitacoraEventos>> ObtenerEventosBitacora(Dictionary<string, object> parametros)
        {

            var daoBitacoraEventos = Get<EK.Datos.Kontrol.Interfaces.IBitacoraEventos>();
            return await daoBitacoraEventos.GetAll(parametros);
        }


        public async Task<m.Kontrol.Interfaces.IBitacoraEventos> GetEventoByClave(string Clave)
        {
            var daoBitacoraEventos = Get<EK.Datos.Kontrol.Interfaces.IBitacoraEventos>();
            return await daoBitacoraEventos.GetByClave(Clave);
        }


        public  async Task<m.Kontrol.Interfaces.IBitacoraEventos> SaveEvents(m.Kontrol.Interfaces.IBitacoraEventos item)
        {
            try
            {
                var daoEventosBitacora = Get<d.Kontrol.Interfaces.IBitacoraEventos>();

                item.Modificado = DateTime.UtcNow;
                item.IdModificadoPor = base.getUserId();

                if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    item.Creado = DateTime.UtcNow;
                    item.IdCreadoPor = base.getUserId();

                    var bpCatalogoG = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var origen = await bpCatalogoG.Get("TIPOELEMENTOBITACORA", "GU");
                    item.IdOrigen = origen.ID.Value;
                }

                await daoEventosBitacora.Save(item);
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
                Rollback();
                throw;
            }
            return item;
        }

        public async Task<m.Kontrol.Interfaces.IBitacoraEventos> GetByEventoBitacora(Dictionary<string,object> parametros)
        {
            object evento = null;
            parametros.TryGetValue("id",out evento);
           var daoEventosBitacora = Get<d.Kontrol.Interfaces.IBitacoraEventos>();
           return await daoEventosBitacora.GetById(Convert.ToInt32(evento));
        }

        public async Task<int> DeleteEventoBitacora(Dictionary<string, object> parametros)
        {
            object evento = null;
            parametros.TryGetValue("id", out evento);
            var daoEventosBitacora = Get<d.Kontrol.Interfaces.IBitacoraEventos>();
            return await daoEventosBitacora.Delete(Convert.ToInt32(evento));
        }



    }
}