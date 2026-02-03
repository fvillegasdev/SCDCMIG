using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

using EK.Signer;

namespace EK.Procesos.Kontrol
{
    [LicenseClass("zHUhiBmaGJogpUfjpr+sISyjf2zrCO81DYYUfUAk9TKBE2Q4qJ3M9iOr3ANhkmCc")]
    public class Dominios
        : BPBase<m.Kontrol.Interfaces.IDominios, d.Kontrol.Interfaces.IDominios>, p.Kontrol.Interfaces.IDominios
    {
        public Dominios(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDominios dao)
               : base(factory, dao, "Dominios")
        {
        }

        public async Task<object[]> CheckLicenseInfo(int idDominio, string key1, string key2, string key3)
        {
            //var licenseInfo = LicenseManager.Instance.Decrypt<LicenseDomainInfo>(key1, key2, key3);
            ////
            //string[] companiasLicencia = licenseInfo.Companies;
            //int totalLicencias = 0;
            ////
            //foreach (var l in licenseInfo.Licenses)
            //{
            //    totalLicencias += l.Value;
            //}
            await Task.Run(() => { });
            return null;
        }
        public async Task<object[]> GetLicenseInfo(int idDominio) {
            object[] retValue = null;
            //
            try
            {
                /*
                // 1.- Validar dominio
                var dominio = await this.GetById(idDominio);
                var licenseInfo = LicenseManager.Instance.Decrypt<LicenseDomainInfo>(dominio.Licencia, dominio.ClaveDominio, dominio.HashDominio);

                // 2.- Obtener las licencias y validarlas por su tipo
                var dalLicencias = Get<d.Kontrol.Interfaces.ILicencias>();
                var licencias = await dalLicencias.GetAll(null);
                var estatusInvalido = await base.GetCGV("ESTATUSLICENCIA", "I");
                //
                if (licencias != null)
                {
                    foreach (var l in licencias)
                    {
                        var itemInfo = new LicenseItemInfo()
                        {
                            InternalID = l.InternalID,
                            ItemID = l.IdEntidad,
                            ItemCode = l.Entidad?.Clave,
                            LicenseID = l.ID.Value,
                            LicenseCode = l.Clave,
                            LicenseTypeCode = l.Tipo.Clave,
                            Key = dominio.ClaveDominio,
                            KeyDigest = l.HashLicencia,
                            License = l.ClaveLicencia
                        };
                        //
                        string[] ms;
                        if (!LicenseManager.Instance.IsValidItemLicense(itemInfo, out ms))
                        {
                            l.Estatus = estatusInvalido;
                            l.IdEstatus = estatusInvalido.ID;
                        }
                        l.Mensajes = ms;
                    }
                }
                //
                
                retValue = licencias.ToArray();
                */
            }
            catch
            {
                throw;
            }
            //
            return retValue;
        }
    }
}