using System;

namespace ServiceAPI.Entities
{
    public class TestPrenotation
    {
        public string CourseName { get; set; }
        public string Teacher { get; set; } //Teacher = Name + " " + Surname
        public DateTime Date { get; set; }
        public string Classroom { get; set; }
    }
}
