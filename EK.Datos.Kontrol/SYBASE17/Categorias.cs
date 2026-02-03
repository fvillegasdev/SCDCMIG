using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Categorias
        : DAOBaseGeneric<m.Kontrol.Interfaces.ICategoria>, d.Kontrol.Interfaces.ICategorias
    {
        private const string USP_CATEGORIAS_SELECT = "usp_categorias_select";

        public Categorias(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
              factory,
              helper,
              USP_CATEGORIAS_SELECT,
              string.Empty,
              "categorias")
        { }
    }
}