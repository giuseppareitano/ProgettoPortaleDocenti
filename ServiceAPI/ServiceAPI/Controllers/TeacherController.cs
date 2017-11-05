using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ServiceAPI.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ServiceAPI.Controllers
{
    [Route("api")] //base URI prefix
    public class TeacherController : Controller
    {
        static readonly object setupLock = new object();
        static readonly SemaphoreSlim parallelism = new SemaphoreSlim(2);

        IMongoCollection<Teacher> collection;

        public TeacherController()
        {
            collection = Database.GetInstance().GetTeachers();
        }

        /*This method returns all teachers in the collection*/
        [HttpGet("teachers")]
        public async Task<IActionResult> GetTeachers()
        {
            try
            {
                await parallelism.WaitAsync();
                return Ok(collection.AsQueryable().Where(t => true));
            }
            finally
            {
                parallelism.Release();
            }
        }

        /*This class allows to handle teacher's data received from the authentication form of GUI*/
        public class Login{
            public string Email { get; set; }
            public string Password { get; set; }
        }

        /*This method authenticates the teacher if he or she is present in the database*/
        [HttpPost("loginteacher")]
        public async Task<IActionResult> GetTeacher([FromBody] Login data)
        {
            try
            {
                await parallelism.WaitAsync();
                var teacher = await collection.FindAsync(t => t.Email == data.Email && t.Password == data.Password);
                if (teacher == null)
                    return NotFound();
                return Ok(teacher.First());
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

        /*This method adds a teacher to the collection*/
        [HttpPut("teachers")]
        public async Task<IActionResult> CreateTeacher([FromBody]Teacher teacher)
        {
            try
            {
                await parallelism.WaitAsync();
                await collection.InsertOneAsync(teacher);
                return Ok();
            }
            finally
            {
                parallelism.Release();
            }
        }

        /*This method allows to modify details about a teacher*/
        [HttpPost("teachers")]
        public async Task<IActionResult> UpdateTeacher([FromBody]Teacher teacher)
        {
            try
            {
                await parallelism.WaitAsync();
                var current = await collection.FindOneAndReplaceAsync(t => t.Id == teacher.Id, teacher);
                if (current == null)
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

        /*This method finds and deletes the teacher with a specific identifier from the db collection*/
        [HttpDelete("teacher")]
        public async Task<IActionResult> DeleteTeacher([FromQuery]string Id)
        {
            try
            {
                await parallelism.WaitAsync();
                var teacher = await collection.FindOneAndDeleteAsync(t => t.Id == Id);
                if (teacher == null)
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
