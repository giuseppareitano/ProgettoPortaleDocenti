using System;
using System.Collections.Generic;

namespace ServiceAPI.Dal
{
   public class Test
    {
        public DateTime Date { get; set; }
        public string Classroom { get; set; }
        public string Description { get; set; }
        public IList<string> BookedStudents { get; set; } //List of student IDs useful to find all students booked to the test in db
    }
}
