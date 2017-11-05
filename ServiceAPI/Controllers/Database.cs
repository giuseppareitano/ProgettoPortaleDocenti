using MongoDB.Driver;
using ServiceAPI.Dal;
using ServiceAPI.Entities;

namespace ServiceAPI
{
    public class Database
    {
        /*This class provides a single point of access to the database in MongoDb by using the structural design pattern Singleton*/

        private MongoClient client;
        private IMongoDatabase db;

        static Database instance;

        private Database() {
            client = new MongoClient("mongodb://127.0.0.1");
            db = client.GetDatabase("corso");
        }

        public static Database GetInstance(){
            if (instance == null)
                instance = new Database();
            return instance;
        }

        /*The following methods allow to access all db collections*/

        public IMongoCollection<Student> GetStudents() {
            return db.GetCollection<Student>("students");
        }

        public IMongoCollection<Course> GetCourses() {
            return db.GetCollection<Course>("courses");
        }

        public IMongoCollection<Teacher> GetTeachers() {
            return db.GetCollection<Teacher>("teachers");
        }
    }
}
