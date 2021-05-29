using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_Sign_In.Services
{
    public interface IFileService
    {
        bool SaveFile(byte[] contents);
    }

    public class TestFileService : IFileService
    {
        public bool SaveFile(byte[] contents)
        {
            try
            {
                var location = $"C:\\Users\\Jonathan\\Desktop\\PDF Tests\\Test_{DateTime.Now.Millisecond}.pdf";

                if (System.IO.File.Exists(location)) System.IO.File.Delete(location);
                System.IO.File.WriteAllBytes(location, contents);
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }
    }

    public class FileService : IFileService
    {
        public bool SaveFile(byte[] contents)
        {
            return true;
        }
    }
}
