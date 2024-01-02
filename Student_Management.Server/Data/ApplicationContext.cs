// ApplicationContext.cs
using Microsoft.EntityFrameworkCore;

namespace Student_Management.DatabaseContext
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<School> Schools { get; set; }
    }
}
