//using System;
//using System.Collections.Generic;
//using EK.Datos.SCO.Interfaces;
//using EK.Modelo.SCO.Interfaces;
//using diSCO = EK.Datos.SCO.Interfaces;
//using dKontrol = EK.Datos.Kontrol;
//using mKontrol = EK.Modelo.Kontrol;
//using System.Data;

//namespace EK.Datos.SCO.Sybase
//{
//    public class Polizas : IPolizas
//    {

//        private const string USP_POLIZAS_INS_UPD = "{call usp_polizas_ins_upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//        private const string USP_MOVPOLIZAS_INS_UPD = "{call usp_mov_pol_ins_upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//        private dKontrol.Interfaces.IDBHelper helper;

//        public Polizas(mKontrol.Interfaces.IContainerFactory factory, dKontrol.Interfaces.IDBHelper helper)
//        {
//            this.helper = new dKontrol.Sybase.DBHelper(factory);

//        }

//        public int GeneraMovimientoPoliza(IMovimientosPoliza model)
//        {
//            int result = 0;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "idCompania",model.IdCompania},
//                    { "tipoOperacion", 1 }, // INSERT
//                    { "year", model.Poliza.Anio },
//                    { "mes", model.Poliza.Mes},
//                    { "poliza", model.Poliza.NumeroPoliza },
//                    { "tp", model.Poliza.TipoPoliza.Clave},
//                    { "linea", model.Linea },
//                    { "cta", model.Cta },
//                    { "scta", model.Scta },
//                    { "sscta", model.Sscta},
//                    { "digito", model.Digito },
//                    { "tm", model.IdTipoMovimiento },
//                    { "referencia", model.Referencia },
//                    { "cc", model.CveCC },
//                    { "concepto", model.Concepto },
//                    { "monto", model.Monto },
//                    { "iclave", DBNull.Value },
//                    { "itm", 0},
//                    { "st_par", string.Empty },
//                    { "orden_compra", model.OrdenCompra },
//                    { "numpro", model.IdProveedor },
//                    { "retvalue", DBNull.Value}


//                };


//                result = helper.GetResult(USP_MOVPOLIZAS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {

//                throw;
//            }
//            return result;
//        }

//        public int GeneraPoliza(IPoliza model)
//        {

//            int result = 0;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "idCompania",model.IdCompania},
//                    { "tipoOperacion", 1 }, // INSERT
//                    { "pAnio", model.Anio },
//                    { "pMes", model.Mes},
//                    { "pPoliza", model.NumeroPoliza },
//                    { "pTipoPoliza", model.TipoPoliza.Clave},
//                    { "pFechaPoliza", model.FechaPoliza },
//                    { "pCargo", model.Cargos },
//                    { "pAbono", model.Abonos },
//                    { "pGenerada", model.GeneradoPor},
//                    { "pEstatus", model.Estatus.Clave },
//                    { "pUsuario", model.IdCreadoPor },
//                    { "concepto", model.Concepto },
//                    { "retvalue", DBNull.Value }

//                };


//                result = helper.GetResult(USP_POLIZAS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {

//                throw;
//            }
//            return result;


//        }
//        public IPoliza GetByID(int idPoliza)
//        {
//            throw new NotImplementedException();
//        }

//        public IMovimientosPoliza GetMovimientoById(int idMovimiento)
//        {
//            throw new NotImplementedException();
//        }

//        public List<IMovimientosPoliza> GetMovimientosByPoliza(int idPoliza)
//        {
//            throw new NotImplementedException();
//        }
//    }
//}
