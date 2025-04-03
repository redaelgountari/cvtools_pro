"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet ,Font} from '@react-pdf/renderer';

// Register custom fonts for a professional look
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsgH1x4gaVc.ttf', fontWeight: 'semibold' },
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsin9M4gaVc.ttf', fontStyle: 'italic' },
  ],
});

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website?: string;
}

interface Skills {
  technical: string[];
  soft: string[];
  languages: string[];
}

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  achievements?: string[];
}

interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  relevantCourses: string[];
  gpa?: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
  expiryDate?: string;
}

interface Resume {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  skills: Skills;
  tools: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  publications: [];
  awards: [];
  volunteerExperience: [];
  projects?: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  onlinePresence: [];
  hobbies: string[];
}

// Create styles for Canadian resume
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Open Sans',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2px solid #2D3748',
    paddingBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#4A5568',
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 3,
    marginBottom: 8,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#4A5568',
    marginBottom: 10,
    textAlign: 'justify',
  },
  skillsContainer: {
    flexDirection: 'column',
    marginBottom: 5,
  },
  skillCategory: {
    fontSize: 11,
    fontWeight: 'semibold',
    marginBottom: 3,
    color: '#4A5568',
  },
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  skillItem: {
    fontSize: 10,
    color: '#4A5568',
    backgroundColor: '#F7FAFC',
    padding: '2 5',
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 5,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  toolsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  toolItem: {
    fontSize: 10,
    color: '#4A5568',
    marginRight: 10,
    marginBottom: 3,
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  jobPeriod: {
    fontSize: 10,
    color: '#718096',
  },
  company: {
    fontSize: 11,
    fontWeight: 'semibold',
    marginBottom: 4,
    color: '#4A5568',
  },
  bulletList: {
    marginLeft: 10,
  },
  bulletPoint: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 3,
    color: '#4A5568',
  },
  achievementText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#38A169',
    marginLeft: 10,
    marginBottom: 3,
  },
  educationItem: {
    marginBottom: 10,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  graduationYear: {
    fontSize: 10,
    color: '#718096',
  },
  institution: {
    fontSize: 10,
    marginBottom: 3,
    color: '#4A5568',
  },
  certificationItem: {
    marginBottom: 5,
  },
  certificationName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  certificationDetails: {
    fontSize: 10,
    color: '#4A5568',
  },
  projectItem: {
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  projectDescription: {
    fontSize: 10,
    marginTop: 2,
    marginBottom: 3,
    color: '#4A5568',
  },
  projectTech: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  projectTechItem: {
    fontSize: 9,
    color: '#4A5568',
    backgroundColor: '#F7FAFC',
    padding: 2,
    borderRadius: 3,
    marginRight: 3,
    marginBottom: 3,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  projectLink: {
    fontSize: 9,
    color: '#3182CE',
    textDecoration: 'underline',
  },
  languageSection: {
    marginBottom: 5,
  },
  languageItem: {
    fontSize: 10,
    marginBottom: 2,
    color: '#4A5568',
  },
});

// Helper function to filter out N/A values
const filterNA = (value: string | undefined): string => (value && value !== 'N/A' ? value : '');

// Create Document Component
export default function Theme5({ userdata, userImage }: { userdata: Resume; userImage: any }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header with Name and Contact Information */}
        <View style={styles.header}>
          <Text style={styles.name}>{filterNA(userdata.personalInfo.fullName)}</Text>
          <View style={styles.contactInfo}>
            {filterNA(userdata.personalInfo.location) && (
              <Text style={styles.contactItem}>{userdata.personalInfo.location}</Text>
            )}
            {filterNA(userdata.personalInfo.phone) && (
              <Text style={styles.contactItem}>{userdata.personalInfo.phone}</Text>
            )}
            {filterNA(userdata.personalInfo.email) && (
              <Text style={styles.contactItem}>{userdata.personalInfo.email}</Text>
            )}
            {filterNA(userdata.personalInfo.linkedin) && (
              <Text style={styles.contactItem}>{userdata.personalInfo.linkedin}</Text>
            )}
            {filterNA(userdata.personalInfo.website) && (
              <Text style={styles.contactItem}>{userdata.personalInfo.website}</Text>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {filterNA(userdata.professionalSummary) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{userdata.professionalSummary}</Text>
          </View>
        )}

        {/* Skills Section */}
        {(userdata.skills.technical.length > 0 || userdata.skills.soft.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            
            {userdata.skills.technical.length > 0 && (
              <View style={styles.skillsContainer}>
                <Text style={styles.skillCategory}>Technical Skills</Text>
                <View style={styles.skillRow}>
                  {userdata.skills.technical.map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}
            
            {userdata.skills.soft.length > 0 && (
              <View style={styles.skillsContainer}>
                <Text style={styles.skillCategory}>Transferable Skills</Text>
                <View style={styles.skillRow}>
                  {userdata.skills.soft.map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Tools Section */}
        {userdata.tools && userdata.tools.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tools & Technologies</Text>
            <View style={styles.toolsRow}>
              {userdata.tools.map((tool, index) => (
                <Text key={index} style={styles.toolItem}>• {tool}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {userdata.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {userdata.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{filterNA(exp.title)}</Text>
                  <Text style={styles.jobPeriod}>{filterNA(exp.startDate)} - {filterNA(exp.endDate)}</Text>
                </View>
                <Text style={styles.company}>{filterNA(exp.company)}, {filterNA(exp.location)}</Text>
                {exp.responsibilities.length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.responsibilities.map((responsibility, idx) => (
                      <Text key={idx} style={styles.bulletPoint}>• {responsibility}</Text>
                    ))}
                  </View>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.achievements.map((achievement, idx) => (
                      <Text key={idx} style={styles.achievementText}>✓ {achievement}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {userdata.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {userdata.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <Text style={styles.degree}>{filterNA(edu.degree)}</Text>
                  <Text style={styles.graduationYear}>{filterNA(edu.graduationYear)}</Text>
                </View>
                <Text style={styles.institution}>{filterNA(edu.institution)}, {filterNA(edu.location)}</Text>
                {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                  <View style={styles.bulletList}>
                    <Text style={styles.skillCategory}>Relevant Coursework:</Text>
                    {edu.relevantCourses.map((course, idx) => (
                      <Text key={idx} style={styles.bulletPoint}>• {course}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {userdata.certifications && userdata.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {userdata.certifications.map((cert, index) => (
              <View key={index} style={styles.certificationItem}>
                <Text style={styles.certificationName}>{filterNA(cert.name)}</Text>
                <Text style={styles.certificationDetails}>
                  {filterNA(cert.issuer)}, {filterNA(cert.year)}
                  {cert.expiryDate && ` (Valid until ${cert.expiryDate})`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {userdata.projects && userdata.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {userdata.projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
                <View style={styles.projectTech}>
                  {project.technologies.map((tech, idx) => (
                    <Text key={idx} style={styles.projectTechItem}>{tech}</Text>
                  ))}
                </View>
                {project.link && <Text style={styles.projectLink}>{project.link}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {userdata.skills.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {userdata.skills.languages.map((language, index) => (
              <Text key={index} style={styles.languageItem}>• {language}</Text>
            ))}
          </View>
        )}
        
        {/* Additional Interests/Hobbies (if appropriate) */}
        {userdata.hobbies && userdata.hobbies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Interests</Text>
            <View style={styles.skillRow}>
              {userdata.hobbies.map((hobby, index) => (
                <Text key={index} style={styles.skillItem}>{hobby}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}