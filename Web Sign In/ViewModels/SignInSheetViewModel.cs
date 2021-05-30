using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_Sign_In.ViewModels
{
    public class SignInSheetViewModel
    {
        public SignInSheetViewModel() { }

        public void SetPainScales(List<string> painScales)
        {
            this.PainScales = painScales;
        }

        public List<string> PainScales { get; set; }
        public string SelectedPainScale { get; set; }
        public string PatientName { get; set; }
        public string Comments { get; set; }
    }
}
