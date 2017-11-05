using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ServiceAPI.Entities;
using System;
using System.Collections.Generic;

namespace ServiceAPI.Dal
{
    public class Student
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public IList<string> Courses { get; set; } //List of course IDs useful to find all courses to which student is enrolled in db
        public IList<TestPrenotation> Prenotations { get; set; } //List of Test Prenotations --> Exams to be faced by student
        public IList<ExamRegistration> Registrations { get; set; } //List of passed and recorded exams
    }
}
