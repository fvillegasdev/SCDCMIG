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
    public class Sindicatos
        : p.Kontrol.BPBase<m.SCV.Interfaces.ISindicato, d.SCV.Interfaces.ISindicatos>,
        p.SCV.Interfaces.ISindicatos
    {
        public Sindicatos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ISindicatos dao)
            : base(factory, dao, "sindicatos")
        {
        }
        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.ID = obj.ID;
            entity.Clave = obj.Clave;
            entity.Nombre = obj.Nombre;
            entity.Domicilio = obj.Domicilio;
            entity.IdLocalidad = obj.Localidad.ID;
            //entity.CodigoPostal = obj.CodigoPostal;
            entity.Telefono = obj.Telefono;
            entity.Telefono2 = obj.Telefono2;
            entity.Celular = obj.Celular;
            entity.Fax = obj.Fax;
            entity.Email = obj.Email;
            entity.Contacto = obj.Contacto;
            entity.IdAgente = obj.Agente.ID;
            entity.IdAgenteNombre = obj.Agente.Nombre;
            entity.IdAgenteExterno = obj.AgenteExterno.ID;
            entity.IdAgenteExternoNombre = obj.AgenteExterno.Nombre;
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
    }
}
//public class Sindicatos : pKontrol.ProcesoBase, Interfaces.ISindicatos
//{
//    private diSCV.ISindicatos dao;
//    private const string catalogo = "sindicatos";

//    public Sindicatos(miKontrol.IContainerFactory factory, diSCV.ISindicatos dao) : base(factory)
//    {
//        this.factory = factory;
//        this.dao = dao;
//    }

//    public async Task<object[]> GetAll( int activos)
//    {
//        return await this.dao.GetAll(activos);
//    }

//    public async Task<miSCV.ISindicato> GetById(int id)
//    {
//        return await this.dao.GetById(id);
//    }

//    public async Task<miSCV.ISindicato> Save(miSCV.ISindicato sindicato)
//    {
//        var retValue = this.factory.GetInstance<miSCV.ISindicato>();
//        try
//        {
//            BeginTransaction();

//            var sindicatosDAO = Get<diSCV.ISindicatos>();

//            sindicato.IdCreadoPor = base.getUserId();
//            sindicato.IdModificadoPor = this.getUserId();

//            int id = await sindicatosDAO.Save(sindicato);

//            retValue = await sindicatosDAO.GetById(
//                (sindicato.ID == null) || (sindicato.ID == 0) ? id : (int)sindicato.ID);

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

//    public async Task Log(miSCV.ISindicato obj)
//    {
//        dynamic entity = new ElasticEntity();

//        try
//        {
//            entity.ID = obj.ID;
//            entity.Clave = obj.Clave;
//            entity.Nombre = obj.Nombre;
//            entity.Domicilio = obj.Domicilio;
//            entity.IdLocalidad = obj.Localidad.ID;
//            //entity.CodigoPostal = obj.CodigoPostal;
//            entity.Telefono = obj.Telefono;
//            entity.Telefono2 = obj.Telefono2;
//            entity.Celular = obj.Celular;
//            entity.Fax = obj.Fax;
//            entity.Email = obj.Email;
//            entity.Contacto = obj.Contacto;
//            entity.IdAgente = obj.Agente.ID;
//            entity.IdAgenteNombre = obj.Agente.Nombre;
//            entity.IdAgenteExterno = obj.AgenteExterno.ID;
//            entity.IdAgenteExternoNombre = obj.AgenteExterno.Nombre;
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

