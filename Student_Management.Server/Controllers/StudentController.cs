// StudentController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student_Management.DatabaseContext;
using System;

[ApiController]
[Route("api/students")]
public class StudentController : ControllerBase
{
    private readonly ApplicationContext _context;

    public StudentController(ApplicationContext context)
    {
        _context = context;
    }

    // GET: api/students
    [HttpGet]
    public IActionResult GetStudents()
    {
        try
        {
            var students = _context.Students.ToList();
            return Ok(students);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }

    // GET: api/students/1
    [HttpGet("{id}")]
    public IActionResult GetStudentById(int id)
    {
        try
        {
            var student = _context.Students.Find(id);

            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }

    // POST: api/students
    [HttpPost]
    public IActionResult CreateStudent([FromBody] Student student)
    {
        try
        {
            _context.Students.Add(student);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetStudentById), new { id = student.StudentId }, student);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }

    // DELETE: api/students/1
    [HttpDelete("{id}")]
    public IActionResult DeleteStudent(int id)
    {
        try
        {
            var student = _context.Students.Find(id);

            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            _context.SaveChanges();

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }

    // PUT: api/students/1
    [HttpPut("{id}")]
    public IActionResult UpdateStudent(int id, [FromBody] Student updatedStudent)
    {
        try
        {
            if (id != updatedStudent.StudentId)
            {
                return BadRequest();
            }

            _context.Entry(updatedStudent).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }
}
