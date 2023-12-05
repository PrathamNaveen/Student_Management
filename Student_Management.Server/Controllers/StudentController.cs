using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/students")]
public class StudentController : ControllerBase
{
    private static List<Student> _students = new List<Student>
    {
        new Student { StudentId = 1, FirstName = "John", LastName = "Doe", DateOfBirth = DateTime.Parse("1990-01-01"), Gender = "Male", Email = "john.doe@example.com", PhoneNumber = "1234567890", CourseId = 1 },
        new Student { StudentId = 2, FirstName = "Jane", LastName = "Smith", DateOfBirth = DateTime.Parse("1995-05-15"), Gender = "Female", Email = "jane.smith@example.com", PhoneNumber = "9876543210", CourseId = 2 }
    };

    [HttpGet]
    public IActionResult GetStudents()
    {
        return Ok(_students);
    }

    [HttpGet("{id}")]
    public IActionResult GetStudentById(int id)
    {
        var student = _students.FirstOrDefault(s => s.StudentId == id);

        if (student == null)
        {
            return NotFound();
        }

        return Ok(student);
    }

    [HttpPost]
    public IActionResult CreateStudent([FromBody] Student student)
    {
        student.StudentId = _students.Count + 1;
        _students.Add(student);

        return CreatedAtAction(nameof(GetStudentById), new { id = student.StudentId }, student);
    }
}
