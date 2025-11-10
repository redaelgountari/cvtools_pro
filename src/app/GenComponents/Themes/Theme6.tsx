"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// ======= TYPES =======
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

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface Resume {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  skills: Skills;
  tools: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  publications: any[];
  awards: any[];
  volunteerExperience: any[];
  projects?: Project[];
  onlinePresence: any[];
  hobbies: string[];
}

// ======= THEME CONSTANTS =======
const COLORS = {
  primary: '#0F4C81',      // Deep blue
  secondary: '#1E88E5',    // Bright blue
  accent: '#2E7D32',       // Green accent
  text: '#37474F',         // Dark slate
  textLight: '#546E7A',    // Medium slate
  textLighter: '#90A4AE',  // Light slate
  divider: '#CFD8DC',      // Light blue-gray
  background: '#F5F8FA',   // Very light blue
  white: '#FFFFFF',
};

// ======= STYLES =======
const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Helvetica',
    backgroundColor: COLORS.white,
    fontSize: 9,
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    paddingTop: 32,
    paddingBottom: 22,
    paddingHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    alignItems: 'flex-start',
    backgroundColor: COLORS.background,
  },
  photoContainer: {
    width: 90,
    height: 90,
    marginRight: 22,
    borderRadius: 45,
    overflow: 'hidden',
    border: `2px solid ${COLORS.divider}`,
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  nameAndTitle: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary,
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    lineHeight: 1.1,
  },
  jobTitle: {
    fontSize: 11,
    color: COLORS.text,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontFamily: 'Helvetica',
  },
  contactInfo: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactIcon: {
    width: 11,
    marginRight: 7,
    fontSize: 7.5,
    color: COLORS.primary,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 9.5,
    color: COLORS.text,
  },
  
  // Layout
  mainContent: {
    flexDirection: 'row',
  },
  leftColumn: {
    width: '35%',
    paddingTop: 28,
    paddingLeft: 40,
    paddingRight: 22,
    paddingBottom: 35,
    backgroundColor: COLORS.background,
  },
  rightColumn: {
    width: '65%',
    paddingTop: 28,
    paddingLeft: 28,
    paddingRight: 40,
    paddingBottom: 35,
    backgroundColor: COLORS.white,
  },
  
  // Section styles
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 1.3,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  
  // Profile/Summary
  profileText: {
    fontSize: 9.5,
    lineHeight: 1.65,
    color: COLORS.text,
    textAlign: 'justify',
    fontFamily: 'Helvetica',
  },
  
  // Education styles
  educationItem: {
    marginBottom: 14,
  },
  degree: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary,
    marginBottom: 3,
    letterSpacing: 0.2,
    lineHeight: 1.3,
  },
  institution: {
    fontSize: 9.5,
    color: COLORS.text,
    marginBottom: 2,
    fontFamily: 'Helvetica',
    lineHeight: 1.3,
  },
  eduYear: {
    fontSize: 8,
    color: COLORS.textLight,
    fontFamily: 'Helvetica',
  },
  
  // Skills styles
  skillsList: {
    marginBottom: 12,
  },
  skillsSubtitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.secondary,
    marginBottom: 7,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  skillItem: {
    fontSize: 9.5,
    color: COLORS.text,
    marginBottom: 3.5,
    paddingLeft: 8,
    fontFamily: 'Helvetica',
    lineHeight: 1.3,
  },
  
  // Languages
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingLeft: 8,
    alignItems: 'center',
  },
  languageName: {
    fontSize: 9.5,
    color: COLORS.text,
    fontFamily: 'Helvetica-Bold',
  },
  languageLevel: {
    fontSize: 7.5,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  
  // Experience styles
  experienceItem: {
    marginBottom: 20,
  },
  expTitle: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary,
    marginBottom: 3,
    letterSpacing: 0.3,
    lineHeight: 1.2,
  },
  companyLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    alignItems: 'baseline',
  },
  companyName: {
    fontSize: 9.5,
    color: COLORS.text,
    fontStyle: 'italic',
    flex: 1,
  },
  dateRange: {
    fontSize: 9.5,
    color: COLORS.textLight,
    marginLeft: 10,
    fontFamily: 'Helvetica-Bold',
  },
  description: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: COLORS.text,
    textAlign: 'justify',
    fontFamily: 'Helvetica',
    marginTop: 6,
  },
  
  // Bullet list
  bulletList: {
    marginTop: 6,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 3.5,
  },
  bullet: {
    fontSize: 9.5,
    color: COLORS.primary,
    marginRight: 7,
    width: 6,
    fontFamily: 'Helvetica-Bold',
  },
  bulletText: {
    fontSize: 9.5,
    color: COLORS.text,
    lineHeight: 1.55,
    flex: 1,
    fontFamily: 'Helvetica',
  },
  
  // Expertise/Skills list
  expertiseList: {
    marginTop: 0,
  },
  expertiseItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  expertiseBullet: {
    fontSize: 9.5,
    marginRight: 7,
    color: COLORS.primary,
    width: 6,
    fontFamily: 'Helvetica-Bold',
  },
  expertiseText: {
    fontSize: 9.5,
    color: COLORS.text,
    lineHeight: 1.45,
    flex: 1,
  },
  
  // Certifications
  certificationItem: {
    marginBottom: 14,
  },
  certName: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary,
    marginBottom: 3,
    letterSpacing: 0.2,
    lineHeight: 1.3,
  },
  certIssuer: {
    fontSize: 9.5,
    color: COLORS.text,
    marginBottom: 2,
  },
  certYear: {
    fontSize: 8,
    color: COLORS.textLight,
  },
  
  // Projects
  projectTech: {
    fontSize: 8,
    color: COLORS.textLight,
    marginTop: 4,
    fontStyle: 'italic',
  },
});

// ======= UTILITY FUNCTIONS =======
const filterNA = (value: string | undefined): string => 
  (value && value !== 'N/A') ? value : '';

const getLanguageLevel = (language: string): string => {
  const normalizedLang = language.toLowerCase();
  
  if (normalizedLang.includes('français') || normalizedLang.includes('french')) {
    return 'Langue maternelle';
  } else if (normalizedLang.includes('anglais') || normalizedLang.includes('english')) {
    return 'Professionnel';
  } else if (normalizedLang.includes('espagnol') || normalizedLang.includes('spanish')) {
    return 'Débutant';
  } else if (normalizedLang.includes('allemand') || normalizedLang.includes('german')) {
    return 'Intermédiaire';
  } else if (normalizedLang.includes('arabe') || normalizedLang.includes('arabic')) {
    return 'Intermédiaire';
  } else {
    return 'Intermédiaire';
  }
};

// ======= COMPONENTS =======
const Header = ({ personalInfo, jobTitle, userImage }: { 
  personalInfo: PersonalInfo; 
  jobTitle?: string;
  userImage?: any;
}) => (
  <View style={styles.header}>
    <View style={styles.photoContainer}>
      {userImage && <Image style={styles.photo} src={userImage} />}
    </View>
    <View style={styles.nameAndTitle}>
      <Text style={styles.name}>{filterNA(personalInfo.fullName)}</Text>
      {jobTitle && <Text style={styles.jobTitle}>{jobTitle}</Text>}
    </View>
    <View style={styles.contactInfo}>
      {filterNA(personalInfo.email) && (
        <View style={styles.contactItem}>
          <Text style={styles.contactIcon}></Text>
          <Text style={styles.contactText}>{personalInfo.email}</Text>
        </View>
      )}
      {filterNA(personalInfo.phone) && (
        <View style={styles.contactItem}>
          <Text style={styles.contactIcon}></Text>
          <Text style={styles.contactText}>{personalInfo.phone}</Text>
        </View>
      )}
      {filterNA(personalInfo.website) && (
        <View style={styles.contactItem}>
          <Text style={styles.contactIcon}></Text>
          <Text style={styles.contactText}>{personalInfo.website}</Text>
        </View>
      )}
      {filterNA(personalInfo.location) && (
        <View style={styles.contactItem}>
          <Text style={styles.contactIcon}>📍</Text>
          <Text style={styles.contactText}>{personalInfo.location}</Text>
        </View>
      )}
    </View>
  </View>
);

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

// ======= MAIN COMPONENT =======
export default function ResumeTemplate({ 
  userdata, 
  userImage 
}: { 
  userdata: Resume; 
  userImage: any 
}) {
  const jobTitle = userdata.experience[0]?.title || '';
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header 
          personalInfo={userdata.personalInfo} 
          jobTitle={jobTitle}
          userImage={userdata.image[0]}
        />
        
        <View style={styles.mainContent}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Profile */}
            {filterNA(userdata.professionalSummary) && (
              <View style={styles.section}>
                <SectionTitle title="PROFIL" />
                <Text style={styles.profileText}>{userdata.professionalSummary}</Text>
              </View>
            )}

            {/* Languages - MOVED UP */}
            {userdata.skills.languages.length > 0 && (
              <View style={styles.section}>
                <SectionTitle title="LANGUES" />
                {userdata.skills.languages.map((lang, index) => (
                  <View key={`lang-${index}`} style={styles.languageItem}>
                    <Text style={styles.languageName}>{lang}</Text>
                    <Text style={styles.languageLevel}>{getLanguageLevel(lang)}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Education - MOVED DOWN */}
            

            {/* Certifications */}
            {userdata.certifications && userdata.certifications.length > 0 && (
              <View style={styles.section}>
                <SectionTitle title="CERTIFICATIONS" />
                {userdata.certifications.map((cert, index) => (
                  <View key={`cert-${index}`} style={styles.certificationItem}>
                    <Text style={styles.certName}>{filterNA(cert.name)}</Text>
                    <Text style={styles.certIssuer}>{filterNA(cert.issuer)}</Text>
                    <Text style={styles.certYear}>{filterNA(cert.year)}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {(userdata.tools.length > 0 || userdata.skills.technical.length > 0) && (
              <View style={styles.section}>
                <SectionTitle title="COMPÉTENCES" />
                
                {(userdata.tools.length > 0 || userdata.skills.technical.length > 0) && (
                  <View style={styles.skillsList}>
                    <Text style={styles.skillsSubtitle}>LOGICIELS MAÎTRISÉS</Text>
                    {[...userdata.tools, ...userdata.skills.technical].map((tool, index) => (
                      <Text key={`tool-${index}`} style={styles.skillItem}>{tool}</Text>
                    ))}
                  </View>
                )}
              </View>
            )}

            {/* Expertise */}
            {userdata.skills.soft.length > 0 && (
              <View style={styles.section}>
                <SectionTitle title="EXPERTISE" />
                <View style={styles.expertiseList}>
                  {userdata.skills.soft.map((skill, index) => (
                    <View key={`soft-${index}`} style={styles.expertiseItem}>
                      <Text style={styles.expertiseBullet}>•</Text>
                      <Text style={styles.expertiseText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Hobbies */}
            {userdata.hobbies.length > 0 && (
              <View style={styles.section}>
                <SectionTitle title="CENTRES D'INTÉRÊT" />
                <View style={styles.expertiseList}>
                  {userdata.hobbies.map((hobby, index) => (
                    <View key={`hobby-${index}`} style={styles.expertiseItem}>
                      <Text style={styles.expertiseBullet}>•</Text>
                      <Text style={styles.expertiseText}>{hobby}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Right Column */}
          
          <View style={styles.rightColumn}>
            {/* Experience */}
            {userdata.education.length > 0 && (
              <View style={styles.section}>
                <SectionTitle title="FORMATION" />
                {userdata.education.map((edu, index) => (
                  <View key={`edu-${index}`} style={styles.educationItem}>
                    <Text style={styles.degree}>{filterNA(edu.degree)}</Text>
                    <Text style={styles.institution}>{filterNA(edu.institution)}</Text>
                    <Text style={styles.eduYear}>{filterNA(edu.graduationYear)}</Text>
                  </View>
                ))}
              </View>
            )}
            {userdata.experience.length > 0 && (
              <View style={styles.section}>
                <SectionTitle title="EXPÉRIENCE PROFESSIONNELLE" />
                {userdata.experience.map((exp, index) => (
                  <View key={`exp-${index}`} style={styles.experienceItem}>
                    <Text style={styles.expTitle}>{filterNA(exp.title)}</Text>
                    <View style={styles.companyLine}>
                      <Text style={styles.companyName}>
                        {filterNA(exp.company)}{exp.location ? `, ${filterNA(exp.location)}` : ''}
                      </Text>
                      <Text style={styles.dateRange}>
                        {filterNA(exp.startDate)} - {filterNA(exp.endDate)}
                      </Text>
                    </View>
                    
                    {exp.responsibilities.length > 0 && (
                      <Text style={styles.description}>
                        {exp.responsibilities.join('. ')}
                      </Text>
                    )}
                    
                    {exp.achievements && exp.achievements.length > 0 && (
                      <View style={styles.bulletList}>
                        {exp.achievements.map((achievement, idx) => (
                          <View key={`achiev-${idx}`} style={styles.bulletItem}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletText}>{achievement}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {userdata.projects && userdata.projects.length > 0 && (
              <View style={styles.section}>
                <SectionTitle title="PROJETS NOTABLES" />
                {userdata.projects.map((project, index) => (
                  <View key={`proj-${index}`} style={styles.experienceItem}>
                    <Text style={styles.expTitle}>{project.title}</Text>
                    <Text style={styles.description}>{project.description}</Text>
                    {project.technologies.length > 0 && (
                      <Text style={styles.projectTech}>
                        Technologies: {project.technologies.join(', ')}
                      </Text>
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