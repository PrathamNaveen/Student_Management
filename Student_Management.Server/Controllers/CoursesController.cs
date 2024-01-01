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


    public class Course1
    {
      public int courseId { get; set; }
        public string courseName { get; set; }
        public string courseCode { get; set; }
        public string courseDescription { get; set; }

       
}


    [HttpGet]
    public IActionResult GetCourses()
    {
        List<Course1> course1 = new List<Course1>();
        try
        {
            var courses = _context.Courses.ToList();
            if (courses.Count > 0)
            {
                foreach (var cor in courses)
                {
                    Course1 objcourse = new Course1();
                    objcourse.courseId = cor.CourseId;
                    objcourse.courseName = cor.CourseName;
                    objcourse.courseCode = cor.CourseCode;
                    objcourse.courseDescription = cor.CourseDescription;
                    course1.Add(objcourse);
                }

            }
            return Ok(course1);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }
}
