using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using Web_Sign_In.Services;

namespace Web_Sign_In.Controllers
{
    public class FileController : Controller
    {
        private readonly IFileService _fileService;
        private readonly INotificationService _notificationService;
        public FileController(IFileService fileService, INotificationService notificationService)
        {
            _fileService = fileService;
            _notificationService = notificationService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult UploadFile(string fileAsBase64, string patientName)
        {
            var byteArray = Convert.FromBase64String(fileAsBase64);
            if (_fileService.SaveFile(byteArray))
            {
                var message = $"{patientName} has completed the sign in form.";
                _notificationService.SendMessage(message);
                return Ok();
            }
                
            return BadRequest();
        }
    }
}
