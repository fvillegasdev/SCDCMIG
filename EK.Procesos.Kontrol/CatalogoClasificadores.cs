using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class CatalogoClasificadores
        : BPBase<m.Kontrol.Interfaces.ICatalogoClasificador, d.Kontrol.Interfaces.ICatalogosClasificadores>, p.Kontrol.Interfaces.ICatalogoClasificadores
    {
        public CatalogoClasificadores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ICatalogosClasificadores dao)
            : base(factory, dao, "catalogoClasificadores")
        {
        }
    }
}
