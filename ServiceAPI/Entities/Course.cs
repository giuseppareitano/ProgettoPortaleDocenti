using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace ServiceAPI.Dal
{
    public class Course
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string CourseName { get; set; }
        public int Hours { get; set; }
        public int Credits { get; set; }
        public string Teacher { get; set; } //Teacher= Name + " " + Surname 
        public IList<Test> Tests { get; set; }
        public IList<string> EnrolledStudents { get; set; } //list of student IDs useful to find all students enrolled to the course in db
    }
}