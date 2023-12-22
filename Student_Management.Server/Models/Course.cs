// Course.cs
public class Course
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }
    public string CourseCode { get; set; }
    public string CourseDescription { get; set; }

    // Navigation property
    //public List<Student>? Student { get; set; }
}