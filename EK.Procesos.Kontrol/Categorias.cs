using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Categorias :
        BPBase<m.Kontrol.Interfaces.ICategoria, d.Kontrol.Interfaces.ICategorias>,
        p.Kontrol.Interfaces.ICategorias
    {
        public Categorias(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ICategorias dao)
               : base(factory, dao, "categorias")
        {
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.IdPuesto = obj.IdPuesto;

            if (obj.Puesto != null)
            {
                entity.IdPuestoClave = obj.Puesto.Clave;
                entity.IdPuestoNombre = obj.Puesto.Nombre;
            }
        }
    }
}