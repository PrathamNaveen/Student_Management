// Student.cs
public class Student
{
    public int StudentId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public int CourseId { get; set; } // Foreign key

    // Navigation property
    public Course Course { get; set; }
}
