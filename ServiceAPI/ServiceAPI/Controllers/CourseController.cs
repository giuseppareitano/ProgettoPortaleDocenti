using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ServiceAPI.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ServiceAPI
{
    [Route("api")] //base URI prefix
    public class CourseController : Controller
    {
        static readonly object setupLock = new object();
        static readonly SemaphoreSlim parallelism = new SemaphoreSlim(2);

        IMongoCollection<Course> collection;

        public CourseController() {
            collection = Database.GetInstance().GetCourses();
        }

        /*This method returns all courses of the collection*/
        [HttpGet("courses")]
        public async Task<IActionResult> GetCourses()
        {
            try
            {
                await parallelism.WaitAsync();
                return Ok(collection.AsQueryable().Where(c => true));
            }
            finally
            {
                parallelism.Release();
            }
        }

        /*This method returns the course document with a specific ObjectId*/
        [HttpGet("course")]
        public async Task<IActionResult> GetCourse([FromQuery]string Id)
        {
            try
            {
                await parallelism.WaitAsync();
                var course = await collection.FindAsync(c => c.Id == Id);
                if (course == null)
                    return NotFound();
                return Ok(course.First());
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

        /*This method returns all courses of a specific teacher*/
        [HttpGet("login/courses")]
        public async Task<IActionResult> GetLoginCourses([FromQuery]string Teacher) //Teacher = Teacher.Name + " " + Teacher.Surname 
        {
            try
            {
                await parallelism.WaitAsync();
                var courses = collection.AsQueryable().Where(c => c.Teacher == Teacher);
                if (courses == null)
                    return NotFound();
                return Ok(courses);
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

        /*This method returns all courses whose identifier is contained in the array.*/
        [HttpGet("studentcourses")]
        public async Task<IActionResult> GetStudentCourses([FromQuery]string[] IdList)
        {
            try
            {
                await parallelism.WaitAsync();
                var courses = await collection.FindAsync(c => IdList.Contains(c.Id));
                return Ok(courses.ToList());
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return NotFound();
            }
            finally
            {
                parallelism.Release();
            }
        }

        /*This method adds a course to the collection*/
        [HttpPut("courses")]
        public async Task<IActionResult> CreateCourse([FromBody]Course course)
        {
            try
            {
                if (course.Tests == null)
                    course.Tests = new List<Test>();

                var tests = course.Tests.Where(t => t.BookedStudents == null).ToList();
                foreach (Test t in tests)
                {
                    t.BookedStudents = new List<string>();
                }

                if(course.EnrolledStudents == null)
                    course.EnrolledStudents = new List<string>();

                await parallelism.WaitAsync();
                await collection.InsertOneAsync(course);
                return Ok();
            }
            finally
            {
                parallelism.Release();
            }
        }

        /*This method allows to modify details about a course*/
        [HttpPost("courses")]
        public async Task<IActionResult> UpdateCourse([FromBody]Course course)
        {
            try
            {

                if (course.Tests == null)
                    course.Tests = new List<Test>();

                var tests = course.Tests.Where(t => t.BookedStudents == null).ToList();
                foreach (Test t in tests)
                {
                    t.BookedStudents = new List<string>();
                }

                if (course.EnrolledStudents == null)
                    course.EnrolledStudents = new List<string>();

                await parallelism.WaitAsync();
                var current = await collection.FindOneAndReplaceAsync(c => c.Id == course.Id, course);
                if (current == null)
                    return NotFound();
                return Ok();
            }
            finally
            {
                parallelism.Release();
            }
        }

        /*This method finds and deletes the course with a specific identifier from the db collection*/
        [HttpDelete("course")]
        public async Task<IActionResult> DeleteCourse([FromQuery]string Id)
        {
            try
            {
                await parallelism.WaitAsync();
                var course = await collection.FindOneAndDeleteAsync(c => c.Id == Id);
                if (course == null)
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