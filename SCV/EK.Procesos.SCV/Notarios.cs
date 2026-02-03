using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class Notarios
        : p.Kontrol.BPBase<m.SCV.Interfaces.INotario, d.SCV.Interfaces.INotarios>, p.SCV.Interfaces.INotarios
    {
        public Notarios(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.INotarios dao)
               : base(factory, dao, "notarios")
        {
        }


        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.Nombre = obj.Nombre;
            entity.Direccion = obj.Direccion;
            entity.IdLocalidad = obj.Asentamiento.ID;
            entity.Telefono1 = obj.Telefono1;
            entity.Telefono2 = obj.Telefono2;
            entity.Email = obj.Email;
            entity.Suplente = obj.Suplente;
            entity.NumNotaria = obj.NumNotaria;

        }

        public async Task<object> GetNotarios(Dictionary<string,object> parametros)
        {
            object retValue = null;
            var daoNotarios = Get<d.SCV.Interfaces.INotarios>();
            if(parametros == null)
            {
                var p = new Dictionary<string, object>();
                p.Add("activos", 1);
                retValue = await daoNotarios.GetAll(p);
                return retValue;
            }
            retValue = await daoNotarios.GetAll(parametros);
            return retValue;
        }
        protected override Task<m.SCV.Interfaces.INotario> saveModel(m.SCV.Interfaces.INotario item)
        {
            if (item != null)
            {
                if (item.Asentamiento != null)
                {
                    item.IdLocalidad =(int)item.Asentamiento.ID;
                }
            }

            return base.saveModel(item);
        }

    }
}
