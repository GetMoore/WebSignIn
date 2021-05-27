using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_Sign_In.Services
{
    public interface IPainScaleService
    {
        List<string> BuildPainScaleList(int max);
    }

    public class PainScaleService : IPainScaleService
    {
        public List<string> BuildPainScaleList(int max)
        {
            var returnList = new List<string>();
            for (int i = 0; i < max; i++)
                returnList.Add(i.ToString());
            return returnList;
        }
    }
}
