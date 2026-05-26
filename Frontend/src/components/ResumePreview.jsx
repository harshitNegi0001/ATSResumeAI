
const ResumePreview = ({ resumeData }) => {
  if (!resumeData) return <div className="p-4 text-gray-500">No resume data provided.</div>;

  const {
    personal_information: personal,
    professional_summary: summary,
    education,
    work_experience: experience,
    projects,
    skills
  } = resumeData;

  const formatUrl = (url) => {
    if (!url) return '#';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  const profSummary = personal?.summary || personal?.professional_summary || summary;

  return (
    // Height ko min-h se h-[297mm] kar diya taaki wo strictly 1 page layout bane
    <div className="w-[210mm] h-[297mm] mx-auto bg-white shadow-2xl print:shadow-none overflow-hidden font-sans border-0 text-gray-900 box-border">

      {/* ================= HEADER SECTION (Reduced padding) ================= */}
      {personal && (
        <div
          className="bg-[#3b82f6] px-10 py-6 text-white flex flex-col gap-2" // py-10 se py-6, gap-3 se gap-2
          style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
        >
          {personal.full_name && (
            <h1 className="text-3xl font-bold tracking-tight"> {/* text-4xl se text-3xl */}
              {personal.full_name}
            </h1>
          )}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-blue-50">
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="hover:text-white transition-colors">
                {personal.email}
              </a>
            )}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-blue-100">
            {personal.linkedin && <a href={formatUrl(personal.linkedin)} target="_blank" rel="noreferrer">{personal.linkedin}</a>}
            {personal.github && <a href={formatUrl(personal.github)} target="_blank" rel="noreferrer">{personal.github}</a>}
            {personal.portfolio && <a href={formatUrl(personal.portfolio)} target="_blank" rel="noreferrer">{personal.portfolio}</a>}
          </div>
        </div>
      )}

      {/* ================= BODY SECTION (Compact Spacing) ================= */}
      <div className="px-10 py-5 space-y-4 bg-white"> {/* py-8 se py-5, space-y-7 se space-y-4 */}

        {/* Professional Summary */}
        {profSummary && (
          <section>
            <h2 className="text-[13px] font-bold text-[#3b82f6] uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 text-[13px] leading-snug">
              {profSummary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-[#3b82f6] uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">
              Work Experience
            </h2>
            <div className="space-y-3">
              {experience.map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-[14px]">{job.job_title}</h3>
                    {job.duration && <span className="text-[12px] text-gray-500 font-medium whitespace-nowrap ml-4">{job.duration}</span>}
                  </div>
                  {job.company && <p className="text-[13px] text-gray-700 font-semibold mb-1">{job.company}</p>}

                  {job.achievements && job.achievements.length > 0 && (
                    <ul className="list-disc list-outside ml-4 text-[13px] text-gray-700 space-y-0.5 marker:text-gray-400">
                      {job.achievements.map((achieve, i) => (
                        <li key={i} className="pl-1 leading-snug">{achieve}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-[#3b82f6] uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-[14px]">{edu.degree}</h3>
                    {edu.duration && <span className="text-[12px] text-gray-500 font-medium whitespace-nowrap ml-4">{edu.duration}</span>}
                  </div>
                  {edu.institution && <p className="text-[13px] text-gray-700 font-semibold">{edu.institution}</p>}
                  {edu.details && <p className="text-[12px] text-gray-600 mt-0.5">{edu.details}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-[#3b82f6] uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-[14px]">{proj.project_name}</h3>
                  </div>
                  {proj.tech_stack && (
                    <p className="text-[12px] text-gray-600 font-medium mb-1 italic">
                      Tech Stack: {proj.tech_stack}
                    </p>
                  )}
                  {proj.description && proj.description.length > 0 && (
                    <ul className="list-disc list-outside ml-4 text-[13px] text-gray-700 space-y-0.5 marker:text-gray-400">
                      {proj.description.map((desc, i) => (
                        <li key={i} className="pl-1 leading-snug">{desc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-[#3b82f6] uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">
              Technical Skills
            </h2>
            <p className="text-[13px] text-gray-700 leading-snug">
              {skills.join(', ')}
            </p>
          </section>
        )}

      </div>
    </div>
  );
};

export default ResumePreview;