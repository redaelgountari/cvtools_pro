"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  github: string;
  portfolio: string;
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
}

interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  relevantCourses: string[];
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

interface Publication {
  title: string;
  publicationType: string;
  year: string;
  link: string;
}

interface Award {
  name: string;
  year: string;
  description: string;
}

interface VolunteerExperience {
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  technologiesUsed: string[];
  github: string;
  role: string;
}

interface OnlinePresence {
  twitter: string;
  stackOverflow: string;
  medium: string;
}

interface Resume {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  skills: Skills;
  tools: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  publications: Publication[];
  awards: Award[];
  volunteerExperience: VolunteerExperience[];
  projects: Project[];
  onlinePresence: OnlinePresence;
  hobbies: string[];
}

// Create Document Component
export default function Theme1({ userdata }: { userdata: Resume }) {

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#e4e4e4',
    },
    leftColumn: {
      width: '35%',
      backgroundColor: '#546e7a',
      color: 'white',
      padding: 10,
    },
    rightColumn: {
      width: '65%',
      padding: 10,
    },
    header: {
      marginBottom: 10,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    title: {
      fontSize: 14,
      marginBottom: 10,
      borderBottom: '1px solid #000',
      paddingBottom: 5,
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    leftSectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
      color: 'white',
    },
    contactItem: {
      flexDirection: 'row',
      marginBottom: 5,
      fontSize: 10,
    },
    jobTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 3,
    },
    company: {
      fontSize: 10,
      marginBottom: 3,
    },
    date: {
      fontSize: 10,
      marginBottom: 5,
    },
    bulletList: {
      marginLeft: 10,
    },
    bullet: {
      fontSize: 10,
      marginBottom: 3,
    },
    profileText: {
      fontSize: 10,
      marginBottom: 10,
    },
    skillItem: {
      fontSize: 10,
      marginBottom: 3,
    },
    languageBar: {
      height: 8,
      backgroundColor: '#ddd',
      marginBottom: 5,
      width: '100%',
    },
    languageFill: {
      height: 8,
      backgroundColor: '#fff',
    },
    languageItem: {
      marginBottom: 5,
      fontSize: 10,
    },
    divider: {
      borderBottom: '1px solid #ddd',
      marginVertical: 10,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
      alignSelf: 'center',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Profile Image */}
          <Image
            style={styles.image}
            src={`profile.jpg`}
          />
          
          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.leftSectionTitle}>COORDONNÉES</Text>
            <View style={styles.contactItem}>
              <Text>{userdata.personalInfo.location}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>{userdata.personalInfo.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>{userdata.personalInfo.email}</Text>
            </View>
            {userdata.personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Text>{userdata.personalInfo.linkedin}</Text>
              </View>
            )}
            {userdata.personalInfo.website && (
              <View style={styles.contactItem}>
                <Text>{userdata.personalInfo.website}</Text>
              </View>
            )}
            {userdata.personalInfo.github && (
              <View style={styles.contactItem}>
                <Text>{userdata.personalInfo.github}</Text>
              </View>
            )}
            {userdata.personalInfo.portfolio && (
              <View style={styles.contactItem}>
                <Text>{userdata.personalInfo.portfolio}</Text>
              </View>
            )}
          </View>
          
          {/* Skills */}
          <View style={styles.section}>
            <Text style={styles.leftSectionTitle}>COMPÉTENCES</Text>
            {userdata.skills.technical.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>• {skill}</Text>
            ))}
            {userdata.skills.soft.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>• {skill}</Text>
            ))}
          </View>
          
          {/* Tools */}
          <View style={styles.section}>
            <Text style={styles.leftSectionTitle}>OUTILS</Text>
            {userdata.tools.map((tool, index) => (
              <Text key={index} style={styles.skillItem}>• {tool}</Text>
            ))}
          </View>
          
          {/* Languages */}
          <View style={styles.section}>
            <Text style={styles.leftSectionTitle}>LANGUES</Text>
            
            {userdata.skills?.languages?.map((language, index) => {
            if (!language || typeof language !== "string") return null;
            
            const [lang, level = ""] = language.split(':').map(item => item.trim());
            let width = '50%';
            
            if (level.toLowerCase().includes('native') || level.toLowerCase().includes('fluent')) {
              width = '100%';
            } else if (level.toLowerCase().includes('advanced')) {
              width = '75%';
            } else if (level.toLowerCase().includes('intermediate')) {
              width = '50%';
            } else {
              width = '40%';
            }

            return (
              <React.Fragment key={index}>
                <Text style={styles.languageItem}>{lang}</Text>
                <View style={styles.languageBar}>
                  <View style={[styles.languageFill, { width }]} />
                </View>
                <Text style={styles.languageItem}>{level}</Text>
              </React.Fragment>
            );
          })}

          </View>
          
          {/* Certifications as Interests section */}
          {userdata.certifications && userdata.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.leftSectionTitle}>CENTRES D'INTÉRÊT</Text>
              {userdata.certifications.map((cert, index) => (
                <Text key={index} style={styles.skillItem}>• {cert.name}</Text>
              ))}
            </View>
          )}
        </View>
        
        {/* Right Column */}
        <View style={styles.rightColumn}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{userdata.personalInfo.fullName}</Text>
            <Text style={styles.title}>{userdata.experience.length > 0 ? userdata.experience[0].title : "Étudiant(e)"}</Text>
          </View>
          
          {/* Profile */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFIL PROFESSIONNEL</Text>
            <Text style={styles.profileText}>
              {userdata.professionalSummary}
            </Text>
          </View>
          
          {/* Professional Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PARCOURS PROFESSIONNEL</Text>
            
            {userdata.experience.map((exp, index) => (
              <React.Fragment key={index}>
                <Text style={styles.jobTitle}>{exp.title}</Text>
                <Text style={styles.company}>{exp.company} - {exp.location}</Text>
                <Text style={styles.date}>{exp.startDate} - {exp.endDate}</Text>
                <View style={styles.bulletList}>
                  {exp.responsibilities.map((resp, respIndex) => (
                    <Text key={respIndex} style={styles.bullet}>• {resp}</Text>
                  ))}
                </View>
                
                {index < userdata.experience.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>
          
          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>FORMATION</Text>
            
            {userdata.education.map((edu, index) => (
              <React.Fragment key={index}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.company}>{edu.institution} - {edu.location}</Text>
                <Text style={styles.date}>{edu.graduationYear}</Text>
                
                {index < userdata.education.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>

          {/* Certifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            
            {userdata.certifications.map((cert, index) => (
              <React.Fragment key={index}>
                <Text style={styles.jobTitle}>{cert.name}</Text>
                <Text style={styles.company}>{cert.issuer}</Text>
                <Text style={styles.date}>{cert.year}</Text>
                
                {index < userdata.certifications.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>

          {/* Publications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PUBLICATIONS</Text>
            
            {userdata.publications.map((pub, index) => (
              <React.Fragment key={index}>
                <Text style={styles.jobTitle}>{pub.title}</Text>
                <Text style={styles.company}>{pub.publicationType}</Text>
                <Text style={styles.date}>{pub.year}</Text>
                <Text style={styles.company}>{pub.link}</Text>
                
                {index < userdata.publications.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>

          {/* Awards */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PRIX ET DISTINCTIONS</Text>
            
            {userdata.awards.map((award, index) => (
              <React.Fragment key={index}>
                <Text style={styles.jobTitle}>{award.name}</Text>
                <Text style={styles.date}>{award.year}</Text>
                <Text style={styles.company}>{award.description}</Text>
                
                {index < userdata.awards.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>

          {/* Volunteer Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPÉRIENCE BÉNÉVOLE</Text>
            
            {userdata.volunteerExperience.map((volunteer, index) => (
              <React.Fragment key={index}>
                <Text style={styles.jobTitle}>{volunteer.role}</Text>
                <Text style={styles.company}>{volunteer.organization}</Text>
                <Text style={styles.date}>{volunteer.startDate} - {volunteer.endDate}</Text>
                <Text style={styles.company}>{volunteer.description}</Text>
                
                {index < userdata.volunteerExperience.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>

          {/* Projects */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROJETS</Text>
            
            {userdata.projects.map((project, index) => (
              <React.Fragment key={index}>
                <Text style={styles.jobTitle}>{project.title}</Text>
                <Text style={styles.company}>{project.description}</Text>
                <Text style={styles.date}>{project.technologiesUsed.join(', ')}</Text>
                <Text style={styles.company}>{project.github}</Text>
                <Text style={styles.company}>{project.role}</Text>
                
                {index < userdata.projects.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>

          {/* Online Presence */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PRÉSENCE EN LIGNE</Text>
            
            {userdata.onlinePresence.twitter && (
              <Text style={styles.company}>Twitter: {userdata.onlinePresence.twitter}</Text>
            )}
            {userdata.onlinePresence.stackOverflow && (
              <Text style={styles.company}>Stack Overflow: {userdata.onlinePresence.stackOverflow}</Text>
            )}
            {userdata.onlinePresence.medium && (
              <Text style={styles.company}>Medium: {userdata.onlinePresence.medium}</Text>
            )}
          </View>

          {/* Hobbies */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>LOISIRS</Text>
            
            {userdata.hobbies.map((hobby, index) => (
              <Text key={index} style={styles.skillItem}>• {hobby}</Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}