using EK.Drivers.Log;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using diSCV = EK.Datos.SCV.Interfaces;
using miKontrol = EK.Modelo.Kontrol.Interfaces;
using miSCV = EK.Modelo.SCV.Interfaces;
using pKontrol = EK.Procesos.Kontrol;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
namespace EK.Procesos.SCV
{
    public class SegmentosVigencia
      : p.Kontrol.BPBase
        <m.SCV.Interfaces.ISegmentosVigencia,
        d.SCV.Interfaces.ISegmentosVigencia>,
        p.SCV.Interfaces.ISegmentosVigencia
    {
       public SegmentosVigencia(miKontrol.IContainerFactory factory, diSCV.ISegmentosVigencia dao)
               : base(factory,dao, "segmentosvigencia")
        {
        }
        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.ID = obj.ID;
            entity.PrecioInicial = obj.PrecioInicial;
            entity.PrecioFinal = obj.PrecioFinal;
            entity.IdSegmento = obj.Segmento.ID;
        }
        //#region Public Functions

        //public object[] GetAll(int id, int activos)
        //{
        //    return this.dao.GetAll(id, activos);
        //}

        //public miSCV.ISegmentoVigencia GetById(int id)
        //{
        //    return this.dao.GetById(id);
        //}

        //public async Task<miSCV.ISegmentoVigencia> Save(string item)
        //{
        //    dynamic obj = JsonConvert.DeserializeObject(item);
        //    var model = factory.GetInstance<miSCV.ISegmentoVigencia>();
        //    model.ID = obj.ID == null ? 0 : obj.ID;
        //    model.IdSegmento = obj.Segmento.ID;
        //    model.Vigencia = obj.Vigencia;
        //    model.PrecioInicial = obj.PrecioInicial;
        //    model.PrecioFinal = obj.PrecioFinal;
        //    model.IdEstatus = obj.Estatus.ID;
        //    model.IdCreadoPor = base.getUserId();
        //    model.IdModificadoPor = base.getUserId();

        //    int number = this.dao.Save(model);
        //    // save
        //    model = this.dao.GetById((obj.ID == 0) ? number : (int)obj.ID);
        //    model.Estado = (obj.ID == null) ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo : Modelo.Kontrol.KontrolEstadosEnum.Modificado;

        //    // log changes
        //    await this.Log(model);
        //    return model;
        //}

        //public async Task<object[]> GetHistory(int top)
        //{
        //    return await base.GetEntityHistory(catalogo, top);
        //}

        //public async Task<object[]> GetHistory(int ID, int top)
        //{
        //    return await base.GetEntityHistory(catalogo, ID, top);
        //}

        //#endregion Public Functions

        //#region Private Functions

        //private async Task Log(miSCV.ISegmentoVigencia obj)
        //{
        //    dynamic entity = new ElasticEntity();

        //    entity.ID = obj.ID;

        //    entity.IdSegmento = obj.Segmento.ID;
        //    entity.IdSegmentoDescripcion = obj.Segmento.Descripcion;
        //    entity.IdSegmentoIdContable = obj.Segmento.IdContable;
        //    entity.Vigencia = obj.Vigencia;
        //    entity.PrecioInicial = obj.PrecioInicial;
        //    entity.PrecioFinal = obj.PrecioFinal;

        //    entity.IdEstatus = obj.Estatus.ID;
        //    entity.IdEstatusClave = obj.Estatus.Clave;
        //    entity.IdEstatusNombre = obj.Estatus.Nombre;

        //    entity.RecordType = Convert.ToInt32(obj.Estado);
        //    entity.RecordTypeName = obj.Estado.ToString();

        //    entity.Creado = obj.Creado;
        //    entity.IdCreadoPor = obj.CreadoPor.ID;
        //    entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

        //    entity.Modificado = obj.Modificado;
        //    entity.IdModificadoPor = obj.ModificadoPor.ID;
        //    entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

        //    await this.factory.GetInstance<ILogger>().AddAsync(catalogo, entity);
        //}

        //#endregion Private Functions
    }
}