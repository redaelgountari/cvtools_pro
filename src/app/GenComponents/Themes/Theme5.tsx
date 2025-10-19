"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';

// Register only English font
Font.register({
  family: 'Noto Sans',
  fonts: [
    // { src: 'https://fonts.gstatic.com/s/notosans/v30/o-0IIpQlx3QUlC5A4PNr5TRA.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjXhFVZNyE.ttf', fontWeight: 'bold' },
  ],
});

// English-only stylesheet
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Noto Sans',
    backgroundColor: '#FFFFFF',
    fontSize: 12,
  },
  header: {
    marginBottom: 9,
    borderBottom: '1px solid #2D3748',
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
  },
  imageContainer: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    objectFit: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
    fontFamily: 'Noto Sans',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#4A5568',
  },
  contactItem: {
    marginRight: 8,
    marginBottom: 3,
    fontFamily: 'Noto Sans',
  },
  section: {
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: 'column',
    marginBottom: 4,
  },
  skillCategory: {
    fontSize: 12,
    fontWeight: 'semibold',
    marginBottom: 3,
    color: '#4A5568',
    fontFamily: 'Noto Sans',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 2,
    marginBottom: 6,
    fontFamily: 'Noto Sans',
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#4A5568',
    marginBottom: 6,
    fontFamily: 'Noto Sans',
  },
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  skillItem: {
    fontSize: 9,
    color: '#4A5568',
    backgroundColor: '#F7FAFC',
    padding: '2 5',
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontFamily: 'Noto Sans',
  },
  experienceItem: {
    marginBottom: 8,
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
    fontFamily: 'Noto Sans',
  },
  jobPeriod: {
    fontSize: 9,
    color: '#718096',
    fontFamily: 'Noto Sans',
  },
  company: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#4A5568',
    marginBottom: 3,
    fontFamily: 'Noto Sans',
  },
  bulletPoint: {
    fontSize: 9,
    marginLeft: 8,
    marginBottom: 3,
    color: '#4A5568',
    fontFamily: 'Noto Sans',
  },
  educationItem: {
    marginBottom: 5,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2D3748',
    fontFamily: 'Noto Sans',
  },
  institution: {
    fontSize: 9,
    marginTop: 1,
    color: '#4A5568',
    fontFamily: 'Noto Sans',
  },
  projectItem: {
    marginBottom: 5,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2D3748',
    fontFamily: 'Noto Sans',
  },
  projectDescription: {
    fontSize: 9,
    marginTop: 1,
    marginBottom: 3,
    color: '#4A5568',
    fontFamily: 'Noto Sans',
  },
});

const filterNA = (value: string | undefined): string => (value && value !== 'N/A' ? value : '');

interface Theme5Props {
  userdata: Resume;
  userImage: any;
}

export default function Theme5({ userdata, userImage }: Theme5Props) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.name}>{filterNA(userdata.personalInfo.fullName)}</Text>
            <View style={styles.contactInfo}>
              {[ 
                userdata.personalInfo.location,
                userdata.personalInfo.phone,
                userdata.personalInfo.email,
                userdata.personalInfo.linkedin,
                userdata.personalInfo.website
              ].filter(Boolean).map((item, index) => (
                <Text key={index} style={styles.contactItem}>{item}</Text>
              ))}
            </View>
          </View>
          
          {userImage && (
            <View style={styles.imageContainer}>
              <Image style={styles.image} src={userImage} />
            </View>
          )}
        </View>

        {userdata.professionalSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Profile</Text>
            <Text style={styles.summary}>{userdata.professionalSummary}</Text>
          </View>
        )}

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
                <Text style={styles.skillCategory}>Tools</Text>
                <View style={styles.skillRow}>
                  {userdata.skills.soft.map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
        
        {userdata.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {userdata.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{filterNA(exp.title)}</Text>
                  <Text style={styles.jobPeriod}>{filterNA(exp.startDate)} - {filterNA(exp.endDate)}</Text>
                </View>
                <Text style={styles.company}>
                  {filterNA(exp.company)}, {filterNA(exp.location)}
                </Text>
                {exp.responsibilities.map((responsibility, idx) => (
                  <Text key={idx} style={styles.bulletPoint}>• {responsibility}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {userdata.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {userdata.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>
                  {filterNA(edu.degree)} - {filterNA(edu.graduationYear)}
                </Text>
                <Text style={styles.institution}>
                  {filterNA(edu.institution)}, {filterNA(edu.location)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {userdata.projects && userdata.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {userdata.projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
                <View style={styles.skillRow}>
                  {project.technologies.map((tech, idx) => (
                    <Text key={idx} style={styles.skillItem}>{tech}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {userdata.skills.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.skillRow}>
              {userdata.skills.languages.map((language, index) => (
                <Text key={index} style={styles.skillItem}>{language}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}