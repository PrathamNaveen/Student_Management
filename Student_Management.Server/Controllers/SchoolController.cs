using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student_Management.DatabaseContext;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/schools")]
[ApiController]
public class SchoolController : ControllerBase
{
    private readonly ApplicationContext _context;

    public SchoolController(ApplicationContext context)
    {
        _context = context;
    }

    // GET: api/schools
    [HttpGet]
    public async Task<ActionResult<IEnumerable<School>>> GetSchools()
    {
        var schools = await _context.Schools.ToListAsync();
        return Ok(schools);
    }

    // POST: api/schools
    [HttpPost]
    public async Task<ActionResult<School>> PostSchool(School newSchool)
    {
        _context.Schools.Add(newSchool);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSchools), new { id = newSchool.SchoolId }, newSchool);
    }
}
