//using System;
//using System.Collections.Generic;
//using System.Drawing;
//using System.Drawing.Imaging;
//using System.IO;

//using EK.Drivers.Storage;

//namespace EK.Common.Managers
//{
//    public class ImageManager
//    {
//        private IStorage storage;
//        public ImageManager(IStorage storage)
//        {
//            this.storage = storage;
//        }

//        private Image scaleImage(Image image, int maxWidth, int maxHeight)
//        {
//            var ratioX = (double)maxWidth / image.Width;
//            var ratioY = (double)maxHeight / image.Height;
//            var ratio = Math.Min(ratioX, ratioY);

//            var newWidth = (int)(image.Width * ratio);
//            var newHeight = (int)(image.Height * ratio);

//            var newImage = new Bitmap(newWidth, newHeight);

//            using (var graphics = Graphics.FromImage(newImage))
//                graphics.DrawImage(image, 0, 0, newWidth, newHeight);

//            return newImage;
//        }

//        public bool RemoveProfilePicture(string fileName) {
//            var retValue = true;
//            string newFileName = null;

//            try
//            {
//                newFileName = string.Format("fotos/lg/{0}", fileName);
//                this.storage.Delete(newFileName);

//                newFileName = string.Format("fotos/md/{0}", fileName);
//                this.storage.Delete(newFileName);

//                newFileName = string.Format("fotos/sm/{0}", fileName);
//                this.storage.Delete(newFileName);

//                newFileName = string.Format("fotos/original/{0}", fileName);
//                this.storage.Delete(newFileName);
//            }
//            catch
//            {
//                retValue = false;

//                throw;
//            }

//            return retValue;
//        }

//        public bool SaveProfilePicture(string fileName, string contentType, IDictionary<string, string> metadata, MemoryStream file)
//        {
//            var retValue = true;
//            var newImageContentType = "image/png";
//            string newFileName = null;            

//            try
//            {
//                file.Position = 0;
//                using (var image = Image.FromStream(file))
//                {
//                    // 180x180
//                    newFileName = string.Format("fotos/lg/{0}", fileName);
//                    using (var img180 = this.scaleImage(image, 180, 180))
//                    {
//                        using (var img180ms = new MemoryStream())
//                        {
//                            img180.Save(img180ms, ImageFormat.Png);

//                            this.storage.Save(newFileName, newImageContentType, metadata, img180ms.ToArray());
//                        }
//                    }
//                    // 128x128
//                    newFileName = string.Format("fotos/md/{0}", fileName);
//                    using (var img128 = this.scaleImage(image, 128, 128))
//                    {
//                        using (var img128ms = new MemoryStream())
//                        {
//                            img128.Save(img128ms, ImageFormat.Png);

//                            this.storage.Save(newFileName, newImageContentType, metadata, img128ms.ToArray());
//                        }
//                    }

//                    // 48x48
//                    newFileName = string.Format("fotos/sm/{0}", fileName);
//                    using (var img48 = this.scaleImage(image, 48, 48))
//                    {
//                        using (var img48ms = new MemoryStream())
//                        {
//                            img48.Save(img48ms, ImageFormat.Png);

//                            this.storage.Save(newFileName, newImageContentType, metadata, img48ms.ToArray());
//                        }
//                    }
//                }

//                // original
//                newFileName = string.Format("fotos/original/{0}", fileName);
//                file.Position = 0;
//                this.storage.Save(newFileName, contentType, metadata, file.ToArray());
//            }
//            catch {
//                retValue = false;

//                throw;
//            }

//            return retValue;
//        }
//    }
//}
