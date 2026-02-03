using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class Instituciones
        : p.Kontrol.BPBase<m.SCV.Interfaces.IInstitucion, d.SCV.Interfaces.IInstituciones>, p.SCV.Interfaces.IInstituciones
    {
        public Instituciones(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IInstituciones dao)
            : base(factory, dao, "instituciones")
        {
        }

        public override Task<m.SCV.Interfaces.IInstitucion> Save(m.SCV.Interfaces.IInstitucion item)
        {
            return base.Save(item);
        }

        protected override Task<m.SCV.Interfaces.IInstitucion> saveModel(m.SCV.Interfaces.IInstitucion item)
        {
            return base.saveModel(item);
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.ID = obj.ID;
            entity.Clave = obj.Clave;
            entity.Nombre = obj.Nombre;

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

        //public async Task<object[]> GetFinanciamientoInstituciones(Dictionary<string, object> parametros)
        //{
        //    return await this.dao.GetAllTFInstituciones(parametros);
        //}

        //public async Task<object[]> GetInstitucionDetalle(Dictionary<string, object> parametros)
        //{
        //    var daoDet = Get<d.SCV.Interfaces.ITF_Institucion_Detalle>();
        //    return await daoDet.GetInstitucionDetalle(parametros);
        //}

        //public async Task<List<IInstitucion>> GetInstitucionesEsquema()
        //{
        //    var retValue = await this.dao.GetInstitucionesEsquema();
        //    return retValue;
        //}
    }
}