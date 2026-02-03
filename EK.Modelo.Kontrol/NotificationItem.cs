using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol
{
    public class NotificationItem: INotificationItem
    {
        private int id;
        private string time;
        private string title;
        private string image;
        private string text;
        private string typeElement;
        private int data;
        private int? valueNow;

        public int Id
        {
            get {
                return this.id;
            }
            set {
                this.id = value;
            }
        }

        public string Time
        {
            get {
                return this.time;
            }
            set {
                this.time = value;
            }
        }
        public string Title
        {
            get
            {
                return this.title;
            }
            set
            {
                this.title = value;
            }
        }
        public string Image {
                get {
                    return this.image;
                }
                set {
                    this.image = value;
                }
            }
        public string Text
        {
            get
            {
                return this.text;
            }
            set
            {
                this.text = value;
            }
        }
        public string TypeElement
        {
            get
            {
                return this.typeElement;
            }
            set
            {
                this.typeElement = value;
            }
        }
        public int Data
        {
            get
            {
                return this.data;
            }
            set
            {
                this.data = value;
            }
        }
        public int? ValueNow
        {
            get
            {
                return this.valueNow;
            }
            set
            {
                this.valueNow = value;
            }
        }     
    }
}
