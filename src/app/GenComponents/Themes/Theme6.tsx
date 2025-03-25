"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';

// Register fonts for a more distinctive look
// Font.register({
//   family: 'Raleway',
//   fonts: [
//     { src: 'https://fonts.gstatic.com/s/raleway/v22/1Ptug8zYS_SKggPNyC0ISg.ttf', fontWeight: 'normal' },
//     { src: 'https://fonts.gstatic.com/s/raleway/v22/1Ptug8zYS_SKggPNyC0ISg.ttf', fontWeight: 'bold' },
//   ],
// });

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

// Create highly creative styles
const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  diagonalHeader: {
    height: 140,
    width: '100%',
    position: 'relative',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 30,
    paddingTop: 35,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 0,
  },
  leftColumn: {
    width: '32%',
    backgroundColor: '#F0F5FF',
    paddingTop: 40,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
    borderRight: '2px solid #2C5EBD',
  },
  rightColumn: {
    width: '68%',
    padding: 30,
    paddingTop: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2C5EBD',
    textTransform: 'uppercase',
    paddingBottom: 6,
    position: 'relative',
  },
  sectionTitleLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    width: '40%',
    backgroundColor: '#2C5EBD',
  },
  sectionTitleDot: {
    position: 'absolute',
    bottom: -2.5,
    left: '40%',
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#2C5EBD',
  },
  contactContainer: {
    marginBottom: 30,
  },
  contactItem: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    width: 14,
    marginRight: 8,
    height: 14,
    color: '#2C5EBD',
  },
  contactText: {
    fontSize: 10,
    color: '#333333',
  },
  section: {
    marginBottom: 25,
  },
  skillProgressContainer: {
    marginBottom: 8,
  },
  skillLabel: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 3,
  },
  skillProgressBar: {
    height: 4,
    backgroundColor: '#D9E2F8',
    borderRadius: 2,
  },
  skillProgressFill: {
    height: 4,
    backgroundColor: '#2C5EBD',
    borderRadius: 2,
  },
  bulletPoint: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 5,
    color: '#333333',
    lineHeight: 1.4,
  },
  experienceItem: {
    marginBottom: 20,
    position: 'relative',
    paddingLeft: 16,
  },
  timelineDot: {
    position: 'absolute',
    left: 0,
    top: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2C5EBD',
  },
  timelineLine: {
    position: 'absolute',
    left: 3.5,
    top: 13,
    bottom: -10,
    width: 1,
    backgroundColor: '#D9E2F8',
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2C5EBD',
    marginBottom: 2,
  },
  companyAndDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  company: {
    fontSize: 11,
    color: '#333333',
    fontWeight: 'bold',
  },
  dateRange: {
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
  },
  location: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 6,
  },
  bulletList: {
    marginTop: 4,
    marginLeft: 6,
  },
  bulletWrapper: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    color: '#2C5EBD',
    marginRight: 6,
    fontSize: 10,
    lineHeight: 1.4,
  },
  bulletText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.4,
    flex: 1,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333333',
    marginBottom: 10,
    textAlign: 'justify',
  },
  languageItem: {
    marginBottom: 8,
  },
  languageNameAndLevel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  languageName: {
    fontSize: 10,
    color: '#333333',
    fontWeight: 'bold',
  },
  languageLevel: {
    fontSize: 9,
    color: '#666666',
    fontStyle: 'italic',
  },
  languageBar: {
    height: 4,
    backgroundColor: '#D9E2F8',
    borderRadius: 2,
  },
  languageFill: {
    height: 4,
    backgroundColor: '#2C5EBD',
    borderRadius: 2,
  },
  educationItem: {
    marginBottom: 16,
    position: 'relative',
    paddingLeft: 16,
  },
  degree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C5EBD',
    marginBottom: 2,
  },
  eduDateAndInstitution: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  institution: {
    fontSize: 11,
    color: '#333333',
  },
  graduationYear: {
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
  },
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hobbyItem: {
    fontSize: 10,
    color: '#333333',
    backgroundColor: '#D9E2F8',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  certificationItem: {
    marginBottom: 8,
  },
  certificationName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  certificationDetails: {
    fontSize: 9,
    color: '#666666',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 15,
  },
  projectItem: {
    marginBottom: 16,
    position: 'relative',
    paddingLeft: 16,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C5EBD',
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 4,
    lineHeight: 1.4,
  },
  techBadgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  techBadge: {
    fontSize: 9,
    color: '#2C5EBD',
    backgroundColor: '#E8F0FF',
    borderRadius: 9,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 4,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#D9E2F8',
  },
  projectLink: {
    fontSize: 9,
    color: '#2C5EBD',
    marginTop: 2,
    textDecoration: 'underline',
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: '#D9E2F8',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#F8FAFF',
    marginBottom: 20,
  },
  summaryHeading: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2C5EBD',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333333',
  },
  headerInfo: {
    position: 'absolute',
    right: 30,
    top: 73,
    alignItems: 'flex-end',
  },
  headerInfoItem: {
    fontSize: 9,
    color: '#FFFFFF',
    marginBottom: 3,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginVertical: 6,
  },
});

// Helper function to filter out N/A values
const filterNA = (value: string | undefined): string => (value && value !== 'N/A' ? value : '');

// Helper to generate a random skill level for visual representation
const getRandomSkillLevel = (skill: string): number => {
  // Use a hash of the skill name for a consistent random number
  const hash = skill.split('').reduce((hash, char) => {
    return ((hash << 5) - hash) + char.charCodeAt(0);
  }, 0);
  
  // Generate a number between 60 and 100 for a good looking skill level
  return 60 + Math.abs(hash % 41);
};

// Helper to map languages to proficiency levels
const getLanguageLevel = (language: string): [string, number] => {
  if (language.includes('Anglais') || language.includes('English')) {
    return ['Avancé', 85];
  } else if (language.includes('Allemand') || language.includes('German')) {
    return ['Intermédiaire', 65];
  } else if (language.includes('Espagnol') || language.includes('Spanish')) {
    return ['Débutant', 40];
  } else if (language.includes('Français') || language.includes('French')) {
    return ['Natif', 100];
  } else {
    // Use a hash for consistent randomness
    const hash = language.split('').reduce((hash, char) => {
      return ((hash << 5) - hash) + char.charCodeAt(0);
    }, 0);
    const level = 40 + Math.abs(hash % 61);
    
    if (level > 90) return ['Natif', level];
    if (level > 75) return ['Avancé', level];
    if (level > 50) return ['Intermédiaire', level];
    return ['Débutant', level];
  }
};

// Create Document Component
export default function Theme6({ userdata }: { userdata: Resume }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Creative diagonal header */}
        <View style={styles.diagonalHeader}>
          <Svg style={styles.headerBackground} viewBox="0 0 595 140">
            <Path
              d="M0,0 L595,0 L595,90 Q450,140 300,105 Q150,70 0,120 L0,0 Z"
              fill="#2C5EBD"
            />
          </Svg>
          <View style={styles.headerContent}>
            <Text style={styles.name}>{filterNA(userdata.personalInfo.fullName)}</Text>
            {userdata.experience[0]?.title && (
              <Text style={styles.title}>{userdata.experience[0].title}</Text>
            )}
          </View>
          <View style={styles.headerInfo}>
            {filterNA(userdata.personalInfo.phone) && (
              <Text style={styles.headerInfoItem}>{userdata.personalInfo.phone}</Text>
            )}
            {filterNA(userdata.personalInfo.email) && (
              <Text style={styles.headerInfoItem}>{userdata.personalInfo.email}</Text>
            )}
            {filterNA(userdata.personalInfo.location) && (
              <Text style={styles.headerInfoItem}>{userdata.personalInfo.location}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.container}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Professional Summary */}
            {filterNA(userdata.professionalSummary) && (
              <View style={styles.section}>
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryHeading}>PROFIL</Text>
                  <Text style={styles.summaryText}>{userdata.professionalSummary}</Text>
                </View>
              </View>
            )}

            {/* Skills Section */}
            {(userdata.skills.technical.length > 0 || userdata.skills.soft.length > 0) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  COMPÉTENCES
                  <View style={styles.sectionTitleLine} />
                  <View style={styles.sectionTitleDot} />
                </Text>
                
                {userdata.skills.soft.length > 0 && (
                  <View>
                    {userdata.skills.soft.map((skill, index) => (
                      <View key={index} style={styles.skillProgressContainer}>
                        <Text style={styles.skillLabel}>{skill}</Text>
                        <View style={styles.skillProgressBar}>
                          <View style={[styles.skillProgressFill, { width: `${getRandomSkillLevel(skill)}%` }]} />
                        </View>
                      </View>
                    ))}
                  </View>
                )}
                
                {userdata.skills.technical.length > 0 && userdata.skills.soft.length > 0 && (
                  <View style={styles.horizontalLine} />
                )}
                
                {userdata.skills.technical.length > 0 && (
                  <View>
                    {userdata.skills.technical.map((skill, index) => (
                      <View key={index} style={styles.skillProgressContainer}>
                        <Text style={styles.skillLabel}>{skill}</Text>
                        <View style={styles.skillProgressBar}>
                          <View style={[styles.skillProgressFill, { width: `${getRandomSkillLevel(skill)}%` }]} />
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}

            {/* Languages */}
            {userdata.skills.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  LANGUES
                  <View style={styles.sectionTitleLine} />
                  <View style={styles.sectionTitleDot} />
                </Text>
                {userdata.skills.languages.map((language, index) => {
                  const [level, percentage] = getLanguageLevel(language);
                  return (
                    <View key={index} style={styles.languageItem}>
                      <View style={styles.languageNameAndLevel}>
                        <Text style={styles.languageName}>{language}</Text>
                        <Text style={styles.languageLevel}>{level}</Text>
                      </View>
                      <View style={styles.languageBar}>
                        <View style={[styles.languageFill, { width: `${percentage}%` }]} />
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {/* Hobbies */}
            {userdata.hobbies.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  CENTRES D'INTÉRET
                  <View style={styles.sectionTitleLine} />
                  <View style={styles.sectionTitleDot} />
                </Text>
                <View style={styles.hobbiesContainer}>
                  {userdata.hobbies.map((hobby, index) => (
                    <Text key={index} style={styles.hobbyItem}>{hobby}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Certifications */}
            {userdata.certifications && userdata.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  CERTIFICATIONS
                  <View style={styles.sectionTitleLine} />
                  <View style={styles.sectionTitleDot} />
                </Text>
                {userdata.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationItem}>
                    <Text style={styles.certificationName}>{filterNA(cert.name)}</Text>
                    <Text style={styles.certificationDetails}>
                      {filterNA(cert.issuer)}, {filterNA(cert.year)}
                      {cert.expiryDate && ` - ${cert.expiryDate}`}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Experience */}
            {userdata.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  EXPÉRIENCE PROFESSIONNELLE
                  <View style={styles.sectionTitleLine} />
                  <View style={styles.sectionTitleDot} />
                </Text>
                {userdata.experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.timelineDot} />
                    {index < userdata.experience.length - 1 && <View style={styles.timelineLine} />}
                    
                    <Text style={styles.jobTitle}>{filterNA(exp.title)}</Text>
                    <View style={styles.companyAndDate}>
                      <Text style={styles.company}>{filterNA(exp.company)}</Text>
                      <Text style={styles.dateRange}>
                        {filterNA(exp.startDate)} - {filterNA(exp.endDate)}
                      </Text>
                    </View>
                    <Text style={styles.location}>{filterNA(exp.location)}</Text>
                    
                    {exp.responsibilities.length > 0 && (
                      <View style={styles.bulletList}>
                        {exp.responsibilities.map((responsibility, idx) => (
                          <View key={idx} style={styles.bulletWrapper}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletText}>{responsibility}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <View style={styles.bulletList}>
                        {exp.achievements.map((achievement, idx) => (
                          <View key={idx} style={styles.bulletWrapper}>
                            <Text style={styles.bullet}>✓</Text>
                            <Text style={styles.bulletText}>{achievement}</Text>
                          </View>
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
                <Text style={styles.sectionTitle}>
                  FORMATION
                  <View style={styles.sectionTitleLine} />
                  <View style={styles.sectionTitleDot} />
                </Text>
                {userdata.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <View style={styles.timelineDot} />
                    {index < userdata.education.length - 1 && <View style={styles.timelineLine} />}
                    
                    <Text style={styles.degree}>{filterNA(edu.degree)}</Text>
                    <View style={styles.eduDateAndInstitution}>
                      <Text style={styles.institution}>
                        {filterNA(edu.institution)}
                      </Text>
                      <Text style={styles.graduationYear}>{filterNA(edu.graduationYear)}</Text>
                    </View>
                    <Text style={styles.location}>{filterNA(edu.location)}</Text>
                    
                    {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                      <View style={styles.bulletList}>
                        {edu.relevantCourses.map((course, idx) => (
                          <View key={idx} style={styles.bulletWrapper}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletText}>{course}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Projects (optional) */}
            {userdata.projects && userdata.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  PROJETS
                  <View style={styles.sectionTitleLine} />
                  <View style={styles.sectionTitleDot} />
                </Text>
                {userdata.projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <View style={styles.timelineDot} />
                    {index < userdata.projects.length - 1 && <View style={styles.timelineLine} />}
                    
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.projectDescription}>{project.description}</Text>
                    
                    {project.technologies.length > 0 && (
                      <View style={styles.techBadgesContainer}>
                        {project.technologies.map((tech, idx) => (
                          <Text key={idx} style={styles.techBadge}>{tech}</Text>
                        ))}
                      </View>
                    )}
                    
                    {project.link && (
                      <Text style={styles.projectLink}>{project.link}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}