export const defaultResumeData ={
  // 1. Personal Details Segment
  personal: {
    fullName: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (415) 555-0182',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarahchen',
    github: 'github.com/sarahchen',
    portfolio: 'sarahchen.dev',
    summary: 'Results-driven Software Engineer with 5+ years building scalable web applications using React, Node.js, and AWS. Proven track record of reducing system latency by 40% and leading cross-functional teams of 6+ engineers. Passionate about distributed systems and developer experience.'
  },

  // 2. Education Segment (Array of Objects kyunki multiple degrees ho sakti hain)
  education: [
    {
      id: 1,
      degree: 'B.S. Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '09/2018',
      endDate: '05/2022',
      gpa: '3.8 / 4.0',
      coursework: 'Data Structures, Algorithms, Distributed Systems · Dean\'s List 2021'
    }
  ],

  // 3. Work Experience Segment (Array of Objects for multiple jobs)
  experience: [
    {
      id: 1,
      jobTitle: 'Senior Software Engineer',
      company: 'Acme Technologies Inc.',
      location: 'San Francisco, CA (Remote)',
      startDate: '03/2022',
      endDate: '05/2024',
      isCurrent: false,
      bullets: [
        'Engineered a real-time notification system serving 200K+ users, reducing latency by 35%',
        'Led a team of 4 junior developers to rebuild the legacy checkout workflow using dynamic forms'
      ]
    }
  ],

  // 4. Skills Segment (Object categorized by technical domains)
  skills: {
    languages: 'JavaScript, TypeScript, Python, C++',
    frameworks: 'React, Node.js, Express.js, Vite, Tailwind CSS',
    tools: 'Git, GitHub, Figma, Render, Railway',
    databases: 'PostgreSQL, MongoDB, MySQL',
    cloudDevops: 'Docker, AWS, Aiven',
    softSkills: 'Problem Solving, Team Collaboration, Adaptability'
  },

  // 5. Projects Segment (Array of Objects for multiple projects)
  projects: [
    {
      id: 1,
      projectName: 'BillnChill',
      link: 'github.com/harshit/billnchill',
      techStack: 'React, Node.js, Express.js, PostgreSQL',
      description: 'Developed a comprehensive restaurant management and billing platform. Integrated drag-and-drop UI features and successfully deployed the web app utilizing Render and Aiven.'
    },
    {
      id: 2,
      projectName: 'Let It Out',
      link: 'letitout.app',
      techStack: 'React, Vite, Node.js, AI APIs',
      description: 'Built a safe emotional support and venting platform featuring an intuitive interface. Researched and implemented SEO indexing strategies to improve platform reach and user acquisition.'
    }
  ]
}