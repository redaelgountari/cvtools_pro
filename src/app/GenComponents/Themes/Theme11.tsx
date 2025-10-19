"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register custom fonts
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsgH1x4gaVc.ttf', fontWeight: 'semibold' },
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsin9M4gaVc.ttf', fontStyle: 'italic' },
  ],
});

// Style Theme Definitions
const themes = {
  modern: {
    colors: {
      primary: '#2D3748',
      primaryLight: '#4A5568',
      secondary: '#4299E1',
      background: '#FFFFFF',
      sidebarBg: '#F7FAFC',
      text: '#2D3E50',
      textLight: '#718096',
      accent: '#38B2AC',
      border: '#E2E8F0',
      timelineDot: '#3182CE',
      timelineLine: '#CBD5E0'
    },
    layout: {
      sidebarWidth: '30%',
      mainWidth: '70%',
      hasSidebar: true,
      headerStyle: 'integrated'
    },
    typography: {
      nameSize: 24,
      titleSize: 12,
      headingSize: 16,
      bodySize: 10,
      smallSize: 9
    }
  },
  
  classic: {
    colors: {
      primary: '#1A1A1A',
      primaryLight: '#333333',
      secondary: '#666666',
      background: '#FFFFFF',
      sidebarBg: '#FFFFFF',
      text: '#333333',
      textLight: '#666666',
      accent: '#000000',
      border: '#CCCCCC',
      timelineDot: '#000000',
      timelineLine: '#CCCCCC'
    },
    layout: {
      sidebarWidth: '100%',
      mainWidth: '100%',
      hasSidebar: false,
      headerStyle: 'centered'
    },
    typography: {
      nameSize: 28,
      titleSize: 14,
      headingSize: 14,
      bodySize: 11,
      smallSize: 10
    }
  },
  
  creative: {
    colors: {
      primary: '#6B46C1',
      primaryLight: '#8B5CF6',
      secondary: '#EC4899',
      background: '#FFFFFF',
      sidebarBg: '#F3E8FF',
      text: '#374151',
      textLight: '#6B7280',
      accent: '#F59E0B',
      border: '#E5E7EB',
      timelineDot: '#EC4899',
      timelineLine: '#E5E7EB'
    },
    layout: {
      sidebarWidth: '35%',
      mainWidth: '65%',
      hasSidebar: true,
      headerStyle: 'artistic'
    },
    typography: {
      nameSize: 26,
      titleSize: 13,
      headingSize: 15,
      bodySize: 10,
      smallSize: 9
    }
  },
  
  minimalist: {
    colors: {
      primary: '#000000',
      primaryLight: '#404040',
      secondary: '#808080',
      background: '#FFFFFF',
      sidebarBg: '#FAFAFA',
      text: '#000000',
      textLight: '#808080',
      accent: '#000000',
      border: '#E0E0E0',
      timelineDot: '#000000',
      timelineLine: '#E0E0E0'
    },
    layout: {
      sidebarWidth: '25%',
      mainWidth: '75%',
      hasSidebar: true,
      headerStyle: 'simple'
    },
    typography: {
      nameSize: 22,
      titleSize: 11,
      headingSize: 13,
      bodySize: 9,
      smallSize: 8
    }
  },
  
  corporate: {
    colors: {
      primary: '#1E3A8A',
      primaryLight: '#3B82F6',
      secondary: '#059669',
      background: '#FFFFFF',
      sidebarBg: '#F8FAFC',
      text: '#1F2937',
      textLight: '#6B7280',
      accent: '#DC2626',
      border: '#D1D5DB',
      timelineDot: '#1E3A8A',
      timelineLine: '#D1D5DB'
    },
    layout: {
      sidebarWidth: '28%',
      mainWidth: '72%',
      hasSidebar: true,
      headerStyle: 'professional'
    },
    typography: {
      nameSize: 25,
      titleSize: 12,
      headingSize: 15,
      bodySize: 10,
      smallSize: 9
    }
  }
};

const theme = {
  colors: {
    primary: '#1A1A1A',         // Dark background for header
    primaryLight: '#2D2D2D',    // Slightly lighter dark
    secondary: '#D4AF37',       // Gold accent color
    background: '#121212',      // Very dark background
    sidebarBg: '#1E1E1E',       // Dark sidebar
    text: '#E0E0E0',            // Light gray text
    textLight: '#A0A0A0',       // Lighter gray for secondary text
    accent: '#D4AF37',          // Gold accent
    border: '#333333',          // Dark border
    timelineDot: '#D4AF37',     // Gold timeline dots
    timelineLine: '#444444'     // Dark timeline line
  },
  layout: {
    sidebarWidth: '30%',
    mainWidth: '70%',
    hasSidebar: true,
    headerStyle: 'integrated'   // Header blends with content
  },
  typography: {
    nameSize: 26,              // Slightly larger name
    titleSize: 12,
    headingSize: 16,           // Bold section headings
    bodySize: 10,
    smallSize: 9
  }
};

const createStyles = (theme) => {
  const { colors, layout, typography } = {
    colors: {
    primary: '#2D3748',           // Dark gray for main content headings
    primaryLight: '#4A5568',      // Medium gray
    secondary: '#718096',         // Light gray
    background: '#FFFFFF',        // White main background
    sidebarBg: '#2D3748',         // 🔥 DARK sidebar background
    text: '#2D3748',              // Dark text for main content
    textLight: '#718096',         // Gray text for main content
    accent: '#2D3748',            // Dark accent for lines
    border: '#E2E8F0',           // Light border for main content
    timelineDot: '#2D3748',       // Dark timeline dots
    timelineLine: '#E2E8F0',      // Light timeline line
    // 🔥 NEW: Sidebar-specific colors
    sidebarText: '#FFFFFF',       // WHITE text for dark sidebar
    sidebarTextLight: '#CBD5E0',  // Light gray text for sidebar
    sidebarAccent: '#FFFFFF'      // White accents for sidebar
  },
  layout: {
    sidebarWidth: '35%',          // 🔥 Wider sidebar (35% like in image)
    mainWidth: '65%',             // 65% for main content
    hasSidebar: true,
    headerStyle: 'sidebar',       // 🔥 NEW: Header goes in sidebar
    profileInSidebar: true        // 🔥 Profile photo in sidebar
  },
  typography: {
    nameSize: 24,                 // Large name in sidebar
    titleSize: 12,                // Job title in sidebar
    headingSize: 16,              // Section headings
    bodySize: 10,                 // Body text
    smallSize: 9,                 // Small details
    sidebarNameSize: 28,          // 🔥 Special: Name size in sidebar
    sidebarTitleSize: 14          // 🔥 Special: Title size in sidebar
  }
};
  
  return StyleSheet.create({
    page: {
      flexDirection: layout.hasSidebar ? 'row' : 'column',
      backgroundColor: colors.background,
      fontFamily: 'Open Sans',
    },
    sidebar: {
      width: layout.sidebarWidth,
      backgroundColor: colors.sidebarBg,
      padding: layout.hasSidebar ? 15 : 0,
      borderRight: layout.hasSidebar ? `1px solid ${colors.border}` : 'none',
      paddingTop: layout.hasSidebar ? "140px" : 20,
      display: layout.hasSidebar ? 'flex' : 'none'
    },
    mainContent: {
      width: layout.mainWidth,
      paddingLeft: layout.hasSidebar ? -15 : 0,
      backgroundColor: colors.background,
    },
    contentPadding: {
      paddingLeft: layout.hasSidebar ? 15 : 20,
      marginLeft: layout.hasSidebar ? 5 : 0,
      marginTop: layout.hasSidebar ? -10 : 0,
      padding: layout.hasSidebar ? 5 : 20
    },
    header: {
      backgroundColor: layout.headerStyle === 'centered' ? colors.background : colors.primary,
      padding: 20,
      marginBottom: 20,
      flexDirection: layout.headerStyle === 'centered' ? 'column' : 'row',
      alignItems: 'center',
      width: layout.hasSidebar ? "152%" : "100%",
      marginLeft: layout.hasSidebar ? "-43%" : "0%",
      borderBottom: layout.headerStyle === 'centered' ? `2px solid ${colors.accent}` : 'none'
    },
    textContainer: {
      marginLeft: layout.headerStyle === 'centered' ? 0 : 35,
      justifyContent: 'center',
      alignItems: layout.headerStyle === 'centered' ? 'center' : 'flex-start',
      marginTop: layout.headerStyle === 'centered' ? 10 : 0
    },
    profileImageContainer: {
      width: 80,
      height: 80,
      borderRadius: layout.headerStyle === 'artistic' ? 20 : 60,
      backgroundColor: colors.background,
      overflow: 'hidden',
      borderWidth: layout.headerStyle === 'simple' ? 1 : 4,
      borderColor: layout.headerStyle === 'centered' ? colors.accent : colors.background,
      boxShadow: layout.headerStyle === 'simple' ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: layout.headerStyle === 'minimalist' ? 'none' : 'flex'
    },
    profileImage: {
      width: '100%',
      height: '100%',
      borderRadius: layout.headerStyle === 'artistic' ? 20 : 60,
    },
    name: {
      fontSize: typography.nameSize,
      fontWeight: 'bold',
      color: layout.headerStyle === 'centered' ? colors.primary : colors.background,
      textAlign: 'center',
      textTransform: layout.headerStyle === 'corporate' ? 'uppercase' : 'none',
      letterSpacing: layout.headerStyle === 'minimalist' ? 2 : 1,
      marginBottom: 3,
    },
    title: {
      fontSize: typography.titleSize,
      color: layout.headerStyle === 'centered' ? colors.textLight : colors.background,
      textAlign: 'center',
      letterSpacing: 0.5,
      opacity: 0.9,
      fontStyle: layout.headerStyle === 'creative' ? 'italic' : 'normal'
    },
    contactHeading: {
      fontSize: typography.headingSize - 1,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors.primary,
      borderBottomWidth: layout.headerStyle === 'minimalist' ? 1 : 2,
      borderBottomColor: colors.accent,
      paddingBottom: 3,
      textTransform: layout.headerStyle === 'corporate' ? 'uppercase' : 'capitalize',
      letterSpacing: layout.headerStyle === 'minimalist' ? 2 : 1,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    contactText: {
      fontSize: typography.smallSize + 2,
      color: colors.text,
    },
    sidebarSection: {
      marginBottom: 15,
    },
    skillsList: {
      marginLeft: 5,
    },
    skillItem: {
      fontSize: typography.smallSize + 2,
      marginBottom: 5,
      display: 'flex',
      flexDirection: 'row',
    },
    bullet: {
      marginRight: 5,
      color: colors.accent,
      fontWeight: layout.headerStyle === 'creative' ? 'bold' : 'normal'
    },
    sectionHeading: {
      fontSize: typography.headingSize,
      fontWeight: 'bold',
      marginBottom: 15,
      color: colors.primary,
      textTransform: layout.headerStyle === 'corporate' ? 'uppercase' : 'capitalize',
      borderBottomWidth: layout.headerStyle === 'minimalist' ? 1 : 2,
      borderBottomColor: colors.accent,
      paddingBottom: 5,
      letterSpacing: layout.headerStyle === 'minimalist' ? 2 : 1,
    },
    mainSection: {
      marginBottom: 15,
    },
    timelineContainer: {
      position: 'relative',
      marginLeft: layout.headerStyle === 'centered' ? 0 : 15,
    },
    timelineItem: {
      marginBottom: 15,
      paddingLeft: layout.headerStyle === 'centered' ? 0 : 20,
      position: 'relative',
      borderLeft: layout.headerStyle === 'centered' ? `2px solid ${colors.border}` : 'none',
      paddingLeft: layout.headerStyle === 'centered' ? 15 : 20
    },
    timelineDot: {
      position: 'absolute',
      left: layout.headerStyle === 'centered' ? -6 : 0,
      top: 5,
      width: layout.headerStyle === 'creative' ? 12 : 10,
      height: layout.headerStyle === 'creative' ? 12 : 10,
      backgroundColor: colors.timelineDot,
      borderRadius: layout.headerStyle === 'minimalist' ? 0 : 5,
      display: layout.headerStyle === 'centered' ? 'flex' : (layout.hasSidebar ? 'flex' : 'none')
    },
    timelineLine: {
      position: 'absolute',
      left: layout.headerStyle === 'centered' ? -1 : 5,
      top: 15,
      width: 2,
      bottom: -15,
      backgroundColor: colors.timelineLine,
      display: layout.headerStyle === 'centered' ? 'none' : 'flex'
    },
    jobTitle: {
      fontSize: typography.bodySize + 1,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 2,
    },
    jobCompany: {
      fontSize: typography.bodySize,
      marginBottom: 4,
      color: colors.textLight,
      fontStyle: layout.headerStyle === 'creative' ? 'italic' : 'normal'
    },
    jobPeriod: {
      fontSize: typography.smallSize,
      color: colors.textLight,
      position: layout.headerStyle === 'centered' ? 'relative' : 'absolute',
      right: layout.headerStyle === 'centered' ? 'auto' : 0,
      top: layout.headerStyle === 'centered' ? 0 : 4,
      backgroundColor: layout.headerStyle === 'centered' ? 'transparent' : colors.sidebarBg,
      padding: layout.headerStyle === 'centered' ? 0 : '2 4',
      borderRadius: layout.headerStyle === 'centered' ? 0 : 3,
      marginBottom: layout.headerStyle === 'centered' ? 4 : 0
    },
    bulletPoint: {
      fontSize: typography.smallSize,
      marginBottom: 3,
      lineHeight: 1.4,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    bulletPointText: {
      flex: 1,
      paddingRight: 5,
      fontSize: typography.smallSize + 1,
    },
    educationItem: {
      marginBottom: 15,
    },
    degree: {
      fontSize: typography.bodySize + 1,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 2,
      width: layout.hasSidebar ? 270 : '100%'
    },
    university: {
      fontSize: typography.bodySize,
      marginBottom: 3,
      color: colors.textLight,
    },
    profileText: {
      fontSize: typography.bodySize,
      lineHeight: 1.5,
      textAlign: 'justify',
      marginBottom: 8,
      color: colors.text,
    },
    reference: {
      marginBottom: 10,
      padding: 6,
      backgroundColor: colors.background,
      borderRadius: layout.headerStyle === 'minimalist' ? 0 : 4,
      borderLeftWidth: 3,
      borderLeftColor: colors.accent,
    },
    referenceName: {
      fontSize: typography.bodySize,
      fontWeight: 'bold',
      color: colors.primary,
    },
    referenceTitle: {
      fontSize: typography.smallSize,
      marginBottom: 4,
      color: colors.textLight,
      fontStyle: 'italic',
    },
    referenceContact: {
      fontSize: typography.smallSize - 1,
      color: colors.text,
    },
    languageItem: {
      fontSize: typography.smallSize,
      marginBottom: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    languageName: {
      flex: 1,
      color: colors.text,
    },
    languageLevel: {
      color: colors.textLight,
      fontStyle: 'italic',
      fontSize: typography.smallSize - 1,
    },
    projectTitle: {
      fontSize: typography.bodySize + 1,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 2,
    },
    projectDescription: {
      fontSize: typography.bodySize,
      color: colors.text,
      marginBottom: 4,
      lineHeight: 1.4,
    },
    projectTechTag: {
      fontSize: typography.smallSize - 2,
      backgroundColor: colors.accent,
      color: colors.background,
      padding: '2 4',
      borderRadius: layout.headerStyle === 'minimalist' ? 0 : 3,
      marginRight: 3,
      marginBottom: 3,
    },
    projectTechContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 4,
    },
    bulletList: {
      marginTop: 6,
    }
  });
};

// Helper functions
const filterNA = (value) => (value && value !== 'N/A' ? value : '');

const safeConcat = (arr1, arr2) => {
  const safeArr1 = Array.isArray(arr1) ? arr1 : [];
  const safeArr2 = Array.isArray(arr2) ? arr2 : [];
  return safeArr1.concat(safeArr2);
};

// Main Component
export default function AdaptiveResume({ userdata, userImage, themeName = 'modern' }) {
  // Get the selected theme
  const selectedTheme = themes[themeName] || themes.modern;
  const styles = createStyles(selectedTheme);

  // Ensure userdata structure is complete
  const safeUserData = {
    personalInfo: {
      fullName: userdata?.personalInfo?.fullName || '',
      title: userdata?.personalInfo?.title || '',
      phone: userdata?.personalInfo?.phone || '',
      email: userdata?.personalInfo?.email || '',
      location: userdata?.personalInfo?.location || '',
      website: userdata?.personalInfo?.website || ''
    },
    professionalSummary: userdata?.professionalSummary || '',
    skills: {
      technical: userdata?.skills?.technical || [],
      soft: userdata?.skills?.soft || [],
      languages: userdata?.skills?.languages || []
    },
    experience: userdata?.experience || [],
    education: userdata?.education || [],
    projects: userdata?.projects || [],
    certifications: userdata?.certifications || [],
    references: userdata?.references || []
  };

  const renderSidebar = () => (
    <View style={styles.sidebar}>
      {/* Contact Information */}
      <View style={styles.sidebarSection}>
        <Text style={styles.contactHeading}>Contact</Text>
        
        {filterNA(safeUserData.personalInfo.phone) && (
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>
              {safeUserData.personalInfo.phone}
            </Text>
          </View>
        )}
        
        {filterNA(safeUserData.personalInfo.email) && (
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>
              {safeUserData.personalInfo.email}
            </Text>
          </View>
        )}
        
        {filterNA(safeUserData.personalInfo.location) && (
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>
              {safeUserData.personalInfo.location}
            </Text>
          </View>
        )}
        
        {filterNA(safeUserData.personalInfo.website) && (
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>
              {safeUserData.personalInfo.website}
            </Text>
          </View>
        )}
      </View>

      {/* Skills Section */}
      {(safeUserData.skills.technical.length > 0 || safeUserData.skills.soft.length > 0) && (
        <View style={styles.sidebarSection}>
          <Text style={styles.contactHeading}>Skills</Text>
          <View style={styles.skillsList}>
            {safeConcat(safeUserData.skills.technical, safeUserData.skills.soft).map((skill, index) => (
              <View key={index} style={styles.skillItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletPointText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Languages Section */}
      {safeUserData.skills.languages.length > 0 && (
        <View style={styles.sidebarSection}>
          <Text style={styles.contactHeading}>Languages</Text>
          <View style={styles.skillsList}>
            {safeUserData.skills.languages.map((language, index) => (
              <View key={index} style={styles.languageItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.contactText}>{language}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* References Section */}
      {safeUserData.references.length > 0 && (
        <View style={styles.sidebarSection}>
          <Text style={styles.contactHeading}>References</Text>
          {safeUserData.references.map((ref, index) => (
            <View key={index} style={styles.reference}>
              <Text style={styles.referenceName}>{ref.name || ''}</Text>
              <Text style={styles.referenceTitle}>{ref.title || ''}</Text>
              {ref.phone && <Text style={styles.referenceContact}>{ref.phone}</Text>}
              {ref.email && <Text style={styles.referenceContact}>{ref.email}</Text>}
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.profileImageContainer}>
        {userImage && <Image style={styles.profileImage} src={userImage} />}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {filterNA(safeUserData.personalInfo.fullName)}
        </Text>
        <Text style={styles.title}>
          {filterNA(safeUserData.personalInfo.title)}
        </Text>
      </View>
    </View>
  );

  const renderMainContent = () => (
    <View style={styles.contentPadding}>
      {/* Contact for non-sidebar layouts */}
      {!selectedTheme.layout.hasSidebar && (
        <View style={styles.mainSection}>
          <Text style={styles.sectionHeading}>Contact</Text>
          <View style={styles.bulletList}>
            {filterNA(safeUserData.personalInfo.phone) && (
              <Text style={styles.profileText}>{safeUserData.personalInfo.phone}</Text>
            )}
            {filterNA(safeUserData.personalInfo.email) && (
              <Text style={styles.profileText}>{safeUserData.personalInfo.email}</Text>
            )}
            {filterNA(safeUserData.personalInfo.location) && (
              <Text style={styles.profileText}>{safeUserData.personalInfo.location}</Text>
            )}
          </View>
        </View>
      )}

      {/* Profile Section */}
      {filterNA(safeUserData.professionalSummary) && (
        <View style={styles.mainSection}>
          <Text style={styles.sectionHeading}>Profile</Text>
          <Text style={styles.profileText}>{safeUserData.professionalSummary}</Text>
        </View>
      )}

      {/* Work Experience */}
      {safeUserData.experience.length > 0 && (
        <View style={styles.mainSection}>
          <Text style={styles.sectionHeading}>Work Experience</Text>
          <View style={styles.timelineContainer}>
            {safeUserData.experience.map((exp, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                {index !== safeUserData.experience.length - 1 && <View style={styles.timelineLine} />}
                <Text style={styles.jobTitle}>{filterNA(exp.title)}</Text>
                <Text style={styles.jobCompany}>
                  {filterNA(exp.company)}
                  {exp.position ? ` | ${exp.position}` : ''}
                </Text>
                <Text style={styles.jobPeriod}>
                  {filterNA(exp.startDate)} - {filterNA(exp.endDate || 'Present')}
                </Text>
                
                <View style={styles.bulletList}>
                  {Array.isArray(exp.responsibilities) && exp.responsibilities.map((responsibility, idx) => (
                    <View key={idx} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletPointText}>{responsibility}</Text>
                    </View>
                  ))}
                  {Array.isArray(exp.achievements) && exp.achievements.map((achievement, idx) => (
                    <View key={`ach-${idx}`} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletPointText}>{achievement}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Education */}
      {safeUserData.education.length > 0 && (
        <View style={styles.mainSection}>
          <Text style={styles.sectionHeading}>Education</Text>
          <View style={styles.timelineContainer}>
            {safeUserData.education.map((edu, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                {index !== safeUserData.education.length - 1 && <View style={styles.timelineLine} />}
                <Text style={styles.degree}>{filterNA(edu.degree)}</Text>
                <Text style={styles.university}>
                  {edu.fieldOfStudy ? `${edu.fieldOfStudy} | ` : ''}
                  {filterNA(edu.institution)}
                </Text>
                <Text style={styles.jobPeriod}>
                  {filterNA(edu.startDate || edu.graduationYear)} - {filterNA(edu.endDate || 'Present')}
                </Text>
                {edu.gpa && <Text style={styles.contactText}>GPA: {edu.gpa}</Text>}
                
                {Array.isArray(edu.relevantCourses) && edu.relevantCourses.length > 0 && (
                  <View style={styles.bulletList}>
                    {edu.relevantCourses.map((course, idx) => (
                      <View key={idx} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletPointText}>{course}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {safeUserData.projects.length > 0 && (
        <View style={styles.mainSection}>
          <Text style={styles.sectionHeading}>Projects</Text>
          <View style={styles.timelineContainer}>
            {safeUserData.projects.map((project, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                {index !== safeUserData.projects.length - 1 && <View style={styles.timelineLine} />}
                <Text style={styles.projectTitle}>{project.title || ''}</Text>
                <Text style={styles.projectDescription}>{project.description || ''}</Text>
                
                {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                  <View style={styles.projectTechContainer}>
                    {project.technologies.map((tech, techIdx) => (
                      <Text key={techIdx} style={styles.projectTechTag}>{tech}</Text>
                    ))}
                  </View>
                )}
                
                {project.link && (
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletPointText}>Link: {project.link}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Certifications */}
      {safeUserData.certifications.length > 0 && (
        <View style={styles.mainSection}>
          <Text style={styles.sectionHeading}>Certifications</Text>
          <View style={styles.timelineContainer}>
            {safeUserData.certifications.map((cert, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                {index !== safeUserData.certifications.length - 1 && <View style={styles.timelineLine} />}
                <Text style={styles.jobTitle}>{filterNA(cert.name)}</Text>
                <Text style={styles.contactText}>
                  {filterNA(cert.issuer)}
                  {cert.year ? `, ${cert.year}` : ''}
                  {cert.expiryDate ? ` (Valid until ${cert.expiryDate})` : ''}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Skills for non-sidebar layouts */}
      {!selectedTheme.layout.hasSidebar && (safeUserData.skills.technical.length > 0 || safeUserData.skills.soft.length > 0) && (
        <View style={styles.mainSection}>
          <Text style={styles.sectionHeading}>Skills</Text>
          <View style={styles.bulletList}>
            {safeConcat(safeUserData.skills.technical, safeUserData.skills.soft).map((skill, index) => (
              <View key={index} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletPointText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Languages for non-sidebar layouts */}
      {!selectedTheme.layout.hasSidebar && safeUserData.skills.languages.length > 0 && (
        <View style={styles.mainSection}>
          <Text style={styles.sectionHeading}>Languages</Text>
          <View style={styles.bulletList}>
            {safeUserData.skills.languages.map((language, index) => (
              <View key={index} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletPointText}>{language}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* References for non-sidebar layouts */}
      {!selectedTheme.layout.hasSidebar && safeUserData.references.length > 0 && (
        <View style={styles.mainSection}>
          <Text style={styles.sectionHeading}>References</Text>
          {safeUserData.references.map((ref, index) => (
            <View key={index} style={styles.reference}>
              <Text style={styles.referenceName}>{ref.name || ''}</Text>
              <Text style={styles.referenceTitle}>{ref.title || ''}</Text>
              {ref.phone && <Text style={styles.referenceContact}>{ref.phone}</Text>}
              {ref.email && <Text style={styles.referenceContact}>{ref.email}</Text>}
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {selectedTheme.layout.hasSidebar && renderSidebar()}
        
        <View style={styles.mainContent}>
          {renderHeader()}
          {renderMainContent()}
        </View>
      </Page>
    </Document>
  );
}