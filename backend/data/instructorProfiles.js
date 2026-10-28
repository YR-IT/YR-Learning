const instructorProfiles = [
  {
    matches: ['data structures', 'dsa', 'java'],
    profile: {
      name: 'Gauri Singhal',
      role: 'DSA & Java Instructor',
      avatar: '/images/dsa_instructor.png',
      bio: 'Software Developer at YR IT Solutions, Celebal Technologies | DSE @ Infosys. Passionate about algorithms, interview problem solving, and mentoring students.',
      linkedin: 'https://www.linkedin.com/in/gaurisinghal28',
      social: { linkedin: 'https://www.linkedin.com/in/gaurisinghal28' },
      expertise: ['Java', 'Data Structures', 'Algorithms', 'Competitive Programming', 'System Design'],
    },
  },
  {
    matches: ['digital marketing', 'seo'],
    profile: {
      name: 'Divyaraj Kush',
      role: 'Digital Marketing Lead',
      avatar: '/seo_and_marketing_trainer.jpeg',
      bio: 'Digital Marketing and Growth Strategist specializing in search engine optimization, content scaling, and performance marketing.',
      linkedin: '#',
      social: { linkedin: '#' },
      expertise: ['Digital Marketing', 'SEO', 'Content Marketing', 'Google Ads', 'Social Media', 'Analytics'],
    },
  },
  {
    matches: ['ui/ux', 'ui ux', 'graphic designing', 'design'],
    profile: {
      name: 'Isha',
      role: 'UI/UX Design Specialist',
      avatar: '/images/trainer2.jpg',
      bio: 'Professional Designer at MAAC with 6+ years of experience in creating user-centric interfaces, visual design systems, and responsive mobile/web UI.',
      linkedin: 'https://LinkedIn.com/in/isha-uiux',
      social: { linkedin: 'https://LinkedIn.com/in/isha-uiux' },
      expertise: ['UI/UX', 'Design Systems', 'Wireframing', 'User Research'],
    },
  },
  {
    matches: ['data science'],
    profile: {
      name: 'Vinay Sheoran',
      role: 'Senior Data Science Trainer',
      avatar: '/images/trainer1.jpg',
      bio: 'Ex-Data Scientist at Flipkart & Publicis Re:Sources, with 8+ years of expertise in Machine Learning, Artificial Intelligence, and Big Data Analytics.',
      linkedin: 'https://www.linkedin.com/in/vinay-sheoran-262a79295/',
      social: { linkedin: 'https://www.linkedin.com/in/vinay-sheoran-262a79295/' },
      expertise: ['Python', 'SQL', 'PowerBI', 'Statistical Analysis'],
    },
  },
  {
    matches: ['web development', 'frontend', 'full stack'],
    profile: {
      name: 'Aditya Naulakha & Harshvardhan Gupta',
      role: 'Frontend & Backend Development Leads',
      avatar: '/frontend_trainer.jpeg',
      coAvatar: '/backend_trainer.jpeg',
      bio: 'Aditya Naulakha (Frontend Lead): Software developer passionate about AI, full-stack development, and SaaS products. Leadership experience as President of DROID Club and upcoming AI-Native Software Engineer at EPAM Systems. Harshvardhan Gupta (Backend Lead): Software developer passionate about backend development, cloud computing, and AI. Leadership experience as Vice President of DROID Club and upcoming Programmer Analyst Trainee at Cognizant.',
      linkedin: 'https://www.linkedin.com/in/aditya-naulakha',
      social: { linkedin: 'https://www.linkedin.com/in/aditya-naulakha' },
      expertise: ['Frontend (React.js)', 'Backend (Node.js)', 'Cloud Computing', 'AI Solutions', 'Express', 'MongoDB', 'SaaS Architecture'],
      instructors: [
        {
          name: 'Aditya Naulakha',
          role: 'Frontend Web Development Lead',
          avatar: '/frontend_trainer.jpeg',
          bio: 'Software developer passionate about AI, full-stack development, and SaaS products. Leadership experience as President of DROID Club and upcoming AI-Native Software Engineer at EPAM Systems.',
          expertise: ['Frontend', 'React.js', 'AI-Driven Solutions', 'SaaS Architecture'],
          linkedin: 'https://www.linkedin.com/in/aditya-naulakha',
        },
        {
          name: 'Harshvardhan Gupta',
          role: 'Backend Web Development Lead',
          avatar: '/backend_trainer.jpeg',
          bio: 'Software developer passionate about backend development, cloud computing, and AI. Leadership experience as Vice President of DROID Club and upcoming Programmer Analyst Trainee at Cognizant.',
          expertise: ['Backend', 'Cloud Computing', 'AI', 'Node.js', 'Express', 'System Design', 'MongoDB'],
          linkedin: 'https://www.linkedin.com/in/harshvardhan-gupta-19298b28b/',
        },
      ],
    },
  },
  {
    matches: ['cyber security', 'offensive security', 'security'],
    profile: {
      name: 'Gautam',
      role: 'Cyber Security Trainer',
      avatar: '/images/Trainer4.jpeg',
      bio: 'Cyber Security Engineer at YR IT SOLUTIONS and Cyber Security practitioner at TCS. Learn from industry expert and gain hands-on experience in Network Offensive Security, Penetration Testing, and Red Teaming.',
      linkedin: 'https://www.linkedin.com/company/yr-it-solutions/',
      social: { linkedin: 'https://www.linkedin.com/company/yr-it-solutions/' },
      expertise: ['Network Security', 'Penetration Testing', 'Ethical Hacking', 'Red Teaming', 'Active Directory Exploitation', 'Privilege Escalation'],
    },
  },
  {
    matches: ['machine learning'],
    profile: {
      name: 'Gauri Sharma',
      role: 'AIML Engineer',
      avatar: '/images/ml_instructor.jpeg',
      bio: 'Currently working at Opalina. Ex-CA with 1.5 years of corporate experience and 3+ years of mentoring and training more than 1,000 students across the globe.',
      linkedin: 'https://www.linkedin.com/in/gauri-sharma-gs06102003/',
      social: { linkedin: 'https://www.linkedin.com/in/gauri-sharma-gs06102003/' },
      expertise: ['AI & Machine Learning', 'Python', 'Deep Learning', 'Model Deployment'],
    },
  },
];

const getInstructorProfile = (course) => {
  const identifier = `${course.slug || ''} ${course.title || ''} ${course.category || ''}`.toLowerCase();
  return instructorProfiles.find(({ matches }) => matches.some((match) => identifier.includes(match)))?.profile;
};

module.exports = { getInstructorProfile };
