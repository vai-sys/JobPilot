



import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, DollarSign, Clock, FileText, ExternalLink, Tag, Building2, User } from 'lucide-react';

import API from '../services/API'

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get('/job/');
        console.log(response.data.data);
        setJobs(response.data.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      wishlist:'bg-red-200/20 text-blue-400 border-blue-500/30',
      applied: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      interview: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      offer: 'bg-green-500/20 text-green-400 border-green-500/30',
      rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
      withdrawn: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[status] || colors.applied;
  };

  const getJobTypeColor = (type) => {
    const colors = {
      'Full-time': 'bg-purple-500/20 text-purple-400',
      'Part-time': 'bg-indigo-500/20 text-indigo-400',
      'Internship': 'bg-cyan-500/20 text-cyan-400',
      'Contract': 'bg-orange-500/20 text-orange-400'
    };
    return colors[type] || 'bg-gray-500/20 text-gray-400';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const parseTags = (tags) => {
    if (!tags || !Array.isArray(tags)) return [];
    
    return tags.flatMap(tag => {
      try {
        
        if (typeof tag === 'string' && tag.startsWith('[')) {
          return JSON.parse(tag);
        }
        return [tag];
      } catch {
        return [tag];
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Job Applications</h1>
          <p className="text-gray-400">Track and manage your job applications</p>
        </div>

        <div className="space-y-6">
          {jobs && jobs.map((job) => (
            <div
              key={job._id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-750 transition-all duration-200 hover:border-gray-600"
            >
            
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <h2 className="text-xl font-semibold text-white">
                      {job.role}
                    </h2>
                    <span className="text-gray-400">at</span>
                    <span className="text-blue-400 font-medium">{job.company}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {job.jobType}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
                    {job.jobType}
                  </span>
                </div>
              </div>

             
              <div className="flex flex-wrap gap-6 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Applied: {formatDate(job.appliedDate)}</span>
                </div>
                {job.deadline && (
                  <div className="flex items-center gap-2 text-orange-400">
                    <Clock className="w-4 h-4" />
                    <span>Deadline: {formatDate(job.deadline)}</span>
                  </div>
                )}
              </div>

              
              <div className="mb-4">
                <span className="text-gray-400 text-sm">Source: </span>
                <span className="text-white">
                  {job.applicationSource}
                  {job.applicationSource === "Other" && job.customSource && (
                    <span className="text-blue-400"> ({job.customSource})</span>
                  )}
                </span>
              </div>

              
              {job.notes && (
                <div className="mb-4 p-4 bg-gray-750 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-300">Notes</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{job.notes}</p>
                </div>
              )}

             
              {parseTags(job.tags).length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-300">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {parseTags(job.tags).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md border border-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            
              {(job.links?.jobDescription || job.links?.companyWebsite || job.links?.assignment || job.links?.other?.length > 0) && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-300">Links</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {job.links.jobDescription && (
                      <a
                        href={job.links.jobDescription}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                      >
                        📄 Job Description
                      </a>
                    )}
                    {job.links.assignment && (
                      <a
                        href={job.links.assignment}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-sm"
                      >
                        📝 Assignment
                      </a>
                    )}
                    {job.links.companyWebsite && (
                      <a
                        href={job.links.companyWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
                      >
                        🌐 Website
                      </a>
                    )}
                    {job.links.other?.map((link, idx) => (
                      <a
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors text-sm"
                      >
                        🔗 Link {idx + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}

           
              {job.resume?.url && (
                <div className="mb-4">
                  <a
                    href={job.resume.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors text-sm"
                  >
                    📎 Resume ({job.resume.filename})
                  </a>
                </div>
              )}

             
              <div className="pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-500">
                  Created: {new Date(job.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No jobs found</h3>
            <p className="text-gray-500">Start tracking your job applications by adding your first job.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Job;
