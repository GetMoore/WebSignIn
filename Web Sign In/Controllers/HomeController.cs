using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Web_Sign_In.Models;
using Web_Sign_In.Services;
using Web_Sign_In.ViewModels;

namespace Web_Sign_In.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IPainScaleService _painScaleService;


        public HomeController(ILogger<HomeController> logger, IPainScaleService painScaleService)
        {
            _logger = logger;
            _painScaleService = painScaleService;
        }

        public IActionResult Index()
        {
            var vm = new SignInSheetViewModel();
            vm.SetPainScales(_painScaleService.BuildPainScaleList(10));
            return View(vm);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
