using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using Web_Sign_In.Services;

namespace Web_Sign_In.Controllers
{
    public class FileController : Controller
    {
        private readonly IFileService _fileService;
        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult UploadFile(string fileAsBase64)
        {
            var byteArray = Convert.FromBase64String(fileAsBase64);
            if (_fileService.SaveFile(byteArray))
                return Ok();
            return BadRequest();
        }
    }
}
