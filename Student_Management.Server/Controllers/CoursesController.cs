using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/courses")]
public class CourseController : ControllerBase
{
    private static List<Course> _courses = new List<Course>
    {
        new Course { CourseId = 1, CourseName = "Computer Science", CourseCode = "CS101", CourseDescription = "Introduction to Computer Science" },
        new Course { CourseId = 2, CourseName = "Mathematics", CourseCode = "MA101", CourseDescription = "Introduction to Mathematics" }
    };

    [HttpGet]
    public IActionResult GetCourses()
    {
        return Ok(_courses);
    }
}
