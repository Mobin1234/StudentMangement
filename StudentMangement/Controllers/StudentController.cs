using Microsoft.AspNetCore.Mvc;
using StudentMangement.Data;
using StudentMangement.Models;
using System.Diagnostics;

namespace StudentMangement.Controllers
{
    public class StudentController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public StudentController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetStudentList()
        {
            var students = _dbContext.Student.ToList();
            return new JsonResult(students);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SaveStudent([FromBody] Student student)
        {
            try
            {
                _dbContext.Student.Add(student);
                await _dbContext.SaveChangesAsync();
                return Ok(true); 
            }
            catch (Exception ex)
            {
                return Ok(false); 
            }

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
