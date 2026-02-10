import React, { useState } from 'react';
import { cvData } from '../data/mock';
import { useLanguage } from '../context/LanguageContext';
import { getText, getTextArray } from '../utils/languageHelpers';
import { 
  Briefcase, Award, Code, Mail, Phone, MapPin, 
  Download, Languages, TrendingUp, Target, Calendar,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import CareerTimeline from '../components/charts/CareerTimeline';
import SectorDistribution from '../components/charts/SectorDistribution';
import TechnologyChart from '../components/charts/TechnologyChart';
import ImpactMetrics from '../components/charts/ImpactMetrics';
import CertificationProgress from '../components/charts/CertificationProgress';

const DashboardSlides = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedExp, setExpandedExp] = useState(null);

  const handleDownloadCV = () => {
    const fileName = language === 'en' 
      ? 'CV_Jose_Manuel_Ortega_English.pdf'
      : 'CV_Jose_Manuel_Ortega_Spanish.pdf';
    
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getIcon = (iconName) => {
    const icons = {
      briefcase: Briefcase,
      folder: Code,
      award: Award,
      code: Code
    };
    const Icon = icons[iconName] || Briefcase;
    return <Icon className="w-5 h-5" />;
  };

  const getTranslatedStats = () => {
    return [
      { label: t.hero.stats.experience, value: "15+", icon: "briefcase" },
      { label: t.hero.stats.projects, value: "50+", icon: "folder" },
      { label: t.hero.stats.certifications, value: "5+", icon: "award" },
      { label: t.hero.stats.technologies, value: "20+", icon: "code" }
    ];
  };

  const slides = [
    // Slide 1: About
    <div key="about" className="h-full w-full flex flex-col justify-center px-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 gap-12 mb-6">
          {/* Left Column */}
          <div>
            <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-600/30 mb-4">
              {t.hero.available}
            </Badge>
            <h1 className="text-6xl font-bold mb-5 text-slate-100">
              {cvData.personal.name}
            </h1>
            <p className="text-3xl text-cyan-400 font-light mb-5">
              {getText(cvData.personal.title, language)}
            </p>
            <p className="text-xl text-slate-400 mb-10">
              {getText(cvData.personal.tagline, language)}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-5">
              {getTranslatedStats().map((stat, index) => (
                <Card key={index} className="bg-slate-900/50 border-slate-800 shadow-[0_6px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_20px_rgba(6,182,212,0.15)] transition-all">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="text-cyan-400">
                      {getIcon(stat.icon)}
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-slate-100">{stat.value}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="text-3xl font-bold mb-5 text-slate-100">{t.about.title}</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              {getText(cvData.personal.summary, language)}
            </p>

            <h3 className="text-2xl font-bold mb-4 text-slate-100">{t.languages.title}</h3>
            <div className="space-y-3 mb-8">
              {cvData.languages.map((lang, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-lg text-slate-300 font-medium">{getText(lang.name, language)}</span>
                  <span className="text-cyan-400">•</span>
                  <span className="text-base text-slate-400">
                    {lang.level === 'Native' ? t.languages.native : t.languages.professional}
                  </span>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleDownloadCV}
              size="lg"
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Download className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Download CV' : 'Descargar CV'}
            </Button>
          </div>
        </div>

        {/* Contact - Full Width Below */}
        <div className="flex justify-center gap-10 text-slate-400 pt-8 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span className="text-base">{cvData.personal.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-cyan-400" />
            <span className="text-base">{cvData.personal.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <span className="text-base">{getText(cvData.personal.location, language)}</span>
          </div>
        </div>
      </div>
    </div>,

    // Slide 2: Experience
    <div key="experience" className="h-full w-full flex flex-col justify-center px-12 py-8">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        <h2 className="text-3xl font-bold mb-4 text-slate-100">{t.experience.title}</h2>
        
        <div className="grid grid-cols-2 gap-6 mb-4" style={{ height: '260px' }}>
          {/* Left: Career Timeline Chart */}
          <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all h-full">
            <CardContent className="p-5 h-full flex flex-col">
              <h3 className="text-base font-semibold text-slate-100 mb-2">{t.analytics.careerProgression}</h3>
              <div className="flex-1 min-h-0">
                <CareerTimeline data={cvData.careerTimeline} language={language} />
              </div>
            </CardContent>
          </Card>

          {/* Right: Sector Distribution */}
          <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all h-full">
            <CardContent className="p-5 h-full flex flex-col">
              <h3 className="text-base font-semibold text-slate-100 mb-2">{t.analytics.sectorDistribution}</h3>
              <div className="flex-1 min-h-0">
                <SectorDistribution data={cvData.sectorDistribution} language={language} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experience Cards - Expandibles con flechita */}
        <div className="space-y-3 overflow-y-auto flex-1 pr-2">
          {cvData.experience.map((exp) => (
            <Card 
              key={exp.id} 
              className="bg-slate-900/50 border-slate-800 shadow-[0_6px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_20px_rgba(6,182,212,0.15)] transition-all"
            >
              <CardHeader className="cursor-pointer p-4 pb-2" onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 text-xs text-slate-400">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {getText(exp.period, language)}
                    </div>
                    <CardTitle className="text-base text-slate-100 mb-1">{getText(exp.position, language)}</CardTitle>
                    <CardDescription className="text-sm text-cyan-400">{getText(exp.company, language)}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                    {expandedExp === exp.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </Button>
                </div>
              </CardHeader>
              
              {expandedExp === exp.id && (
                <CardContent className="pt-0 px-4 pb-4">
                  <Separator className="mb-3 bg-slate-800" />
                  <p className="text-sm text-slate-300 mb-3">{getText(exp.description, language)}</p>
                  
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      {t.experience.technologies}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {getTextArray(exp.technologies, language).map((tech, i) => (
                        <Badge key={i} variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700 text-xs px-2 py-0.5">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {t.experience.achievements}
                    </h4>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <TrendingUp className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{getText(achievement, language)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>,

    // Slide 3: Skills
    <div key="skills" className="h-full w-full flex flex-col justify-center px-12 py-6">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-4 text-slate-100">{t.skills.title}</h2>
        
        <div className="grid grid-cols-2 gap-6 mb-4">
          {/* Technical Skills */}
          <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all">
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold text-slate-100 mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" />
                {t.skills.technical}
              </h3>
              <div className="space-y-2.5">
                {cvData.skills.technical.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-sm text-slate-400">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-1.5 bg-slate-800" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Business Skills */}
          <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all">
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">{t.skills.business}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {cvData.skills.business.map((skill, index) => (
                  <Badge 
                    key={index} 
                    className="bg-cyan-600/20 text-cyan-300 border-cyan-600/30 px-3 py-1 text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <h3 className="text-base font-semibold text-slate-100 mb-2">{t.skills.tools}</h3>
              <div className="flex flex-wrap gap-1.5">
                {cvData.skills.tools.map((tool, index) => (
                  <Badge 
                    key={index} 
                    variant="outline"
                    className="bg-slate-800/50 text-slate-300 border-slate-700 px-2 py-0.5 text-xs"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technology Chart - Expanded */}
        <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all">
          <CardContent className="p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">{t.analytics.technologyExperience}</h3>
            <div style={{ height: '320px' }}>
              <TechnologyChart data={cvData.technologyUsage} language={language} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>,

    // Slide 4: Education
    <div key="education" className="h-full w-full flex flex-col px-12 py-8">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        <h2 className="text-3xl font-bold mb-4 text-slate-100">{t.education.title}</h2>
        
        <div className="grid grid-cols-2 gap-6 flex-1" style={{ height: '560px' }}>
          {/* Left Column: Charts */}
          <div className="flex flex-col gap-4 h-full">
            <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all flex-1">
              <CardContent className="p-5 h-full flex flex-col">
                <h3 className="text-base font-semibold text-slate-100 mb-2">{t.education.certificationProgress}</h3>
                <div className="flex-1 min-h-0">
                  <CertificationProgress data={cvData.certificationTimeline} language={language} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all flex-1">
              <CardContent className="p-5 h-full flex flex-col">
                <h3 className="text-base font-semibold text-slate-100 mb-2">{t.analytics.impactMetrics}</h3>
                <div className="flex-1 min-h-0">
                  <ImpactMetrics data={cvData.impactMetrics} language={language} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Education List - Same height as left */}
          <div className="h-full overflow-y-auto pr-2 space-y-2.5">
            {cvData.education.map((edu, index) => (
              <Card 
                key={index} 
                className={`bg-slate-900/50 border-slate-800 shadow-[0_6px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_20px_rgba(6,182,212,0.15)] transition-all ${
                  edu.certified ? 'ring-1 ring-cyan-600/30' : ''
                }`}
              >
                <CardContent className="p-3.5">
                  {edu.certified && (
                    <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-600/30 mb-2 text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      {t.education.certified}
                    </Badge>
                  )}
                  <div className="text-xs text-cyan-400 mb-1">{edu.year}</div>
                  <h3 className="text-sm font-semibold text-slate-100 mb-0.5 leading-tight">{edu.degree}</h3>
                  <p className="text-xs text-slate-400">{edu.institution}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-lg font-bold text-cyan-400">José Manuel Ortega</h1>
          
          {/* Navigation Buttons */}
          <nav className="flex gap-4 items-center">
            <Button
              onClick={() => setCurrentSlide(0)}
              variant={currentSlide === 0 ? "default" : "ghost"}
              size="sm"
              className={currentSlide === 0 ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-cyan-400"}
            >
              {t.nav.about}
            </Button>
            <Button
              onClick={() => setCurrentSlide(1)}
              variant={currentSlide === 1 ? "default" : "ghost"}
              size="sm"
              className={currentSlide === 1 ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-cyan-400"}
            >
              {t.nav.experience}
            </Button>
            <Button
              onClick={() => setCurrentSlide(2)}
              variant={currentSlide === 2 ? "default" : "ghost"}
              size="sm"
              className={currentSlide === 2 ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-cyan-400"}
            >
              {t.nav.skills}
            </Button>
            <Button
              onClick={() => setCurrentSlide(3)}
              variant={currentSlide === 3 ? "default" : "ghost"}
              size="sm"
              className={currentSlide === 3 ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-cyan-400"}
            >
              {t.nav.education}
            </Button>

            {/* Language Toggle */}
            <Button 
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
            >
              <Languages className="w-4 h-4 mr-1" />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </nav>
        </div>
      </header>

      {/* Slides Container */}
      <div className="pt-16" style={{ height: 'calc(100vh - 64px)' }}>
        {slides[currentSlide]}
      </div>

      {/* Slide Indicators */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-cyan-400 w-8' 
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardSlides;
