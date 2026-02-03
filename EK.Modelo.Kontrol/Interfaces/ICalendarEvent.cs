using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface ICalendarEvent
    {
        int ID { get; set; }
        string Link { get; set; }
        string Ruta { get; set; }
        string Summary { get; set; }
        string UID { get; set; }
        string Sequence { get; set; }
        string Status { get; set; }
        string Transp { get; set; }
        string RRule { get; set; }
        DateTime DTStart { get; set; }
        DateTime DTEnd { get; set; }
        string DTStamp { get; set; }
        string Categories { get; set; }
        string Location { get; set; }
        string GEO { get; set; }
        string Description { get; set; }
        string BackgroundColor { get; set; }
        string TextColor { get; set; }
        bool AllDay { get; set; }
        ItemGeneral TipoAgenda { get; set; }
    }
}
