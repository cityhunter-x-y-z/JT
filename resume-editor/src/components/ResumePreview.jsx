import React from 'react';
import { MapPin, Mail, Phone, Linkedin, Globe } from 'lucide-react';

const ResumePreview = React.forwardRef(({ data }, ref) => {
  return (
    <div ref={ref} className="bg-white p-12 shadow-lg min-h-[297mm]" style={{ width: '210mm' }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-center mb-3">{data.header.name}</h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{data.header.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail size={14} />
            <span>{data.header.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone size={14} />
            <span>{data.header.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <Linkedin size={14} />
            <span>{data.header.linkedin}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe size={14} />
            <span>{data.header.website}</span>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-black pb-1 mb-4">EXPERIENCE</h2>
        {data.experience.map((job, index) => (
          <div key={job.id} className={index > 0 ? 'mt-5' : ''}>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <span className="text-sm font-semibold">{job.startDate} - {job.endDate}, {job.location}</span>
            </div>
            <p className="font-semibold mb-2">{job.company}</p>
            <ul className="space-y-1">
              {job.bullets.map((bullet, idx) => (
                <li key={idx} className="text-sm leading-relaxed">
                  <span className="inline-block mr-2">•</span>
                  <span dangerouslySetInnerHTML={{
                    __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-black pb-1 mb-4">EDUCATION</h2>
        <div>
          <h3 className="text-lg font-bold">{data.education.degree}</h3>
          <p className="text-sm mb-1">
            {data.education.institution} • {data.education.location} • {data.education.year}
          </p>
          <p className="text-sm">• {data.education.achievement}</p>
        </div>
      </div>

      {/* Skills Section */}
      <div>
        <h2 className="text-xl font-bold border-b-2 border-black pb-1 mb-4">SKILLS</h2>
        <p className="text-sm leading-relaxed">
          {data.skills.join(', ')}.
        </p>
      </div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
