using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class Segmentos : p.Kontrol.BPBase<m.SCV.Interfaces.ISegmento, d.SCV.Interfaces.ISegmentos>,
        p.SCV.Interfaces.ISegmentos
    {
        //private diSCV.ISegmentos dao;
        //private const string catalogo = "segmentos";

        public Segmentos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ISegmentos dao)
            : base(factory, dao, "segmentos")
        {
        }
        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.ID = obj.ID;
            entity.Descripcion = obj.Descripcion;
            entity.IdContable = obj.IdContable;
            entity.RecordType = Convert.ToInt32(obj.Estado);
            entity.RecordTypeName = obj.Estado.ToString();
        }
        //#region Public Functions
    }
}

    //    public object[] GetAll(int id, int activos)
    //    {
    //        return this.dao.GetAll(id, activos);
    //    }

    //    public miSCV.ISegmento GetById(int id)
    //    {
    //        return this.dao.GetById(id);
    //    }

    //    public async Task<miSCV.ISegmento> Save(string item)
    //    {
    //        dynamic obj = JsonConvert.DeserializeObject(item);
    //        var model = factory.GetInstance<miSCV.ISegmento>();
    //        model.ID = obj.ID == null ? 0 : obj.ID;
    //        model.Descripcion = obj.Descripcion;
    //        model.IdContable = obj.IdContable;
    //        model.IdEstatus = obj.Estatus.ID;
    //        model.IdCreadoPor = base.getUserId();
    //        model.IdModificadoPor = base.getUserId();

    //        int number = this.dao.Save(model);
    //        // save
    //        model = this.dao.GetById((obj.ID == 0) ? number : (int)obj.ID);
    //        model.Estado = (obj.ID == null) ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo : Modelo.Kontrol.KontrolEstadosEnum.Modificado;

    //        // log changes
    //        await this.Log(model);
    //        return model;
    //    }

    //    public async Task<object[]> GetHistory(int top)
    //    {
    //        return await base.GetEntityHistory(catalogo, top);
    //    }

    //    public async Task<object[]> GetHistory(int ID, int top)
    //    {
    //        return await base.GetEntityHistory(catalogo, ID, top);
    //    }

    //    #endregion Public Functions

    //    #region Private Functions

    //    private async Task Log(miSCV.ISegmento obj)
    //    {
    //        dynamic entity = new ElasticEntity();

    //        entity.ID = obj.ID;
    //        entity.Descripcion = obj.Descripcion;
    //        entity.IdContable = obj.IdContable;

    //        entity.IdEstatus = obj.Estatus.ID;
    //        entity.IdEstatusClave = obj.Estatus.Clave;
    //        entity.IdEstatusNombre = obj.Estatus.Nombre;

    //        entity.RecordType = Convert.ToInt32(obj.Estado);
    //        entity.RecordTypeName = obj.Estado.ToString();

    //        entity.Creado = obj.Creado;
    //        entity.IdCreadoPor = obj.CreadoPor.ID;
    //        entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

    //        entity.Modificado = obj.Modificado;
    //        entity.IdModificadoPor = obj.ModificadoPor.ID;
    //        entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

    //        await this.factory.GetInstance<ILogger>().AddAsync(catalogo, entity);
    //    }

    //    #endregion Private Functions
    //}
//}