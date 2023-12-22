using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student_Management.DatabaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/courses")]
public class CourseController : ControllerBase
{
    private readonly ApplicationContext _context;

    public CourseController(ApplicationContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetCourses()
    {
        try
        {
            var courses = _context.Courses.ToList();
            return Ok(courses);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }
}
