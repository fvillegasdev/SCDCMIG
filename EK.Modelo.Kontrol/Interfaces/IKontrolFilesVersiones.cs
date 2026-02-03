using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("KontrolFilesVersiones")]
    public interface IKontrolFilesVersiones : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }


        [Column()]
        int IdFile { get; set; }


        [Column()]
        int FileVersion { get; set; }


        [Column()]
        string Uid { get; set; }


        [Column()]
        string FilePath { get; set; }


        [Column()]
        long? FileSize { get; set; }


        [Column()]
        string FileType { get; set; }


        [Column()]
        string FileExtension { get; set; }



        IKontrolFile KontrolFile { get; set; }

    }
}