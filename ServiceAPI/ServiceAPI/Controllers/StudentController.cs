using Microsoft.AspNetCore.Mvc;
using ServiceAPI.Dal;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Threading;
using MongoDB.Driver;
using ServiceAPI.Entities;

namespace ServiceAPI
{
    [Route("api")] //base URI prefix
    public class StudentController : Controller 
    {
        static readonly object setupLock = new object();
        static readonly SemaphoreSlim parallelism = new SemaphoreSlim(2);

        IMongoCollection<Student> collection;

        public StudentController() {
            collection = Database.GetInstance().GetStudents();
        }

        /*This method returns all student entities in the collection*/
        [HttpGet("students")]
        public async Task<IActionResult> GetStudents()
        {
            try
            {
                await parallelism.WaitAsync();
                return Ok(collection.AsQueryable().Where(s => true));
            }
            finally
            {
                parallelism.Release();
            }
        }

        /*This method returns the student document with a specific ObjectId*/
        [HttpGet("student")]
        public async Task<IActionResult> GetStudent([FromQuery]string Id)
        {
            try
            {
                await parallelism.WaitAsync();
                var student = await collection.FindAsync(s => s.Id == Id);
                if (student == null)
                    return NotFound();
                return Ok(student.First());
            }
            catch (FormatException e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
            finally
            {
                parallelism.Release();
            }
        }

        /*This method returns all students whose identifier is contained in the array.*/
        [HttpGet("coursestudents")]
        public async Task<IActionResult> GetStudentCourses([FromQuery]string[] IdList)
        {
            try
            {
                await parallelism.WaitAsync();
                var students = await collection.FindAsync(s => IdList.Contains(s.Id));
                return Ok(students.ToList());
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
            finally
            {
                parallelism.Release();
            }
        }

        /*This method adds a student to the collection*/
        [HttpPut("students")]
        public async Task<IActionResult> CreateStudent([FromBody]Student student)
        {
            try
            {
                if (student.Courses == null)
                    student.Courses = new List<string>();
                if (student.Registrations == null)
                    student.Registrations = new List<ExamRegistration>();
                if (student.Prenotations == null)
                    student.Prenotations = new List<TestPrenotation>();
                await parallelism.WaitAsync();
                await collection.InsertOneAsync(student);
                return Ok();
            }
            finally
            {
                parallelism.Release();
            }
        }

        /*This method allows to modify details about a student*/
        [HttpPost("students")]
        public async Task<IActionResult> UpdateStudent([FromBody]Student student)
        {
            try
            {
                if (student.Courses == null)
                    student.Courses = new List<string>();
                if (student.Registrations == null)
                    student.Registrations = new List<ExamRegistration>();
                if (student.Prenotations == null)
                    student.Prenotations = new List<TestPrenotation>();
                await parallelism.WaitAsync();
                var current = await collection.FindOneAndReplaceAsync(s => s.Id== student.Id,student);
                if (current == null)
                    return NotFound();
                return Ok();
            }
            catch(Exception e) {
                Console.WriteLine(e.Message);
                return NotFound();
            }
            finally
            {
                parallelism.Release();
            }
        }

        /*This method finds and deletes the student with a specific identifier from the db collection*/
        [HttpDelete("student")]
        public async Task<IActionResult> DeleteStudent([FromQuery]string Id)
        {
            try
            {
                await parallelism.WaitAsync();
                var student = await collection.FindOneAndDeleteAsync(s => s.Id == Id);
                if (student == null)
                    return NotFound();
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
            finally
            {
                parallelism.Release();
            }
        }
    }
}