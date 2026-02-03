using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;
using EK.Common.Managers;
using EK.Drivers.Log;
using Microsoft.ServiceBus.Messaging;
using Newtonsoft.Json;
using System.Linq;
using dKontrol = EK.Datos.Kontrol.Interfaces;
using mKontrol = EK.Modelo.Kontrol.Interfaces;
using pKontrol = EK.Procesos.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol
{
    public class Modulos
        : BPBase<m.Kontrol.Interfaces.IModulo, d.Kontrol.Interfaces.IModulos>, p.Kontrol.Interfaces.IModulos
    {
        public Modulos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IModulos dao)
               : base(factory, dao, "modulos")
        {

          base.factory = factory;
          this.dao = dao;
        }
        public mKontrol.IOpcionModulo[] GetOpciones(mKontrol.IOpcionModulo[] opciones)
        {
            List<mKontrol.IOpcionModulo> retValue = null;
            Action<mKontrol.IOpcionModulo> lookup = null;
            if (opciones.Count() > 0)
            {
                if (opciones[0].IdPadre != null)
                {
                    opciones[0].IdPadre = null;
                }
            }

            try
            {
                if (opciones != null)
                {
                    retValue = new List<mKontrol.IOpcionModulo>();

                    lookup = (mKontrol.IOpcionModulo padre) =>
                    {
                        opciones.Where(o => o.IdPadre == padre.ID).ToList().ForEach(o =>
                        {
                            o.Padre = padre;
                            padre.Opciones.Add(o);

                            // lookup childs
                            lookup(o);
                        });
                    };

                    opciones.Where(o => o.IdPadre == null).ToList().ForEach(o =>
                    {
                        retValue.Add(o);

                        // lookup childs
                        lookup(o);
                    });
                }
            }
            catch (Exception)
            {
                throw;
            }

            return retValue != null ? retValue.ToArray() : null;
        }

        public async Task<mKontrol.IOpcionModulo[]> GetOpciones(Dictionary<string, object> parametros)
        {
            return this.GetOpciones(await this.dao.GetOpciones(parametros));
        }
        public async Task<object[]> GetAccionesPorOpcion(string clave)
        {
            return await this.dao.GetAccionesPorOpcion(clave);
        }
    }
}