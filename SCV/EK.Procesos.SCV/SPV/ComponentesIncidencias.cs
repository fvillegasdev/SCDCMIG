using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace EK.Procesos.SCV
{
    public class ComponentesIncidencias : p.Kontrol.BPBase<m.SCV.Interfaces.IComponenteIncidencia, d.SCV.Interfaces.IComponentesIncidencias>, p.SCV.Interfaces.IComponentesIncidencias
    {
        public ComponentesIncidencias(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IComponentesIncidencias dao)
            : base(factory, dao, "Fallas")
        {
        }

#if BASE


        public override async Task<IComponenteIncidencia> Save(IComponenteIncidencia item)
        {


            try
            {

                //var daoTipoFalla = Get<d.SCV.Interfaces.IFallaTipoFalla>();
                var daoTipoInmueble = Get<d.SCV.Interfaces.IFallaTipoInmueble>();

                //var tiposFallas = item.TiposFallas;
                var tiposInmuebles = item.TiposInmuebles;
                item.IdTipoFalla = item.TipoComponente.ID.Value;
                item = await base.saveModel(item);
                //foreach (var r in tiposFallas)
                //{
                //    r.IdFalla = item.ID??0;

                //    if (r.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                //    {
                //        //r.IdCliente = idCliente;
                //        //r.Estatus = estatus;
                //        //r.IdEstatus = estatus.ID;
                //        r.Modificado = DateTime.UtcNow;
                //        r.IdModificadoPor = base.getUserId();

                //        if (r.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                //        {
                //            r.Creado = DateTime.UtcNow;
                //            r.IdCreadoPor = base.getUserId();
                //        }

                //        if (r.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                //        {
                //            await daoTipoFalla.Delete(r.ID.Value);
                //        }
                //        else
                //        {
                //            await daoTipoFalla.SaveEntity(r, false, true);
                //        }
                //    }

                //}

                foreach (var r in tiposInmuebles)
                {
                    r.IdFalla = item.ID ?? 0;
                    if (r.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                    {
                        //r.IdCliente = idCliente;
                        //r.Estatus = estatus;
                        //r.IdEstatus = estatus.ID;
                        r.Modificado = DateTime.UtcNow;
                        r.IdModificadoPor = base.getUserId();
                        r.IdTipoInmueble = r.TipoInmueble.ID.Value;

                        if (r.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                        {
                            r.Creado = DateTime.UtcNow;
                            r.IdCreadoPor = base.getUserId();
                        }

                        if (r.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            await daoTipoInmueble.Delete(r.ID.Value);
                        }
                        else
                        {
                            await daoTipoInmueble.SaveEntity(r, false, true);
                        }
                    }
                }


            }
            catch (Exception ex)
            {
                throw new ApplicationException("Save::" + ex.Message, ex);
            }

            item = await this.GetById(item.ID.Value);



            return item;
        }
        public override async Task<IComponenteIncidencia> GetById(int id)
        {
            var daoFalla = Get<d.SCV.Interfaces.IComponentesIncidencias>();


            //var daoTipoFalla = Get<d.SCV.Interfaces.ITiposFallas>();
            var daoTipoInmueble = Get<d.SCV.Interfaces.IFallaTipoInmueble>();



            var item = await daoFalla.GetById(id);

            //var tipoFalla = await daoTipoFalla.GetById(item.TipoFalla.ID??0);

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "idComponente", id}
                };
                //item.TipoFalla = tipoFalla;
                //List<IFallaTipoFalla> tiposFallas = (List<IFallaTipoFalla>)await daoTipoFalla.GetAll(parameters);
                List<IFallaTipoInmueble> tiposInmuebles = (List<IFallaTipoInmueble>)await daoTipoInmueble.GetAll(parameters);
                //item.TiposFallas = tiposFallas;
                item.TiposInmuebles = tiposInmuebles;

            }
            catch (Exception ex)
            {
                throw new ApplicationException("GetById::" + ex.Message, ex);
            }



            return item;
        }

#endif
    }

}