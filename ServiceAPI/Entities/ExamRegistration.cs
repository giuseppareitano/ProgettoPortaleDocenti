using System;

namespace ServiceAPI.Entities
{
    public class ExamRegistration
    {
        public string Teaching { get; set; }
        public string Teacher { get; set; }
        public DateTime DateOfRegistration { get; set; }
        public string RequiredTopics { get; set; }
        public int Result { get; set; } //30 e lode = 31 
    }
}
